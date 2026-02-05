-- ============================================================================
-- KDEM Dashboard: Add Capital Requirements for Karnataka and Bengaluru
-- ============================================================================
-- Migration: 008
-- Date: 2026-02-05
-- Purpose: Fix missing capital data for Karnataka and Bengaluru geographies
--
-- ISSUE: Migration 007 explicitly excluded Karnataka and Bengaluru from
--        capital data generation (line 303: geography_id NOT IN (...))
--        This caused capital values to show as zero on those pages.
--
-- SOLUTION: Generate capital_required using the same formula as clusters:
--           Capital = Revenue × 0.6 × 83 (USD to INR conversion)
-- ============================================================================

-- ====================
-- 1. ADD CAPITAL FOR KARNATAKA AND BENGALURU
-- ====================
-- Formula: Revenue × 0.6 × 83
-- - 0.6 = CapEx ratio (60% of revenue as capital intensity)
-- - 83 = USD to INR conversion rate (₹83 per $1 USD)
-- - Result in INR Crores

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at
)
SELECT
    vertical_id,
    geography_id,
    'capital' as factor_id,
    year,
    'capital_required' as metric,
    value * 0.6 * 83 as value,  -- Convert USD to INR and apply 0.6 ratio
    'INR_CR' as unit,
    'Auto-calculated: Revenue × 0.6 × 83 (USD to INR)' as data_source,
    3 as confidence_rating,
    'Revenue × 0.6 × 83' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'revenue'
  AND factor_id IS NULL
  AND geography_id IN ('karnataka', 'bengaluru')  -- Only these two geographies
  AND year IN (2021, 2022, 2023, 2024, 2025, 2026, 2027, 2030);  -- All years with revenue data

-- ====================
-- 2. VERIFICATION QUERIES
-- ====================

-- Verify capital records were created
DO $$
DECLARE
    karnataka_count INTEGER;
    bengaluru_count INTEGER;
    karnataka_total NUMERIC;
    bengaluru_total NUMERIC;
BEGIN
    -- Count records for Karnataka
    SELECT COUNT(*), COALESCE(SUM(value), 0)
    INTO karnataka_count, karnataka_total
    FROM targets
    WHERE geography_id = 'karnataka'
      AND metric = 'capital_required';

    -- Count records for Bengaluru
    SELECT COUNT(*), COALESCE(SUM(value), 0)
    INTO bengaluru_count, bengaluru_total
    FROM targets
    WHERE geography_id = 'bengaluru'
      AND metric = 'capital_required';

    RAISE NOTICE '================================================';
    RAISE NOTICE 'Capital Data Migration Complete!';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Karnataka:';
    RAISE NOTICE '  - Capital records created: %', karnataka_count;
    RAISE NOTICE '  - Total capital (all years): ₹% Cr', ROUND(karnataka_total, 2);
    RAISE NOTICE '';
    RAISE NOTICE 'Bengaluru:';
    RAISE NOTICE '  - Capital records created: %', bengaluru_count;
    RAISE NOTICE '  - Total capital (all years): ₹% Cr', ROUND(bengaluru_total, 2);
    RAISE NOTICE '================================================';

    -- Verify 2030 targets specifically
    RAISE NOTICE '';
    RAISE NOTICE '2030 Target Verification:';
    RAISE NOTICE '------------------------------------------------';
END $$;

-- Show 2030 capital targets by vertical
SELECT
    CASE
        WHEN geography_id = 'karnataka' THEN 'KARNATAKA'
        WHEN geography_id = 'bengaluru' THEN 'BENGALURU'
    END as geography,
    vertical_id,
    ROUND(value, 2) as capital_inr_cr,
    unit
FROM targets
WHERE geography_id IN ('karnataka', 'bengaluru')
  AND metric = 'capital_required'
  AND year = 2030
ORDER BY geography_id, vertical_id;

-- ====================
-- 3. SANITY CHECK
-- ====================
-- Verify capital aligns with revenue

DO $$
DECLARE
    v_record RECORD;
    expected_capital NUMERIC;
    actual_capital NUMERIC;
    diff NUMERIC;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Sanity Check: Capital vs Revenue (2030)';
    RAISE NOTICE '================================================';

    FOR v_record IN
        SELECT
            r.geography_id,
            r.vertical_id,
            r.value as revenue_usd_bn,
            c.value as capital_inr_cr
        FROM targets r
        LEFT JOIN targets c
            ON r.geography_id = c.geography_id
            AND r.vertical_id = c.vertical_id
            AND r.year = c.year
            AND c.metric = 'capital_required'
        WHERE r.metric = 'revenue'
          AND r.geography_id IN ('karnataka', 'bengaluru')
          AND r.year = 2030
        ORDER BY r.geography_id, r.vertical_id
    LOOP
        expected_capital := v_record.revenue_usd_bn * 0.6 * 83;
        actual_capital := COALESCE(v_record.capital_inr_cr, 0);
        diff := ABS(expected_capital - actual_capital);

        IF diff > 0.01 THEN
            RAISE NOTICE '⚠️  MISMATCH: % / %', v_record.geography_id, v_record.vertical_id;
            RAISE NOTICE '   Expected: ₹% Cr, Actual: ₹% Cr',
                ROUND(expected_capital, 2), ROUND(actual_capital, 2);
        ELSE
            RAISE NOTICE '✓ OK: % / %: ₹% Cr',
                v_record.geography_id, v_record.vertical_id, ROUND(actual_capital, 2);
        END IF;
    END LOOP;

    RAISE NOTICE '================================================';
END $$;

-- ====================
-- 4. SUMMARY
-- ====================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Migration 008 Complete';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Summary:';
    RAISE NOTICE '  - Added capital_required metric for Karnataka';
    RAISE NOTICE '  - Added capital_required metric for Bengaluru';
    RAISE NOTICE '  - Formula: Revenue × 0.6 × 83';
    RAISE NOTICE '  - Years covered: 2021-2030';
    RAISE NOTICE '  - Confidence rating: 3 (derived data)';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '  1. Test the frontend to verify capital shows correctly';
    RAISE NOTICE '  2. Check Bengaluru geography page';
    RAISE NOTICE '  3. Check Overview (Karnataka) page';
    RAISE NOTICE '  4. Verify progress bars display properly';
    RAISE NOTICE '================================================';
END $$;
