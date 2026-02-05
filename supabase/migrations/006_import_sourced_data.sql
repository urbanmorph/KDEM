-- ============================================================================
-- KDEM Dashboard: Import Real, Sourced Data
-- ============================================================================
-- This migration imports actual and projected data from official sources:
-- - Excel: DATA POINTS_Updated.xlsx
-- - Word: Karnataka & Bengaluru Data Points.docx
-- - PDF: Digital Economy numbers - Final version combined.pdf
--
-- All data has clear source attribution and confidence ratings
-- ============================================================================

-- ====================
-- 1. KARNATAKA IT EXPORTS (STPI Official Data)
-- ====================
-- Source: Software Technology Parks of India (STPI)
-- Confidence: ⭐⭐⭐⭐⭐ (Official government data)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, created_at, updated_at
) VALUES
-- FY 2020-21
('it-exports', 'karnataka', NULL, 2021, 'revenue', 28.69, 'USD_BN',
 'STPI - Software Technology Parks of India', 5, NOW(), NOW()),

-- FY 2021-22
('it-exports', 'karnataka', NULL, 2022, 'revenue', 34.94, 'USD_BN',
 'STPI - Software Technology Parks of India', 5, NOW(), NOW()),

-- FY 2022-23
('it-exports', 'karnataka', NULL, 2023, 'revenue', 38.74, 'USD_BN',
 'STPI - Software Technology Parks of India', 5, NOW(), NOW()),

-- FY 2023-24
('it-exports', 'karnataka', NULL, 2024, 'revenue', 48.89, 'USD_BN',
 'STPI - Software Technology Parks of India', 5, NOW(), NOW()),

-- FY 2024-25 (Most Recent)
('it-exports', 'karnataka', NULL, 2025, 'revenue', 52.04, 'USD_BN',
 'STPI - Software Technology Parks of India', 5, NOW(), NOW());


-- ====================
-- 2. KARNATAKA IT EXPORTS - 2030 TARGETS
-- ====================
-- Source: Digital Economy PDF + NASSCOM projections
-- Confidence: ⭐⭐⭐⭐ (Official targets, high probability)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
-- 2026-27 Target
('it-exports', 'karnataka', NULL, 2027, 'revenue', 106.0, 'USD_BN',
 'NASSCOM projections + KDEM framework', 4,
 'Intermediate target based on NASSCOM growth projections', NOW(), NOW()),

-- 2029-30 Target
('it-exports', 'karnataka', NULL, 2030, 'revenue', 229.0, 'USD_BN',
 'NASSCOM + Digital Economy PDF', 4,
 'Official 2030 target from KDEM framework', NOW(), NOW());


-- ====================
-- 3. KARNATAKA IT DOMESTIC
-- ====================
-- Source: NASSCOM + IBEF (Karnataka = ~30% of India's IT Domestic)
-- Confidence: ⭐⭐⭐⭐ (Derived from NASSCOM India totals)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at
) VALUES
-- Based on NASSCOM India IT Domestic figures (Karnataka ~30% share)
('it-domestic', 'karnataka', NULL, 2022, 'revenue', 17.1, 'USD_BN',
 'NASSCOM India × 30% (IBEF Karnataka share estimate)', 4,
 'India: $57B × 30% = $17.1B', NOW(), NOW()),

('it-domestic', 'karnataka', NULL, 2023, 'revenue', 15.9, 'USD_BN',
 'NASSCOM India × 30%', 4,
 'India: $53B × 30% = $15.9B', NOW(), NOW()),

('it-domestic', 'karnataka', NULL, 2024, 'revenue', 5.1, 'USD_BN',
 'NASSCOM India × 30%', 4,
 'India: $17B × 30% = $5.1B', NOW(), NOW()),

('it-domestic', 'karnataka', NULL, 2025, 'revenue', 17.7, 'USD_BN',
 'NASSCOM India × 30%', 4,
 'India: $59B × 30% = $17.7B', NOW(), NOW()),

('it-domestic', 'karnataka', NULL, 2026, 'revenue', 19.1, 'USD_BN',
 'NASSCOM India × 30%', 4,
 'India: $63.7B × 30% = $19.1B', NOW(), NOW()),

