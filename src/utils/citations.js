/**
 * Citation registry for all KDEM Dashboard data points
 * Every number in the dashboard should trace back to this registry
 */

/**
 * Scale benchmarks for context
 */
export const SCALE_BENCHMARKS = {
    karnataka_gsdp: { value: 345, unit: 'USD Billion', year: '2024-25', source: 'PRS India Budget Analysis 2025-26 (Rs 28.7L Cr @ Rs 83/$)' },
    india_gdp: { value: 3900, unit: 'USD Billion', year: '2024-25', source: 'MoSPI' },
    india_it_revenue: { value: 283, unit: 'USD Billion', year: '2024-25', source: 'NASSCOM Strategic Review 2025' },
    karnataka_it_exports: { value: 85.12, unit: 'USD Billion', year: '2024-25', source: 'NASSCOM × 38% KA share' }
}

/**
 * Get scale context warning when a value exceeds known benchmarks
 */
export function getScaleContext(value, unit) {
    if (unit === 'USD Billion' || unit === 'USD Bn') {
        if (value > SCALE_BENCHMARKS.karnataka_gsdp.value) {
            return {
                warning: true,
                message: `Exceeds Karnataka GSDP ($${SCALE_BENCHMARKS.karnataka_gsdp.value}B)`,
                benchmark: SCALE_BENCHMARKS.karnataka_gsdp
            }
        }
    }
    return null
}

/**
 * Citation registry - maps data point keys to their metadata
 * type: 'actual' | 'projected' | 'estimated' | 'target' | 'computed'
 * confidence: 1-5 stars
 */
