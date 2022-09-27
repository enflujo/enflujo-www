export const apiBase = 'https://api.enflujo.com';
export const apiGraqhql = `${apiBase}/graphql`;

export const gql = String.raw;

export const obtenerDatos = async (query) => {
  const peticion = await fetch(apiGraqhql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then((respuesta) => respuesta.json());

  if (peticion.errors) {
    throw new Error(JSON.stringify(peticion.errors, null, 2));
  }

  return peticion.data;
};

/**
 * Ayuda a crear el título con estilos propios.
 *
 * @param {string} tituloPagina El nombre o título de la página actual, se puede dejar vacío para la Maloca.
 * @returns Título para el encabezado con estilos personalizados.
 */
export const crearTitulo = (tituloPagina) => {
  const nombreProyecto = `..:: EnFlujo ::..`;
  return tituloPagina ? `${tituloPagina} | ${nombreProyecto}` : nombreProyecto;
};

/**
 * Ayuda a construir la URL para pedir un archivo al API de Directus.
 * https://docs.directus.io/reference/files.html#accessing-a-file
 *
 * @param {string} id El ID del archivo o imagen en Directus
 * @param {string|object} key El nombre del key u Objeto con parámetros
 * @returns {string} URL con el endpoint desde donde se puede pedir el archivo
 */
export const urlImagen = (id, key = null) => {
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

export const quitarExtension = (nombreArchivo) => nombreArchivo.replace(/\.[^\/.]+$/, '');

/**
 * Calcula la diferencia entre una fecha y el presente.
 *
 * @param {Date} fecha Fecha inicial
 * @returns La diferencia en texto
 */
export const calcularDiferenciaFecha = (fecha) => {
  const ahora = new Date();
  const diferencia = new Date(ahora - fecha);
  const partes = {
    dias: diferencia.getDate(),
    meses: diferencia.getMonth(),
    años: diferencia.getFullYear() - 1970,
  };

  const textoA = ['año', 'años'];
  const textoM = ['mes', 'meses'];
  const textoD = ['día', 'días'];

  let texto = partes.años === 1 ? `1 ${textoA[0]}, ` : partes.años > 1 ? `${partes.años} ${textoA[1]}, ` : '';
  texto += partes.meses === 1 ? `1 ${textoM[0]} y ` : partes.meses > 1 ? `${partes.meses} ${textoM[1]} y ` : '';
  texto += partes.dias === 1 ? `1 ${textoD[0]}` : partes.dias > 1 ? `${partes.dias} ${textoD[1]}` : '';

  return texto;
};
