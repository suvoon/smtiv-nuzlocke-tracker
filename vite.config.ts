import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/smtiv-nuzlocke-tracker/';
  plugins: [react()],
  build: {
    outDir: './build'
  }
})