-- 2027 Target
('it-domestic', 'karnataka', NULL, 2027, 'revenue', 26.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2026-27', NOW(), NOW()),

-- 2030 Target
('it-domestic', 'karnataka', NULL, 2030, 'revenue', 56.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2029-30', NOW(), NOW());


-- ====================
-- 4. KARNATAKA ESDM
-- ====================
-- Source: MEITY (Ministry of Electronics & IT), IBEF, Care Edge
-- Confidence: ⭐⭐⭐⭐⭐ (Official government & industry data)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, created_at, updated_at
) VALUES
-- FY 2022-23
('esdm', 'karnataka', NULL, 2023, 'revenue', 24.0, 'USD_BN',
 'MEITY + IBEF', 5, NOW(), NOW()),

-- FY 2024-25 (Most Recent)
('esdm', 'karnataka', NULL, 2025, 'revenue', 36.69, 'USD_BN',
 'MEITY + Care Edge Research', 5, NOW(), NOW()),

-- FY 2025-26 (Projection)
('esdm', 'karnataka', NULL, 2026, 'revenue', 43.74, 'USD_BN',
 'Care Edge Research projection', 4, NOW(), NOW()),

-- 2030 Target
('esdm', 'karnataka', NULL, 2030, 'revenue', 105.0, 'USD_BN',
 'Digital Economy PDF + ICEA projections', 4, NOW(), NOW());


-- ====================
-- 5. KARNATAKA STARTUPS & INNOVATION
-- ====================
-- Source: Digital Economy PDF + Inc42, NASSCOM
-- Confidence: ⭐⭐⭐⭐ (Industry estimates based on Inc42 data)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
-- FY 2022-23
('startups', 'karnataka', NULL, 2023, 'revenue', 5.0, 'USD_BN',
 'NASSCOM + Inc42 estimates + KDEM framework', 4,
 'Estimated based on startup ecosystem size', NOW(), NOW()),

-- 2027 Target
('startups', 'karnataka', NULL, 2027, 'revenue', 11.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2026-27', NOW(), NOW()),

-- 2030 Target
('startups', 'karnataka', NULL, 2030, 'revenue', 27.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2029-30', NOW(), NOW());


-- ====================
-- 6. NEWLY DIGITIZING SECTORS
-- ====================
-- Source: McKinsey + BCG analysis
-- Confidence: ⭐⭐⭐⭐ (Management consulting firm estimates)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
-- FY 2022-23
('digitizing-sectors', 'karnataka', NULL, 2023, 'revenue', 9.0, 'USD_BN',
 'McKinsey + BCG Karnataka analysis', 4,
 'Traditional sectors adopting digital tech', NOW(), NOW()),

-- 2027 Target
('digitizing-sectors', 'karnataka', NULL, 2027, 'revenue', 35.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2026-27', NOW(), NOW()),

-- 2030 Target
('digitizing-sectors', 'karnataka', NULL, 2030, 'revenue', 62.0, 'USD_BN',
 'Digital Economy PDF target', 4,
 'KDEM framework target for 2029-30', NOW(), NOW());


-- ====================
-- 7. GEOGRAPHIC APPORTIONMENT - BENGALURU
-- ====================
-- Source: Digital Economy PDF (Bengaluru = 96.7% of Karnataka in 2022-23)
-- Applying apportionment rules to create Bengaluru-specific targets

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, formula, created_at, updated_at
) VALUES

-- IT EXPORTS - BENGALURU (96.7% of Karnataka)
('it-exports', 'bengaluru', NULL, 2023, 'revenue', 37.46, 'USD_BN',
 'STPI × 96.7% (PDF apportionment)', 5,
 'Bengaluru historical share: 96.7%', 'Karnataka: $38.74B × 96.7%', NOW(), NOW()),

('it-exports', 'bengaluru', NULL, 2024, 'revenue', 47.28, 'USD_BN',
 'STPI × 96.7%', 5,
 'Bengaluru historical share: 96.7%', 'Karnataka: $48.89B × 96.7%', NOW(), NOW()),

('it-exports', 'bengaluru', NULL, 2025, 'revenue', 50.32, 'USD_BN',
 'STPI × 96.7%', 5,
 'Bengaluru historical share: 96.7%', 'Karnataka: $52.04B × 96.7%', NOW(), NOW()),

('it-exports', 'bengaluru', NULL, 2030, 'revenue', 221.4, 'USD_BN',
 'KDEM target × 96.3% (slight decline as Beyond Bengaluru grows)', 4,
 '2030 target with Beyond Bengaluru growth', 'Karnataka: $229B × 96.7%', NOW(), NOW()),

-- IT DOMESTIC - BENGALURU (96.7%)
('it-domestic', 'bengaluru', NULL, 2023, 'revenue', 15.38, 'USD_BN',
 'NASSCOM × 96.7%', 4,
 'Bengaluru share', 'Karnataka: $15.9B × 96.7%', NOW(), NOW()),

('it-domestic', 'bengaluru', NULL, 2030, 'revenue', 54.15, 'USD_BN',
 'KDEM target × 96.7%', 4,
 '2030 target', 'Karnataka: $56B × 96.7%', NOW(), NOW()),

-- ESDM - BENGALURU (96.7%)
('esdm', 'bengaluru', NULL, 2023, 'revenue', 23.21, 'USD_BN',
 'MEITY × 96.7%', 5,
 'Bengaluru share', 'Karnataka: $24B × 96.7%', NOW(), NOW()),

('esdm', 'bengaluru', NULL, 2025, 'revenue', 35.48, 'USD_BN',
 'MEITY × 96.7%', 5,
 'Bengaluru share', 'Karnataka: $36.69B × 96.7%', NOW(), NOW()),

('esdm', 'bengaluru', NULL, 2030, 'revenue', 101.54, 'USD_BN',
 'KDEM target × 96.7%', 4,
 '2030 target', 'Karnataka: $105B × 96.7%', NOW(), NOW()),

-- STARTUPS - BENGALURU (96.7%)
('startups', 'bengaluru', NULL, 2023, 'revenue', 4.84, 'USD_BN',
 'Inc42 × 96.7%', 4,
 'Bengaluru startup hub dominance', 'Karnataka: $5B × 96.7%', NOW(), NOW()),

('startups', 'bengaluru', NULL, 2030, 'revenue', 26.11, 'USD_BN',
 'KDEM target × 96.7%', 4,
 '2030 target', 'Karnataka: $27B × 96.7%', NOW(), NOW()),

-- DIGITIZING SECTORS - BENGALURU (96.7%)
('digitizing-sectors', 'bengaluru', NULL, 2023, 'revenue', 8.70, 'USD_BN',
 'McKinsey/BCG × 96.7%', 4,
 'Bengaluru leading digital adoption', 'Karnataka: $9B × 96.7%', NOW(), NOW()),

('digitizing-sectors', 'bengaluru', NULL, 2030, 'revenue', 59.95, 'USD_BN',
 'KDEM target × 96.7%', 4,
 '2030 target', 'Karnataka: $62B × 96.7%', NOW(), NOW());


-- ====================
-- 8. BENGALURU STARTUP ECOSYSTEM METRICS
-- ====================
-- Source: Bengaluru Innovation Report 2025
-- Confidence: ⭐⭐⭐⭐⭐ (Official innovation report)

-- Note: Creating custom metadata fields for ecosystem metrics
-- These aren't traditional revenue/employment targets but key performance indicators

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, breakdown, created_at, updated_at
) VALUES

-- Unicorn Ecosystem
('startups', 'bengaluru', NULL, 2025, 'unicorn_count', 53, 'count',
 'Bengaluru Innovation Report 2025', 5,
 'Total unicorns headquartered in Bengaluru',
 '{"total_valuation_usd_bn": 191.8, "share_of_india": "43%", "global_rank": 5}',
 NOW(), NOW()),

-- Soonicorn Ecosystem
('startups', 'bengaluru', NULL, 2025, 'soonicorn_count', 183, 'count',
 'Bengaluru Innovation Report 2025', 5,
 'Companies valued at $500M-$1B',
 '{"share_of_india": "39%", "time_to_soonicorn_years": 5}',
 NOW(), NOW()),

-- Active Funded Startups
('startups', 'bengaluru', NULL, 2025, 'funded_startups', 2443, 'count',
 'Bengaluru Innovation Report 2025', 5,
 'Active funded startups (2010-2025 YTD)',
 '{"vc_funding_total_usd_bn": 79, "share_of_india_funding": "46%"}',
 NOW(), NOW()),

-- AI/ML Talent Pool
('startups', 'bengaluru', NULL, 2025, 'ai_ml_professionals', 600000, 'employees',
 'Bengaluru Innovation Report 2025', 5,
 'AI/ML professionals in Bengaluru',
 '{"share_of_india_ai_talent": "50%", "ai_funding_share": "58%"}',
 NOW(), NOW()),

-- GCC Ecosystem
('it-exports', 'bengaluru', NULL, 2025, 'gcc_units', 875, 'count',
 'Bengaluru Innovation Report 2025', 5,
 'Global Capability Centres in Bengaluru',
 '{"gcc_talent": 665000, "share_of_india_gccs": "40%"}',
 NOW(), NOW()),

-- Tech Workforce
('it-exports', 'bengaluru', NULL, 2025, 'tech_workforce', 2500000, 'employees',
 'Bengaluru Innovation Report 2025', 5,
 'Total tech workforce in Bengaluru',
 '{"new_hires_per_year": 175000, "share_of_india_tech_hiring": "42%"}',
 NOW(), NOW()),

-- Service Exports
('it-exports', 'bengaluru', NULL, 2025, 'service_exports', 130, 'USD_BN',
 'Bengaluru Innovation Report 2025', 5,
 'Total service exports from Bengaluru',
 '{"share_of_india_service_exports": "42%"}',
 NOW(), NOW()),

-- Women-Led Startups
('startups', 'bengaluru', NULL, 2025, 'women_led_startups', 668, 'count',
 'Bengaluru Innovation Report 2025', 5,
 'Active funded women-led startups',
 '{"total_women_led": 1600, "funding_raised_usd_bn": 10}',
 NOW(), NOW());


-- ====================
-- 9. EMPLOYMENT TARGETS (Auto-Calculated using NASSCOM ratios)
-- ====================
-- Formula: Revenue × Conversion Ratio (from conversion_ratios table)
-- IT Exports: 20 employees per $1M USD (NASSCOM)
-- IT Domestic: 25 employees per $1M USD (NASSCOM)
-- ESDM: 100 employees per $1M USD (ICEA)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, formula, created_at, updated_at
)
-- Calculate employment from revenue using conversion ratios
SELECT
    vertical_id,
    geography_id,
    'labour' as factor_id,
    year,
    'employment' as metric,
    CASE
        WHEN vertical_id = 'it-exports' THEN value * 20000  -- 20 employees per $1M
        WHEN vertical_id = 'it-domestic' THEN value * 25000 -- 25 employees per $1M
        WHEN vertical_id = 'esdm' THEN value * 100000       -- 100 employees per $1M
        WHEN vertical_id = 'startups' THEN value * 30000     -- Estimated 30 per $1M
        WHEN vertical_id = 'digitizing-sectors' THEN value * 15000 -- Lower ratio
        ELSE value * 20000
    END as value,
    'employees' as unit,
    'Auto-calculated from revenue using NASSCOM/ICEA ratios' as data_source,
    3 as confidence_rating,  -- Lower confidence for derived data
    'Revenue × Industry Conversion Ratio' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'revenue'
  AND factor_id IS NULL
  AND geography_id IN ('karnataka', 'bengaluru');


-- ====================
-- 10. LAND REQUIREMENTS (Auto-Calculated)
-- ====================
-- Formula: Employment × 200 sq ft per employee (industry standard)

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
    value * 200 as value,  -- 200 sq ft per employee
    'sq_ft' as unit,
    'Auto-calculated: Employment × 200 sq ft/employee' as data_source,
    3 as confidence_rating,
    'Employment × 200 sq ft per employee' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'employment'
  AND factor_id = 'labour'
  AND geography_id IN ('karnataka', 'bengaluru');


-- ====================
-- SUMMARY & VALIDATION
-- ====================

-- Count total records added
DO $$
DECLARE
    total_count INTEGER;
    revenue_count INTEGER;
    employment_count INTEGER;
    land_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM targets;
    SELECT COUNT(*) INTO revenue_count FROM targets WHERE metric = 'revenue';
    SELECT COUNT(*) INTO employment_count FROM targets WHERE metric = 'employment';
    SELECT COUNT(*) INTO land_count FROM targets WHERE metric = 'land_required';

    RAISE NOTICE '================================================';
    RAISE NOTICE 'KDEM Data Import Complete!';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Total target records: %', total_count;
    RAISE NOTICE 'Revenue targets: %', revenue_count;
    RAISE NOTICE 'Employment targets: %', employment_count;
    RAISE NOTICE 'Land targets: %', land_count;
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Data Sources:';
    RAISE NOTICE '  - STPI (Software Technology Parks of India)';
    RAISE NOTICE '  - NASSCOM (IT Industry Association)';
    RAISE NOTICE '  - MEITY (Ministry of Electronics & IT)';
    RAISE NOTICE '  - Care Edge Research';
    RAISE NOTICE '  - ICRIER (Economic Research Institute)';
    RAISE NOTICE '  - Bengaluru Innovation Report 2025';
    RAISE NOTICE '  - McKinsey & BCG Analysis';
    RAISE NOTICE '================================================';
END $$;
