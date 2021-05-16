export const state = () => ({
  datos: null,
});

export const mutations = {
  cargar(state, datos) {
    state.datos = datos;
  },
};
