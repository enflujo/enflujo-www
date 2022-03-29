<template>
  <div class="repos">
    <p class="interTitulo">Código:</p>
    <div v-for="(repo, i) in repos" :key="`repo-${i}`" class="repo">
      <SvgRedes nombre="github" abierto="false" />
      <a class="repoNombre" :href="repo.url" target="_blank" rel="external">{{ repo.nombre }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProyectoRepositorios',
  props: {
    repos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.repos {
  display: flex;
  align-items: center;

  .interTitulo {
    margin: 0 0.5em 0 0;
    width: auto;
    line-height: 1.25;
  }

  .repo {
    margin-right: 1em;
    display: flex;
    align-items: center;
  }

  .iconoRed {
    width: 15px;
  }

  .repoNombre {
    margin-left: 0.3em;
  }
}
</style>
