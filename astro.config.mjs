import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { fileURLToPath } from 'node:url';
// import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  outDir: './publico',
  publicDir: './recursos',
  site: 'https://enflujo.com',
  integrations: [
    sitemap(),
    robotsTxt(),
    // compress({
    //   path: './publico',
    // }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
        },
      },
    },
  },
});
