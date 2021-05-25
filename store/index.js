// import { gql } from 'nuxt-graphql-request';

export const state = () => ({});

export const actions = {
  /**
   *
   * @param {method} commit permite hacer mutation en alguno de los stores
   */
  async nuxtServerInit({ dispatch }) {
    await dispatch('general/cargarGeneral');
    await dispatch('general/cargarSettings');
  },
};
