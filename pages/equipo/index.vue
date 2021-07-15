<template>
  <div>
    <PaginaCargando v-if="$fetchState.pending" />
    <Error v-else-if="$fetchState.error" />

    <template v-else>
      <h1>{{ pagina.titulo }}</h1>
      <p>{{ pagina.contenido }}</p>

      <div class="contenedorEquipo">
        <div v-for="miembro in equipo" :key="miembro.id" class="miembro">
          <NuxtLink class="foto" :to="`/equipo/${miembro.slug}`">
            <img :src="img(miembro.foto.id)" :alt="miembro.foto.title" />
          </NuxtLink>
          <p class="nombre">
            <NuxtLink :to="`/equipo/${miembro.slug}`">{{ miembro.nombre }}</NuxtLink>
          </p>
          <p class="rol">{{ miembro.rol }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead, urlImagen } from '../../utilidades/ayudas';

export default {
  data() {
    return {
      pagina: {},
      equipo: [],
    };
  },

  async fetch() {
    const query = gql`
      query {
        paginas(filter: { slug: { _eq: "equipo" }, status: { _eq: "published" } }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
          banner {
            id
            title
          }
        }
        equipo {
          id
          nombre
          slug
          foto {
            id
            title
          }
          rol
          descripcion
          sitio_web
          redes_sociales
          proyectos
        }
      }
    `;

    const { paginas, equipo } = await this.$graphql.principal.request(query);

    if (paginas.length && paginas[0].slug) {
      this.pagina = paginas[0];
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404;
      }
      throw new Error('La página no existe');
    }

    if (equipo && equipo.length) {
      this.equipo = equipo;
    }
  },

  head() {
    return crearHead(
      this.$store.state.general.datos.nombre,
      this.pagina.titulo,
      this.pagina.descripcion,
      this.pagina.banner,
      this.$nuxt.$route.path
    );
  },

  methods: {
    img(fotoId) {
      return urlImagen(fotoId, {
        width: 300,
        height: 300,
        quality: 70,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedorEquipo {
  display: flex;
}

.miembro {
  text-align: center;

  p {
    margin: 0;
  }

  .foto {
    line-height: 0;
  }

  .nombre {
    font-size: 1.2em;
  }

  .rol {
    font-style: italic;
  }
}
</style>
