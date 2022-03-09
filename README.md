# Sitio principal del Laboratorio EnFlujo

![Estilo Código](https://github.com/enflujo/enflujo-www/actions/workflows/estilo-codigo.yml/badge.svg)
![Despliegue](https://github.com/enflujo/enflujo-www/actions/workflows/despliegue.yml/badge.svg)
![Tamaño](https://img.shields.io/github/repo-size/enflujo/enflujo-www?color=%235757f7&label=Tama%C3%B1o%20repo&logo=open-access&logoColor=white)
![Licencia](https://img.shields.io/github/license/enflujo/enflujo-www?label=Licencia&logo=open-source-initiative&logoColor=white)

Creado con [Nuxt.js](https://nuxtjs.org) (Vue con _Server-Side-Rendering_)

## Instalación

```bash
# Instalar dependencias
yarn install
```

## Desarrollo local

```bash
yarn dev
```

Inicia un servidor local (con hot-reloading) en [localhost:3000](http://localhost:3000)

## Construir para producción

```bash
# Exportar app
yarn build

# Iniciar en modo de producción
yarn start
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
