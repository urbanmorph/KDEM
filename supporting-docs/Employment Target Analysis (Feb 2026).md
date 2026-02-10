# Employment Target Analysis: AI-Adjusted Projections & Double-Counting Fix

**Prepared:** February 9, 2026
**Purpose:** Document the employment number corrections in the KDEM Dashboard — removal of startup double-counting, alignment of conversion ratios with actual data, and introduction of AI-adjusted employment scenarios.

---

## 1. Problem Statement

The KDEM Dashboard had three employment data integrity issues:

1. **Startup double-counting:** The 3.4M current employment figure included 920K startup employees that overlap with NASSCOM's IT-BPM headcount (which already counts startup company employees).
2. **Stale DB conversion ratios:** ESDM ratio was 100 emp/$1M (ICEA assembly benchmark) vs actual 7.7 emp/$1M (Karnataka is chip design, not assembly). Startups ratio was 15 emp/$1M vs actual 104.7 emp/$1M.
3. **No AI adjustment:** The 8.16M target employment used pre-AI conversion ratios, ignoring productivity gains from AI that will reduce employment per dollar of revenue.

---

## 2. Current Employment Fix (FY 2024-25)

### Before (incorrect):
| Component | Employment | Note |
|-----------|-----------|------|
| IT Exports | 1,830,000 | $85.12B × ~21.5 emp/$1M |
| IT Domestic | 370,000 | $17.46B × ~21.2 emp/$1M |
| ESDM | 284,000 | MeitY FY24-25 |
| **Startups** | **920,000** | **KDEM Excel — DOUBLE-COUNTS with IT** |
| **Total** | **3,400,000** | **Includes double-count** |

### After (corrected):
| Component | Employment | Note |
|-----------|-----------|------|
| IT Exports | 1,830,000 | NASSCOM FY25 × 38% KA share (revenue × ratio) |
| IT Domestic | 370,000 | NASSCOM FY25 × 30% KA share (revenue × ratio) |
| ESDM | 284,000 | MeitY FY24-25 actual |
| **Total** | **2,484,000** | **Excludes startups** |
| _Startups (ecosystem)_ | _920,000_ | _Tracked separately — overlaps with IT-BPM_ |

### Why startups double-count:
- NASSCOM's 5.8M India IT-BPM workforce includes employees at ALL IT companies, including startups doing software services, SaaS, IT consulting, BPO, etc.
- The 38% Karnataka share (2.2M) already captures startup company workers.
- Adding 920K startup employees on top counts many workers twice.
- Revenue-side, we already exclude startups from the $159B total for the same reason.
- Employment should follow the same logic.

### Cross-check:
- NASSCOM 5.8M × 38% = 2,204,000 (IT Exports + IT Domestic)
- IT Exports (1,830K) + IT Domestic (370K) = 2,200,000 ✓
- Plus ESDM (284K) = 2,484,000

---

## 3. Conversion Ratio Fix

### Database ratios (004_seed_conversion_ratios.sql):

| Vertical | Old Ratio | Actual Ratio | Source of Error |
|----------|----------|-------------|----------------|
| IT Exports | 20 emp/$1M | ~21.5 emp/$1M | Close — OK |
| IT Domestic | 25 emp/$1M | ~21.2 emp/$1M | Moderate gap |
| **ESDM** | **100 emp/$1M** | **7.7 emp/$1M** | **ICEA assembly benchmark ≠ KA chip design** |
| **Startups** | **15 emp/$1M** | **104.7 emp/$1M** | **"Lean startup" assumption wildly wrong** |
| Digitizing | 30 emp/$1M | N/A | No employment data exists |

### Root cause:
- ESDM ratio of 100 was sourced from ICEA benchmarks for labor-intensive electronics assembly (like mobile phone factories). Karnataka's ESDM sector is 40% chip design + R&D, which is capital-intensive, not labor-intensive.
- Startup ratio of 15 was a guess for "lean teams." In reality, startups have high headcount relative to revenue (many pre-revenue or low-revenue companies with growing teams).

### Fix applied:
- Migration `012_fix_conversion_ratios.sql` updates ESDM to 8 emp/$1M and Startups to 105 emp/$1M.

---

## 4. AI-Adjusted Employment Scenarios (FY 2031-32)

### The core question:
AI will increase revenue-per-employee across IT services. How many jobs will $329B of digital economy revenue actually support?

### Per-vertical AI-adjusted conversion ratios:

| Vertical | Revenue Target | Current Ratio | Low AI | Medium AI | High AI |
|----------|---------------|--------------|--------|-----------|---------|
| IT Exports | $165B | 21.5 emp/$1M | 20 emp/$1M | **16 emp/$1M** | 12 emp/$1M |
| IT Domestic | $34B | 21.2 emp/$1M | 22 emp/$1M | **18 emp/$1M** | 14 emp/$1M |
| ESDM | $95B | 7.7 emp/$1M | 10 emp/$1M | **9 emp/$1M** | 8 emp/$1M |
| Digitizing | $35B | — | — | — | — |

### Resulting employment scenarios:

| Scenario | IT Exports | IT Domestic | ESDM | **Total** | Note |
|----------|-----------|-------------|------|-----------|------|
| **Low AI Impact** | 3,300,000 | 748,000 | 950,000 | **5,000,000** | Matches KDEM public target. Current ratios. Unlikely. |
| **Medium AI Impact** | 2,640,000 | 612,000 | 855,000 | **4,100,000** | Central estimate. AI augments, ~25% IT productivity gain. |
| **High AI Impact** | 1,980,000 | 476,000 | 760,000 | **3,200,000** | Aggressive AI. Revenue grows, employment lags. |

