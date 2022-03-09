import { head } from './config/head';
import { graphql } from './config/graphql';
import { colorBase } from './config/general';

const isDev = process.env.NODE_ENV === 'development';

const server = {
  host: isDev ? 'localhost' : '0.0.0.0',
  port: isDev ? 3000 : 4004,
};

export default {
  server,
  // Importa automáticamente los components: https://go.nuxtjs.dev/config-components
  components: true,
  // https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/gomah/nuxt-graphql-request
    'nuxt-graphql-request',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],
  head,
  graphql,
  loading: {
    color: colorBase,
    continuous: true,
    throttle: 50,
  },
  plugins: ['~/plugins/clickOutside.js'],
  styleResources: {
    scss: ['~assets/scss/constantes.scss', '~assets/scss/mixins.scss'],
    hoistUseStatements: true,
  },
  // CSS Global: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/_normalizar.scss', '~/assets/scss/_general.scss'],
  modules: ['@nuxtjs/markdownit', ['nuxt-lazy-load', { directiveOnly: true }]],
  markdownit: {
    runtime: true, // Se puede usar en los templates con `$md()`
  },
};
