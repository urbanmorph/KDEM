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
