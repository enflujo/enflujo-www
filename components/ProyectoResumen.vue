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
        <p class="fecha">
          Publicado el {{ formatoFecha(proyecto.fecha_publicacion) }}
          <span class="notaEnFlujo"><SvgIcono />hace {{ distancia(proyecto.fecha_publicacion).texto }}</span>
        </p>

        <p>{{ proyecto.descripcion }}</p>

        <a v-if="proyecto.enlace" class="enlace" :href="proyecto.enlace" target="_blank">Ver Proyecto</a>
      </div>

      <div class="repos seccionDescripcion">
        <p class="interTitulo">Código:</p>
        <div v-for="(repo, j) in proyecto.repos" :key="`repo-${j}`" class="repo">
          <SvgRedes nombre="github" abierto="false" />
          <a class="repoNombre" :href="repo.url" target="_blank">{{ repo.nombre }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { urlImagen, calcularDiferenciaFecha } from '../utilidades/ayudas';

export default {
  props: {
    proyecto: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.distancia(new Date('2020-01-26'));
  },

  methods: {
    img(imgId) {
      return urlImagen(imgId, {
        width: 667,
        height: 350,
        quality: 80,
      });
    },

    formatoFecha(fecha) {
      return fecha.toLocaleString('es-CO', {
        timezone: 'America/Bogota',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    distancia(fecha) {
      return calcularDiferenciaFecha(fecha);
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
    margin-top: 0.8em;

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

.notaEnFlujo {
  font-size: 0.85em;
  color: #757575;

  .enflujoIcono {
    vertical-align: text-top;
    width: 1em;
    margin-right: 0.5em;
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
