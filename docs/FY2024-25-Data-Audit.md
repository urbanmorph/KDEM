# FY 2024-25 Data Availability Audit

## Data points WHERE we have FY24-25 reported actuals

| Data Point | FY24-25 Actual | Source | Methodology |
|---|---|---|---|
| IT Exports (STPI-only) | **$52.04B** | STPI Karnataka (confidence 5) | STPI-registered units only |
| ESDM | **$36.69B** | MeitY + Care Edge Research (confidence 5) | Official government data |
| Karnataka GSDP | **$345B** | MoSPI / RBI Handbook 2025 (confidence 5) | Official stats |
| India GDP | **$3.9T** | MoSPI (confidence 5) | Official stats |

## Data points WHERE FY24-25 is PROJECTED from FY21-22 base (no actuals available)

| Data Point | Excel FY24-25 Projection | Base Year (Actual) | CAGR Used | Gap |
|---|---|---|---|---|
| IT Exports (NASSCOM scope) | **$95.03B** | $67.64B (FY21-22) | 12% | NASSCOM FY24-25 India total not in our data |
| IT Domestic | **$22.36B** | $14.7B (FY21-22) | 15% | DB has $17.7B (older NASSCOM est.) |
| Startups | **$8.79B** | $4.0B (FY21-22) | 30% | No independent FY24-25 actual |
| Digitizing Sectors | **$14.85B** | $6.0B (FY21-22) | sub-sector specific | No independent FY24-25 actual |
| Digital Economy Employment | **3.54M** | 2.18M (FY21-22) | revenue-ratio model | No independent FY24-25 actual |

## Key Discrepancies

### ESDM
- MeitY actual FY24-25: **$36.69B**
- Excel projection FY24-25: **$40.09B**
- Gap: $3.4B (Excel overestimates by ~9%)

### IT Exports
- STPI actual FY24-25: **$52.04B** (STPI-registered exports only)
- Excel/NASSCOM-scope FY24-25: **$95.03B** (all IT industry)
- These are **different methodologies**, not a discrepancy. NASSCOM includes non-STPI exports, GCCs, BPM, etc.

## Macro Timeline Data: `getIndiaDigitalEconomyTimeline()`

| Year | Current Status | Notes |
|---|---|---|
| FY22-23 ($402B) | Labeled "actual" | Source: ICRIER — should be verified |
| FY23-24 ($448B) | Labeled "actual" | Source: ICRIER — should be verified |
| FY24-25 ($529B) | Labeled "actual" | **Questionable** — likely an estimate, not a confirmed actual |
| FY25-26+ | Projected | OK |

## Karnataka Digital Economy Timeline (formerly IT Exports only)

| Year | Value | Status |
|---|---|---|
| FY21-22 ($110B) | Excel base year actual (sum of all 5 verticals) | **Actual** |
| FY22-23 ($131B) | Excel projection (CAGR model) | Projected |
| FY23-24 ($155B) | Excel projection | Projected |
| FY24-25 ($181B) | Excel projection | Projected |
| FY25-26 ($243B) | Excel projection | Projected |
| FY29-30 ($479B) | Excel projection (2030 target) | Target |

## GDP Comparison Timeline: `getGDPComparisonTimeline()`

| Year | Karnataka GSDP | India GDP | Status |
|---|---|---|---|
| FY20-21 | $222B | $2,690B | Actual (MoSPI) |
| FY21-22 | $270B | $3,190B | Actual |
| FY22-23 | $281B | $3,260B | Actual |
| FY23-24 | $306B | $3,600B | Likely actual but needs verification |
| FY24-25 | $345B | $3,900B | Advance estimate — final not yet released |

---

## NASSCOM FY24-25 Actuals (Published Feb 2025)

These are **actual industry numbers** from the NASSCOM Strategic Review FY24-25, which can be used to validate or replace the KDEM Excel CAGR projections.

| Metric | India FY24-25 Actual | KA Share Assumption | Karnataka Estimate | Excel Projection | Delta |
|---|---|---|---|---|---|
| **IT Industry Total** | **$283B** | — | — | — | — |
| IT Exports | **$224B** | 38% | **~$85B** | $95B | -$10B (Excel overestimates by ~12%) |
| IT Domestic | **$58.2B** | 30% | **~$17.5B** | $22.4B | -$4.9B (Excel overestimates by ~28%) |
| Total IT Talent | **5.8M** | ~38% | **~2.2M** | — | — |
| New Hires FY25 | **126,000** | — | — | — | — |

