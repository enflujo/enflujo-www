import type { APIRoute } from 'astro';
import { obtenerDatos } from '@/utilidades/ayudas';

const colecciones = [
  ['proyectos', 'proyectos'],
  ['eventos', 'eventos'],
  ['equipo', 'equipo'],
  ['lineas_trabajo', 'lineas'],
  ['archivo_audiovisual', 'archivo-audiovisual'],
] as const;

const escaparXml = (texto: string) =>
  texto
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  // Cada colección se pagina: publicar una nueva URL no requiere reconstruir el sitemap.
  const grupos = await Promise.all(
    colecciones.map(async ([coleccion, ruta]) => {
      const rutas: string[] = [];
      let offset = 0;
      while (true) {
        const datos = await obtenerDatos<Record<string, { slug: string | null }[]>>(
          `query ($offset: Int!) {
            ${coleccion}(filter: { estado: { _eq: "publicado" } }, sort: ["id"], limit: 100, offset: $offset) { slug }
          }`,
          { offset }
        );
        const elementos = datos[coleccion];
        if (!elementos.length) break;
        for (const { slug } of elementos) {
          if (slug?.trim() && slug === slug.trim() && !/[/?#]/.test(slug) && !['.', '..'].includes(slug)) {
            rutas.push(`/${ruta}/${encodeURIComponent(slug)}/`);
          }
        }
        offset += elementos.length;
      }
      return rutas;
    })
  );
  const rutas = new Set(['/', '/contacto/', ...colecciones.map(([, ruta]) => `/${ruta}/`), ...grupos.flat()]);
  const urls = [...rutas]
    .sort()
    .map((ruta) => `<url><loc>${escaparXml(new URL(ruta, site).href)}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    }
  );
};
