# Sitio web del Laboratorio EnFlujo

## Instalación
Para instalar dependencias primero usar el comando:
```bash
yarn
```
o
```bash
npm install
```

### Arreglar (en Windows) error env

Información del error:
```bash
$ env NODE_ENV=development webpack serve --config webpack.dev.js
"env" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.
error Command failed with exit code 1.
info visit https://yarnkpkg.com/en/docs/cli/run for documentation about this command
```
Entrar a `package.json`, línea 8 y 9. Cambiar a:
```json
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "start": "webpack serve --config webpack.dev.js"
  },
```

### Arreglar en Windows error `vue-loader`
```bash
yarn add vue-loader
```

