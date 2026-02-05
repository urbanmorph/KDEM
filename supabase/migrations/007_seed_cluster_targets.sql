-- ============================================================================
-- KDEM Dashboard: Seed Beyond Bengaluru Cluster Targets
-- ============================================================================
-- This migration populates target data for 8 Beyond Bengaluru clusters
-- Sources: KDEM Vision Documents, Silicon Beach Report, Cluster studies
-- ============================================================================

-- ====================
-- 1. MYSURU CLUSTER
-- ====================
-- Source: KDEM Vision Document 2025 - Mysuru Chapter
-- Target: $1.5B by 2030, 130K jobs, 2,500 startups
-- Confidence: ⭐⭐⭐⭐ (Official KDEM cluster vision)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES

-- IT Exports - Mysuru 2030
('it-exports', 'mysuru', NULL, 2030, 'revenue', 0.6, 'USD_BN',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '40% of $1.5B total cluster target', NOW(), NOW()),

-- IT Domestic - Mysuru 2030
('it-domestic', 'mysuru', NULL, 2030, 'revenue', 0.3, 'USD_BN',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '20% of $1.5B total cluster target', NOW(), NOW()),

-- ESDM - Mysuru 2030
('esdm', 'mysuru', NULL, 2030, 'revenue', 0.3, 'USD_BN',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '20% of $1.5B total cluster target', NOW(), NOW()),

-- Startups - Mysuru 2030
('startups', 'mysuru', NULL, 2030, 'revenue', 0.2, 'USD_BN',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '13% of $1.5B total cluster target', NOW(), NOW()),

-- Digitizing Sectors - Mysuru 2030
('digitizing-sectors', 'mysuru', NULL, 2030, 'revenue', 0.1, 'USD_BN',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '7% of $1.5B total cluster target', NOW(), NOW()),

-- Employment - Mysuru 2030
('it-exports', 'mysuru', 'labour', 2030, 'employment', 52000, 'employees',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '40% of 130K jobs target', NOW(), NOW()),

('it-domestic', 'mysuru', 'labour', 2030, 'employment', 26000, 'employees',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '20% of 130K jobs target', NOW(), NOW()),

('esdm', 'mysuru', 'labour', 2030, 'employment', 26000, 'employees',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '20% of 130K jobs target', NOW(), NOW()),

('startups', 'mysuru', 'labour', 2030, 'employment', 16900, 'employees',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '13% of 130K jobs target', NOW(), NOW()),

('digitizing-sectors', 'mysuru', 'labour', 2030, 'employment', 9100, 'employees',
 'KDEM Vision Document 2025 - Mysuru Chapter', 4,
 '7% of 130K jobs target', NOW(), NOW());


-- ====================
-- 2. MANGALURU (SILICON BEACH) CLUSTER
-- ====================
-- Source: Draft Mangaluru Cluster Vision Document 2025, Silicon Beach Skills Report
-- Target: ₹40,000 Cr ($4.8B) by 2034, 200K jobs, 4,000 startups
-- Confidence: ⭐⭐⭐⭐ (Draft official vision document)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES

-- 2030 intermediate targets (scaling from 2034 goal)
-- IT Exports - Mangaluru 2030
('it-exports', 'mangaluru', NULL, 2030, 'revenue', 1.5, 'USD_BN',
 'Draft Mangaluru Cluster Vision Document 2025', 4,
 'Silicon Beach initiative - 40% of target', NOW(), NOW()),

-- IT Domestic - Mangaluru 2030
('it-domestic', 'mangaluru', NULL, 2030, 'revenue', 0.9, 'USD_BN',
 'Draft Mangaluru Cluster Vision Document 2025', 4,
 '25% of target', NOW(), NOW()),

-- ESDM - Mangaluru 2030
('esdm', 'mangaluru', NULL, 2030, 'revenue', 0.7, 'USD_BN',
 'Draft Mangaluru Cluster Vision Document 2025', 4,
 '20% of target', NOW(), NOW()),

-- Startups - Mangaluru 2030
('startups', 'mangaluru', NULL, 2030, 'revenue', 0.4, 'USD_BN',
 'Draft Mangaluru Cluster Vision Document 2025', 4,
 '10% of target', NOW(), NOW()),

-- Digitizing Sectors - Mangaluru 2030
('digitizing-sectors', 'mangaluru', NULL, 2030, 'revenue', 0.2, 'USD_BN',
 'Draft Mangaluru Cluster Vision Document 2025', 4,
 '5% of target', NOW(), NOW()),

