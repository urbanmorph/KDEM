# KDEM Dashboard API Reference

> **Status:** Internal use only (no public API yet)
> **Version:** 3.0  
> **Last Updated:** February 6, 2026

---

## Overview

The KDEM Dashboard uses Supabase's auto-generated REST API and PostgREST. All data access happens through the data service layer in `src/services/dataService.js`.

**Base URL:** `https://xtuedwbeflrbkbknakgv.supabase.co/rest/v1`  
**Authentication:** Anon key (read-only access)

---

## Data Service Layer

All API calls are abstracted through helper functions in `dataService.js`.

### Core Functions

#### `fetchVerticals(category)`

Fetch all verticals with optional filtering by category.

```javascript
import { fetchVerticals } from '../services/dataService.js'

// Get all verticals
const all = await fetchVerticals()

// Get only core pillars
const core = await fetchVerticals('core')

// Get only digitizing sectors
const digitizing = await fetchVerticals('digitizing')
```

**Response:**
```json
[
  {
    "id": "it-exports",
    "name": "IT Exports",
    "category": "core",
    "parent_id": null,
    "description": "IT Products, Services, BPM and GCC - Export Revenue",
    "metadata": {}
  }
]
```

---

#### `fetchGeographies(tier)`

Fetch geographies with optional tier filtering.

```javascript
import { fetchGeographies } from '../services/dataService.js'

// Get all geographies
const all = await fetchGeographies()

// Get only Tier 1 clusters
const tier1 = await fetchGeographies('tier1-invest-aggressively')
```

**Response:**
```json
[
  {
    "id": "mysuru",
    "name": "Mysuru",
    "type": "urban-tier2",
    "tier": "tier1-invest-aggressively",
    "region": "south-karnataka",
    "parent_id": null,
    "metadata": {}
  }
]
```

---

#### `fetchTargets(filters)`

Fetch targets with flexible filtering.

```javascript
import { fetchTargets } from '../services/dataService.js'

// Get all 2030 targets
const targets2030 = await fetchTargets({ year: 2030 })

// Get ESDM targets for Mysuru
const esdmMysuru = await fetchTargets({
  verticalId: 'esdm',
  geographyId: 'mysuru',
  year: 2030
})

// Get all employment targets
const employment = await fetchTargets({
  year: 2030,
  factorId: 'labour'
})
```

**Parameters:**
- `verticalId` (string, optional)
- `geographyId` (string, optional)
- `factorId` (string, optional)
- `year` (integer, optional)

**Response:**
```json
[
  {
    "id": "t001",
    "vertical_id": "esdm",
    "geography_id": "mysuru",
    "factor_id": "labour",
    "year": 2030,
    "metric": "headcount",
    "value": 15000,
    "unit": "employees",
    "data_source": "KDEM Strategic Plan 2026",
    "confidence_rating": 4
  }
]
```

---

### Aggregation Functions

#### `getVerticalOverview(year)`

Get aggregated metrics by vertical.

```javascript
import { getVerticalOverview } from '../services/dataService.js'

const overview = await getVerticalOverview(2030)
```

**Response:**
```json
[
  {
    "id": "esdm",
    "name": "ESDM",
    "category": "core",
    "revenue_usd_bn": 105,
    "employment": 800000,
    "land_sqft": 26666666,
    "capital_inr_cr": 106666,
    "target_count": 48
  }
]
```

---

#### `getGeographyOverview(year)`

Get aggregated metrics by geography.

```javascript
import { getGeographyOverview } from '../services/dataService.js'

const overview = await getGeographyOverview(2030)
```

**Response:**
```json
[
  {
    "id": "mysuru",
    "name": "Mysuru",
    "tier": "tier1-invest-aggressively",
    "region": "south-karnataka",
    "revenue_usd_bn": 10,
    "employment": 150000,
    "land_sqft": 5000000,
    "capital_inr_cr": 20000,
    "target_count": 16
  }
]
```

---

#### `getTotalMetrics(year)`

