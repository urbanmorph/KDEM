/**
 * Supabase Client Configuration
 * Provides authenticated access to the KDEM database
 */

import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please check your .env file:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  )
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Export database helpers
export const db = {
  // Dimension tables
  verticals: () => supabase.from('verticals'),
  geographies: () => supabase.from('geographies'),
  factors: () => supabase.from('factors'),

  // Fact table
  targets: () => supabase.from('targets'),

  // Reference tables
  conversionRatios: () => supabase.from('conversion_ratios'),
  skillRequirements: () => supabase.from('skill_requirements'),
  apportionmentRules: () => supabase.from('apportionment_rules'),
  apportionmentConstraints: () => supabase.from('apportionment_constraints'),

  // Views
  geographyDashboard: () => supabase.from('geography_dashboard_view'),
  verticalDistribution: () => supabase.from('vertical_distribution_view'),
  factorSummary: () => supabase.from('factor_summary_view'),
}

// Export RPC helpers for database functions
export const rpc = {
  cascadeFactorTargets: (revenueTargetId) =>
    supabase.rpc('cascade_factor_targets', { revenue_target_id: revenueTargetId }),

  validateGeographicSum: (verticalId, factorId, year) =>
    supabase.rpc('validate_geographic_sum', {
      p_vertical_id: verticalId,
      p_factor_id: factorId,
      p_year: year
    }),

  generateDefaultApportionment: (verticalId, year) =>
    supabase.rpc('generate_default_apportionment', {
      p_vertical_id: verticalId,
      p_year: year
    }),

  refreshAllViews: () =>
    supabase.rpc('refresh_all_views'),
}

export default supabase
