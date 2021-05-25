import { head } from './config/head';
import { css } from './config/css';
import { styleResources } from './config/styleResources';
import { graphql } from './config/graphql';
import mediaQueries from './config/mediaQueries';

export default {
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
  // https://go.nuxtjs.dev/config-modules
  modules: [mediaQueries],
  head,
  css,
  graphql,
  styleResources,
};
