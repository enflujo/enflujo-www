const TIPO_HLS = 'application/vnd.apple.mpegurl';
const URL_HLS_JS = 'https://cdn.jsdelivr.net/npm/hls.js@1.6.13/+esm';

type ConstructorHls = {
  isSupported: () => boolean;
  new (config?: Record<string, unknown>): {
    attachMedia: (media: HTMLMediaElement) => void;
    loadSource: (url: string) => void;
  };
};

const reproducir = (video: HTMLVideoElement) => {
  const promesa = video.play();

  if (promesa) {
    void promesa.catch(() => {});
  }
};

const cargarHls = async (): Promise<ConstructorHls | null> => {
  try {
    const modulo = (await import(/* @vite-ignore */ URL_HLS_JS)) as { default?: ConstructorHls };
    return modulo.default ?? null;
  } catch (error) {
    console.error('No se pudo cargar hls.js', error);
    return null;
  }
};

export const iniciarVideoHls = async (selector: string, url: string) => {
  const video = document.querySelector<HTMLVideoElement>(selector);

  if (!video) return;

  if (video.canPlayType(TIPO_HLS)) {
    video.src = url;
    reproducir(video);
    return;
  }

  const Hls = await cargarHls();

  if (!Hls || !Hls.isSupported()) {
    video.src = url;
    reproducir(video);
    return;
  }

  const reproductor = new Hls({
    backBufferLength: 90,
    lowLatencyMode: true,
  });

  reproductor.loadSource(url);
  reproductor.attachMedia(video);

  // Conserva la referencia en el nodo para evitar que se libere mientras reproduce.
  (video as HTMLVideoElement & { reproductorHls?: unknown }).reproductorHls = reproductor;

  video.addEventListener('canplay', () => reproducir(video), { once: true });
};
