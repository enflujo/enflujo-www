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
  setInterval(() => {
    const ahora = new Date();
    fecha.innerText = ahora.toLocaleString('es-CO', opciones);
  }, 1000);
};

actualizarFecha();
