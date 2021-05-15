<template>
  <a v-bind:href="href" v-bind:class="{ actual: esActual }" v-on:click="controlClic">
    <slot></slot>
  </a>
</template>

<script>
import rutas from '../rutas';

export default {
  name: 'enlace',
  props: {
    href: {
      type: String,
      required: true
    }
  },

  computed: {
    esActual() {
      return this.href === this.$root.rutaActual;
    }
  },
  methods: {
    controlClic(evento) {
      evento.preventDefault();
      this.$root.rutaActual = this.href;
      window.history.pushState(null, rutas[this.href], this.href);
    }
  }
};
</script>

<style scoped>
</style>
