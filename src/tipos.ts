export type PersonaEquipo = {
  date_created: string | Date;
  nombre: string;
  slug: string;
  descripcion: string;
  activo: boolean;
  redes: Red[];
  sitio_web: string;
  rol: string;
  foto: Imagen;
  proyectos?: {
    proyectos_id: {
      titulo: string;
      slug: string;
    };
  }[];
};

export type Red = {
  red: string;
  usuario: string;
  url: string;
};

export type Imagen = {
  id: string;
  title: string;
};

export type Repo = {
  nombre: string;
  url: string;
};

export type TerminoGlosario = {
  titulo: string;
};

export interface CamposComunes {
  estado: string;
  titulo: string;
  slug: string;
  contenido: string;
  // SEO
  descripcion: string;
  imagen: Imagen;
}

export interface Evento extends CamposComunes {
  fecha_inicio: string;
  fecha_fin: string;
  enlace: string;
  ciudad: string;
}

export interface Proyecto extends CamposComunes {
  id: number;
  user_created?: string | Date;
  fecha_inicio: string | Date;
  fecha_publicacion: string | Date;
  date_created?: string | Date;
  enlace: string;
  repos: Repo[];
  equipo: PersonaEquipo[];
  temas: { glosario_id: TerminoGlosario }[];
  terminado?: boolean;
  colegas?: { colegas_id: { nombre: string; enlace?: string } }[];
}

export interface OpcionesImagenDirectus {
  fit?: 'contain' | 'cover' | 'inside' | 'outside';
  width: number;
  height: number;
  quality?: number;
  withoutEnlargement?: boolean;
  format?: 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';
  transforms?: any[];
}

export interface MetadatosGenerales {
  nombre: string;
  subtitulo: string;
  contenido: string;
  color: string;
  redes: Red[];
  // SEO
  descripcion: string;
  imagen: Imagen;
}
