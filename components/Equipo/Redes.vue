<template>
  <div class="redes">
    <a v-if="sitioWeb" :href="sitioWeb" target="_blank" rel="noopener external">
      <SvgRedes nombre="sitio" />
    </a>
    <a v-for="(obj, i) in redes" :key="`red-${i}`" :href="obj.url" target="_blank" rel="noopener external">
      <SvgRedes :nombre="obj.red" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'EquipoRedes',
  props: {
    sitioWeb: {
      type: String,
      default: '',
    },
    redes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.redes {
  display: flex;
  flex-direction: row;

  a,
  a:link {
    line-height: 0;
    margin: 0.3em;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .iconoRed {
    width: 18px;
  }
}
</style>
