<template>
  <main>
    <div class="menu">
      <span class="menu-boton">
        <img src="../imgs/logo-peque.jpg" style="width:100%">
      </span>
      <span class="linea">
      </span>
    </div>
    <div class="cover">
    <div class="pantalla-principal">
      <div class="pantla">
      <div class="cuadro-logo">
        <img src="../imgs/logo-01.png" style="width:100%">
        </div>
        <h1 class="portada">{{ general.nombre }}</h1>
      </div>
      <ul>
        <li class="elementos-portada">
          <enlace href="/" class="boton-inicio">Inicio</enlace>
          <enlace href="/glosario" class="boton-inicio">Glosario</enlace>
        </li>
      </ul>
      </div>
    </div>
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

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/estilos.scss';

</style>
