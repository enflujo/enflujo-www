<template>
  <div class="proyecto">
    <div class="contenedorImg">
      <NuxtLink class="enlaceImg" :to="`/proyectos/${proyecto.slug}`">
        <img
          v-lazy-load
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 667 350'%3E%3C/svg%3E"
          :data-src="img(proyecto.banner.id)"
          :alt="proyecto.banner.title"
          width="667"
          height="350"
        />
      </NuxtLink>
    </div>

    <section class="contenedorDescripcion">
      <h2 class="titulo">
        <NuxtLink :to="`/proyectos/${proyecto.slug}`">
          {{ proyecto.titulo }}
        </NuxtLink>
      </h2>

      <div class="descripcion seccionDescripcion">
        <ProyectoFecha
          :fecha="proyecto.fecha_publicacion ? proyecto.fecha_publicacion : proyecto.date_created"
          :estado="proyecto.estado"
        />

        <p>{{ proyecto.descripcion }}</p>

        <a v-if="proyecto.enlace" class="enlace" :class="proyecto.estado" :href="proyecto.enlace" target="_blank"
          >Ver Proyecto</a
        >
      </div>

      <div class="repos seccionDescripcion">
        <p class="interTitulo">Código:</p>
        <div v-for="(repo, j) in proyecto.repos" :key="`repo-${j}`" class="repo">
          <SvgRedes nombre="github" abierto="false" />
          <a class="repoNombre" :href="repo.url" target="_blank" rel="external">{{ repo.nombre }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { urlImagen } from '~/utilidades/ayudas';

export default {
  name: 'ProyectoResumen',
  props: {
    proyecto: {
      type: Object,
      required: true,
    },
  },

  methods: {
    img(imgId) {
      return urlImagen(imgId, {
        width: 667,
        height: 350,
        quality: 80,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.proyecto {
  display: flex;
  flex-direction: column;
  margin: 2em 0;
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

  .titulo {
    font-size: 1.1em;
    margin: 0.8em 0 1em 0;

    a,
    a:link {
      color: black;
      padding: 0.8em;
      margin-bottom: 0.5em;
      background-image: url(~/assets/imgs/marco-oscuro.svg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: 0.2s ease-in-out opacity;

      &:hover {
        opacity: 0.6;
      }
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

  &:hover {
    opacity: 0.8;
  }

  &.proceso {
    background-color: $colorOscuro2;
  }
}

.repos {
  display: flex;
  align-items: flex-end;
  flex: 1;

  .interTitulo {
    margin: 0 0.5em 0 0;
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
