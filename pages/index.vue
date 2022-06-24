<template>
  <main id="inicio">
    <div id="lado1" class="lado">
      <h1 class="titulo">{{ general.nombre }}</h1>
      <p class="descripcion">{{ general.descripcion }}</p>
      <SvgLogo :color="general.project_color" />
    </div>

    <div id="lado2" class="lado"></div>

    <div id="lado3" class="lado"></div>

    <div id="lado4" class="lado"></div>

    <div id="lado5" class="lado"></div>

    <div id="lado6" class="lado"></div>

    <div id="lado7" class="lado"></div>

    <!-- <div id="portada" ref="seccionPortada" class="seccion" :style="estiloPortada">
      <section class="nombrePortada">
        <div class="subtitulo">
          <p></p>
          <p></p>
          <p><span id="ante">..:: Ante el Presente Digital ::..</span></p>
        </div>
      </section>
      <canvas ref="lienzo" class="lienzo"></canvas>
    </div> -->

    <!-- <section v-for="(definicion, i) in general.definiciones" :key="`definicion${i}`" class="seccion contenedorFluido">
      <h3>{{ definicion.titulo }}</h3>
      <div v-if="definicion.contenido" v-html="$md.render(definicion.contenido)"></div>
    </section> -->
  </main>
</template>

<script>
import { urlImagen, crearHead } from '~/utilidades/ayudas';

export default {
  data() {
    return {
      estiloPortada: null,
      ctx: null,
      animReq: null,
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

  beforeMount() {
    window.addEventListener('resize', this.actualizar);
    //
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.actualizar);
    window.cancelAnimationFrame(this.animReq);
  },

  mounted() {
    if (!this.ctx) {
      this.crearContexto();
    }
    this.actualizar();
    this.animReq = requestAnimationFrame(this.animar);
  },

  methods: {
    actualizar() {
      // const { lienzo, seccionPortada } = this.$refs;
      // const ctx = this.ctx;
      // const dims = seccionPortada.getBoundingClientRect();
      // lienzo.width = dims.width;
      // lienzo.height = dims.height;
      // ctx.globalAlpha = 0.5;
    },

    animar() {
      // TODO: animar un fondo liquido
      // this.animReq = requestAnimationFrame(this.animar.bind(this));
    },

    crearEstiloPortada() {
      const urlImgPortada = urlImagen(this.general.public_background.id, {
        fit: 'inside',
        width: 1200,
        quality: 60,
      });

      this.estiloPortada = `background-image:url(${urlImgPortada})`;
    },

    crearContexto() {
      // this.ctx = this.$refs.lienzo.getContext('2d');
    },
  },
};
</script>

<style lang="scss" scoped>
.lado {
  border: 1px dotted rgba($colorPrincipal, 0.5);
}

#lado1 {
  width: calc($anchoLado * 4);
  padding: 5vw;
}
.seccion {
  position: relative;
  z-index: 1;
  margin: 3em auto 3em auto;
}

#portada {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-23px);
}

.nombrePortada {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lienzo {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  vertical-align: top;
  pointer-events: none;
}

.enflujoLogo {
  width: 100px;
  margin-top: 10px;
  display: block;
}

.titulo {
  font-size: 3.5em;
  margin: 0;
}

.subtitulo {
  font-size: 0.9em;
  font-family: $fuenteMono;
  font-weight: $fuentePrincipalPeso;
  padding: 1em 0;
  margin: 6em 0 0;
}

#ante {
  font-weight: bold;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #portada {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .enflujoLogo {
    width: 151px;
    margin-top: 4em;
    // position: absolute;
  }

  .nombrePortada {
    align-items: flex-start;
    margin-left: 30px;
  }

  .subtitulo {
    font-size: 0.85em;
    width: 301px;
    margin-left: 398px;
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
}
</style>
