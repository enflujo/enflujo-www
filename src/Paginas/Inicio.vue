<template>
  <main>
    <h1>{{ general.nombre }}</h1>
    <ul>
      <li>
        <enlace href="/">Inicio</enlace>
        <enlace href="/glosario">Glosario</enlace>
      </li>
    </ul>
  </main>
</template>

<script>
import Enlace from '../Componentes/Enlace.vue';
import { entrada, peticion } from '../utilidades/graphql';

export default {
  name: 'Inicio',
  components: { Enlace },

  data() {
    return {
      general: {}
    };
  },

  async mounted() {
    const general = await fetch(entrada, peticion('general { nombre, descripcion }'));
    const { data } = await general.json();
    this.general = data.general;
    console.log(this.general);
  }
};
</script>

<style lang="scss"></style>
