# KDEM Admin Interface - Design Document
## Intelligent Target Setting with Apportionment & Prediction

---

## Overview

A password-protected admin interface that allows authorized users to:
1. Set high-level targets (e.g., "GCC revenue: $50B by 2030")
2. **Force apportionment** across Geographic and Factor dimensions
3. Get **AI-powered suggestions** for optimal distribution
4. **Preview cascading effects** before committing
5. **Validate consistency** and warn about constraint violations

---

## User Flow

### Scenario: Setting a GCC Target for Karnataka

```
┌──────────────────────────────────────────────────────────┐
│ Step 1: Admin Login                                      │
│ - Email/password or SSO                                  │
│ - Role-based access (admin, editor, viewer)             │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ Step 2: Set High-Level Target                           │
│                                                          │
│ Vertical:    [GCC ▼]                                    │
│ Geography:   [Karnataka ▼]  (top-level)                │
│ Year:        [2030 ▼]                                   │
│ Metric:      [Revenue ▼]                                │
│ Value:       [50] [Billion USD ▼]                       │
│                                                          │
│ [Preview Apportionment →]                               │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ Step 3: Geographic Apportionment (AUTO-POPULATED)        │
│                                                          │
│ "Based on historical data, we've pre-filled defaults"   │
│ "Review and adjust as needed, then proceed"             │
│                                                          │
│ Mode: ⦿ Historical  ○ Percentage  ○ Absolute  ○ AI     │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Cluster          │ %    │ Amount  │ 🤖 Suggested  │  │
│ │──────────────────┼──────┼─────────┼───────────────│  │
│ │ Bengaluru        │ 85%  │ $42.5B  │ 82% (adjust)  │  │
│ │ Mysuru           │ 3%   │ $1.5B   │ 4% (adjust)   │  │
│ │ Mangaluru        │ 5%   │ $2.5B   │ 6% (adjust)   │  │
│ │ HDB Corridor     │ 4%   │ $2.0B   │ 5% (adjust)   │  │
│ │ Kalaburagi       │ 1%   │ $0.5B   │ 1% (✓)        │  │
│ │ Tumakuru         │ 1%   │ $0.5B   │ 1% (✓)        │  │
│ │ Shivamogga       │ 0.5% │ $0.25B  │ 0.5% (✓)      │  │
│ │ Rest of KA       │ 0.5% │ $0.25B  │ 0.5% (✓)      │  │
│ │──────────────────┼──────┼─────────┼───────────────│  │
│ │ TOTAL            │ 100% │ $50B ✓  │               │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ⚠️ Warnings:                                             │
│ • Bengaluru % exceeds historical avg (80%)              │
│ • Mysuru capacity: max $2B by 2030 (current: $1.5B)    │
│                                                          │
│ [< Back]  [Apply AI Suggestions]  [Next: Factors →]    │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ Step 4: Factor Apportionment (AUTO-SUGGESTED)            │
│                                                          │
│ "Based on GCC industry standards, we suggest:"          │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Factor    │ Calculated │ Adjust  │ Basis          │  │
│ │───────────┼────────────┼─────────┼────────────────│  │
│ │ Labour    │ 1M emp     │ [1.2M]  │ 20 emp/$1M     │  │
│ │ Land      │ 100M sqft  │ [100M]  │ 100 sqft/emp   │  │
│ │ Capital   │ ₹20K Cr    │ [₹20K]  │ 40% of revenue │  │
│ │ Org       │ 60 days    │ [45]    │ Target: <60d   │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ℹ️ These are Karnataka totals. Geographic distribution  │
│    will follow the same percentages as revenue.         │
│                                                          │
│ [< Back]  [Customize Ratios]  [Preview All Changes →]  │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│ Step 5: Preview & Commit                                 │
│                                                          │
│ "You are about to create 48 new targets"                │
│                                                          │
│ Changes Summary:                                         │
│ ├─ 8 revenue targets (1 per geography)                  │
│ ├─ 8 labour targets (1 per geography)                   │
│ ├─ 8 land targets (1 per geography)                     │
│ ├─ 8 capital targets (1 per geography)                  │
│ └─ 16 skill breakdown targets (2 per major cluster)     │
│                                                          │
│ Affected Dashboards:                                     │
│ ├─ Tab 2: IT Services (GCC section)                     │
│ ├─ Tab 6: Bengaluru (GCC metrics)                       │
│ ├─ Tab 7: Beyond Bengaluru (all clusters)               │
│ └─ Tab 8: Factors (labour, land, capital)               │
│                                                          │
│ Dependency Updates:                                      │
│ ├─ Karnataka total GCC: $40B → $50B (+25%)              │
│ ├─ IT Services total: $285B → $295B (+3.5%)             │
│ └─ Total Digital Economy: $400B → $410B (+2.5%)         │
│                                                          │
│ ⚠️ Validation Warnings:                                  │
│ • Vision 2030 target exceeded by $10B (need approval)   │
│ • Mysuru labour: +5K employees (verify skilling prog)   │
│                                                          │
│ Audit Log:                                               │
│ Created by: admin@kdem.gov.in                           │
│ Timestamp:  2026-02-05 14:30 IST                        │
│ Reason:     [New GCC Policy 2026 targets          ]     │
│                                                          │
│ [< Back]  [Save as Draft]  [Commit Changes ✓]          │
└─────────────────────────────────────────────────────────┘
```

