# KDEM Data Management Guide

> **For:** Data Managers, Policy Analysts, KDEM Staff
> **Purpose:** How to view and update dashboard data via Supabase

---

## Overview

The KDEM dashboard is powered by a Supabase (PostgreSQL) database with a **3D relational data model**:

```
Verticals (5 pillars) × Geographies (13 locations) × Factors (4 production factors) = Targets
```

All dashboard data comes from the `targets` table, which is the **single source of truth**.

---

## Quick Access

**Supabase Dashboard:** https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv

**Tables You'll Use:**
- `targets` - All metrics and targets (revenue, employment, land, capital)
- `verticals` - The 5 pillars + sub-sectors (25 records)
- `geographies` - Karnataka + clusters (13 records)
- `factors` - Land, Labour, Capital, Organisation (4 records)

---

## Understanding the Data Model

### 1. Dimension Tables (Read-Only)

These define the "coordinates" for your data:

#### Verticals (25 records)
```
Core Pillars (5):
- it-exports
- it-domestic
- esdm
- startups
- digitizing-sectors

Sub-sectors (20): esdm-pcb, esdm-semiconductor, digitizing-healthcare, etc.
```

#### Geographies (13 records)
```
State Level:
- karnataka

Cities/Clusters (12):
- bengaluru
- mysuru, mangaluru, hdb-corridor (Tier 1)
- kalaburagi, tumakuru (Tier 2)
- shivamogga (Tier 3)
- + 5 more special projects
```

#### Factors (4 records)
```
- land (physical infrastructure)
- labour (human capital / skilling)
- capital (funding / investment)
- organisation (ease of business)
```

### 2. Targets Table (Your Work Area)

This is where all the magic happens. Every metric in the dashboard comes from here.

**Key Columns:**
- `id` - Unique identifier (auto-generated)
- `vertical_id` - Which pillar? (e.g., "esdm")
- `geography_id` - Which location? (e.g., "mysuru")
- `factor_id` - Which factor? (NULL = revenue target)
- `year` - Which year? (2021-2030)
- `metric` - What are we measuring? (revenue, employment, land, capital)
- `value` - The actual number
- `unit` - Unit of measurement (billion_usd, employees, sqft, crores_inr)
- `data_source` - Where did this come from?
- `confidence_rating` - How confident are we? (1-5 stars)

---

## Common Tasks

### View All Targets for a Year

1. Go to **Table Editor** in Supabase
2. Select `targets` table
3. Add filter: `year` equals `2030`
4. Click **Apply**

**SQL Alternative:**
```sql
SELECT * FROM targets WHERE year = 2030 ORDER BY vertical_id, geography_id;
```

### View Targets for a Specific Vertical

**Example:** See all ESDM targets for 2030

1. Table Editor → `targets`
2. Add filters:
   - `vertical_id` equals `esdm`
   - `year` equals `2030`

**SQL:**
```sql
SELECT 
  t.vertical_id,
  t.geography_id,
  t.factor_id,
  t.metric,
  t.value,
  t.unit
FROM targets t
WHERE t.vertical_id = 'esdm' AND t.year = 2030
ORDER BY t.geography_id;
```

### Add a New Target

**Example:** Add ESDM revenue target for Mysuru 2030

1. Table Editor → `targets`
2. Click **Insert row** button
3. Fill in values:
   ```
   vertical_id: esdm
   geography_id: mysuru
   factor_id: NULL (revenue targets have no factor)
   year: 2030
   metric: revenue
   value: 1.5
   unit: billion_usd
   data_source: KDEM Strategic Plan 2026
   confidence_rating: 4
   ```
4. Click **Save**

**SQL Alternative:**
```sql
INSERT INTO targets (
  vertical_id, geography_id, factor_id, year, metric, value, unit, data_source, confidence_rating
) VALUES (
  'esdm', 'mysuru', NULL, 2030, 'revenue', 1.5, 'billion_usd', 'KDEM Strategic Plan 2026', 4
);
```

### Update an Existing Target

**Example:** Update Mysuru ESDM revenue from $1.5B to $2.0B

