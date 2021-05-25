export const state = () => ({
  info: null,
  lista: [],
});

export const mutations = {
  cargarInfo(state, datos) {
    state.info = datos;
  },
};
