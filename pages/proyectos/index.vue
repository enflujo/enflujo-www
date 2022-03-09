<template>
  <main>
    <section class="contenido inicioPagina">
      <h1 class="tituloPagina">{{ pagina.titulo }}</h1>
      <div v-if="pagina.contenido" v-html="$md.render(pagina.contenido)"></div>
    </section>

    <div class="contenedorProyectos">
      <div v-for="(proyecto, i) in proyectos" :key="`proyecto${i}`" class="proyecto">
        <div class="contenedorImg">
          <NuxtLink class="enlaceImg" :to="`/proyectos/${proyecto.slug}`">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 667 350'%3E%3C/svg%3E"
              :data-src="img(proyecto.banner.id)"
              :alt="proyecto.banner.title"
              width="667"
              height="350"
              v-lazy-load
            />
          </NuxtLink>
        </div>

        <section class="contenedorDescripcion">
          <h2 class="titulo">
            <NuxtLink :to="`/proyectos/${proyecto.slug}`">
              {{ proyecto.titulo }}
            </NuxtLink>
          </h2>

          <div class="seccionDescripcion">
            <p>{{ proyecto.descripcion }}</p>
          </div>

          <div class="seccionDescripcion">
            <a v-if="proyecto.enlace" class="enlace" :href="proyecto.enlace" target="_blank">Ver Proyecto</a>
          </div>

          <div class="seccionDescripcion repos">
            <p class="interTitulo">Código:</p>
            <div v-for="(repo, j) in proyecto.repos" :key="`repo-${j}`" class="repo">
              <SvgIconosRedes nombre="github" abierto="false" />
              <a class="repoNombre" :href="repo.url" target="_blank">{{ repo.nombre }}</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { crearHead, urlImagen } from '../../utilidades/ayudas';

export default {
  data() {
    return {
      pagina: {},
      proyectos: [],
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
        proyectos(filter: { status: { _eq: "published" } }) {
          id
          titulo
          slug
          descripcion
          fecha_publicacion
          enlace
          repos
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
      this.proyectos = proyectos;
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
        width: 667,
        height: 350,
        quality: 80,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedorProyectos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.proyecto {
  display: flex;
  flex-direction: column;
  width: 95vw;
  margin: 2em 0;
}

.contenedorImg {
  a {
    display: block;
    line-height: 0;
  }

  img {
    height: auto;
    width: 100%;
  }
}

.contenedorDescripcion {
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  margin-top: 1em;

  border-bottom: 2px solid;

  .titulo {
    font-size: 1.1em;
    margin-top: 0.8em;

    a,
    a:link {
      color: black;
      padding: 0.8em;
      margin-bottom: 0.5em;
      background-image: url(~/assets/imgs/marco-oscuro.svg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: 0.2s ease-in-out opacity;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  p {
    margin: 1em 0;
    line-height: 1.4;
  }

  .seccionDescripcion {
    margin: 0.5em 0;
  }
}

.enlace {
  padding: 0.5em;
  background-color: $colorPrincipal;
  color: white;
  width: 50%;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
}

.repos {
  display: flex;

  .interTitulo {
    margin: 0 0.5em 0 0;
  }

  .repo {
    margin-right: 1em;
    display: flex;
    align-items: center;
  }

  .iconoRed {
    width: 15px;
  }

  .repoNombre {
    margin-left: 0.3em;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  .proyecto {
    width: 80vw;
  }
}

// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
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
    justify-content: space-between;
  }
}

// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .proyecto {
    width: 90vw;
  }
}

// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  .proyecto {
    width: 70vw;
    max-width: 1200px;
  }
}
</style>
