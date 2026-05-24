import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/SAWS_portfolio/' : '/',
  build: {
    outDir: '../docs',
    assetsDir: 'gallery',
    emptyOutDir: true
  }
})
