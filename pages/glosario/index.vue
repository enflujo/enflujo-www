<template>
  <main id="glosario" class="pagina">
    <section class="inicioPagina contenedorFluido">
      <h1 class="tituloPagina">{{ pagina.titulo }}</h1>
      <div v-if="pagina.contenido" v-html="$md.render(pagina.contenido)"></div>

      <nav v-if="temas && temas.size" id="filtros">
        <p class="intertitulo">Filtrar por temas:</p>
        <ul :class="filtroActivo ? 'activo' : ''">
          <li
            v-for="(tema, i) in temas"
            :key="`tema${i}`"
            class="tema"
            :class="temasSeleccionados.has(tema) ? 'actual' : ''"
            @click="filtrarPorTema(tema)"
          >
            {{ tema }}
          </li>
        </ul>
      </nav>
    </section>

    <div class="contenedorProyectos">
      <Concepto></Concepto>
    </div>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '~/utilidades/ayudas';

export default {
  data() {
    return {
      pagina: {},
      proyectosCache: [],
      proyectos: [],
      temas: null,
      temasSeleccionados: new Set(),
      filtroActivo: false,
    };
  },

  async fetch() {
    const query = gql`
      query {
        paginas(filter: { slug: { _eq: "glosario" }, status: {_eq: "published"} }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
        }

        glosario(filter: { status: { _eq: "published" } }) {
          titulo
          slug
          descripcion
          contenido
        }
      }
    `;

    const { paginas, proyectos } = await this.$graphql.principal.request(query);

    if (paginas.length && paginas[0].slug) {
      this.pagina = paginas[0];
    } else {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404;
      }
      throw new Error('La página no existe');
    }

    if (proyectos && proyectos.length) {
      const cache = proyectos.map((proyecto) => {
        proyecto.fecha_publicacion = proyecto.fecha_publicacion ? new Date(proyecto.fecha_publicacion) : null;
        proyecto.date_created = proyecto.date_created ? new Date(proyecto.date_created) : null;

        if (proyecto.temas) {
          proyecto.temas = proyecto.temas
            .map((tema) => (tema.glosario_id ? tema.glosario_id.titulo : null))
            .filter(Boolean);
        }
        return proyecto;
      });

      const temas = new Set();
      cache.forEach((proyecto) => {
        if (proyecto.temas && proyecto.temas.length) {
          proyecto.temas.forEach((tema) => {
            temas.add(tema);
          });
        }
      });
      this.temas = temas;
      this.proyectosCache = cache;
      this.proyectos = cache;
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
  },
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
