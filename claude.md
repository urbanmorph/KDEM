# KDEM Dashboard - Claude Development Guide

This file contains instructions for Claude (or any AI assistant) working on the KDEM Dashboard project.

## Project Overview

**Karnataka Digital Economy Mission (KDEM) Dashboard v3.0**

A data-driven dashboard for tracking Karnataka's journey to a $400 billion digital economy by 2030, creating 5 million jobs across 5 core verticals and 8 geographic clusters.

### Key Metrics
- **Target Revenue:** $400 Billion USD by 2030
- **Target Employment:** 5 Million jobs
- **Core Verticals:** IT Exports, IT Domestic, ESDM, Startups, Newly Digitizing Sectors
- **Geographic Clusters:** Bengaluru + 8 strategic clusters (Tier 1/2/3)
- **Factors of Production:** Land, Labour, Capital, Organisation

---

## Tech Stack

### Frontend
- **Framework:** Vanilla JavaScript (ES6 modules)
- **Build Tool:** Vite 5.4.21
- **Styling:** Custom CSS with CSS Variables
- **Font:** Inter (Google Fonts)

### Backend
- **Database:** Supabase (PostgreSQL)
- **API:** Auto-generated REST API from Supabase
- **Client:** @supabase/supabase-js

### Deployment
- **Development:** Vite dev server (port 3000)
- **Production:** Vercel
- **Base Path:** `/KDEM/`

### Node.js Version
- **Required:** Node.js 20+ (currently using v20.20.0)
- **Package Manager:** npm 10+

---

## KDEM Brand Colors

**IMPORTANT:** Always use these exact colors for consistency.

```css
--primary-color: #E96337    /* KDEM Orange - main brand color */
--secondary-color: #E68634  /* KDEM Amber - secondary brand color */
--tertiary-color: #5BB9EC   /* KDEM Blue - accent color */
```

