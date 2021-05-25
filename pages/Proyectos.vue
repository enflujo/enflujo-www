<template>
  <div id="pagina-proyectos" class="archivo"></div>
</template>

<script>
// import { crearHead } from '../utilidades/ayudas';

export default {
  async fetch() {
    
  },

  // head() {
  //   return crearHead(
  //     this.$store.state.general.nombre,
  //     null,
  //     this.$store.state.general.descripcion,
  //     this.$store.state.general.banner,
  //     this.$nuxt.$route.path
  //   );
  // },

  computed: {
    general() {
      return this.$store.state.proyectos.general;
    },
  },
};
</script>

<style lang="scss"></style>
