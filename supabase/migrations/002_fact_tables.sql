-- Migration 002: Create Fact Tables and Reference Tables
-- Description: Targets fact table and supporting reference tables

-- =============================================================================
-- TARGETS FACT TABLE (Single Source of Truth)
-- =============================================================================
CREATE TABLE targets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,

  -- Dimensions
  vertical_id TEXT REFERENCES verticals(id) ON DELETE CASCADE,
  geography_id TEXT NOT NULL REFERENCES geographies(id) ON DELETE CASCADE,
  factor_id TEXT REFERENCES factors(id) ON DELETE CASCADE,

  -- Time
  year INTEGER NOT NULL CHECK (year >= 2020 AND year <= 2050),

  -- Measure
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,

  -- Breakdown (JSON for flexibility)
  breakdown JSONB DEFAULT '{}'::jsonb,

  -- Metadata
  data_source TEXT NOT NULL,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  notes TEXT,

  -- Relationships
  parent_target_id TEXT REFERENCES targets(id) ON DELETE SET NULL,
  allocation_percentage NUMERIC CHECK (allocation_percentage >= 0 AND allocation_percentage <= 100),

  -- Calculation metadata
  formula TEXT,
  calculation_params JSONB DEFAULT '{}'::jsonb,
  dependencies TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT,

  -- Constraints
  UNIQUE(vertical_id, geography_id, factor_id, year, metric)
);

-- Create indexes for fast queries
CREATE INDEX idx_targets_vertical ON targets(vertical_id);
CREATE INDEX idx_targets_geography ON targets(geography_id);
CREATE INDEX idx_targets_factor ON targets(factor_id);
CREATE INDEX idx_targets_year ON targets(year);
CREATE INDEX idx_targets_composite ON targets(vertical_id, geography_id, factor_id, year);
CREATE INDEX idx_targets_parent ON targets(parent_target_id);

-- =============================================================================
-- CONVERSION RATIOS (How to cascade between metrics)
-- =============================================================================
CREATE TABLE conversion_ratios (
  id SERIAL PRIMARY KEY,
  vertical_id TEXT NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,

  from_metric TEXT NOT NULL,
  to_metric TEXT NOT NULL,
  ratio NUMERIC NOT NULL,
  unit TEXT NOT NULL,

  breakdown JSONB DEFAULT '{}'::jsonb,
  basis TEXT,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),

  effective_from DATE,
  effective_to DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversion_ratios_vertical ON conversion_ratios(vertical_id);
CREATE INDEX idx_conversion_ratios_metrics ON conversion_ratios(from_metric, to_metric);

-- =============================================================================
-- SKILL REQUIREMENTS (Labour breakdown by skill type)
-- =============================================================================
CREATE TABLE skill_requirements (
  id SERIAL PRIMARY KEY,
  vertical_id TEXT NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  geography_id TEXT REFERENCES geographies(id) ON DELETE CASCADE,

  skill_name TEXT NOT NULL,
  percentage_of_workforce NUMERIC CHECK (percentage_of_workforce >= 0 AND percentage_of_workforce <= 100),

  training_duration_months INTEGER,
  training_cost_per_person_inr NUMERIC,

  current_availability TEXT CHECK (current_availability IN ('low', 'medium', 'high')),
  gap_percentage NUMERIC CHECK (gap_percentage >= 0 AND gap_percentage <= 100),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skill_requirements_vertical ON skill_requirements(vertical_id);
CREATE INDEX idx_skill_requirements_geography ON skill_requirements(geography_id);

-- =============================================================================
-- APPORTIONMENT RULES (Historical defaults for geographic distribution)
-- =============================================================================
CREATE TABLE apportionment_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What target does this apply to?
  vertical_id TEXT REFERENCES verticals(id) ON DELETE CASCADE,
  from_geography_id TEXT REFERENCES geographies(id) ON DELETE CASCADE,
  to_geography_id TEXT REFERENCES geographies(id) ON DELETE CASCADE,

  -- Rule definition
  rule_type TEXT NOT NULL CHECK (rule_type IN ('percentage', 'absolute', 'formula', 'ai-suggested')),

  -- For percentage rules
  percentage_allocation NUMERIC CHECK (percentage_allocation >= 0 AND percentage_allocation <= 100),

  -- For formula rules
  formula TEXT,
  formula_params JSONB DEFAULT '{}'::jsonb,

  -- Constraints
  min_value NUMERIC,
  max_value NUMERIC,
  capacity_limit NUMERIC,

  -- Metadata
  basis TEXT,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  priority INTEGER DEFAULT 50,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'deprecated')),
  effective_from DATE,
  effective_to DATE,

  -- Audit
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_apportionment_rules_vertical ON apportionment_rules(vertical_id);
CREATE INDEX idx_apportionment_rules_from_geo ON apportionment_rules(from_geography_id);
CREATE INDEX idx_apportionment_rules_to_geo ON apportionment_rules(to_geography_id);
CREATE INDEX idx_apportionment_rules_status ON apportionment_rules(status);