export const CITATIONS = {
    // KDEM Mission Targets
    'kdem_revenue_target': {
        value: 329, unit: 'USD Billion', source: 'KDEM Mission (revised conservative projection)', confidence: 5,
        type: 'target', year: '2032',
        formula: 'Sum of 4 revenue vertical targets using industry-benchmarked CAGRs (Startups excluded — double-counts with IT)',
        note: 'Revised from $400B by 2030 to $329B by 2032 using conservative CAGRs. Startup revenue excluded to avoid double-counting with IT Exports/Domestic.'
    },
    'kdem_employment_target': {
        value: 5000000, unit: 'Jobs', source: 'KDEM Mission', confidence: 5,
        type: 'target', year: '2032'
    },

    // IT Exports
    'it_exports_revenue_2030': {
        value: 165, unit: 'USD Billion', source: 'KDEM/NASSCOM/STPI (revised)', confidence: 4,
        type: 'projected', year: '2032',
        formula: 'Based on 10% CAGR from $85.1B (FY24-25)'
    },
    'it_exports_employment_ratio': {
        value: 16, unit: 'employees per $1M USD', source: 'NASSCOM (AI-adjusted medium)', confidence: 3,
        type: 'estimated',
        note: 'Base ratio 20 (NASSCOM FY25). AI-adjusted to 16 per Bessemer Oct 2025 (~25% productivity gain). Used for FY32 target calculation.'
    },

    // IT Domestic
    'it_domestic_revenue_2030': {
        value: 34, unit: 'USD Billion', source: 'KDEM/NASSCOM (revised)', confidence: 3,
        type: 'projected', year: '2032'
    },
    'it_domestic_employment_ratio': {
        value: 18, unit: 'employees per $1M USD', source: 'NASSCOM (AI-adjusted medium)', confidence: 3,
        type: 'estimated',
        note: 'Base ratio ~21 (NASSCOM FY25 domestic). AI-adjusted to 18 (~15% reduction; domestic less automatable).'
    },

    // ESDM
    'esdm_revenue_2030': {
        value: 95, unit: 'USD Billion', source: 'KDEM/MEITY/IBEF (revised)', confidence: 4,
        type: 'projected', year: '2032',
        formula: 'Based on India ESDM growth trajectory, Karnataka ~25% share'
    },
    'esdm_employment_ratio': {
        value: 9, unit: 'employees per $1M USD', source: 'MeitY FY25 actual + KDEM projection', confidence: 3,
        type: 'estimated',
        note: 'AI-adjusted medium scenario. Current ratio ~7.7 (MeitY FY25: $36.69B / 284K). Target 9 reflects expansion into OSAT/PCB manufacturing (more labor-intensive). DB legacy value is 100 (ICEA generic); see Category B reconciliation.'
    },

    // Startups
    'startups_revenue_2030': {
        value: 22, unit: 'USD Billion', source: 'KDEM Excel projection (revised)', confidence: 3,
        type: 'projected', year: '2031-32',
        note: 'Revised from $105B. Startup revenue excluded from total to avoid double-counting with IT Exports/Domestic.'
    },

    // Economic Context
    'india_gdp_2024': { value: 3900, unit: 'USD Billion', source: 'MoSPI', confidence: 5, type: 'actual', year: '2024-25' },
    'karnataka_gsdp_2024': { value: 345, unit: 'USD Billion', source: 'PRS India Budget Analysis 2025-26 (Rs 28.7L Cr @ Rs 83/$)', confidence: 5, type: 'estimated', year: '2024-25' },

    // India Digital Economy
    'india_digital_economy_2023': { value: 402, unit: 'USD Billion', source: 'ICRIER/MoSPI', confidence: 4, type: 'actual', year: '2022-23' },
    'india_digital_economy_2030': { value: 1247, unit: 'USD Billion', source: 'ICRIER estimates', confidence: 3, type: 'projected', year: '2029-30' },

    // Startup Ecosystem
    'bengaluru_startups': { value: 2443, unit: 'Active funded startups', source: 'Bengaluru Innovation Report 2025', confidence: 5, type: 'actual' },
    'bengaluru_unicorns': { value: 53, unit: 'Unicorns', source: 'Bengaluru Innovation Report 2025', confidence: 5, type: 'actual' },
    'bengaluru_soonicorns': { value: 183, unit: 'Soonicorns (39% of India)', source: 'Bengaluru Innovation Report 2025', confidence: 5, type: 'actual' },

    // Land & Infrastructure
    'land_ratio': { value: 200, unit: 'sq ft per employee', source: 'Industry Standard (generic fallback)', confidence: 3, type: 'estimated', note: 'Generic fallback only. Per-vertical DB ratios: IT Exports 100, ESDM 33, Startups 80, IT Domestic 100, Digitizing 150 sq ft/emp.' },
    'bengaluru_premium': { value: 1.20, unit: 'multiplier', source: 'Real Estate Industry Data', confidence: 3, type: 'estimated' },

    // Conversion Ratios
    'revenue_to_employment_it': { value: 16, unit: 'emp/$1M', source: 'NASSCOM (AI-adjusted medium)', confidence: 3, type: 'estimated', note: 'Base ratio 20 (NASSCOM FY25). AI-adjusted to 16 per Bessemer Oct 2025 (~25% productivity gain by FY32).' },
    'revenue_to_employment_domestic': { value: 18, unit: 'emp/$1M', source: 'NASSCOM (AI-adjusted medium)', confidence: 3, type: 'estimated', note: 'Base ratio ~21 (NASSCOM FY25). AI-adjusted to 18 (~15% reduction; domestic less automatable than exports).' },
    'revenue_to_employment_esdm': { value: 9, unit: 'emp/$1M', source: 'MeitY FY25 + KDEM projection', confidence: 3, type: 'estimated', note: 'Current ratio 7.7. Target 9 reflects OSAT/PCB expansion. DB legacy value is 100 (ICEA generic).' },
    'employment_to_land': { value: 200, unit: 'sq ft/emp', source: 'Industry Standard (generic fallback)', confidence: 3, type: 'estimated', note: 'Generic fallback. Per-vertical DB values: IT Exports 100, ESDM 33, Startups 80, IT Domestic 100, Digitizing 150 sq ft/emp.' },

    // Capital/VC
    'bengaluru_vc_total': { value: 79, unit: 'USD Billion', source: 'Bengaluru Innovation Report 2025', confidence: 5, type: 'actual' },
    'bengaluru_vc_share': { value: 46, unit: '%', source: 'Bengaluru Innovation Report 2025', confidence: 5, type: 'actual' },

    // Workforce
    'bengaluru_tech_workforce': { value: 2500000, unit: 'Workers', source: 'Bengaluru Innovation Report 2025', confidence: 4, type: 'estimated' },
    'bengaluru_ai_professionals': { value: 600000, unit: 'AI/ML Professionals', source: 'Bengaluru Innovation Report 2025', confidence: 4, type: 'estimated' },
}

/**
 * Get citation for a specific data point
 */
export function getCitation(key) {
    return CITATIONS[key] || null
}

/**
 * Get data type badge info
 */
export function getDataTypeBadge(type) {
    const badges = {
        'actual': { label: 'Verified', className: 'data-type-actual' },
        'projected': { label: 'Projected', className: 'data-type-projected' },
        'estimated': { label: 'Estimated', className: 'data-type-estimated' },
        'target': { label: 'Target', className: 'data-type-target' },
        'computed': { label: 'Computed', className: 'data-type-computed' }
    }
    return badges[type] || badges['estimated']
}
