import { camposFiltro, coincide, contarOpciones, ordenarEntradas } from './filtrosArchivo';
import type { CampoFiltro, EntradaFiltro, SeleccionFiltros } from './filtrosArchivo';

const controles = document.querySelector<HTMLFormElement>('#controlesArchivo')!;
const busqueda = document.querySelector<HTMLInputElement>('#buscarMaterial')!;
const orden = document.querySelector<HTMLSelectElement>('#ordenMaterial')!;
const contenedor = document.querySelector<HTMLUListElement>('#materiales')!;
const elementos = [...contenedor.querySelectorAll<HTMLLIElement>('.material')];
const entradas: EntradaFiltro[] = elementos.map((elemento) => JSON.parse(elemento.dataset.filtro!));
const porId = new Map(elementos.map((elemento, indice) => [entradas[indice].id, elemento]));
const cantidad = document.querySelector<HTMLParagraphElement>('#cantidadMateriales')!;
const vacio = document.querySelector<HTMLDivElement>('#sinResultados')!;
const activos = document.querySelector<HTMLDivElement>('#filtrosActivos')!;
const limpiar = document.querySelector<HTMLButtonElement>('#limpiarFiltros')!;
const botones = [...controles.querySelectorAll<HTMLButtonElement>('[data-vista]')];
const selects = Object.fromEntries(
  camposFiltro.map((campo) => [campo, controles.querySelector<HTMLSelectElement>(`[name="${campo}"]`)!])
) as Record<CampoFiltro, HTMLSelectElement>;

function seleccion(): SeleccionFiltros {
  return Object.fromEntries(camposFiltro.map((campo) => [campo, selects[campo].value])) as SeleccionFiltros;
}

function cambiarVista(vista: string) {
  contenedor.dataset.vista = vista === 'galeria' ? 'galeria' : 'lista';
  botones.forEach((boton) =>
    boton.setAttribute('aria-pressed', String(boton.dataset.vista === contenedor.dataset.vista))
  );
}

function guardarUrl() {
  const url = new URL(location.href);
  const valores = {
    q: busqueda.value.trim(),
    ...seleccion(),
    orden: orden.value === 'identificador' ? '' : orden.value,
    vista: contenedor.dataset.vista === 'galeria' ? 'galeria' : '',
  };
  Object.entries(valores).forEach(([campo, valor]) =>
    valor ? url.searchParams.set(campo, valor) : url.searchParams.delete(campo)
  );
  if (url.href !== location.href) history.replaceState(history.state, '', url);
}

function actualizar(escribirUrl = true) {
  const filtros = seleccion();
  let visibles = 0;
  ordenarEntradas(entradas, orden.value).forEach((entrada) => {
    const elemento = porId.get(entrada.id)!;
    elemento.hidden = !coincide(entrada, busqueda.value, filtros);
    if (!elemento.hidden) visibles++;
    contenedor.append(elemento);
  });
  cantidad.textContent = `${visibles} de ${entradas.length} ${entradas.length === 1 ? 'material' : 'materiales'}`;
  vacio.hidden = visibles > 0 || entradas.length === 0;
  camposFiltro.forEach((campo) => {
    const cantidades = contarOpciones(entradas, busqueda.value, filtros, campo);
    Array.from(selects[campo].options).forEach((opcion) => {
      if (!opcion.value) return;
      const cuenta = cantidades.get(opcion.value) ?? 0;
      opcion.textContent = `${opcion.value} (${cuenta})`;
      opcion.disabled = cuenta === 0 && opcion.value !== filtros[campo];
    });
  });
  activos.replaceChildren();
  const agregarActivo = (texto: string, quitar: () => void) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = `${texto} ×`;
    boton.setAttribute('aria-label', `Quitar filtro: ${texto}`);
    boton.addEventListener('click', quitar);
    activos.append(boton);
  };
  if (busqueda.value.trim())
    agregarActivo(`Búsqueda: ${busqueda.value.trim()}`, () => {
      busqueda.value = '';
      actualizar();
      busqueda.focus();
    });
  camposFiltro.forEach((campo) => {
    if (filtros[campo])
      agregarActivo(`${selects[campo].dataset.etiqueta}: ${filtros[campo]}`, () => {
        selects[campo].value = '';
        actualizar();
        selects[campo].focus();
      });
  });
  activos.hidden = activos.childElementCount === 0;
  limpiar.disabled = activos.hidden;
  if (escribirUrl) guardarUrl();
}

function restaurarUrl() {
  const parametros = new URL(location.href).searchParams;
  busqueda.value = parametros.get('q') ?? '';
  camposFiltro.forEach((campo) => {
    const valor = parametros.get(campo) ?? '';
    const select = selects[campo];
    // Conservar filtros compartidos aunque una opción ya no exista en el catálogo.
    if (valor && !Array.from(select.options).some((opcion) => opcion.value === valor)) {
      select.add(new Option(valor, valor));
    }
    select.value = valor;
  });
  const valorOrden = parametros.get('orden') ?? '';
  orden.value = ['titulo', 'recientes'].includes(valorOrden) ? valorOrden : 'identificador';
  cambiarVista(parametros.get('vista') ?? 'lista');
  actualizar(false);
}

function limpiarFiltros() {
  busqueda.value = '';
  camposFiltro.forEach((campo) => {
    selects[campo].value = '';
  });
  actualizar();
  busqueda.focus();
}

controles.hidden = entradas.length === 0;
controles.addEventListener('submit', (evento) => {
  evento.preventDefault();
  actualizar();
});
busqueda.addEventListener('input', () => actualizar());
camposFiltro.forEach((campo) => selects[campo].addEventListener('change', () => actualizar()));
orden.addEventListener('change', () => actualizar());
botones.forEach((boton) =>
  boton.addEventListener('click', () => {
    cambiarVista(boton.dataset.vista!);
    guardarUrl();
  })
);
limpiar.addEventListener('click', limpiarFiltros);
document.querySelector('#limpiarBusqueda')?.addEventListener('click', limpiarFiltros);
window.addEventListener('popstate', restaurarUrl);
window.addEventListener('pageshow', restaurarUrl);
restaurarUrl();
