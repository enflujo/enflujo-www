<template>
  <div id="contenedor">
    <MenuNavegacion :colorIcono="colorIcono" />
    <MenuPrincipal :menuAbierto="menuAbierto" @resolverMenu="resolverMenu" @cerrarMenu="cerrarMenu" />
    <Nuxt keepAlive />
    <div id="marco">
      <span id="marcoSuperior" class="seccionMarco"></span>
      <span id="marcoInferior" class="seccionMarco"></span>
      <span id="marcoIzq" class="seccionMarco">
        <div class="flujo">
          <p class="copy">EnFlujo</p>
          <p class="copy fecha">{{ fecha }}</p>
        </div>
      </span>
      <span id="marcoDer" class="seccionMarco"></span>
    </div>

    <SeccionFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorIcono: '#FFF',
      menuAbierto: false,
      fecha: '',
    };
  },

  computed: {
    general() {
      return this.$store.state.general.datos;
    },
  },

  mounted() {
    this.actualizarFecha();
  },

  methods: {
    /**
     * Intercambia el estado del menú: si esta abierto lo cierra, si esta cerrado lo abre.
     */
    resolverMenu() {
      this.menuAbierto = !this.menuAbierto;
    },

    /**
     * Cierra el menú, lo usamos en navegación si el menú esta abierto.
     */
    cerrarMenu() {
      if (this.menuAbierto) {
        this.menuAbierto = false;
      }
    },

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

#contenedor {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  margin: $anchoMarco;
  flex-grow: 1;
}

.flujo {
  font-size: 0.6em;
  width: 50vh;
  left: 32px;
  bottom: 49vh;
  transform-origin: left;
  transform: rotate(90deg);
  position: absolute;
  text-align: right;

  p {
    margin: 0;
  }
}
</style>
