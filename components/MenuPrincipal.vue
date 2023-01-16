<template>
  <div ref="menu" v-click-outside="cerrarMenu" :class="`menuPrincipal ${menuAbierto ? 'abierto' : 'cerrado'}`">
    <nav class="menuContenido" :style="`background-color:${colorFondo}`">
      <NuxtLink to="/" class="navBtn" @click.native="resolverMenu">Inicio</NuxtLink>
      <NuxtLink
        v-for="pagina in paginas"
        :key="pagina.slug"
        :to="`/${pagina.slug}`"
        class="navBtn"
        @click.native="resolverMenu"
      >
        {{ pagina.titulo }}
      </NuxtLink>
      <span class="lineaVertical"></span>
    </nav>

    <nav class="menuRedes">
      <a v-for="obj in redes" :key="obj.red" :href="obj.url" target="_blank" rel="noopener">
        <SvgRedes :menuAbierto="menuAbierto" :nombre="obj.red" />
      </a>
    </nav>

    <div class="menuBtn" :style="`background-color:${colorFondo}`" @click="resolverMenu">
      <span class="menuRaya"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuAbierto: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    paginas() {
      return this.$store.state.general.paginas;
    },

    colorFondo() {
      return this.$store.state.general.datos.project_color;
    },

    redes() {
      return this.$store.state.general.datos.redes;
    },
  },

  methods: {
    resolverMenu() {
      this.$emit('resolverMenu');
    },

    cerrarMenu() {
      this.$emit('cerrarMenu');
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
$menuRayaAncho: 30px;
$menuRayaAlto: 2px;
$menuRayaRadio: 2px;
$menuRayaEspacio: 8px;
$menuRayaColor: rgb(36, 36, 36);

.menuPrincipal {
  font-family: $fuenteMono;
  z-index: 9999;

  &.abierto {
    .menuBtn {
      background-color: initial !important;
      color: white;
    }

    .menuRaya {
      background-color: white;

      &::before,
      &::after {
        background-color: white;
      }
    }
  }
}

.menuBtn {
  position: fixed;
  background-color: white !important;
  width: $altoMenu;
  height: $altoMenu;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.menuContenido {
  height: 0;
  width: 0;
  position: fixed;
  right: 0;
  padding: 0;
  top: 0;
  text-align: center;
  font-size: 0;
  color: white;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a,
  a:link {
    color: white;
    padding: 0.3em 1em 0.7em 0.3em;
    margin-bottom: 0.5em;
    background-image: url(~/imgs/marco.svg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-weight: $fuentePrincipalPeso;

    &:hover {
      color: color.scale($colorPrincipal, $lightness: 70%);
    }

    &.nuxt-link-exact-active {
      opacity: 0.5;
    }

    &::before {
      content: '>>';
      font-size: 0.8em;
      padding-right: 0.3em;
    }
  }
}

.abierto {
  .menuBtn {
    .menuRaya {
      height: 0;
      width: 0;

      &::before {
        transform: rotate(45deg) translate(-12px, 12px);
      }

      &::after {
        transform: rotate(-45deg) translate(-12px, -12px);
      }
    }
  }

  .menuContenido {
    width: 100vw;
    height: 100vh;
    padding: 60px 2em;
    font-size: 1.2em;
  }
}

.menuRaya {
  width: $menuRayaAncho;
  height: $menuRayaAlto;
  background-color: $menuRayaColor;
  border-radius: $menuRayaRadio;
  transition: all 0.2s ease-in-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: $menuRayaAncho;
    height: $menuRayaAlto;
    background-color: $menuRayaColor;
    border-radius: $menuRayaRadio;
    transition: all 0.5s ease-in-out;
  }

  &::before {
    transform: translate(0, -$menuRayaEspacio);
  }

  &::after {
    transform: translate(0, $menuRayaEspacio);
  }
}

.menuRedes {
  display: flex;
  margin: 15px;
  z-index: 9999;
  position: fixed;
  right: 0;

  a {
    width: 15px;
    height: 15px;
    margin: 5px;

    &:hover {
      opacity: 0.5;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  .menuBtn {
    width: $altoMenu;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  .abierto {
    .menuContenido {
      width: 50vw;
    }

    .lineaVertical {
      width: 2px;
      height: calc(100vh - #{$altoMenu});
      top: $altoMenu;
      right: 30px;
      background-color: white;
      position: absolute;
    }
  }

  .menuRedes {
    right: 80px;
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .abierto {
    .menuContenido {
      width: 400px;
    }
  }
  .menuRedes {
    right: 124px;
  }
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  .abierto {
    .menuContenido {
      width: 600px;
    }
  }
}
</style>
