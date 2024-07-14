/**
 * "Composable" de Vue 3 para crear observador. Útil para carga diferida (lazy loading)
 * @param elemento Elemento que se quiere observar.
 * @param accion Función que se ejecuta cuando entra en intersección.
 * @param desconectarInmediatamente Si la acción se debe ejecutar 1 sola vez.
 * @param opciones Opciones del "Intersection Observer API"
 * @returns instancia del observador
 */
export const duranteInterseccion = (
  elemento: HTMLElement,
  accion: (elemento: Element) => void,
  desconectarInmediatamente = true,
  opciones: IntersectionObserverInit
) => {
  const observador = new IntersectionObserver(([elementoObservado]) => {
    if (elementoObservado && elementoObservado.isIntersecting) {
      accion(elementoObservado.target);

      if (desconectarInmediatamente) {
        observador.unobserve(elementoObservado.target);
      }
    }
  }, opciones);

  observador.observe(elemento);

  return observador;
};
