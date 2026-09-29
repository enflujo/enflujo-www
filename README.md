# Sitio principal del Laboratorio EnFlujo

<img src="./recursos/favicon.svg" style="width:100px;" alt="Logo EnFlujo" />

![Estilo Código](https://github.com/enflujo/enflujo-www/actions/workflows/estilo-codigo.yml/badge.svg)
![Despliegue](https://github.com/enflujo/enflujo-www/actions/workflows/despliegue.yml/badge.svg)
![Tamaño](https://img.shields.io/github/repo-size/enflujo/enflujo-www?color=%235757f7&label=Tama%C3%B1o%20repo&logo=open-access&logoColor=white)
![Licencia](https://img.shields.io/github/license/enflujo/enflujo-www?label=Licencia&logo=open-source-initiative&logoColor=white)

Creado con [Astro](https://astro.build/), con renderizado en servidor (SSR) y el adaptador oficial de Node.

Las páginas y el sitemap consultan Directus al recibir cada petición. Publicar, editar o retirar contenido se refleja al recargar el sitio, sin reconstrucción ni Flow de GitHub. Solo los cambios de código requieren compilar y desplegar.

## Instalación

El proyecto usa Node.js 24 LTS. Con `nvm`:

```bash
nvm install
nvm use
```

TypeScript se mantiene en la rama 6 mientras `astro check` incorpora soporte para TypeScript 7. El avance se puede consultar en el [seguimiento oficial de Astro](https://github.com/withastro/roadmap/discussions/1321).

Instalar dependencias:

```bash
yarn install
```

## Desarrollo local

```bash
yarn dev
```

Inicia un servidor local (con hot-reloading) en [localhost:4001](http://localhost:4001)

## Construir para producción

Compilar el código del servidor y los recursos del navegador (no consulta Directus):

```bash
yarn build
```

Ejecutar el resultado en primer plano:

```bash
yarn start
```

Por defecto escucha en `http://127.0.0.1:4001`. Las variables de entorno `HOST` y `PORT` permiten cambiarlo. `DIRECTUS_URL` permite consultar una instancia diferente o la dirección interna del CMS; por defecto es `https://api.enflujo.com`. Esta variable se lee al iniciar el servidor, sin recompilar. Las URLs públicas de imágenes y archivos siguen usando `https://api.enflujo.com`.

En producción las variables deben estar en el entorno del proceso; `yarn start` no carga `.env` automáticamente.

Para mantenerlo activo con PM2 (incluido en las dependencias):

```bash
yarn server:start
yarn server:restart
yarn server:stop
```

Estos comandos no compilan. `server:restart` inicia el proceso si aún no existe y actualiza sus variables de entorno.

Ver [la guía de despliegue SSR](./docs/despliegue-ssr.md) para la transición del alojamiento estático al proxy de Node.

## Verificación

```bash
yarn test
yarn build
yarn test:ssr
```

La prueba SSR arranca el servidor compilado contra un CMS simulado local. Verifica cambios de contenido, nuevas rutas, retiros con 404, sitemap paginado y recursos estáticos sin modificar Directus real.

## Aplicar reglas de estilo al código

Para ver los errores de estilo:

```bash
yarn lint
```

**¡IMPORTANTE!** - Antes de hacer push o PR, aplicar las reglas al código:

```bash
yarn lint:fix
```

## Saltarse los procesos de Github Actions

En el mensaje del push incluir `[skip ci]`. [Explicación](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/)

## Ejecutar acción de despliegue

Los `push` a `main` compilan el código y reinician el proceso `enflujo-www` de PM2. También se puede ejecutar manualmente desde GitHub Actions (`workflow_dispatch`).

El workflow ya no acepta `repository_dispatch`: Directus no necesita disparar despliegues al cambiar contenido. Después de activar y comprobar SSR en producción, desactivar el antiguo Flow de publicación y retirar su token de GitHub si ningún otro servicio lo usa.
