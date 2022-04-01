<template>
  <div class="fecha" :class="estado">
    <p>{{ texto }}</p>
    <SvgIcono />
    <span class="notaEnFlujo">{{ alPresente }}</span>
  </div>
</template>

<script>
import { calcularDiferenciaFecha } from '~/utilidades/ayudas';

const formatoFecha = (fecha) => {
  return fecha.toLocaleString('es-CO', {
    timezone: 'America/Bogota',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default {
  name: 'ProyectoFecha',
  props: {
    fecha: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      default: 'proceso',
    },
  },

  computed: {
    texto() {
      return this.estado === 'terminado' ? `Publicado el ${formatoFecha(this.fecha)}` : 'En proceso';
    },

    alPresente() {
      return `hace ${calcularDiferenciaFecha(this.fecha)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.fecha {
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  &.proceso {
    color: $colorOscuro2;
  }
}

.notaEnFlujo {
  font-size: 0.85em;
  color: #757575;
}

.enflujoIcono {
  width: 1em;
  margin: 0 0.3em;
}
</style>