Source: NASSCOM Strategic Review 2025, nasscom.in

### STPI Karnataka FY24-25 (Official)
- STPI-registered exports (Bengaluru zone): **₹4,53,593 crore (~$52B)**
- This covers only STPI-registered SEZ/STP units — roughly half of total IT industry activity
- Source: STPI Bengaluru Annual Report

### Karnataka Total Services Exports (VTPC)
- Total services exports FY24-25: **$159B** (includes IT + non-IT services like engineering, consulting)
- Source: Karnataka VTPC (Virtual Trade Promotion Cell)

### SEZ Data
- SEZ export data is published by **DGFT (Ministry of Commerce)**, not RBI
- SEZ numbers would **undercount** IT activity even more than STPI — many IT companies operate from non-SEZ premises
- NASSCOM methodology is the most comprehensive for IT industry sizing

### Reconciliation: Excel Projection vs NASSCOM Actual

| Vertical | Excel CAGR | Actual Growth (FY22→25) | Why the Gap? |
|---|---|---|---|
| IT Exports | 12% assumed | ~8% actual | Global tech spending slowdown in FY23-24 |
| IT Domestic | 15% assumed | ~6% actual | Domestic market growth lagged expectations |
| ESDM | ICEA-based | N/A | MeitY actual ($36.69B) vs Excel ($40.09B) = 9% overestimate |

**Decision needed:** Should the dashboard use:
1. **KDEM Excel projections** ($95B IT Exports) — matches the official KDEM model
2. **NASSCOM actuals applied with KA share** ($85B IT Exports) — more accurate but breaks model consistency
3. **Hybrid** — show Excel projections as "KDEM Model" and NASSCOM actuals as "Industry Actual" where available

---

## Bottom Line

The KDEM Excel model uses **FY 2021-22 as base year** and projects forward using CAGR assumptions. For FY24-25, we now have:
- **NASSCOM actuals**: India IT = $283B (exports $224B + domestic $58.2B) — allows computing KA figures at 38%/30% share
- **STPI actuals**: Karnataka IT exports $52B (STPI-registered only, ~half of total)
- **MeitY ESDM actual**: $36.69B (vs Excel projection of $40.09B)
- **No independent actuals** for Startups or Digitizing sectors

The Excel model overestimates IT Exports by ~12% and IT Domestic by ~28% compared to NASSCOM actuals applied with the same KA share assumptions.

### Source Files
- **Primary model**: `supporting-docs/Estimation of Digital Economy numbers - Finalized numbers.xlsx`
- **Validation**: `supporting-docs/Data Validation for Digital Economy numbers_v2.xlsx`
- **Summary (Slide 3)**: `supporting-docs/Digital Eco Ind KA Data 16 12.xlsx`
- **Digitizing framework**: `supporting-docs/McKinsey_Digital-India-technology-to-transform-a-connected-nation-Full-report.pdf`
- **NASSCOM**: Strategic Review FY24-25 (nasscom.in, Feb 2025)
- **STPI**: STPI Bengaluru Annual Report FY24-25
- **VTPC**: Karnataka Virtual Trade Promotion Cell FY24-25 data

---

# McKinsey (2019) vs KDEM Excel: Newly Digitizing Sectors Comparison

| # | Sub-sector | McKinsey India 2025 Potential | KDEM Excel India FY21-22 Base | KDEM Excel India FY29-30 | KA Share | KA FY29-30 |
|---|---|---|---|---|---|---|
| 1 | Digital Communication Services | $55B | $23.0B | $76.1B | 6.5% | $6.1B |
| 2 | Government e-Marketplace | $25B | $13.0B | $36.6B | 10% | $4.5B |
| 3 | Direct Benefit Transfer | $15B | $5.66B | $17.8B | 15% | $3.6B |
| 4 | Tech-enabled Healthcare | $10B | $1.0B | $7.3B | 8% | $0.3B |
| 5 | Education Platforms | $50B | $10.0B | $51.3B | 5% | $3.4B |
| 6 | Digitally Enabled Power Distribution | $15B (Energy total) | $1.0B | $16.1B | 8% | $2.1B |
| 7 | Smart Grids | (incl. in Energy) | $0.25B | $1.4B | 8% | $0.1B |
| 8 | Digital Payments | $170B (Financial total) | $5.0B | $51.3B | 10% | $3.9B |
| 9 | Flow-based Lending (MSMEs) | (incl. in Financial) | $10.0B | $153.7B | 6% | $8.8B |
| 10 | Digital Farmer Financing | $70B (Agri total) | $1.0B | $18.3B | 13% | $2.1B |
| 11 | Precision Agriculture | (incl. in Agri) | $1.0B | $33.1B | 9% | $1.8B |
| 12 | Universal Agri Marketplace | (incl. in Agri) | $1.0B | $33.1B | 6% | $2.0B |
| 13 | Online Talent Platforms | $70B (Jobs total) | $1.0B | $99.3B | 5% | $0.2B |
| 14 | Digital Supply Chain - Retail | $35B | $1.0B | $11.7B | 6.5% | $2.7B |
| 15 | Digital Supply Chain - E-Commerce | (incl. in Retail) | $1.0B | $25.9B | 6.5% | $2.7B |
| 16 | Efficient Transport & Logistics | $30B | $1.0B | $32.2B | 8% | $4.7B |
| 17 | Business Digitization & IoT | $90B | $1.0B | $167.4B | 9% | $12.8B |
| | **TOTAL** | **~$635B** (potential) | **$76.9B** | **~$832B** | — | **~$60B** |