---

## Architecture

### Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                  ADMIN INTERFACE                         │
├─────────────────────────────────────────────────────────┤
│ Frontend:  React + TypeScript + TailwindCSS             │
│ Forms:     React Hook Form + Zod validation             │
│ State:     Zustand (lightweight state management)       │
│ Charts:    Recharts (preview visualizations)            │
├─────────────────────────────────────────────────────────┤
│                  BACKEND SERVICES                        │
├─────────────────────────────────────────────────────────┤
│ Auth:      Supabase Auth (email/password + RLS)         │
│ Database:  Supabase PostgreSQL (targets, apportionments)│
│ Functions: Supabase Edge Functions (serverless logic)   │
│ AI:        Claude API (prediction suggestions)          │
├─────────────────────────────────────────────────────────┤
│                  PREDICTION ENGINE                       │
├─────────────────────────────────────────────────────────┤
│ Model 1:   Statistical (historical averages)            │
│ Model 2:   Constraint-based (capacity limits)           │
│ Model 3:   AI-powered (Claude Sonnet 4.5)               │
│ Model 4:   Hybrid (combine all 3)                       │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema Extensions

### New Tables

#### `apportionment_rules`
```sql
CREATE TABLE apportionment_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What target does this apply to?
  vertical_id TEXT REFERENCES verticals(id),
  from_geography_id TEXT REFERENCES geographies(id), -- Parent (e.g., 'karnataka')
  to_geography_id TEXT REFERENCES geographies(id),   -- Child (e.g., 'mysuru')

  -- Rule definition
  rule_type TEXT NOT NULL CHECK (rule_type IN ('percentage', 'absolute', 'formula', 'ai-suggested')),

  -- For percentage rules
  percentage_allocation NUMERIC CHECK (percentage_allocation >= 0 AND percentage_allocation <= 100),

  -- For formula rules
  formula TEXT, -- e.g., "(parent_value * cluster_tier_multiplier) / total_tier_weight"
  formula_params JSONB,

  -- Constraints
  min_value NUMERIC,
  max_value NUMERIC,
  capacity_limit NUMERIC,

  -- Metadata
  basis TEXT, -- e.g., "Historical average 2021-2025", "GCC Policy 2024"
  confidence_rating INTEGER CHECK (confidence_rating >= 1 AND confidence_rating <= 5),
  priority INTEGER DEFAULT 50, -- Higher = more important in AI suggestions

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'deprecated')),
  effective_from DATE,
  effective_to DATE,

  -- Audit
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example data
INSERT INTO apportionment_rules (vertical_id, from_geography_id, to_geography_id, rule_type, percentage_allocation, basis, confidence_rating) VALUES
  ('it-gcc', 'karnataka', 'bengaluru', 'percentage', 82, 'Historical average 2020-2025 (NASSCOM)', 5),
  ('it-gcc', 'karnataka', 'mysuru', 'percentage', 4, 'Beyond Bengaluru program target', 3),
  ('it-gcc', 'karnataka', 'mangaluru', 'percentage', 6, 'Beyond Bengaluru program target', 3);
```

#### `apportionment_constraints`
```sql
CREATE TABLE apportionment_constraints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What constraint applies to?
  vertical_id TEXT REFERENCES verticals(id),
  geography_id TEXT REFERENCES geographies(id),
  factor_id TEXT REFERENCES factors(id),

  -- Constraint definition
  constraint_type TEXT NOT NULL CHECK (constraint_type IN ('capacity', 'growth_rate', 'dependency', 'policy')),

  -- For capacity constraints
  max_capacity NUMERIC,
  max_capacity_year INTEGER,
  max_capacity_unit TEXT,

  -- For growth rate constraints
  max_annual_growth_rate NUMERIC, -- e.g., 0.25 = 25% max growth per year

  -- For dependency constraints
  depends_on_target_id TEXT REFERENCES targets(id),
  dependency_ratio NUMERIC, -- e.g., labour <= revenue * 50

  -- For policy constraints
  policy_reference TEXT, -- e.g., "IT Policy 2025-30, Section 4.2"
  policy_hard_limit BOOLEAN DEFAULT false, -- true = cannot exceed, false = warning only

  -- Metadata
  rationale TEXT,
  data_source TEXT,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'deprecated')),

  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example data
INSERT INTO apportionment_constraints (vertical_id, geography_id, factor_id, constraint_type, max_capacity, max_capacity_year, max_capacity_unit, rationale) VALUES
  ('esdm', 'mysuru', NULL, 'capacity', 2.0, 2030, 'billion_usd', 'Mysuru PCB Park + Global Tech Centre capacity limits'),
  ('it-gcc', 'mangaluru', 'land', 'capacity', 5000000, 2030, 'square_feet', 'Mangaluru Tech Park Phase 1+2 max capacity'),
  ('it-gcc', 'karnataka', 'labour', 'growth_rate', 0.20, NULL, NULL, 'Realistic skilling program capacity (20% YoY max)');
```

