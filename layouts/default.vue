<template>
  <div id="contenedor" :class="$mq">
    <div>
      <NuxtLink v-for="pagina in paginas" :key="pagina.slug" :to="`/${pagina.slug}`">{{ pagina.titulo }}</NuxtLink>
    </div>
    <Menu :colorIcono="colorIcono" :colorFondo="general.project_color" :nombreMenu="general.nombre_menu" />
    <main>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorIcono: '#FFF',
    };
  },

  computed: {
    general() {
      return this.$store.state.general.datos;
    },

    paginas() {
      return this.$store.state.general.paginas;
    },
  },
};
</script>

<style lang="scss" scoped>
#contenedor {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  width: calc(100vw - 60px);
  flex-grow: 1;
}
</style>
