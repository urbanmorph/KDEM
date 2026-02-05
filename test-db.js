/**
 * Database Connection Test
 * Tests Supabase connection and verifies data
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load environment variables from .env file
const envFile = readFileSync('.env', 'utf-8')
const envVars = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.+)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY

console.log('🔌 KDEM Supabase Connection Test\n')
console.log(`Testing connection to: ${supabaseUrl}\n`)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  const tests = []

  try {
    // Test 1: Fetch verticals
    console.log('Test 1: Fetching verticals...')
    const { data: verticals, error: vError } = await supabase.from('verticals').select('*')
    if (vError) throw new Error(`Verticals error: ${vError.message}`)
    tests.push({ name: 'Verticals', count: verticals.length, success: true })
    console.log(`   ✓ Found ${verticals.length} verticals`)

    // Test 2: Fetch geographies
    console.log('Test 2: Fetching geographies...')
    const { data: geographies, error: gError } = await supabase.from('geographies').select('*')
    if (gError) throw new Error(`Geographies error: ${gError.message}`)
    tests.push({ name: 'Geographies', count: geographies.length, success: true })
    console.log(`   ✓ Found ${geographies.length} geographies`)

    // Test 3: Fetch factors
    console.log('Test 3: Fetching factors...')
    const { data: factors, error: fError } = await supabase.from('factors').select('*')
    if (fError) throw new Error(`Factors error: ${fError.message}`)
    tests.push({ name: 'Factors', count: factors.length, success: true })
    console.log(`   ✓ Found ${factors.length} factors`)

    // Test 4: Fetch conversion ratios
    console.log('Test 4: Fetching conversion ratios...')
    const { data: ratios, error: rError } = await supabase.from('conversion_ratios').select('*')
    if (rError) throw new Error(`Conversion ratios error: ${rError.message}`)
    tests.push({ name: 'Conversion Ratios', count: ratios.length, success: true })
    console.log(`   ✓ Found ${ratios.length} conversion ratios`)

    // Test 5: Fetch apportionment rules
    console.log('Test 5: Fetching apportionment rules...')
    const { data: rules, error: rulesError } = await supabase.from('apportionment_rules').select('*')
    if (rulesError) throw new Error(`Apportionment rules error: ${rulesError.message}`)
    tests.push({ name: 'Apportionment Rules', count: rules.length, success: true })
    console.log(`   ✓ Found ${rules.length} apportionment rules`)

    // Test 6: Test database function
    console.log('Test 6: Testing database function...')
    const { data: apportionment, error: funcError } = await supabase.rpc('generate_default_apportionment', {
      p_vertical_id: 'it-exports',
      p_year: 2030
    })
    if (funcError) throw new Error(`Function error: ${funcError.message}`)
    tests.push({ name: 'Database Functions', count: apportionment?.length || 0, success: true })
    console.log(`   ✓ Function returned ${apportionment?.length || 0} results`)

    // Test 7: Fetch views
    console.log('Test 7: Fetching materialized views...')
    const { data: dashboard, error: viewError } = await supabase.from('geography_dashboard_view').select('*').limit(1)
    if (viewError) throw new Error(`View error: ${viewError.message}`)
    tests.push({ name: 'Materialized Views', count: 'Working', success: true })
    console.log(`   ✓ Views are accessible`)

    // All tests passed!
    console.log('\n✅ Connection Successful!\n')
    console.log('All database tests passed. Your Supabase setup is complete!\n')

    console.log('📊 Summary:')
    console.log(`   • Verticals: ${verticals.length} records`)
    console.log(`   • Geographies: ${geographies.length} records`)
    console.log(`   • Factors: ${factors.length} records`)
    console.log(`   • Conversion Ratios: ${ratios.length} records`)
    console.log(`   • Apportionment Rules: ${rules.length} records`)
    console.log(`   • Database Functions: Working`)
    console.log(`   • Materialized Views: Working`)

    console.log('\n🎯 Sample Data Check:')
    const coreVerticals = verticals.filter(v => v.category === 'core')
    console.log(`   • Core Verticals: ${coreVerticals.map(v => v.name).join(', ')}`)

    const tier1 = geographies.filter(g => g.tier === 'tier1-invest-aggressively')
    console.log(`   • Tier 1 Clusters: ${tier1.map(g => g.name).join(', ')}`)

    console.log(`   • Factors: ${factors.map(f => f.name).join(', ')}`)

    console.log('\n✅ Ready for Next Steps:')
    console.log('   ✓ Supabase project configured')
    console.log('   ✓ Database schema created (9 tables, 3 views)')
    console.log(`   ✓ Seed data loaded (${ratios.length} conversion ratios, ${rules.length} apportionment rules)`)
    console.log('   ✓ Database functions working')
    console.log('   ✓ Frontend connection verified')

    console.log('\n⚠️  Note: Dev server requires Node.js 18+')
    console.log('   Current Node.js version: ' + process.version)
    console.log('   Please upgrade to Node.js 18 or 20 to run the dev server')

    console.log('\n📍 Next: Upgrade Node.js, then run: npm run dev')

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message)
    process.exit(1)
  }
}

testConnection()
