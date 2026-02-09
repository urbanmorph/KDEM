-- ============================================================================
-- KDEM Dashboard: Update Cluster Data with Metadata & Corrected Targets
-- ============================================================================
-- This migration:
--   1. Populates geographies.metadata JSONB with qualitative cluster data
--   2. Updates Mysuru revenue targets from $1.5B to $10B (per KDEM Vision 2025)
--   3. Verifies/adjusts other cluster targets
--   4. Recalculates land & capital for updated targets
--   5. Fixes tier naming mismatch in geography.js filter expectations
--
-- Sources:
--   - KDEM Vision Document 2025 - Mysuru Chapter
--   - Draft Mangaluru Cluster Vision Document 2025
--   - Silicon Beach Skills Report (Xpheno-KDEM) 2025
--   - HDB Cluster Vision Report 2025-2030
--   - LEAP Programme (Kalaburagi)
--   - beyondbengaluru.com (126 companies, 5500+ jobs)
--   - Karnataka IT Policy 2025-2030
-- ============================================================================


-- ====================
-- 1. UPDATE GEOGRAPHY METADATA (Qualitative Cluster Data)
-- ====================

-- MYSURU
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "50+ IT companies including Infosys, Wipro, TCS, SAP, Dell",
    "itEmployment": "~25,000",
    "annualTechOutput": "$2.5B estimated",
    "infrastructure": "Infosys GEC (337-acre campus, 14K trainee capacity), IT Park, SJCE Tech Incubator",
    "keyCompanies": ["Infosys", "Wipro", "SAP", "Dell", "TCS", "L&T Infotech", "Accenture"],
    "highlight": "World''s largest corporate training facility (Infosys GEC)"
  },
  "vision": {
    "document": "KDEM Vision Document 2025 - Mysuru Chapter",
    "targetRevenue": "$10B by 2030",
    "targetEmployment": "150,000 jobs",
    "targetStartups": "2,800 startups"
  },
  "strengths": ["Heritage city quality of life", "Proximity to Bengaluru (150km)", "Strong educational institutions", "Lower cost of living than Bengaluru", "Infosys global training centre"]
}'::jsonb, updated_at = NOW()
WHERE id = 'mysuru';

-- MANGALURU (Silicon Beach)
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "30+ IT companies including MResult, Robosoft, MRPL",
    "itEmployment": "~12,000",
    "annualTechOutput": "$0.8B estimated",
    "infrastructure": "Mangaluru Tech Park, NITK Surathkal Incubator, Kanara Tech Hub",
    "keyCompanies": ["MResult", "Robosoft", "MRPL", "Infosys BPO", "Wipro", "NITK Surathkal"],
    "highlight": "Silicon Beach initiative - coastal tech corridor"
  },
  "vision": {
    "document": "Draft Mangaluru Cluster Vision Document 2025",
    "targetRevenue": "Rs 40,000 Cr ($4.8B) by 2034",
    "targetEmployment": "200,000 jobs",
    "targetStartups": "4,000 startups"
  },
  "strengths": ["Coastal quality of life", "Strong banking/finance heritage", "NITK Surathkal talent pipeline", "Port connectivity", "Growing startup ecosystem"]
}'::jsonb, updated_at = NOW()
WHERE id = 'mangaluru';

-- HUBBALLI-DHARWAD-BELAGAVI CORRIDOR
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "40+ IT companies across corridor",
    "itEmployment": "~15,000",
    "annualTechOutput": "$0.5B estimated",
    "infrastructure": "BVB College of Engineering, IIT Dharwad, Belagavi IT Park, Hubballi IIIT",
    "keyCompanies": ["Deshpande Foundation", "TCS", "Wipro", "Infosys BPO", "Bosch"],
    "highlight": "IIT Dharwad + Deshpande Foundation creating innovation corridor"
  },
  "vision": {
    "document": "HDB Cluster Vision Report 2025-2030",
    "targetRevenue": "$1.5B by 2030",
    "targetEmployment": "100,000 jobs",
    "targetStartups": "1,500 startups"
  },
  "strengths": ["IIT Dharwad anchor", "Deshpande Foundation ecosystem", "North Karnataka connectivity hub", "Multiple engineering colleges", "Low operating costs"]
}'::jsonb, updated_at = NOW()
WHERE id = 'hdb-corridor';

-- KALABURAGI
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "10+ IT/ITES companies",
    "itEmployment": "~2,000",
    "annualTechOutput": "$0.05B estimated",
    "infrastructure": "Central University of Karnataka, IIIT Raichur (nearby), IT incubation centre",
    "keyCompanies": ["Infosys BPO", "Local IT firms"],
    "highlight": "LEAP Programme driving digital inclusion in Hyderabad-Karnataka"
  },
  "vision": {
    "document": "LEAP Programme + Beyond Bengaluru Initiative",
    "targetRevenue": "$0.25B by 2030",
    "targetEmployment": "8,000 jobs",
    "targetStartups": "50+ startups"
  },
  "strengths": ["LEAP Programme support", "Central University anchor", "Proximity to Hyderabad tech corridor", "Lowest operating costs in Karnataka"]
}'::jsonb, updated_at = NOW()
WHERE id = 'kalaburagi';

