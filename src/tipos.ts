export type PersonaEquipo = {
  date_created: Date;
  nombre: string;
  slug: string;
  descripcion: string;
  activo: boolean;
  redes: Red[];
  sitio_web: string;
  rol: string;
  foto: Imagen;
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
  user_created: string;
  fecha_inicio: string;
  fecha_publicacion: string;
  enlace: string;
  repos: Repo[];
  equipo: PersonaEquipo[];
  temas: { glosario_id: TerminoGlosario }[];
  terminado?: boolean;
}
