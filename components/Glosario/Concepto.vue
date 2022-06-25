<template>
  <div id="glosarioContenedor">
    <div v-for="(concepto, i) in glosario" :key="`concepto-${i}`">
      <div class="concepto" @mousedown="mostrarDefinicion(concepto)">
        {{ concepto.titulo }}
      </div>
    </div>
    <div v-if="verDescripcion === true" class="definicion">
      <div v-if="conceptoSeleccionado.titulo" class="titulo">{{ conceptoSeleccionado.titulo }}</div>
      <div v-if="conceptoSeleccionado.contenido" v-html="$md.render(conceptoSeleccionado.contenido)"></div>
    </div>
  </div>
</template>
.

<script>
export default {
  name: 'GlosarioConcepto',
  props: {
    glosario: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      verDescripcion: false,
      conceptoSeleccionado: null,
    };
  },
  methods: {
    mostrarDefinicion(concepto) {
      this.verDescripcion = !this.verDescripcion;
      this.conceptoSeleccionado = concepto;
    },
  },
};
</script>

<style lang="scss" scoped>
#glosarioContenedor {
  display: flex;
  justify-content: space-evenly;
}
.concepto {
  font-weight: bold;
  width: 90%;
  color: #5757f7;
  cursor: pointer;
  font-family: $fuenteMono;
  margin: 54px;
  padding: 17px;
  justify-content: center;
  display: flex;
}
.concepto:hover {
  background-color: #5757f724;
}
.titulo {
  font-weight: bold;
}
.definicion {
  padding: 30px;
  position: absolute;
  border: 5px solid #5757f7;
  width: 36%;
  margin-top: 9%;
  left: 30%;
}
</style>
