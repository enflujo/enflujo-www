import { gql } from 'nuxt-graphql-request';

export const state = () => ({
  datos: {},
  paginas: [],
});

export const actions = {
  async cargarGeneral({ commit }) {
    const queryGeneral = gql`
      query {
        general {
          nombre
          descripcion
          redes
          contenido
          definiciones
          banner {
            id
            title
          }
        }

        paginas(filter: { status: { _eq: "published" } }) {
          slug
          titulo
        }
      }
    `;
    const { general, paginas } = await this.$graphql.principal.request(queryGeneral);

    commit('actualizarDatos', general);
    commit('actualizarPaginas', paginas);
  },

  async cargarSettings({ commit }) {
    const baseQuery = gql`
      query {
        settings {
          project_name
          project_url
          project_color
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
    const { settings } = await this.$graphql.sistema.request(baseQuery);

    commit('actualizarDatos', settings);
  },
};

export const mutations = {
  actualizarDatos(state, datos) {
    state.datos = { ...state.datos, ...datos };
  },

  actualizarPaginas(state, paginas) {
    state.paginas = paginas;
  },
};