-- =============================================================================
-- APPORTIONMENT CONSTRAINTS (Capacity limits, growth rate limits)
-- =============================================================================
CREATE TABLE apportionment_constraints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What constraint applies to?
  vertical_id TEXT REFERENCES verticals(id) ON DELETE CASCADE,
  geography_id TEXT REFERENCES geographies(id) ON DELETE CASCADE,
  factor_id TEXT REFERENCES factors(id) ON DELETE CASCADE,

  -- Constraint definition
  constraint_type TEXT NOT NULL CHECK (constraint_type IN ('capacity', 'growth_rate', 'dependency', 'policy')),

  -- For capacity constraints
  max_capacity NUMERIC,
  max_capacity_year INTEGER,
  max_capacity_unit TEXT,

  -- For growth rate constraints
  max_annual_growth_rate NUMERIC,

  -- For dependency constraints
  depends_on_target_id TEXT REFERENCES targets(id) ON DELETE CASCADE,
  dependency_ratio NUMERIC,

  -- For policy constraints
  policy_reference TEXT,
  policy_hard_limit BOOLEAN DEFAULT false,

  -- Metadata
  rationale TEXT,
  data_source TEXT,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'deprecated')),

  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_apportionment_constraints_vertical ON apportionment_constraints(vertical_id);
CREATE INDEX idx_apportionment_constraints_geography ON apportionment_constraints(geography_id);
CREATE INDEX idx_apportionment_constraints_factor ON apportionment_constraints(factor_id);

-- =============================================================================
-- GEOGRAPHY CONVERSION MULTIPLIERS (Location-specific cost adjustments)
-- =============================================================================
CREATE TABLE geography_conversion_multipliers (
  id SERIAL PRIMARY KEY,
  geography_id TEXT NOT NULL REFERENCES geographies(id) ON DELETE CASCADE,
  factor_id TEXT NOT NULL REFERENCES factors(id) ON DELETE CASCADE,

  multiplier NUMERIC NOT NULL DEFAULT 1.0,
  basis TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(geography_id, factor_id)
);

CREATE INDEX idx_geography_multipliers_geography ON geography_conversion_multipliers(geography_id);

-- =============================================================================
-- TRIGGERS
-- =============================================================================
CREATE TRIGGER update_targets_updated_at
  BEFORE UPDATE ON targets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversion_ratios_updated_at
  BEFORE UPDATE ON conversion_ratios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_requirements_updated_at
  BEFORE UPDATE ON skill_requirements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apportionment_rules_updated_at
  BEFORE UPDATE ON apportionment_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apportionment_constraints_updated_at
  BEFORE UPDATE ON apportionment_constraints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geography_multipliers_updated_at
  BEFORE UPDATE ON geography_conversion_multipliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- COMMENTS
-- =============================================================================
COMMENT ON TABLE targets IS 'Single source of truth for all metrics (Verticals × Geography × Factors × Year)';
COMMENT ON TABLE conversion_ratios IS 'How to cascade from one metric to another (e.g., revenue → employment)';
COMMENT ON TABLE skill_requirements IS 'Labour breakdown by specific skills required per vertical/geography';
COMMENT ON TABLE apportionment_rules IS 'Historical defaults for distributing state-level targets to clusters';
COMMENT ON TABLE apportionment_constraints IS 'Capacity limits and validation rules for targets';
COMMENT ON TABLE geography_conversion_multipliers IS 'Location-specific cost adjustments (e.g., Bengaluru 20% premium)';
