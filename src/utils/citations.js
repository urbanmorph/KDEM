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
        value: 400, unit: 'USD Billion', source: 'KDEM Mission', confidence: 5,
        type: 'target', year: '2030',
        formula: 'Sum of 5 vertical targets',
        note: 'Exceeds Karnataka GSDP ($345B) - aspirational stretch target'
    },
    'kdem_employment_target': {
        value: 5000000, unit: 'Jobs', source: 'KDEM Mission', confidence: 5,
        type: 'target', year: '2030'
    },

    // IT Exports
    'it_exports_revenue_2030': {
        value: 229, unit: 'USD Billion', source: 'KDEM/NASSCOM/STPI', confidence: 4,
        type: 'projected', year: '2030',
        formula: 'Based on ~15% CAGR from $52B (2024-25)'
    },
    'it_exports_employment_ratio': {
        value: 20, unit: 'employees per $1M USD', source: 'NASSCOM', confidence: 4,
        type: 'actual'
    },

    // IT Domestic
    'it_domestic_revenue_2030': {
        value: 40, unit: 'USD Billion', source: 'KDEM/NASSCOM', confidence: 3,
        type: 'projected', year: '2030'
    },
    'it_domestic_employment_ratio': {
        value: 25, unit: 'employees per $1M USD', source: 'NASSCOM', confidence: 4,
        type: 'actual'
    },

    // ESDM
    'esdm_revenue_2030': {
        value: 105, unit: 'USD Billion', source: 'KDEM/MEITY/IBEF', confidence: 4,
        type: 'projected', year: '2030',
        formula: 'Based on India ESDM growth trajectory, Karnataka ~25% share'
    },
    'esdm_employment_ratio': {
        value: 100, unit: 'employees per $1M USD', source: 'ICEA', confidence: 5,
        type: 'actual',
        note: 'ESDM is 5x more labor-intensive than IT Services'
    },

    // Startups
    'startups_revenue_2030': {
        value: 105, unit: 'USD Billion', source: 'KDEM/NASSCOM', confidence: 3,
        type: 'projected', year: '2030'
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
    'land_ratio': { value: 200, unit: 'sq ft per employee', source: 'Industry Standard', confidence: 4, type: 'actual' },
    'bengaluru_premium': { value: 1.20, unit: 'multiplier', source: 'Real Estate Industry Data', confidence: 3, type: 'estimated' },

    // Conversion Ratios
    'revenue_to_employment_it': { value: 20, unit: 'emp/$1M', source: 'NASSCOM', confidence: 4, type: 'actual' },
    'revenue_to_employment_domestic': { value: 25, unit: 'emp/$1M', source: 'NASSCOM', confidence: 4, type: 'actual' },
    'revenue_to_employment_esdm': { value: 100, unit: 'emp/$1M', source: 'ICEA', confidence: 5, type: 'actual' },
    'employment_to_land': { value: 200, unit: 'sq ft/emp', source: 'Industry Standard', confidence: 4, type: 'actual' },

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