### Usage Guidelines
- **Primary (#E96337):** Headers, primary buttons, active states, key metrics
- **Secondary (#E68634):** Secondary actions, highlights, gradients with primary
- **Tertiary (#5BB9EC):** Accents, links, progress indicators, data visualizations

---

## Architecture

### 3D Relational Data Model

The core innovation of KDEM v3.0 is the **3D relational data model** that prevents synchronization issues:

```
Verticals (5 pillars)
    ×
Geographies (13 locations)
    ×
Factors (4 production factors)
    =
Targets (single source of truth)
```

**Example:** If you set an IT Exports revenue target for Karnataka, the system:
1. Uses apportionment rules to distribute across geographies (e.g., 96.7% to Bengaluru)
2. Uses conversion ratios to cascade to other factors (revenue → employment → land → capital)
3. Stores everything in a single `targets` table with foreign keys

### Database Schema

**Dimension Tables:**
- `verticals` (25 records: 5 core + sub-sectors + 17 digitizing)
- `geographies` (13 records: Karnataka + Bengaluru + 8 clusters + 3 projects)
- `factors` (4 records: Land, Labour, Capital, Organisation)

**Fact Table:**
- `targets` (single source of truth for all metrics)
  - Unique constraint: (vertical_id, geography_id, factor_id, year, metric)
  - Tracks dependencies via parent_target_id
  - Stores formulas and calculation params

**Reference Tables:**
- `conversion_ratios` (15 rules: revenue → employment, employment → land, etc.)
- `geography_conversion_multipliers` (14 rules: location-specific adjustments)
- `apportionment_rules` (37 rules: how to distribute targets geographically)
- `skill_requirements`, `apportionment_constraints`

**Views:**
- `geography_dashboard_view` (pre-aggregated geography metrics)
- `vertical_distribution_view` (pre-aggregated vertical metrics)
- `factor_summary_view` (cross-tabulation of factors)

**Functions:**
- `cascade_factor_targets(revenue_target_id)` - Auto-calculate employment, land, capital from revenue
- `generate_default_apportionment(vertical_id, year)` - Apply historical distribution rules
- `validate_geographic_sum(vertical_id, factor_id, year)` - Ensure totals match
- `refresh_all_views()` - Refresh materialized views after data changes

---

## File Structure

```
KDEM/
├── index.html              # Main entry point (v3.0)
├── index-v2.html          # Old version (backup)
├── styles.css             # Main stylesheet with KDEM colors
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
├── .env                   # Supabase credentials
├── claude.md              # This file
│
├── src/
│   ├── main.js                    # App initialization & routing
│   ├── lib/
│   │   └── supabaseClient.js      # Supabase connection & helpers
│   ├── services/
│   │   └── dataService.js         # Data fetching & aggregation layer
│   └── tabs/
│       ├── overview.js            # Tab 1: Overview (5 pillars)
│       ├── vertical.js            # Tabs 2-5: Vertical details
│       ├── geography.js           # Tabs 6-7: Geography views
│       ├── factors.js             # Tab 8: Factors of production
│       └── roadmap.js             # Tab 9: Strategic roadmap
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_dimension_tables.sql        # Create dimensions
│   │   ├── 002_fact_tables.sql             # Create targets & references
│   │   ├── 003_functions_and_views.sql     # Create functions & views
│   │   ├── 004_seed_conversion_ratios.sql  # Seed conversion data
│   │   └── 005_seed_apportionment_rules.sql # Seed apportionment data
│   ├── seed/
│   │   ├── 001_conversion_ratios.sql
│   │   └── 002_apportionment_rules.sql
│   └── seed.sql           # Combined seed file
│
└── docs/
    ├── IMPLEMENTATION_GUIDE.md  # For project managers
    ├── TECHNICAL_GUIDE.md       # For developers
    ├── ADMIN_GUIDE.md           # For data managers
    └── README.md                # Documentation index
```

---

## Development Workflow

### Starting Development

```bash
# Ensure Node.js 20+ is active
nvm use 20

# Install dependencies
npm install

# Start dev server (opens http://localhost:3000/KDEM/)
npm run dev
```

### Working with Supabase

```bash
# Link to Supabase project
supabase link --project-ref xtuedwbeflrbkbknakgv

# Push new migrations
supabase db push

# Pull remote schema changes
supabase db pull
```

### Building for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (automatic via GitHub)
git push origin main
```

---

## Code Style Guidelines

### General Principles
1. **No emojis in code** (only in UI when explicitly requested)
2. **Simple, focused solutions** - avoid over-engineering
3. **No premature abstractions** - don't create helpers for one-time use
4. **Trust the database** - Supabase handles validation, let it
5. **Prefer editing over creating** - modify existing files when possible

### JavaScript Style

```javascript
// Use ES6 modules
import { db } from '../lib/supabaseClient.js'

// Async/await for data fetching
export async function fetchData() {
    try {
        const { data, error } = await db.verticals().select('*')
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Return HTML strings from tab renderers
export async function renderTab(appData) {
    return `
        <div class="tab-content">
            <h2>Title</h2>
            <p>Content</p>
        </div>
    `
}
```

### CSS Style

```css
/* Use CSS variables for colors */
.button {
    background-color: var(--primary-color);
    color: white;
}

/* Mobile-first responsive design */
.grid {
    display: grid;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* BEM-like naming for components */
.metric-card { }
.metric-card__header { }
.metric-card__value { }
.metric-card--highlighted { }
```

---

## Common Tasks

### Adding a New Tab

1. **Create tab renderer** in `src/tabs/new-tab.js`:
```javascript
export async function renderNewTab(appData) {
    return `<div class="new-tab"><h2>Content</h2></div>`
}
```

2. **Import in main.js**:
```javascript
import { renderNewTab } from './tabs/new-tab.js'
```

3. **Add to switch statement** in main.js:
```javascript
case 'new-tab':
    content = await renderNewTab(appData)
    break
```

4. **Add navigation button** in index.html:
```html
<button class="nav-btn" data-tab="new-tab">
    <span class="tab-icon">🔥</span>
    <span class="tab-label">New Tab</span>
</button>
```

### Adding a Data Service Function

Add to `src/services/dataService.js`:

```javascript
export async function fetchNewData(filters = {}) {
    try {
        let query = db.tableName().select('*')

        if (filters.someFilter) {
            query = query.eq('column', filters.someFilter)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
```

### Creating a Database Migration

1. **Create new migration file**:
```bash
# File: supabase/migrations/006_new_feature.sql
```

2. **Write SQL**:
```sql
-- Add new column
ALTER TABLE targets ADD COLUMN new_field TEXT;

-- Create new table
CREATE TABLE new_table (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);
```

3. **Push to Supabase**:
```bash
supabase db push
```

### Updating Seed Data

Edit the appropriate seed file in `supabase/seed/`, then:

1. Copy to migrations folder:
```bash
cp supabase/seed/001_conversion_ratios.sql supabase/migrations/006_update_ratios.sql
```

2. Push migration:
```bash
supabase db push
```

---

## Tab-Specific Guidelines

### Overview Tab
- **Purpose:** High-level summary of entire digital economy
- **Key Elements:** Total metrics, 5-pillar breakdown, geographic preview, progress bars
- **Data Sources:** `getVerticalOverview()`, `getTotalMetrics()`

### Vertical Tabs (IT Exports, IT Domestic, ESDM, Startups)
- **Purpose:** Deep dive into specific vertical
- **Key Elements:** Vertical metrics, geographic distribution, sub-sectors, apportionment rules
- **Data Sources:** `getVerticalDetails(verticalId, year)`

### Geography Tabs (Bengaluru, Clusters)
- **Purpose:** Geographic analysis
- **Key Elements:** Location metrics, vertical breakdown, tier classification
- **Data Sources:** `getGeographyDetails(geographyId, year)`, `getGeographyOverview(year)`

### Factors Tab
- **Purpose:** Explain 4 factors of production
- **Key Elements:** Factor descriptions, dependencies, conversion ratios
- **Data Sources:** `fetchFactors()`, `fetchConversionRatios()`

### Roadmap Tab
- **Purpose:** Strategic timeline and planning
- **Key Elements:** Timeline, milestones, interventions, investments, risks
- **Data Sources:** Static content (for now)

---

## Admin Interface (Phase 3 - Not Yet Built)

### Requirements
- **Authentication:** Password-protected (simple auth, not Supabase auth)
- **Target Setting:** Form to create revenue targets
- **Auto-Apportionment:** Apply default geographic distribution
- **AI Predictions:** Use Claude API to suggest apportionments
- **Cascade:** Auto-calculate employment, land, capital from revenue
- **Preview:** Show impact before saving
- **Validation:** Check totals match, warn on conflicts

### Planned Structure
```
admin/
├── index.html              # Admin dashboard
├── styles.css             # Admin-specific styles
├── main.js                # Admin app logic
└── components/
    ├── auth.js            # Simple password check
    ├── target-form.js     # Target creation form
    ├── apportionment.js   # Geographic distribution UI
    └── preview.js         # Preview before save
```

---

## Supabase Configuration

### Environment Variables
```bash
# .env file
VITE_SUPABASE_URL=https://xtuedwbeflrbkbknakgv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Client Setup
```javascript
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const db = {
    verticals: () => supabase.from('verticals'),
    geographies: () => supabase.from('geographies'),
    factors: () => supabase.from('factors'),
    targets: () => supabase.from('targets'),
    // ... more tables
}

export const rpc = {
    cascadeFactorTargets: (id) =>
        supabase.rpc('cascade_factor_targets', { revenue_target_id: id }),
    // ... more functions
}
```

---

## Testing

### Manual Testing Checklist

**Dashboard Load:**
- [ ] All 9 tabs render without errors
- [ ] Navigation switches between tabs correctly
- [ ] Data loads from Supabase
- [ ] Colors match KDEM brand (orange/amber/blue)

**Data Display:**
- [ ] Dimension tables show correct counts (25 verticals, 13 geographies, 4 factors)
- [ ] Conversion ratios table displays 15 rules
- [ ] Apportionment rules table displays 37 rules
- [ ] Empty targets show "0" or "No data" message

**Responsive Design:**
- [ ] Mobile view (< 768px): Tabs scroll horizontally
- [ ] Tablet view (768px - 1024px): 2-column grids
- [ ] Desktop view (> 1024px): 3-4 column grids

### Connection Test
Open http://localhost:3000/test-connection.html to verify:
- Supabase connection works
- All tables are accessible
- Database functions are operational

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Check Node version
node --version  # Should be 20+

# Switch to Node 20
nvm use 20

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart server
npm run dev
```

### Supabase Connection Errors
1. Check `.env` file has correct URL and anon key
2. Verify Supabase project is running (green status in dashboard)
3. Check browser console for CORS errors
4. Test connection: http://localhost:3000/test-connection.html

### Data Not Showing
1. Check if targets exist in Supabase (Table Editor → targets)
2. Verify year filter (default is 2030)
3. Check browser console for errors
4. Inspect network tab for failed API calls

### CSS Not Updating
1. Hard refresh: Cmd/Ctrl + Shift + R
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check styles.css is being loaded (browser dev tools)

---

## Best Practices

### Performance
1. **Parallel Queries:** Use `Promise.all()` to fetch independent data
2. **Materialized Views:** Use pre-aggregated views for complex queries
3. **Limit Results:** Add `.limit(100)` to large queries
4. **Cache Static Data:** Load verticals/geographies once, reuse across tabs

### Security
1. **Never commit .env:** Already in .gitignore
2. **Use anon key only:** Service role key should never be in frontend code
3. **Row-Level Security:** Will be configured when admin auth is added
4. **Validate User Input:** Sanitize before inserting into database

### Maintainability
1. **Single Responsibility:** Each function does one thing well
2. **DRY Principle:** Extract common patterns into reusable functions
3. **Clear Naming:** Function names describe what they do
4. **Comments:** Explain "why" not "what"
5. **Error Handling:** Always try/catch async operations

---

## Data Sources & References

### Industry Benchmarks
- **NASSCOM:** IT Services employment ratios (20 employees per $1M USD)
- **ICEA:** ESDM manufacturing ratios (100 employees per $1M USD)
- **Real Estate:** 200 sq ft per employee (industry standard)
- **Geography Premium:** Bengaluru 20% land cost premium

### KDEM-Specific Data
- **Apportionment Rules:** Based on PDF Slide 12, 16 (historical 2022-23 split)
- **Verticals Structure:** PDF Slide 3 (5 core pillars definition)
- **Geographic Tiers:** Urban Morph analysis
- **2030 Targets:** $400B revenue, 5M employment

### Documentation
- `docs/IMPLEMENTATION_GUIDE.md` - Overview, restructure plan, 9-tab design
- `docs/TECHNICAL_GUIDE.md` - 3D data model, database schema, query patterns
- `docs/ADMIN_GUIDE.md` - Admin interface design, target setting workflow
- `docs/README.md` - Documentation index

---

## Deployment

### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "src": "/KDEM/(.*)", "dest": "/$1" },
    { "src": "/admin/(.*)", "dest": "/admin/$1" }
  ]
}
```

### Environment Variables (Vercel)
Set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### GitHub Integration
- **Main Branch:** Automatic deployment to production
- **Preview Deployments:** All pull requests get preview URLs

---

## Future Enhancements

### Phase 4: Advanced Features (Post-Admin)
1. **Real-time Updates:** Use Supabase subscriptions for live data
2. **Export Functionality:** Download reports as PDF/Excel
3. **Comparison Views:** Year-over-year, target vs actual
4. **Data Visualizations:** Charts using Chart.js or D3.js
5. **Search & Filter:** Advanced filtering across all dimensions

### Phase 5: AI Integration
1. **Predictive Analytics:** Forecast future trends
2. **Anomaly Detection:** Flag unusual patterns
3. **Natural Language Queries:** Ask questions in plain English
4. **Automated Insights:** Generate executive summaries

---

## Contact & Support

**Project:** Karnataka Digital Economy Mission Dashboard v3.0

**Technology Stack:**
- Frontend: Vite + Vanilla JS
- Backend: Supabase (PostgreSQL)
- Deployment: Vercel

**Supabase Project:**
- URL: https://xtuedwbeflrbkbknakgv.supabase.co
- Dashboard: https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv

**Key Documentation:**
- Setup: `SETUP.md`, `SUPABASE_SETUP.md`
- Implementation: `docs/IMPLEMENTATION_GUIDE.md`
- Technical: `docs/TECHNICAL_GUIDE.md`
- Admin: `docs/ADMIN_GUIDE.md`

---

**Last Updated:** February 5, 2026
**Dashboard Version:** v3.0
**Database Schema Version:** 005 (seed data loaded)
