import type { OpcionesImagenDirectus } from '@/tipos';
export const apiBase = 'https://api.enflujo.com';
export const apiGraqhql = `${apiBase}/graphql`;

export const gql = String.raw;

export async function obtenerDatos<Esquema>(query: string, sistema = false) {
  const peticion = await fetch(`${apiBase}/graphql${sistema ? '/system' : ''}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

  if (peticion.errors) {
    throw new Error(JSON.stringify(peticion.errors, null, 2));
  }

  return peticion.data as Esquema;
}

/**
 * Ayuda a crear el título con estilos propios.
 *
 * @param tituloPagina El nombre o título de la página actual, se puede dejar vacío para la Maloca.
 * @returns Título para el encabezado con estilos personalizados.
 */
export const crearTitulo = (tituloPagina: string) => {
  const nombreProyecto = `..:: EnFlujo ::..`;
  return tituloPagina ? `${tituloPagina} | ${nombreProyecto}` : nombreProyecto;
};

/**
 * Ayuda a construir la URL para pedir un archivo al API de Directus.
 * https://docs.directus.io/reference/files.html#accessing-a-file
 *
 * @param id El ID del archivo o imagen en Directus
 * @param llaveUObjeto El nombre del key u Objeto con parámetros
 * @returns URL con el endpoint desde donde se puede pedir el archivo
 */
export const urlImagen = (id: string, llaveUObjeto: OpcionesImagenDirectus | string) => {
  if (!id) {
    throw new Error(`Se tiene que usar un ID del archivo pero ahora el parámetro es ${JSON.stringify(id)}`);
  }

  // Desde Directus se pueden crear configuraciones predeterminadas para pedir imágenes en diferentes formatos usando un "key"
  // Si se usa un key, podemos devolver este endpoint sencillo
  if (typeof llaveUObjeto === 'string') {
    return `${apiBase}/assets/${id}?key=${llaveUObjeto}`;
  }

  // Si no se usa un key sino que se pasan las opciones manualmente en un objeto, debemos construir la URL con sus parámetros.
  const parametros: [llave: string, valor: string][] = [];

  for (const llave in llaveUObjeto) {
    parametros.push([llave, `${llaveUObjeto[llave as keyof OpcionesImagenDirectus]}`]);
  }
  const query = new URLSearchParams(parametros).toString();
  return `${apiBase}/assets/${id}?${query}`;
};

export const quitarExtension = (nombreArchivo: string) => nombreArchivo.replace(/\.[^\/.]+$/, '');

/**
 * Calcula la diferencia entre una fecha y el presente.
 *
 * @param fecha Fecha inicial
 * @returns La diferencia en texto
 */
export const calcularDiferenciaFecha = (fecha: Date) => {
  const ahora = new Date();
  const diferencia = new Date(ahora.getTime() - fecha.getTime());
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

export const gradosARadianes = (grados: number) => grados * (Math.PI / 180);

/**
 * Calcula distancia en kilómetros entre dos puntos/coordenadas.
 *
 * @param lat1 Latitud del punto 1.
 * @param lon1 Longitud del punto 1.
 * @param lat2 Latitud del punto 2.
 * @param lon2 Longitud del punto 2.
 * @returns Distancia en kilómetros entre los dos puntos.
 */
export const distanciaEntreCoordenadas = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  // Radio del planeta en KM
  const radio = 6371;
  const dLat = gradosARadianes(lat2 - lat1);
  const dLon = gradosARadianes(lon2 - lon1);
  const centroLat = dLat / 2;
  const centroLon = dLon / 2;
  const a =
    Math.sin(centroLat) * Math.sin(centroLat) +
    Math.cos(gradosARadianes(lat1)) * Math.cos(gradosARadianes(lat2)) * Math.sin(centroLon) * Math.sin(centroLon);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radio * c;
};

export const formatoFecha = (fecha: Date) => {
  return fecha.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Esta función intercambia la fuente de la imagen por la que se define en el dataset
 *
 * @param imagen Imagen que se quiere revelar cuando está a la vista
 */
export function cuandoImagenVisible(imagen: Element) {
  const { fuente } = (imagen as HTMLImageElement).dataset;
  if (fuente) (imagen as HTMLImageElement).src = fuente;
}