Get total aggregated metrics across all dimensions.

```javascript
import { getTotalMetrics } from '../services/dataService.js'

const totals = await getTotalMetrics(2030)
```

**Response:**
```json
{
  "total_revenue_usd_bn": 400,
  "total_employment": 5000000,
  "total_land_sqft": 500000000,
  "total_capital_inr_cr": 2000000,
  "target_count": 248
}
```

---

#### `getVerticalDetails(verticalId, year)`

Get detailed breakdown for a specific vertical.

```javascript
import { getVerticalDetails } from '../services/dataService.js'

const details = await getVerticalDetails('esdm', 2030)
```

**Response:**
```json
{
  "vertical": {
    "id": "esdm",
    "name": "ESDM",
    "category": "core"
  },
  "totals": {
    "revenue_usd_bn": 105,
    "employment": 800000,
    "land_sqft": 26666666,
    "capital_inr_cr": 106666
  },
  "geographicBreakdown": [
    {
      "geography": { "id": "bengaluru", "name": "Bengaluru" },
      "revenue_usd_bn": 63,
      "employment": 480000,
      "land_sqft": 16000000,
      "capital_inr_cr": 64000
    }
  ],
  "apportionmentRules": [...]
}
```

---

#### `getGeographyDetails(geographyId, year)`

Get detailed breakdown for a specific geography.

```javascript
import { getGeographyDetails } from '../services/dataService.js'

const details = await getGeographyDetails('mysuru', 2030)
```

**Response:**
```json
{
  "geography": {
    "id": "mysuru",
    "name": "Mysuru",
    "tier": "tier1-invest-aggressively"
  },
  "totals": {
    "revenue_usd_bn": 10,
    "employment": 150000,
    "land_sqft": 5000000,
    "capital_inr_cr": 20000
  },
  "verticalBreakdown": [
    {
      "vertical": { "id": "esdm", "name": "ESDM" },
      "revenue_usd_bn": 6,
      "employment": 90000,
      "land_sqft": 3000000,
      "capital_inr_cr": 12000
    }
  ]
}
```

---

## Direct Supabase API

For advanced use cases, you can use Supabase directly.

### Configuration

```javascript
import { supabase, db } from '../lib/supabaseClient.js'

// Access tables
const { data, error } = await db.targets().select('*')

// With filters
const { data, error } = await db.targets()
  .select('*')
  .eq('year', 2030)
  .eq('vertical_id', 'esdm')
```

### Query Examples

#### Get All Targets for 2030
```javascript
const { data, error } = await db.targets()
  .select('*')
  .eq('year', 2030)
  .order('vertical_id', { ascending: true })
```

#### Join with Verticals
```javascript
const { data, error } = await db.targets()
  .select(`
    *,
    vertical:verticals(id, name),
    geography:geographies(id, name)
  `)
  .eq('year', 2030)
```

#### Aggregate Query
```javascript
const { data, error } = await db.targets()
  .select('vertical_id, metric, value')
  .eq('year', 2030)
  .eq('metric', 'revenue')
```

---

## Database Functions (RPC)

The dashboard uses PostgreSQL functions for complex operations.

### `cascade_factor_targets(revenue_target_id)`

Automatically calculate labor, land, and capital targets from a revenue target.

```javascript
import { rpc } from '../lib/supabaseClient.js'

const result = await rpc.cascadeFactorTargets('t-esdm-mysuru-2030-revenue')
```

**Response:**
```json
{
  "revenue": "t-esdm-mysuru-2030-revenue",
  "labour": "t-esdm-mysuru-2030-labour",
  "land": "t-esdm-mysuru-2030-land",
  "capital": "t-esdm-mysuru-2030-capital"
}
```

---

### `validate_geographic_sum(vertical_id, factor_id, year)`

Check if cluster targets sum to Karnataka total.

```javascript
import { rpc } from '../lib/supabaseClient.js'

const isValid = await rpc.validateGeographicSum('esdm', 'labour', 2030)
```

