import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  // Relative base so the build works whether it's served from the domain
  // root or from a GitHub Pages project subpath like /agrimart.blend_portfolio/
  base: './',
})
