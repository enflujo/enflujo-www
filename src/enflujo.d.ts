export type PersonaEquipo = {
  date_created: Date;
  nombre: string;
  slug: string;
  descripcion: String;
  activo: boolean;
  redes: Red[];
  sitio_web: string;
  rol: String;
  foto: Foto;
};

export type Red = {
  red: string;
  usuario: string;
  url: string;
};

export type Foto = {
  id: string;
  title: string;
};
