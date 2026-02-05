# KDEM Website Restructure - Implementation Guide

**Version:** 1.0
**Last Updated:** 2025-02-05
**Status:** Definitive Reference Document

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current vs Proposed Structure](#current-vs-proposed-structure)
3. [Implementation Plan](#implementation-plan)
4. [Getting Started](#getting-started)
5. [Success Criteria](#success-criteria)
6. [FAQ & Next Steps](#faq--next-steps)
7. [Appendices](#appendices)

---

## Executive Summary

### What We're Building

This guide details the comprehensive restructure of the KDEM (Karnataka Digital Economy Mission) website from a 6-tab program-focused dashboard to a 9-tab framework-aligned platform that reflects Karnataka's official 5-pillar Digital Economy strategy.

**The Goal:** Create a single source of truth dashboard that accurately represents Karnataka's digital economy across all verticals, geographies, and factors of production, with a robust data architecture that prevents sync issues and enables powerful multi-dimensional analysis.

### Key Findings

#### The 5-Pillar Framework Gap

The PDF defines an official **5-pillar Digital Economy framework** that is not currently reflected in the website:

| Pillar | 2022-23 | 2029-30 | Share of India |
|--------|---------|---------|----------------|
| IT Exports | $76B | $229B | 38% |
| IT Domestic | $17B | $56B | 30% |
| ESDM | $24B | $105B | 20% |
| Startups | $5B | $27B | 40% |
| Digitizing Sectors | $9B | $62B | 15% CAGR |
| **TOTAL Karnataka** | **$130B** | **$400B** | - |

**Current Website Issues:**
- 6 tabs focused on programs and geography
- No clear 5-pillar structure
- Missing 17 "Newly Digitizing Sectors"
- No India GDP/Digital Economy context
- No sector-specific revenue/employment breakdowns

#### Critical Data Gaps

| Data Category | PDF Has | Website Has |
|---------------|---------|-------------|
| 5-Pillar Framework | Yes | No |
| IT Exports breakdown | Yes ($76B to $229B) | No |
| IT Domestic breakdown | Yes ($17B to $56B) | No |
| ESDM sector details | Yes ($24B to $105B) | No |
| 17 Digitizing Sectors | Yes ($9B to $62B) | No |
| India context (GDP) | Yes ($3.1T to $8.4T) | No |
| India Digital Economy | Yes ($500B to $2T) | No |
| Karnataka share of India | Yes (38% IT, 30% Domestic, 20% ESDM, 40% Startups) | No |
| Employment projections | Yes (All sectors) | Partial |
| Bengaluru vs BB split | Yes ($125.84B vs $4.23B) | Implied only |
| Growth assumptions | Yes (By sector) | No |

### The 3D Data Problem and Solution

#### The Problem

**Example:** Skilling targets (Labour) apply to:
- Specific **Verticals** (ESDM needs different skills than IT Services)
- Specific **Geographies** (Mysuru cybersecurity vs Mangaluru fintech)
- Must cascade from **Revenue targets** (if ESDM revenue increases, labour/land/capital auto-update)

**Without proper architecture:**
- Data goes out of sync (revenue changes, but labour target is stale)
- Manual updates required across multiple files
- No validation (geographic sums don't match Karnataka total)
- Duplication and inconsistency

#### The Solution: 3D Relational Model on Supabase

```
                        VITE FRONTEND
  - UI Components (9 tabs)
  - Supabase Client (auto-generated API)
  - Real-time subscriptions (WebSocket)
                            |
                            | HTTPS REST API
                            v
                      SUPABASE BACKEND

  PostgreSQL Database:
  +-- Dimension Tables (verticals, geographies, factors)
  +-- Fact Table (targets) - Single Source of Truth
  +-- Conversion Ratios (revenue -> labour -> land)
  +-- Skill Requirements (labour breakdown by skill)
  +-- Database Functions (cascade calculations)
  +-- Triggers (auto-validation on insert/update)
  +-- Materialized Views (pre-computed aggregations)

  Real-time Engine:
  +-- Push updates to all connected clients
```

**How Auto-Cascade Works:**

```javascript
// Set revenue target
await setRevenueTarget('esdm', 'mysuru', 2030, 1.5)

// Database AUTOMATICALLY creates:
// - Labour target: 15,000 (1.5B x 100 employees/$1M)
// - Land target: 500,000 sqft (15K x 33.33 sqft/employee)
// - Capital target: Rs 500 Cr (500K sqft x Rs 4,000/sqft)
// - All linked via foreign keys & dependencies

// If you later update revenue to 2.0B:
await updateTarget('t010', { value: 2.0 })
// Trigger fires -> recalculates labour (20K), land (666K), capital (Rs 666 Cr)
// Real-time subscription -> UI updates INSTANTLY on all tabs
```

---

## Current vs Proposed Structure

### Tab Structure Comparison: 6 Tabs to 9 Tabs

#### BEFORE (Current v2.0 - 6 Tabs)

```
+------------------------------------------------------------+
|                    KDEM DASHBOARD v2.0                     |
+------------------------------------------------------------+
| [Overview] [Beyond Bengaluru] [Global Competition]         |
| [Roadmap & Progress] [Success Metrics] [Data Sources]      |
+------------------------------------------------------------+

TAB 1: OVERVIEW
+-- Hero Stats (4 metrics)
+-- Vision 2030 Progress (4 cards)
+-- Strategic Programs (4 programs)
+-- Quick Navigation

TAB 2: BEYOND BENGALURU
+-- Tier 1: Mysuru, Mangaluru, HDB Corridor
+-- Tier 2: Kalaburagi, Tumakuru
+-- Tier 3: Shivamogga

TAB 3: GLOBAL COMPETITION
+-- Karnataka's National Leadership
+-- Global South Competition (9 cities)
+-- Strategic Opportunities & Vulnerabilities

TAB 4: ROADMAP & PROGRESS
+-- Overall Vision 2030 Progress
+-- Phase 1/2/3 Implementation
+-- Budget Tracking
+-- Risk Register

TAB 5: SUCCESS METRICS
+-- Startup Success Benchmarks
+-- Cluster Development Ratios
+-- Exit & Scale Indicators
+-- Validation Model

TAB 6: DATA SOURCES
+-- Confidence Rating System
+-- Primary Sources
+-- Industry Research
+-- Data Gaps & Mitigation
+-- Attribution Model
```

#### AFTER (Proposed v3.0 - 9 Tabs)

```
+--------------------------------------------------------------------+
|                      KDEM DASHBOARD v3.0                            |
|                  Karnataka Digital Economy Mission                   |
+--------------------------------------------------------------------+
| CORE VERTICALS (5 Pillars):                                         |
| [Overview] [IT Services] [ESDM] [Startups] [Digitizing Sectors]     |
|                                                                      |
| GEOGRAPHIC:                                                          |
| [Bengaluru] [Beyond Bengaluru]                                      |
|                                                                      |
| CROSS-CUTTING:                                                       |
| [Factors of Production] [Roadmap & Data]                            |
+--------------------------------------------------------------------+

TAB 1: OVERVIEW (Enhanced)
+-- 5-Pillar Framework Visualization
|   +-- IT Exports: $76B -> $229B
|   +-- IT Domestic: $17B -> $56B
|   +-- ESDM: $24B -> $105B
|   +-- Startups: $5B -> $27B
|   +-- Digitizing Sectors: $9B -> $62B
+-- India Context Panel (NEW)
|   +-- India GDP: $3.1T -> $8.4T
|   +-- India Digital Economy: $500B -> $2T
+-- Geographic Split (NEW)
|   +-- Bengaluru: $125.84B -> $481.65B
|   +-- Beyond Bengaluru: $4.23B -> $18.35B
+-- Hero Stats (preserved from v2.0)
+-- Vision 2030 Progress (preserved)
+-- Strategic Programs (preserved)

TAB 2: IT SERVICES (NEW)
+-- Combined Revenue Dashboard
|   +-- Total: $93B -> $285B
|   +-- Exports: $76B -> $229B (38% of India)
|   +-- Domestic: $17B -> $56B (30% of India)
+-- Employment Tracker
|   +-- Total: 1.82M -> 3.86M
|   +-- Exports: 1.49M -> 3.06M
|   +-- Domestic: 0.33M -> 0.80M
+-- Growth Trajectory Chart (2021-30)
+-- Sub-Sectors: Products, Services, BPM, GCCs
+-- Data Sources

TAB 3: ESDM (NEW)
+-- Revenue Growth
|   +-- Karnataka: $24B -> $105B
|   +-- India: $122B -> $500B
|   +-- Karnataka Share: 20%
+-- Employment Growth: 0.19M -> 0.8M
+-- Growth Assumptions
|   +-- Till 2025: ICEA estimates
|   +-- 2026-30: 12% CAGR
+-- Strategic Infrastructure
|   +-- Mysuru PCB Park
|   +-- Tumakuru Aerospace SEZ
|   +-- HDB Corridor Manufacturing
+-- Data Sources

TAB 4: STARTUPS & INNOVATION (Enhanced)
+-- Economic Impact (NEW)
|   +-- Revenue: $5B -> $27B (40% of India)
|   +-- Employment: 0.55M -> 2.5M
+-- Growth Trajectory (NEW)
|   +-- Till 2025: 30% CAGR
|   +-- 2026-30: 20% CAGR
+-- Current Stats (preserved)
|   +-- 17,000+ active startups
|   +-- 45+ unicorns
|   +-- ELEVATE (1,000+ funded)
+-- Success Metrics (from v2.0 Tab 5)
+-- Target Milestones

TAB 5: DIGITIZING SECTORS (NEW - 17 Categories)
+-- Sector Overview
|   +-- Total Impact: $9B -> $62B
|   +-- India: $112B -> $832B
|   +-- Growth: India 10%, Karnataka 15%
+-- Government & Public Services
|   +-- Digital Communication Services
|   +-- Government e-Marketplace
|   +-- Direct Benefit Transfer
+-- Social Infrastructure
|   +-- Tech-enabled Healthcare
|   +-- Customizable Education
|   +-- Digitally Enabled Power
|   +-- Smart Grids
+-- Financial Services
|   +-- Digital Payments
|   +-- Flow-based Lending (MSMEs)
|   +-- Digital Farmer Financing
+-- Agriculture
|   +-- Precision Agriculture
|   +-- Universal Agricultural Marketplace
+-- Labor & Supply Chain
|   +-- Online Talent Platforms
|   +-- Digital Supply Chain - Retail
|   +-- Digital Supply Chain - E-Commerce
|   +-- Efficient Transport & Logistics
+-- Business Transformation
    +-- Business Digitization & IoT

TAB 6: BENGALURU (NEW)
+-- Economic Overview
|   +-- Size: $125.84B -> $481.65B
|   +-- Share of Karnataka: 96.7% -> 96.3%
+-- Key Metrics (from v2.0 Overview)
|   +-- 45% of India's IT Exports
|   +-- 550+ GCCs
|   +-- 17,000+ startups
|   +-- 45+ unicorns
|   +-- 2.2M tech workforce
+-- Infrastructure & Ecosystem
+-- Competitive Positioning

TAB 7: BEYOND BENGALURU (Enhanced)
+-- Overall BB Stats (NEW)
|   +-- Digital Economy: $4.23B -> $18.35B
|   +-- Share: 3.3% -> 3.7%
|   +-- Targets: 500+ companies, 50,000+ jobs
+-- Tier 1: Invest Aggressively (preserved)
|   +-- Mysuru: $550M -> $1.5B (PDF target added)
|   +-- Mangaluru: $360M -> $1.5B (PDF target added)
|   +-- HDB Corridor: $200M -> $1B (PDF target added)
+-- Tier 2: Nurture & Build (preserved)
|   +-- Kalaburagi
|   +-- Tumakuru
+-- Tier 3: Study & Strategize (preserved)
    +-- Shivamogga

TAB 8: FACTORS OF PRODUCTION (NEW)
+-- LAND
|   +-- Office space & rentals
|   +-- Co-working spaces
|   +-- Industrial land & SEZs
|   +-- Government permissions
+-- LABOUR (Skilling)
|   +-- Nipuna Karnataka (100K target)
|   +-- LEAP
|   +-- Employment projections by sector
|   +-- Skill gap analysis
+-- CAPITAL (Funding)
|   +-- Incubators & accelerators
|   +-- Grant programs (ELEVATE)
|   +-- Banks & multilateral institutions
|   +-- VC/angel ecosystem
+-- ORGANISATION (Ease of Business)
    +-- Regulatory environment
    +-- Government infrastructure
    +-- Transport, health, education
    +-- Quality of life

TAB 9: ROADMAP & DATA (Consolidated)
+-- SECTION 1: Strategic Roadmap (from v2.0 Tab 4)
|   +-- Overall Vision 2030 Progress
|   +-- Phase 1/2/3 Implementation
|   +-- Budget Tracking
|   +-- Risk Register
+-- SECTION 2: Global Competition (from v2.0 Tab 3)
|   +-- Karnataka's Leadership
|   +-- 9-City Comparison
|   +-- Opportunities & Vulnerabilities
+-- SECTION 3: Data Sources (from v2.0 Tab 6)
|   +-- Confidence Rating System
|   +-- Primary Sources
|   +-- Industry Research
|   +-- Data Gaps & Mitigation
|   +-- Attribution Model
+-- SECTION 4: Assumptions & Methodology (NEW from PDF)
    +-- Karnataka Share of India (by sector)
    +-- Growth Rate Assumptions
    +-- Employment Assumptions
```

### What Gets Preserved (100%)

**Everything from the current website is preserved:**

- All 6 Beyond Bengaluru cluster cards (Tier 1/2/3)
- All Vision 2030 progress tracking
- All strategic programs (ELEVATE, GCC Policy, Nipuna Karnataka)
- All success metrics (startup survival, funding rates)
- All competitive analysis (9-city comparison)
- All data sources and attribution
- All roadmap phases and milestones
- All risk register items
- All existing hero statistics

**Nothing gets deleted. Everything gets reorganized and enhanced.**

### What's New

| New Content | Source | Location |
|-------------|--------|----------|
| 5-Pillar Framework | PDF Slide 3 | Tab 1 |
| India GDP context | PDF Slide 2 | Tab 1 |
| IT Services breakdown | PDF Slides 5, 7, 8 | Tab 2 (new) |
| ESDM sector details | PDF Slides 5, 9 | Tab 3 (new) |
| 17 Digitizing Sectors | PDF Slides 3, 6, 11 | Tab 5 (new) |
| Bengaluru hub metrics | PDF Slide 12 | Tab 6 (new) |
| Factors of Production | User framework | Tab 8 (new) |
| Assumptions & Methodology | PDF Slides 14, 15 | Tab 9, Section 4 |
| Admin Interface (Phase 5) | Enhancement | Backend |

### Data Flow Mapping

| Current Location | Content | New Location | Status |
|------------------|---------|--------------|--------|
| Tab 1: Overview | Hero stats | Tab 1 + Tab 6 | Enhanced |
| Tab 1: Overview | Vision 2030 | Tab 1 | Enhanced |
| Tab 1: Overview | Strategic programs | Tab 1 | Preserved |
| Tab 2: Beyond Bengaluru | All 6 clusters | Tab 7 | Enhanced with PDF targets |
| Tab 3: Global Competition | All content | Tab 9, Section 2 | Moved |
| Tab 4: Roadmap | All content | Tab 9, Section 1 | Moved |
| Tab 5: Success Metrics | Startup benchmarks | Tab 4 | Integrated |
| Tab 5: Success Metrics | Cluster ratios | Tab 7 | Integrated |
| Tab 6: Data Sources | All content | Tab 9, Section 3 | Moved |

---

## Implementation Plan

### Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Vite + HTML/CSS/JS | Fast dev server, optimized builds |
| **Backend/Database** | Supabase (PostgreSQL) | Relational DB, auto API, real-time |
| **Data Model** | 3D Relational Schema | Verticals x Geography x Factors |
| **State Management** | Supabase Client + Real-time | Auto-sync across tabs/users |
| **Deployment** | Vercel (frontend) + Supabase Cloud (backend) | Global CDN, auto-deploy |
| **Version Control** | Git + GitHub | Code versioning |
| **CI/CD** | GitHub Actions | Automated testing + deployment |

### Data Architecture

```
/data/
+-- core/
|   +-- vision-2030.json           # Vision targets & progress
|   +-- digital-economy.json       # 5-pillar framework data
|   +-- india-context.json         # India GDP & digital economy
|   +-- geographic-split.json      # Bengaluru vs Beyond Bengaluru
|
+-- verticals/
|   +-- it-services.json           # IT exports + domestic
|   +-- esdm.json                  # Electronics manufacturing
|   +-- startups.json              # Innovation ecosystem
|   +-- digitizing-sectors.json    # 17 emerging sectors
|
+-- geographic/
|   +-- bengaluru.json             # Primary hub data
|   +-- beyond-bengaluru/
|       +-- overview.json          # BB program overall
|       +-- mysuru.json            # Tier 1 cluster
|       +-- mangaluru.json         # Tier 1 cluster
|       +-- hdb-corridor.json      # Tier 1 cluster
|       +-- kalaburagi.json        # Tier 2 cluster
|       +-- tumakuru.json          # Tier 2 cluster
|       +-- shivamogga.json        # Tier 3 cluster
|
+-- horizontals/
|   +-- land.json                  # Physical infrastructure
|   +-- labour.json                # Skilling programs
|   +-- capital.json               # Funding ecosystem
|   +-- organisation.json          # Ease of business
|
+-- roadmap/
|   +-- phases.json                # 2025-2030 implementation
|   +-- milestones.json            # Quarterly targets
|   +-- risks.json                 # Risk register
|   +-- budget.json                # Financial allocation
|
+-- benchmarks/
|   +-- global-competition.json    # 9-city comparison
|   +-- startup-metrics.json       # Success benchmarks
|   +-- cluster-validation.json    # Cluster success ratios
|
+-- metadata/
    +-- sources.json               # Data attribution
    +-- confidence-ratings.json    # Data quality indicators
    +-- assumptions.json           # Growth assumptions
    +-- update-schedule.json       # Refresh cadence
```

### Database Schema (Supabase)

#### Dimension Tables

| Table | Purpose | Records |
|-------|---------|---------|
| `verticals` | 5 pillars + sub-sectors | ~25 rows |
| `geographies` | Karnataka + 8 clusters + sub-locations | ~15 rows |
| `factors` | Land, Labour, Capital, Organisation | 4 rows |

#### Fact Table (Single Source of Truth)

```sql
CREATE TABLE targets (
  id TEXT PRIMARY KEY,
  vertical_id TEXT REFERENCES verticals(id),      -- Which pillar?
  geography_id TEXT REFERENCES geographies(id),   -- Which cluster?
  factor_id TEXT REFERENCES factors(id),          -- Which factor? (NULL = revenue)
  year INTEGER,                                    -- Which year?
  metric TEXT,                                     -- What metric?
  value NUMERIC,                                   -- The actual number
  unit TEXT,                                       -- Unit (billion_usd, employees, sqft)

  -- Relationships
  parent_target_id TEXT REFERENCES targets(id),   -- Parent-child hierarchy
  dependencies TEXT[],                             -- Array of target IDs this depends on

  -- Calculation metadata
  formula TEXT,                                    -- How was this calculated?
  calculation_params JSONB,                        -- Parameters used in formula

  -- Metadata
  data_source TEXT,                                -- PDF Slide 16, KDEM estimate, etc.
  confidence_rating INTEGER                        -- 1-5 stars
);
```

### Timeline Overview (13 Weeks)

```
PHASE 1: Foundation (Week 1-2)
+-- Sprint 1.1: Environment Setup
+-- Sprint 1.2: Database Schema
+-- Sprint 1.3: Data Migration
+-- Sprint 1.4: Backup & Versioning

PHASE 2: Core Restructure (Week 3-5)
+-- Sprint 2.1: Data Service Layer
+-- Sprint 2.2: New Tab Structure (Tabs 1-5)
+-- Sprint 2.3: Geographic Tabs (Tabs 6-7)

PHASE 3: Horizontals & Roadmap (Week 6-7)
+-- Sprint 3.1: Factors Tab (Tab 8)
+-- Sprint 3.2: Roadmap Tab (Tab 9)

PHASE 4: Polish & Deploy (Week 8-9)
+-- Sprint 4.1: Testing & Validation
+-- Sprint 4.2: Documentation
+-- Sprint 4.3: Deployment

PHASE 5: Admin Interface (Week 10-13) - OPTIONAL
+-- Sprint 5.1: Database Extensions
+-- Sprint 5.2: AI Prediction Engine
+-- Sprint 5.3: Admin UI Components
+-- Sprint 5.4: Workflow & Permissions
+-- Sprint 5.5: Testing & Documentation
```

### Detailed Timeline

#### Phase 1: Foundation (Week 1-2)

**Sprint 1.1: Environment Setup**
- [ ] Install Vite, Supabase CLI, dependencies
- [ ] Create Supabase project (kdem-dashboard)
- [ ] Configure environment variables (.env.local)
- [ ] Test local Vite dev server

**Sprint 1.2: Database Schema**
- [ ] Run database migrations (dimension tables, fact table)
- [ ] Create conversion ratios reference table
- [ ] Create skill requirements reference table
- [ ] Setup database functions (cascade_factor_targets)
- [ ] Setup triggers (validation, auto-timestamp)
- [ ] Create materialized views (aggregations)

**Sprint 1.3: Data Migration**
- [ ] Extract current website data to JSON
- [ ] Merge PDF data into JSON
- [ ] Write migration script (JSON to Supabase)
- [ ] Import dimension tables (verticals, geographies, factors)
- [ ] Import targets from PDF
- [ ] Validate data integrity

**Sprint 1.4: Backup & Versioning**
- [ ] Full backup of v2.0 website
- [ ] Git tag v2.0-backup
- [ ] Create /archive/v2.0/

#### Phase 2: Core Restructure (Week 3-5)

**Sprint 2.1: Data Service Layer**
- [ ] Setup Supabase client in Vite
- [ ] Build data service functions:
  - [ ] getGeographyDashboard(geography, year)
  - [ ] getVerticalDistribution(vertical, year)
  - [ ] getFactorSummary(geography, factor, year)
  - [ ] setRevenueTarget(vertical, geography, year, value)
  - [ ] apportionToGeographies(vertical, factor, year, total, rules)
- [ ] Setup real-time subscriptions
- [ ] Error handling and loading states

**Sprint 2.2: New Tab Structure (Tabs 1-5)**
- [ ] **Tab 1: Overview** - 5-pillar framework + India context
- [ ] **Tab 2: IT Services** - Exports + Domestic combined
- [ ] **Tab 3: ESDM** - Electronics manufacturing
- [ ] **Tab 4: Startups** - Innovation ecosystem (enhanced)
- [ ] **Tab 5: Digitizing Sectors** - 17 categories

**Sprint 2.3: Geographic Tabs (Tabs 6-7)**
- [ ] **Tab 6: Bengaluru** - Primary hub metrics
- [ ] **Tab 7: Beyond Bengaluru** - 6 clusters (enhanced)

#### Phase 3: Horizontals & Roadmap (Week 6-7)

**Sprint 3.1: Factors Tab (Tab 8)**
- [ ] **Land Section** - Infrastructure by cluster
- [ ] **Labour Section** - Skilling programs + projections
- [ ] **Capital Section** - Funding ecosystem
- [ ] **Organisation Section** - Ease of business

**Sprint 3.2: Roadmap Tab (Tab 9)**
- [ ] Consolidate existing Roadmap, Competition, Data Sources
- [ ] Add Assumptions & Methodology section (PDF data)

#### Phase 4: Polish & Deploy (Week 8-9)

**Sprint 4.1: Testing & Validation**
- [ ] Data integrity checks (all aggregations match)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse > 90)

**Sprint 4.2: Documentation**
- [ ] Update README.md
- [ ] Create DATA_GUIDE.md (how to update via Supabase)
- [ ] Create DEPLOYMENT.md
- [ ] Create CHANGELOG.md

**Sprint 4.3: Deployment**
- [ ] Deploy frontend to Vercel staging
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Post-deployment smoke test

#### Phase 5: Admin Interface (Week 10-13) - OPTIONAL

**Purpose:** Password-protected admin panel for intelligent target setting with AI-powered apportionment

**Sprint 5.1: Database Extensions**
- [ ] Create apportionment_rules table (historical defaults)
- [ ] Create apportionment_constraints table (capacity limits)
- [ ] Create apportionment_drafts table (workflow)
- [ ] Create user_roles table (RBAC)
- [ ] Setup Row-Level Security policies
- [ ] Create prediction functions (statistical model)

**Sprint 5.2: AI Prediction Engine**
- [ ] Setup Claude API integration (Supabase Edge Function)
- [ ] Implement statistical prediction model
- [ ] Implement constraint-based validation model
- [ ] Implement AI-powered suggestion model
- [ ] Implement hybrid combiner
- [ ] Test prediction accuracy

**Sprint 5.3: Admin UI Components**
- [ ] Build login page (Supabase Auth)
- [ ] Build target setting form
- [ ] Build geographic apportionment table
- [ ] Build factor apportionment calculator
- [ ] Build preview & commit screen
- [ ] Build draft management interface

**Sprint 5.4: Workflow & Permissions**
- [ ] Implement role-based access (admin, editor, reviewer, viewer)
- [ ] Implement draft approval workflow
- [ ] Implement audit logging
- [ ] Implement cascade updates
- [ ] Implement rollback capability
- [ ] Email notifications for approvals

**Sprint 5.5: Testing & Documentation**
- [ ] Test apportionment workflow end-to-end
- [ ] Test AI prediction accuracy
- [ ] Test constraint validation
- [ ] Test multi-user concurrent editing
- [ ] Create admin user guide
- [ ] Train initial admin users

**Admin Interface Features:**
- Auto-populate apportionment with defaults from historical data
- AI-powered suggestions (Claude API) for optimal distribution
- Constraint validation (capacity limits, growth rates, policies)
- Preview before commit (see all cascading effects)
- Audit trail (who changed what, when, why)
- Draft workflow (save, review, approve, commit)

**Estimated Additional Cost:** +$1.50/month (Claude API for ~50 predictions/month)

### Data Migration Strategy

#### Step 1: Extract Current Data to JSON

```javascript
// scripts/extract-current-data.js
// Reads index.html and extracts all embedded data to JSON files
// Run: node scripts/extract-current-data.js

const vision2030 = {
  "targets": [
    {
      "metric": "Digital Economy Size",
      "current_value": 110,
      "target_value": 400,
      "unit": "USD Billions",
      "progress_percent": 27.5,
      "status": "on-track"
    }
    // ... more targets
  ]
};

// Write to /data/core/vision-2030.json
```

#### Step 2: Add PDF Data to JSON

```javascript
// scripts/add-pdf-data.js
// Merges PDF data into existing JSON structure
// Run: node scripts/add-pdf-data.js

// Adds 5-pillar framework, India context, sector breakdowns
```

#### Step 3: Migrate to Supabase

```javascript
// scripts/migrate-to-supabase.js
// Uploads JSON data to Supabase tables
// Run: node scripts/migrate-to-supabase.js

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Import verticals
const verticals = require('../data/core/digital-economy.json').pillars
await supabase.from('verticals').insert(verticals)

// Import targets
// ... continue with other tables
```

### Backup Plan

#### Before Any Changes

```bash
# Create timestamped backup
mkdir -p backups/v2.0-$(date +%Y%m%d)
cp -r index.html styles-tabs.css app-tabs.js *.md backups/v2.0-$(date +%Y%m%d)/

# Git tag for v2.0
git tag -a v2.0-backup -m "Pre-restructure backup - Tabbed dashboard"
git push origin v2.0-backup
```

#### Archive Structure

```
/archive/
+-- v1.0/                          # Original single-page design
|   +-- index-old.html
|   +-- styles.css
|   +-- script.js
|
+-- v2.0/                          # Tabbed layout (current)
|   +-- index.html
|   +-- styles-tabs.css
|   +-- app-tabs.js
|   +-- snapshot-2025-02-05.json
|
+-- v3.0/                          # New 5-pillar structure
    +-- (will be created during restructure)
```

#### Migration Path (Zero Downtime)

```
WEEK 0 (Preparation)
+-- Full backup of v2.0
+-- Git tag: v2.0-backup
+-- Create /archive/v2.0/

WEEK 1-7 (Parallel Development)
+-- v2.0 remains live on GitHub Pages
+-- v3.0 developed locally + Vercel staging
+-- No disruption to users

WEEK 8 (Staging)
+-- v3.0 deployed to Vercel preview
+-- UAT with stakeholders
+-- v2.0 still live

WEEK 9 (Rollout)
+-- Day 1-3: Soft launch (v3.0 on Vercel, v2.0 on GitHub Pages)
+-- Day 4-5: Monitor analytics, fix issues
+-- Day 6-7: Hard launch (announce v3.0, deprecate v2.0)
+-- Post-launch: Keep v2.0 in /archive/ for reference
```

### Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Low | Critical | Complete backup + Git tag before changes; incremental migration with validation |
| Breaking existing functionality | Medium | High | Preserve HTML structure initially; component-based refactor; regression testing |
| Deployment issues (Vite/Vercel) | Medium | Medium | Test locally first; Vercel preview deployments; keep GitHub Pages as fallback |
| User confusion (new navigation) | High | Low | Onboarding tooltip tour; breadcrumbs; search; "What's New in v3.0" banner |
| Data update complexity | Medium | Medium | Clear documentation; JSON schema validation; automated update scripts |

---

## Getting Started

### Prerequisites

**Required:**
- Node.js 18+ installed
- npm or yarn package manager
- Git
- Supabase account (free tier sufficient)
- Vercel account (free tier sufficient)

**Recommended:**
- VS Code with Vite extension
- Supabase CLI (`npm install -g supabase`)

### Quick Start (3 Commands)

```bash
# 1. Clone and install
git clone https://github.com/your-org/KDEM.git
cd KDEM
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Start development
npm run dev
```

### Environment Setup

#### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create new project: `kdem-dashboard`
3. Note your credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon key: `eyJhbG...`

#### Step 2: Configure Environment

```bash
# Create .env.local
echo "VITE_SUPABASE_URL=https://xxxxx.supabase.co" > .env.local
echo "VITE_SUPABASE_ANON_KEY=eyJhbG..." >> .env.local
```

#### Step 3: Initialize Database

```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref xxxxx

# Run migrations
supabase db execute --file supabase/migrations/001_initial_schema.sql
```

#### Step 4: Setup Vite Project

```bash
# Install dependencies
npm init -y
npm install -D vite
npm install @supabase/supabase-js

# Verify installation
npm run dev
```

### First Steps

#### Day 1: Review & Approve

- [ ] Read this implementation guide
- [ ] Review BEFORE_AFTER_COMPARISON.md (visual guide)
- [ ] Confirm 5-pillar framework is correct
- [ ] Approve 9-tab structure
- [ ] Greenlight Supabase + Vite + Vercel stack

#### Day 1: Backup Current Version

```bash
mkdir -p backups/v2.0-$(date +%Y%m%d)
cp -r index.html styles-tabs.css app-tabs.js *.md backups/v2.0-$(date +%Y%m%d)/

git tag -a v2.0-backup -m "Pre-restructure backup"
git push origin v2.0-backup
```

#### Day 2-3: Setup Supabase

```bash
# Create Supabase project at https://supabase.com
# Run schema migrations
# Test database connection
```

#### Week 1: Begin Phase 1

Follow Sprint 1.1 - 1.4 as outlined in the Implementation Plan section.

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: '/KDEM/',  // GitHub Pages path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "github": {
    "silent": true,
    "enabled": true
  }
}
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages and Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build with Vite
      run: npm run build

    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist

    # Vercel deployment happens automatically via Vercel GitHub integration
```

---

## Success Criteria

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 2 seconds | Lighthouse Performance |
| Performance Score | > 90 | Lighthouse |
| Accessibility Score | > 95 (WCAG 2.1 AA) | Lighthouse |
| SEO Score | > 95 | Lighthouse |
| Mobile Responsiveness | 100% functional | Manual testing |
| Browser Compatibility | Latest 2 versions | Chrome, Firefox, Safari, Edge |
| Uptime | 99.9% | Vercel SLA |
| Zero Console Errors | 0 errors | Browser DevTools |

### Data Quality Metrics

| Metric | Target | Verification |
|--------|--------|--------------|
| Data Completeness | 100% of PDF data integrated | Cross-reference with source PDF |
| Data Preservation | 100% of current website data preserved | Before/after comparison |
| Data Accuracy | 0 discrepancies with source documents | Manual audit |
| Source Attribution | 100% of data points have source | Metadata check |
| Confidence Ratings | All metrics have confidence ratings | Schema validation |
| Aggregation Consistency | Geographic sums match totals | Automated validation |

### User Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Navigation Clarity | Find any data in < 3 clicks | User testing |
| Update Frequency | Data updates within 24 hours of source publication | Process audit |
| Error Rate | < 0.1% broken links or failed data loads | Automated monitoring |
| Stakeholder Feedback | Positive feedback from Karnataka government | Survey/interviews |
| Documentation Quality | New team member productive in < 1 day | Onboarding test |

### Data Integrity Validation

```sql
-- Validate geographic sums
SELECT validate_geographic_sum('esdm', 'labour', 2030);
-- Checks: SUM(all clusters) = Karnataka total

-- Validate parent-child consistency
SELECT * FROM targets
WHERE parent_target_id IS NOT NULL
AND value > (SELECT value FROM targets WHERE id = parent_target_id);
-- Should return 0 rows
```

---

## FAQ & Next Steps

### Frequently Asked Questions

#### Q: Can we self-host Supabase on Karnataka government servers?

**A:** Yes. Supabase is fully open-source. You can deploy to:
- Karnataka government cloud
- AWS/Azure/GCP in India region
- On-premises datacenter

Follow: https://supabase.com/docs/guides/self-hosting

#### Q: What if Supabase goes down?

**A:**
- Supabase Pro has 99.9% uptime SLA
- Automatic backups (daily for Free, hourly for Pro)
- Can export entire database anytime (pg_dump)
- Frontend cached at edge (Vercel CDN) - works even if DB slow

#### Q: How do non-technical staff update data?

**A:** Multiple options:
1. **Supabase Dashboard** - Web UI for editing tables (like Excel)
2. **Custom Admin Panel** - Built in Phase 5
3. **SQL scripts** - Templates for common updates
4. **Google Sheets sync** - Future enhancement via Edge Functions

#### Q: Can we migrate back to JSON if needed?

**A:** Yes. Export script:

```javascript
// Export all data to JSON
const { data } = await supabase.from('targets').select('*')
fs.writeFileSync('targets.json', JSON.stringify(data, null, 2))
```

#### Q: How do we handle historical data (2021-2029)?

**A:** Same targets table, different year values:

```sql
INSERT INTO targets (vertical_id, geography_id, factor_id, year, metric, value)
VALUES
  ('esdm', 'mysuru', NULL, 2021, 'revenue', 0.2),
  ('esdm', 'mysuru', NULL, 2022, 'revenue', 0.3),
  ('esdm', 'mysuru', NULL, 2025, 'revenue', 0.8),
  ('esdm', 'mysuru', NULL, 2030, 'revenue', 1.5);

-- Query time series
SELECT year, value FROM targets
WHERE vertical_id = 'esdm' AND geography_id = 'mysuru' AND metric = 'revenue'
ORDER BY year;
```

#### Q: Is the 9-week timeline flexible?

**A:** Options:
- **9 weeks:** Full restructure with all enhancements (recommended)
- **6 weeks:** Essential restructure only (skip Factors tab, minimal polish)
- **12 weeks:** Add CMS for non-technical data updates

#### Q: Should we prioritize Vercel or GitHub Pages?

**A:** Recommendation:
- **Primary:** Vercel (better performance, preview deployments, analytics)
- **Backup:** GitHub Pages (continuity, fallback)

### Cost Analysis

#### Option 1: Free Tier

| Service | Cost | Limits |
|---------|------|--------|
| Supabase Free | $0/month | 500 MB database, 2 GB bandwidth/month, 50K users |
| Vercel Hobby | $0/month | 100 GB bandwidth/month |
| **Total** | **$0/month** | Suitable for development, staging, initial launch |

#### Option 2: Production (Recommended)

| Service | Cost | Features |
|---------|------|----------|
| Supabase Pro | $25/month | 8 GB database, 250 GB bandwidth, custom domain |
| Vercel Pro | $20/month | 1 TB bandwidth, analytics |
| **Total** | **$45/month** | Suitable for production with high traffic |

#### Option 3: Enterprise

| Service | Cost | Features |
|---------|------|----------|
| Supabase Enterprise | Custom | Dedicated instance, SLA, support |
| Vercel Enterprise | Custom | Enterprise features |
| **Total** | Contact for quote | Government-hosted, data sovereignty |

### Next Steps

#### Immediate (This Week)

1. [ ] Review this implementation guide
2. [ ] Confirm approach with stakeholders
3. [ ] Get approval for Supabase + Vite + Vercel stack
4. [ ] Create Supabase project
5. [ ] Setup database schema

#### Week 1-2

6. [ ] Complete Phase 1 (Foundation)
7. [ ] Import initial data from PDF
8. [ ] Validate data integrity

#### Week 3-9

9. [ ] Follow implementation timeline (Phases 2-4)
10. [ ] Weekly demos to stakeholders
11. [ ] User acceptance testing

#### Week 10+

12. [ ] Monitor, iterate, enhance based on feedback
13. [ ] Optional: Implement Admin Interface (Phase 5)

### Questions for Stakeholder Decision

#### 1. Framework Confirmation

**Question:** Is the 5-pillar framework from the PDF the official structure KDEM should follow?
- IT Exports
- IT Domestic
- ESDM
- Startups
- Newly Digitizing Sectors (17 sub-categories)

**Impact:** This determines the entire navigation structure.

#### 2. Tab Structure Approval

**Question:** Is the proposed 9-tab structure acceptable?

**Alternative:** Could consolidate to 7 tabs by:
- Merging Tabs 2-5 (verticals) into a single "Sectors" tab with sub-navigation
- Merging Tabs 6-7 (geographic) into a single "Geography" tab with sub-navigation

**Recommendation:** 9 tabs provides clearer navigation.

#### 3. Admin Interface Priority

**Question:** Should Phase 5 (Admin Interface) be included in initial scope or deferred?

**Recommendation:** Defer to post-launch to reduce initial complexity.

---

## Appendices

### Appendix A: File Structure (v3.0)

```
KDEM/
+-- index.html                      # Main dashboard (v3.0 - 9 tabs)
+-- vite.config.js                  # Vite configuration
+-- vercel.json                     # Vercel deployment config
+-- package.json                    # Node.js dependencies
+-- package-lock.json
+-- .gitignore
+-- .env.local                      # Environment variables (not in git)
|
+-- src/                            # Source files
|   +-- main.js                     # Entry point
|   +-- components/                 # Reusable UI components
|   |   +-- PillarCard.js
|   |   +-- ProgressBar.js
|   |   +-- MetricCard.js
|   |   +-- ClusterCard.js
|   |   +-- DataTable.js
|   |   +-- ChartWrapper.js
|   +-- services/                   # Data services
|   |   +-- supabase.js             # Supabase client
|   |   +-- dataService.js          # Data fetching functions
|   +-- utils/                      # Utility functions
|   |   +-- dataLoader.js           # JSON data loading
|   |   +-- chartHelpers.js         # Chart.js utilities
|   |   +-- formatters.js           # Number/date formatting
|   +-- styles/
|       +-- main.css                # Global styles
|       +-- components.css          # Component styles
|       +-- themes.css              # Color themes
|
+-- data/                           # JSON data files
|   +-- core/
|   +-- verticals/
|   +-- geographic/
|   +-- horizontals/
|   +-- roadmap/
|   +-- benchmarks/
|   +-- metadata/
|
+-- supabase/                       # Supabase configuration
|   +-- migrations/                 # Database migrations
|   |   +-- 001_initial_schema.sql
|   |   +-- 002_conversion_ratios.sql
|   |   +-- 003_functions_triggers.sql
|   +-- seed/                       # Seed data
|       +-- verticals.sql
|       +-- geographies.sql
|       +-- factors.sql
|
+-- public/                         # Static assets
|   +-- favicon.ico
|   +-- images/
|   +-- fonts/
|
+-- scripts/                        # Build/migration scripts
|   +-- extract-current-data.js
|   +-- add-pdf-data.js
|   +-- migrate-to-supabase.js
|   +-- validate-data.js
|
+-- backups/                        # Version backups
|   +-- v2.0-20250205/
|
+-- archive/                        # Historical versions
|   +-- v1.0/
|   +-- v2.0/
|
+-- supporting-docs/                # Reference documents
|   +-- Digital Economy numbers - Final version combined.pdf
|
+-- .github/
|   +-- workflows/
|       +-- deploy.yml              # CI/CD pipeline
|
+-- dist/                           # Vite build output (gitignored)
|
+-- docs/                           # Documentation
|   +-- IMPLEMENTATION_GUIDE.md     # This document
|   +-- DATA_GUIDE.md               # How to update data
|   +-- DEPLOYMENT.md               # Deployment instructions
|
+-- README.md                       # Project overview
+-- CHANGELOG.md                    # Version history
+-- SOURCES.md                      # Data source attribution
```

### Appendix B: Sample JSON Schema

```json
// data/core/digital-economy.json
{
  "schema_version": "1.0",
  "last_updated": "2025-02-05",
  "data_source": "Digital Economy numbers - Final version combined.pdf",
  "confidence_rating": 5,
  "pillars": [
    {
      "id": "it-exports",
      "name": "IT Exports",
      "description": "IT Products, Services, BPM and GCC - Export Revenue",
      "karnataka_share_of_india": 0.38,
      "revenue_usd_billions": {
        "2021-22": 68,
        "2022-23": 76,
        "2026-27": 106,
        "2029-30": 229
      },
      "employment_millions": {
        "2021-22": 1.33,
        "2022-23": 1.49,
        "2026-27": 2.09,
        "2029-30": 3.06
      },
      "growth_assumptions": {
        "till_2025": 0.12,
        "from_2026": 0.10
      },
      "data_sources": ["NASSCOM", "MeitY", "Statista", "KDEM estimates"]
    }
  ],
  "totals": {
    "karnataka_revenue_usd_billions": {
      "2021-22": 110,
      "2022-23": 130,
      "2026-27": 250,
      "2029-30": 400
    },
    "india_revenue_usd_billions": {
      "2021-22": 400,
      "2022-23": 500,
      "2026-27": 1000,
      "2029-30": 2000
    }
  }
}
```

### Appendix C: Glossary

| Term | Definition |
|------|------------|
| **KDEM** | Karnataka Digital Economy Mission |
| **ESDM** | Electronics System Design & Manufacturing |
| **GCC** | Global Capability Center |
| **BB** | Beyond Bengaluru (geographic distribution program) |
| **HDB** | Hubballi-Dharwad-Belagavi (North Karnataka cluster) |
| **ELEVATE** | Karnataka government's startup funding program |
| **Vite** | Next-generation frontend build tool |
| **Vercel** | Cloud platform for static sites and serverless functions |
| **Supabase** | Open-source Firebase alternative (PostgreSQL + APIs) |
| **HMR** | Hot Module Replacement (live code updates) |
| **WCAG** | Web Content Accessibility Guidelines |
| **CI/CD** | Continuous Integration/Continuous Deployment |
| **RLS** | Row-Level Security (Supabase/PostgreSQL feature) |
| **RBAC** | Role-Based Access Control |

### Appendix D: Key Advantages Summary

#### Data Integrity
- **Single Source of Truth** - Each metric stored once in targets table
- **Automatic Cascades** - Change revenue and labour/land/capital auto-update
- **Enforced Relationships** - Foreign keys prevent orphaned data
- **Built-in Validation** - Triggers check parent-child, sums, ratios

#### Developer Experience
- **Auto-generated API** - No manual endpoint coding
- **Type-safe queries** - Supabase generates TypeScript types
- **Real-time out-of-box** - WebSocket subscriptions included
- **Local development** - Supabase CLI for offline work

#### User Experience
- **Fast queries** - PostgreSQL indexes + materialized views
- **Real-time updates** - See changes instantly without refresh
- **Always consistent** - No stale data across tabs
- **Responsive** - Optimized Vite builds

#### Maintainability
- **Easy updates** - Edit database via SQL or Supabase Dashboard
- **Audit trail** - created_at, updated_at, created_by tracked
- **Rollback capability** - Database backups + Git versioning
- **Clear lineage** - Every target shows its dependencies & formula

#### Scalability
- **Handles growth** - PostgreSQL scales to millions of rows
- **CDN delivery** - Vercel edge network for frontend
- **Caching** - Materialized views for aggregations
- **Future-proof** - Can add GraphQL, Edge Functions, etc.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-02-05 | KDEM Technical Team | Initial consolidated guide |

---

**This is the definitive starting point for anyone wanting to understand and implement the KDEM website restructure.**

For questions or clarifications, contact the KDEM Technical Team.
