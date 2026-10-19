import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    enforce: 'post' as const,
    transformIndexHtml(html: string, ctx: any) {
      if (!ctx || !ctx.bundle) return html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && (chunk as any).source) {
          const cssCode = (chunk as any).source.toString();
          html = html.replace(
            new RegExp(`<link rel="stylesheet"[^>]*href="[/]?[^"]*${fileName}"[^>]*>`),
            `<style>${cssCode}</style>`
          );
        }
      }
      return html;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          const name = assetInfo.name || '';
          if (name.endsWith('.woff2')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks(id: string) {
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
