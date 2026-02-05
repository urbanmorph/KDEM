-- Migration 001: Create Dimension Tables
-- Description: Core dimension tables for Verticals, Geographies, and Factors

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- VERTICALS TABLE
-- =============================================================================
CREATE TABLE verticals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('core', 'sub-sector', 'digitizing')),
  parent_id TEXT REFERENCES verticals(id) ON DELETE CASCADE,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for parent lookups
CREATE INDEX idx_verticals_parent ON verticals(parent_id);
CREATE INDEX idx_verticals_category ON verticals(category);

-- Insert core verticals
INSERT INTO verticals (id, name, category, parent_id, description) VALUES
  ('it-exports', 'IT Exports', 'core', NULL, 'IT Products, Services, BPM and GCC - Export Revenue'),
  ('it-domestic', 'IT Domestic', 'core', NULL, 'IT Products, Services, BPM and GCC - Domestic Revenue'),
  ('esdm', 'ESDM', 'core', NULL, 'Electronics System Design & Manufacturing'),
  ('startups', 'Startups & Innovation', 'core', NULL, 'Innovation and Startup Ecosystem'),
  ('digitizing-sectors', 'Newly Digitizing Sectors', 'core', NULL, 'Emerging digital economy sectors');

-- Insert ESDM sub-sectors
INSERT INTO verticals (id, name, category, parent_id) VALUES
  ('esdm-pcb', 'PCB Manufacturing', 'sub-sector', 'esdm'),
  ('esdm-semiconductor', 'Semiconductor Design', 'sub-sector', 'esdm'),
  ('esdm-aerospace', 'Aerospace Electronics', 'sub-sector', 'esdm');

-- Insert digitizing sectors (17 categories)
INSERT INTO verticals (id, name, category, parent_id) VALUES
  ('digitizing-telecom', 'Digital Communication Services', 'digitizing', 'digitizing-sectors'),
  ('digitizing-gem', 'Government e-Marketplace', 'digitizing', 'digitizing-sectors'),
  ('digitizing-dbt', 'Direct Benefit Transfer', 'digitizing', 'digitizing-sectors'),
  ('digitizing-healthcare', 'Tech-enabled Healthcare', 'digitizing', 'digitizing-sectors'),
  ('digitizing-education', 'Customizable Education Platform', 'digitizing', 'digitizing-sectors'),
  ('digitizing-power', 'Digitally Enabled Power Distribution', 'digitizing', 'digitizing-sectors'),
  ('digitizing-smartgrid', 'Smart Grids with Distributed Generation', 'digitizing', 'digitizing-sectors'),
  ('digitizing-payments', 'Digital Payments', 'digitizing', 'digitizing-sectors'),
  ('digitizing-lending', 'Flow-based Lending and Advanced Credit (MSMEs)', 'digitizing', 'digitizing-sectors'),
  ('digitizing-agrifinance', 'Digital Farmer Financing & Insurance', 'digitizing', 'digitizing-sectors'),
  ('digitizing-precisionag', 'Precision Agriculture', 'digitizing', 'digitizing-sectors'),
  ('digitizing-agrimarketplace', 'Universal Agricultural Marketplace', 'digitizing', 'digitizing-sectors'),
  ('digitizing-talent', 'Online Talent Platforms', 'digitizing', 'digitizing-sectors'),
  ('digitizing-retailsupply', 'Digital Supply Chain - Traditional Retail', 'digitizing', 'digitizing-sectors'),
  ('digitizing-ecommerce', 'Digital Supply Chain - E-Commerce', 'digitizing', 'digitizing-sectors'),
  ('digitizing-logistics', 'Efficient Transport & Logistics', 'digitizing', 'digitizing-sectors'),
  ('digitizing-iot', 'Business Digitization & IoT Analytics', 'digitizing', 'digitizing-sectors');

