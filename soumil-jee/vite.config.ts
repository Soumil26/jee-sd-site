import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// IMPORTANT: For project Pages, base must equal the repo name
export default defineConfig({
plugins: [react()],
base: '/soumil-jee/',
})