### Key insight:
The KDEM public target of **5M jobs** is only achievable under the low-AI scenario (current productivity ratios sustained through 2032). Given the trajectory of AI adoption in IT services, the **medium AI scenario (4.1M)** is the most realistic central estimate.

### Methodology: Deriving AI-adjusted ratios

The AI productivity adjustment is applied **per-vertical**, not as a blended average, because AI impacts each sector differently:

**IT Exports (21.5 → 16 emp/$1M, ~25% reduction):**
- Bessemer Venture Partners (Oct 2025) projects India IT headcount declining from 7.5-8M to 6M by 2031
- This is a ~25% reduction in the workforce serving the same or growing revenue base
- Derivation: 21.5 current × (1 - 0.25) = 16.1, rounded to 16 emp/$1M
- Export-oriented IT services (BPO, testing, L1/L2 support, code generation) are most susceptible to AI automation
- AI coding tools (Cursor, GitHub Copilot) already reduce developer time by 30-55% on routine tasks

**IT Domestic (21.2 → 18 emp/$1M, ~15% reduction):**
- Domestic IT includes government projects, system integration, enterprise support — less automatable than export BPO/testing
- The Bessemer projection applies primarily to global delivery models; domestic retains higher labor intensity
- Government/PSU contracts often have minimum staffing requirements regardless of AI efficiency
- Derivation: 21.2 current × (1 - 0.15) = 18.0 emp/$1M

**ESDM (7.7 → 9 emp/$1M, +17% increase):**
- Counter-intuitive: the ratio *increases* because sector composition shifts toward manufacturing
- Current 7.7 reflects Karnataka's chip design + R&D focus (capital-intensive, low headcount per $1M)
- Growth to $95B includes expansion into OSAT packaging (Mysuru PCB Park) and PCB manufacturing (KWIN City), which are more labor-intensive
- AI has minimal impact on hardware manufacturing employment — factory workers aren't displaced by LLMs
- Derivation: weighted average of design (7.7 emp/$1M, 50% of $95B) + manufacturing (10-12 emp/$1M, 50%) ≈ 9 emp/$1M

### Sources for AI adjustment:
- **Bessemer Venture Partners (Oct 2025):** India IT headcount could decline from 7.5-8M to 6M by 2031 (~25% reduction)
- **NASSCOM:** Projects only 6-7% IT growth in FY27 in the AI era (vs 10%+ pre-AI)
- **WEF Future of Jobs Report 2025:** AI expected to create 97M new roles globally but displace 85M by 2025-2030
- **AI coding tools (Cursor, GitHub Copilot):** Already reducing developer time by 30-55% on routine tasks
- **MeitY ESDM production data:** Karnataka ESDM composition shifting from 100% design to design + manufacturing with ISM 2.0, OSAT facilities

---

## 5. What This Means for KDEM Strategy

### Employment target revision:
| Metric | Old Value | New Value | Change |
|--------|----------|----------|--------|
| Current employment | 3.4M | 2.5M | -27% (removed double-count) |
| Target employment (internal) | 8.16M | 4.1M (medium AI) | -50% |
| Target employment (public) | 5M | 5M (low AI, aspirational) | Unchanged |
| Employment error band | None | 3.2M - 5.0M | New |

### Strategic implications:
1. **Track revenue-per-employee, not just headcount.** If revenue grows but employment doesn't proportionally, that's AI-era success, not failure.
2. **Focus on job quality over quantity.** AI-era jobs pay 2-3x more than displaced roles. Median salary matters more than headcount.
3. **Reskilling is critical.** 450-600K workers in vulnerable roles need transition pathways before 2028.
4. **ESDM is the employment growth engine.** Manufacturing is less affected by AI and has a 9 emp/$1M ratio at $95B = 855K direct jobs. This is where most new jobs will come from.
5. **The 5M target needs reframing.** It's achievable as "5M direct + indirect digital economy workers" if you include digitizing sectors and supply chain effects. As a direct employment target, 4.1M is more honest.

---

## 6. Data Sources

| Source | Used For | Confidence |
|--------|---------|------------|
| NASSCOM Strategic Review FY24-25 | India IT revenue ($283B), exports ($224B), employment (5.8M) | 5/5 |
| MeitY + Care Edge Research | Karnataka ESDM revenue ($36.69B) and employment (284K) | 5/5 |
| KDEM Excel Model | Startup revenue ($8.79B) and employment (920K) | 3/5 |
| Bessemer Venture Partners (Oct 2025) | AI impact on IT headcount (7.5-8M → 6M by 2031) | 3/5 |
| NASSCOM AI-era projections | IT growth moderating to 6-7% in AI era | 4/5 |
| WEF Future of Jobs Report 2025 | Global AI displacement/creation estimates | 3/5 |
| ICEA sector benchmarks | Original (incorrect) ESDM conversion ratio | 4/5 (correct for assembly, wrong for KA) |

---

## 7. Files Modified

| File | Change |
|------|--------|
| `src/services/referenceData.js` | Fixed baseline employment (3.4M→2.5M), added AI scenarios, updated vertical baselines with AI-adjusted ratios |
| `src/tabs/overview.js` | Employment display shows range (4.1-5M), reduced confidence to 3/5 |
| `supabase/migrations/012_fix_conversion_ratios.sql` | Fixed ESDM ratio (100→8) and Startups ratio (15→105) |
| `src/tabs/roadmap.js` | Employment scenarios already show per-vertical breakdown (updated in earlier session) |

---

*This analysis supports the KDEM Strategic Dashboard v1.0. Employment figures are scenario-dependent and should be reviewed annually as AI adoption patterns become clearer.*
