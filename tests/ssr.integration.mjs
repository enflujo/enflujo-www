import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as esperar } from 'node:timers/promises';

const colecciones = {
  proyectos: 'proyectos',
  eventos: 'eventos',
  equipo: 'equipo',
  lineas_trabajo: 'lineas',
  archivo_audiovisual: 'archivo-audiovisual',
};

test('el servidor refleja publicación, edición y retiro sin recompilar', { timeout: 60000 }, async (t) => {
  let publicado = false;
  let titulo = 'Contenido publicado después del build';
  let falloCMS = false;
  const consultas = [];
  const peticionesRest = [];
  const ficha = () => ({
    id: '1',
    slug: 'nuevo-contenido',
    titulo,
    nombre: titulo,
    descripcion: 'Descripción de prueba',
    contenido: 'Contenido de prueba',
    fecha_inicio: '2026-09-29',
    fecha_publicacion: '2026-09-29',
    estado: 'publicado',
    imagen: null,
    colegas: [],
    repos: [],
    proyectos: [],
    secciones: [],
    redes: [],
    organizador: [],
    identificador: 'EF_1',
    soporte: 'filmico',
    fotos: [],
    motivo: [],
    institucion: [],
    procedencia: [],
    persona_remitente: [],
    persona_recibe: [],
  });
  const cms = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (falloCMS) {
      res.writeHead(503).end(JSON.stringify({ errors: [{ message: 'CMS no disponible' }] }));
      return;
    }
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/items/archivo_audiovisual') {
      peticionesRest.push(url.searchParams);
      const slug = url.searchParams.get('filter[slug][_eq]');
      const offset = Number(url.searchParams.get('offset') || 0);
      const visible = publicado && url.searchParams.get('filter[estado][_eq]') === 'publicado';
      res.end(
        JSON.stringify({ data: visible && offset === 0 && (!slug || slug === 'nuevo-contenido') ? [ficha()] : [] })
      );
      return;
    }
    if (url.pathname !== '/graphql') {
      res.writeHead(404).end('{}');
      return;
    }
    let body = '';
    for await (const chunk of req) body += chunk;
    const { query, variables = {} } = JSON.parse(body);
    consultas.push({ query, variables });
    const general = {
      nombre: titulo,
      subtitulo: 'Laboratorio',
      descripcion: 'EnFlujo',
      contenido: 'Prueba',
      redes: [],
      color: '#5757f7',
    };
    const data = { general, paginas: [] };
    for (const coleccion of Object.keys(colecciones)) {
      data[coleccion] = [];
      if (!query.includes(`${coleccion}(`) || !publicado) continue;
      if (Object.hasOwn(variables, 'offset')) {
        // Simula un límite de Directus menor al solicitado para comprobar paginación.
        data[coleccion] =
          variables.offset === 0
            ? [{ slug: 'nuevo-contenido' }]
            : variables.offset === 1
              ? [{ slug: 'segunda-pagina' }]
              : [];
      } else if (variables.slug === 'nuevo-contenido' || !variables.slug) {
        data[coleccion] = [ficha()];
      }
    }
    res.end(JSON.stringify({ data }));
  });
  await new Promise((resolve) => cms.listen(0, '127.0.0.1', resolve));
  t.after(() => {
    cms.closeAllConnections();
    cms.close();
  });
  const reservarPuerto = createServer();
  await new Promise((resolve) => reservarPuerto.listen(0, '127.0.0.1', resolve));
  const puerto = reservarPuerto.address().port;
  await new Promise((resolve) => reservarPuerto.close(resolve));
  const app = spawn(process.execPath, ['publico/server/entry.mjs'], {
    cwd: new URL('../', import.meta.url),
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(puerto),
      DIRECTUS_URL: `http://127.0.0.1:${cms.address().port}`,
    },
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  app.stdout.on('data', (chunk) => {
    logs += chunk;
  });
  app.stderr.on('data', (chunk) => {
    logs += chunk;
  });
  t.after(async () => {
    if (app.exitCode === null) {
      const salida = once(app, 'exit');
      app.kill();
      await salida;
    }
  });
  const pedir = (ruta) =>
    fetch(`http://127.0.0.1:${puerto}${ruta}`, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
  let listo = false;
  for (let intento = 0; intento < 100; intento++) {
    try {
      const res = await pedir('/robots.txt');
      await res.text();
      if (res.ok) {
        listo = true;
        break;
      }
    } catch {
      /* Arranque de Node. */
    }
    if (app.exitCode !== null) break;
    await esperar(100);
  }
  assert.ok(listo, logs);

  await t.test('nuevas rutas y cambios de título se ven en la siguiente visita', async () => {
    for (const ruta of Object.values(colecciones)) {
      const res = await pedir(`/${ruta}/nuevo-contenido/`);
      assert.equal(res.status, 404, ruta);
      await res.text();
    }
    publicado = true;
    for (const ruta of Object.values(colecciones)) {
      const res = await pedir(`/${ruta}/nuevo-contenido/`);
      assert.equal(res.status, 200, `${ruta}: ${logs}`);
      assert.equal(res.headers.get('cache-control'), 'no-store');
      assert.match(await res.text(), /Contenido publicado después del build/);
    }
    titulo = 'Edición sin reconstrucción';
    for (const ruta of [
      '/',
      '/archivo-audiovisual/',
      ...Object.values(colecciones).map((r) => `/${r}/nuevo-contenido/`),
    ]) {
      const res = await pedir(ruta);
      assert.equal(res.status, 200, `${ruta}: ${logs}`);
      assert.match(await res.text(), /Edición sin reconstrucción/);
    }
  });

  await t.test('sitemap actualizado, paginado y con las URLs existentes', async () => {
    const res = await pedir('/sitemap-0.xml');
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/xml/);
    const xml = await res.text();
    for (const ruta of Object.values(colecciones)) {
      assert.ok(xml.includes(`https://enflujo.com/${ruta}/nuevo-contenido/`));
      assert.ok(xml.includes(`https://enflujo.com/${ruta}/segunda-pagina/`));
    }
    assert.ok(!xml.includes('/404'));
    assert.match(await (await pedir('/robots.txt')).text(), /https:\/\/enflujo.com\/sitemap-index.xml/);
    assert.match(await (await pedir('/sitemap-index.xml')).text(), /https:\/\/enflujo.com\/sitemap-0.xml/);
  });

  await t.test('los parámetros de URL se envían como variables y las fichas se consultan individualmente', async () => {
    const slug = 'comillas"y{llaves}';
    const res = await pedir(`/proyectos/${encodeURIComponent(slug)}/`);
    assert.equal(res.status, 404);
    await res.text();
    const consulta = consultas.find((c) => c.variables.slug === slug);
    assert.ok(consulta);
    assert.ok(!consulta.query.includes(slug));
    assert.match(consulta.query, /estado:\s*\{\s*_eq:\s*"publicado"/);
    assert.ok(peticionesRest.some((p) => p.get('filter[slug][_eq]') === 'nuevo-contenido' && p.get('limit') === '1'));
  });

  await t.test('retirar contenido devuelve 404 y lo elimina del sitemap sin reiniciar', async () => {
    publicado = false;
    for (const ruta of [...Object.values(colecciones).map((r) => `/${r}/nuevo-contenido/`), '/no-existe/', '/404']) {
      const res = await pedir(ruta);
      assert.equal(res.status, 404, ruta);
      assert.equal(res.headers.get('location'), null);
      await res.text();
    }
    assert.ok(!(await (await pedir('/sitemap-0.xml')).text()).includes('nuevo-contenido'));
  });

  await t.test('los assets se sirven y una caída del CMS no se confunde con un 404', async () => {
    const asset = await pedir('/favicon.svg');
    assert.equal(asset.status, 200);
    assert.match(await asset.text(), /<svg/);
    falloCMS = true;
    for (const ruta of ['/proyectos/nuevo-contenido/', '/archivo-audiovisual/nuevo-contenido/', '/sitemap-0.xml']) {
      const res = await pedir(ruta);
      assert.ok(res.status >= 500, `${ruta}: ${res.status}`);
      await res.text();
    }
  });
});
