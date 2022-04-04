<template>
  <img
    v-lazy-load
    :src="`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${ancho} ${alto}'%3E%3C/svg%3E`"
    :data-src="src"
    :alt="titulo"
    :width="ancho"
    :height="alto"
  />
</template>

<script>
import { urlImagen } from '~/utilidades/ayudas';

export default {
  name: 'EnflujoImagen',
  props: {
    imgId: {
      type: String,
      required: true,
    },

    ancho: {
      type: String,
      required: true,
    },

    alto: {
      type: String,
      required: true,
    },

    titulo: {
      type: String,
      default: '',
    },

    resolucion: {
      type: Number,
      default: 80,
    },
  },

  computed: {
    src() {
      return urlImagen(this.imgId, {
        width: this.ancho,
        height: this.alto,
        quality: this.resolucion,
        format: 'webp',
      });
    },
  },
};
</script>
