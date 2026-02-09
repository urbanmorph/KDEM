-- Fix conversion ratios: align ESDM and Startups with actual data
-- The original ratios (ESDM: 100, Startups: 15 employees per $1M) were placeholder benchmarks
-- that never matched actual KDEM data.
--
-- Actual ratios (computed from referenceData.js FY24-25 baselines):
--   ESDM: $36.69B revenue, 284K employees → 7.7 emp/$1M (Karnataka is design-heavy, not assembly)
--   Startups: $8.79B revenue, 920K employees → 104.7 emp/$1M (labor-intensive ecosystem)
--
-- Note: AI-adjusted target ratios for FY31-32 are tracked in referenceData.js
-- (getVerticalBaselines and getKarnatakaBaseline targetEmploymentScenarios)
-- and are NOT stored in this table since they are scenario-dependent.

-- Fix ESDM: was 100 (ICEA assembly benchmark), actual is ~8 (KA is chip design + R&D heavy)
UPDATE conversion_ratios
SET ratio = 8,
    basis = 'MeitY FY24-25 actual: $36.69B / 284K employees = 7.7 emp/$1M. Karnataka ESDM is design-heavy (40% national share in electronic design), not labor-intensive assembly. Rounded to 8.',
    confidence_rating = 4
WHERE vertical_id = 'esdm'
  AND from_metric = 'revenue'
  AND to_metric = 'employment';

-- Fix Startups: was 15 (lean startup estimate), actual is ~105 (includes all startup employees)
UPDATE conversion_ratios
SET ratio = 105,
    basis = 'KDEM Excel FY24-25: $8.79B / 920K employees = 104.7 emp/$1M. High ratio reflects labor-intensive startup ecosystem (many early-stage companies with high headcount relative to revenue).',
    confidence_rating = 3
WHERE vertical_id = 'startups'
  AND from_metric = 'revenue'
  AND to_metric = 'employment';

-- Add note: startup employment double-counts with IT-BPM
-- (NASSCOM 5.8M India IT-BPM includes startup company employees)
COMMENT ON TABLE conversion_ratios IS 'Industry-standard ratios for cascading from revenue to factors. Note: Startup employment ratio should NOT be used to add to IT employment totals — it double-counts with NASSCOM IT-BPM figures. AI-adjusted target ratios for FY31-32 tracked in application code (referenceData.js).';
