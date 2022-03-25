<template>
  <main class="pagina">
    <section class="contenido">
      <h1>{{ pagina.titulo }}</h1>
      <div v-if="pagina.contenido" v-html="$md.render(pagina.contenido)"></div>
    </section>
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
    const pagina = this.$route.params.pagina;

    const query = gql`
      query {
        ${pagina}(filter: { slug: { _eq: "${this.$route.params.slug}" } }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
          banner {
            id
            title
          }
        }
      }
    `;

    const res = await this.$graphql.principal.request(query);

    if (res && res[pagina] && res[pagina].length) {
      this.pagina = res[pagina][0];
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
