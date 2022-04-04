<template>
  <div class="proyecto">
    <div class="contenedorImg">
      <NuxtLink class="enlaceImg" :to="`/proyectos/${proyecto.slug}`">
        <EnflujoImagen :imgId="proyecto.banner.id" ancho="667" alto="350" :titulo="proyecto.banner.title" />
      </NuxtLink>
    </div>

    <section class="contenedorDescripcion">
      <NuxtLink class="titulo" :to="`/proyectos/${proyecto.slug}`">
        <h2>{{ proyecto.titulo }}</h2>
      </NuxtLink>

      <div class="descripcion seccionDescripcion">
        <ProyectoFecha
          :fecha="proyecto.fecha_publicacion ? proyecto.fecha_publicacion : proyecto.date_created"
          :estado="proyecto.estado"
        />

        <p>{{ proyecto.descripcion }}</p>

        <a v-if="proyecto.enlace" class="enlace" :class="proyecto.estado" :href="proyecto.enlace" target="_blank">
          Ver Proyecto
        </a>
      </div>

      <ProyectoRepositorios class="seccionDescripcion" :repos="proyecto.repos" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProyectoResumen',
  props: {
    proyecto: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.proyecto {
  display: flex;
  flex-direction: column;
}

.contenedorImg {
  a {
    display: block;
    line-height: 0;
  }

  img {
    height: auto;
    width: 100%;
  }
}

.contenedorDescripcion {
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  border-bottom: 2px solid;

  .titulo,
  .titulo:link {
    color: black;
    padding: 0.8em 1.8em 0.8em 0.8em;
    margin-bottom: 0.5em;
    transition: 0.2s ease-in-out opacity;
    margin-left: -1em;
    @include tituloMarco;

    &:hover {
      opacity: 0.6;
    }

    h2 {
      font-size: 1.1em;
      // margin: 0.8em 0 1em 0;
    }
  }

  .fecha {
    font-weight: $fuentePrincipalBold;
    font-style: italic;
  }

  p {
    margin: 1em 0;
    line-height: 1.4;
  }

  .seccionDescripcion {
    margin: 0.5em 0;
  }
}

.enlace {
  padding: 0.5em;
  background-color: $colorPrincipal;
  color: white;
  width: 50%;
  text-align: center;
  font-weight: $fuentePrincipalPeso;

  &:hover {
    opacity: 0.8;
  }

  &.proceso {
    background-color: $colorOscuro2;
  }
}

.repos {
  align-items: flex-end;
  flex: 1;
}
</style>
