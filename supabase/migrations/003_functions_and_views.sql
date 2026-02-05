-- Migration 003: Database Functions and Materialized Views
-- Description: Core business logic functions and pre-computed dashboard views
-- Dependencies: 001_dimension_tables.sql, 002_fact_tables.sql

-- =============================================================================
-- VALIDATION TRIGGER FUNCTION
-- =============================================================================
-- Validates that child targets never exceed parent targets
-- Example: Bengaluru IT-Exports revenue <= Karnataka IT-Exports revenue

CREATE OR REPLACE FUNCTION validate_parent_child_target()
RETURNS TRIGGER AS $$
DECLARE
  parent_value NUMERIC;
BEGIN
  IF NEW.parent_target_id IS NOT NULL THEN
    -- Get the parent target value
    SELECT value INTO parent_value
    FROM targets
    WHERE id = NEW.parent_target_id;

    -- Check if child exceeds parent
    IF NEW.value > parent_value THEN
      RAISE EXCEPTION 'Child target value (%) cannot exceed parent target value (%) for target id=%',
        NEW.value, parent_value, NEW.id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to targets table
CREATE TRIGGER check_parent_child_targets
  BEFORE INSERT OR UPDATE ON targets
  FOR EACH ROW EXECUTE FUNCTION validate_parent_child_target();

COMMENT ON FUNCTION validate_parent_child_target() IS
  'Trigger function: Validates child target <= parent target (e.g., cluster <= state)';

-- =============================================================================
-- CASCADE FACTOR TARGETS FUNCTION
-- =============================================================================
-- Auto-calculates Labour, Land, and Capital targets from a Revenue target
-- Uses conversion_ratios table for vertical-specific multipliers
--
-- Example Usage:
--   SELECT cascade_factor_targets('t010');
--   Returns: {"revenue":"t010","labour":"t011","land":"t012","capital":"t013"}
--
-- Conversion Chain:
--   Revenue ($B) → Labour (headcount) → Land (sq_ft) → Capital (crores INR)

CREATE OR REPLACE FUNCTION cascade_factor_targets(revenue_target_id TEXT)
RETURNS JSON AS $$
DECLARE
  rev_target targets%ROWTYPE;
  ratios RECORD;
  labour_target_id TEXT;
  land_target_id TEXT;
  capital_target_id TEXT;
  result JSON;
