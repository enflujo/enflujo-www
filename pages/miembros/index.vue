<template>
  <div>
    <PaginaCargando v-if="$fetchState.pending" />
    <Error v-else-if="$fetchState.error" />

    <template v-else>
      <h1>{{ pagina.titulo }}</h1>
      <p>{{ pagina.contenido }}</p>

      <div class="contenedorMiembros">
        <NuxtLink v-for="miembro in miembros" :key="miembro.id" :to="`/miembros/${miembro.slug}`">
          {{ miembro.titulo }}
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
      miembros: [],
    };
  },

  async fetch() {
    const query = gql`
      query {
        paginas(filter: { slug: { _eq: "miembros" }, status: { _eq: "published" } }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
          banner {
            id
            title
          }
        }
        miembros(filter: { status: { _eq: "published" } }) {
          id
          foto
          rol
          descripcion_personal
          sitioweb
          redessociales
          proyectos
        }
      }
    `;

    const { paginas, miembros } = await this.$graphql.principal.request(query);

    if (paginas.length && paginas[0].slug) {
      this.pagina = paginas[0];
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404;
      }
      throw new Error('La página no existe');
    }

    if (miembros && miembros.length) {
      this.miembros = miembros;
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
