<template>
  <main class="pagina">
    <section class="contenedorFluido">
      <h1 class="titulo">{{ pagina.titulo }}</h1>
      <div>
        <EnflujoImagen
          v-if="pagina.banner && pagina.banner.id"
          :imgId="pagina.banner.id"
          ancho="1200"
          alto="630"
          :titulo="pagina.banner.title"
        />
        <a v-if="pagina.enlace" class="enlace" :class="pagina.estado" :href="pagina.enlace" target="_blank">
          Ver Proyecto
        </a>
        <ProyectoRepositorios v-if="pagina.repos && pagina.repos.length" :repos="pagina.repos" />
      </div>
    </section>

    <section v-if="pagina.contenido" class="seccionProyecto contenedorFluido contenido">
      <h2>Notas</h2>
      <div v-html="$md.render(pagina.contenido)"></div>
    </section>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '~/utilidades/ayudas';

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
};
</script>

<style lang="scss" scoped>
.titulo {
  font-size: 1.6em;
  padding: 0.3em 1.3em 0.5em 0.3em;
  margin-bottom: 1em;
  @include tituloMarco;
}
.seccionProyecto {
  margin-top: 1em;
}

.enlace {
  padding: 0.5em;
  background-color: $colorPrincipal;
  font-weight: $fuentePrincipalPeso;
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