#### `apportionment_drafts`
```sql
CREATE TABLE apportionment_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Draft metadata
  draft_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'under_review', 'approved', 'rejected', 'committed')),

  -- What's being apportioned
  parent_target_id TEXT REFERENCES targets(id),
  vertical_id TEXT,
  geography_id TEXT,
  year INTEGER,
  total_value NUMERIC,

  -- Apportionment details (JSON for flexibility)
  geographic_apportionment JSONB, -- { "mysuru": {"percentage": 4, "amount": 2.0, "method": "manual"}, ... }
  factor_apportionment JSONB,     -- { "labour": {"value": 40000, "ratio": 20, "method": "calculated"}, ... }

  -- AI suggestions
  ai_suggestions JSONB, -- Store Claude's recommendations
  ai_model_used TEXT,   -- e.g., "claude-sonnet-4-5-20250929"
  ai_generated_at TIMESTAMPTZ,

  -- Validation results
  validation_status TEXT CHECK (validation_status IN ('pending', 'passed', 'failed', 'warnings')),
  validation_errors JSONB,
  validation_warnings JSONB,

  -- Preview data (what targets will be created)
  preview_targets JSONB,
  estimated_impact JSONB, -- { "new_targets": 48, "updated_targets": 5, "total_affected_dashboards": 4 }

  -- Workflow
  created_by TEXT NOT NULL,
  reviewed_by TEXT,
  approved_by TEXT,
  committed_by TEXT,
  committed_at TIMESTAMPTZ,

  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `user_roles`
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'reviewer', 'viewer')),

  -- Permissions
  can_create_targets BOOLEAN DEFAULT false,
  can_edit_targets BOOLEAN DEFAULT false,
  can_delete_targets BOOLEAN DEFAULT false,
  can_approve_drafts BOOLEAN DEFAULT false,
  can_manage_users BOOLEAN DEFAULT false,

  -- Scope (what can they manage)
  allowed_verticals TEXT[], -- NULL = all verticals
  allowed_geographies TEXT[], -- NULL = all geographies

  -- Audit
  assigned_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, role)
);

-- Role-based RLS policies
ALTER TABLE apportionment_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything" ON apportionment_drafts
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Editors can create/edit drafts" ON apportionment_drafts
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
    )
  );
```

---

## Prediction Engine

### Approach: Hybrid Model (4 Layers)

#### Layer 1: Statistical Model (Fast, Baseline)

```sql
CREATE FUNCTION predict_geographic_apportionment(
  p_vertical_id TEXT,
  p_total_value NUMERIC,
  p_year INTEGER
)
RETURNS TABLE (
  geography_id TEXT,
  suggested_percentage NUMERIC,
  suggested_amount NUMERIC,
  confidence INTEGER,
  basis TEXT
) AS $$
BEGIN
  -- Use historical averages from apportionment_rules
  RETURN QUERY
  SELECT
    ar.to_geography_id,
    ar.percentage_allocation,
    p_total_value * (ar.percentage_allocation / 100),
    ar.confidence_rating,
    ar.basis
  FROM apportionment_rules ar
  WHERE ar.vertical_id = p_vertical_id
    AND ar.from_geography_id = 'karnataka'
    AND ar.status = 'active'
  ORDER BY ar.percentage_allocation DESC;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM predict_geographic_apportionment('it-gcc', 50, 2030);
/*
geography_id | suggested_percentage | suggested_amount | confidence | basis
─────────────┼─────────────────────┼─────────────────┼───────────┼──────────────────
bengaluru    | 82                   | 41.0             | 5          | Historical avg
mysuru       | 4                    | 2.0              | 3          | BB program target
mangaluru    | 6                    | 3.0              | 3          | BB program target
*/
```

#### Layer 2: Constraint-Based Model (Feasibility Check)

