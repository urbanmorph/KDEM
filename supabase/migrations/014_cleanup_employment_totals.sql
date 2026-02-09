-- ============================================================================
-- KDEM Database: Cleanup Employment Totals
-- ============================================================================
-- Migration: 014
-- Date: 2026-02-09
-- Purpose:
--   1. Delete digitizing-sectors employment (not modeled, inflates total)
--   2. Add missing ESDM employment to rest-of-karnataka (150K unallocated)
--   3. Delete digitizing-sectors land targets (derived from deleted employment)
--   4. Add ESDM land for rest-of-karnataka
--
-- Expected result: ~4.1M total employment (medium AI scenario)
-- ============================================================================

-- ============================================================================
-- 1. DELETE DIGITIZING-SECTORS EMPLOYMENT
-- ============================================================================
-- Per Employment Target Analysis (Feb 2026): digitizing sector employment
-- is "not modeled" — revenue target ($35B) exists but employment conversion
-- is not meaningful for these emerging sectors.

DELETE FROM targets
WHERE vertical_id = 'digitizing-sectors'
  AND metric = 'employment';

-- Also delete derived land targets for digitizing sectors
DELETE FROM targets
WHERE vertical_id = 'digitizing-sectors'
  AND metric = 'land_required';

-- ============================================================================
-- 2. ADD MISSING ESDM EMPLOYMENT TO REST-OF-KARNATAKA
-- ============================================================================
-- ESDM Karnataka total should be 855,000 (medium AI: $95B × 9 emp/$1M)
-- Currently allocated: Bengaluru 513K + Mysuru 102.6K + HDB 85.5K + others 4K = 705K
-- Missing: ~150,000 for rest-of-karnataka

INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at)
SELECT 'esdm', 'rest-of-karnataka', 'labour', 2030, 'employment', 150000, 'employees',
    'AI-adjusted medium scenario: residual ESDM not allocated to named clusters',
    2, 'Rest of KA = 855K total - 705K allocated = 150K residual (17.5%)',
    NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM targets
    WHERE vertical_id = 'esdm' AND geography_id = 'rest-of-karnataka'
      AND metric = 'employment' AND year = 2030
);

-- If it already exists, update it
UPDATE targets
SET value = 150000,
    data_source = 'AI-adjusted medium scenario: residual ESDM not allocated to named clusters',
    notes = 'Rest of KA = 855K total - 705K allocated = 150K residual (17.5%)',
    updated_at = NOW()
WHERE vertical_id = 'esdm'
  AND geography_id = 'rest-of-karnataka'
  AND metric = 'employment'
  AND year = 2030;

-- Add corresponding land target for ESDM rest-of-karnataka
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at)
SELECT 'esdm', 'rest-of-karnataka', 'land', 2030, 'land_required',
    150000 * 200 / 1000000, 'million_sq_ft',
    'Auto-calculated from ESDM employment × 200 sq ft/employee',
    2, 'Employment × 200 sq ft per employee ÷ 1M',
    NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM targets
    WHERE vertical_id = 'esdm' AND geography_id = 'rest-of-karnataka'
      AND metric = 'land_required' AND year = 2030
);

-- ============================================================================
-- 3. VERIFICATION
-- ============================================================================
DO $$
DECLARE
    total_emp numeric;
    it_exp_emp numeric;
    it_dom_emp numeric;
    esdm_emp numeric;
    startup_emp numeric;
    digitizing_emp numeric;
BEGIN
    SELECT COALESCE(SUM(value), 0) INTO total_emp
    FROM targets WHERE metric = 'employment' AND year = 2030;

    SELECT COALESCE(SUM(value), 0) INTO it_exp_emp
    FROM targets WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'it-exports';

    SELECT COALESCE(SUM(value), 0) INTO it_dom_emp
    FROM targets WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'it-domestic';

    SELECT COALESCE(SUM(value), 0) INTO esdm_emp
    FROM targets WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'esdm';

    SELECT COALESCE(SUM(value), 0) INTO startup_emp
    FROM targets WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'startups';

    SELECT COALESCE(SUM(value), 0) INTO digitizing_emp
    FROM targets WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'digitizing-sectors';

    RAISE NOTICE '================================================';
    RAISE NOTICE 'Migration 014: Employment Cleanup Complete';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'IT Exports:  % employees', TO_CHAR(it_exp_emp, 'FM9,999,999');
    RAISE NOTICE 'IT Domestic: % employees', TO_CHAR(it_dom_emp, 'FM9,999,999');
    RAISE NOTICE 'ESDM:        % employees', TO_CHAR(esdm_emp, 'FM9,999,999');
    RAISE NOTICE 'Startups:    % (should be 0)', TO_CHAR(startup_emp, 'FM9,999,999');
    RAISE NOTICE 'Digitizing:  % (should be 0)', TO_CHAR(digitizing_emp, 'FM9,999,999');
    RAISE NOTICE '------------------------------------------------';
    RAISE NOTICE 'TOTAL:       % employees', TO_CHAR(total_emp, 'FM9,999,999');
    RAISE NOTICE 'Target:      ~4,100,000 (medium AI scenario)';
    RAISE NOTICE '================================================';
END $$;
