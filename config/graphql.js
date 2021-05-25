// Configuración del cliente para GraqhQL
import { apiBase } from './general';

export const graphql = {
  /**
   * An Object of your GraphQL clients
   */
  clients: {
    principal: {
      endpoint: `${apiBase}/graphql`,
      /**
       * Per-client options overrides
       * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
       */
      options: {},
    },
    sistema: {
      endpoint: `${apiBase}/graphql/system`,
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
};
