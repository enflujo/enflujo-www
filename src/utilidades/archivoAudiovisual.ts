import type { Imagen } from '@/tipos';
import { apiBase, gql, obtenerDatos } from './ayudas';

export interface MedioArchivo extends Imagen {
  type: string | null;
  description: string | null;
}

type VinculoColega = { colegas_id: { nombre: string | null } | null };

export interface FichaAudiovisual extends MaterialAudiovisual {
  motivo: string[] | null;
  tipo_ingreso: string | null;
  observaciones: string | null;
  fecha_creacion: string | null;
  fecha_actualizacion: string | null;
  imagen: MedioArchivo | null;
  fotos: { directus_files_id: MedioArchivo | null }[] | null;
  institucion: VinculoColega[] | null;
  procedencia: VinculoColega[] | null;
  persona_remitente: VinculoColega[] | null;
  persona_recibe: { equipo_id: { nombre: string | null } | null }[] | null;
}

// Estas relaciones son listas en REST pero están declaradas String en GraphQL.
// REST permite resolver sus nombres sin perder institución y procedencia.
export async function obtenerFichas(): Promise<FichaAudiovisual[]> {
  const fichas: FichaAudiovisual[] = [];
  const campos = [
    'id',
    'identificador',
    'slug',
    'titulo',
    'descripcion',
    'soporte',
    'motivo',
    'tipo_ingreso',
    'observaciones',
    'fecha_creacion',
    'fecha_actualizacion',
    ...['imagen', 'fotos.directus_files_id'].flatMap((campo) =>
      ['id', 'title', 'type', 'description'].map((atributo) => `${campo}.${atributo}`)
    ),
    'institucion.colegas_id.nombre',
    'procedencia.colegas_id.nombre',
    'persona_remitente.colegas_id.nombre',
    'persona_recibe.equipo_id.nombre',
  ];
  while (true) {
    const parametros = new URLSearchParams({
      'filter[estado][_eq]': 'publicado',
      fields: campos.join(','),
      sort: 'id',
      limit: '100',
      offset: String(fichas.length),
      'deep[fotos][_limit]': '-1',
      'deep[institucion][_limit]': '-1',
      'deep[procedencia][_limit]': '-1',
      'deep[persona_remitente][_limit]': '-1',
      'deep[persona_recibe][_limit]': '-1',
    });
    const respuesta = await fetch(`${apiBase}/items/archivo_audiovisual?${parametros}`);
    const resultado = await respuesta.json();
    if (!respuesta.ok || resultado.errors || !Array.isArray(resultado.data)) {
      throw new Error(`No se pudieron cargar las fichas audiovisuales: ${respuesta.status}`);
    }
    if (!resultado.data.length) break;
    fichas.push(...resultado.data.map((ficha: FichaAudiovisual) => ({ ...ficha, id: String(ficha.id) })));
  }
  const slugs = new Set<string>();
  for (const ficha of fichas) {
    if (
      !ficha.slug?.trim() ||
      ficha.slug !== ficha.slug.trim() ||
      /[/?#]/.test(ficha.slug) ||
      ['.', '..'].includes(ficha.slug)
    ) {
      throw new Error(`El material ${ficha.identificador || ficha.id} necesita un slug válido para generar su ficha.`);
    }
    if (slugs.has(ficha.slug)) throw new Error(`Slug duplicado en Archivo Audiovisual: ${ficha.slug}`);
    slugs.add(ficha.slug);
  }
  return fichas;
}

export interface MaterialAudiovisual {
  id: string;
  slug: string;
  identificador: string | null;
  titulo: string | null;
  descripcion: string | null;
  soporte: string | null;
  imagen: Imagen | null;
}

export const nombreSoporte = (soporte: string | null) => {
  const nombres: Record<string, string> = {
    filmico: 'Fílmico',
    magnetico: 'Magnético',
    digital: 'Digital',
    optico: 'Óptico',
  };
  const valor = soporte?.trim();
  return valor ? (nombres[valor] ?? valor.replaceAll('_', ' ')) : 'Sin soporte registrado';
};

export const normalizarBusqueda = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();

export async function obtenerMateriales(): Promise<MaterialAudiovisual[]> {
  const materiales: MaterialAudiovisual[] = [];
  // Paginar también durante el build: Directus puede limitar el tamaño de cada respuesta.
  while (true) {
    const { archivo_audiovisual: pagina } = await obtenerDatos<{ archivo_audiovisual: MaterialAudiovisual[] }>(gql`
      query {
        archivo_audiovisual(
          filter: { estado: { _eq: "publicado" } }
          sort: ["id"]
          limit: 100
          offset: ${materiales.length}
        ) {
          id
          identificador
          slug
          titulo
          descripcion
          soporte
          imagen { id title }
        }
      }
    `);
    if (!pagina.length) break;
    materiales.push(...pagina);
  }
  return materiales;
}
