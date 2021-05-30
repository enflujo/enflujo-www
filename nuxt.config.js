import { head } from './config/head';
import { css } from './config/css';
import { styleResources } from './config/styleResources';
import { graphql } from './config/graphql';

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
  head,
  css,
  graphql,
  styleResources,
};
