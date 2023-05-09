export type PersonaEquipo = {
  date_created: Date;
  nombre: string;
  slug: string;
  descripcion: String;
  activo: boolean;
  redes: Red[];
  sitio_web: string;
  rol: String;
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
