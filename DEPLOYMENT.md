# KDEM Dashboard v3.0 - Deployment Guide

This guide covers deploying the KDEM Dashboard to production environments.

## Prerequisites

### Required Software
- **Node.js**: >= 18.0.0 (recommended: 20.11.0)
- **npm**: >= 8.0.0
- **Git**: For version control

### Required Accounts
- **Vercel Account**: For frontend hosting
- **Supabase Account**: For database and backend

## Node.js Version Requirements

The dashboard requires Node.js 18+ due to dependencies:
- `@supabase/supabase-js` requires Node >= 20.0.0
- `vite` requires Node >= 18.0.0
- `rollup` requires Node >= 18.0.0

### Upgrading Node.js

**Using nvm (recommended):**
```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 20 (recommended)
nvm install 20

# Use Node 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

**Using Homebrew (macOS):**
```bash
brew install node@20
brew link --overwrite node@20
```

**Direct Download:**
Visit https://nodejs.org/ and download the LTS version (20.x).

### Current Node Version Check
If you see errors like "crypto$2.getRandomValues is not a function", your Node version is too old.

```bash
node --version  # Should be >= 18.0.0
```

## Environment Configuration

### 1. Get Supabase Credentials

1. Go to your Supabase project at https://app.supabase.com
2. Navigate to Settings > API
3. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - `anon` `public` key

### 2. Create Environment Files

**For local development (.env):**
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**For Vercel (set in dashboard or CLI):**
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

### 1. Initialize Supabase

```bash
# Link to your Supabase project
npx supabase link --project-ref your-project-ref

# Run all migrations
npx supabase db push
```

### 2. Verify Database

Check that these tables exist:
- `verticals`
- `geographies`
- `factors`
- `targets`
- `conversion_ratios`
- `skill_requirements`

Run a test query in Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM targets WHERE year = 2030;
```

Should return a count > 0 (cluster targets should be populated).

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Access at: http://localhost:3000

### 3. Test Build
```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

### 4. Preview Production Build
```bash
npm run preview
```

Access at: http://localhost:4173

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node Version**: 20.x (set in Project Settings > General)

4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. Click "Deploy"

### Option 3: Deploy via GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will auto-deploy on every push to main branch

## Post-Deployment Verification

### 1. Check Build Success
- Verify Vercel build logs show no errors
- Check that all pages load correctly

### 2. Test Database Connection
- Navigate to Overview tab
- Verify pillar cards show revenue/employment data (not zeros)
- Check Beyond Bengaluru tab shows cluster data

### 3. Test Navigation
- Click through all categories (Strategy, Verticals, Geography, Factors)
- Verify tab highlighting works correctly
- Test mobile menu on small screens

### 4. Check Performance
- Run Lighthouse audit (aim for 90+ performance score)
- Check Network tab for reasonable bundle sizes
- Verify no console errors

## Troubleshooting

### Build Fails with "crypto$2.getRandomValues is not a function"
**Cause**: Node.js version is too old (< 18.0.0)

**Fix**: Upgrade Node.js to version 18+ or 20+ (see Node.js Version Requirements above)

### Supabase Connection Errors
**Cause**: Missing or incorrect environment variables

**Fix**:
1. Verify `.env` file exists with correct values
2. Check Supabase project URL and anon key
3. Ensure Vercel has environment variables set

### Beyond Bengaluru Shows Zeros
**Cause**: Database migration 007 not applied

**Fix**:
```bash
npx supabase db push
```

### Mobile Menu Not Working
**Cause**: CSS selector mismatch

**Fix**: Verify styles.css targets `.secondary-nav` not `.tab-navigation-grid`

### Charts Not Displaying
**Cause**: Bar heights using percentages instead of pixels

**Fix**: Verify `src/tabs/overview.js` uses `height: ${heightPx}px` not `height: ${percent}%`

## Production Configuration

### Custom Domain
1. In Vercel project settings, go to Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

### Analytics
Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

In `src/main.js`:
```javascript
import { inject } from '@vercel/analytics'
inject()
```

### Monitoring
- Enable Vercel Speed Insights in project settings
- Set up Supabase monitoring alerts
- Configure error tracking (optional: Sentry)

## Rollback Strategy

### Vercel Deployments
All deployments are immutable and can be rolled back instantly:
1. Go to Vercel project > Deployments
2. Find the previous successful deployment
3. Click "..." > "Promote to Production"

### Database Migrations
To rollback database changes:
```bash
# Reset to previous migration
npx supabase db reset
```

**Warning**: This will delete all data. Only use in emergencies.

## CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use anon key, not service role key** - Only expose anon key to frontend
3. **Enable RLS (Row Level Security)** in Supabase for all tables
4. **Rotate keys periodically** - Update in Vercel environment variables
5. **Use HTTPS only** - Enforced by Vercel automatically

## Support

For deployment issues:
- Check Vercel deployment logs
- Check Supabase logs in Dashboard
- Review GitHub Issues: https://github.com/anthropics/claude-code/issues
- Consult README.md for development setup

## Version Information

- Dashboard Version: 3.0.0
- Node.js Requirement: >= 18.0.0
- Vite Version: 5.0.11
- Supabase JS Version: 2.39.3
