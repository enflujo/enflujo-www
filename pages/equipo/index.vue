<template>
  <div>
    <PaginaCargando v-if="$fetchState.pending" />
    <Error v-else-if="$fetchState.error" />

    <template v-else>
      <h1>{{ pagina.titulo }}</h1>
      <p>{{ pagina.contenido }}</p>

      <div class="contenedorEquipo">
        <NuxtLink v-for="equipos in equipo" :key="equipos.id" :to="`/equipo/${equipos.slug}`">
          {{ equipos.titulo }}
          <h1>Nombre: {{ equipos.nombre }}</h1>
          <div class="fotoEquipo">
            <img v-bind:src="equipos.foto" />
          </div>
          <h1>Rol: {{ equipos.rol }}</h1>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '../../utilidades/ayudas';

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
};
</script>

<style lang="scss" scoped></style>
