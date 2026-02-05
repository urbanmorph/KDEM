-- Seed Data: Conversion Ratios
-- Description: Industry-standard ratios for cascading from revenue to factors
-- Source: NASSCOM, ICEA, Karnataka industry benchmarks

-- =============================================================================
-- IT EXPORTS (IT Services, GCC)
-- =============================================================================
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  -- Revenue to Employment
  ('it-exports', 'revenue', 'employment', 20, 'employees_per_million_usd',
   'NASSCOM IT Services average 2020-2025', 5),

  -- Employment to Land
  ('it-exports', 'employment', 'land', 100, 'sqft_per_employee',
   'IT industry standard (Grade A office space)', 5),

  -- Land to Capital
  ('it-exports', 'land', 'capital', 3500, 'inr_per_sqft',
   'Bengaluru IT park construction cost average', 4);

-- =============================================================================
-- IT DOMESTIC
-- =============================================================================
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  -- Revenue to Employment
  ('it-domestic', 'revenue', 'employment', 25, 'employees_per_million_usd',
   'NASSCOM Domestic Services average (higher employment intensity)', 4),

  -- Employment to Land
  ('it-domestic', 'employment', 'land', 90, 'sqft_per_employee',
   'Domestic services typically smaller office spaces', 4),

  -- Land to Capital
  ('it-domestic', 'land', 'capital', 3000, 'inr_per_sqft',
   'Lower fitout costs for domestic operations', 3);

-- =============================================================================
-- ESDM (Electronics Manufacturing)
-- =============================================================================
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  -- Revenue to Employment
  ('esdm', 'revenue', 'employment', 100, 'employees_per_million_usd',
   'ICEA industry benchmarks for ESDM sector', 4),

  -- Employment to Land
  ('esdm', 'employment', 'land', 33.33, 'sqft_per_employee',
   'Manufacturing floor + office space norm', 3),

  -- Land to Capital
  ('esdm', 'land', 'capital', 4000, 'inr_per_sqft',
   'Factory construction + equipment costs', 3);

-- =============================================================================
-- STARTUPS
-- =============================================================================
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  -- Revenue to Employment
  ('startups', 'revenue', 'employment', 15, 'employees_per_million_usd',
   'Karnataka startup ecosystem average (lean teams)', 3),

  -- Employment to Land
  ('startups', 'employment', 'land', 80, 'sqft_per_employee',
   'Co-working + traditional office mix', 3),

  -- Land to Capital
  ('startups', 'land', 'capital', 2500, 'inr_per_sqft',
   'Incubator and co-working space rates', 3);

-- =============================================================================
-- DIGITIZING SECTORS (Aggregate)
-- =============================================================================
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  -- Revenue to Employment
  ('digitizing-sectors', 'revenue', 'employment', 30, 'employees_per_million_usd',
   'Estimated based on digital services employment intensity', 2),

  -- Employment to Land
  ('digitizing-sectors', 'employment', 'land', 75, 'sqft_per_employee',
   'Mixed office and operational space', 2),

  -- Land to Capital
  ('digitizing-sectors', 'land', 'capital', 2800, 'inr_per_sqft',
   'Digital infrastructure and fitout costs', 2);

-- =============================================================================
-- GEOGRAPHY-SPECIFIC MULTIPLIERS
-- =============================================================================
-- Bengaluru has premium costs
INSERT INTO geography_conversion_multipliers (geography_id, factor_id, multiplier, basis) VALUES
  ('bengaluru', 'land', 1.20, '20% premium for Bengaluru real estate vs state average'),
  ('bengaluru', 'capital', 1.15, '15% higher construction and fitout costs');

