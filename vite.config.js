import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: '/KDEM/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin/index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
})
