// postcss.config.js — ESM format for Vite 5
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
}
