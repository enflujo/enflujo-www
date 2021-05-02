<template>
  <main>
    <h1>Glosario</h1>

    <article v-for="entrada in entradas" :key="entrada.id">
      <h2>{{ entrada.concepto }}</h2>
      <p v-html="entrada.definicion"></p>
    </article>
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

<style lang="scss"></style>