-- Employment - Mangaluru 2030
('it-exports', 'mangaluru', 'labour', 2030, 'employment', 80000, 'employees',
 'Silicon Beach Skills Report + Vision Document', 4,
 '40% of 200K jobs target', NOW(), NOW()),

('it-domestic', 'mangaluru', 'labour', 2030, 'employment', 50000, 'employees',
 'Silicon Beach Skills Report + Vision Document', 4,
 '25% of 200K jobs target', NOW(), NOW()),

('esdm', 'mangaluru', 'labour', 2030, 'employment', 40000, 'employees',
 'Silicon Beach Skills Report + Vision Document', 4,
 '20% of 200K jobs target', NOW(), NOW()),

('startups', 'mangaluru', 'labour', 2030, 'employment', 20000, 'employees',
 'Silicon Beach Skills Report + Vision Document', 4,
 '10% of 200K jobs target', NOW(), NOW()),

('digitizing-sectors', 'mangaluru', 'labour', 2030, 'employment', 10000, 'employees',
 'Silicon Beach Skills Report + Vision Document', 4,
 '5% of 200K jobs target', NOW(), NOW());


-- ====================
-- 3. HUBBALLI-DHARWAD CORRIDOR
-- ====================
-- Source: Beyond Bengaluru Initiative 2022-2025
-- Target: $1B by 2030, 100K jobs
-- Confidence: ⭐⭐⭐⭐ (Beyond Bengaluru program data)

INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES

-- IT Exports - HDB 2030
('it-exports', 'hdb-corridor', NULL, 2030, 'revenue', 0.45, 'USD_BN',
 'Beyond Bengaluru Initiative', 4,
 '45% of $1B cluster target', NOW(), NOW()),

-- IT Domestic - HDB 2030
('it-domestic', 'hdb-corridor', NULL, 2030, 'revenue', 0.25, 'USD_BN',
 'Beyond Bengaluru Initiative', 4,
 '25% of $1B cluster target', NOW(), NOW()),

-- ESDM - HDB 2030
('esdm', 'hdb-corridor', NULL, 2030, 'revenue', 0.15, 'USD_BN',
 'Beyond Bengaluru Initiative', 4,
 '15% of $1B cluster target', NOW(), NOW()),

-- Startups - HDB 2030
('startups', 'hdb-corridor', NULL, 2030, 'revenue', 0.1, 'USD_BN',
 'Beyond Bengaluru Initiative', 4,
 '10% of $1B cluster target', NOW(), NOW()),

-- Digitizing Sectors - HDB 2030
('digitizing-sectors', 'hdb-corridor', NULL, 2030, 'revenue', 0.05, 'USD_BN',
 'Beyond Bengaluru Initiative', 4,
 '5% of $1B cluster target', NOW(), NOW()),

-- Employment - HDB 2030
('it-exports', 'hdb-corridor', 'labour', 2030, 'employment', 45000, 'employees',
 'Beyond Bengaluru Initiative', 4,
 '45% of 100K jobs target', NOW(), NOW()),

('it-domestic', 'hdb-corridor', 'labour', 2030, 'employment', 25000, 'employees',
 'Beyond Bengaluru Initiative', 4,
 '25% of 100K jobs target', NOW(), NOW()),

('esdm', 'hdb-corridor', 'labour', 2030, 'employment', 15000, 'employees',
 'Beyond Bengaluru Initiative', 4,
 '15% of 100K jobs target', NOW(), NOW()),

('startups', 'hdb-corridor', 'labour', 2030, 'employment', 10000, 'employees',
 'Beyond Bengaluru Initiative', 4,
 '10% of 100K jobs target', NOW(), NOW()),

('digitizing-sectors', 'hdb-corridor', 'labour', 2030, 'employment', 5000, 'employees',
 'Beyond Bengaluru Initiative', 4,
 '5% of 100K jobs target', NOW(), NOW());


-- ====================
-- 4. TIER 2 & TIER 3 CLUSTERS (Estimated Targets)
-- ====================
-- Source: Beyond Bengaluru program estimates
-- Confidence: ⭐⭐⭐ (Emerging clusters, projected growth)