```sql
CREATE FUNCTION validate_against_constraints(
  p_vertical_id TEXT,
  p_geography_id TEXT,
  p_proposed_value NUMERIC,
  p_year INTEGER
)
RETURNS TABLE (
  is_valid BOOLEAN,
  constraint_type TEXT,
  max_allowed NUMERIC,
  violation_amount NUMERIC,
  severity TEXT -- 'error', 'warning', 'info'
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    CASE
      WHEN ac.max_capacity IS NOT NULL AND p_proposed_value > ac.max_capacity THEN false
      WHEN ac.max_annual_growth_rate IS NOT NULL THEN
        (SELECT p_proposed_value <= prev.value * (1 + ac.max_annual_growth_rate)
         FROM targets prev
         WHERE prev.vertical_id = p_vertical_id
           AND prev.geography_id = p_geography_id
           AND prev.year = p_year - 1)
      ELSE true
    END AS is_valid,
    ac.constraint_type,
    ac.max_capacity,
    CASE
      WHEN ac.max_capacity IS NOT NULL THEN GREATEST(0, p_proposed_value - ac.max_capacity)
      ELSE 0
    END AS violation_amount,
    CASE
      WHEN ac.policy_hard_limit THEN 'error'
      ELSE 'warning'
    END AS severity
  FROM apportionment_constraints ac
  WHERE ac.vertical_id = p_vertical_id
    AND ac.geography_id = p_geography_id
    AND ac.status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM validate_against_constraints('esdm', 'mysuru', 2.5, 2030);
/*
is_valid | constraint_type | max_allowed | violation_amount | severity
─────────┼────────────────┼────────────┼─────────────────┼─────────
false    | capacity        | 2.0         | 0.5              | warning
*/
```

#### Layer 3: AI-Powered Model (Claude API)

```javascript
// Supabase Edge Function: /functions/ai-apportionment-suggest/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.20.0'

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
})

serve(async (req) => {
  const { vertical_id, total_value, year, context } = await req.json()

  // Gather context from database
  const historicalData = await getHistoricalApportionments(vertical_id)
  const constraints = await getConstraints(vertical_id)
  const strategicPriorities = await getStrategicPriorities(year)
  const clusterCapacities = await getClusterCapacities(year)

  const prompt = `You are an expert in Karnataka's digital economy planning. Suggest an optimal apportionment of a ${total_value} billion USD target for ${vertical_id} across 8 geographic clusters for the year ${year}.

**Context:**

**Historical Apportionments (2021-2025):**
${JSON.stringify(historicalData, null, 2)}

**Cluster Capacities:**
${JSON.stringify(clusterCapacities, null, 2)}

**Constraints:**
${JSON.stringify(constraints, null, 2)}

**Strategic Priorities for ${year}:**
${JSON.stringify(strategicPriorities, null, 2)}

**Clusters:**
1. Bengaluru (Existing hub, 82% historical share)
2. Mysuru (Tier 1: Cybersecurity Valley, capacity: $2B by 2030)
3. Mangaluru (Tier 1: Silicon Beach, capacity: $3B by 2030)
4. HDB Corridor (Tier 1: Industrial AI, capacity: $2.5B by 2030)
5. Kalaburagi (Tier 2: AI Hub, capacity: $0.5B by 2030)
6. Tumakuru (Tier 2: Aerospace Valley, capacity: $1B by 2030)
7. Shivamogga (Tier 3: Development phase, capacity: $0.2B by 2030)
8. Rest of Karnataka (Distributed, capacity: $0.5B by 2030)

**Requirements:**
- Total must sum to ${total_value}B exactly
- Respect capacity constraints (warn if exceeded)
- Consider strategic priorities (Beyond Bengaluru program, tier classifications)
- Balance between hub concentration (Bengaluru) and distribution
- Provide percentage and absolute amounts
- Include confidence level (1-5) and rationale for each allocation

