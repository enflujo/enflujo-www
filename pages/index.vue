<template>
  <div id="inicio">
    <section
      id="portada"
      :style="`background-image:url(http://159.65.232.239:8055/assets/${sistema.public_background.id}?fit=inside&width=1200)`"
    >
      <Logo :color="sistema.project_color" />
      <h1 class="titulo">
        <span class="bloque">{{ general.nombre }}</span>
      </h1>
      <h2 class="subtitulo">
        <span class="bloque" :style="`background-color:${sistema.project_color}`">{{ general.descripcion }}</span>
      </h2>
    </section>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request';

export default {
  async asyncData({ $graphql }) {
    const queryGeneral = gql`
      query {
        general {
          nombre
          descripcion
        }
      }
    `;
    const { general } = await $graphql.principal.request(queryGeneral);

    // Datos agregados en Ajustes administrativos
    // Tenemos que hacer un query aparte al otro endpoint de Directus /graphql/system
    const baseQuery = gql`
      query {
        settings {
          project_name
          project_url
          project_color
          project_logo {
            id
            title
          }
          public_foreground {
            id
            title
          }
          public_background {
            id
            title
          }
          public_note
        }
      }
    `;
    // los : cambian el nombre
    const { settings: sistema } = await $graphql.sistema.request(baseQuery);
    return { general, sistema };
  },

  data() {
    return {
      titulo: '',
      banner: null,
    };
  },
};
</script>

<style lang="scss">
section {
  min-height: 50vh;
}

#portada {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.enflujoLogo {
  width: 130px;
  background-color: white;
  padding: 20px;
}

.titulo {
  font-size: 3em;
  margin: 0;
  padding: 0.5em 0;

  .bloque {
    background-color: white;
    padding: 0.5em;
  }
}

.subtitulo {
  font-size: 1em;
  color: white;
  font-weight: 100;
}

.celular {
  .titulo {
    font-size: 2em;
    padding: 0.2em 0;
    width: 90vw;
  }

  .subtitulo {
    font-size: 0.85em;
  }
}
</style>
