<template>
  <main>
    <h1>{{ pagina.titulo }}</h1>
    <p>{{ pagina.contenido }}</p>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '../../utilidades/ayudas';

export default {
  data() {
    return {
      pagina: {},
    };
  },

  async fetch() {
    const query = gql`
      query {
        proyectos(filter: { slug: { _eq: "${this.$route.params.slug}" }, status: {_eq: "published"} }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
          fecha_publicacion
          banner {
            id
            title
          }
        }
      }
    `;

    const { proyectos } = await this.$graphql.principal.request(query);

    if (proyectos && proyectos.length) {
      this.pagina = proyectos[0];
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404;
      }
      throw new Error('La página no existe');
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
