import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // `npm start` serves the build with `vite preview`; accept requests for the
  // deployed domain, which Vite would otherwise block by Host header.
  preview: {
    allowedHosts: true,
  },
})
