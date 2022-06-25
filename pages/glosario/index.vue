<template>
  <main id="glosario" class="pagina">
    <section class="inicioPagina contenedorFluido">
      <h1 class="tituloPagina">{{ pagina.titulo }}</h1>
      <div v-if="pagina.contenido" v-html="$md.render(pagina.contenido)"></div>

      <div>
        <Concepto :glosario="glosario" />
      </div>
    </section>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '~/utilidades/ayudas';
import Concepto from '~/components/Glosario/Concepto.vue';

export default {
  components: { Concepto },
  data() {
    return {
      pagina: {},
      glosarioCache: [],
      glosario: [],
      temas: null,
      temasSeleccionados: new Set(),
    };
  },
  async fetch() {
    const query = gql`
      query {
        paginas(filter: { slug: { _eq: "glosario" }, status: { _eq: "draft" } }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
        }

        glosario(filter: { status: { _eq: "published" } }, sort: ["titulo"]) {
          titulo
          slug
          descripcion
          contenido
        }
      }
    `;
    const { paginas, glosario } = await this.$graphql.principal.request(query);
    if (paginas.length && paginas[0].slug) {
      this.pagina = paginas[0];
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404;
      }
      throw new Error('La página no existe');
    }
    if (glosario && glosario.length) {
      this.glosario = glosario;
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
  methods: {},
};
</script>

<style lang="scss">
#archivoProyectos {
  .proyecto,
  .contenedorFluido {
    width: 95vw;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  #archivoProyectos {
    .proyecto,
    .contenedorFluido {
      width: 80vw;
    }
  }
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #archivoProyectos {
    .contenedorFluido {
      width: 95vw;
    }

    .proyecto {
      flex-direction: row;
      width: 95vw;
    }
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  #archivoProyectos {
    .proyecto,
    .contenedorFluido {
      width: 90vw;
    }
  }
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  .proyecto,
  .contenedorFluido {
    width: 70vw;
    max-width: 1200px;
  }
}
</style>

<style lang="scss" scoped>
.proyecto {
  margin-bottom: 4em;
}

#filtros {
  font-size: 0.9em;
  left: 0;

  .intertitulo {
    font-weight: $fuentePrincipalBold;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &.activo {
      li {
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }

    li {
      cursor: pointer;
      margin-right: 0.3em;
      font-style: italic;

      &:hover {
        color: $colorPrincipal;
      }

      &.actual {
        opacity: 1;

        &:hover {
          color: $colorOscuro;
        }
      }
    }
  }
}

.contenedorProyectos {
  display: flex;
  flex-direction: column;
  align-items: center;
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
