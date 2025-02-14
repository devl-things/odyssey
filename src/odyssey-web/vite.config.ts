import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
      }
    }
  },
  server: {
    host: "0.0.0.0",  // Allow external access
    port: 5173,       // Default Vite port
    strictPort: true, // Ensures it doesn't switch ports
    watch: {
      usePolling: true, // Necessary for file changes in Docker
    },
    hmr: {
      clientPort: 5173, // Ensures HMR WebSocket connection works
    },
  },
})
