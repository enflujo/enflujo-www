<template>
  <main class="articulo">
    <div class="menu">
      <span class="menu-boton">
        <img src="../imgs/logo-peque.jpg" style="width:100%">
      </span>
      <span class="linea">
      </span>
    </div>
    <div class="cover-articulo">
    </div>
    <div class="contenido">
      <h2 class="titulo-articulo">Glosario</h2>
      <article v-for="entrada in entradas" :key="entrada.id">
        <h3>{{ entrada.concepto }}</h3>
        <p v-html="entrada.definicion"></p>
      </article>
    </div>
  </main>
</template>

<script>
import { entrada, peticion } from '../utilidades/graphql';

export default {
  name: 'Glosario',
  data() {
    return {
      entradas: []
    };
  },

  async mounted() {
    const entradas = await fetch(entrada, peticion('glosario { id, concepto, definicion }'));
    const { data } = await entradas.json();

    this.entradas = data.glosario;
  }
};
</script>

<style lang="scss">
</style>
