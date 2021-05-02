import Vue from 'vue';
import Error404 from './Paginas/Error404.vue';
import rutas from './rutas';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',

  data: {
    rutaActual: window.location.pathname
  },

  computed: {
    Pagina() {
      return rutas[this.rutaActual] || Error404;
    }
  },

  render(h) {
    return h(this.Pagina);
  }
});

window.addEventListener('popstate', () => {
  app.rutaActual = window.location.pathname;
});
