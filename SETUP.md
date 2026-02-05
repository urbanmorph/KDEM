# KDEM v3.0 Setup Guide

Quick setup instructions to get the KDEM dashboard running locally.

---

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Supabase account** ([Sign up free](https://supabase.com))
- **Git** (for version control)

---

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Vite (development server)
- Supabase JS client
- Build tools

---

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Enter project details:
   - **Name:** `kdem-dashboard`
   - **Database Password:** (choose a strong password)
   - **Region:** Choose closest to you (e.g., `ap-south-1` for India)
4. Click "Create new project"
5. Wait ~2 minutes for project to initialize

---

## Step 3: Get Supabase Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon)
2. Click **"API"** in the left sidebar
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and paste your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## Step 5: Run Database Migrations

### Option A: Using Supabase SQL Editor (Recommended for first-time setup)

1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Copy and paste the contents of each migration file in order:

   **File 1:** `supabase/migrations/001_dimension_tables.sql`
   ```sql
   -- Copy entire contents and paste here
   ```
   Click **"Run"** (or press Cmd/Ctrl + Enter)

   **File 2:** `supabase/migrations/002_fact_tables.sql`
   ```sql
   -- Copy entire contents and paste here
   ```
   Click **"Run"**

   **File 3:** `supabase/migrations/003_functions_and_views.sql`
   ```sql
   -- Copy entire contents and paste here
   ```
   Click **"Run"**

5. Verify tables were created:
   - Click **"Table Editor"** in left sidebar
   - You should see: `verticals`, `geographies`, `factors`, `targets`, etc.

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref xxxxx

# Run migrations
supabase db push
```

---

## Step 6: Seed Initial Data

1. Go to **SQL Editor** in Supabase dashboard
2. Run seed files in order:

   **Seed 1:** `supabase/seed/001_conversion_ratios.sql`
   ```sql
   -- Copy and paste, then Run
   ```

   **Seed 2:** `supabase/seed/002_apportionment_rules.sql`
   ```sql
   -- Copy and paste, then Run
   ```

3. Verify data:
   ```sql
   -- Check conversion ratios
   SELECT * FROM conversion_ratios LIMIT 10;

   -- Check apportionment rules
   SELECT * FROM apportionment_rules WHERE vertical_id = 'it-exports';

   -- Check dimensions
   SELECT COUNT(*) FROM verticals;  -- Should be ~25
   SELECT COUNT(*) FROM geographies; -- Should be ~13
   SELECT COUNT(*) FROM factors;    -- Should be 4
   ```

---

## Step 7: Start Development Server

```bash
npm run dev
```

This will:
- Start Vite development server on http://localhost:3000
- Enable hot module replacement (HMR)
- Open browser automatically

You should see the KDEM dashboard (currently v2.0 - we'll build v3.0 next).

---

## Step 8: Verify Supabase Connection

Create a test file `test-connection.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Supabase Connection</title>
</head>
<body>
  <h1>Supabase Connection Test</h1>
  <div id="status">Testing...</div>

  <script type="module">
    import { supabase, db } from './src/lib/supabaseClient.js'

    async function testConnection() {
      const statusEl = document.getElementById('status')

      try {
        // Test 1: Fetch verticals
        const { data: verticals, error: vError } = await db.verticals().select('*')
        if (vError) throw vError

        // Test 2: Fetch geographies
        const { data: geographies, error: gError } = await db.geographies().select('*')
        if (gError) throw gError

        // Test 3: Fetch factors
        const { data: factors, error: fError } = await db.factors().select('*')
        if (fError) throw fError

        statusEl.innerHTML = `
          <h2 style="color: green;">✓ Connection Successful!</h2>
          <ul>
            <li>Verticals: ${verticals.length} found</li>
            <li>Geographies: ${geographies.length} found</li>
            <li>Factors: ${factors.length} found</li>
          </ul>
          <p>Database is ready! You can now proceed with building the dashboard.</p>
        `
      } catch (error) {
        statusEl.innerHTML = `
          <h2 style="color: red;">✗ Connection Failed</h2>
          <p>${error.message}</p>
          <p>Check your .env file and Supabase configuration.</p>
        `
      }
    }

    testConnection()
  </script>
</body>
</html>
```

Visit http://localhost:3000/test-connection.html

You should see "✓ Connection Successful!" with dimension counts.

---

## Next Steps

### ✅ Phase 1 Complete!

You now have:
- ✓ Vite development environment
- ✓ Supabase database with schema
- ✓ Connection verified
- ✓ Initial seed data loaded

### 🚀 Continue to Phase 2:

**Build the 9-tab dashboard:**

1. Read `docs/IMPLEMENTATION_GUIDE.md` sections on tab structure
2. Create UI components (see `docs/TECHNICAL_GUIDE.md` for data service examples)
3. Build tab navigation
4. Fetch data from Supabase and display

**Recommended order:**
1. Tab 1 (Overview) - Use existing data + new 5-pillar breakdown
2. Tab 6 (Bengaluru) - Simpler, single geography
3. Tab 7 (Beyond Bengaluru) - Adapt existing cluster cards
4. Tabs 2-5 (Verticals) - Build data-driven vertical views
5. Tabs 8-9 (Factors, Roadmap) - Consolidate existing content

---

## Troubleshooting

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Supabase connection failed"
1. Check `.env` file exists and has correct values
2. Verify project URL starts with `https://`
3. Verify anon key is the **public** key (not service role key)
4. Check Supabase project is running (green status in dashboard)

### "Table does not exist" errors
- Make sure you ran all 3 migration files in order
- Check in Supabase **Table Editor** that tables exist
- Try running migrations again (they're idempotent)

### Database migration errors
- Read error message carefully
- Most common: syntax errors from copy/paste issues
- Solution: Copy SQL again, ensure no missing characters
- Run each file individually to isolate the problem

---

## Development Workflow

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Refresh materialized views (after data changes)
# Run in Supabase SQL Editor:
SELECT refresh_all_views();
```

---

## Useful Commands

### View database schema
```sql
-- List all tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;

-- View table structure
\d targets

-- Count records
SELECT
  'verticals' as table, COUNT(*) as count FROM verticals
UNION ALL
SELECT 'geographies', COUNT(*) FROM geographies
UNION ALL
SELECT 'factors', COUNT(*) FROM factors
UNION ALL
SELECT 'targets', COUNT(*) FROM targets;
```

### Test database functions
```sql
-- Test generate_default_apportionment
SELECT * FROM generate_default_apportionment('it-exports', 2030);

-- Test cascade (after creating a revenue target)
SELECT cascade_factor_targets('revenue-target-id-here');
```

---

## Support

- **Documentation:** `docs/IMPLEMENTATION_GUIDE.md`
- **Technical Reference:** `docs/TECHNICAL_GUIDE.md`
- **Admin Guide:** `docs/ADMIN_GUIDE.md`
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/guide/

---

**Setup complete! Ready to build the v3.0 dashboard.** 🎉