-- Tier 2/3 cities have discounts
INSERT INTO geography_conversion_multipliers (geography_id, factor_id, multiplier, basis) VALUES
  ('mysuru', 'land', 0.70, '30% discount vs Bengaluru'),
  ('mysuru', 'capital', 0.80, '20% lower construction costs'),

  ('mangaluru', 'land', 0.75, '25% discount vs Bengaluru'),
  ('mangaluru', 'capital', 0.85, '15% lower costs'),

  ('hdb-corridor', 'land', 0.65, '35% discount vs Bengaluru'),
  ('hdb-corridor', 'capital', 0.75, '25% lower costs'),

  ('kalaburagi', 'land', 0.50, '50% discount vs Bengaluru'),
  ('kalaburagi', 'capital', 0.60, '40% lower costs'),

  ('tumakuru', 'land', 0.60, '40% discount vs Bengaluru'),
  ('tumakuru', 'capital', 0.70, '30% lower costs'),

  ('shivamogga', 'land', 0.55, '45% discount vs Bengaluru'),
  ('shivamogga', 'capital', 0.65, '35% lower costs'),

  ('rest-of-karnataka', 'land', 0.60, '40% discount vs Bengaluru (average)'),
  ('rest-of-karnataka', 'capital', 0.70, '30% lower costs (average)');
-- Seed Data: Apportionment Rules
-- Description: Historical defaults for geographic distribution based on PDF data
-- Source: Digital Economy numbers - Final version combined.pdf (Slide 12, 16)

-- =============================================================================
-- IT EXPORTS (Based on PDF Slide 12: Bengaluru vs Beyond Bengaluru split)
-- =============================================================================
-- Karnataka total 2022-23: $125.84B
-- Bengaluru: $121.61B (96.7%)
-- Beyond Bengaluru: $4.23B (3.3%)

INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, status, effective_from
) VALUES
  -- State to Bengaluru
  ('it-exports', 'karnataka', 'bengaluru',
   'percentage', 96.7,
   'PDF Slide 12 - Historical split 2022-23', 5, 'active', '2022-01-01'),

  -- State to Beyond Bengaluru clusters (PDF Slide 16 proportions)
  ('it-exports', 'karnataka', 'mysuru',
   'percentage', 0.44,
   'PDF Slide 16 - Mysuru $0.55B / $125.84B total', 4, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'mangaluru',
   'percentage', 0.29,
   'PDF Slide 16 - Mangaluru $0.36B / $125.84B total', 4, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'hdb-corridor',
   'percentage', 0.16,
   'PDF Slide 16 - HDB $0.20B / $125.84B total', 4, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'kalaburagi',
   'percentage', 0.5,
   'Emerging cluster - estimated allocation', 2, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'tumakuru',
   'percentage', 0.5,
   'Emerging cluster - estimated allocation', 2, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'shivamogga',
   'percentage', 0.2,
   'Development phase - minimal allocation', 2, 'active', '2022-01-01'),

  ('it-exports', 'karnataka', 'rest-of-karnataka',
   'percentage', 1.2,
   'Distributed across remaining areas', 2, 'active', '2022-01-01');

-- =============================================================================
-- IT DOMESTIC (Similar distribution to IT Exports but slightly higher BB share)
-- =============================================================================
INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, status
) VALUES
  ('it-domestic', 'karnataka', 'bengaluru',
   'percentage', 95.0,
   'Domestic services more concentrated in Bengaluru', 4, 'active'),

  ('it-domestic', 'karnataka', 'mysuru',
   'percentage', 1.2,
   'Emerging domestic IT services hub', 3, 'active'),

  ('it-domestic', 'karnataka', 'mangaluru',
   'percentage', 1.5,
   'Coastal advantage for certain domestic services', 3, 'active'),

  ('it-domestic', 'karnataka', 'hdb-corridor',
   'percentage', 1.0,
   'Growing domestic services sector', 3, 'active'),

  ('it-domestic', 'karnataka', 'rest-of-karnataka',
   'percentage', 1.3,
   'Distributed', 2, 'active');

