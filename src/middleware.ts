import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_contexto, next) => {
  const respuesta = await next();
  // Publicar o retirar contenido debe reflejarse en la siguiente visita.
  // Los assets estáticos los sirve directamente el adaptador de Node.
  respuesta.headers.set('Cache-Control', 'no-store');
  return respuesta;
});
