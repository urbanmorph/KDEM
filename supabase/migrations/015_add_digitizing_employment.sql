-- ============================================================================
-- KDEM Database: Add Digitizing Sector Employment (Estimated)
-- ============================================================================
-- Migration: 015
-- Date: 2026-02-09
-- Purpose:
--   Add employment targets for the digitizing-sectors vertical.
--   Employment computed from per sub-sector ratios (5-40 emp/$1M) applied
--   to proportional FY31-32 revenue ($35B distributed by FY25 shares).
--
--   Blended ratio: 14.3 emp/$1M → ~499K total employment
--
--   Geographic distribution reflects where digitizing economic activity
--   occurs (agriculture, logistics, retail are more distributed than IT):
--     Bengaluru: 40% (platform HQs, fintech, edtech)
--     Mysuru: 12%
--     Mangaluru: 8%
--     HDB Corridor: 8%
--     Kalaburagi: 5% (agriculture)
--     Tumakuru: 5%
--     Shivamogga: 4% (agriculture)
--     Rest of KA: 18% (agriculture, logistics, retail)
--
--   CONFIDENCE: 1/5 — Estimated. No actual employment data exists for
--   digitizing sectors in Karnataka. See getDigitizingSubSectors() in
--   referenceData.js for per sub-sector breakdown and rationale.
--
-- Source: Per sub-sector employment ratios — see Employment Target Analysis
--         (Feb 2026) supporting document
-- ============================================================================

-- Bengaluru: 40% of 499,000 = 199,600
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'bengaluru', 'labour', 2030, 'employment', 199600, 'employees',
    'Estimated: per sub-sector ratios (5-40 emp/$1M, blended 14.3). 40% Bengaluru (platform/fintech HQs)',
    1, 'No actual data — estimated from revenue × per sub-sector employment ratios. See referenceData.js getDigitizingSubSectors().',
    NOW(), NOW());

-- Mysuru: 12% of 499,000 = 59,880
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'mysuru', 'labour', 2030, 'employment', 59880, 'employees',
    'Estimated: per sub-sector ratios, 12% Mysuru share (education, agri, logistics)',
    1, 'No actual data — estimated. Mysuru has education and agritech presence.',
    NOW(), NOW());

-- Mangaluru: 8% of 499,000 = 39,920
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'mangaluru', 'labour', 2030, 'employment', 39920, 'employees',
    'Estimated: per sub-sector ratios, 8% Mangaluru share (logistics, commerce, fintech)',
    1, 'No actual data — estimated. Mangaluru has port logistics and commerce digitization.',
    NOW(), NOW());

-- HDB Corridor: 8% of 499,000 = 39,920
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'hdb-corridor', 'labour', 2030, 'employment', 39920, 'employees',
    'Estimated: per sub-sector ratios, 8% HDB share (agriculture, logistics)',
    1, 'No actual data — estimated. HDB corridor has agri and logistics hub potential.',
    NOW(), NOW());

-- Kalaburagi: 5% of 499,000 = 24,950
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'kalaburagi', 'labour', 2030, 'employment', 24950, 'employees',
    'Estimated: per sub-sector ratios, 5% Kalaburagi share (agriculture, DBT)',
    1, 'No actual data — estimated. Kalaburagi is agricultural region with DBT and agrifintech potential.',
    NOW(), NOW());

-- Tumakuru: 5% of 499,000 = 24,950
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'tumakuru', 'labour', 2030, 'employment', 24950, 'employees',
    'Estimated: per sub-sector ratios, 5% Tumakuru share (smart grid, manufacturing digitization)',
    1, 'No actual data — estimated. Tumakuru has industrial and energy infrastructure.',
    NOW(), NOW());

-- Shivamogga: 4% of 499,000 = 19,960
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'shivamogga', 'labour', 2030, 'employment', 19960, 'employees',
    'Estimated: per sub-sector ratios, 4% Shivamogga share (precision agriculture, agri marketplace)',
    1, 'No actual data — estimated. Shivamogga has agriculture and forestry digitization potential.',
    NOW(), NOW());

-- Rest of Karnataka: 18% of 499,000 = 89,820
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
VALUES ('digitizing-sectors', 'rest-of-karnataka', 'labour', 2030, 'employment', 89820, 'employees',
    'Estimated: per sub-sector ratios, 18% rest-of-KA share (agriculture, rural logistics, traditional retail)',
    1, 'No actual data — estimated. Distributed agriculture, logistics, and retail digitization across smaller towns.',
    NOW(), NOW());

-- ============================================================================
-- Add corresponding land targets (employment × 200 sq ft / 1M)
-- ============================================================================
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at)
SELECT
    vertical_id, geography_id, 'land' as factor_id, year,
    'land_required' as metric,
    value * 200 / 1000000 as value,
    'million_sq_ft' as unit,
    'Auto-calculated from estimated digitizing employment × 200 sq ft/employee' as data_source,
    1 as confidence_rating,
    'Employment × 200 sq ft per employee ÷ 1M' as formula,
    NOW() as created_at, NOW() as updated_at
FROM targets
WHERE vertical_id = 'digitizing-sectors'
  AND metric = 'employment'
  AND year = 2030;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
DECLARE
    dig_emp numeric;
    total_emp numeric;
    geo_count integer;
BEGIN
    SELECT COALESCE(SUM(value), 0), COUNT(*) INTO dig_emp, geo_count
    FROM targets WHERE metric = 'employment' AND year = 2030
      AND vertical_id = 'digitizing-sectors';

    SELECT COALESCE(SUM(value), 0) INTO total_emp
    FROM targets WHERE metric = 'employment' AND year = 2030;

    RAISE NOTICE '================================================';
    RAISE NOTICE 'Migration 015: Digitizing Employment Added';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Digitizing employment: % across % geographies', TO_CHAR(dig_emp, 'FM999,999'), geo_count;
    RAISE NOTICE 'Total employment (all verticals): %', TO_CHAR(total_emp, 'FM9,999,999');
    RAISE NOTICE 'Blended ratio: 14.3 emp/$1M (confidence 1/5)';
    RAISE NOTICE '================================================';
END $$;
