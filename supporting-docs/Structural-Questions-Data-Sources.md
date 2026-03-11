# KDEM Dashboard — Structural Questions & Data Source Audit

**Date:** 27 Feb 2026 (updated 3 Mar 2026) | **Source:** Clarification Response Matrix cross-referenced with codebase

> **See also:** [KDEM-Data-Source-Compendium.md](./KDEM-Data-Source-Compendium.md) — comprehensive research findings with 70+ external sources for open questions B3, B5-B10.

---

## Part 1: Structural Questions Requiring Resolution

These are data/policy questions that cannot be resolved by code changes alone — they require KDEM decisions or external data collection.

| # | Structural Question | Current Dashboard Value | Excel Value | Discrepancy | Recommended Data Source(s) | Action Required |
|---|---------------------|------------------------|-------------|-------------|---------------------------|-----------------|
| **B1** | **ESDM Employment Ratio** — DB seed had 100 emp/$1M (ICEA generic), actual is ~8 | ✅ DB fixed to 8 (migration 012); citations.js aligned to 8; referenceData.js uses aiAdjusted: 9 for FY32 | Excel implies 7.8 (140K / $17.98B) | ~~100 vs 7.8~~ → **RESOLVED** | MeitY FY25 actual ($36.69B / 284K = 7.7); ICEA targets 6M at $500B = 12 emp/$1M | ✅ **DONE** — DB migration 012 fixed 100→8. Citations aligned. AI-adjusted 9 for FY32 projections. |
| **B2** | **Startups Employment Ratio** — DB seed had 15 emp/$1M, Excel implies ~105 | ✅ DB fixed to 105 (migration 012); startup employment excluded from totals (`employmentExcluded: true`) | Excel: 420K / $4B = 105 emp/$1M | ~~15 vs 105~~ → **RESOLVED** | DPIIT Prabhaav (1.73M direct jobs / 157,706 startups = ~11/startup nationally); KDEM Excel Option 4 sheet | ✅ **DONE** — DB migration 012 fixed 15→105. Startup employment excluded from totals to avoid IT double-counting. |
| **B3** | **ESDM Beyond Bengaluru Apportionment** — DB has 60% BB, Excel has 5% BB | DB `apportionment_rules`: ESDM 40% Bengaluru / 60% BB | Excel BB Workings: ESDM 95% Bengaluru / 5% BB | 60% vs 5% BB (12x) | KDEM ESDM Policy Cell; KWIN City Master Plan (aspirational vs current); MeitY ESDM cluster data. **15 external sources compiled in [Compendium §2](./KDEM-Data-Source-Compendium.md#section-2-b3--esdm-beyond-bengaluru-apportionment)** | **KDEM policy decision** — Research confirms 3-5% BB today. 60% unsupported. Recommend year-tagged: 5% current → 15-25% by 2030 |
| **B4** | **Startups Beyond Bengaluru Apportionment** — DB had 10% BB, Excel has 25% BB | ✅ DB fixed to 75/25 (migration 016); Bengaluru 75%, Mysuru 8%, Mangaluru 6%, HDB 5%, others 6% | Excel BB Workings: Startups 75% Bengaluru / 25% BB | ~~10% vs 25%~~ → **RESOLVED** | DPIIT state portal (district-wise startup registrations); Karnataka Startup Cell Elevate program cluster data | ✅ **DONE** — DB migration 016 updated apportionment from 90/10 to 75/25. Seed files aligned. |
| **B5** | **Overall Bengaluru / BB Revenue Split** — Policy says 15% BB, Excel gives 3.7% BB | DB apportionment gives ~96.3% Bengaluru / ~3.7% BB (derived from per-vertical rules) | Excel: BB $17.88B / KA $478.68B = 3.7% | Policy 15% vs Excel 3.7% (4x) | KDEM official BB target (website says 15%); STPI regional offices. **9 external sources compiled in [Compendium §3](./KDEM-Data-Source-Compendium.md#section-3-b5--overall-bengalurubb-revenue-split)** | **KDEM policy decision** — Research finds 3 conflicting targets (15% policy, >5% KDEM officials, 3.7% Excel). Show gap analysis. |
| **B6** | **Bengaluru Revenue vs GSDP** — $338B Bengaluru exceeds plausible GSDP share | Revised $350B × 96.3% = $337B for Bengaluru | Excel: $460B Bengaluru (85% of projected $543B GSDP) | Both implausible | **8 external sources compiled in [Compendium §4](./KDEM-Data-Source-Compendium.md#section-4-b6--bengaluru-revenue-vs-gsdp-plausibility)**. Key: Bengaluru GDDP (all sectors) = ~$102B nominal; PPP Metro GDP $360B is NOT nominal. | **Structural** — $337B is sector revenue (billing), not city GDP. Clarify in communications. Revenue ≠ GDP contribution. |
| **B7** | **KA Share Percentages** — estimated, not confirmed | IT Exports 38%, IT Domestic 30%, ESDM 20% | Same estimates used | No discrepancy, but unvalidated | **7 external sources compiled in [Compendium §5](./KDEM-Data-Source-Compendium.md#section-5-b7--karnataka-share-of-india-it)**. STPI-only: 42-45%; STPI+SEZ: 34%; vs NASSCOM total: 24%. | Use 38-42% with methodology note (STPI-basis, includes pass-through). Request NASSCOM for full state-wise breakdown. |
| **B8** | **Digitizing Sectors FY25 Actuals** — no independent validation | $20.23B (KDEM Excel CAGR from FY22 McKinsey base) | Same | N/A — no alternative exists | **23 external sources compiled in [Compendium §6](./KDEM-Data-Source-Compendium.md#section-6-b8--digitizing-sectors-fy25-actuals)** covering 10 sub-sectors with India market sizes. | **Confidence 2/5** — $20.23B aggregate is plausible but CAGRs of 20-227% unvalidated. Re-baseline using India × KA share. |
| **B9** | **Cluster-Level Revenue Actuals** — no actuals exist for any cluster | Targets from KDEM Vision Documents (Mysuru $10B, Mangaluru ₹40K Cr, HDB $1B) | Excel treats BB as single aggregate — no cluster breakdown | N/A | **10 external sources compiled in [Compendium §7](./KDEM-Data-Source-Compendium.md#section-7-b9--cluster-level-revenue-actuals)**. Only Mysuru has revenue (Rs 5,700 Cr). | **Critical gap** — Mysuru only cluster with published revenue. Request KDEM BB program office for per-cluster MIS. |
| **B10** | **Land & Capital Data** — entirely dashboard-derived, no KDEM source | Per-vertical ratios (IT 100, ESDM 33, Startups 80 sq ft/emp); construction costs (₹2,500-4,000/sq ft) | Excel has NO land or capital data | N/A — dashboard-only | **13 external sources compiled in [Compendium §8](./KDEM-Data-Source-Compendium.md#section-8-b10--land--capital-validation)**. AIHP/JLL/Knight Frank validate IT & startup ratios. Tier 2 discounts confirmed. | **Validated** — IT 100, Startups 80 within AIHP range. ESDM 33 may be low (mfg benchmark 95-125). Add citations. |

---

## Part 2: Data Source Audit — Every Data Point and Its Source

### Revenue Data Points

| Data Point | Dashboard Value | Primary Source | Secondary Source | Confidence | File(s) | Validated? |
|------------|----------------|---------------|-----------------|------------|---------|------------|
| India IT Revenue FY25 | $283B | NASSCOM Strategic Review 2025 | — | 5/5 | citations.js, referenceData.js | Yes — official |
| India IT Exports FY25 | $224B | NASSCOM Strategic Review 2025 | — | 5/5 | citations.js, referenceData.js | Yes — official |
| India IT Domestic FY25 | $58.2B | NASSCOM Strategic Review 2025 | — | 5/5 | citations.js, referenceData.js | Yes — official |
| KA IT Exports FY25 | $85.12B | NASSCOM $224B × 38% KA share | STPI KA: ₹4.53L Cr (~$54.6B) | 4/5 | citations.js, referenceData.js | Partial — share % estimated. STPI figure ($54.6B) suggests lower share |
| KA IT Domestic FY25 | $17.46B | NASSCOM $58.2B × 30% KA share | — | 4/5 | referenceData.js | No — 30% share is estimated |
| KA ESDM FY25 | $36.69B | MeitY + Care Edge Research FY24-25 | — | 5/5 | referenceData.js | Yes — MeitY official |
| KA Startups FY25 | $8.79B | KDEM Excel projection (30% CAGR from $4B FY22) | — | 3/5 | referenceData.js | No — no independent FY25 actual |
| KA Digitizing FY25 | $20.23B | KDEM Excel (17 sub-sector CAGR from McKinsey FY22 base) | — | 2/5 | referenceData.js | No — entirely estimated |
| KA Total Revenue FY25 | $168B | Sum of above | Research MD §3.1 | 4/5 | referenceData.js | 83% high-confidence ($139B), 17% estimated ($29B) |
| KA IT Exports Target FY32 | $165B | 10% CAGR from $85.1B | NASSCOM $500B India × 38% | 4/5 | citations.js, referenceData.js | Defensible — NASSCOM projects $500B India IT by 2030 |
| KA IT Domestic Target FY32 | $34B | 10% CAGR from $17.46B | IDC 7.2%, Gartner 10-11% | 3/5 | citations.js, referenceData.js | Reasonable — within IDC/Gartner range |
| KA ESDM Target FY32 | $95B | 14.5% CAGR | Care Edge 20-25% India CAGR, moderated for KA share dilution | 4/5 | citations.js, referenceData.js | Plausible — Gujarat/TN fabs dilute KA share |
| KA Startups Target FY32 | $22B | 14% CAGR from $8.79B | DPIIT/NASSCOM $1T startup by 2030; moderated for funding winter | 3/5 | citations.js, referenceData.js | Plausible but unverifiable |
| KA Digitizing Target FY32 | $35B | 8% CAGR (organic digitization) | India nominal GDP growth alignment | 2/5 | referenceData.js | Low confidence — base year itself is estimated |
| KA Total Target FY32 | $329-351B | Sum of verticals (excl. Startups to avoid double-count) | KDEM Handbook: $300-350B range | 4/5 | citations.js | Yes — within KDEM public range |

### Employment Data Points

| Data Point | Dashboard Value | Primary Source | Secondary Source | Confidence | File(s) | Validated? |
|------------|----------------|---------------|-----------------|------------|---------|------------|
| India IT Employment FY25 | 5.8M | NASSCOM Strategic Review 2025 | — | 5/5 | referenceData.js | Yes — official |
| KA IT Employment FY25 | ~1.83M | NASSCOM 5.8M × ~38% KA share (estimated) | IBEF: KA = 21% of IT headcount (~1.22M) | 3/5 | referenceData.js | No — conflicting share estimates (21% vs 38%) |
| KA ESDM Employment FY25 | 284K | MeitY / ICEA | — | 4/5 | referenceData.js | Partial — MeitY state-level not published |
| KA Total Employment FY25 | 2.48M | Sum of IT + ESDM + Digitizing (excl. Startups) | — | 3/5 | referenceData.js | Partial — component estimates vary |
| IT Exports emp/$1M (base) | 20 | NASSCOM FY25 (5.8M / $283B = 20.5) | — | 5/5 | citations.js | Yes — derived from NASSCOM actuals |
| IT Exports emp/$1M (AI-adjusted) | 16 | Bessemer Oct 2025: India IT 7.5-8M → 6M by 2031 (~25% reduction) | NASSCOM AI-era projections; NITI Aayog | 3/5 | citations.js, referenceData.js | Estimated — AI impact projection |
| IT Domestic emp/$1M (AI-adjusted) | 18 | ~15% reduction from base 21 (less automatable than exports) | — | 3/5 | citations.js, referenceData.js | Estimated — lower AI impact assumed |
| ESDM emp/$1M (target) | 9 | MeitY FY25: $36.69B / 284K = 7.7 current; rises to 9 with OSAT expansion | ICEA: 6M at $500B = 12 emp/$1M | 3/5 | citations.js | Estimated — composition shift assumption |
| KA Employment Target FY32 (Medium) | 4.6M | Revenue × AI-adjusted ratios per vertical | — | 3/5 | referenceData.js, labor.js | Estimated — scenario projection |
| KDEM Public Target | 5M | KDEM Mission statement | — | 5/5 | citations.js | Yes — public commitment |

### Geographic / Cluster Data Points

| Data Point | Dashboard Value | Primary Source | Secondary Source | Confidence | File(s) | Validated? |
|------------|----------------|---------------|-----------------|------------|---------|------------|
| Karnataka GSDP FY25 | $345B | PRS India Budget Analysis 2025-26 (₹28.7L Cr @ ₹83/$) | — | 5/5 | citations.js | Yes — official |
| India GDP FY25 | $3,900B | MoSPI | — | 5/5 | citations.js | Yes — official |
| Bengaluru Startups | 2,443 active funded | Bengaluru Innovation Report 2025 | — | 5/5 | citations.js | Yes |
| Bengaluru Unicorns | 53 | Bengaluru Innovation Report 2025 | Startup Genome: 32 (different methodology) | 5/5 | citations.js | Yes — count varies by definition |
| Bengaluru Soonicorns | 183 (39% of India) | Bengaluru Innovation Report 2025 | Tracxn | 5/5 | citations.js | Yes |
| Bengaluru VC Total | $79B | Bengaluru Innovation Report 2025 | — | 5/5 | citations.js | Yes |
| Bengaluru Tech Workforce | 2.5M+ | Bengaluru Innovation Report 2025 | — | 4/5 | citations.js | Estimated |
| Bengaluru AI Professionals | 600K | Bengaluru Innovation Report 2025 | — | 4/5 | citations.js | Estimated |
| GCCs in Karnataka | 880+ | Zinnov "5 Shifts" 2025 | — | 4/5 | referenceData.js | Yes |
| Bengaluru Ecosystem Value | $136B | Startup Genome GSER 2025 | — | 5/5 | referenceData.js | Yes — official ranking |
| DPIIT KA Startups | 21,163 | DPIIT Prabhaav Dashboard Jan 2025 | — | 5/5 | referenceData.js | Yes — official |
| Mysuru Target | $10B rev, 150K jobs by 2030 | KDEM Mysuru Vision Document 2025 | Deccan Herald confirmation | 4/5 | referenceData.js | Yes — KDEM official |
| Mangaluru Target | ₹40K Cr, 200K jobs by 2034 | Draft Mangaluru Cluster Vision 2025 | — | 4/5 | referenceData.js | Draft — not finalized |
| HDB Target | $200M → $1B rev | PDF Slide 15 (ICEA & KDEM Estimates) | HDB Cluster Vision Report 2025-2030 | 4/5 | referenceData.js | Yes — KDEM official |

### Land & Capital Data Points (Dashboard-Derived)

| Data Point | Dashboard Value | Primary Source | Secondary Source | Confidence | File(s) | Validated? |
|------------|----------------|---------------|-----------------|------------|---------|------------|
| IT space ratio | 100 sq ft/emp | DB `conversion_ratios` seed | JLL/AIHP 2024: 80-120 sq ft/emp | 3/5 | citations.js, land.js | Reasonable — within JLL range |
| ESDM space ratio | 33 sq ft/emp | DB `conversion_ratios` seed | Prosperiti 2023, Factories Act: 95-125 sq ft | 3/5 | citations.js, land.js | Low — may be too low for mfg |
| Startups space ratio | 80 sq ft/emp | DB `conversion_ratios` seed | GoodWorks 2026: 50-75 sq ft (co-working) | 3/5 | citations.js, land.js | Reasonable |
| IT construction cost | ₹3,500/sq ft | Dashboard estimate | Walls & Dreams 2025: ₹2,000-3,500/sq ft | 3/5 | capital.js | Within range |
| ESDM construction cost | ₹4,000/sq ft | Dashboard estimate | Cleanroom/power infra premium | 2/5 | capital.js | Estimated — no external source |
| Startups construction cost | ₹2,500/sq ft | Dashboard estimate | Co-working fit-out | 2/5 | capital.js | Estimated — no external source |
| Bengaluru land premium | 1.20x | DB `geography_conversion_multipliers` | Knight Frank H1 2024: ₹77-95/sqft/mo | 3/5 | citations.js, land.js | Directionally correct |
| Tier 2 discounts | 0.50-0.75x | DB `geography_conversion_multipliers` | Flex Insights 2024: 30-50% lower | 3/5 | land.js | Directionally correct |

### Conversion Ratios in DB vs Dashboard

| Ratio | DB Seed Value | Dashboard/Citations Value | Excel-Implied | Correct Value | Status |
|-------|--------------|--------------------------|---------------|---------------|--------|
| IT Exports emp/$1M | 20 | 16 (AI-adjusted) | ~20 | 16 for FY32 targets | **OK** — DB is base, dashboard adjusts |
| IT Domestic emp/$1M | 25 | 18 (AI-adjusted) | ~21 | 18 for FY32 targets | **OK** — DB is base, dashboard adjusts |
| ESDM emp/$1M | ✅ 8 | 8 (citations), 9 (AI-adjusted FY32) | 7.8 | 8 | ✅ **FIXED** — migration 012 |
| Startups emp/$1M | ✅ 105 | excluded from totals | 105 | 105 | ✅ **FIXED** — migration 012 |
| IT land sq ft/emp | 100 | 100 | N/A | 80-120 | OK |
| ESDM land sq ft/emp | 33 | 33 | N/A | 33-125 | **Review** — may be too low |
| Startups land sq ft/emp | 80 | 80 | N/A | 50-80 | OK |
| ESDM BB apportionment | **60% BB** | 60% BB | **5% BB** | **5% current / 60% aspirational** | **NEEDS DB FIX or year-tagging** |
| Startups BB apportionment | ✅ 25% BB | 25% BB | 25% BB | 25% | ✅ **FIXED** — migration 016 |

---

## Part 3: Data Source Registry — All Sources by Organization

### Tier 1: Gold Standard (Confidence 5/5)

| Organization | What It Covers | How Dashboard Uses It | Publicly Available? |
|--------------|---------------|----------------------|---------------------|
| **NASSCOM Strategic Review 2025** | India IT revenue ($283B), exports ($224B), domestic ($58.2B), employment (5.8M), CAGRs | Base actuals for IT Exports, IT Domestic, employment ratios | Annual report (paid) |
| **MeitY** | India ESDM production, IT policies | ESDM FY25 actual ($36.69B), ISM 2.0 data | PIB press releases |
| **MoSPI** | India GDP ($3.9T) | Economic context, GSDP benchmarks | Yes |
| **STPI Karnataka** | KA IT exports (₹4.53L Cr FY25) | Cross-validation of NASSCOM × share% | STPI annual report; BizzBuzz FY25 report |
| **PIB — DG STPI Speech (Nov 2025)** | KA 42% of national STPI IT exports | KA share validation | pib.gov.in/PressReleasePage.aspx?PRID=2076543 |
| **NITI Aayog — KA Fiscal Landscape** | Services 63.2% of GSDP; macro fiscal context | GSDP composition analysis | niti.gov.in/sites/default/files/2025-01/Karnataka-Macro-Fiscal.pdf |
| **DPIIT Prabhaav** | 21,163 KA startups, 1.73M direct jobs nationally | Startup count, ecosystem metrics | prabhaav.startupindia.gov.in |
| **PRS India** | Karnataka GSDP (₹28.7L Cr) | Economic context ($345B) | Yes |
| **RBI Handbook of Statistics** | GDP deflator, macro baseline | Economic benchmarks | Yes |
| **Bengaluru Innovation Report 2025** | Startups (2,443), unicorns (53), VC ($79B), workforce (2.5M+), AI professionals (600K) | VC metrics, startup ecosystem, talent pools | 3One4 Capital publication |
| **Startup Genome GSER 2025** | Bengaluru #14 global, $136B ecosystem value | Global ranking context | startupgenome.com |
| **Karnataka Government Policies** | IT-BT 2025-30, Startup 2025-30, GCC 2024, Skill Dev 2025-32, Space Tech 2025 | Policy targets, investment commitments | Govt gazette |

### Tier 2: High Confidence (Confidence 4/5)

| Organization | What It Covers | How Dashboard Uses It | Publicly Available? |
|--------------|---------------|----------------------|---------------------|
| **Care Edge Research** | India ESDM 20-25% CAGR projections | ESDM growth trajectory | Research reports |
| **ICEA** | Electronics manufacturing ratios, ESDM targets (6M at $500B) | Employment ratio cross-check | Industry reports |
| **Zinnov** | GCCs (1,800+ India, 880+ KA), mid-market analysis | GCC metrics, competitive landscape | Zinnov reports |
| **ICRIER** | India digital economy ($402B FY23, $1,247B FY30) | Digital economy context | Research papers |
| **Tracxn** | 17,000+ funded startups, soonicorn tracking | Startup ecosystem validation | tracxn.com (paid) |
| **IDC / Gartner** | India IT spending growth (7.2% / 10-11%) | CAGR validation for projections | Analyst reports (paid) |
| **Statista** | India IT services 8.83% CAGR 2025-2030 | Growth rate cross-check | statista.com (paid) |
| **KDEM Vision Documents** | Cluster targets (Mysuru $10B, Mangaluru ₹40K Cr, HDB $1B) | Geographic targets | KDEM internal |
| **Xpheno-KDEM Silicon Beach 2025** | Mangaluru talent pool (3.1L total, 90K experienced) | Cluster talent data | newskarnataka.com |
| **KDEM Excel Model** | Revenue projections FY22-FY31, employment Option 4, BB workings | Base calculations (where NASSCOM unavailable) | KDEM internal |
| **BTS 2025 ESDM Directory** | 704 ESDM companies in KA (513 mfg, 61 design, 35 GCCs) | ESDM geography validation | timestech.in |
| **Invest Karnataka — ESDM** | 40% of India's electronic design in KA | ESDM sector context | investkarnataka.co.in/sector/esdm/ |
| **MARC Glocal — Mysuru Report** | Rs 5,700 Cr IT exports, 50+ companies, 400+ startups | Only cluster with published revenue | marcglocal.com (Jan 2024) |
| **Knight Frank H1 2024** | Bengaluru Rs 91.8/sqft/mo; national office market | Land cost benchmarks (upgraded from Tier 3) | knightfrank.co.in |
| **AIHP 2026** | Office 80-110 sq ft/emp for tech companies | Space ratio validation | aihp.in |
| **Cushman & Wakefield** | Bengaluru office fit-out $67/sq ft | Capital cost benchmarks | cushmanwakefield.com |
| **HFS Research** | Karnataka 500 GCCs by 2029, 3.5L jobs | GCC expansion context | hfsresearch.com |
| **Inductus GCC — KA GCC Policy** | Tier-2 rental reimbursement Rs 2 Cr/yr | BB incentive context | inductus.in |
| **Daijiworld — BB Target** | KDEM officials: >5% tech economy by 2030 | BB operational target (vs 15% policy) | daijiworld.com |

### Tier 3: Moderate Confidence (Confidence 3/5)

| Organization | What It Covers | How Dashboard Uses It | Publicly Available? |
|--------------|---------------|----------------------|---------------------|
| **Bessemer Venture Partners** | Cloud Atlas: India cloud $400B by 2030; IT headcount 6M by 2031 | AI-adjusted employment ratios (25% reduction basis) | bessemer.com |
| **McKinsey "Digital India" (2019)** | 17 digitizing sub-sector framework | Sub-sector categorization (framework only, not projections) | mckinsey.com |
| **Knight Frank / CBRE** | Bengaluru office rents (₹77-95/sqft/mo) | Land cost benchmarks | Research reports |
| **JLL / AIHP** | Office space 80-120 sq ft/emp | Land ratio validation | Research reports |
| **Walls & Dreams 2025** | Construction costs ₹2,000-3,500/sq ft | Capital methodology | Industry data |
| **NITI Aayog / WEF** | AI workforce impact projections | Employment scenario modeling | Government/international reports |
| **Inc42** | Startup funding news | Supplementary startup data | inc42.com |
| **Grand View Research** | Digital Health ($14.5B), EV ($8.5B), Gaming ($4B), SaaS ($7.2B), Logistics ($19.5B) | Digitizing sector India market sizes | grandviewresearch.com |
| **Mordor Intelligence** | Fintech ($155.7B), Gaming ($4.4B) | Digitizing sector cross-validation | mordorintelligence.com |
| **IMARC Group** | EdTech ($7.5B), AgriTech ($0.8B), OTT ($1.5B) | Digitizing sector market sizes | imarcgroup.com |
| **IBEF — E-Commerce** | India e-commerce $125B, $345B by 2030 | Digitizing sector baseline | ibef.org/industry/ecommerce |
| **Swarajya — State-wise IT FY22** | KA 34.2% of STPI+SEZ combined exports | KA share lower-bound validation | swarajyamag.com |
| **Factly — STPI State Data** | Historical state-wise STPI breakdowns | KA share trend analysis | factly.in |
| **Growth List — Bengaluru Startups** | Sector distribution: Fintech 23%, E-com 18%, SaaS 15% | Digitizing sector KA share estimates | growthlist.co |
| **Digital Convey — Mangaluru IT** | 150+ companies, 6,000+ jobs, 15-18% growth | Cluster employment data | digitalconvey.com |
| **Carnegie India** | India Semiconductor Mission analysis | ESDM policy context | carnegieindia.org |
| **JLL Q3 2025** | 132 sq ft/person avg, 11.9% vacancy, 18-22M sq ft absorbed | Office market validation | jll.co.in |
| **CBRE India** | GCC 52% of Bengaluru office transactions | GCC real estate context | cbre.co.in |

### Tier 4: Estimated / Unvalidated (Confidence 1-2/5)

| Organization | What It Covers | How Dashboard Uses It | Validation Needed From |
|--------------|---------------|----------------------|----------------------|
| **KDEM Excel sub-sector CAGRs** | 17 digitizing sector FY22-25 CAGRs (20-227%) | Digitizing sector projections ($20.23B FY25) | MeitY, NASSCOM, IBEF sector reports for top 5 sub-sectors |
| **Dashboard estimates** | Construction costs (₹2,500-4,000/sq ft), geography multipliers | Capital tab methodology | JLL/CBRE, KIADB, Karnataka RERA |
| **Non-DPIIT startup estimate** | ~20,000-25,000 additional startups | Total ecosystem size (~40-46K) | MCA tech company registrations, Karnataka Startup Cell |

---

## Part 4: Priority Actions

### Immediate (Code/DB fixes)
1. ✅ ~~**Fix DB seed: ESDM emp ratio** 100 → 8~~ — Done (migration 012)
2. ✅ ~~**Fix DB seed: Startups emp ratio** 15 → 105~~ — Done (migration 012)
3. ✅ ~~**Fix DB seed: Startups BB apportionment** 10% → 25%~~ — Done (migration 016)
4. **Fix DB seed: ESDM BB apportionment** — needs KDEM decision (5% current vs 60% aspirational)

### Requires KDEM Decision
5. **BB revenue split** — confirm official target: 15% (website) vs 3.7% (Excel)
6. **Target year** — FY 2029-30 (KDEM Excel) vs FY 2031-32 (dashboard revised)
7. **ESDM BB apportionment** — current (5%) vs aspirational (60%)

### Requires External Data Collection
8. **NASSCOM** — request KA-specific IT revenue breakdown (not India × share%)
9. **STPI regional offices** — per-cluster export data (Mysuru, Hubballi, Mangaluru)
10. **KDEM BB Program Office** — per-cluster revenue/employment MIS
11. **EPFO/ESIC Karnataka** — formal sector employment validation
12. **JLL/CBRE India** — KA-specific office space benchmarks
13. **KIADB** — IT park land costs and occupancy per cluster
14. **MeitY** — state-wise ESDM production breakdown
15. **DPIIT Karnataka** — district-wise startup registrations for BB validation