1. Table Editor → `targets`
2. Find the row (use filters)
3. Click on the `value` cell
4. Change `1.5` to `2.0`
5. Press Enter to save

**SQL:**
```sql
UPDATE targets 
SET value = 2.0, 
    updated_at = NOW()
WHERE vertical_id = 'esdm' 
  AND geography_id = 'mysuru' 
  AND year = 2030 
  AND metric = 'revenue';
```

### Delete a Target

**⚠️ Warning:** This permanently removes data from the dashboard!

1. Table Editor → `targets`
2. Find the row
3. Click the checkbox on the left
4. Click **Delete** button
5. Confirm deletion

**SQL:**
```sql
DELETE FROM targets 
WHERE id = 'target-id-here';
```

---

## Auto-Cascade System

The database has built-in intelligence that automatically calculates related targets!

### How It Works

When you set a **revenue target**, the system can automatically calculate:
- **Labour** (employment) target
- **Land** requirement
- **Capital** (funding) requirement

This uses **conversion ratios** defined in the database:

| Vertical | Revenue → Employment | Employment → Land | Land → Capital |
|----------|---------------------|------------------|----------------|
| ESDM | 100 employees per $1M | 33.33 sqft/employee | ₹4,000/sqft |
| IT Exports | 20 employees per $1M | 100 sqft/employee | ₹3,500/sqft |
| Startups | 15 employees per $1M | 80 sqft/employee | ₹3,000/sqft |

### Using the Cascade Function

**SQL Function:**
```sql
SELECT cascade_factor_targets('revenue-target-id-here');
```

**What Happens:**
1. Reads your revenue target
2. Calculates employment using conversion ratio
3. Calculates land requirement from employment
4. Calculates capital requirement from land
5. Creates all 3 related targets automatically
6. Links them together via `parent_target_id`

**Example:**
```sql
-- 1. Add revenue target
INSERT INTO targets (vertical_id, geography_id, year, metric, value, unit, data_source)
VALUES ('esdm', 'mysuru', 2030, 'revenue', 1.5, 'billion_usd', 'KDEM Plan')
RETURNING id;  -- Returns: 't-esdm-mysuru-2030-revenue'

-- 2. Run cascade
SELECT cascade_factor_targets('t-esdm-mysuru-2030-revenue');

-- Result: Creates 3 new targets automatically:
-- - Labour: 15,000 employees (1.5B × $1M × 100)
-- - Land: 500,000 sqft (15,000 × 33.33)
-- - Capital: ₹500 Cr (500K sqft × ₹4,000/sqft ÷ 10M)
```

---

## Data Validation

### Geographic Sum Validation

The system enforces that **cluster targets sum to Karnataka total**.

**Check Function:**
```sql
SELECT validate_geographic_sum('esdm', 'labour', 2030);
```

**Returns:**
- `TRUE` if sums match (within 1% tolerance)
- `FALSE` with warning if mismatch detected

**Example Warning:**
```
WARNING: Geographic sum (14.8B) != Karnataka total (15.0B) for vertical=esdm, year=2030
```

### Constraint Checks

Some geographies have **capacity limits**:

```sql
-- View constraints
SELECT * FROM apportionment_constraints;

-- Example constraints:
-- Mysuru ESDM: Max $2.0B by 2030 (PCB Park + Global Tech Centre capacity)
-- Mangaluru IT: Max 5M sqft by 2030 (Tech Park Phase 1+2)
```

---

## Best Practices

### 1. Always Include Data Source

Every target should have a `data_source`:

**Good:**
```
data_source: "KDEM Strategic Plan 2026, Page 15"
data_source: "NASSCOM GCC Report 2025"
data_source: "Mysuru Vision 2030 Document"
```

**Bad:**
```
data_source: NULL
data_source: "estimate"
```

### 2. Use Confidence Ratings

| Rating | When to Use |
|--------|------------|
| ⭐⭐⭐⭐⭐ | Official government data, verified third-party |
| ⭐⭐⭐⭐ | Cross-validated from 2+ sources |
| ⭐⭐⭐ | Single reputable source (NASSCOM, Zinnov) |
| ⭐⭐ | Self-reported company data |
| ⭐ | KDEM estimate/projection |

