import { gql } from 'nuxt-graphql-request';

export const state = () => ({});

export const actions = {
  async nuxtServerInit({ commit }) {
    const queryGeneral = gql`
      query {
        general {
          nombre
          descripcion
        }
      }
    `;
    const { general } = await this.$graphql.principal.request(queryGeneral);

    // Datos agregados en Ajustes administrativos
    // Tenemos que hacer un query aparte al otro endpoint de Directus /graphql/system
    const baseQuery = gql`
      query {
        settings {
          project_name
          project_url
          project_color
          project_logo {
            id
            title
          }
          public_foreground {
            id
            title
          }
          public_background {
            id
            title
          }
          public_note
        }
      }
    `;
    // los : cambian el nombre
    const { settings: sistema } = await this.$graphql.sistema.request(baseQuery);

    await commit('general/cargar', { ...general, ...sistema });
  },
};
