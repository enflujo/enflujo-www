<template>
  <div id="contenedor" :class="$mq">
    <div><NuxtLink to="/"></NuxtLink></div>
    <Menu :colorIcono="colorIcono" :colorFondo="general.project_color" />
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
  },
};
</script>

<style lang="scss">
html {
  font-family: ibm-plex-mono, 'Courier New', Courier, monospace;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
}

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
