/**
 * Data Service Layer
 * Provides data fetching and aggregation functions for the KDEM dashboard
 */

import { db, rpc } from '../lib/supabaseClient.js'

/**
 * Fetch all verticals with optional filtering
 */
export async function fetchVerticals(category = null) {
  try {
    let query = db.verticals().select('*')

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching verticals:', error)
    throw error
  }
}

/**
 * Fetch all geographies with optional filtering
 */
export async function fetchGeographies(tier = null) {
  try {
    let query = db.geographies().select('*')

    if (tier) {
      query = query.eq('tier', tier)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching geographies:', error)
    throw error
  }
}

/**
 * Fetch all factors of production
 */
export async function fetchFactors() {
  try {
    const { data, error } = await db.factors().select('*')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching factors:', error)
    throw error
  }
}

/**
 * Fetch targets with optional filtering
 */
export async function fetchTargets(filters = {}) {
  try {
    let query = db.targets().select('*')

    if (filters.verticalId) {
      query = query.eq('vertical_id', filters.verticalId)
    }

    if (filters.geographyId) {
      query = query.eq('geography_id', filters.geographyId)
    }

    if (filters.factorId) {
      query = query.eq('factor_id', filters.factorId)
    }

    if (filters.year) {
      query = query.eq('year', filters.year)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching targets:', error)
    throw error
  }
}

/**
 * Fetch conversion ratios for a specific vertical
 */
export async function fetchConversionRatios(verticalId = null) {
  try {
    let query = db.conversionRatios().select('*')

    if (verticalId) {
      query = query.eq('vertical_id', verticalId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching conversion ratios:', error)
    throw error
  }
}

/**
 * Fetch apportionment rules for a specific vertical
 */
export async function fetchApportionmentRules(verticalId = null) {
  try {
    let query = db.apportionmentRules().select('*')

    if (verticalId) {
      query = query.eq('vertical_id', verticalId)
    }

    const { data, error } = await query.eq('status', 'active')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching apportionment rules:', error)
    throw error
  }
}

/**
 * Fetch geography dashboard view (materialized view with aggregated data)
 */
export async function fetchGeographyDashboard(geographyId = null) {
  try {
    let query = db.geographyDashboard().select('*')

    if (geographyId) {
      query = query.eq('geography_id', geographyId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching geography dashboard:', error)
    throw error
  }
}

/**
 * Fetch vertical distribution view
 */
export async function fetchVerticalDistribution(verticalId = null) {
  try {
    let query = db.verticalDistribution().select('*')

    if (verticalId) {
      query = query.eq('vertical_id', verticalId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching vertical distribution:', error)
    throw error
  }
}

/**
 * Fetch factor summary view
 */
export async function fetchFactorSummary() {
  try {
    const { data, error } = await db.factorSummary().select('*')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching factor summary:', error)
    throw error
  }
}

/**
 * Generate default apportionment for a vertical and year
 */
export async function generateDefaultApportionment(verticalId, year) {
  try {
    const { data, error } = await rpc.generateDefaultApportionment(verticalId, year)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error generating default apportionment:', error)
    throw error
  }
}

/**
 * Aggregate targets by vertical for overview
 */
export async function getVerticalOverview(year = 2030) {
  try {
    // Fetch all verticals
    const verticals = await fetchVerticals('core')

    // Fetch all targets for the year
    const targets = await fetchTargets({ year })

    // Group targets by vertical
    const overview = verticals.map(vertical => {
      const verticalTargets = targets.filter(t => t.vertical_id === vertical.id)

      // Aggregate by factor
      const revenue = verticalTargets
        .filter(t => t.metric === 'revenue')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const employment = verticalTargets
        .filter(t => t.metric === 'employment')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const land = verticalTargets
        .filter(t => t.metric === 'land_required' || t.metric === 'land')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const capital = verticalTargets
        .filter(t => t.metric === 'capital_required' || t.metric === 'capital' || t.metric === 'funding_amount')
        .reduce((sum, t) => sum + Number(t.value), 0)

      return {
        id: vertical.id,
        name: vertical.name,
        category: vertical.category,
        revenue_usd_bn: revenue,
        employment: employment,
        land_sqft: land,
        capital_inr_cr: capital,
        target_count: verticalTargets.length
      }
    })

    return overview
  } catch (error) {
    console.error('Error getting vertical overview:', error)
    throw error
  }
}

/**
 * Aggregate targets by geography for cluster view
 */
export async function getGeographyOverview(year = 2030) {
  try {
    // Fetch all geographies
    const geographies = await fetchGeographies()

    // Fetch all targets for the year
    const targets = await fetchTargets({ year })

    // Group targets by geography
    const overview = geographies.map(geography => {
      const geoTargets = targets.filter(t => t.geography_id === geography.id)

      // Aggregate by metric
      const revenue = geoTargets
        .filter(t => t.metric === 'revenue')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const employment = geoTargets
        .filter(t => t.metric === 'employment')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const land = geoTargets
        .filter(t => t.metric === 'land_required' || t.metric === 'land')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const capital = geoTargets
        .filter(t => t.metric === 'capital_required' || t.metric === 'capital' || t.metric === 'funding_amount')
        .reduce((sum, t) => sum + Number(t.value), 0)

      return {
        id: geography.id,
        name: geography.name,
        tier: geography.tier,
        region: geography.region,
        revenue_usd_bn: revenue,
        employment: employment,
        land_sqft: land,
        capital_inr_cr: capital,
        target_count: geoTargets.length
      }
    })

    return overview
  } catch (error) {
    console.error('Error getting geography overview:', error)
    throw error
  }
}

/**
 * Get total digital economy metrics (all verticals, all geographies)
 */
export async function getTotalMetrics(year = 2030) {
  try {
    const targets = await fetchTargets({ year })

    // Aggregate by unique metric (avoid double-counting across dimensions)
    // Note: State-level targets have been removed from database (migration 009)
    // Totals are computed from city-level targets
    const uniqueTargets = targets.filter(t => !t.parent_target_id)

    const revenue = uniqueTargets
      .filter(t => t.metric === 'revenue')
      .reduce((sum, t) => sum + Number(t.value), 0)

    const employment = uniqueTargets
      .filter(t => t.metric === 'employment')
      .reduce((sum, t) => sum + Number(t.value), 0)

    const land = uniqueTargets
      .filter(t => t.metric === 'land_required' || t.metric === 'land')
      .reduce((sum, t) => sum + Number(t.value), 0)

    const capital = uniqueTargets
      .filter(t => t.metric === 'capital_required' || t.metric === 'capital' || t.metric === 'funding_amount')
      .reduce((sum, t) => sum + Number(t.value), 0)

    return {
      total_revenue_usd_bn: revenue,
      total_employment: employment,
      total_land_sqft: land,
      total_capital_inr_cr: capital,
      target_count: targets.length
    }
  } catch (error) {
    console.error('Error getting total metrics:', error)
    throw error
  }
}

/**
 * Get vertical details with geographic breakdown
 */
export async function getVerticalDetails(verticalId, year = 2030) {
  try {
    // Fetch vertical info
    const verticals = await fetchVerticals()
    const vertical = verticals.find(v => v.id === verticalId)

    if (!vertical) {
      throw new Error(`Vertical ${verticalId} not found`)
    }

    // Fetch targets for this vertical
    const targets = await fetchTargets({ verticalId, year })

    // Fetch apportionment rules
    const rules = await fetchApportionmentRules(verticalId)

    // Group by geography
    const geographies = await fetchGeographies()
    const geographicBreakdown = geographies.map(geo => {
      const geoTargets = targets.filter(t => t.geography_id === geo.id)

      const revenue = geoTargets
        .filter(t => t.metric === 'revenue')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const employment = geoTargets
        .filter(t => t.metric === 'employment')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const land = geoTargets
        .filter(t => t.metric === 'land_required' || t.metric === 'land')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const capital = geoTargets
        .filter(t => t.metric === 'capital_required' || t.metric === 'capital' || t.metric === 'funding_amount')
        .reduce((sum, t) => sum + Number(t.value), 0)

      return {
        geography: geo,
        revenue_usd_bn: revenue,
        employment: employment,
        land_sqft: land,
        capital_inr_cr: capital
      }
    }).filter(g => g.revenue_usd_bn > 0 || g.employment > 0)

    // Calculate totals
    const totalRevenue = geographicBreakdown.reduce((sum, g) => sum + g.revenue_usd_bn, 0)
    const totalEmployment = geographicBreakdown.reduce((sum, g) => sum + g.employment, 0)
    const totalLand = geographicBreakdown.reduce((sum, g) => sum + g.land_sqft, 0)
    const totalCapital = geographicBreakdown.reduce((sum, g) => sum + g.capital_inr_cr, 0)

    return {
      vertical,
      totals: {
        revenue_usd_bn: totalRevenue,
        employment: totalEmployment,
        land_sqft: totalLand,
        capital_inr_cr: totalCapital
      },
      geographicBreakdown,
      apportionmentRules: rules
    }
  } catch (error) {
    console.error('Error getting vertical details:', error)
    throw error
  }
}

/**
 * Get geography details with vertical breakdown
 */
export async function getGeographyDetails(geographyId, year = 2030) {
  try {
    // Fetch geography info
    const geographies = await fetchGeographies()
    const geography = geographies.find(g => g.id === geographyId)

    if (!geography) {
      throw new Error(`Geography ${geographyId} not found`)
    }

    // Fetch targets for this geography
    const targets = await fetchTargets({ geographyId, year })

    // Group by vertical
    const verticals = await fetchVerticals()
    const verticalBreakdown = verticals.map(vertical => {
      const vertTargets = targets.filter(t => t.vertical_id === vertical.id)

      const revenue = vertTargets
        .filter(t => t.metric === 'revenue')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const employment = vertTargets
        .filter(t => t.metric === 'employment')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const land = vertTargets
        .filter(t => t.metric === 'land_required' || t.metric === 'land')
        .reduce((sum, t) => sum + Number(t.value), 0)

      const capital = vertTargets
        .filter(t => t.metric === 'capital_required' || t.metric === 'capital' || t.metric === 'funding_amount')
        .reduce((sum, t) => sum + Number(t.value), 0)

      return {
        vertical,
        revenue_usd_bn: revenue,
        employment: employment,
        land_sqft: land,
        capital_inr_cr: capital
      }
    }).filter(v => v.revenue_usd_bn > 0 || v.employment > 0)

    // Calculate totals
    const totalRevenue = verticalBreakdown.reduce((sum, v) => sum + v.revenue_usd_bn, 0)
    const totalEmployment = verticalBreakdown.reduce((sum, v) => sum + v.employment, 0)
    const totalLand = verticalBreakdown.reduce((sum, v) => sum + v.land_sqft, 0)
    const totalCapital = verticalBreakdown.reduce((sum, v) => sum + v.capital_inr_cr, 0)

    return {
      geography,
      totals: {
        revenue_usd_bn: totalRevenue,
        employment: totalEmployment,
        land_sqft: totalLand,
        capital_inr_cr: totalCapital
      },
      verticalBreakdown
    }
  } catch (error) {
    console.error('Error getting geography details:', error)
    throw error
  }
}
