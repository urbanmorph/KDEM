-- ============================================================================
-- KDEM Database: Fix Employment to Single Source of Truth (AI-Adjusted)
-- ============================================================================
-- Migration: 013
-- Date: 2026-02-09
-- Purpose: 
--   1. Remove startup employment (double-counts with NASSCOM IT-BPM headcount)
--   2. Apply AI-adjusted medium scenario conversion ratios to IT verticals
--   3. Recascade land targets from corrected employment
--   4. Store employment scenario metadata
--
-- AI-adjusted ratios (medium scenario, central estimate):
--   IT Exports: 16 emp/$1M (was 20) — Bessemer Oct 2025, NASSCOM AI-era
--   IT Domestic: 18 emp/$1M (was 25) — domestic less AI-affected
--   ESDM: 9 emp/$1M (actual is 7.7) — manufacturing less affected by AI
--
-- Source: Employment Target Analysis (Feb 2026) supporting document
-- ============================================================================

-- ============================================================================
-- 1. DELETE STARTUP EMPLOYMENT (Double-counts with IT-BPM)
-- ============================================================================
-- NASSCOM 5.8M India IT-BPM includes startup company employees.
-- Adding startup employment separately counts workers twice.
-- Startup metrics (count, funding, unicorns) remain — only employment removed.

DELETE FROM targets
WHERE vertical_id = 'startups'
  AND metric = 'employment';

-- Also delete startup land targets (derived from employment that no longer exists)
DELETE FROM targets
WHERE vertical_id = 'startups'
  AND metric = 'land_required';

-- ============================================================================
-- 2. UPDATE BENGALURU EMPLOYMENT TO AI-ADJUSTED MEDIUM SCENARIO
-- ============================================================================

-- IT Exports: Total KA 2,640,000 (medium AI: $165B × 16 emp/$1M)
-- Bengaluru 96% = 2,534,400
UPDATE targets
SET value = 2534400,
    data_source = 'AI-adjusted medium scenario: $165B × 16 emp/$1M × 96% Bengaluru share',
    confidence_rating = 3,
    notes = 'Karnataka total: 2.64M (medium AI). Pre-AI was 3.37M. Adjustment per Bessemer Oct 2025, NASSCOM AI-era projections.',
    updated_at = NOW()
WHERE vertical_id = 'it-exports'
  AND geography_id = 'bengaluru'
  AND metric = 'employment'
  AND year = 2030;

-- IT Domestic: Total KA 612,000 (medium AI: $34B × 18 emp/$1M)
-- Bengaluru 96% = 587,520
UPDATE targets
SET value = 587520,
    data_source = 'AI-adjusted medium scenario: $34B × 18 emp/$1M × 96% Bengaluru share',
    confidence_rating = 3,
    notes = 'Karnataka total: 612K (medium AI). Pre-AI was 890K. Domestic less affected by AI than exports.',
    updated_at = NOW()
WHERE vertical_id = 'it-domestic'
  AND geography_id = 'bengaluru'
  AND metric = 'employment'
  AND year = 2030;

-- ESDM: Total KA 855,000 (medium AI: $95B × 9 emp/$1M)
-- Bengaluru 60% = 513,000
UPDATE targets
SET value = 513000,
    data_source = 'AI-adjusted medium scenario: $95B × 9 emp/$1M × 60% Bengaluru share',
    confidence_rating = 3,
    notes = 'Karnataka total: 855K (medium AI). Pre-AI was 910K. Manufacturing less affected by AI. KA ESDM is design-heavy (7.7 actual ratio).',
    updated_at = NOW()
WHERE vertical_id = 'esdm'
  AND geography_id = 'bengaluru'
  AND metric = 'employment'
  AND year = 2030;

-- ============================================================================
-- 3. SCALE CLUSTER IT EMPLOYMENT BY AI ADJUSTMENT FACTORS
-- ============================================================================
-- IT Exports: adjustment factor = 2,640,000 / 3,370,000 = 0.783
-- IT Domestic: adjustment factor = 612,000 / 890,000 = 0.688
-- ESDM: adjustment factor = 855,000 / 910,000 = 0.940

-- Scale IT Exports employment at all non-bengaluru geographies
UPDATE targets
SET value = ROUND(value * 0.783),
    data_source = 'AI-adjusted (scaled 0.783x from pre-AI): ' || COALESCE(data_source, ''),
    notes = 'AI adjustment: IT Exports 2.64M/3.37M = 0.783x. ' || COALESCE(notes, ''),
    updated_at = NOW()
WHERE vertical_id = 'it-exports'
  AND metric = 'employment'
  AND geography_id != 'bengaluru'
  AND year = 2030;

