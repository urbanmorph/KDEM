# Changelog

All notable changes to the KDEM Dashboard project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-02-06

### 🎉 Major Release - Production v3.0

Complete dashboard restructure with modern tech stack and 3D relational database.

### Added
- **New Tech Stack**
  - Vite 5.4 for fast development and optimized builds
  - Supabase (PostgreSQL) for real-time database
  - Vanilla JavaScript (ES6 modules) for frontend
  - Vercel deployment with automatic CD

- **3D Relational Data Model**
  - Verticals × Geographies × Factors = Targets
  - Single source of truth in `targets` table
  - Auto-cascade calculations (revenue → labor → land → capital)
  - 9 database migrations with seed data
  - Materialized views for performance

- **13 Interactive Tabs**
  - Strategy: Overview, Roadmap, Sources
  - Verticals: IT Exports, IT Domestic, ESDM, Startups
  - Geography: Bengaluru, Beyond Bengaluru
  - Factors: Land, Labor, Capital, Organisation

- **Database Features**
  - 248 verified targets (5 verticals × 13 geographies × 8 years)
  - Conversion ratios for auto-calculations
  - Apportionment rules for geographic distribution
  - Validation functions for data integrity
  - Skill requirements tracking

- **UI/UX Enhancements**
  - Official KDEM logo in header (112px desktop, 96px mobile)
  - Custom SVG favicon in KDEM orange (#E96337)
  - Redesigned footer (social links + Urban Morph credit)
  - Two-level navigation (categories + tabs)
  - Mobile hamburger menu
  - Responsive design (mobile-first)
  - KDEM brand colors throughout (#E96337, #E68634, #5BB9EC)

- **Documentation**
  - Complete implementation guide (1,412 lines)
  - Technical guide with database schema (2,892 lines)
  - Admin interface design document (1,395 lines)
  - Setup guide with Supabase integration
  - Data management guide for updates
  - This changelog!

### Changed
- **Architecture**: Moved from static HTML to Vite + Supabase
- **Data Storage**: From embedded JSON to PostgreSQL database
- **Navigation**: 6 tabs → 13 tabs with category grouping
- **Deployment**: GitHub Pages → Vercel with automatic builds
- **Build Process**: No build → Vite with code splitting & lazy loading

### Fixed
- Data synchronization issues (now single source of truth)
- Mobile menu responsiveness
- Touch target sizes for mobile
- Double-counting in aggregations
- Capital data discrepancies
- Progress bar calculations
- Header responsiveness on small screens

### Performance
- Bundle size optimized with code splitting
- Vendor chunks for Chart.js and Supabase
- CSS minification and tree-shaking
- Lazy loading for tab components
- Build time: ~1.8s
- Main bundle: 44KB CSS + 527KB JS (gzipped: 6.5KB + 137KB)

---

## [2.0.0] - 2026-01-15

### Added
- Tabbed navigation interface (6 tabs)
- Overview, Beyond Bengaluru, Global Competition tabs
- Roadmap & Progress tracking
- Success Metrics section
- Data Sources with confidence ratings
- Vision 2030 progress tracking

### Changed
- Single-page → Multi-tab layout
- Improved mobile responsiveness
- Updated color scheme

---

## [1.0.0] - 2025-12-01

### Added
- Initial dashboard release
- Single-page layout
- Basic metrics display
- Static HTML/CSS/JS
- GitHub Pages deployment
- 4 main sections

---

## Upcoming Releases

### [3.1.0] - Planned 2026-02-20
- Complete documentation sprint
- Data quality improvements
- API endpoint documentation
- Performance monitoring setup

### [4.0.0] - Planned 2026 Q2-Q3
- **Admin Panel** with password protection
- **AI-Powered Target Setting** using Claude API
- **Geographic Apportionment** with ML suggestions
- **Draft Workflow** for approvals
- **Audit Logging** for all changes
- **Role-Based Access Control** (admin/editor/reviewer/viewer)
- **Preview & Validation** before committing changes
- **Rollback Capability** for data recovery

---

## Migration Notes

### v2.0 → v3.0

**Breaking Changes:**
- Completely new tech stack (requires Node.js 20+)
- Data structure changed (JSON → PostgreSQL)
- Different deployment platform (GitHub Pages → Vercel)

**Migration Steps:**
1. Install dependencies: `npm install`
2. Setup Supabase project
3. Run database migrations
4. Update environment variables
5. Build and deploy to Vercel

**Data Migration:**
All data from v2.0 was migrated to Supabase with improvements:
- Added confidence ratings
- Added data sources
- Added year-by-year tracking (2021-2030)
- Added factor-based breakdown

**What Was Preserved:**
- All 6 Beyond Bengaluru cluster data
- All Vision 2030 progress metrics
- All strategic programs (ELEVATE, GCC Policy, etc.)
- All competitive analysis
- All data sources and attribution

---

## Contributors

**Core Team:**
- KDEM Technical Team
- Urban Morph (Dashboard design & development)

**AI Assistant:**
- Claude Sonnet 4.5 (Implementation support)

---

**Repository:** https://github.com/urbanmorph/KDEM
**Live Dashboard:** https://kdem.vercel.app
**Last Updated:** February 6, 2026
