# Sitio principal del Laboratorio EnFlujo

<img src="./publico/favicon.svg" style="width:100px;" alt="Logo EnFlujo" />

![Estilo Código](https://github.com/enflujo/enflujo-www/actions/workflows/estilo-codigo.yml/badge.svg)
![Despliegue](https://github.com/enflujo/enflujo-www/actions/workflows/despliegue.yml/badge.svg)
![Tamaño](https://img.shields.io/github/repo-size/enflujo/enflujo-www?color=%235757f7&label=Tama%C3%B1o%20repo&logo=open-access&logoColor=white)
![Licencia](https://img.shields.io/github/license/enflujo/enflujo-www?label=Licencia&logo=open-source-initiative&logoColor=white)

Creado con [Astro](https://astro.build/)

## Instalación

Instalar dependencias:

```bash
yarn install
```

## Desarrollo local

```bash
yarn dev
```

Inicia un servidor local (con hot-reloading) en [localhost:3000](http://localhost:3000)

## Construir para producción

Exportar aplicación:

```bash
yarn build
```

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

Todos los `push` a la rama `main` activan el despliegue. También se puede ejecutar desde el terminal o cualquier comando externo siguiendo la estructura de: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event

```bash
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <TOKEN_GITHUB_CON_PERMISOS>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/enflujo/enflujo-www/dispatches \
  -d '{"event_type":"despliegue"}'
```
