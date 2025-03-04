import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 Important to expose outside localhost
    port: 5173, // Port to expose
    strictPort: true, // If port is already taken, don't switch
    watch: {
      usePolling: true // Needed inside Docker for file watching
    }
  }
})

