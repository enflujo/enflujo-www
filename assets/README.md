# Assets

Contiene archivos que luego son compilados por Webpack (SCSS y JS en ES6).

Para los estilos tenemos una serie de archivos generales en `/scss/_**.scss`, para reconocerlos vamos a usar `_[nombre].scss` y se deben importar en `/config/css.js`.

Para otros los que son constantes o mixins de SCSS vamos a usar `@nuxtjs/style-resources` para que las variables queden disponibles en cualquier archivo `.vue`. Estos no tienen el `_` al principio del nombre y los importamos en `/config/style-resources.js`