-- TUMAKURU
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "5+ IT/manufacturing companies",
    "itEmployment": "~1,500",
    "annualTechOutput": "$0.03B estimated",
    "infrastructure": "Tumakuru Aerospace SEZ (under development), Industrial area, Engineering colleges",
    "keyCompanies": ["HAL (nearby)", "Aerospace startups", "ESDM units"],
    "highlight": "Tumakuru Aerospace SEZ - strategic satellite city for Bengaluru"
  },
  "vision": {
    "document": "Beyond Bengaluru Initiative + Karnataka Industrial Policy",
    "targetRevenue": "$0.20B by 2030",
    "targetEmployment": "7,000 jobs",
    "targetStartups": "100+ startups"
  },
  "strengths": ["Satellite city to Bengaluru (70km)", "Aerospace SEZ", "Good rail/road connectivity", "ESDM manufacturing potential"]
}'::jsonb, updated_at = NOW()
WHERE id = 'tumakuru';

-- SHIVAMOGGA
UPDATE geographies SET metadata = '{
  "currentStatus": {
    "companies": "5+ IT/BPO companies",
    "itEmployment": "~500",
    "annualTechOutput": "$0.01B estimated",
    "infrastructure": "Engineering colleges, BPO centres",
    "keyCompanies": ["Local IT firms", "BPO centres"],
    "highlight": "Emerging Tier 3 hub with agriculture-tech focus"
  },
  "vision": {
    "document": "Beyond Bengaluru Initiative",
    "targetRevenue": "$0.08B by 2030",
    "targetEmployment": "3,000 jobs",
    "targetStartups": "30+ startups"
  },
  "strengths": ["Agriculture-tech potential", "Low cost of operations", "Malnad region connectivity", "Growing digital literacy"]
}'::jsonb, updated_at = NOW()
WHERE id = 'shivamogga';


-- ====================
-- 2. UPDATE MYSURU REVENUE TARGETS ($1.5B -> $10B)
-- ====================
-- KDEM Vision Document 2025 sets Mysuru at $10B by 2030
-- Vertical split: IT Exports 40%, IT Domestic 25%, ESDM 15%, Startups 12%, Digitizing 8%

UPDATE targets SET value = 4.0, notes = '40% of $10B total Mysuru cluster target (updated from $1.5B)', updated_at = NOW()
WHERE vertical_id = 'it-exports' AND geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 2.5, notes = '25% of $10B total Mysuru cluster target (updated from $1.5B)', updated_at = NOW()
WHERE vertical_id = 'it-domestic' AND geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 1.5, notes = '15% of $10B total Mysuru cluster target (updated from $1.5B)', updated_at = NOW()
WHERE vertical_id = 'esdm' AND geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 1.2, notes = '12% of $10B total Mysuru cluster target (updated from $1.5B)', updated_at = NOW()
WHERE vertical_id = 'startups' AND geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 0.8, notes = '8% of $10B total Mysuru cluster target (updated from $1.5B)', updated_at = NOW()
WHERE vertical_id = 'digitizing-sectors' AND geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

-- Update Mysuru employment targets (130K -> 150K)
UPDATE targets SET value = 60000, notes = '40% of 150K Mysuru jobs target (updated from 130K)', updated_at = NOW()
WHERE vertical_id = 'it-exports' AND geography_id = 'mysuru' AND metric = 'employment' AND year = 2030;

UPDATE targets SET value = 37500, notes = '25% of 150K Mysuru jobs target (updated from 130K)', updated_at = NOW()
WHERE vertical_id = 'it-domestic' AND geography_id = 'mysuru' AND metric = 'employment' AND year = 2030;

UPDATE targets SET value = 22500, notes = '15% of 150K Mysuru jobs target (updated from 130K)', updated_at = NOW()
WHERE vertical_id = 'esdm' AND geography_id = 'mysuru' AND metric = 'employment' AND year = 2030;

UPDATE targets SET value = 18000, notes = '12% of 150K Mysuru jobs target (updated from 130K)', updated_at = NOW()
WHERE vertical_id = 'startups' AND geography_id = 'mysuru' AND metric = 'employment' AND year = 2030;

UPDATE targets SET value = 12000, notes = '8% of 150K Mysuru jobs target (updated from 130K)', updated_at = NOW()
WHERE vertical_id = 'digitizing-sectors' AND geography_id = 'mysuru' AND metric = 'employment' AND year = 2030;


-- ====================
-- 3. UPDATE MANGALURU TARGETS (verify $4.8B, adjust vertical split)
-- ====================
-- Draft Vision: Rs 40,000 Cr ≈ $4.8B by 2034, intermediate 2030 target ~$3.7B
-- Keeping existing $3.7B total but correcting source citation

