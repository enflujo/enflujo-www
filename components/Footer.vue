<template>
  <footer>
    <Icono :color="color" />
    <p class="copy">EnFlujo</p>
    <p class="copy fecha">{{ fecha }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      color: '#95989a',
      fecha: '',
    };
  },

  mounted() {
    this.actualizarFecha();
  },

  methods: {
    actualizarFecha() {
      setInterval(() => {
        const ahora = new Date();
        const opciones = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
        this.fecha = ahora.toLocaleString('es-CO', opciones);
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@use "sass:color";

footer {
  background-color: color.scale($colorPrincipal, $lightness: 90%);
  color: #95989a;
  text-align: center;

  .enflujoIcono {
    width: 60px;
    padding: 10px;
  }

  .copy {
    font-size: 0.6em;
    padding-bottom: 2em;
  }
}
</style>
