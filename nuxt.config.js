import metasPredeterminado from './utilidades/metasPredeterminado';

export default {
  head: metasPredeterminado,
  // CSS Global: https://go.nuxtjs.dev/config-css
  css: [],
  // Plugins que corren antes del render por página: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Importa automáticamente los components: https://go.nuxtjs.dev/config-components
  components: true,
  // https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/gomah/nuxt-graphql-request
    'nuxt-graphql-request',
  ],
  // https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxt/http',
    // Media Queries - https://github.com/vanhoofmaarten/nuxt-mq
    [
      'nuxt-mq',
      {
        defaultBreakpoint: 'celular',
        breakpoints: {
          celular: 450,
          mediana: 1280,
          grande: Infinity,
        },
      },
    ],
  ],
  // https://go.nuxtjs.dev/config-build
  build: {},
  // Configuración del cliente para GraqhQL
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      principal: {
        endpoint: 'http://159.65.232.239:8055/graphql',
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
      sistema: {
        endpoint: 'http://159.65.232.239:8055/graphql/system',
      },
    },
    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {},
    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,
    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
};
