import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: '../docs',
    assetsDir: 'gallery',
    emptyOutDir: true
  }
})