-- KALABURAGI (Tier 2)
INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
('it-exports', 'kalaburagi', NULL, 2030, 'revenue', 0.15, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - emerging', NOW(), NOW()),
('it-domestic', 'kalaburagi', NULL, 2030, 'revenue', 0.1, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - emerging', NOW(), NOW()),
('it-exports', 'kalaburagi', 'labour', 2030, 'employment', 5000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - emerging', NOW(), NOW()),
('it-domestic', 'kalaburagi', 'labour', 2030, 'employment', 3000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - emerging', NOW(), NOW());

-- TUMAKURU (Tier 2)
INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
('it-exports', 'tumakuru', NULL, 2030, 'revenue', 0.12, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - satellite to Bengaluru', NOW(), NOW()),
('esdm', 'tumakuru', NULL, 2030, 'revenue', 0.08, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster - manufacturing focus', NOW(), NOW()),
('it-exports', 'tumakuru', 'labour', 2030, 'employment', 4000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster', NOW(), NOW()),
('esdm', 'tumakuru', 'labour', 2030, 'employment', 3000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 2 cluster', NOW(), NOW());

-- SHIVAMOGGA (Tier 3)
INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
('it-domestic', 'shivamogga', NULL, 2030, 'revenue', 0.05, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 3 cluster - future growth', NOW(), NOW()),
('digitizing-sectors', 'shivamogga', NULL, 2030, 'revenue', 0.03, 'USD_BN',
 'Beyond Bengaluru estimates', 3, 'Tier 3 cluster - agriculture tech', NOW(), NOW()),
('it-domestic', 'shivamogga', 'labour', 2030, 'employment', 2000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 3 cluster', NOW(), NOW()),
('digitizing-sectors', 'shivamogga', 'labour', 2030, 'employment', 1000, 'employees',
 'Beyond Bengaluru estimates', 3, 'Tier 3 cluster', NOW(), NOW());

-- REST OF KARNATAKA (aggregated other regions)
INSERT INTO targets (
    vertical_id, geography_id, factor_id, year, metric, value, unit,
    data_source, confidence_rating, notes, created_at, updated_at
) VALUES
('it-domestic', 'rest-of-karnataka', NULL, 2030, 'revenue', 0.2, 'USD_BN',
 'Beyond Bengaluru estimates', 2, 'Distributed across smaller towns', NOW(), NOW()),
('digitizing-sectors', 'rest-of-karnataka', NULL, 2030, 'revenue', 0.3, 'USD_BN',
 'Beyond Bengaluru estimates', 2, 'Agriculture and rural digitization', NOW(), NOW()),
('it-domestic', 'rest-of-karnataka', 'labour', 2030, 'employment', 5000, 'employees',
 'Beyond Bengaluru estimates', 2, 'Distributed workforce', NOW(), NOW()),
('digitizing-sectors', 'rest-of-karnataka', 'labour', 2030, 'employment', 8000, 'employees',
 'Beyond Bengaluru estimates', 2, 'Rural digital economy', NOW(), NOW());


-- ====================
-- 5. AUTO-CALCULATE LAND REQUIREMENTS FOR CLUSTERS
-- ====================
-- Formula: Employment × 200 sq ft per employee

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
    value * 200 / 1000000 as value,  -- Convert to M sq ft
    'million_sq_ft' as unit,
    'Auto-calculated: Employment × 200 sq ft/employee' as data_source,
    3 as confidence_rating,
    'Employment × 200 sq ft per employee ÷ 1M' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'employment'
  AND factor_id = 'labour'
  AND geography_id NOT IN ('karnataka', 'bengaluru')
  AND year = 2030;


-- ====================
-- 6. AUTO-CALCULATE CAPITAL REQUIREMENTS FOR CLUSTERS
-- ====================
-- Formula: Revenue × 0.6 (CapEx ratio for digital economy)

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
    value * 0.6 * 83 as value,  -- Convert USD to INR (1 USD ≈ 83 INR) and apply 0.6 ratio
    'INR_CR' as unit,
    'Auto-calculated: Revenue × 0.6 × 83 (USD to INR)' as data_source,
    3 as confidence_rating,
    'Revenue × 0.6 × 83' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'revenue'
  AND factor_id IS NULL
  AND geography_id NOT IN ('karnataka', 'bengaluru')
  AND year = 2030;


-- ====================
-- SUMMARY
-- ====================
DO $$
DECLARE
    cluster_count INTEGER;
BEGIN
    SELECT COUNT(DISTINCT geography_id)
    INTO cluster_count
    FROM targets
    WHERE geography_id NOT IN ('karnataka', 'bengaluru');

    RAISE NOTICE 'Cluster targets seeded successfully for % clusters', cluster_count;
    RAISE NOTICE 'Beyond Bengaluru: Mysuru, Mangaluru, HDB, Kalaburagi, Tumakuru, Shivamogga, Rest-of-Karnataka';
END $$;
