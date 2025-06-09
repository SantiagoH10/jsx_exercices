import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jsx_exercices/docs/color-memory-game/',  // Full path to where files will be served
  build: {
    outDir: '../docs/color-memory-game'
  }
})