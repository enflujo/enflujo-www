/** Exporta la tarjeta completa con el formato de impresión, también desde móvil. */
export async function descargarFicha(tarjeta: HTMLElement, identificador: string) {
  // Cargar el conversor únicamente cuando se solicita una imagen.
  const { toBlob } = await import('html-to-image');
  const contenedor = document.createElement('div');
  contenedor.setAttribute('aria-hidden', 'true');
  contenedor.inert = true;
  Object.assign(contenedor.style, { position: 'fixed', left: '-10000px', top: '0', pointerEvents: 'none' });
  const copia = tarjeta.cloneNode(true) as HTMLElement;
  // Fijar el ancho evita que el tamaño de pantalla cambie el archivo descargado.
  Object.assign(copia.style, { width: '140mm', maxWidth: 'none', padding: '7mm', margin: '0' });
  const datos = copia.querySelector<HTMLElement>('.datosTarjeta');
  if (datos) datos.style.gridTemplateColumns = 'minmax(0, 1fr) 38mm';
  contenedor.append(copia);
  document.body.append(contenedor);

  try {
    await Promise.all([...copia.querySelectorAll('img')].map((imagen) => imagen.decode()));
    const imagen = await toBlob(copia, {
      backgroundColor: '#ffffff',
      pixelRatio: 300 / 96,
      // La tarjeta utiliza fuentes del sistema y no necesita servicios de fuentes.
      skipFonts: true,
    });
    if (!imagen) throw new Error('No se pudo convertir la tarjeta a PNG.');
    const url = URL.createObjectURL(imagen);
    const enlace = document.createElement('a');
    const nombre = identificador.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').replace(/[. ]+$/, '') || 'material';
    enlace.download = `ficha-${nombre}.png`;
    enlace.href = url;
    document.body.append(enlace);
    try {
      enlace.click();
    } finally {
      enlace.remove();
      // Dar tiempo al navegador a iniciar la descarga antes de liberar el archivo.
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    }
  } finally {
    contenedor.remove();
  }
}
