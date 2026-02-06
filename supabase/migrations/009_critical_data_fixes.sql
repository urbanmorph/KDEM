-- ============================================================================
-- KDEM Database Critical Fixes
-- ============================================================================
-- Migration: 009
-- Date: 2026-02-06
-- Priority: CRITICAL - Must apply before production launch
-- Purpose: Fix ESDM employment typo and remove geographic double-counting
-- ============================================================================

-- ============================================================================
-- FIX #1: Correct ESDM Employment (CRITICAL)
-- ============================================================================
-- Issue: ESDM employment is 10,500,000 (appears to be typo - extra zero)
-- Impact: Shows ESDM as 58% of all jobs when should be 12%
-- Fix: Change to 1,050,000 (divide by 10)
-- ============================================================================

-- Update ESDM employment for all geographies and all years (divide by 10)
UPDATE targets
SET value = value / 10,
    updated_at = NOW()
WHERE vertical_id = 'esdm'
    AND metric = 'employment';

-- ============================================================================
-- FIX #2: Remove Geographic Double-Counting (CRITICAL)
-- ============================================================================
-- Issue: State-level "karnataka" targets duplicate city-level targets
-- Impact: When summing geographies, totals are 2x actual
-- Fix: Delete state-level targets; compute them dynamically from cities
-- ============================================================================

-- Delete state-level targets (they should be computed as SUM of cities)
DELETE FROM targets
WHERE geography_id = 'karnataka';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Log the results
DO $$
DECLARE
    total_employment numeric;
    esdm_employment numeric;
    esdm_pct numeric;
BEGIN
    -- Get total employment
    SELECT SUM(value) INTO total_employment
    FROM targets
    WHERE metric = 'employment' AND year = 2030;

    -- Get ESDM employment
    SELECT SUM(value) INTO esdm_employment
    FROM targets
    WHERE metric = 'employment' AND year = 2030 AND vertical_id = 'esdm';

    -- Calculate percentage
    esdm_pct := (esdm_employment / total_employment * 100);

    RAISE NOTICE '================================================';
    RAISE NOTICE 'Critical Data Fixes Applied';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Fix #1: ESDM Employment Corrected';
    RAISE NOTICE 'Fix #2: State-Level Targets Removed';
    RAISE NOTICE 'Total Employment (2030): %.2f million', total_employment / 1000000;
    RAISE NOTICE 'ESDM Percentage: %.1f%%', esdm_pct;
    RAISE NOTICE '================================================';
END $$;
