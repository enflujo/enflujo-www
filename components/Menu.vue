<template>
  <div id="menu" :style="`background-color:${colorFondo}`">
    <Icono :color="colorIcono" />
    <span class="linea"></span>
    <span class="nombre">Menu</span>
  </div>
</template>

<script>
export default {
  props: {
    colorIcono: {
      type: String,
      required: true,
    },

    colorFondo: {
      style: String,
    },
  },
};
</script>

<style lang="scss">
#menu {
  width: 60px;
  height: 100vh;
  position: fixed;
  right: 0;
  padding: 7px 0 0 11px;
  cursor: pointer;

  .enflujoIcono {
    width: 40px;
    height: auto;
  }

  .linea {
    width: 2px;
    height: calc(100vh - 60px);
    top: 60px;
    left: 30px;
    background-color: white;
    position: absolute;
  }

  .nombre {
    color: white;
    letter-spacing: 2px;
    font-size: 0.8em;
    transform-origin: 0 0;
    transform: rotate(90deg) translate(-50%, 0);
    position: absolute;
    top: 50vh;
  }
}
</style>