### 3. Keep Units Consistent

| Metric | Standard Unit |
|--------|--------------|
| Revenue | billion_usd |
| Employment | employees |
| Land | square_feet (convert acres: 1 acre = 43,560 sqft) |
| Capital | crores_inr (convert: 1 USD = ₹83, 1 Cr = 10M) |

### 4. Update Timestamps

The database automatically updates `updated_at`, but you can also note changes:

```sql
UPDATE targets 
SET 
  value = 2.0,
  data_source = 'Updated per KDEM Board Meeting Feb 2026',
  notes = 'Revised upward based on new PCB Park commitments'
WHERE id = 'target-id';
```

### 5. Test Before Publishing

**Staging Workflow:**
1. Make changes in Supabase
2. Refresh dashboard (Cmd/Ctrl + R)
3. Verify numbers look correct
4. Check all affected tabs
5. If incorrect, revert via SQL

**Revert Example:**
```sql
-- View recent changes
SELECT * FROM targets 
WHERE updated_at > NOW() - INTERVAL '1 hour'
ORDER BY updated_at DESC;

-- Restore old value
UPDATE targets 
SET value = 1.5  -- old value
WHERE id = 'target-id';
```

---

## Troubleshooting

### Dashboard Not Showing My Changes

**Cause:** Browser cache

**Solution:**
1. Hard refresh: Cmd/Ctrl + Shift + R
2. Clear cache: Browser Settings → Clear Data
3. Check Supabase: Verify your change is actually saved

### Numbers Don't Add Up

**Cause:** Geographic sums don't match Karnataka total

**Solution:**
```sql
-- Check which targets are missing
SELECT 
  g.name,
  SUM(t.value) as total
FROM targets t
JOIN geographies g ON t.geography_id = g.id
WHERE t.vertical_id = 'esdm' 
  AND t.year = 2030 
  AND t.metric = 'revenue'
GROUP BY g.name;

-- Add missing cluster targets or adjust Karnataka total
```

### Cascade Function Not Working

**Cause:** Missing conversion ratios or invalid revenue target

**Solution:**
```sql
-- Check if conversion ratios exist
SELECT * FROM conversion_ratios 
WHERE vertical_id = 'your-vertical';

-- Verify revenue target exists and is valid
SELECT * FROM targets WHERE id = 'revenue-target-id';
```

---

## Quick Reference

### Key SQL Queries

**Total Revenue by Vertical (2030):**
```sql
SELECT 
  v.name,
  SUM(t.value) as total_revenue_usd_bn
FROM targets t
JOIN verticals v ON t.vertical_id = v.id
WHERE t.year = 2030 AND t.metric = 'revenue'
GROUP BY v.name
ORDER BY total_revenue_usd_bn DESC;
```

**Geographic Distribution for a Vertical:**
```sql
SELECT 
  g.name,
  t.metric,
  t.value,
  t.unit
FROM targets t
JOIN geographies g ON t.geography_id = g.id
WHERE t.vertical_id = 'esdm' 
  AND t.year = 2030
ORDER BY t.metric, t.value DESC;
```

**All Factors for a Location:**
```sql
SELECT 
  f.name as factor,
  t.metric,
  t.value,
  t.unit
FROM targets t
LEFT JOIN factors f ON t.factor_id = f.id
WHERE t.geography_id = 'mysuru' 
  AND t.year = 2030
ORDER BY f.name;
```

---

## Getting Help

**For Database Issues:**
- Check Supabase Logs: https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv/logs
- Review error messages carefully
- Contact technical team with specific error

**For Data Questions:**
- Review [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md) for schema details
- Check [SOURCES.md](../SOURCES.md) for data provenance
- Consult KDEM strategic planning documents

**Emergency Contact:**
- Technical Lead: [Contact info]
- Data Team: [Contact info]

---

**Last Updated:** February 6, 2026
**Version:** 3.0