**Output Format (JSON):**
{
  "apportionments": [
    {
      "geography_id": "bengaluru",
      "percentage": 75,
      "amount": 37.5,
      "confidence": 5,
      "rationale": "Existing infrastructure and talent pool supports majority share",
      "constraints_met": true
    },
    ...
  ],
  "warnings": ["Mysuru exceeds historical avg by 2%"],
  "recommendations": ["Consider increasing Mangaluru share to leverage coastal advantage"],
  "confidence_overall": 4
}
`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    messages: [
      { role: 'user', content: prompt }
    ],
  })

  const response = JSON.parse(message.content[0].text)

  // Store AI suggestion in database
  await storeAISuggestion({
    vertical_id,
    total_value,
    year,
    suggestion: response,
    model: 'claude-sonnet-4-5-20250929',
    prompt_tokens: message.usage.input_tokens,
    completion_tokens: message.usage.output_tokens,
  })

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

**Call from frontend:**
```typescript
// src/services/predictionService.ts
export async function getAIApportionmentSuggestion(
  verticalId: string,
  totalValue: number,
  year: number
): Promise<ApportionmentSuggestion> {
  const { data, error } = await supabase.functions.invoke('ai-apportionment-suggest', {
    body: { vertical_id: verticalId, total_value: totalValue, year }
  })

  if (error) throw error
  return data
}
```

#### Layer 4: Hybrid Combiner (Best of All)

```typescript
// src/services/hybridPredictionService.ts
export async function getHybridApportionmentSuggestion(
  verticalId: string,
  totalValue: number,
  year: number
): Promise<HybridSuggestion> {
  // 1. Get statistical baseline
  const { data: statistical } = await supabase
    .rpc('predict_geographic_apportionment', {
      p_vertical_id: verticalId,
      p_total_value: totalValue,
      p_year: year
    })

  // 2. Get AI suggestions
  const aiSuggestion = await getAIApportionmentSuggestion(verticalId, totalValue, year)

  // 3. Validate both against constraints
  const validatedStatistical = await Promise.all(
    statistical.map(s => validateAgainstConstraints(verticalId, s.geography_id, s.suggested_amount, year))
  )

  const validatedAI = await Promise.all(
    aiSuggestion.apportionments.map(a => validateAgainstConstraints(verticalId, a.geography_id, a.amount, year))
  )

  // 4. Combine: Use AI if it passes constraints AND has higher confidence
  //    Otherwise use statistical
  const hybrid = aiSuggestion.apportionments.map((ai, idx) => {
    const stat = statistical[idx]
    const aiValid = validatedAI[idx].every(v => v.is_valid || v.severity !== 'error')
    const statValid = validatedStatistical[idx].every(v => v.is_valid || v.severity !== 'error')

    if (aiValid && ai.confidence >= 4) {
      return { ...ai, method: 'ai', alternative: stat }
    } else if (statValid) {
      return { ...stat, method: 'statistical', alternative: ai }
    } else {
      // Both have issues, warn user
      return { ...stat, method: 'statistical_fallback', issues: validatedStatistical[idx] }
    }
  })

  return {
    apportionments: hybrid,
    statistical_baseline: statistical,
    ai_suggestion: aiSuggestion,
    recommendation: determineRecommendation(hybrid, validatedAI, validatedStatistical)
  }
}
```

---

## Admin UI Components

### Component 1: Target Setting Form

```typescript
// src/components/admin/TargetSettingForm.tsx
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const targetSchema = z.object({
  vertical_id: z.string().min(1, 'Vertical is required'),
  geography_id: z.string().min(1, 'Geography is required'),
  year: z.number().min(2025).max(2050),
  metric: z.enum(['revenue', 'headcount', 'sq_ft', 'funding_amount']),
  value: z.number().positive('Value must be positive'),
  unit: z.string(),
})

type TargetFormData = z.infer<typeof targetSchema>

