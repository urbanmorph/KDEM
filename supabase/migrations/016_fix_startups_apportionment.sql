-- ============================================================================
-- Fix Startups Beyond Bengaluru Apportionment (B4)
-- ============================================================================
-- Migration: 016
-- Date: 2026-02-27
-- Issue: DB has Startups at 90% Bengaluru / 10% BB, Excel has 75% / 25%
-- Source: KDEM Excel "Beyond Bengaluru Workings" sheet — Startups 25% BB
--         DPIIT Karnataka district-wise registrations support ~20-25% BB
-- Fix: Update from 90/10 to 75/25 split, redistribute BB across clusters
-- ============================================================================

-- Step 1: Update Bengaluru share from 90% to 75%
UPDATE apportionment_rules
SET percentage_allocation = 75.0,
    basis = 'KDEM Excel BB Workings: Startups 75% Bengaluru. DPIIT Karnataka district data supports ~20-25% BB startup registrations.',
    confidence_rating = 4
WHERE vertical_id = 'startups'
  AND from_geography_id = 'karnataka'
  AND to_geography_id = 'bengaluru';

-- Step 2: Update BB cluster shares (redistribute 25% across clusters)
-- Mysuru: 3% → 8% (strong emerging ecosystem, KDEM BB program focus)
UPDATE apportionment_rules
SET percentage_allocation = 8.0,
    basis = 'KDEM Excel BB Workings: Mysuru is top BB startup hub. DPIIT Prabhaav: 1,200+ registered startups in Mysuru district.',
    confidence_rating = 3
WHERE vertical_id = 'startups'
  AND from_geography_id = 'karnataka'
  AND to_geography_id = 'mysuru';

-- Mangaluru: 2.5% → 6% (Silicon Beach initiative)
UPDATE apportionment_rules
SET percentage_allocation = 6.0,
    basis = 'KDEM Silicon Beach initiative + Xpheno talent report. DPIIT Prabhaav: 800+ registered startups in DK district.',
    confidence_rating = 3
WHERE vertical_id = 'startups'
  AND from_geography_id = 'karnataka'
  AND to_geography_id = 'mangaluru';

-- HDB Corridor: 2% → 5% (EMC 2.0 + university ecosystem)
UPDATE apportionment_rules
SET percentage_allocation = 5.0,
    basis = 'KDEM BB program + Hubballi startup ecosystem (KLE, BVB universities). DPIIT Prabhaav: 600+ registered startups.',
    confidence_rating = 3
WHERE vertical_id = 'startups'
  AND from_geography_id = 'karnataka'
  AND to_geography_id = 'hdb-corridor';

-- Rest of Karnataka: 2.5% → 6% (distributed across Tier 2/3)
UPDATE apportionment_rules
SET percentage_allocation = 6.0,
    basis = 'DPIIT Karnataka: distributed startup registrations across Belagavi, Kalaburagi, Tumakuru, Shivamogga, etc.',
    confidence_rating = 2
WHERE vertical_id = 'startups'
  AND from_geography_id = 'karnataka'
  AND to_geography_id = 'rest-of-karnataka';

-- ============================================================================
-- VERIFICATION: Total should sum to 100%
-- ============================================================================
DO $$
DECLARE
    total_pct numeric;
BEGIN
    SELECT SUM(percentage_allocation) INTO total_pct
    FROM apportionment_rules
    WHERE vertical_id = 'startups'
      AND from_geography_id = 'karnataka'
      AND status = 'active';

    RAISE NOTICE '================================================';
    RAISE NOTICE 'Startups Apportionment Fix Applied';
    RAISE NOTICE 'Bengaluru: 90%% → 75%%';
    RAISE NOTICE 'Beyond Bengaluru: 10%% → 25%%';
    RAISE NOTICE 'Total allocation: %.1f%% (should be 100%%)', total_pct;
    RAISE NOTICE 'Source: KDEM Excel BB Workings + DPIIT Prabhaav';
    RAISE NOTICE '================================================';
END $$;
