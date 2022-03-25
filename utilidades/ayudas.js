/* eslint no-console: ["error", { allow: ["error","log"] }] */
import { apiBase, urlBase, nombre } from '../config/general';

/**
 * Ayuda a construir la URL para pedir un archivo al API de Directus.
 * https://docs.directus.io/reference/api/assets/#requesting-a-thumbnail
 *
 * @param {string} id El ID del archivo o imagen en Directus
 * @param {string|object} key El nombre del key u Objeto con parámetros
 * @returns {string} URL con el endpoint desde donde se puede pedir el archivo
 */
export const urlImagen = (id, key) => {
  if (!id) {
    throw new Error(`Se tiene que usar un ID del archivo pero ahora el parámetro es ${JSON.stringify(id)}`);
  }

  // Desde Directus se pueden crear configuraciones predeterminadas para pedir imágenes en diferentes formatos usando un "key"
  // Si se usa un key, podemos devolver este endpoint sencillo
  if (typeof key === 'string') {
    return `${apiBase}/assets/${id}?key=${key}`;
  }

  // Si no se usa un key sino que se pasan las opciones manualmente, debemos construir la URL con sus parámetros.
  const query = new URLSearchParams(key).toString();
  return `${apiBase}/assets/${id}?${query}`;
};

/**
 * Ayuda a crear el título con estilos propios.
 *
 * @param {string} titulo Pasar el nombre general del sitio Ej: "EnFlujo".
 * @param {string} subtitulo El nombre o título de la página actual, se puede dejar vacío para el Home.
 * @returns Título para el head con estilos personalizados.
 */
export const crearTitulo = (titulo, subtitulo) => {
  const cabeza = `..:: ${titulo} ::..`;
  return subtitulo ? `${cabeza} | ${subtitulo}` : cabeza;
};

/**
 * Crea el objeto con todos los elementos necesarios para SEO de las páginas.
 * @example
 * ```js
 * // Dentro del script de la página:
 * head() {
 *   return crearHead(titulo, subtitulo, descripcion, banner, ruta);
 * }
 * ```
 * @param {string} titulo El título principal del sitio.
 * @param {string} subtitulo El título de la página actual.
 * @param {string} descripcion La descripción corta de la página actual.
 * @param {object} banner Objeto con "id" y "title" que describe la imagen en el API.
 * @param {string} ruta Ruta de la página actual, se puede sacar con `this.$nuxt.$route.path`.
 * @returns {object} El objeto con todas las partes de meta tags.
 */
export const crearHead = (titulo, subtitulo, descripcion, banner, ruta) => {
  const title = crearTitulo(titulo, subtitulo);
  const url = urlBase + ruta;
  let img;

  if (banner && banner.id) {
    img = urlImagen(banner.id, 'og-banner');
  } else {
    img = `${urlBase}/imgs/og-EnFlujo-predeterminado.jpg`;
    banner = { title: nombre };
  }

  return {
    title,
    meta: [
      { hid: 'title', name: 'title', content: title },
      { hid: 'description', name: 'description', content: descripcion },
      // Open Graph: Facebook
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: descripcion },
      { hid: 'og:image', property: 'og:image', content: img },
      // Twitter
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', property: 'twitter:site', content: '@labenflujo' },
      { hid: 'twitter:url', property: 'twitter:url', content: url },
      { hid: 'twitter:title', property: 'twitter:title', content: title },
      { hid: 'twitter:description', property: 'twitter:description', content: descripcion },
      { hid: 'twitter:image', property: 'twitter:image', content: img },
      { hid: 'twitter:image:alt', property: 'twitter:image:alt', content: banner.title },
    ],
  };
};

/**
 * Calcula la diferencia entre una fecha y el presente.
 *
 * @param {Date} fecha Fecha inicial
 * @returns La diferencia en texto
 */
export const calcularDiferenciaFecha = (fecha) => {
  const ahora = new Date();
  const diferencia = new Date(ahora - fecha);
  const partes = [diferencia.getDate(), diferencia.getMonth() + 1, diferencia.getFullYear()];
  // reducir las fechas iniciales de UNIX
  const dias = parseInt(Math.abs(partes[0]) - 1);
  const meses = parseInt(Math.abs(partes[1]) - 1);
  const años = parseInt(Math.abs(partes[2] - 1970));

  const textoA = ['año', 'años'];
  const textoM = ['mes', 'meses'];
  const textoD = ['día', 'días'];

  const totalDias = años * 365 + meses * 30.417 + dias;

  let texto = años === 1 ? `${años} ${textoA[0]}, ` : años > 1 ? `${años} ${textoA[1]}, ` : '';
  texto += meses === 1 ? `${meses} ${textoM[0]} ` : meses > 1 ? `${meses} ${textoM[1]} ` : '';
  texto += dias === 1 ? `y ${dias} ${textoD[0]}` : dias > 1 ? `y ${dias} ${textoD[1]}` : '';

  return {
    dias: Math.ceil(totalDias),
    texto,
  };
};
