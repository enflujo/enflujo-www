<template>
  <main class="pagina paginaMiembro">
    <section class="resumen contenedorFluido">
      <div class="seccionImagen">
        <EnflujoImagen
          v-if="pagina.foto && pagina.foto.id"
          :imgId="pagina.foto.id"
          ancho="300"
          alto="300"
          :titulo="pagina.foto.title"
        />
      </div>

      <div class="columna2">
        <h1 class="nombre">{{ pagina.nombre }}</h1>
        <p class="rol">{{ pagina.rol }}</p>
        <EquipoRedes v-if="pagina.redes" :sitioWeb="pagina.sitio_web" :redes="pagina.redes" />
      </div>
    </section>

    <section class="contenedorFluido contenido">
      <h2 class="tituloSeccion">Proyectos</h2>

      <ul v-if="pagina.proyectos && pagina.proyectos.length">
        <li v-for="(proyecto, i) in pagina.proyectos" :key="`proyecto-${i}`">
          <NuxtLink :to="`/proyectos/${proyecto.proyectos_id.slug}`">{{ proyecto.proyectos_id.titulo }}</NuxtLink>
        </li>
      </ul>
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
        equipo(filter: { slug: { _eq: "${this.$route.params.slug}" }, status: {_eq: "published"} }, limit: 1) {
          nombre
          slug
          rol
          descripcion
          date_created
          sitio_web
          activo
          redes
          proyectos {
            proyectos_id {
              titulo
              slug
            }
          }
          foto {
            id
            title
          }
        }
      }
    `;

    const { equipo } = await this.$graphql.principal.request(query);

    if (equipo && equipo.length) {
      const pagina = equipo[0];
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
section {
  margin-bottom: 1em;
}

.tituloSeccion {
  margin-bottom: 0.8em;
}

.resumen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nombre {
  font-size: 1.3em;
  padding: 0.3em 1.3em 0.5em 0.8em;
  margin-bottom: 0.5em;
  margin-left: -0.8em;
  margin-top: 0.5em;
  @include tituloMarco;
}

.iconoRed {
  width: 18px;
}

.rol {
  font-weight: $fuentePrincipalBold;
}

.seccionImagen {
  line-height: 0;
}

.columna2 {
  border-bottom: 2px solid;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  .resumen {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
  }

  .nombre {
    margin-top: 0;
  }

  .columna2 {
    margin-left: 1em;
    width: calc(100% - 300px - 1em);
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
}
</style>