BEGIN
  -- 1. Get the revenue target
  SELECT * INTO rev_target
  FROM targets
  WHERE id = revenue_target_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Revenue target % not found', revenue_target_id;
  END IF;

  -- Validate this is actually a revenue target
  IF rev_target.factor_id IS NOT NULL THEN
    RAISE EXCEPTION 'Target % is not a revenue target (factor_id must be NULL)', revenue_target_id;
  END IF;

  IF rev_target.metric != 'revenue' THEN
    RAISE EXCEPTION 'Target % has metric=% (expected "revenue")', revenue_target_id, rev_target.metric;
  END IF;

  -- 2. Get conversion ratios for this vertical
  SELECT
    MAX(CASE WHEN from_metric = 'revenue' AND to_metric = 'employment' THEN ratio END) AS revenue_to_employment,
    MAX(CASE WHEN from_metric = 'employment' AND to_metric = 'land' THEN ratio END) AS employment_to_land,
    MAX(CASE WHEN from_metric = 'land' AND to_metric = 'capital' THEN ratio END) AS land_to_capital
  INTO ratios
  FROM conversion_ratios
  WHERE vertical_id = rev_target.vertical_id
    AND (effective_to IS NULL OR effective_to >= CURRENT_DATE);

  -- Check if ratios exist
  IF ratios.revenue_to_employment IS NULL THEN
    RAISE EXCEPTION 'No conversion ratio found for vertical=% from revenue to employment', rev_target.vertical_id;
  END IF;

  -- 3. Create/update Labour target
  -- Formula: Revenue ($B) × 1000 × employees_per_million_usd = headcount
  INSERT INTO targets (
    vertical_id,
    geography_id,
    factor_id,
    year,
    metric,
    value,
    unit,
    data_source,
    confidence_rating,
    parent_target_id,
    formula,
    calculation_params,
    dependencies
  )
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'labour',
    rev_target.year,
    'headcount',
    rev_target.value * 1000 * ratios.revenue_to_employment,
    'employees',
    'Auto-calculated from revenue target',
    GREATEST(1, rev_target.confidence_rating - 1), -- Reduce confidence by 1 (min 1)
    NULL, -- No parent for now (could link to Karnataka labour target)
    'revenue_target * 1000 * employment_intensity_ratio',
    json_build_object(
      'revenue_target_id', revenue_target_id,
      'employment_intensity_ratio', ratios.revenue_to_employment,
      'revenue_value_usd_bn', rev_target.value
    ),
    ARRAY[revenue_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    dependencies = EXCLUDED.dependencies,
    updated_at = NOW()
  RETURNING id INTO labour_target_id;

  -- 4. Create/update Land target
  -- Formula: headcount × sqft_per_employee = total sq_ft
  INSERT INTO targets (
    vertical_id,
    geography_id,
    factor_id,
    year,
    metric,
    value,
    unit,
    data_source,
    confidence_rating,
    parent_target_id,
    formula,
    calculation_params,
    dependencies
  )
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'land',
    rev_target.year,
    'sq_ft',
    (rev_target.value * 1000 * ratios.revenue_to_employment) * ratios.employment_to_land,
    'square_feet',
    'Auto-calculated from labour target',
    GREATEST(1, rev_target.confidence_rating - 1),
    NULL,
    'headcount * sqft_per_employee',
    json_build_object(
      'headcount_target_id', labour_target_id,
      'sqft_per_employee', ratios.employment_to_land,
      'headcount_value', rev_target.value * 1000 * ratios.revenue_to_employment
    ),
    ARRAY[labour_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    dependencies = EXCLUDED.dependencies,
    updated_at = NOW()
  RETURNING id INTO land_target_id;

  -- 5. Create/update Capital target
  -- Formula: land_sqft × capex_per_sqft_inr ÷ 10,000,000 = crores INR
  INSERT INTO targets (
    vertical_id,
    geography_id,
    factor_id,
    year,
    metric,
    value,
    unit,
    data_source,
    confidence_rating,
    parent_target_id,
    formula,
    calculation_params,
    dependencies
  )
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'capital',
    rev_target.year,
    'funding_amount',
    ((rev_target.value * 1000 * ratios.revenue_to_employment) * ratios.employment_to_land * ratios.land_to_capital) / 10000000,
    'crores_inr',
    'Auto-calculated from land target',
    GREATEST(1, rev_target.confidence_rating - 1),
    NULL,
    'land_sqft * capex_per_sqft_inr / 10000000',
    json_build_object(
      'land_sqft_target_id', land_target_id,
      'capex_per_sqft_inr', ratios.land_to_capital,
      'land_sqft_value', (rev_target.value * 1000 * ratios.revenue_to_employment) * ratios.employment_to_land
    ),
    ARRAY[land_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    dependencies = EXCLUDED.dependencies,
    updated_at = NOW()
  RETURNING id INTO capital_target_id;

  -- 6. Return all created target IDs
  result := json_build_object(
    'revenue', revenue_target_id,
    'labour', labour_target_id,
    'land', land_target_id,
    'capital', capital_target_id
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cascade_factor_targets(TEXT) IS
  'Auto-calculates Labour, Land, and Capital targets from a Revenue target using conversion ratios';

-- =============================================================================
-- VALIDATE GEOGRAPHIC SUM FUNCTION
-- =============================================================================
-- Validates that sum of cluster targets equals Karnataka state total
-- Returns TRUE if valid (or no Karnataka target exists)
-- Returns FALSE and raises WARNING if mismatch > 1%
--
-- Example Usage:
--   SELECT validate_geographic_sum('it-exports', 'labour', 2030);
--   Returns: true/false

CREATE OR REPLACE FUNCTION validate_geographic_sum(
  p_vertical_id TEXT,
  p_factor_id TEXT,
  p_year INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  karnataka_total NUMERIC;
  geographic_sum NUMERIC;
  tolerance NUMERIC := 0.01; -- 1% tolerance
  metric_name TEXT;
BEGIN
  -- 1. Get Karnataka state-level total
  SELECT value, metric INTO karnataka_total, metric_name
  FROM targets
  WHERE vertical_id = p_vertical_id
    AND geography_id = 'karnataka'
    AND (
      (p_factor_id IS NULL AND factor_id IS NULL AND metric = 'revenue')
      OR factor_id = p_factor_id
    )
    AND year = p_year
  LIMIT 1;

  -- If no Karnataka total exists, nothing to validate against
  IF karnataka_total IS NULL THEN
    RETURN TRUE;
  END IF;

  -- 2. Calculate sum of all cluster/geography targets
  SELECT COALESCE(SUM(value), 0) INTO geographic_sum
  FROM targets
  WHERE vertical_id = p_vertical_id
    AND geography_id IN (
      'bengaluru',
      'mysuru',
      'mangaluru',
      'hdb-corridor',
      'kalaburagi',
      'tumakuru',
      'shivamogga',
      'rest-of-karnataka'
    )
    AND (
      (p_factor_id IS NULL AND factor_id IS NULL AND metric = 'revenue')
      OR (factor_id = p_factor_id AND metric = metric_name)
    )
    AND year = p_year;

  -- 3. Check if sums match within tolerance
  IF karnataka_total > 0 AND ABS(geographic_sum - karnataka_total) / karnataka_total > tolerance THEN
    RAISE WARNING 'Geographic sum (%) != Karnataka total (%) for vertical=%, factor=%, year=%. Difference: %',
      geographic_sum,
      karnataka_total,
      p_vertical_id,
      COALESCE(p_factor_id, 'revenue'),
      p_year,
      ROUND(((geographic_sum - karnataka_total) / karnataka_total * 100)::numeric, 2) || '%';
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validate_geographic_sum(TEXT, TEXT, INTEGER) IS
  'Validates sum of cluster targets = Karnataka total (within 1% tolerance)';

-- =============================================================================
-- GENERATE DEFAULT APPORTIONMENT FUNCTION
-- =============================================================================
-- Generates default geographic apportionment percentages
-- Strategy:
--   1. First tries vertical-specific apportionment_rules
--   2. Falls back to calculating historical averages (last 5 years)
--   3. Returns empty if no data available
--
-- Example Usage:
--   SELECT * FROM generate_default_apportionment('it-exports', 2030);
--
-- Returns Table:
--   geography_id | percentage | basis                              | confidence
--   -------------|------------|------------------------------------|-----------
--   bengaluru    | 65.0       | Historical average 2025-2029       | 4
--   mysuru       | 15.0       | Historical average 2025-2029       | 4
--   mangaluru    | 10.0       | Historical average 2025-2029       | 3

CREATE OR REPLACE FUNCTION generate_default_apportionment(
  p_vertical_id TEXT,
  p_year INTEGER
)
RETURNS TABLE (
  geography_id TEXT,
  percentage NUMERIC,
  basis TEXT,
  confidence INTEGER
) AS $$
DECLARE
  has_rules BOOLEAN;
BEGIN
  -- 1. First try explicit apportionment rules
  RETURN QUERY
  SELECT
    ar.to_geography_id,
    ar.percentage_allocation,
    COALESCE(ar.basis, 'Explicit apportionment rule'),
    ar.confidence_rating
  FROM apportionment_rules ar
  WHERE (ar.vertical_id = p_vertical_id OR ar.vertical_id IS NULL)
    AND ar.from_geography_id = 'karnataka'
    AND ar.status = 'active'
    AND (ar.effective_from IS NULL OR ar.effective_from <= CURRENT_DATE)
    AND (ar.effective_to IS NULL OR ar.effective_to >= CURRENT_DATE)
  ORDER BY
    -- Prioritize vertical-specific rules over generic rules
    CASE WHEN ar.vertical_id IS NOT NULL THEN 1 ELSE 2 END,
    ar.priority DESC,
    ar.confidence_rating DESC;

  -- Check if we got any results
  GET DIAGNOSTICS has_rules = ROW_COUNT;

  -- 2. If no explicit rules, calculate from historical data (last 5 years)
  IF NOT has_rules THEN
    RETURN QUERY
    SELECT
      t.geography_id,
      ROUND(AVG((t.value / NULLIF(total.value, 0)) * 100)::numeric, 2) AS percentage,
      'Calculated from historical targets ' || (p_year - 5)::text || '-' || (p_year - 1)::text AS basis,
      CASE
        WHEN COUNT(*) >= 5 THEN 4  -- High confidence: 5+ years data
        WHEN COUNT(*) >= 3 THEN 3  -- Medium confidence: 3-4 years
        WHEN COUNT(*) >= 2 THEN 2  -- Low confidence: 2 years
        ELSE 1                      -- Very low: 1 year
      END AS confidence
    FROM targets t
    JOIN (
      -- Get Karnataka totals for each year
      SELECT year, SUM(value) AS value
      FROM targets
      WHERE vertical_id = p_vertical_id
        AND geography_id = 'karnataka'
        AND year BETWEEN (p_year - 5) AND (p_year - 1)
        AND factor_id IS NULL
        AND metric = 'revenue'
      GROUP BY year
      HAVING SUM(value) > 0  -- Exclude years with zero totals
    ) total ON total.year = t.year
    WHERE t.vertical_id = p_vertical_id
      AND t.year BETWEEN (p_year - 5) AND (p_year - 1)
      AND t.factor_id IS NULL
      AND t.metric = 'revenue'
      AND t.geography_id != 'karnataka'  -- Exclude state-level
      AND t.value > 0
    GROUP BY t.geography_id
    HAVING COUNT(*) >= 2  -- Need at least 2 years of data
    ORDER BY percentage DESC;
  END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_default_apportionment(TEXT, INTEGER) IS
  'Generates default geographic distribution percentages from rules or historical data';

-- =============================================================================
-- MATERIALIZED VIEW: GEOGRAPHY DASHBOARD
-- =============================================================================
-- Pre-computed dashboard data for each geography showing all verticals and factors
-- Used by: Geography detail pages, cluster dashboards
--
-- Refresh strategy: After bulk target updates
--   REFRESH MATERIALIZED VIEW CONCURRENTLY geography_dashboard_view;
--
-- Example Query:
--   SELECT * FROM geography_dashboard_view
--   WHERE geography_id = 'bengaluru' AND year = 2030;

CREATE MATERIALIZED VIEW geography_dashboard_view AS
SELECT
  g.id AS geography_id,
  g.name AS geography_name,
  g.tier AS geography_tier,
  g.region AS geography_region,
  g.type AS geography_type,
  t.year,
  v.id AS vertical_id,
  v.name AS vertical_name,
  v.category AS vertical_category,

  -- Aggregate metrics by factor
  MAX(CASE WHEN t.factor_id IS NULL AND t.metric = 'revenue' THEN t.value END) AS revenue_usd_bn,
  MAX(CASE WHEN t.factor_id = 'labour' AND t.metric = 'headcount' THEN t.value END) AS labour_headcount,
  MAX(CASE WHEN t.factor_id = 'land' AND t.metric = 'sq_ft' THEN t.value END) AS land_sqft,
  MAX(CASE WHEN t.factor_id = 'capital' AND t.metric = 'funding_amount' THEN t.value END) AS capital_crores_inr,

  -- Metadata
  MAX(t.confidence_rating) AS max_confidence_rating,
  COUNT(DISTINCT t.id) FILTER (WHERE t.value IS NOT NULL) AS target_count,
  MAX(t.updated_at) AS last_updated

FROM geographies g
CROSS JOIN verticals v
LEFT JOIN targets t ON t.geography_id = g.id AND t.vertical_id = v.id
WHERE v.category IN ('core', 'sub-sector')  -- Exclude individual digitizing sectors for dashboard
GROUP BY g.id, g.name, g.tier, g.region, g.type, t.year, v.id, v.name, v.category;

-- Create indexes for fast lookups
CREATE INDEX idx_geo_dashboard_geography ON geography_dashboard_view(geography_id);
CREATE INDEX idx_geo_dashboard_vertical ON geography_dashboard_view(vertical_id);
CREATE INDEX idx_geo_dashboard_year ON geography_dashboard_view(year);
CREATE INDEX idx_geo_dashboard_tier ON geography_dashboard_view(geography_tier);
CREATE INDEX idx_geo_dashboard_composite ON geography_dashboard_view(geography_id, year);

COMMENT ON MATERIALIZED VIEW geography_dashboard_view IS
  'Pre-computed dashboard data: Geography × Vertical × Year with all factor metrics';

-- =============================================================================
-- MATERIALIZED VIEW: VERTICAL DISTRIBUTION
-- =============================================================================
-- Shows how each vertical's revenue is distributed across geographies
-- Used by: Vertical detail pages, apportionment tools
--
-- Example Query:
--   SELECT * FROM vertical_distribution_view
--   WHERE vertical_id = 'it-exports' AND year = 2030
--   ORDER BY percentage_of_total DESC;

CREATE MATERIALIZED VIEW vertical_distribution_view AS
SELECT
  v.id AS vertical_id,
  v.name AS vertical_name,
  v.category AS vertical_category,
  t.year,
  g.id AS geography_id,
  g.name AS geography_name,
  g.tier AS geography_tier,
  g.region AS geography_region,

  -- Revenue metrics
  t.value AS revenue_usd_bn,
  ROUND(
    (t.value / NULLIF(SUM(t.value) OVER (PARTITION BY v.id, t.year), 0) * 100)::numeric,
    2
  ) AS percentage_of_total,

  -- Metadata
  t.confidence_rating,
  t.data_source,
  t.updated_at

FROM targets t
JOIN verticals v ON t.vertical_id = v.id
JOIN geographies g ON t.geography_id = g.id
WHERE t.factor_id IS NULL
  AND t.metric = 'revenue'
  AND t.value > 0;

-- Create indexes
CREATE INDEX idx_vert_dist_vertical ON vertical_distribution_view(vertical_id);
CREATE INDEX idx_vert_dist_year ON vertical_distribution_view(year);
CREATE INDEX idx_vert_dist_geography ON vertical_distribution_view(geography_id);
CREATE INDEX idx_vert_dist_composite ON vertical_distribution_view(vertical_id, year);

COMMENT ON MATERIALIZED VIEW vertical_distribution_view IS
  'Revenue distribution by geography for each vertical (shows % allocation)';

-- =============================================================================
-- MATERIALIZED VIEW: FACTOR SUMMARY
-- =============================================================================
-- Comprehensive factor metrics across all dimensions
-- Used by: Factor analysis pages, capacity planning, infrastructure planning
--
-- Example Query:
--   SELECT * FROM factor_summary_view
--   WHERE factor_id = 'land' AND geography_id = 'mysuru' AND year = 2030;

CREATE MATERIALIZED VIEW factor_summary_view AS
SELECT
  f.id AS factor_id,
  f.name AS factor_name,
  f.category AS factor_category,
  t.year,
  g.id AS geography_id,
  g.name AS geography_name,
  g.tier AS geography_tier,
  g.region AS geography_region,
  v.id AS vertical_id,
  v.name AS vertical_name,
  v.category AS vertical_category,

  -- Metric details
  t.metric,
  t.value,
  t.unit,

  -- Calculation metadata
  t.formula,
  t.calculation_params,
  t.parent_target_id,

  -- Quality metadata
  t.confidence_rating,
  t.data_source,
  t.updated_at

FROM targets t
JOIN factors f ON t.factor_id = f.id
JOIN geographies g ON t.geography_id = g.id
JOIN verticals v ON t.vertical_id = v.id
WHERE t.value > 0;

-- Create indexes
CREATE INDEX idx_factor_summary_factor ON factor_summary_view(factor_id);
CREATE INDEX idx_factor_summary_geography ON factor_summary_view(geography_id);
CREATE INDEX idx_factor_summary_vertical ON factor_summary_view(vertical_id);
CREATE INDEX idx_factor_summary_year ON factor_summary_view(year);
CREATE INDEX idx_factor_summary_composite ON factor_summary_view(factor_id, geography_id, year);

COMMENT ON MATERIALIZED VIEW factor_summary_view IS
  'Comprehensive factor metrics: Factor × Geography × Vertical × Year';

-- =============================================================================
-- VIEW REFRESH HELPER FUNCTIONS
-- =============================================================================
-- Convenience functions to refresh materialized views
-- Note: These are regular functions, not materialized views

CREATE OR REPLACE FUNCTION refresh_geography_dashboard_view()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY geography_dashboard_view;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_vertical_distribution_view()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY vertical_distribution_view;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_factor_summary_view()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY factor_summary_view;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_all_views()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY geography_dashboard_view;
  REFRESH MATERIALIZED VIEW CONCURRENTLY vertical_distribution_view;
  REFRESH MATERIALIZED VIEW CONCURRENTLY factor_summary_view;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION refresh_geography_dashboard_view() IS 'Refresh geography dashboard materialized view';
COMMENT ON FUNCTION refresh_vertical_distribution_view() IS 'Refresh vertical distribution materialized view';
COMMENT ON FUNCTION refresh_factor_summary_view() IS 'Refresh factor summary materialized view';
COMMENT ON FUNCTION refresh_all_views() IS 'Refresh all materialized views at once';

-- =============================================================================
-- USAGE EXAMPLES
-- =============================================================================

/*
-- Example 1: Cascade factor targets from revenue
-- Scenario: Set IT-Exports revenue for Bengaluru 2030, auto-calculate factors

INSERT INTO targets (vertical_id, geography_id, year, metric, value, unit, data_source, confidence_rating)
VALUES ('it-exports', 'bengaluru', 2030, 'revenue', 150.0, 'usd_bn', 'Industry projection', 4)
RETURNING id;
-- Returns: 't001'

SELECT cascade_factor_targets('t001');
-- Returns: {"revenue":"t001","labour":"t002","land":"t003","capital":"t004"}

-- Now query the auto-created targets:
SELECT * FROM targets WHERE id IN ('t002', 't003', 't004');


-- Example 2: Validate geographic sum
-- Scenario: Check if cluster targets sum to Karnataka total

-- Insert Karnataka total
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit, data_source)
VALUES ('esdm', 'karnataka', 'labour', 2030, 'headcount', 100000, 'employees', 'State target');

-- Insert cluster targets
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit, data_source)
VALUES
  ('esdm', 'bengaluru', 'labour', 2030, 'headcount', 60000, 'employees', 'Cluster target'),
  ('esdm', 'mysuru', 'labour', 2030, 'headcount', 25000, 'employees', 'Cluster target'),
  ('esdm', 'mangaluru', 'labour', 2030, 'headcount', 15000, 'employees', 'Cluster target');

-- Validate (should return TRUE)
SELECT validate_geographic_sum('esdm', 'labour', 2030);


-- Example 3: Generate default apportionment
-- Scenario: Get suggested distribution percentages for a new vertical

SELECT * FROM generate_default_apportionment('it-exports', 2030);

-- Use results to apportion state target:
WITH apportionment AS (
  SELECT * FROM generate_default_apportionment('it-exports', 2030)
),
state_target AS (
  SELECT value FROM targets
  WHERE vertical_id = 'it-exports'
    AND geography_id = 'karnataka'
    AND year = 2030
    AND metric = 'revenue'
)
INSERT INTO targets (vertical_id, geography_id, year, metric, value, unit, data_source, confidence_rating)
SELECT
  'it-exports',
  a.geography_id,
  2030,
  'revenue',
  st.value * (a.percentage / 100),
  'usd_bn',
  'Apportioned from Karnataka: ' || a.basis,
  a.confidence
FROM apportionment a
CROSS JOIN state_target st;


-- Example 4: Query dashboard views
-- Scenario: Load Bengaluru dashboard for 2030

SELECT * FROM geography_dashboard_view
WHERE geography_id = 'bengaluru' AND year = 2030
ORDER BY revenue_usd_bn DESC NULLS LAST;


-- Example 5: Get vertical distribution
-- Scenario: See how IT-Exports is distributed across Karnataka

SELECT
  geography_name,
  revenue_usd_bn,
  percentage_of_total,
  confidence_rating
FROM vertical_distribution_view
WHERE vertical_id = 'it-exports' AND year = 2030
ORDER BY percentage_of_total DESC;


-- Example 6: Analyze factor capacity by geography
-- Scenario: See all land requirements for Mysuru in 2030

SELECT
  vertical_name,
  metric,
  value,
  unit,
  data_source,
  confidence_rating
FROM factor_summary_view
WHERE factor_id = 'land'
  AND geography_id = 'mysuru'
  AND year = 2030
ORDER BY value DESC;


-- Example 7: Refresh views after bulk updates
SELECT refresh_all_views();
*/
