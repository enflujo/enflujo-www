<template>
  <main class="pagina">
    <section class="contenido">
      <h1>{{ pagina.titulo }}</h1>
      <div>
        <img
          v-if="pagina.banner && pagina.banner.id"
          v-lazy-load
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 667 350'%3E%3C/svg%3E"
          :data-src="img(pagina.banner.id)"
          :alt="pagina.banner.title"
          width="1200"
          height="630"
        />

        <a v-if="pagina.enlace" class="enlace" :class="pagina.estado" :href="pagina.enlace" target="_blank">
          Ver Proyecto
        </a>
        <ProyectoRepositorios v-if="pagina.repos && pagina.repos.length" :repos="pagina.repos" />
      </div>
    </section>

    <section v-if="pagina.contenido" class="contenido seccionProyecto">
      <h2>Notas</h2>
      <div class="contenido" v-html="$md.render(pagina.contenido)"></div>
    </section>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead, urlImagen } from '~/utilidades/ayudas';

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
          date_created
          enlace
          estado
          repos
          banner {
            id
            title
          }
        }
      }
    `;

    const { proyectos } = await this.$graphql.principal.request(query);

    if (proyectos && proyectos.length) {
      const pagina = proyectos[0];
      pagina.fecha_publicacion = pagina.fecha_publicacion ? new Date(pagina.fecha_publicacion) : null;
      pagina.date_created = pagina.date_created ? new Date(pagina.date_created) : null;
      this.pagina = pagina;
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

  methods: {
    img(imgId) {
      return urlImagen(imgId, {
        width: 1200,
        height: 630,
        quality: 80,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seccionProyecto {
  margin-top: 1em;
}

.enlace {
  padding: 0.5em;
  background-color: $colorPrincipal;
  color: white;
  width: 50%;
  text-align: center;
  width: 100%;
  margin: 1em 0;
  display: block;

  &:hover {
    opacity: 0.8;
  }

  &.proceso {
    background-color: $colorOscuro2;
  }
}
</style>
