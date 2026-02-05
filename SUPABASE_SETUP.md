# Complete Supabase Setup for KDEM Project

Your Supabase project is ready! Let's complete the setup.

**Project URL:** https://xtuedwbeflrbkbknakgv.supabase.co

---

## Step 1: Get Your Anon Key ⚡

1. Go to your Supabase project: https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv

2. Click **"Settings"** (gear icon) in the left sidebar

3. Click **"API"** under Project Settings

4. Copy the **"anon public"** key (it starts with `eyJhbG...`)
   - **NOT** the service_role key!
   - The anon key is safe to use in frontend code

5. Paste it into `.env` file (replace `YOUR_ANON_KEY_HERE`)

---

## Step 2: Run Database Migrations 🗄️

I'll provide you with 3 options - choose what works best:

### Option A: Copy-Paste Method (Easiest - 5 minutes)

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv/sql

2. Click **"New query"**

3. **Migration 1 - Dimension Tables:**
   - Open file: `supabase/migrations/001_dimension_tables.sql`
   - Copy entire contents (Cmd/Ctrl + A, then Cmd/Ctrl + C)
   - Paste into SQL Editor
   - Click **"Run"** (or Cmd/Ctrl + Enter)
   - Wait for "Success" message (~2 seconds)

4. **Migration 2 - Fact Tables:**
   - Click **"New query"** again
   - Open file: `supabase/migrations/002_fact_tables.sql`
   - Copy entire contents
   - Paste into SQL Editor
   - Click **"Run"**
   - Wait for "Success"

5. **Migration 3 - Functions & Views:**
   - Click **"New query"** again
   - Open file: `supabase/migrations/003_functions_and_views.sql`
   - Copy entire contents
   - Paste into SQL Editor
   - Click **"Run"**
   - Wait for "Success"

6. **Verify Tables Created:**
   - Click **"Table Editor"** in left sidebar
   - You should see these tables:
     ```
     ✓ apportionment_constraints
     ✓ apportionment_rules
     ✓ conversion_ratios
     ✓ factors
     ✓ geographies
     ✓ geography_conversion_multipliers
     ✓ skill_requirements
     ✓ targets
     ✓ verticals
     ```
   - Plus 3 views:
     ```
     ✓ geography_dashboard_view
     ✓ vertical_distribution_view
     ✓ factor_summary_view
     ```

### Option B: Using Supabase CLI (For advanced users)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref xtuedwbeflrbkbknakgv

# Push migrations
supabase db push
```

---

## Step 3: Load Seed Data 🌱

Still in SQL Editor, run seed data:

1. **Seed 1 - Conversion Ratios:**
   - Click **"New query"**
   - Open file: `supabase/seed/001_conversion_ratios.sql`
   - Copy & paste entire contents
   - Click **"Run"**

2. **Seed 2 - Apportionment Rules:**
   - Click **"New query"**
   - Open file: `supabase/seed/002_apportionment_rules.sql`
   - Copy & paste entire contents
   - Click **"Run"**

3. **Verify Seed Data:**
   Run this query in SQL Editor:
   ```sql
   SELECT 'conversion_ratios' as table, COUNT(*) as count FROM conversion_ratios
   UNION ALL
   SELECT 'apportionment_rules', COUNT(*) FROM apportionment_rules
   UNION ALL
   SELECT 'geography_multipliers', COUNT(*) FROM geography_conversion_multipliers
   UNION ALL
   SELECT 'verticals', COUNT(*) FROM verticals
   UNION ALL
   SELECT 'geographies', COUNT(*) FROM geographies
   UNION ALL
   SELECT 'factors', COUNT(*) FROM factors;
   ```

   Expected results:
   ```
   conversion_ratios        15
   apportionment_rules      40+
   geography_multipliers    14
   verticals                25
   geographies              13
   factors                  4
   ```

---

## Step 4: Test Connection 🔌

1. Make sure your `.env` file has the anon key filled in

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

4. Open browser to: http://localhost:3000/test-connection.html

5. You should see:
   ```
   ✓ Connection Successful!
   • Verticals: 25 found
   • Geographies: 13 found
   • Factors: 4 found
   ```

---

## Step 5: Quick Database Test 🧪

Run this in Supabase SQL Editor to test functions:

```sql
-- Test 1: View dimensions
SELECT id, name, category FROM verticals WHERE category = 'core';

-- Test 2: View geographies
SELECT id, name, tier FROM geographies WHERE tier IS NOT NULL;

-- Test 3: View conversion ratios
SELECT vertical_id, from_metric, to_metric, ratio, unit
FROM conversion_ratios
WHERE vertical_id = 'it-exports';

-- Test 4: View apportionment rules for IT Exports
SELECT to_geography_id, percentage_allocation, basis
FROM apportionment_rules
WHERE vertical_id = 'it-exports' AND from_geography_id = 'karnataka'
ORDER BY percentage_allocation DESC;

-- Test 5: Test generate_default_apportionment function
SELECT * FROM generate_default_apportionment('it-exports', 2030);
```

All queries should return data without errors!

---

## Troubleshooting 🔧

### Error: "relation does not exist"
- You didn't run all 3 migration files
- Run them again in order (001, 002, 003)

### Error: "syntax error near..."
- Copy/paste issue - some characters got corrupted
- Open the .sql file again and copy fresh
- Make sure you copied the ENTIRE file

### Error: "duplicate key value violates unique constraint"
- You ran the same migration/seed twice
- It's okay! The data is already there
- Just continue to next step

### Can't see tables in Table Editor
- Refresh the page
- Click "Table Editor" again
- Tables might be there but not showing - try running a query

### Connection test fails
- Check `.env` has correct anon key (starts with `eyJhbG`)
- Make sure you're using anon key, not service_role key
- Verify project URL is exactly: https://xtuedwbeflrbkbknakgv.supabase.co
- Try restarting dev server: Ctrl+C then `npm run dev`

---

## What's Next? 🚀

Once connection test passes, you're ready for:

### Phase 2: Build the Dashboard
- Create data service layer (fetch from Supabase)
- Build UI components
- Create 9-tab navigation
- Display 5-pillar framework

### OR: Import PDF Data First (Recommended)
- I can create a script to import the PDF targets as actual data
- This will populate the `targets` table with real values
- Then the dashboard will show real data immediately

**What would you like to do next?**
1. "Import PDF data" - I'll create import script
2. "Start building UI" - I'll create component templates
3. "Test database more" - I'll create more test queries

---

**Current Status:**
- ✅ Supabase project created
- ✅ .env file configured with project URL
- ⏳ Waiting for anon key
- ⏳ Waiting to run migrations
- ⏳ Waiting to run seed data
- ⏳ Waiting to test connection

**Follow the steps above and let me know when you're done!** 🎉
