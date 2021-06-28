// Headers Globales: https://go.nuxtjs.dev/config-head
import { colorBase } from './general';

export const head = {
  htmlAttrs: {
    lang: 'es',
  },
  meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: colorBase },
    { name: 'msapplication-TileColor', content: colorBase },
    { name: 'theme-color', content: colorBase },
  ],
  script: [
    {
      defer: true,
      async: true,
      'data-website-id': '569a36fc-18d4-4ee4-a40c-7c7a9a35b3a1',
      src: 'https://analitica.enflujo.com/umami.js',
      'data-domains': 'enflujo.com',
    },
  ],
};