## McKinsey Report Provenance Analysis (Feb 2026)

After reading the full McKinsey report ("Digital India: Technology to transform a connected nation", March 2019):

### What McKinsey provides:
- **Exhibit 18** (page 58): Sector-level "potential economic value" endpoint ranges for India 2025 (e.g., Financial Services: $130-170B, Agriculture: $50-65B)
- **Exhibit 17** (page 56): Adoption rate matrix (20-80%) classifying 17 use cases by public/private readiness
- **Box 3** (page 55): Methodology caveat — these are "end-to-end value to the system" that "may or may not materialise as GDP or market-based exchanges"

### What McKinsey does NOT provide:
- No CAGRs or growth multipliers
- No sub-sector breakdowns within categories (e.g., doesn't split "Financial Services" into "Digital Payments" vs "Flow-based Lending")
- No intermediate year projections
- No state-level data

### What the KDEM Excel team independently created:
1. Split McKinsey's broad sectors into 17 specific sub-use-cases
2. Assigned FY21-22 India base values (McKinsey only says "<$1B" for most)
3. Reverse-engineered aggressive CAGRs (20%-227%) to reach approximations of McKinsey's 2025 numbers
4. Applied Karnataka share % (5%-15%) — entirely KDEM assumptions
5. Set post-FY25 growth rates (10% India, 15% Karnataka) uniformly

### FY24-25 Value Discrepancy
- Excel bottom-up sub-sector sum for FY24-25: **$20.23B** (authentic Excel data)
- Smooth CAGR interpolation from $6B base: **$14.85B** (synthetic number)
- Resolution: Dashboard now uses $20.23B (the Excel's actual bottom-up sum)

### Confidence Assessment
The CAGRs are reverse-engineered, not sourced. The "potential economic value" ≠ revenue. Confidence remains at **2 stars** across all 17 sub-sectors.

## Key Observations

1. **McKinsey numbers are "potential economic value"** (2019 report, 2025 horizon) — not actual revenue. They represent what could be captured if digital use cases are adopted at projected rates.

2. **KDEM Excel adapts the same 17 use cases** but uses FY21-22 actuals as base with aggressive CAGRs (up to 227% for IoT Analytics pre-2025).

3. **Post-2025, all sub-sectors flatten** to a uniform 15% CAGR for Karnataka and 10% for India, regardless of the initial growth trajectory.

4. **Top 3 Karnataka sub-sectors by FY29-30 value**: Business Digitization & IoT ($12.8B), Flow-based Lending ($8.8B), Digital Communication ($6.1B).

5. **Lowest KA shares** (5-6%): Education, Talent Platforms, Flow-based Lending, Universal Agri Marketplace — reflects these being more distributed across India.

6. **Highest KA shares** (13-15%): Direct Benefit Transfer (15%), Farmer Financing (13%) — reflects Karnataka's strong digital governance and agri-tech ecosystem.

## Methodology Source Chain
- **McKinsey (March 2019)**: "Digital India: Technology to transform a connected nation" — defines the 17 use cases, Exhibit 17
- **MeitY (Feb 2019)**: "India's Trillion Dollar Digital Opportunity" — collaborated with McKinsey on the framework
- **KDEM Excel (2024)**: "Estimation of Digital Economy numbers - Finalized numbers.xlsx" — applies Karnataka-specific shares and CAGRs to McKinsey use cases
