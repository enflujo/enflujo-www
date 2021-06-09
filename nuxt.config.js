import { head } from './config/head';
import { css } from './config/css';
import { styleResources } from './config/styleResources';
import { graphql } from './config/graphql';

const isDev = process.env.NODE_ENV === 'development';

const server = {
  host: isDev ? 'localhost' : '0.0.0.0',
  port: isDev ? 3000 : 4043,
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
  css,
  graphql,
  styleResources,
};