-- =============================================================================
-- ESDM (Based on infrastructure projects and PDF Slide 16 targets)
-- =============================================================================
INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, status
) VALUES
  ('esdm', 'karnataka', 'bengaluru',
   'percentage', 40.0,
   'Existing ESDM concentration in Bengaluru', 4, 'active'),

  ('esdm', 'karnataka', 'mysuru',
   'percentage', 15.0,
   'Mysuru PCB Park - strategic ESDM cluster', 4, 'active'),

  ('esdm', 'karnataka', 'tumakuru',
   'percentage', 30.0,
   'Aerospace SEZ - major ESDM allocation', 4, 'active'),

  ('esdm', 'karnataka', 'mangaluru',
   'percentage', 5.0,
   'Emerging ESDM capabilities', 3, 'active'),

  ('esdm', 'karnataka', 'hdb-corridor',
   'percentage', 8.0,
   'Manufacturing corridor potential', 3, 'active'),

  ('esdm', 'karnataka', 'rest-of-karnataka',
   'percentage', 2.0,
   'Distributed', 2, 'active');

-- =============================================================================
-- STARTUPS (Based on ecosystem concentration)
-- =============================================================================
INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, status
) VALUES
  ('startups', 'karnataka', 'bengaluru',
   'percentage', 90.0,
   'Startup ecosystem heavily concentrated in Bengaluru', 5, 'active'),

  ('startups', 'karnataka', 'mysuru',
   'percentage', 3.0,
   'Emerging startup ecosystem', 3, 'active'),

  ('startups', 'karnataka', 'mangaluru',
   'percentage', 2.5,
   'Coastal startup ecosystem', 3, 'active'),

  ('startups', 'karnataka', 'hdb-corridor',
   'percentage', 2.0,
   'Growing startup presence', 3, 'active'),

  ('startups', 'karnataka', 'rest-of-karnataka',
   'percentage', 2.5,
   'Distributed startups', 2, 'active');

-- =============================================================================
-- DIGITIZING SECTORS (Estimated distribution)
-- =============================================================================
INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, status
) VALUES
  ('digitizing-sectors', 'karnataka', 'bengaluru',
   'percentage', 70.0,
   'Digital infrastructure concentration', 3, 'active'),

  ('digitizing-sectors', 'karnataka', 'mysuru',
   'percentage', 8.0,
   'Smart city initiatives', 3, 'active'),

  ('digitizing-sectors', 'karnataka', 'mangaluru',
   'percentage', 8.0,
   'Port city digital logistics', 3, 'active'),

  ('digitizing-sectors', 'karnataka', 'hdb-corridor',
   'percentage', 7.0,
   'Regional hub digitization', 3, 'active'),

  ('digitizing-sectors', 'karnataka', 'rest-of-karnataka',
   'percentage', 7.0,
   'Statewide digital services rollout', 2, 'active');

-- =============================================================================
-- FALLBACK DEFAULTS (For any vertical without specific rules)
-- =============================================================================
-- Use NULL vertical_id with low priority for generic fallbacks
INSERT INTO apportionment_rules (
  vertical_id, from_geography_id, to_geography_id,
  rule_type, percentage_allocation,
  basis, confidence_rating, priority, status
) VALUES
  (NULL, 'karnataka', 'bengaluru',
   'percentage', 80.0,
   'Default: Hub concentration', 2, 10, 'active'),

  (NULL, 'karnataka', 'mysuru',
   'percentage', 5.0,
   'Default: Tier 1 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'mangaluru',
   'percentage', 5.0,
   'Default: Tier 1 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'hdb-corridor',
   'percentage', 4.0,
   'Default: Tier 1 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'kalaburagi',
   'percentage', 2.0,
   'Default: Tier 2 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'tumakuru',
   'percentage', 2.0,
   'Default: Tier 2 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'shivamogga',
   'percentage', 1.0,
   'Default: Tier 3 cluster', 2, 10, 'active'),

  (NULL, 'karnataka', 'rest-of-karnataka',
   'percentage', 1.0,
   'Default: Distributed', 2, 10, 'active');

-- =============================================================================
-- COMMENTS
-- =============================================================================
COMMENT ON TABLE apportionment_rules IS 'Query with ORDER BY priority DESC, confidence_rating DESC to get best match. Vertical-specific rules take precedence over NULL vertical_id fallbacks.';
