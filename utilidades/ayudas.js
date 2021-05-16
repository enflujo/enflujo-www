/**
 * La URL donde esta el API (Directus en nuestro caso)
 */
export const urlBase = 'http://159.65.232.239:8055';

/**
 * Ayuda a construir la URL para pedir un archivo al API de Directus.
 * https://docs.directus.io/reference/api/assets/#requesting-a-thumbnail
 *
 * @param {string} id El ID del archivo o imagen en Directus
 * @param {string|object} key El nombre del key u Objejo con parametros
 * @returns {string} URL con el endpoint desde donde se puede pedir el archivo
 */
export const urlImagen = (id, key) => {
  if (!id) {
    throw new Error(`Se tiene que usar un ID del archivo pero ahora eparametro es ${JSON.stringify(id)}`);
  }

  // Desde Directus se pueden crear configuraciones predeterminadas para pedir imagenes en diferentes formatos usando un "key"
  // Si se usa un key, podemos devolver este endpoint sencillo
  if (typeof key === 'string') {
    return `${urlBase}/assets/${id}?key=${key}`;
  }

  // Si no se usa un key sino que se pasan las opciones manualmente, debemos construir la URL con sus parametros.
  const query = new URLSearchParams(key).toString();
  return `${urlBase}/assets/${id}?${query}`;
};
