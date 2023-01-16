import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import graphql from '@rollup/plugin-graphql';

export default defineConfig({
  outDir: './publico',
  publicDir: './recursos',
  site: 'https://enflujo.com',
  integrations: [sitemap()],
  vite: {
    plugins: [graphql()],
  },
});
