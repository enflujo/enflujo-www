<template>
  <footer>
    <SvgLogo :color="color" />
  </footer>
</template>

<script>
export default {
  data() {
    return {
      color: '#2d2d2e',
    };
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.enflujoLogo {
  width: 30px;
  margin: 15px;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
