import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/three/') || id.includes('\\three\\')) {
            return 'vendor-three';
          }
          if (id.includes('@react-three')) {
            return 'vendor-r3f';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-framer-motion';
          }
          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }
        },
      },
    },
  },
});
