export const camposFiltro = ['soporte', 'procedencia', 'institucion', 'motivo'] as const;
export type CampoFiltro = (typeof camposFiltro)[number];
export type SeleccionFiltros = Record<CampoFiltro, string>;
export interface EntradaFiltro {
  id: string;
  titulo: string;
  identificador: string;
  fecha: string;
  busqueda: string;
  campos: Record<CampoFiltro, string[]>;
}

export const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();

export function coincide(entrada: EntradaFiltro, consulta: string, filtros: SeleccionFiltros, omitir?: CampoFiltro) {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  return (
    palabras.every((palabra) => entrada.busqueda.includes(palabra)) &&
    camposFiltro.every((campo) => campo === omitir || !filtros[campo] || entrada.campos[campo].includes(filtros[campo]))
  );
}

export function contarOpciones(
  entradas: EntradaFiltro[],
  consulta: string,
  filtros: SeleccionFiltros,
  campo: CampoFiltro
) {
  const cantidades = new Map<string, number>();
  entradas
    .filter((entrada) => coincide(entrada, consulta, filtros, campo))
    .forEach((entrada) => {
      new Set(entrada.campos[campo]).forEach((valor) => cantidades.set(valor, (cantidades.get(valor) ?? 0) + 1));
    });
  return cantidades;
}

const comparador = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });
export function ordenarEntradas(entradas: EntradaFiltro[], orden: string) {
  return [...entradas].sort((a, b) => {
    let diferencia = 0;
    if (orden === 'titulo') diferencia = comparador.compare(a.titulo, b.titulo);
    else if (orden === 'recientes') diferencia = (Date.parse(b.fecha) || 0) - (Date.parse(a.fecha) || 0);
    else {
      if (!a.identificador !== !b.identificador) return a.identificador ? -1 : 1;
      diferencia = comparador.compare(a.identificador, b.identificador);
    }
    return diferencia || comparador.compare(a.id, b.id);
  });
}
