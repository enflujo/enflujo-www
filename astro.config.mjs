import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import graphql from '@rollup/plugin-graphql';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  outDir: './publico',
  publicDir: './recursos',
  site: 'https://enflujo.com',
  integrations: [sitemap(), robotsTxt()],
  vite: {
    plugins: [graphql()],
  },
});