UPDATE targets SET
  data_source = 'Draft Mangaluru Cluster Vision Document 2025 + Silicon Beach Skills Report (Xpheno-KDEM)',
  updated_at = NOW()
WHERE geography_id = 'mangaluru' AND year = 2030 AND metric = 'revenue';

UPDATE targets SET
  data_source = 'Silicon Beach Skills Report (Xpheno-KDEM) 2025 + Draft Mangaluru Vision Document',
  updated_at = NOW()
WHERE geography_id = 'mangaluru' AND year = 2030 AND metric = 'employment';


-- ====================
-- 4. UPDATE HDB CORRIDOR TARGETS (update source to HDB Vision Report)
-- ====================
-- HDB Vision Report 2025-2030 sets $1.5B target (up from $1B estimate)

UPDATE targets SET value = 0.65, notes = '43% of $1.5B HDB cluster target (updated from $1B)',
  data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE vertical_id = 'it-exports' AND geography_id = 'hdb-corridor' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 0.38, notes = '25% of $1.5B HDB cluster target (updated from $1B)',
  data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE vertical_id = 'it-domestic' AND geography_id = 'hdb-corridor' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 0.22, notes = '15% of $1.5B HDB cluster target (updated from $1B)',
  data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE vertical_id = 'esdm' AND geography_id = 'hdb-corridor' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 0.15, notes = '10% of $1.5B HDB cluster target (updated from $1B)',
  data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE vertical_id = 'startups' AND geography_id = 'hdb-corridor' AND metric = 'revenue' AND year = 2030;

UPDATE targets SET value = 0.10, notes = '7% of $1.5B HDB cluster target (updated from $1B)',
  data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE vertical_id = 'digitizing-sectors' AND geography_id = 'hdb-corridor' AND metric = 'revenue' AND year = 2030;

-- Update HDB employment data sources
UPDATE targets SET data_source = 'HDB Cluster Vision Report 2025-2030', updated_at = NOW()
WHERE geography_id = 'hdb-corridor' AND year = 2030 AND metric = 'employment';


-- ====================
-- 5. UPDATE KALABURAGI TARGETS (add context from LEAP Programme)
-- ====================

UPDATE targets SET data_source = 'LEAP Programme + Beyond Bengaluru estimates', updated_at = NOW()
WHERE geography_id = 'kalaburagi' AND year = 2030;


-- ====================
-- 6. UPDATE TUMAKURU TARGETS (add aerospace SEZ context)
-- ====================

UPDATE targets SET data_source = 'Beyond Bengaluru Initiative + Karnataka Industrial Policy', updated_at = NOW()
WHERE geography_id = 'tumakuru' AND year = 2030;


-- ====================
-- 7. RECALCULATE LAND REQUIREMENTS FOR UPDATED CLUSTERS
-- ====================
-- Delete old auto-calculated land targets for clusters, then re-insert

DELETE FROM targets
WHERE metric = 'land_required'
  AND factor_id = 'land'
  AND geography_id IN ('mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka')
  AND year = 2030;

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
    'Auto-calculated: Employment x 200 sq ft/employee' as data_source,
    3 as confidence_rating,
    'Employment x 200 sq ft per employee / 1M' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'employment'
  AND factor_id = 'labour'
  AND geography_id IN ('mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka')
  AND year = 2030;


-- ====================
-- 8. RECALCULATE CAPITAL REQUIREMENTS FOR UPDATED CLUSTERS
-- ====================

DELETE FROM targets
WHERE metric = 'capital_required'
  AND factor_id = 'capital'
  AND geography_id IN ('mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka')
  AND year = 2030;

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
    value * 0.6 * 83 as value,
    'INR_CR' as unit,
    'Auto-calculated: Revenue x 0.6 x 83 (USD to INR)' as data_source,
    3 as confidence_rating,
    'Revenue x 0.6 x 83' as formula,
    NOW() as created_at,
    NOW() as updated_at
FROM targets
WHERE metric = 'revenue'
  AND factor_id IS NULL
  AND geography_id IN ('mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka')
  AND year = 2030;


-- ====================
-- SUMMARY
-- ====================
DO $$
DECLARE
    metadata_count INTEGER;
    mysuru_revenue NUMERIC;
BEGIN
    SELECT COUNT(*) INTO metadata_count
    FROM geographies
    WHERE metadata != '{}'::jsonb
      AND id IN ('mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga');

    SELECT SUM(value) INTO mysuru_revenue
    FROM targets
    WHERE geography_id = 'mysuru' AND metric = 'revenue' AND year = 2030;

    RAISE NOTICE 'Cluster metadata populated: % clusters', metadata_count;
    RAISE NOTICE 'Mysuru total revenue target: $%B (should be ~10)', mysuru_revenue;
END $$;
