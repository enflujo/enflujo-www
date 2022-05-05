<template>
  <div class="perfil">
    <NuxtLink :to="`/equipo/${miembro.slug}`">
      <EnflujoImagen
        v-if="miembro.foto && miembro.foto.id"
        class="foto"
        :class="!miembro.activo ? 'inactivo' : ''"
        :imgId="miembro.foto.id"
        ancho="200"
        alto="200"
        :titulo="miembro.nombre"
      />
    </NuxtLink>
    <div>
      <NuxtLink class="nombre" :to="`/equipo/${miembro.slug}`">{{ miembro.nombre }}</NuxtLink>
      <p class="rol">{{ miembro.rol }}</p>

      <EquipoRedes v-if="miembro.redes" :sitioWeb="miembro.sitio_web" :redes="miembro.redes" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipoPerfil',
  props: {
    miembro: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.perfil {
  padding: 0 1em 1em;
}

.nombre,
.rol {
  display: block;
  text-align: center;
  margin: 0;
}

.rol {
  font-size: 0.85em;
  font-weight: $fuentePrincipalBold;
}

.foto {
  &.inactivo {
    filter: grayscale(100%);
  }
}

.redes {
  justify-content: center;
  align-items: center;
}
</style>
