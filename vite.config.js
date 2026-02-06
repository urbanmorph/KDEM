import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      mangle: {
        safari10: true
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks(id) {
          // Split Chart.js into separate vendor chunk
          if (id.includes('node_modules/chart.js') || id.includes('node_modules/chartjs-plugin-datalabels')) {
            return 'vendor-chartjs'
          }

          // Split Supabase into separate vendor chunk
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase'
          }

          // Split tab components into logical groups
          // Shared utilities
          if (id.includes('src/utils/')) {
            return 'utils'
          }

          if (id.includes('src/tabs/overview.js')) {
            return 'tab-overview'
          }

          if (id.includes('src/tabs/vertical.js') ||
              id.includes('src/tabs/startups.js')) {
            return 'tab-verticals'
          }

          if (id.includes('src/tabs/geography.js')) {
            return 'tab-geography'
          }

          if (id.includes('src/tabs/factors.js') ||
              id.includes('src/tabs/land.js') ||
              id.includes('src/tabs/labor.js') ||
              id.includes('src/tabs/capital.js') ||
              id.includes('src/tabs/organisation.js')) {
            return 'tab-factors'
          }

          if (id.includes('src/tabs/roadmap.js') ||
              id.includes('src/tabs/sources.js')) {
            return 'tab-misc'
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  },
  define: {
    'global': 'globalThis',
    'process.env': {}
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