-- =============================================================================
-- GEOGRAPHIES TABLE
-- =============================================================================
CREATE TABLE geographies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  tier TEXT,
  region TEXT,
  parent_id TEXT REFERENCES geographies(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_geographies_parent ON geographies(parent_id);
CREATE INDEX idx_geographies_tier ON geographies(tier);
CREATE INDEX idx_geographies_region ON geographies(region);

-- Insert geographies
INSERT INTO geographies (id, name, type, tier, region) VALUES
  ('karnataka', 'Karnataka', 'state', NULL, 'statewide'),
  ('bengaluru', 'Bengaluru', 'urban-metro', 'existing-hub', 'south-karnataka'),
  ('mysuru', 'Mysuru', 'urban-tier2', 'tier1-invest-aggressively', 'south-karnataka'),
  ('mangaluru', 'Mangaluru', 'coastal-city', 'tier1-invest-aggressively', 'coastal-karnataka'),
  ('hdb-corridor', 'Hubballi-Dharwad-Belagavi', 'urban-corridor', 'tier1-invest-aggressively', 'north-karnataka'),
  ('kalaburagi', 'Kalaburagi', 'urban-tier3', 'tier2-nurture-build', 'north-karnataka'),
  ('tumakuru', 'Tumakuru', 'industrial-city', 'tier2-nurture-build', 'central-karnataka'),
  ('shivamogga', 'Shivamogga', 'urban-tier3', 'tier3-study-strategize', 'central-karnataka'),
  ('rest-of-karnataka', 'Rest of Karnataka', 'distributed', 'emerging', 'statewide');

-- Insert sub-geographies (infrastructure projects)
INSERT INTO geographies (id, name, type, tier, region, parent_id) VALUES
  ('mysuru-pcb-park', 'Mysuru PCB Park', 'industrial-park', 'tier1-invest-aggressively', 'south-karnataka', 'mysuru'),
  ('mysuru-global-tech', 'Mysuru Global Tech Centre', 'tech-park', 'tier1-invest-aggressively', 'south-karnataka', 'mysuru'),
  ('mangaluru-tech-park', 'Mangaluru Tech Park', 'tech-park', 'tier1-invest-aggressively', 'coastal-karnataka', 'mangaluru'),
  ('tumakuru-aerospace-sez', 'Tumakuru Aerospace SEZ', 'sez', 'tier2-nurture-build', 'central-karnataka', 'tumakuru');

-- =============================================================================
-- FACTORS TABLE
-- =============================================================================
CREATE TABLE factors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  metrics TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert factors
INSERT INTO factors (id, name, category, metrics, description) VALUES
  ('land', 'Land', 'physical-infrastructure',
   ARRAY['sq_ft', 'acres', 'units', 'rentals_per_sqft'],
   'Physical infrastructure including office space, industrial land, co-working spaces'),

  ('labour', 'Labour', 'human-capital',
   ARRAY['headcount', 'skill_level', 'cost_per_employee', 'training_hours'],
   'Human capital including skilling programs, employment, talent development'),

  ('capital', 'Capital', 'financial-resources',
   ARRAY['funding_amount', 'number_of_deals', 'avg_deal_size', 'roi'],
   'Financial resources including funding, grants, investments'),

  ('organisation', 'Organisation', 'institutional-infrastructure',
   ARRAY['clearance_time_days', 'compliance_cost', 'quality_of_life_index'],
   'Institutional infrastructure including ease of business, compliance, quality of life');

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_verticals_updated_at
  BEFORE UPDATE ON verticals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geographies_updated_at
  BEFORE UPDATE ON geographies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_factors_updated_at
  BEFORE UPDATE ON factors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- COMMENTS
-- =============================================================================
COMMENT ON TABLE verticals IS 'Digital economy verticals (5 pillars + sub-sectors)';
COMMENT ON TABLE geographies IS 'Karnataka geographies (state, clusters, infrastructure projects)';
COMMENT ON TABLE factors IS 'Factors of production (Land, Labour, Capital, Organisation)';
