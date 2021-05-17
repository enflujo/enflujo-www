<template>
  <div id="inicio">
    <section id="portada" :style="estiloPortada">
      <Logo :color="general.project_color" />
      <h1 class="titulo">
        <span class="bloque">{{ general.nombre }}</span>
      </h1>
      <h2 class="subtitulo">
        <span class="bloque" :style="`background-color:${general.project_color}`">{{ general.descripcion }}</span>
      </h2>
    </section>
  </div>
</template>

<script>
import { urlImagen, crearHead } from '../utilidades/ayudas';

export default {
  data() {
    return {
      estiloPortada: null,
    };
  },

  head() {
    return crearHead(this.general.nombre, null, this.general.descripcion, this.general.banner, this.$nuxt.$route.path);
  },

  computed: {
    general() {
      return this.$store.state.general.datos;
    },
  },

  mounted() {
    if (this.general && !this.estiloPortada) {
      this.crearEstiloPortada();
    }
  },

  methods: {
    crearEstiloPortada() {
      const urlImgPortada = urlImagen(this.general.public_background.id, {
        fit: 'inside',
        width: 1200,
        quality: 60,
      });

      this.estiloPortada = `background-image:url(${urlImgPortada})`;
    },
  },
};
</script>

<style lang="scss">
section {
  min-height: 50vh;
}

#portada {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.enflujoLogo {
  width: 130px;
  background-color: white;
  padding: 20px;
}

.titulo {
  font-size: 3em;
  margin: 0;
  padding: 0.5em 0;

  .bloque {
    background-color: white;
    padding: 0.5em;
  }
}

.subtitulo {
  font-size: 1em;
  color: white;
  font-weight: 100;
}

.celular {
  .titulo {
    font-size: 2em;
    padding: 0.2em 0;
    width: 90vw;
  }

  .subtitulo {
    font-size: 0.85em;
  }
}
</style>
