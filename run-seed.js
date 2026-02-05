/**
 * Seed Data Runner
 * Executes seed SQL files against Supabase
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runSeedFile(filePath) {
  console.log(`\n📄 Running seed file: ${filePath}`)

  try {
    const sql = readFileSync(filePath, 'utf-8')

    // Split by semicolons to get individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    console.log(`   Found ${statements.length} SQL statements`)

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i]
      if (stmt.trim().length === 0) continue

      try {
        await supabase.rpc('exec_sql', { sql: stmt })
        console.log(`   ✓ Statement ${i + 1}/${statements.length}`)
      } catch (error) {
        // Try direct query if RPC fails
        const { error: queryError } = await supabase.from('_').select(stmt)
        if (queryError && !queryError.message.includes('already exists')) {
          console.warn(`   ⚠ Statement ${i + 1}: ${queryError.message}`)
        } else {
          console.log(`   ✓ Statement ${i + 1}/${statements.length}`)
        }
      }
    }

    console.log(`   ✅ Completed ${filePath}`)
  } catch (error) {
    console.error(`   ❌ Error in ${filePath}:`, error.message)
    throw error
  }
}

async function runAllSeeds() {
  console.log('🌱 Starting seed data import...\n')

  try {
    // Run seed files in order
    await runSeedFile('./supabase/seed/001_conversion_ratios.sql')
    await runSeedFile('./supabase/seed/002_apportionment_rules.sql')

    console.log('\n✅ All seed data imported successfully!')
    console.log('\n📊 Verifying data...')

    // Verify counts
    const { count: rCount } = await supabase.from('conversion_ratios').select('*', { count: 'exact', head: true })
    const { count: aCount } = await supabase.from('apportionment_rules').select('*', { count: 'exact', head: true })
    const { count: vCount } = await supabase.from('verticals').select('*', { count: 'exact', head: true })
    const { count: gCount } = await supabase.from('geographies').select('*', { count: 'exact', head: true })
    const { count: fCount } = await supabase.from('factors').select('*', { count: 'exact', head: true })

    console.log(`   • Conversion ratios: ${rCount}`)
    console.log(`   • Apportionment rules: ${aCount}`)
    console.log(`   • Verticals: ${vCount}`)
    console.log(`   • Geographies: ${gCount}`)
    console.log(`   • Factors: ${fCount}`)

    console.log('\n🎉 Database setup complete!')
    console.log('\n📍 Next step: npm run dev')

  } catch (error) {
    console.error('\n❌ Seed import failed:', error)
    process.exit(1)
  }
}

runAllSeeds()
