import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    // 🔥 force PostCSS so we get real file/line
    transformer: 'postcss'
  },
  build: {
    cssMinify: 'esbuild' // 🔥 bypass lightningcss
  }
})