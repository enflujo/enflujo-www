const fecha = document.getElementById('fecha');
const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const actualizarFecha = () => {
  const actualizar = () => {
    const ahora = new Date();
    fecha.innerText = ahora.toLocaleString('es-CO', opciones);
  };

  actualizar();

  setInterval(actualizar, 1000);
};

actualizarFecha();
