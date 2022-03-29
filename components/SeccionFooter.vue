<template>
  <footer>
    <div class="flujo">
      <p class="copy">EnFlujo</p>
      <p class="copy fecha">{{ fecha }}</p>
    </div>
    <SvgIcono :color="color" />
  </footer>
</template>

<script>
export default {
  data() {
    return {
      color: '#2d2d2e',
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

<style lang="scss" scoped>
@use 'sass:color';
$margen: 15px;

footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 4em 0 1em 0;
}

.flujo {
  font-size: 0.6em;
  margin: $margen 0;
  text-align: right;

  p {
    margin: 0;
  }
}

.enflujoIcono {
  width: 25px;
  margin: $margen;
}
</style>
