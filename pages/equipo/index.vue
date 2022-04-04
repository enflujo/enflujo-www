<template>
  <main id="archivoEquipo" class="pagina">
    <section class="inicioPagina contenedorFluido">
      <h1 class="tituloPagina">{{ pagina.titulo }}</h1>
      <div v-if="pagina.contenido" v-html="$md.render(pagina.contenido)"></div>
    </section>

    <section class="galeria activos contenedorFluido">
      <h2 class="tituloSeccion">EnFlujo actualmente</h2>

      <EquipoPerfil v-for="(miembro, i) in activos" :key="`activos-${i}`" :miembro="miembro" />
    </section>

    <section v-if="inactivos.length" class="galeria inactivos contenedorFluido">
      <h2 class="tituloSeccion">En el pasado</h2>
      <EquipoPerfil v-for="(miembro, i) in inactivos" :key="`inactivos-${i}`" :miembro="miembro" />
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
      activos: [],
      inactivos: [],
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

        equipo(filter: { status: { _eq: "published" } }) {
          nombre
          slug
          descripcion
          activo
          date_created
          redes
          sitio_web
          rol
          foto {
            id
            title
          }
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
      const activos = [];
      const inactivos = [];

      equipo.forEach((miembro) => {
        if (miembro.activo) {
          activos.push(miembro);
        } else {
          inactivos.push(miembro);
        }
      });

      this.activos = activos;
      this.inactivos = inactivos;
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
        width: 200,
        height: 200,
        quality: 80,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tituloSeccion {
  font-family: $fuenteMono;
  padding: 0.3em 1.5em 0.5em 0.5em;
  font-size: 1.2em;
  @include tituloMarco;
}

.galeria {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;

  &.inactivos {
    background-color: rgb(228, 228, 228);
    padding: 2em 0;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
}
</style>