export function TargetSettingForm() {
  const [step, setStep] = useState<'target' | 'geographic' | 'factors' | 'preview'>('target')
  const [draftId, setDraftId] = useState<string | null>(null)
  const [hybridSuggestion, setHybridSuggestion] = useState<HybridSuggestion | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      year: 2030,
      metric: 'revenue',
      unit: 'billion_usd',
    }
  })

  const onSubmitTarget = async (data: TargetFormData) => {
    // 1. Create draft
    const { data: draft, error } = await supabase
      .from('apportionment_drafts')
      .insert({
        draft_name: `${data.vertical_id} - ${data.geography_id} - ${data.year}`,
        vertical_id: data.vertical_id,
        geography_id: data.geography_id,
        year: data.year,
        total_value: data.value,
        status: 'draft',
        created_by: user.email,
      })
      .select()
      .single()

    if (error) throw error
    setDraftId(draft.id)

    // 2. Get hybrid suggestions
    const suggestion = await getHybridApportionmentSuggestion(
      data.vertical_id,
      data.value,
      data.year
    )
    setHybridSuggestion(suggestion)

    // 3. Move to geographic apportionment
    setStep('geographic')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <StepIndicator currentStep={step} />

      {step === 'target' && (
        <form onSubmit={handleSubmit(onSubmitTarget)} className="space-y-6">
          <h2 className="text-2xl font-bold">Set High-Level Target</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vertical</label>
              <select {...register('vertical_id')} className="w-full border rounded p-2">
                <option value="">Select vertical...</option>
                <option value="it-gcc">GCC (IT Services)</option>
                <option value="esdm">ESDM</option>
                <option value="startups">Startups</option>
                {/* ... more verticals */}
              </select>
              {errors.vertical_id && <p className="text-red-500 text-sm mt-1">{errors.vertical_id.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Geography</label>
              <select {...register('geography_id')} className="w-full border rounded p-2">
                <option value="karnataka">Karnataka (state-level)</option>
                <option value="bengaluru">Bengaluru only</option>
                {/* ... more geographies */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input type="number" {...register('year', { valueAsNumber: true })} className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Metric</label>
              <select {...register('metric')} className="w-full border rounded p-2">
                <option value="revenue">Revenue</option>
                <option value="headcount">Employment</option>
                <option value="sq_ft">Land (sq ft)</option>
                <option value="funding_amount">Capital</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Value</label>
              <input type="number" step="0.01" {...register('value', { valueAsNumber: true })} className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select {...register('unit')} className="w-full border rounded p-2">
                <option value="billion_usd">Billion USD</option>
                <option value="million_usd">Million USD</option>
                <option value="employees">Employees</option>
                <option value="square_feet">Square Feet</option>
                <option value="crores_inr">Crores INR</option>
              </select>
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Preview Apportionment →
          </button>
        </form>
      )}

      {step === 'geographic' && hybridSuggestion && (
        <GeographicApportionmentStep
          draftId={draftId!}
          hybridSuggestion={hybridSuggestion}
          onNext={() => setStep('factors')}
          onBack={() => setStep('target')}
        />
      )}

      {step === 'factors' && (
        <FactorApportionmentStep
          draftId={draftId!}
          onNext={() => setStep('preview')}
          onBack={() => setStep('geographic')}
        />
      )}

      {step === 'preview' && (
        <PreviewAndCommitStep
          draftId={draftId!}
          onCommit={handleCommit}
          onBack={() => setStep('factors')}
        />
      )}
    </div>
  )
}
```

### Component 2: Geographic Apportionment Table

```typescript
// src/components/admin/GeographicApportionmentStep.tsx
export function GeographicApportionmentStep({ draftId, hybridSuggestion, onNext, onBack }) {
  const [mode, setMode] = useState<'percentage' | 'absolute' | 'ai'>('percentage')
  const [apportionments, setApportionments] = useState(hybridSuggestion.apportionments)
  const [validationResults, setValidationResults] = useState([])

  const totalValue = hybridSuggestion.apportionments.reduce((sum, a) => sum + a.amount, 0)
  const totalPercentage = apportionments.reduce((sum, a) => sum + a.percentage, 0)

  const handleApply AIsuggestions = () => {
    setApportionments(hybridSuggestion.ai_suggestion.apportionments)
  }

  const handlePercentageChange = (geographyId: string, newPercentage: number) => {
    setApportionments(prev => prev.map(a =>
      a.geography_id === geographyId
        ? { ...a, percentage: newPercentage, amount: (totalValue * newPercentage) / 100 }
        : a
    ))
  }

  const handleAbsoluteChange = (geographyId: string, newAmount: number) => {
    setApportionments(prev => prev.map(a =>
      a.geography_id === geographyId
        ? { ...a, amount: newAmount, percentage: (newAmount / totalValue) * 100 }
        : a
    ))
  }

  const handleValidate = async () => {
    const results = await Promise.all(
      apportionments.map(a =>
        validateAgainstConstraints(draft.vertical_id, a.geography_id, a.amount, draft.year)
      )
    )
    setValidationResults(results)
  }

  const handleSave = async () => {
    // Save apportionment to draft
    await supabase
      .from('apportionment_drafts')
      .update({
        geographic_apportionment: apportionments.reduce((acc, a) => ({
          ...acc,
          [a.geography_id]: {
            percentage: a.percentage,
            amount: a.amount,
            method: mode
          }
        }), {})
      })
      .eq('id', draftId)

    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Geographic Apportionment</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('percentage')}
            className={`px-4 py-2 rounded ${mode === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Percentage
          </button>
          <button
            onClick={() => setMode('absolute')}
            className={`px-4 py-2 rounded ${mode === 'absolute' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Absolute
          </button>
          <button
            onClick={handleApplyAISuggestions}
            className="px-4 py-2 rounded bg-purple-600 text-white flex items-center gap-2"
          >
            🤖 Apply AI Suggestions
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-medium">⚠️ You must apportion ${totalValue}B across all clusters</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Cluster</th>
            <th className="border p-3 text-right">Percentage</th>
            <th className="border p-3 text-right">Amount ($B)</th>
            <th className="border p-3 text-center">🤖 AI Suggested</th>
            <th className="border p-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {apportionments.map((a, idx) => {
            const aiSuggested = hybridSuggestion.ai_suggestion.apportionments[idx]
            const validation = validationResults[idx]
            const hasWarning = validation?.some(v => v.severity === 'warning')
            const hasError = validation?.some(v => v.severity === 'error')

            return (
              <tr key={a.geography_id} className={hasError ? 'bg-red-50' : hasWarning ? 'bg-yellow-50' : ''}>
                <td className="border p-3 font-medium">{a.geography_name}</td>
                <td className="border p-3 text-right">
                  <input
                    type="number"
                    step="0.1"
                    value={a.percentage}
                    onChange={(e) => handlePercentageChange(a.geography_id, parseFloat(e.target.value))}
                    disabled={mode !== 'percentage'}
                    className="w-24 text-right border rounded p-1"
                  />
                  %
                </td>
                <td className="border p-3 text-right">
                  $
                  <input
                    type="number"
                    step="0.01"
                    value={a.amount}
                    onChange={(e) => handleAbsoluteChange(a.geography_id, parseFloat(e.target.value))}
                    disabled={mode !== 'absolute'}
                    className="w-24 text-right border rounded p-1"
                  />
                  B
                </td>
                <td className="border p-3 text-center">
                  <div className="text-sm">
                    {aiSuggested.percentage.toFixed(1)}% (${aiSuggested.amount}B)
                    {Math.abs(a.percentage - aiSuggested.percentage) > 1 && (
                      <button
                        onClick={() => handlePercentageChange(a.geography_id, aiSuggested.percentage)}
                        className="ml-2 text-blue-600 underline text-xs"
                      >
                        adjust
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{aiSuggested.rationale}</div>
                </td>
                <td className="border p-3 text-center">
                  {hasError && <span className="text-red-600">❌ Error</span>}
                  {hasWarning && !hasError && <span className="text-yellow-600">⚠️ Warning</span>}
                  {!hasError && !hasWarning && <span className="text-green-600">✓</span>}
                </td>
              </tr>
            )
          })}
          <tr className="bg-gray-100 font-bold">
            <td className="border p-3">TOTAL</td>
            <td className="border p-3 text-right">
              <span className={totalPercentage !== 100 ? 'text-red-600' : 'text-green-600'}>
                {totalPercentage.toFixed(1)}%
              </span>
            </td>
            <td className="border p-3 text-right">
              <span className={Math.abs(apportionments.reduce((sum, a) => sum + a.amount, 0) - totalValue) > 0.01 ? 'text-red-600' : 'text-green-600'}>
                ${apportionments.reduce((sum, a) => sum + a.amount, 0).toFixed(2)}B
              </span>
            </td>
            <td className="border p-3"></td>
            <td className="border p-3"></td>
          </tr>
        </tbody>
      </table>

      {validationResults.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Validation Results:</h3>
          {validationResults.flatMap((results, idx) =>
            results
              .filter(r => !r.is_valid || r.severity === 'warning')
              .map((r, rIdx) => (
                <div
                  key={`${idx}-${rIdx}`}
                  className={`p-3 border-l-4 ${r.severity === 'error' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}
                >
                  <strong>{apportionments[idx].geography_name}</strong>: {r.constraint_type} constraint{' '}
                  {r.severity === 'error' ? 'violated' : 'warning'} - Max allowed: ${r.max_allowed}B, Violation: $
                  {r.violation_amount}B
                </div>
              ))
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-2 border rounded hover:bg-gray-100">
          ← Back
        </button>
        <div className="flex gap-2">
          <button onClick={handleValidate} className="px-6 py-2 border rounded hover:bg-gray-100">
            Validate
          </button>
          <button
            onClick={handleSave}
            disabled={totalPercentage !== 100}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next: Factors →
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Component 3: Preview & Commit

```typescript
// src/components/admin/PreviewAndCommitStep.tsx
export function PreviewAndCommitStep({ draftId, onCommit, onBack }) {
  const [draft, setDraft] = useState(null)
  const [previewTargets, setPreviewTargets] = useState([])
  const [impact, setImpact] = useState(null)

  useEffect(() => {
    loadDraftAndPreview()
  }, [draftId])

  const loadDraftAndPreview = async () => {
    // Load draft
    const { data: draftData } = await supabase
      .from('apportionment_drafts')
      .select('*')
      .eq('id', draftId)
      .single()

    setDraft(draftData)

    // Generate preview targets
    const targets = await generatePreviewTargets(draftData)
    setPreviewTargets(targets)

    // Calculate impact
    const impactData = await calculateImpact(targets)
    setImpact(impactData)
  }

  const handleCommit = async () => {
    // 1. Create all targets in database
    const { error } = await supabase.from('targets').insert(previewTargets)

    if (error) {
      alert('Error creating targets: ' + error.message)
      return
    }

    // 2. Update draft status
    await supabase
      .from('apportionment_drafts')
      .update({
        status: 'committed',
        committed_by: user.email,
        committed_at: new Date().toISOString()
      })
      .eq('id', draftId)

    // 3. Refresh materialized views
    await supabase.rpc('refresh_all_views')

    // 4. Notify user
    alert('✓ Targets created successfully!')

    // 5. Redirect to dashboard
    router.push('/admin/drafts')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Preview & Commit Changes</h2>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="font-medium">You are about to create {previewTargets.length} new targets</p>
      </div>

      {/* Changes Summary */}
      <div className="border rounded p-4">
        <h3 className="font-medium mb-2">Changes Summary:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>{impact?.revenue_targets || 0} revenue targets (1 per geography)</li>
          <li>{impact?.labour_targets || 0} labour targets (1 per geography)</li>
          <li>{impact?.land_targets || 0} land targets (1 per geography)</li>
          <li>{impact?.capital_targets || 0} capital targets (1 per geography)</li>
          <li>{impact?.skill_breakdown_targets || 0} skill breakdown targets</li>
        </ul>
      </div>

      {/* Affected Dashboards */}
      <div className="border rounded p-4">
        <h3 className="font-medium mb-2">Affected Dashboards:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {impact?.affected_tabs?.map(tab => (
            <li key={tab}>{tab}</li>
          ))}
        </ul>
      </div>

      {/* Dependency Updates */}
      <div className="border rounded p-4">
        <h3 className="font-medium mb-2">Dependency Updates:</h3>
        <ul className="space-y-1 text-sm">
          {impact?.dependency_updates?.map((update, idx) => (
            <li key={idx}>
              {update.description}: {update.old_value} → {update.new_value} ({update.change_percentage > 0 ? '+' : ''}
              {update.change_percentage}%)
            </li>
          ))}
        </ul>
      </div>

      {/* Validation Warnings */}
      {impact?.warnings?.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h3 className="font-medium mb-2">⚠️ Validation Warnings:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {impact.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Table */}
      <div>
        <h3 className="font-medium mb-2">Preview of New Targets ({previewTargets.length} total):</h3>
        <div className="max-h-96 overflow-y-auto border rounded">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Vertical</th>
                <th className="border p-2 text-left">Geography</th>
                <th className="border p-2 text-left">Factor</th>
                <th className="border p-2 text-right">Value</th>
                <th className="border p-2 text-left">Unit</th>
                <th className="border p-2 text-left">Formula</th>
              </tr>
            </thead>
            <tbody>
              {previewTargets.slice(0, 50).map((target, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border p-2">{target.vertical_id}</td>
                  <td className="border p-2">{target.geography_id}</td>
                  <td className="border p-2">{target.factor_id || 'revenue'}</td>
                  <td className="border p-2 text-right">{target.value.toLocaleString()}</td>
                  <td className="border p-2">{target.unit}</td>
                  <td className="border p-2 text-xs text-gray-600">{target.formula || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {previewTargets.length > 50 && (
            <div className="p-2 text-center text-sm text-gray-600">
              ... and {previewTargets.length - 50} more targets
            </div>
          )}
        </div>
      </div>

      {/* Audit Log */}
      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-medium mb-2">Audit Log:</h3>
        <div className="text-sm space-y-1">
          <p><strong>Created by:</strong> {draft?.created_by}</p>
          <p><strong>Timestamp:</strong> {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          <p><strong>Reason:</strong></p>
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows={2}
            placeholder="Enter reason for this target update (required for audit)"
            id="reason"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-2 border rounded hover:bg-gray-100">
          ← Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => {/* Save as draft */}}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Save as Draft
          </button>
          <button
            onClick={handleCommit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            ✓ Commit Changes
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## Authentication & Authorization

### Supabase Auth Setup

```sql
-- Enable email/password auth in Supabase Dashboard

-- Create admin users
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, role)
VALUES
  ('admin@kdem.gov.in', crypt('SecurePassword123!', gen_salt('bf')), NOW(), 'authenticated'),
  ('editor@kdem.gov.in', crypt('SecurePassword456!', gen_salt('bf')), NOW(), 'authenticated');

-- Assign roles
INSERT INTO user_roles (user_id, role, can_create_targets, can_edit_targets, can_approve_drafts)
SELECT id, 'admin', true, true, true FROM auth.users WHERE email = 'admin@kdem.gov.in';

INSERT INTO user_roles (user_id, role, can_create_targets, can_edit_targets, can_approve_drafts)
SELECT id, 'editor', true, true, false FROM auth.users WHERE email = 'editor@kdem.gov.in';
```

### Login Component

```typescript
// src/components/admin/LoginPage.tsx
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      return
    }

    // Check if user has admin/editor role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)

    if (!roles || roles.length === 0) {
      setError('You do not have permission to access the admin interface')
      await supabase.auth.signOut()
      return
    }

    // Redirect to admin dashboard
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">KDEM Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Contact admin@kdem.gov.in for access
        </p>
      </div>
    </div>
  )
}
```

---

## Deployment

### Environment Variables

```bash
# .env.local (Admin interface)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ANTHROPIC_API_KEY=sk-ant-... # For Claude API prediction model
```

### Vercel Deployment

```bash
# vercel.json (add admin routes)
{
  "routes": [
    {
      "src": "/admin/(.*)",
      "dest": "/admin/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  }
}
```

---

## Cost Estimate

### Claude API Usage (Prediction Model)

**Per prediction request:**
- Input tokens: ~4,000 (context + prompt)
- Output tokens: ~1,500 (apportionment suggestions)
- Cost: ~$0.03 per request (Sonnet 4.5 pricing)

**Monthly estimate:**
- 50 targets set/month × $0.03 = **$1.50/month**

### Total Admin Interface Cost

| Component | Monthly Cost |
|-----------|--------------|
| Supabase (Pro) | $25 |
| Vercel (Pro) | $20 |
| Claude API | $1.50 |
| **Total** | **$46.50** |

---

## Next Steps

1. [ ] Review admin interface design
2. [ ] Approve prediction model approach (hybrid: statistical + constraints + AI)
3. [ ] Decide on authentication method (email/password vs SSO)
4. [ ] Implement database schema extensions
5. [ ] Build admin UI components
6. [ ] Integrate Claude API for predictions
7. [ ] Test apportionment workflow end-to-end
8. [ ] Deploy admin interface (/admin route)
9. [ ] Create admin user accounts
10. [ ] Train admin users on workflow

**Estimated development time: 3-4 weeks (Phase 5 - after main dashboard)**

---

This admin interface provides intelligent, AI-powered target setting with forced apportionment across all dimensions, ensuring data consistency while giving administrators flexibility and predictive guidance.
