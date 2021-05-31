import { gql } from 'nuxt-graphql-request';

export const state = () => ({
  datos: {},
  menus: {},
});

export const actions = {
  async cargarGeneral({ commit }) {
    const queryGeneral = gql`
      query {
        general {
          nombre
          descripcion
          banner {
            id
            title
          }
        }
        menus {
          nombre
          paginas {
            paginas_id {
              slug
              titulo
            }
          }
        }
      }
    `;
    const { general, menus } = await this.$graphql.principal.request(queryGeneral);

    commit('actualizarDatos', general);
    commit('actualizarMenus', menus);
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

  actualizarMenus(state, menus) {
    menus.forEach((menu) => {
      state.menus[menu.nombre] = menu.paginas.map((pagina) => pagina.paginas_id);
    });
  },
};
