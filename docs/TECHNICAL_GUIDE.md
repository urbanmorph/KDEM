# KDEM Technical Guide
## Complete Developer Reference for the Karnataka Digital Economy Mission Dashboard

**Version:** 1.0
**Last Updated:** 2025-02-05
**Authors:** KDEM Development Team

---

## Table of Contents

1. [3D Data Architecture](#3d-data-architecture)
2. [Database Schema](#database-schema)
3. [Supabase Implementation](#supabase-implementation)
4. [Auto-Apportionment System](#auto-apportionment-system)
5. [Query Patterns](#query-patterns)
6. [API Reference](#api-reference)
7. [Frontend Integration](#frontend-integration)
8. [Deployment Guide](#deployment-guide)
9. [Data Migration](#data-migration)
10. [Validation Rules](#validation-rules)

---

# 3D Data Architecture

## The Problem: Verticals x Geography x Factors

The KDEM data has **three intersecting dimensions**:

1. **VERTICALS** (5 pillars): IT Exports, IT Domestic, ESDM, Startups, Digitizing Sectors
2. **GEOGRAPHY** (8 clusters): Bengaluru, Mysuru, Mangaluru, HDB, Kalaburagi, Tumakuru, Shivamogga, Rest of Karnataka
3. **FACTORS** (4 horizontals): Land, Labour, Capital, Organisation

### The Challenge

- Skilling targets (Labour) are set for specific Verticals (e.g., "50K ESDM workers") AND specific Geographies (e.g., "10K in Mysuru")
- Revenue targets for a Vertical in a Geography require corresponding Land, Labour, Capital, and Organisation resources
- Changes in one dimension must cascade to related dimensions to prevent inconsistencies

### Example Cascade

```
ESDM target in Mysuru: $1.5B by 2030
  |
  +-- Requires:
      - Land: 500,000 sq ft factory space
      - Labour: 15,000 skilled workers (PCB design, assembly)
      - Capital: Rs.500 Cr funding for infrastructure
      - Organisation: Environmental clearances, power supply, transport
```

If these are stored independently, they can go out of sync.

---

## Solution: Relational Database Model

### Core Principles

1. **Single Source of Truth** - Base targets stored once at the most granular level (Vertical x Geography x Factor x Year)
2. **Dynamic Aggregations** - Never store redundant aggregated data
3. **Enforced Relationships** - Foreign keys and validation rules
4. **Derived Calculations** - Auto-calculate based on formulae

---

## Dimension Tables

### Verticals

Verticals represent the economic pillars of Karnataka's digital economy:

```json
{
  "verticals": [
    {
      "id": "it-exports",
      "name": "IT Exports",
      "category": "core",
      "parent_id": null
    },
    {
      "id": "it-domestic",
      "name": "IT Domestic",
      "category": "core",
      "parent_id": null
    },
    {
      "id": "esdm",
      "name": "ESDM",
      "category": "core",
      "parent_id": null
    },
    {
      "id": "esdm-pcb",
      "name": "PCB Manufacturing",
      "category": "sub-sector",
      "parent_id": "esdm"
    },
    {
      "id": "esdm-semiconductor",
      "name": "Semiconductor Design",
      "category": "sub-sector",
      "parent_id": "esdm"
    },
    {
      "id": "startups",
      "name": "Startups & Innovation",
      "category": "core",
      "parent_id": null
    },
    {
      "id": "digitizing-healthcare",
      "name": "Tech-enabled Healthcare",
      "category": "digitizing",
      "parent_id": "digitizing-sectors"
    }
  ]
}
```

### Geographies

Geographic clusters represent the spatial distribution strategy:

```json
{
  "geographies": [
    {
      "id": "bengaluru",
      "name": "Bengaluru",
      "type": "urban-metro",
      "tier": "existing-hub",
      "region": "south-karnataka",
      "parent_id": null
    },
    {
      "id": "mysuru",
      "name": "Mysuru",
      "type": "urban-tier2",
      "tier": "tier1-invest-aggressively",
      "region": "south-karnataka",
      "parent_id": null
    },
    {
      "id": "mysuru-pcb-park",
      "name": "Mysuru PCB Park",
      "type": "industrial-park",
      "tier": "tier1-invest-aggressively",
      "region": "south-karnataka",
      "parent_id": "mysuru"
    },
    {
      "id": "mangaluru",
      "name": "Mangaluru",
      "type": "coastal-city",
      "tier": "tier1-invest-aggressively",
      "region": "coastal-karnataka",
      "parent_id": null
    },
    {
      "id": "hdb-corridor",
      "name": "Hubballi-Dharwad-Belagavi",
      "type": "urban-corridor",
      "tier": "tier1-invest-aggressively",
      "region": "north-karnataka",
      "parent_id": null
    },
    {
      "id": "kalaburagi",
      "name": "Kalaburagi",
      "type": "urban-tier3",
      "tier": "tier2-nurture-build",
      "region": "north-karnataka",
      "parent_id": null
    },
    {
      "id": "tumakuru",
      "name": "Tumakuru",
      "type": "industrial-city",
      "tier": "tier2-nurture-build",
      "region": "central-karnataka",
      "parent_id": null
    },
    {
      "id": "shivamogga",
      "name": "Shivamogga",
      "type": "urban-tier3",
      "tier": "tier3-study-strategize",
      "region": "central-karnataka",
      "parent_id": null
    },
    {
      "id": "rest-of-karnataka",
      "name": "Rest of Karnataka",
      "type": "distributed",
      "tier": "emerging",
      "region": "statewide",
      "parent_id": null
    }
  ]
}
```

### Factors

Factors represent the four pillars of resource requirements:

```json
{
  "factors": [
    {
      "id": "land",
      "name": "Land",
      "category": "physical-infrastructure",
      "metrics": ["sq_ft", "acres", "units", "rentals_per_sqft"]
    },
    {
      "id": "labour",
      "name": "Labour",
      "category": "human-capital",
      "metrics": ["headcount", "skill_level", "cost_per_employee", "training_hours"]
    },
    {
      "id": "capital",
      "name": "Capital",
      "category": "financial-resources",
      "metrics": ["funding_amount", "number_of_deals", "avg_deal_size", "roi"]
    },
    {
      "id": "organisation",
      "name": "Organisation",
      "category": "institutional-infrastructure",
      "metrics": ["clearance_time_days", "compliance_cost", "quality_of_life_index"]
    }
  ]
}
```

---

## Fact Table (Targets)

The targets table is the **Single Source of Truth** for all KDEM metrics:

```json
{
  "schema_version": "1.0",
  "targets": [
    {
      "id": "t001",
      "vertical_id": "esdm",
      "geography_id": "mysuru",
      "factor_id": "labour",
      "year": 2030,
      "metric": "headcount",
      "value": 15000,
      "unit": "employees",
      "skill_breakdown": {
        "pcb_design": 3000,
        "assembly_technicians": 8000,
        "quality_control": 2000,
        "management": 2000
      },
      "data_source": "KDEM estimates based on $1.5B revenue target",
      "confidence_rating": 3,
      "dependencies": ["t002", "t003", "t004"],
      "formula": "revenue_target * employment_intensity_ratio",
      "calculation_params": {
        "revenue_target_id": "t010",
        "employment_intensity_ratio": 0.01
      }
    },
    {
      "id": "t002",
      "vertical_id": "esdm",
      "geography_id": "mysuru",
      "factor_id": "land",
      "year": 2030,
      "metric": "sq_ft",
      "value": 500000,
      "unit": "square_feet",
      "breakdown": {
        "manufacturing_floor": 350000,
        "warehousing": 80000,
        "office_space": 50000,
        "utilities": 20000
      },
      "data_source": "KDEM estimates",
      "confidence_rating": 3,
      "dependencies": ["t001"],
      "formula": "headcount * sqft_per_employee",
      "calculation_params": {
        "headcount_target_id": "t001",
        "sqft_per_employee": 33.33
      }
    },
    {
      "id": "t010",
      "vertical_id": "esdm",
      "geography_id": "mysuru",
      "factor_id": null,
      "year": 2030,
      "metric": "revenue",
      "value": 1.5,
      "unit": "billion_usd",
      "data_source": "PDF Slide 16",
      "confidence_rating": 4,
      "dependencies": []
    }
  ]
}
```

---

## Relationship Tables

### Vertical-Geography Mapping

Defines strategic focus for vertical-geography combinations:

```json
{
  "mappings": [
    {
      "vertical_id": "esdm",
      "geography_id": "mysuru",
      "focus_level": "high",
      "strategic_priority": "Cybersecurity & ESDM Hub",
      "sub_sectors": ["esdm-pcb", "esdm-semiconductor"],
      "infrastructure": ["mysuru-pcb-park"],
      "target_references": ["t001", "t002", "t003", "t004", "t010"]
    },
    {
      "vertical_id": "esdm",
      "geography_id": "tumakuru",
      "focus_level": "high",
      "strategic_priority": "Aerospace Valley",
      "sub_sectors": ["esdm-aerospace", "esdm-precision-manufacturing"],
      "infrastructure": ["tumakuru-aerospace-sez"],
      "target_references": ["t050", "t051"]
    },
    {
      "vertical_id": "it-exports",
      "geography_id": "mangaluru",
      "focus_level": "high",
      "strategic_priority": "Silicon Beach - Fintech & GCCs",
      "sub_sectors": ["it-fintech", "it-gcc"],
      "infrastructure": ["mangaluru-tech-park"],
      "target_references": ["t200", "t201"]
    }
  ]
}
```

### Factor Requirements (Conversion Ratios)

Defines how factors relate to revenue and each other:

```json
{
  "conversion_ratios": [
    {
      "vertical_id": "esdm",
      "revenue_to_employment": {
        "ratio": 100,
        "unit": "employees_per_million_usd",
        "basis": "ICEA industry benchmarks",
        "confidence": 4
      },
      "employment_to_land": {
        "ratio": 33.33,
        "unit": "sqft_per_employee",
        "breakdown": {
          "manufacturing_floor": 23,
          "office_amenities": 7,
          "utilities_storage": 3.33
        },
        "basis": "Karnataka industrial land norms",
        "confidence": 3
      },
      "land_to_capital": {
        "ratio": 4000,
        "unit": "inr_capex_per_sqft",
        "breakdown": {
          "land_cost": 1500,
          "building_construction": 2000,
          "utilities_infrastructure": 500
        },
        "basis": "Mysuru real estate + construction costs",
        "confidence": 3
      }
    },
    {
      "vertical_id": "it-exports",
      "revenue_to_employment": {
        "ratio": 20,
        "unit": "employees_per_million_usd",
        "basis": "NASSCOM averages",
        "confidence": 5
      },
      "employment_to_land": {
        "ratio": 100,
        "unit": "sqft_per_employee",
        "breakdown": {
          "workstation": 60,
          "collaboration_space": 20,
          "amenities": 15,
          "utilities": 5
        },
        "basis": "IT industry standards",
        "confidence": 5
      },
      "land_to_capital": {
        "ratio": 3500,
        "unit": "inr_capex_per_sqft",
        "breakdown": {
          "land_lease": 500,
          "fitout_furniture": 2000,
          "it_infrastructure": 1000
        },
        "basis": "Bengaluru IT park benchmarks",
        "confidence": 4
      }
    },
    {
      "vertical_id": "startups",
      "revenue_to_employment": {
        "ratio": 15,
        "unit": "employees_per_million_usd",
        "basis": "Karnataka startup averages",
        "confidence": 3
      },
      "employment_to_land": {
        "ratio": 80,
        "unit": "sqft_per_employee",
        "note": "Includes high % co-working usage",
        "basis": "Startup ecosystem patterns",
        "confidence": 3
      }
    }
  ]
}
```

### Skill Requirements

```json
{
  "skill_requirements": [
    {
      "vertical_id": "esdm",
      "sub_sector_id": "esdm-pcb",
      "geography_id": "mysuru",
      "skills": [
        {
          "skill_name": "PCB Design (Altium, Cadence)",
          "percentage_of_workforce": 20,
          "training_duration_months": 6,
          "training_cost_per_person_inr": 50000,
          "current_availability": "low",
          "gap_percentage": 80
        },
        {
          "skill_name": "SMT Assembly Technician",
          "percentage_of_workforce": 53,
          "training_duration_months": 3,
          "training_cost_per_person_inr": 30000,
          "current_availability": "medium",
          "gap_percentage": 50
        },
        {
          "skill_name": "Quality Control & Testing",
          "percentage_of_workforce": 13,
          "training_duration_months": 4,
          "training_cost_per_person_inr": 40000,
          "current_availability": "medium",
          "gap_percentage": 40
        },
        {
          "skill_name": "Engineering Management",
          "percentage_of_workforce": 13,
          "training_duration_months": 12,
          "training_cost_per_person_inr": 200000,
          "current_availability": "low",
          "gap_percentage": 70
        }
      ]
    }
  ]
}
```

---

# Database Schema

## PostgreSQL Schema

### Dimension Tables

#### `verticals` Table

```sql
CREATE TABLE verticals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('core', 'sub-sector', 'digitizing')),
  parent_id TEXT REFERENCES verticals(id),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO verticals (id, name, category, parent_id) VALUES
  ('it-exports', 'IT Exports', 'core', NULL),
  ('it-domestic', 'IT Domestic', 'core', NULL),
  ('esdm', 'ESDM', 'core', NULL),
  ('esdm-pcb', 'PCB Manufacturing', 'sub-sector', 'esdm'),
  ('esdm-semiconductor', 'Semiconductor Design', 'sub-sector', 'esdm'),
  ('startups', 'Startups & Innovation', 'core', NULL),
  ('digitizing-sectors', 'Newly Digitizing Sectors', 'core', NULL),
  ('digitizing-healthcare', 'Tech-enabled Healthcare', 'digitizing', 'digitizing-sectors'),
  ('digitizing-payments', 'Digital Payments', 'digitizing', 'digitizing-sectors');
```

#### `geographies` Table

```sql
CREATE TABLE geographies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  tier TEXT,
  region TEXT,
  parent_id TEXT REFERENCES geographies(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO geographies (id, name, type, tier, region) VALUES
  ('karnataka', 'Karnataka', 'state', NULL, 'statewide'),
  ('bengaluru', 'Bengaluru', 'urban-metro', 'existing-hub', 'south-karnataka'),
  ('mysuru', 'Mysuru', 'urban-tier2', 'tier1-invest-aggressively', 'south-karnataka'),
  ('mysuru-pcb-park', 'Mysuru PCB Park', 'industrial-park', 'tier1-invest-aggressively', 'south-karnataka'),
  ('mangaluru', 'Mangaluru', 'coastal-city', 'tier1-invest-aggressively', 'coastal-karnataka'),
  ('hdb-corridor', 'Hubballi-Dharwad-Belagavi', 'urban-corridor', 'tier1-invest-aggressively', 'north-karnataka'),
  ('kalaburagi', 'Kalaburagi', 'urban-tier3', 'tier2-nurture-build', 'north-karnataka'),
  ('tumakuru', 'Tumakuru', 'industrial-city', 'tier2-nurture-build', 'central-karnataka'),
  ('shivamogga', 'Shivamogga', 'urban-tier3', 'tier3-study-strategize', 'central-karnataka');

-- Update parent relationships
UPDATE geographies SET parent_id = 'mysuru' WHERE id = 'mysuru-pcb-park';
```

#### `factors` Table

```sql
CREATE TABLE factors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  metrics TEXT[], -- Array of supported metrics
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO factors (id, name, category, metrics) VALUES
  ('land', 'Land', 'physical-infrastructure', ARRAY['sq_ft', 'acres', 'units', 'rentals_per_sqft']),
  ('labour', 'Labour', 'human-capital', ARRAY['headcount', 'skill_level', 'cost_per_employee', 'training_hours']),
  ('capital', 'Capital', 'financial-resources', ARRAY['funding_amount', 'number_of_deals', 'avg_deal_size', 'roi']),
  ('organisation', 'Organisation', 'institutional-infrastructure', ARRAY['clearance_time_days', 'compliance_cost', 'quality_of_life_index']);
```

---

### Fact Table

#### `targets` Table

```sql
CREATE TABLE targets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  vertical_id TEXT REFERENCES verticals(id) ON DELETE CASCADE,
  geography_id TEXT NOT NULL REFERENCES geographies(id) ON DELETE CASCADE,
  factor_id TEXT REFERENCES factors(id) ON DELETE CASCADE,
  year INTEGER NOT NULL CHECK (year >= 2020 AND year <= 2050),
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,

  -- Breakdown (JSON for flexibility)
  breakdown JSONB,

  -- Metadata
  data_source TEXT NOT NULL,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  notes TEXT,

  -- Relationships
  parent_target_id TEXT REFERENCES targets(id),
  allocation_percentage NUMERIC CHECK (allocation_percentage >= 0 AND allocation_percentage <= 100),

  -- Calculation metadata
  formula TEXT,
  calculation_params JSONB,
  dependencies TEXT[], -- Array of target IDs this depends on

  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT,

  -- Constraints
  UNIQUE(vertical_id, geography_id, factor_id, year, metric)
);

-- Sample data
INSERT INTO targets (id, vertical_id, geography_id, factor_id, year, metric, value, unit, data_source, confidence_rating, formula, calculation_params, dependencies) VALUES
  ('t001', 'esdm', 'mysuru', 'labour', 2030, 'headcount', 15000, 'employees', 'KDEM estimates based on $1.5B revenue target', 3, 'revenue_target * employment_intensity_ratio', '{"revenue_target_id": "t010", "employment_intensity_ratio": 100}', ARRAY['t010']),
  ('t002', 'esdm', 'mysuru', 'land', 2030, 'sq_ft', 500000, 'square_feet', 'KDEM estimates', 3, 'headcount * sqft_per_employee', '{"headcount_target_id": "t001", "sqft_per_employee": 33.33}', ARRAY['t001']),
  ('t003', 'esdm', 'mysuru', 'capital', 2030, 'funding_amount', 500, 'crores_inr', 'KDEM estimates', 3, 'land_sqft * capex_per_sqft + equipment_cost', '{"land_sqft_target_id": "t002", "capex_per_sqft_inr": 4000, "equipment_cost_cr": 150}', ARRAY['t002']),
  ('t010', 'esdm', 'mysuru', NULL, 2030, 'revenue', 1.5, 'billion_usd', 'PDF Slide 16', 4, NULL, NULL, NULL);
```

---

### Reference Tables

#### `conversion_ratios` Table

```sql
CREATE TABLE conversion_ratios (
  id SERIAL PRIMARY KEY,
  vertical_id TEXT NOT NULL REFERENCES verticals(id),
  from_metric TEXT NOT NULL, -- e.g., 'revenue'
  to_metric TEXT NOT NULL,   -- e.g., 'employment'
  ratio NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  breakdown JSONB,
  basis TEXT,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  effective_from DATE,
  effective_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO conversion_ratios (vertical_id, from_metric, to_metric, ratio, unit, basis, confidence_rating) VALUES
  ('esdm', 'revenue', 'employment', 100, 'employees_per_million_usd', 'ICEA industry benchmarks', 4),
  ('esdm', 'employment', 'land', 33.33, 'sqft_per_employee', 'Karnataka industrial land norms', 3),
  ('esdm', 'land', 'capital', 4000, 'inr_capex_per_sqft', 'Mysuru real estate + construction costs', 3),
  ('it-exports', 'revenue', 'employment', 20, 'employees_per_million_usd', 'NASSCOM averages', 5),
  ('it-exports', 'employment', 'land', 100, 'sqft_per_employee', 'IT industry standards', 5);
```

#### `skill_requirements` Table

```sql
CREATE TABLE skill_requirements (
  id SERIAL PRIMARY KEY,
  vertical_id TEXT NOT NULL REFERENCES verticals(id),
  geography_id TEXT REFERENCES geographies(id),
  skill_name TEXT NOT NULL,
  percentage_of_workforce NUMERIC CHECK (percentage_of_workforce >= 0 AND percentage_of_workforce <= 100),
  training_duration_months INTEGER,
  training_cost_per_person_inr NUMERIC,
  current_availability TEXT CHECK (current_availability IN ('low', 'medium', 'high')),
  gap_percentage NUMERIC CHECK (gap_percentage >= 0 AND gap_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO skill_requirements (vertical_id, geography_id, skill_name, percentage_of_workforce, training_duration_months, training_cost_per_person_inr, current_availability, gap_percentage) VALUES
  ('esdm', 'mysuru', 'PCB Design (Altium, Cadence)', 20, 6, 50000, 'low', 80),
  ('esdm', 'mysuru', 'SMT Assembly Technician', 53, 3, 30000, 'medium', 50),
  ('esdm', 'mysuru', 'Quality Control & Testing', 13, 4, 40000, 'medium', 40),
  ('esdm', 'mysuru', 'Engineering Management', 13, 12, 200000, 'low', 70);
```

#### `apportionment_rules` Table

```sql
CREATE TABLE apportionment_rules (
  id SERIAL PRIMARY KEY,
  vertical_id TEXT REFERENCES verticals(id),
  from_geography_id TEXT NOT NULL REFERENCES geographies(id),
  to_geography_id TEXT NOT NULL REFERENCES geographies(id),
  rule_type TEXT NOT NULL CHECK (rule_type IN ('percentage', 'absolute', 'formula')),
  percentage_allocation NUMERIC CHECK (percentage_allocation >= 0 AND percentage_allocation <= 100),
  basis TEXT NOT NULL,
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deprecated')),
  effective_from DATE,
  effective_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data for IT Exports
INSERT INTO apportionment_rules (vertical_id, from_geography_id, to_geography_id, rule_type, percentage_allocation, basis, confidence_rating, effective_from) VALUES
  ('it-exports', 'karnataka', 'bengaluru', 'percentage', 85, 'NASSCOM Karnataka IT Report 2020-2025 avg', 5, '2020-01-01'),
  ('it-exports', 'karnataka', 'mysuru', 'percentage', 3, 'Beyond Bengaluru program data 2022-2025', 3, '2022-01-01'),
  ('it-exports', 'karnataka', 'mangaluru', 'percentage', 4, 'Beyond Bengaluru program data 2022-2025', 3, '2022-01-01'),
  ('it-exports', 'karnataka', 'hdb-corridor', 'percentage', 3, 'Beyond Bengaluru program data 2022-2025', 3, '2022-01-01'),
  ('it-exports', 'karnataka', 'tumakuru', 'percentage', 2, 'Emerging cluster estimates', 2, '2022-01-01'),
  ('it-exports', 'karnataka', 'kalaburagi', 'percentage', 1, 'Emerging cluster estimates', 2, '2022-01-01'),
  ('it-exports', 'karnataka', 'shivamogga', 'percentage', 1, 'Development phase', 2, '2022-01-01'),
  ('it-exports', 'karnataka', 'rest-of-karnataka', 'percentage', 1, 'Distributed', 2, '2022-01-01');

-- Sample data for ESDM
INSERT INTO apportionment_rules (vertical_id, from_geography_id, to_geography_id, rule_type, percentage_allocation, basis, confidence_rating) VALUES
  ('esdm', 'karnataka', 'bengaluru', 'percentage', 60, 'Historical ESDM concentration in Bengaluru', 4),
  ('esdm', 'karnataka', 'mysuru', 'percentage', 15, 'Mysuru PCB Park target allocation', 3),
  ('esdm', 'karnataka', 'tumakuru', 'percentage', 20, 'Aerospace SEZ concentration', 4),
  ('esdm', 'karnataka', 'hdb-corridor', 'percentage', 3, 'Emerging manufacturing', 2),
  ('esdm', 'karnataka', 'rest-of-karnataka', 'percentage', 2, 'Distributed', 2);

-- Generic fallback rules (vertical_id = NULL, lower priority)
INSERT INTO apportionment_rules (vertical_id, from_geography_id, to_geography_id, rule_type, percentage_allocation, basis, confidence_rating, priority) VALUES
  (NULL, 'karnataka', 'bengaluru', 'percentage', 70, 'Default: Hub concentration', 2, -1),
  (NULL, 'karnataka', 'mysuru', 'percentage', 8, 'Default: Tier 1 cluster', 2, -1),
  (NULL, 'karnataka', 'mangaluru', 'percentage', 8, 'Default: Tier 1 cluster', 2, -1),
  (NULL, 'karnataka', 'hdb-corridor', 'percentage', 7, 'Default: Tier 1 cluster', 2, -1),
  (NULL, 'karnataka', 'kalaburagi', 'percentage', 2, 'Default: Tier 2 cluster', 2, -1),
  (NULL, 'karnataka', 'tumakuru', 'percentage', 2, 'Default: Tier 2 cluster', 2, -1),
  (NULL, 'karnataka', 'shivamogga', 'percentage', 1, 'Default: Tier 3 cluster', 2, -1),
  (NULL, 'karnataka', 'rest-of-karnataka', 'percentage', 2, 'Default: Distributed', 2, -1);
```

#### `geography_conversion_multipliers` Table

```sql
CREATE TABLE geography_conversion_multipliers (
  id SERIAL PRIMARY KEY,
  geography_id TEXT NOT NULL REFERENCES geographies(id),
  factor_id TEXT NOT NULL REFERENCES factors(id),
  multiplier NUMERIC NOT NULL,
  basis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bengaluru has higher costs
INSERT INTO geography_conversion_multipliers (geography_id, factor_id, multiplier, basis) VALUES
  ('bengaluru', 'land', 1.2, '20% premium for Bengaluru real estate'),
  ('bengaluru', 'capital', 1.15, '15% higher construction/fitout costs');

-- Tier 2/3 cities have lower costs
INSERT INTO geography_conversion_multipliers (geography_id, factor_id, multiplier, basis) VALUES
  ('mysuru', 'land', 0.7, '30% discount vs Bengaluru'),
  ('mysuru', 'capital', 0.8, '20% lower costs'),
  ('kalaburagi', 'land', 0.5, '50% discount vs Bengaluru'),
  ('kalaburagi', 'capital', 0.6, '40% lower costs'),
  ('shivamogga', 'land', 0.45, '55% discount vs Bengaluru'),
  ('shivamogga', 'capital', 0.55, '45% lower costs');
```

---

### Indexes and Constraints

```sql
-- Performance indexes for targets table
CREATE INDEX idx_targets_vertical ON targets(vertical_id);
CREATE INDEX idx_targets_geography ON targets(geography_id);
CREATE INDEX idx_targets_factor ON targets(factor_id);
CREATE INDEX idx_targets_year ON targets(year);
CREATE INDEX idx_targets_composite ON targets(vertical_id, geography_id, factor_id, year);
CREATE INDEX idx_targets_parent ON targets(parent_target_id);
CREATE INDEX idx_targets_metric ON targets(metric);

-- Full-text search on notes
CREATE INDEX idx_targets_notes_search ON targets USING gin(to_tsvector('english', notes));

-- Indexes for apportionment rules
CREATE INDEX idx_apportionment_vertical ON apportionment_rules(vertical_id);
CREATE INDEX idx_apportionment_from_geo ON apportionment_rules(from_geography_id);
CREATE INDEX idx_apportionment_to_geo ON apportionment_rules(to_geography_id);
CREATE INDEX idx_apportionment_status ON apportionment_rules(status);

-- Indexes for conversion ratios
CREATE INDEX idx_ratios_vertical ON conversion_ratios(vertical_id);
CREATE INDEX idx_ratios_from_to ON conversion_ratios(from_metric, to_metric);
```

---

## Functions and Triggers

### Timestamp Update Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_targets_updated_at
  BEFORE UPDATE ON targets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verticals_updated_at
  BEFORE UPDATE ON verticals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geographies_updated_at
  BEFORE UPDATE ON geographies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_factors_updated_at
  BEFORE UPDATE ON factors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Parent-Child Validation Trigger

```sql
CREATE OR REPLACE FUNCTION validate_parent_child_target()
RETURNS TRIGGER AS $$
DECLARE
  parent_value NUMERIC;
BEGIN
  IF NEW.parent_target_id IS NOT NULL THEN
    SELECT value INTO parent_value FROM targets WHERE id = NEW.parent_target_id;

    IF NEW.value > parent_value THEN
      RAISE EXCEPTION 'Child target value (%) cannot exceed parent target value (%)', NEW.value, parent_value;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_parent_child_targets
  BEFORE INSERT OR UPDATE ON targets
  FOR EACH ROW EXECUTE FUNCTION validate_parent_child_target();
```

### Cascade Factor Targets Function

```sql
CREATE OR REPLACE FUNCTION cascade_factor_targets(revenue_target_id TEXT)
RETURNS JSON AS $$
DECLARE
  rev_target targets%ROWTYPE;
  ratios RECORD;
  labour_target_id TEXT;
  land_target_id TEXT;
  capital_target_id TEXT;
  result JSON;
BEGIN
  -- Get revenue target
  SELECT * INTO rev_target FROM targets WHERE id = revenue_target_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Revenue target % not found', revenue_target_id;
  END IF;

  -- Get conversion ratios for this vertical
  SELECT
    MAX(CASE WHEN from_metric = 'revenue' AND to_metric = 'employment' THEN ratio END) AS revenue_to_employment,
    MAX(CASE WHEN from_metric = 'employment' AND to_metric = 'land' THEN ratio END) AS employment_to_land,
    MAX(CASE WHEN from_metric = 'land' AND to_metric = 'capital' THEN ratio END) AS land_to_capital
  INTO ratios
  FROM conversion_ratios
  WHERE vertical_id = rev_target.vertical_id;

  -- Create labour target
  INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit, data_source, confidence_rating, formula, calculation_params, dependencies)
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'labour',
    rev_target.year,
    'headcount',
    rev_target.value * 1000 * ratios.revenue_to_employment,
    'employees',
    'Auto-calculated from revenue target',
    GREATEST(1, rev_target.confidence_rating - 1),
    'revenue_target * employment_intensity_ratio',
    json_build_object('revenue_target_id', revenue_target_id, 'employment_intensity_ratio', ratios.revenue_to_employment),
    ARRAY[revenue_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    updated_at = NOW()
  RETURNING id INTO labour_target_id;

  -- Create land target
  INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit, data_source, confidence_rating, formula, calculation_params, dependencies)
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'land',
    rev_target.year,
    'sq_ft',
    (rev_target.value * 1000 * ratios.revenue_to_employment) * ratios.employment_to_land,
    'square_feet',
    'Auto-calculated from labour target',
    GREATEST(1, rev_target.confidence_rating - 1),
    'headcount * sqft_per_employee',
    json_build_object('headcount_target_id', labour_target_id, 'sqft_per_employee', ratios.employment_to_land),
    ARRAY[labour_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    updated_at = NOW()
  RETURNING id INTO land_target_id;

  -- Create capital target
  INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value, unit, data_source, confidence_rating, formula, calculation_params, dependencies)
  VALUES (
    rev_target.vertical_id,
    rev_target.geography_id,
    'capital',
    rev_target.year,
    'funding_amount',
    ((rev_target.value * 1000 * ratios.revenue_to_employment) * ratios.employment_to_land * ratios.land_to_capital) / 10000000,
    'crores_inr',
    'Auto-calculated from land target',
    GREATEST(1, rev_target.confidence_rating - 1),
    'land_sqft * capex_per_sqft',
    json_build_object('land_sqft_target_id', land_target_id, 'capex_per_sqft_inr', ratios.land_to_capital),
    ARRAY[land_target_id]
  )
  ON CONFLICT (vertical_id, geography_id, factor_id, year, metric)
  DO UPDATE SET
    value = EXCLUDED.value,
    calculation_params = EXCLUDED.calculation_params,
    updated_at = NOW()
  RETURNING id INTO capital_target_id;

  -- Return created target IDs
  result := json_build_object(
    'revenue', revenue_target_id,
    'labour', labour_target_id,
    'land', land_target_id,
    'capital', capital_target_id
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;
```

### Validate Geographic Sum Function

```sql
CREATE OR REPLACE FUNCTION validate_geographic_sum(
  p_vertical_id TEXT,
  p_factor_id TEXT,
  p_year INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  karnataka_total NUMERIC;
  geographic_sum NUMERIC;
BEGIN
  -- Get Karnataka total
  SELECT value INTO karnataka_total
  FROM targets
  WHERE vertical_id = p_vertical_id
    AND geography_id = 'karnataka'
    AND factor_id = p_factor_id
    AND year = p_year;

  IF karnataka_total IS NULL THEN
    RETURN TRUE; -- No Karnataka total to validate against
  END IF;

  -- Sum of all sub-geographies
  SELECT COALESCE(SUM(value), 0) INTO geographic_sum
  FROM targets
  WHERE vertical_id = p_vertical_id
    AND geography_id IN ('bengaluru', 'mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka')
    AND factor_id = p_factor_id
    AND year = p_year;

  -- Check if sums match (within 1% tolerance)
  IF karnataka_total > 0 AND ABS(geographic_sum - karnataka_total) / karnataka_total > 0.01 THEN
    RAISE WARNING 'Geographic sum (%) != Karnataka total (%) for vertical=%, factor=%, year=%',
      geographic_sum, karnataka_total, p_vertical_id, p_factor_id, p_year;
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

### Generate Default Apportionment Function

```sql
CREATE OR REPLACE FUNCTION generate_default_apportionment(
  p_vertical_id TEXT,
  p_year INTEGER
)
RETURNS TABLE (
  geography_id TEXT,
  percentage NUMERIC,
  basis TEXT,
  confidence INTEGER
) AS $$
BEGIN
  -- First try vertical-specific rules
  RETURN QUERY
  SELECT
    ar.to_geography_id,
    ar.percentage_allocation,
    ar.basis,
    ar.confidence_rating
  FROM apportionment_rules ar
  WHERE (ar.vertical_id = p_vertical_id OR ar.vertical_id IS NULL)
    AND ar.from_geography_id = 'karnataka'
    AND ar.status = 'active'
    AND (ar.effective_to IS NULL OR ar.effective_to >= CURRENT_DATE)
  ORDER BY
    CASE WHEN ar.vertical_id IS NOT NULL THEN 1 ELSE 2 END,
    ar.priority DESC,
    ar.confidence_rating DESC;

  -- If no results, calculate from historical data
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT
      t.geography_id,
      AVG((t.value / total.value) * 100) AS percentage,
      'Calculated from historical targets ' || (p_year - 5) || '-' || (p_year - 1) AS basis,
      CASE
        WHEN COUNT(*) >= 5 THEN 4
        WHEN COUNT(*) >= 3 THEN 3
        ELSE 2
      END AS confidence
    FROM targets t
    JOIN (
      SELECT year, SUM(value) AS value
      FROM targets
      WHERE vertical_id = p_vertical_id
        AND geography_id = 'karnataka'
        AND year BETWEEN (p_year - 5) AND (p_year - 1)
        AND factor_id IS NULL
      GROUP BY year
    ) total ON total.year = t.year
    WHERE t.vertical_id = p_vertical_id
      AND t.year BETWEEN (p_year - 5) AND (p_year - 1)
      AND t.factor_id IS NULL
      AND t.geography_id != 'karnataka'
    GROUP BY t.geography_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

---

## Materialized Views

### Geography Dashboard View

```sql
CREATE MATERIALIZED VIEW geography_dashboard_view AS
SELECT
  g.id AS geography_id,
  g.name AS geography_name,
  g.tier AS geography_tier,
  g.region AS geography_region,
  t.year,
  v.id AS vertical_id,
  v.name AS vertical_name,
  MAX(CASE WHEN t.factor_id IS NULL AND t.metric = 'revenue' THEN t.value END) AS revenue,
  MAX(CASE WHEN t.factor_id = 'labour' AND t.metric = 'headcount' THEN t.value END) AS labour_headcount,
  MAX(CASE WHEN t.factor_id = 'land' AND t.metric = 'sq_ft' THEN t.value END) AS land_sqft,
  MAX(CASE WHEN t.factor_id = 'capital' AND t.metric = 'funding_amount' THEN t.value END) AS capital_crores,
  MAX(t.confidence_rating) AS max_confidence
FROM geographies g
CROSS JOIN verticals v
LEFT JOIN targets t ON t.geography_id = g.id AND t.vertical_id = v.id
WHERE v.category = 'core'
GROUP BY g.id, g.name, g.tier, g.region, t.year, v.id, v.name;

CREATE INDEX idx_geo_dashboard_geography ON geography_dashboard_view(geography_id);
CREATE INDEX idx_geo_dashboard_vertical ON geography_dashboard_view(vertical_id);
CREATE INDEX idx_geo_dashboard_year ON geography_dashboard_view(year);

-- Refresh command (run after data updates)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY geography_dashboard_view;
```

### Vertical Distribution View

```sql
CREATE MATERIALIZED VIEW vertical_distribution_view AS
SELECT
  v.id AS vertical_id,
  v.name AS vertical_name,
  t.year,
  g.id AS geography_id,
  g.name AS geography_name,
  g.tier AS geography_tier,
  t.value AS revenue,
  t.value / NULLIF(SUM(t.value) OVER (PARTITION BY v.id, t.year), 0) * 100 AS percentage_of_total,
  t.confidence_rating
FROM targets t
JOIN verticals v ON t.vertical_id = v.id
JOIN geographies g ON t.geography_id = g.id
WHERE t.factor_id IS NULL AND t.metric = 'revenue';

CREATE INDEX idx_vert_dist_vertical ON vertical_distribution_view(vertical_id);
CREATE INDEX idx_vert_dist_year ON vertical_distribution_view(year);

-- REFRESH MATERIALIZED VIEW CONCURRENTLY vertical_distribution_view;
```

### Factor Summary View

```sql
CREATE MATERIALIZED VIEW factor_summary_view AS
SELECT
  f.id AS factor_id,
  f.name AS factor_name,
  t.year,
  g.id AS geography_id,
  g.name AS geography_name,
  v.id AS vertical_id,
  v.name AS vertical_name,
  t.metric,
  t.value,
  t.unit,
  t.confidence_rating
FROM targets t
JOIN factors f ON t.factor_id = f.id
JOIN geographies g ON t.geography_id = g.id
JOIN verticals v ON t.vertical_id = v.id;

CREATE INDEX idx_factor_summary_factor ON factor_summary_view(factor_id);
CREATE INDEX idx_factor_summary_geography ON factor_summary_view(geography_id);
CREATE INDEX idx_factor_summary_year ON factor_summary_view(year);
```

---

## Row-Level Security

### Enable RLS on Tables

```sql
ALTER TABLE targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE verticals ENABLE ROW LEVEL SECURITY;
ALTER TABLE geographies ENABLE ROW LEVEL SECURITY;
ALTER TABLE factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_ratios ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE apportionment_rules ENABLE ROW LEVEL SECURITY;
```

### Public Read Access

```sql
CREATE POLICY "Allow public read access" ON targets
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON verticals
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON geographies
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON factors
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON conversion_ratios
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON skill_requirements
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON apportionment_rules
  FOR SELECT USING (true);
```

### Authenticated Write Access

```sql
-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON targets
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update" ON targets
  FOR UPDATE TO authenticated
  USING (true);

-- Only admins can delete
CREATE POLICY "Allow admins to delete" ON targets
  FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Similar policies for reference tables
CREATE POLICY "Allow admins to modify" ON conversion_ratios
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins to modify" ON apportionment_rules
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

---

# Supabase Implementation

## Why Supabase?

Supabase is the perfect fit for KDEM's 3D data model:

- **PostgreSQL Database** - Full relational database with foreign keys, constraints, triggers
- **Auto-Generated API** - REST and GraphQL endpoints from schema, no manual API coding
- **Real-time Subscriptions** - Changes cascade automatically across UI
- **Row-Level Security** - Different permissions for different users
- **Edge Functions** - Server-side validation logic
- **Open Source & Self-Hostable** - Government data sovereignty

## Architecture Diagram

```
+-------------------------------------------------------------+
|                         USER BROWSER                         |
+-------------------------------------------------------------+
|  Vite React/Vanilla JS App                                  |
|  - UI Components                                             |
|  - Supabase Client Library                                   |
|  - Real-time subscriptions                                   |
+----------------------------+--------------------------------+
                             |
                             | HTTPS (Auto-generated API)
                             |
+----------------------------v--------------------------------+
|                     SUPABASE CLOUD                           |
+-------------------------------------------------------------+
|  PostgREST (Auto API)                                        |
|  - GET /verticals, /geographies, /factors                   |
|  - GET /targets?vertical_id=eq.esdm&geography_id=eq.mysuru  |
|  - POST /targets (with validation)                           |
+-------------------------------------------------------------+
|  Realtime Engine                                             |
|  - WebSocket subscriptions                                   |
|  - Push updates to connected clients                         |
+-------------------------------------------------------------+
|  PostgreSQL Database                                         |
|  - Dimension tables (verticals, geographies, factors)       |
|  - Fact table (targets)                                      |
|  - Views (aggregated queries)                                |
|  - Triggers (cascade updates, validation)                    |
|  - Functions (calculations)                                  |
+-------------------------------------------------------------+
```

## Project Setup

### 1. Create Supabase Project

```bash
# Sign up at https://supabase.com
# Create new project: kdem-dashboard
# Note down:
# - Project URL: https://xxxxx.supabase.co
# - Anon (public) key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# - Service role key (for migrations): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Install Supabase CLI

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref xxxxx

# Initialize local development
supabase init
```

### 3. Configure Environment Variables

```bash
# .env.local (for development)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# .env.production (for deployment)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Migrations

### Directory Structure

```
supabase/
  migrations/
    20250205000001_create_dimension_tables.sql
    20250205000002_create_targets_table.sql
    20250205000003_create_reference_tables.sql
    20250205000004_create_functions.sql
    20250205000005_create_views.sql
    20250205000006_create_rls_policies.sql
    20250205000007_seed_data.sql
```

### Migration Commands

```bash
# Run all migrations
supabase db push

# Create a new migration
supabase migration new my_migration_name

# Reset database (WARNING: deletes all data)
supabase db reset

# Generate TypeScript types from schema
supabase gen types typescript --local > src/types/database.ts
```

### Sample Migration File

```sql
-- migrations/20250205000001_create_dimension_tables.sql

-- Create verticals table
CREATE TABLE IF NOT EXISTS verticals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('core', 'sub-sector', 'digitizing')),
  parent_id TEXT REFERENCES verticals(id),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create geographies table
CREATE TABLE IF NOT EXISTS geographies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  tier TEXT,
  region TEXT,
  parent_id TEXT REFERENCES geographies(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create factors table
CREATE TABLE IF NOT EXISTS factors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  metrics TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create update timestamp trigger
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
```

## Edge Functions

Edge Functions run server-side logic at the edge. Useful for complex calculations and validations.

### Create Edge Function

```bash
# Create new function
supabase functions new cascade-targets

# Deploy function
supabase functions deploy cascade-targets
```

### Sample Edge Function

```typescript
// supabase/functions/cascade-targets/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { revenue_target_id } = await req.json()

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Call database function
    const { data, error } = await supabase.rpc('cascade_factor_targets', {
      revenue_target_id
    })

    if (error) throw error

    // Refresh materialized views
    await supabase.rpc('refresh_all_views')

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

## Real-time Subscriptions

### Subscribe to Changes

```javascript
import { supabase } from './supabaseClient'

// Subscribe to all changes in targets for a specific geography
export function subscribeToGeography(geographyId, callback) {
  const subscription = supabase
    .channel(`geography:${geographyId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'targets',
        filter: `geography_id=eq.${geographyId}`
      },
      (payload) => {
        console.log('Change received!', payload)
        callback(payload)
      }
    )
    .subscribe()

  return subscription
}

// Subscribe to all changes for a vertical
export function subscribeToVertical(verticalId, callback) {
  const subscription = supabase
    .channel(`vertical:${verticalId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'targets',
        filter: `vertical_id=eq.${verticalId}`
      },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()

  return subscription
}

// Subscribe to materialized view refresh events
export function subscribeToViewRefresh(viewName, callback) {
  const subscription = supabase
    .channel('view-refresh')
    .on(
      'broadcast',
      { event: `refresh:${viewName}` },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()

  return subscription
}
```

### Unsubscribe

```javascript
// React component example
useEffect(() => {
  const subscription = subscribeToGeography('mysuru', (payload) => {
    // Refresh dashboard data
    refetchDashboard()
  })

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

## Frontend Integration

### Setup Supabase Client

```javascript
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})
```

### Data Service Layer

```javascript
// src/services/dataService.js
import { supabase } from '../lib/supabaseClient'

// Get all targets for a geography
export async function getGeographyDashboard(geographyId, year) {
  const { data, error } = await supabase
    .from('targets')
    .select(`
      *,
      vertical:verticals(*),
      geography:geographies(*),
      factor:factors(*)
    `)
    .eq('geography_id', geographyId)
    .eq('year', year)

  if (error) throw error

  // Group by vertical and factor
  const dashboard = {
    geography: data[0]?.geography,
    year: year,
    verticals: {}
  }

  data.forEach(target => {
    const verticalId = target.vertical_id
    if (!dashboard.verticals[verticalId]) {
      dashboard.verticals[verticalId] = {
        name: target.vertical?.name,
        revenue: null,
        factors: {}
      }
    }

    if (!target.factor_id) {
      dashboard.verticals[verticalId].revenue = target
    } else {
      dashboard.verticals[verticalId].factors[target.factor_id] = target
    }
  })

  return dashboard
}

// Get vertical distribution using materialized view
export async function getVerticalDistribution(verticalId, year) {
  const { data, error } = await supabase
    .from('vertical_distribution_view')
    .select('*')
    .eq('vertical_id', verticalId)
    .eq('year', year)
    .order('revenue', { ascending: false })

  if (error) throw error
  return data
}

// Get factor summary for a geography
export async function getFactorSummary(geographyId, factorId, year) {
  const { data, error } = await supabase
    .from('targets')
    .select(`
      *,
      vertical:verticals(name)
    `)
    .eq('geography_id', geographyId)
    .eq('factor_id', factorId)
    .eq('year', year)

  if (error) throw error

  const total = data.reduce((sum, t) => sum + parseFloat(t.value), 0)

  return {
    geography: geographyId,
    factor: factorId,
    year: year,
    total: total,
    breakdown_by_vertical: data.map(t => ({
      vertical: t.vertical?.name,
      value: parseFloat(t.value),
      percentage: (parseFloat(t.value) / total) * 100
    }))
  }
}

// Get all dimension tables
export async function getDimensions() {
  const [verticals, geographies, factors] = await Promise.all([
    supabase.from('verticals').select('*').order('name'),
    supabase.from('geographies').select('*').order('name'),
    supabase.from('factors').select('*').order('name')
  ])

  return {
    verticals: verticals.data,
    geographies: geographies.data,
    factors: factors.data
  }
}
```

### React Hooks

```javascript
// src/hooks/useGeographyDashboard.js
import { useState, useEffect } from 'react'
import { getGeographyDashboard, subscribeToGeography } from '../services/dataService'

export function useGeographyDashboard(geographyId, year) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const dashboard = await getGeographyDashboard(geographyId, year)
      setData(dashboard)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Subscribe to real-time updates
    const subscription = subscribeToGeography(geographyId, () => {
      fetchData()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [geographyId, year])

  return { data, loading, error, refetch: fetchData }
}
```

### Vanilla JavaScript Example

```javascript
// src/dashboard.js
import { supabase } from './lib/supabaseClient.js'

class DashboardManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.subscriptions = []
  }

  async init(geographyId, year) {
    this.geographyId = geographyId
    this.year = year

    await this.loadDashboard()
    this.setupRealtimeSubscription()
  }

  async loadDashboard() {
    const { data, error } = await supabase
      .from('geography_dashboard_view')
      .select('*')
      .eq('geography_id', this.geographyId)
      .eq('year', this.year)

    if (error) {
      console.error('Error loading dashboard:', error)
      return
    }

    this.renderDashboard(data)
  }

  renderDashboard(data) {
    this.container.innerHTML = `
      <h1>${data[0]?.geography_name} Dashboard ${this.year}</h1>
      <div class="vertical-cards">
        ${data.map(row => `
          <div class="vertical-card">
            <h3>${row.vertical_name}</h3>
            <p>Revenue: $${row.revenue}B</p>
            <p>Labour: ${row.labour_headcount?.toLocaleString()} employees</p>
            <p>Land: ${row.land_sqft?.toLocaleString()} sq ft</p>
            <p>Capital: Rs.${row.capital_crores} Cr</p>
          </div>
        `).join('')}
      </div>
    `
  }

  setupRealtimeSubscription() {
    const subscription = supabase
      .channel(`dashboard:${this.geographyId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'targets',
          filter: `geography_id=eq.${this.geographyId}`
        },
        () => {
          console.log('Data changed, refreshing dashboard...')
          this.loadDashboard()
        }
      )
      .subscribe()

    this.subscriptions.push(subscription)
  }

  destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}

// Usage
const dashboard = new DashboardManager('dashboard-container')
dashboard.init('mysuru', 2030)
```

---

# Auto-Apportionment System

## Overview

When an admin sets a high-level target (e.g., "GCC revenue: $50B by 2030"), the system **automatically distributes** it across:
- **Geographic dimension** (8 clusters)
- **Factor dimension** (Labour, Land, Capital, Organisation)

This apportionment uses **historical patterns** as intelligent defaults.

## How Defaults Are Determined

### Step 1: Admin Sets Target

```javascript
{
  vertical: "it-gcc",
  geography: "karnataka",  // State-level
  year: 2030,
  metric: "revenue",
  value: 50,
  unit: "billion_usd"
}
```

### Step 2: System Queries Historical Apportionment Rules

```sql
SELECT
  to_geography_id,
  percentage_allocation,
  basis,
  confidence_rating
FROM apportionment_rules
WHERE vertical_id = 'it-gcc'
  AND from_geography_id = 'karnataka'
  AND status = 'active'
ORDER BY priority DESC, confidence_rating DESC;
```

**Result:**
```
to_geography_id  | percentage | basis                         | confidence
-----------------+------------+-------------------------------+-----------
bengaluru        | 82%        | Historical avg 2020-2025      | 5
mysuru           | 4%         | Beyond Bengaluru target       | 3
mangaluru        | 6%         | Beyond Bengaluru target       | 3
hdb-corridor     | 5%         | Beyond Bengaluru target       | 3
kalaburagi       | 1%         | Emerging cluster              | 2
tumakuru         | 1%         | Emerging cluster              | 2
shivamogga       | 0.5%       | Development phase             | 2
rest-of-ka       | 0.5%       | Distributed                   | 2
```

### Step 3: Auto-Populate Apportionment

```javascript
{
  apportionments: [
    { geography: "bengaluru",    percentage: 82,   amount: 41.0,  method: "historical" },
    { geography: "mysuru",       percentage: 4,    amount: 2.0,   method: "historical" },
    { geography: "mangaluru",    percentage: 6,    amount: 3.0,   method: "historical" },
    { geography: "hdb-corridor", percentage: 5,    amount: 2.5,   method: "historical" },
    { geography: "kalaburagi",   percentage: 1,    amount: 0.5,   method: "historical" },
    { geography: "tumakuru",     percentage: 1,    amount: 0.5,   method: "historical" },
    { geography: "shivamogga",   percentage: 0.5,  amount: 0.25,  method: "historical" },
    { geography: "rest-of-ka",   percentage: 0.5,  amount: 0.25,  method: "historical" }
  ],
  total_percentage: 100,
  total_amount: 50.0,
  data_source: "apportionment_rules table (historical averages 2020-2025)"
}
```

## Historical Data Sources

### Option 1: Explicit Rules (Preferred)

Pre-populate `apportionment_rules` table with known historical patterns from:
- NASSCOM Karnataka IT Reports
- ICEA ESDM benchmarks
- Beyond Bengaluru program data
- Karnataka startup ecosystem reports

### Option 2: Calculate from Existing Targets

If explicit rules don't exist, calculate from historical target data:

```sql
SELECT * FROM generate_default_apportionment('it-gcc', 2030);
```

This calculates average distribution from past 5 years of data.

### Option 3: Fallback Defaults

For new verticals with no historical data, use tier-based defaults:

```sql
-- Query with fallback
SELECT *
FROM apportionment_rules
WHERE (vertical_id = 'new-vertical' OR vertical_id IS NULL)
  AND from_geography_id = 'karnataka'
ORDER BY
  CASE WHEN vertical_id IS NOT NULL THEN 1 ELSE 2 END,
  priority DESC,
  confidence_rating DESC
LIMIT 8;
```

## Conversion Ratios

### Revenue to Employment

| Vertical | Ratio | Unit | Basis | Confidence |
|----------|-------|------|-------|------------|
| IT Exports | 20 | employees/$1M | NASSCOM averages | 5 |
| IT Domestic | 25 | employees/$1M | NASSCOM Domestic | 4 |
| ESDM | 100 | employees/$1M | ICEA benchmarks | 4 |
| Startups | 15 | employees/$1M | Karnataka startup avg | 3 |

### Employment to Land

| Vertical | Ratio | Unit | Basis | Confidence |
|----------|-------|------|-------|------------|
| IT Exports | 100 | sqft/employee | Grade A office | 5 |
| ESDM | 33.33 | sqft/employee | Manufacturing + office | 3 |
| Startups | 80 | sqft/employee | Co-working mix | 3 |

### Land to Capital

| Vertical | Ratio | Unit | Basis | Confidence |
|----------|-------|------|-------|------------|
| IT Exports | 3,500 | INR/sqft | IT park construction | 4 |
| ESDM | 4,000 | INR/sqft | Factory + equipment | 3 |
| Startups | 2,500 | INR/sqft | Incubator rates | 3 |

## Geographic Multipliers

Different geographies have different cost structures:

| Geography | Land Multiplier | Capital Multiplier | Basis |
|-----------|-----------------|-------------------|-------|
| Bengaluru | 1.2 | 1.15 | Premium costs |
| Mysuru | 0.7 | 0.8 | 30% discount |
| Mangaluru | 0.75 | 0.85 | Coastal city |
| Kalaburagi | 0.5 | 0.6 | 50% discount |
| Shivamogga | 0.45 | 0.55 | Tier 3 city |

**Calculation Example:**

```javascript
const baseLandRatio = getConversionRatio('it-gcc', 'employment', 'land')  // 100 sqft/emp
const geographyMultiplier = getGeographyMultiplier('mysuru', 'land')      // 0.7
const adjustedRatio = baseLandRatio * geographyMultiplier                  // 70 sqft/emp

// For Mysuru GCC: 10,000 employees x 70 sqft/emp = 700,000 sqft
// (vs Bengaluru: 10,000 x 120 = 1,200,000 sqft)
```

## Prediction Models

### Statistical Model

For verticals with 5+ years of historical data:

```sql
CREATE OR REPLACE FUNCTION predict_growth_rate(
  p_vertical_id TEXT,
  p_geography_id TEXT
)
RETURNS NUMERIC AS $$
DECLARE
  avg_growth NUMERIC;
BEGIN
  SELECT AVG((t2.value - t1.value) / t1.value * 100)
  INTO avg_growth
  FROM targets t1
  JOIN targets t2 ON t1.vertical_id = t2.vertical_id
    AND t1.geography_id = t2.geography_id
    AND t2.year = t1.year + 1
  WHERE t1.vertical_id = p_vertical_id
    AND t1.geography_id = p_geography_id
    AND t1.factor_id IS NULL;

  RETURN COALESCE(avg_growth, 15); -- Default 15% if no data
END;
$$ LANGUAGE plpgsql;
```

### AI-Assisted Predictions

For capacity analysis and anomaly detection:

```javascript
// Edge function for AI predictions
async function getAIPredictions(target) {
  const prompt = `
    Analyze this KDEM target and suggest adjustments:
    - Vertical: ${target.vertical_id}
    - Geography: ${target.geography_id}
    - Target: ${target.value} ${target.unit}
    - Year: ${target.year}

    Consider:
    1. Current infrastructure capacity
    2. Talent availability in the region
    3. Historical growth patterns
    4. Peer city comparisons

    Return JSON with suggested percentage adjustment and reasoning.
  `

  const response = await callClaudeAPI(prompt)
  return JSON.parse(response)
}
```

## Admin Workflow

### Complete Flow Example

1. **Admin sets Karnataka GCC target: $50B by 2030**

2. **System auto-populates geographic distribution:**
   - Bengaluru: 82% = $41B
   - Beyond Bengaluru: 18% = $9B

3. **AI suggestions shown:**
   - Suggests: Bengaluru 78% (warning: capacity constraints)
   - Suggests: Mangaluru 8% (opportunity: data center advantage)

4. **Admin adjusts (accepts AI suggestion for Mangaluru):**
   - Bengaluru: 78% = $39B
   - Mangaluru: 8% = $4B

5. **Auto-calculate factors:**
   - Labour: $50B x 1000M x 20 emp/$M = 1,000,000 employees
   - Land: 1M x 100 sqft/emp = 100M sqft
   - Capital: 100M x Rs.3,500/sqft = Rs.35,000 Cr

6. **Validation warnings:**
   - Bengaluru labour (780K) exceeds skilling capacity? Warning
   - Mangaluru land (8M sqft) available by 2030? OK

7. **Preview:** 56 targets to create

8. **Commit to database**

---

# Query Patterns

## Multi-Dimensional Queries

### Get All Targets for a Geography

```javascript
function getGeographyDashboard(geography_id, year) {
  const targets = queryTargets({
    geography_id: geography_id,
    year: year
  })

  // Group by vertical and factor
  const dashboard = {
    geography: getGeography(geography_id),
    year: year,
    verticals: {}
  }

  targets.forEach(target => {
    if (!dashboard.verticals[target.vertical_id]) {
      dashboard.verticals[target.vertical_id] = {
        name: getVertical(target.vertical_id).name,
        revenue: null,
        factors: {}
      }
    }

    if (!target.factor_id) {
      dashboard.verticals[target.vertical_id].revenue = target
    } else {
      dashboard.verticals[target.vertical_id].factors[target.factor_id] = target
    }
  })

  return dashboard
}
```

**SQL Equivalent:**

```sql
SELECT
  t.*,
  v.name as vertical_name,
  f.name as factor_name
FROM targets t
LEFT JOIN verticals v ON t.vertical_id = v.id
LEFT JOIN factors f ON t.factor_id = f.id
WHERE t.geography_id = 'mysuru'
  AND t.year = 2030
ORDER BY v.name, f.name;
```

### Get Vertical Distribution Across Geographies

```javascript
function getVerticalDistribution(vertical_id, year) {
  const targets = queryTargets({
    vertical_id: vertical_id,
    year: year,
    factor_id: null // Revenue only
  })

  const total = targets.reduce((sum, t) => sum + t.value, 0)

  return targets.map(target => ({
    geography: getGeography(target.geography_id),
    revenue: target.value,
    percentage_of_total: (target.value / total) * 100
  }))
}
```

**SQL Equivalent:**

```sql
SELECT
  g.id as geography_id,
  g.name as geography_name,
  t.value as revenue,
  (t.value / SUM(t.value) OVER ()) * 100 as percentage
FROM targets t
JOIN geographies g ON t.geography_id = g.id
WHERE t.vertical_id = 'esdm'
  AND t.year = 2030
  AND t.factor_id IS NULL
ORDER BY t.value DESC;
```

### Get Factor Summary for a Geography

```sql
SELECT
  f.name as factor_name,
  v.name as vertical_name,
  t.value,
  t.unit,
  (t.value / SUM(t.value) OVER (PARTITION BY t.factor_id)) * 100 as percentage
FROM targets t
JOIN factors f ON t.factor_id = f.id
JOIN verticals v ON t.vertical_id = v.id
WHERE t.geography_id = 'mysuru'
  AND t.year = 2030
ORDER BY f.name, t.value DESC;
```

## Aggregations

### Total Labour by Geography

```sql
SELECT
  g.name as geography,
  SUM(t.value) as total_labour
FROM targets t
JOIN geographies g ON t.geography_id = g.id
WHERE t.factor_id = 'labour'
  AND t.year = 2030
  AND t.metric = 'headcount'
GROUP BY g.id, g.name
ORDER BY total_labour DESC;
```

### Total Revenue by Vertical

```sql
SELECT
  v.name as vertical,
  SUM(t.value) as total_revenue,
  COUNT(DISTINCT t.geography_id) as num_geographies
FROM targets t
JOIN verticals v ON t.vertical_id = v.id
WHERE t.factor_id IS NULL
  AND t.metric = 'revenue'
  AND t.year = 2030
GROUP BY v.id, v.name
ORDER BY total_revenue DESC;
```

### Year-over-Year Comparison

```sql
SELECT
  t1.vertical_id,
  t1.geography_id,
  t1.value as value_2030,
  t2.value as value_2025,
  ((t1.value - t2.value) / t2.value * 100) as growth_percentage
FROM targets t1
JOIN targets t2 ON t1.vertical_id = t2.vertical_id
  AND t1.geography_id = t2.geography_id
  AND t1.factor_id = t2.factor_id
  AND t1.metric = t2.metric
WHERE t1.year = 2030
  AND t2.year = 2025
  AND t1.factor_id IS NULL
ORDER BY growth_percentage DESC;
```

## Cascade Updates

### Update Revenue and Recalculate Factors

```javascript
async function updateRevenueWithCascade(targetId, newValue) {
  // 1. Update revenue target
  const { data: updated, error } = await supabase
    .from('targets')
    .update({ value: newValue, updated_at: new Date() })
    .eq('id', targetId)
    .select()
    .single()

  if (error) throw error

  // 2. Cascade to dependent targets
  const { data: cascaded } = await supabase.rpc('cascade_factor_targets', {
    revenue_target_id: targetId
  })

  // 3. Refresh materialized views
  await supabase.rpc('refresh_geography_dashboard_view')
  await supabase.rpc('refresh_vertical_distribution_view')

  return { updated, cascaded }
}
```

### Recalculate Dependencies

```sql
-- Find all targets that depend on a given target
CREATE OR REPLACE FUNCTION recalculate_dependencies(target_id TEXT)
RETURNS VOID AS $$
DECLARE
  dep_target RECORD;
  new_value NUMERIC;
BEGIN
  FOR dep_target IN
    SELECT * FROM targets WHERE target_id = ANY(dependencies)
  LOOP
    -- Recalculate based on formula
    CASE dep_target.formula
      WHEN 'revenue_target * employment_intensity_ratio' THEN
        SELECT value * (dep_target.calculation_params->>'employment_intensity_ratio')::numeric
        INTO new_value
        FROM targets WHERE id = dep_target.calculation_params->>'revenue_target_id';

      WHEN 'headcount * sqft_per_employee' THEN
        SELECT value * (dep_target.calculation_params->>'sqft_per_employee')::numeric
        INTO new_value
        FROM targets WHERE id = dep_target.calculation_params->>'headcount_target_id';

      -- Add more formula handlers as needed
    END CASE;

    UPDATE targets SET value = new_value, updated_at = NOW() WHERE id = dep_target.id;

    -- Recursively update dependents
    PERFORM recalculate_dependencies(dep_target.id);
  END LOOP;
END;
$$ LANGUAGE plpgsql;
```

---

# API Reference

## Supabase Auto-Generated API

Supabase automatically generates REST and GraphQL APIs from your schema.

### REST API Examples

#### Get All Verticals

```bash
curl 'https://xxxxx.supabase.co/rest/v1/verticals' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

#### Get Targets with Filters

```bash
# Get ESDM targets for Mysuru in 2030
curl 'https://xxxxx.supabase.co/rest/v1/targets?vertical_id=eq.esdm&geography_id=eq.mysuru&year=eq.2030' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

#### Get Targets with Related Data

```bash
# Get targets with vertical and geography details
curl 'https://xxxxx.supabase.co/rest/v1/targets?select=*,vertical:verticals(*),geography:geographies(*)' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

#### Insert New Target

```bash
curl -X POST 'https://xxxxx.supabase.co/rest/v1/targets' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "vertical_id": "esdm",
    "geography_id": "mysuru",
    "factor_id": null,
    "year": 2030,
    "metric": "revenue",
    "value": 1.5,
    "unit": "billion_usd",
    "data_source": "Admin input",
    "confidence_rating": 4
  }'
```

## Custom Functions (RPC)

### Cascade Factor Targets

```javascript
const { data, error } = await supabase.rpc('cascade_factor_targets', {
  revenue_target_id: 't010'
})

// Returns: { revenue: 't010', labour: 't011', land: 't012', capital: 't013' }
```

### Validate Geographic Sum

```javascript
const { data: isValid, error } = await supabase.rpc('validate_geographic_sum', {
  p_vertical_id: 'esdm',
  p_factor_id: 'labour',
  p_year: 2030
})

// Returns: true/false
```

### Generate Default Apportionment

```javascript
const { data: defaults, error } = await supabase.rpc('generate_default_apportionment', {
  p_vertical_id: 'it-gcc',
  p_year: 2030
})

// Returns array of { geography_id, percentage, basis, confidence }
```

## Update Patterns

### Set Revenue Target with Cascade

```javascript
export async function setRevenueTarget(verticalId, geographyId, year, revenueUsdBn) {
  // 1. Insert revenue target
  const { data: revenueTarget, error: revError } = await supabase
    .from('targets')
    .insert({
      vertical_id: verticalId,
      geography_id: geographyId,
      factor_id: null,
      year: year,
      metric: 'revenue',
      value: revenueUsdBn,
      unit: 'billion_usd',
      data_source: 'User input',
      confidence_rating: 4
    })
    .select()
    .single()

  if (revError) throw revError

  // 2. Call database function to cascade factor targets
  const { data: cascaded, error: cascadeError } = await supabase.rpc('cascade_factor_targets', {
    revenue_target_id: revenueTarget.id
  })

  if (cascadeError) throw cascadeError

  return cascaded
}
```

### Apportion State Target to Geographies

```javascript
export async function apportionStateTarget(verticalId, factorId, year, stateTotal) {
  // 1. Get apportionment rules
  const { data: rules, error: rulesError } = await supabase.rpc('generate_default_apportionment', {
    p_vertical_id: verticalId,
    p_year: year
  })

  if (rulesError) throw rulesError

  // 2. Create targets for each geography
  const targets = rules.map(rule => ({
    vertical_id: verticalId,
    geography_id: rule.geography_id,
    factor_id: factorId,
    year: year,
    metric: stateTotal.metric,
    value: stateTotal.value * (rule.percentage / 100),
    unit: stateTotal.unit,
    data_source: `Apportioned from Karnataka total (${rule.percentage}%)`,
    confidence_rating: Math.max(1, rule.confidence - 1)
  }))

  // 3. Upsert targets
  const { data, error } = await supabase
    .from('targets')
    .upsert(targets, { onConflict: 'vertical_id,geography_id,factor_id,year,metric' })
    .select()

  if (error) throw error

  return data
}
```

### Bulk Update with Validation

```javascript
export async function bulkUpdateTargets(updates) {
  // 1. Validate all updates
  for (const update of updates) {
    const { data: isValid } = await supabase.rpc('validate_parent_child', {
      p_target_id: update.id,
      p_new_value: update.value
    })

    if (!isValid) {
      throw new Error(`Invalid update for target ${update.id}: exceeds parent value`)
    }
  }

  // 2. Perform updates in transaction
  const results = []
  for (const update of updates) {
    const { data, error } = await supabase
      .from('targets')
      .update({ value: update.value, updated_at: new Date() })
      .eq('id', update.id)
      .select()
      .single()

    if (error) throw error
    results.push(data)
  }

  // 3. Refresh views
  await supabase.rpc('refresh_all_views')

  return results
}
```

---

# Validation Rules

## Rule 1: Parent-Child Consistency

Child target values must not exceed parent target values.

```javascript
function validateGeographyHierarchy(target) {
  const geography = getGeography(target.geography_id)
  if (geography.parent_id) {
    const parentTarget = getTarget({
      vertical_id: target.vertical_id,
      geography_id: geography.parent_id,
      factor_id: target.factor_id,
      year: target.year
    })
    if (target.value > parentTarget.value) {
      throw new Error(`Child target (${target.value}) exceeds parent target (${parentTarget.value})`)
    }
  }
}
```

## Rule 2: Factor Dependency Consistency

Labour targets must be consistent with revenue targets (within tolerance).

```javascript
function validateLabourRevenueRatio(labourTarget) {
  const revenueTarget = getTarget({
    vertical_id: labourTarget.vertical_id,
    geography_id: labourTarget.geography_id,
    factor_id: null,
    year: labourTarget.year
  })

  const conversionRatio = getConversionRatio(labourTarget.vertical_id, 'revenue_to_employment')
  const expectedLabour = revenueTarget.value * 1000 * conversionRatio.ratio
  const tolerance = 0.1 // 10% tolerance

  if (Math.abs(labourTarget.value - expectedLabour) / expectedLabour > tolerance) {
    console.warn(`Labour target (${labourTarget.value}) deviates >10% from expected (${expectedLabour})`)
  }
}
```

## Rule 3: Aggregation Consistency

Sum of geography targets must equal Karnataka total.

```javascript
function validateGeographicSum(vertical_id, factor_id, year) {
  const geographies = ['bengaluru', 'mysuru', 'mangaluru', 'hdb-corridor', 'kalaburagi', 'tumakuru', 'shivamogga', 'rest-of-karnataka']

  const sum = geographies.reduce((total, geo_id) => {
    const target = getTarget({ vertical_id, geography_id: geo_id, factor_id, year })
    return total + (target?.value || 0)
  }, 0)

  const karnatakaTotal = getTarget({ vertical_id, geography_id: 'karnataka', factor_id, year })

  if (karnatakaTotal && Math.abs(sum - karnatakaTotal.value) / karnatakaTotal.value > 0.01) {
    throw new Error(`Geographic sum (${sum}) != Karnataka total (${karnatakaTotal.value})`)
  }
}
```

## Rule 4: Time Series Consistency

Targets should generally show monotonic growth (warn if declining).

```javascript
function validateTimeSeries(target) {
  const previousYears = [2025, 2026, 2027, 2028, 2029].filter(y => y < target.year)

  previousYears.forEach(year => {
    const previousTarget = getTarget({
      vertical_id: target.vertical_id,
      geography_id: target.geography_id,
      factor_id: target.factor_id,
      year: year
    })

    if (previousTarget && target.value < previousTarget.value) {
      console.warn(`Target for ${target.year} (${target.value}) < target for ${year} (${previousTarget.value})`)
    }
  })
}
```

## Rule 5: Confidence Rating Decay

Derived targets should have lower confidence than source targets.

```javascript
function validateConfidenceDecay(target) {
  if (target.dependencies && target.dependencies.length > 0) {
    const sourcedConfidences = target.dependencies.map(depId => {
      const dep = getTarget({ id: depId })
      return dep.confidence_rating
    })

    const maxSourceConfidence = Math.max(...sourcedConfidences)

    if (target.confidence_rating >= maxSourceConfidence) {
      console.warn(`Derived target confidence (${target.confidence_rating}) should be lower than source (${maxSourceConfidence})`)
    }
  }
}
```

---

# Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for frontend hosting)

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up
2. Create new project: `kdem-dashboard`
3. Note down:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon (public) key
   - Service role key (for migrations)

## Step 2: Run Database Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref xxxxx

# Run all migrations
supabase db push

# Or use SQL Editor in Supabase Dashboard
```

## Step 3: Seed Initial Data

```bash
# Run seed migrations
supabase db execute --file ./migrations/seed_dimensions.sql
supabase db execute --file ./migrations/seed_conversion_ratios.sql
supabase db execute --file ./migrations/seed_apportionment_rules.sql
```

## Step 4: Configure Frontend Environment

```bash
# .env.local
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 5: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel deploy --prod

# Set environment variables in Vercel dashboard
```

## Cost Estimate

### Supabase Pricing
- **Free Tier**: 500 MB database, 2 GB bandwidth/month, 50,000 MAU
  - Sufficient for initial KDEM dashboard
- **Pro Tier ($25/month)**: 8 GB database, 250 GB bandwidth, unlimited users
  - Recommended for production

### Vercel Pricing
- **Hobby (Free)**: 100 GB bandwidth/month
  - Sufficient for static frontend
- **Pro ($20/month)**: 1 TB bandwidth

**Total: $0 (Free tier) or $25-45/month (Pro tier)**

---

# Data Migration

## Migration Script

```javascript
// scripts/migrate-json-to-supabase.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function migrateData() {
  console.log('Starting migration...')

  // 1. Migrate verticals
  const verticals = JSON.parse(fs.readFileSync('./data/verticals.json', 'utf8'))
  const { error: vError } = await supabase.from('verticals').insert(verticals.verticals)
  if (vError) throw vError
  console.log('Verticals migrated')

  // 2. Migrate geographies
  const geographies = JSON.parse(fs.readFileSync('./data/geographies.json', 'utf8'))
  const { error: gError } = await supabase.from('geographies').insert(geographies.geographies)
  if (gError) throw gError
  console.log('Geographies migrated')

  // 3. Migrate factors
  const factors = JSON.parse(fs.readFileSync('./data/factors.json', 'utf8'))
  const { error: fError } = await supabase.from('factors').insert(factors.factors)
  if (fError) throw fError
  console.log('Factors migrated')

  // 4. Migrate targets
  const targets = JSON.parse(fs.readFileSync('./data/targets.json', 'utf8'))
  const { error: tError } = await supabase.from('targets').insert(targets.targets)
  if (tError) throw tError
  console.log('Targets migrated')

  // 5. Refresh materialized views
  await supabase.rpc('refresh_all_views')
  console.log('Views refreshed')

  console.log('Migration complete!')
}

migrateData().catch(console.error)
```

## Run Migration

```bash
# Set environment variables
export SUPABASE_URL=https://xxxxx.supabase.co
export SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Run migration
node scripts/migrate-json-to-supabase.js
```

---

## Complete Data Flow Example

Here is a complete example of data flow for setting a "Mysuru ESDM Target":

```
USER INPUT:
+-- Set revenue target: Mysuru ESDM = $1.5B by 2030 (from PDF Slide 16)

SYSTEM AUTO-GENERATES:
+-- Labour target: 15,000 employees
|   +-- Based on: ESDM employment intensity = 100 employees/$1M
|   +-- Skill breakdown:
|       +-- PCB Design: 3,000 (20%)
|       +-- Assembly Technicians: 8,000 (53%)
|       +-- Quality Control: 2,000 (13%)
|       +-- Management: 2,000 (13%)
|
+-- Land target: 500,000 sq ft
|   +-- Based on: 15,000 employees x 33.33 sqft/employee
|   +-- Breakdown:
|       +-- Manufacturing floor: 350,000 sqft
|       +-- Warehousing: 80,000 sqft
|       +-- Office: 50,000 sqft
|       +-- Utilities: 20,000 sqft
|
+-- Capital target: Rs.500 Cr
|   +-- Based on: 500,000 sqft x Rs.4,000/sqft + equipment
|   +-- Breakdown:
|       +-- Infrastructure capex: Rs.300 Cr
|       +-- Machinery & equipment: Rs.150 Cr
|       +-- Working capital: Rs.50 Cr
|
+-- Organisation target: Clearances in 30 days (down from 90)
    +-- Enablers:
        +-- Single-window clearance
        +-- Pre-approved ESDM layouts
        +-- Dedicated ESDM cell

CROSS-REFERENCES:
+-- Links to Mysuru PCB Park infrastructure project
+-- Links to Nipuna Karnataka skilling program
+-- Links to ESDM funding schemes
+-- Rolls up to Karnataka ESDM total: $105B

VALIDATION:
[OK] Mysuru ESDM ($1.5B) + Other geographies = Karnataka ESDM ($105B)
[OK] Labour target (15K) within +/-10% of formula-based calculation
[OK] Land requirement (500K sqft) matches PCB Park capacity
[OK] Skilling breakdown sums to 100%
```

---

## Benefits Summary

### Before (JSON Files)
- Manual sync required across files
- No automatic cascade updates
- No validation enforcement
- Complex queries require custom code
- No real-time updates
- Difficult to manage relationships

### After (Supabase + 3D Model)
- Single source of truth (PostgreSQL)
- Automatic cascade via database functions
- Built-in validation via constraints & triggers
- Simple queries via auto-generated API
- Real-time updates via WebSockets
- Foreign keys enforce relationships
- Materialized views for performance
- Row-level security for access control
- Audit trail (created_at, updated_at, created_by)
- Backup & restore built-in
- Scalable (PostgreSQL can handle millions of rows)

---

## Implementation Checklist

### Database Setup
- [ ] Create Supabase project
- [ ] Create dimension tables (verticals, geographies, factors)
- [ ] Create targets fact table with foreign keys
- [ ] Create conversion ratios reference table
- [ ] Create apportionment rules reference table
- [ ] Create skill requirements reference table
- [ ] Create geography multipliers table

### Functions & Triggers
- [ ] Implement update timestamp triggers
- [ ] Implement parent-child validation trigger
- [ ] Implement cascade_factor_targets function
- [ ] Implement validate_geographic_sum function
- [ ] Implement generate_default_apportionment function

### Views
- [ ] Create geography_dashboard_view
- [ ] Create vertical_distribution_view
- [ ] Create factor_summary_view
- [ ] Setup view refresh schedule

### Security
- [ ] Enable RLS on all tables
- [ ] Create public read policies
- [ ] Create authenticated write policies
- [ ] Create admin-only delete policies

### Frontend
- [ ] Install Supabase client
- [ ] Create data service layer
- [ ] Implement real-time subscriptions
- [ ] Build dashboard components
- [ ] Implement admin interface

### Data Migration
- [ ] Export existing JSON data
- [ ] Write migration scripts
- [ ] Run migrations
- [ ] Validate migrated data

### Testing
- [ ] Write validation rule tests
- [ ] Write cascade update tests
- [ ] Test real-time subscriptions
- [ ] Load testing

### Deployment
- [ ] Configure environment variables
- [ ] Deploy to Vercel
- [ ] Setup monitoring
- [ ] Document procedures

---

**This technical guide provides a complete reference for developers implementing the KDEM dashboard with Supabase and the 3D relational data model.**