-- Scale IT Domestic employment at all non-bengaluru geographies
UPDATE targets
SET value = ROUND(value * 0.688),
    data_source = 'AI-adjusted (scaled 0.688x from pre-AI): ' || COALESCE(data_source, ''),
    notes = 'AI adjustment: IT Domestic 612K/890K = 0.688x. ' || COALESCE(notes, ''),
    updated_at = NOW()
WHERE vertical_id = 'it-domestic'
  AND metric = 'employment'
  AND geography_id != 'bengaluru'
  AND year = 2030;

-- Update ESDM Mysuru: 12% of 855K = 102,600
UPDATE targets
SET value = 102600,
    data_source = 'AI-adjusted medium scenario: 12% of KA ESDM 855K',
    notes = 'Mysuru 12% of total KA ESDM employment (855K medium AI)',
    updated_at = NOW()
WHERE vertical_id = 'esdm'
  AND geography_id = 'mysuru'
  AND metric = 'employment'
  AND year = 2030;

-- Update ESDM HDB Corridor (Hubballi-Dharwad-Belagavi): 10% of 855K = 85,500
UPDATE targets
SET value = 85500,
    data_source = 'AI-adjusted medium scenario: 10% of KA ESDM 855K',
    notes = 'Hubballi-Dharwad 10% of total KA ESDM employment (855K medium AI)',
    updated_at = NOW()
WHERE vertical_id = 'esdm'
  AND geography_id = 'hdb-corridor'
  AND metric = 'employment'
  AND year = 2030;

-- Scale remaining ESDM cluster employment (Mangaluru, HDB, Tumakuru, etc.)
UPDATE targets
SET value = ROUND(value * 0.940),
    data_source = 'AI-adjusted (scaled 0.940x): ' || COALESCE(data_source, ''),
    notes = 'AI adjustment: ESDM 855K/910K = 0.940x. ' || COALESCE(notes, ''),
    updated_at = NOW()
WHERE vertical_id = 'esdm'
  AND metric = 'employment'
  AND geography_id NOT IN ('bengaluru', 'mysuru', 'hdb-corridor')
  AND year = 2030;

-- ============================================================================
-- 4. RECASCADE LAND TARGETS FROM CORRECTED EMPLOYMENT
-- ============================================================================
-- Land = Employment × 200 sq ft / 1,000,000 (in M sq ft for clusters)
-- First delete existing auto-calculated land targets, then re-insert

-- Delete cluster-level land targets (will re-insert from new employment)
DELETE FROM targets
WHERE metric = 'land_required'
  AND geography_id NOT IN ('bengaluru')
  AND year = 2030
  AND data_source LIKE '%Auto-calculated%';

-- Re-insert land from corrected employment (clusters use M sq ft)
INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at
)
SELECT
    vertical_id,
    geography_id,
    'land' as factor_id,
    year,
    'land_required' as metric,
    value * 200 / 1000000 as value,
    'million_sq_ft' as unit,
    'Auto-calculated from AI-adjusted employment × 200 sq ft/employee' as data_source,
    3 as confidence_rating,
    'Employment × 200 sq ft per employee ÷ 1M' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'employment'
  AND factor_id = 'labour'
  AND geography_id NOT IN ('bengaluru')
  AND year = 2030;

-- Update Bengaluru land targets from corrected employment
UPDATE targets
SET value = (
    SELECT SUM(e.value) * 200
    FROM targets e
    WHERE e.metric = 'employment'
      AND e.geography_id = 'bengaluru'
      AND e.year = 2030
      AND e.vertical_id = targets.vertical_id
),
    data_source = 'Auto-calculated from AI-adjusted employment × 200 sq ft/employee',
    updated_at = NOW()
WHERE metric = 'land_required'
  AND geography_id = 'bengaluru'
  AND year = 2030
  AND vertical_id IN (
    SELECT DISTINCT vertical_id FROM targets
    WHERE metric = 'employment' AND geography_id = 'bengaluru' AND year = 2030
  );

-- ============================================================================
-- 5. VERIFICATION
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
    RAISE NOTICE 'Migration 013: Employment Fixed (AI-Adjusted)';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'IT Exports Employment: %.2fM', it_exp_emp / 1000000;
    RAISE NOTICE 'IT Domestic Employment: %.2fM', it_dom_emp / 1000000;
    RAISE NOTICE 'ESDM Employment: %.2fM', esdm_emp / 1000000;
    RAISE NOTICE 'Startups Employment: %.0f (should be 0 — deleted)', startup_emp;
    RAISE NOTICE 'Digitizing Employment: %.0f (cluster-level only)', digitizing_emp;
    RAISE NOTICE '------------------------------------------------';
    RAISE NOTICE 'TOTAL Employment: %.2fM (target: ~4.1M medium AI)', total_emp / 1000000;
    RAISE NOTICE '================================================';
END $$;