**Response:**
```json
true  // or false with warning
```

---

### `generate_default_apportionment(vertical_id, year)`

Generate geographic distribution based on historical rules.

```javascript
import { rpc } from '../lib/supabaseClient.js'

const apportionment = await rpc.generateDefaultApportionment('it-exports', 2030)
```

**Response:**
```json
[
  { "geography_id": "bengaluru", "percentage": 85, "amount": 194.65 },
  { "geography_id": "mysuru", "percentage": 3, "amount": 6.87 },
  { "geography_id": "mangaluru", "percentage": 4, "amount": 9.16 }
]
```

---

## Real-Time Subscriptions

Subscribe to data changes for live updates.

```javascript
import { supabase } from '../lib/supabaseClient.js'

// Subscribe to target changes
const subscription = supabase
  .channel('targets-changes')
  .on('postgres_changes', 
    { 
      event: '*', 
      schema: 'public', 
      table: 'targets',
      filter: 'year=eq.2030'
    },
    (payload) => {
      console.log('Target changed:', payload)
      // Update UI
    }
  )
  .subscribe()

// Unsubscribe when done
subscription.unsubscribe()
```

---

## Rate Limits

**Supabase Free Tier:**
- 500 MB database storage
- 2 GB bandwidth per month
- 50,000 monthly active users
- Unlimited API requests (with fair use)

**Current Usage:**
- Database: ~50 MB
- Bandwidth: ~500 MB/month
- Users: Read-only public dashboard

---

## Error Handling

All data service functions use try/catch:

```javascript
try {
  const data = await fetchTargets({ year: 2030 })
  // Success
} catch (error) {
  console.error('Error fetching targets:', error)
  // Error is already logged in dataService
  throw error
}
```

**Common Errors:**
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Invalid API key
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Database error

---

## Best Practices

### 1. Use Data Service Layer

**✅ Good:**
```javascript
import { fetchTargets } from '../services/dataService.js'
const targets = await fetchTargets({ year: 2030 })
```

**❌ Bad:**
```javascript
import { supabase } from '../lib/supabaseClient.js'
const { data } = await supabase.from('targets').select('*')
```

### 2. Handle Errors Gracefully

```javascript
try {
  const data = await fetchTargets({ year: 2030 })
  if (!data || data.length === 0) {
    // Show "No data" message
    return
  }
  // Render data
} catch (error) {
  // Show error message to user
  showError('Failed to load data. Please try again.')
}
```

### 3. Use Aggregation Functions

**✅ Good:**
```javascript
const overview = await getVerticalOverview(2030)
// Gets pre-aggregated data
```

**❌ Bad:**
```javascript
const targets = await fetchTargets({ year: 2030 })
const aggregated = targets.reduce(/* manual aggregation */)
// Slow, error-prone
```

### 4. Cache When Appropriate

```javascript
// Cache dimension tables (rarely change)
let cachedVerticals = null

async function getVerticals() {
  if (!cachedVerticals) {
    cachedVerticals = await fetchVerticals()
  }
  return cachedVerticals
}
```

---

## Future Public API (v4.0)

**Planned Features:**
- Public REST API endpoints
- API authentication with JWT tokens
- Rate limiting per user
- Webhook notifications for data updates
- GraphQL endpoint (optional)
- CSV/Excel export endpoints

**Example Future Endpoint:**
```
GET https://api.kdem.gov.in/v1/targets?year=2030&vertical=esdm
Authorization: Bearer <api_key>
```

---

## Support

**For Development Questions:**
- Check this API reference
- Review [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md)
- Check [DATA_GUIDE.md](DATA_GUIDE.md) for data model

**For Database Issues:**
- Supabase Dashboard: https://supabase.com/dashboard/project/xtuedwbeflrbkbknakgv
- Check database logs
- Contact technical team

---

**Version:** 3.0  
**Last Updated:** February 6, 2026  
**Maintained by:** KDEM Technical Team
