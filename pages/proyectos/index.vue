<template>
  <main id="archivoProyectos">
    <section class="contenido inicioPagina">
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
      <ProyectoResumen v-for="(proyecto, i) in proyectos" :key="`proyecto${i}`" :proyecto="proyecto"></ProyectoResumen>
    </div>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead } from '../../utilidades/ayudas';

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
        paginas(filter: { slug: { _eq: "proyectos" }, status: { _eq: "published" } }, limit: 1) {
          titulo
          slug
          descripcion
          contenido
          banner {
            id
            title
          }
        }

        proyectos(filter: { status: { _eq: "published" } }, sort: ["-fecha_publicacion"]) {
          id
          titulo
          slug
          descripcion
          fecha_publicacion
          date_created
          enlace
          repos
          temas {
            glosario_id(filter: { status: { _eq: "published" } }) {
              titulo
            }
          }
          banner {
            id
            title
          }
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
        proyecto.fecha_publicacion = new Date(proyecto.fecha_publicacion);
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
    filtrarPorTema(tema) {
      if (this.temasSeleccionados.has(tema)) {
        this.temasSeleccionados.delete(tema);
      } else {
        this.temasSeleccionados.add(tema);
      }

      if (this.temasSeleccionados.size) {
        this.filtroActivo = true;

        this.proyectos = this.proyectosCache.filter((proyecto) => {
          if (proyecto.temas && proyecto.temas.length) {
            return !!proyecto.temas.find((tema) => this.temasSeleccionados.has(tema));
          }
          return false;
        });
      } else {
        this.proyectos = this.proyectosCache;
        this.filtroActivo = false;
      }
    },
  },
};
</script>

<style lang="scss">
#archivoProyectos {
  .contenido {
    @include elementosTexto(95vw);
  }

  .proyecto {
    width: 95vw;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  #archivoProyectos {
    .contenido {
      @include elementosTexto(80vw);
    }

    .proyecto {
      width: 80vw;
    }
  }
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #archivoProyectos {
    .contenido {
      @include elementosTexto(95vw);
    }

    .proyecto {
      flex-direction: row;
      width: 95vw;
    }

    .contenedorImg {
      width: 50%;
    }

    .contenedorDescripcion {
      width: 50%;
      margin-left: 1em;
      margin-top: 0;
    }
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  #archivoProyectos {
    .contenido {
      @include elementosTexto(90vw);
    }

    .proyecto {
      width: 90vw;
    }
  }
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  .contenido {
    @include elementosTexto(70vw, 1200px);
  }

  .proyecto {
    width: 70vw;
    max-width: 1200px;
  }
}
</style>

<style lang="scss" scoped>
#filtros {
  font-size: 0.9em;
  // position: fixed;
  left: 0;
  // background-color: rgba(0, 0, 0, 0.4);
  // color: white;

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
