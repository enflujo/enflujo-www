# Prompt para continuar la revisión SEO de EnFlujo

Copia desde la siguiente línea y úsalo como primer mensaje en la nueva sesión:

---

Estoy trabajando en el repositorio del sitio de EnFlujo. Es un sitio estático construido con Astro 7 y alimentado desde Directus.

- Repositorio local: `enflujo-www`
- Sitio público: `https://enflujo.com`
- GraphQL público de Directus: `https://api.enflujo.com/graphql`
- Comando de desarrollo: `yarn dev`
- Revisión de Astro: `yarn revisar`
- Compilación completa: `yarn build`

Quiero continuar una revisión e implementación SEO completa, pero debemos trabajar **un solo paso pequeño a la vez**, probarlo localmente y dejarme validarlo antes de seguir. No me presentes todo el plan de golpe. Explícame en español, de forma breve y concreta, qué estás comprobando y qué resultado obtuviste.

## Decisiones que debes respetar

1. Todo el contenido y las descripciones deben estar en español. Los nombres de campos nuevos en Directus también deben estar en español, sin tildes ni espacios.
2. Antes de sugerir un campo de Directus, consulta el esquema o las consultas existentes para no duplicarlo.
3. El título visual y de marca `..:: EnFlujo ::..` es deliberado. No lo “corrijas” ni elimines sus signos.
4. Valida los cambios encendiendo el sitio localmente. No es necesario desplegar la web para probar cada paso.
5. El sitio se despliega mediante un Flow de Directus cuando el usuario lo indica o mediante un `push` al repositorio. No actives un despliegue sin que el usuario lo pida.
6. Conserva cualquier cambio ajeno que encuentres en el repositorio. No restaures ni sobrescribas trabajo del usuario.
7. Cuando hagan falta modificaciones de contenido en Directus, agrúpalas en lotes razonables para no interrumpir a cada momento, pero sigue avanzando por etapas validables.

## Trabajo ya realizado

### Metadatos generales

- La plantilla principal genera URL canónica absoluta.
- Los metadatos `description`, `og:description` y `twitter:description` solo se generan cuando hay una descripción real; ya no aparecen etiquetas vacías.
- Se conservaron el título y la estética de marca de EnFlujo.
- En una auditoría anterior se comprobaron 62 URLs del sitemap: respondían 200, tenían canonical correcto y un solo `h1`.

Archivo principal: `src/plantillas/Plantilla.astro`.

### Directus y contenido

- La colección `equipo` tiene ahora dos campos distintos:
  - `descripcion`: texto breve y plano para SEO.
  - `biografia`: contenido largo y visible del perfil.
- El código de perfiles consulta y muestra `biografia`, pero entrega `descripcion` a la plantilla SEO.
- Se migraron varias biografías que antes estaban mezcladas con la descripción SEO.
- La descripción SEO de Juan Camilo González quedó así:

  > Juan Camilo González dirige EnFlujo. Es artista, animador y programador; trabaja con cine, visualización de datos, código y dispositivos experimentales.

- Por ahora pueden quedar sin texto Daniel Hoyos, Laura Quintero, Jesús Paredes y Laura Echeverri. No detengas el avance por esos perfiles.
- Antonia tiene descripción SEO, aunque todavía no tenga biografía.
- Se añadieron o ajustaron descripciones de la página de eventos y de varios proyectos y eventos.
- El evento en inglés “Moving pictures, controversial memoirs” fue omitido deliberadamente. No lo uses como bloqueo ni lo modifiques sin volver a consultarlo.
- Un evento se tradujo y cambió al slug `presentacion-y-taller-de-animacion-expandida-en-la-erg-de-bruselas`. Se aceptó que el slug anterior quedara en 404 porque no era crítico.

Archivos relevantes: `src/tipos.ts` y `src/pages/equipo/[slug].astro`.

### Imágenes y rendimiento inicial

- Los componentes de imagen dejaron de guardar la URL real únicamente en `data-fuente`.
- Ahora usan `src`, `loading="lazy"` y `decoding="async"` nativos.
- Se eliminó el observador JavaScript personalizado que cargaba esas imágenes.
- Se validó localmente que las páginas de proyectos y equipo ya no producen imágenes de Directus con `data-fuente`.

Archivos relevantes:

- `src/componentes/Tarjeta.astro`
- `src/componentes/EnflujoImagen.astro`
- `src/utilidades/ayudas.ts`
- `src/plantillas/Plantilla.astro`

### Fechas de proyectos

- Se corrigió un error que reemplazaba `fecha_publicacion` con `date_created` incluso cuando la primera existía.
- `date_created` ahora se usa solamente como respaldo cuando falta `fecha_publicacion`.
- También se corrigió el desfase de un día que se producía al interpretar valores de Directus con formato `AAAA-MM-DD` como UTC.
- Validación realizada: el proyecto “Un mensaje para Gabo” tiene `fecha_publicacion: 2025-08-31` y ahora muestra localmente “Publicado el 31 de agosto de 2025”, no el día 30.
- La última ejecución de `yarn revisar` terminó con 0 errores, 0 advertencias y 0 indicaciones.

Archivos relevantes:

- `src/pages/proyectos/[slug].astro`
- `src/componentes/DescripcionProyecto.astro`
- `src/utilidades/ayudas.ts`

### Dominio canónico

- En Cloudflare se creó una redirección 301 de HTTPS con `www` hacia el dominio sin `www`, conservando ruta y parámetros:
  - Patrón: `https://www.*`
  - Destino: `https://${1}`
- Se confirmó que el registro DNS `www` está proxied y que la redirección funciona para la raíz, las rutas y los parámetros.
- La posible redirección adicional de HTTP a HTTPS se dejó de lado porque el usuario decidió que no era importante en este momento. No vuelvas a detener el proceso por esto.

## Siguiente paso exacto

Empieza por añadir y validar datos estructurados JSON-LD en la portada para identificar:

- el sitio mediante `WebSite`;
- a EnFlujo mediante un tipo adecuado de `Organization`.

Primero inspecciona `src/pages/index.astro`, `src/plantillas/Plantilla.astro`, los tipos y los datos generales que ya llegan desde Directus. Reutiliza esos datos y no pidas crear campos nuevos si no hacen falta. Evita inventar información. Genera el JSON con `JSON.stringify(...)` y escapa `<` como ya se hace en la página de perfiles. Después valida al menos:

1. `yarn revisar`;
2. el HTML local de la portada para confirmar que existe un bloque `application/ld+json` válido;
3. que las URLs e imagen incluidas sean absolutas;
4. que no se haya alterado el contenido visible ni el título `..:: EnFlujo ::..`.

Detente después de mostrarme el resultado de este paso y dime cuál sería el siguiente, en una sola propuesta breve.

## Ruta del plan después de ese paso

No ejecutes todo esto de una vez. Esta lista solo conserva la dirección del trabajo:

1. Añadir datos estructurados específicos a proyectos (`CreativeWork` o el tipo más preciso según el contenido) y eventos (`Event`). Revisar el `Person` que ya existe en perfiles.
2. Revisar la página 404 y evitar que pueda indexarse.
3. Confirmar que todas las consultas públicas filtran correctamente por estado publicado, especialmente las páginas auxiliares.
4. Mejorar el SEO de imágenes: textos alternativos editoriales en Directus, imagen social predeterminada y dimensiones adecuadas para compartir.
5. Volver a auditar títulos, descripciones, canonical, `h1`, Open Graph y Twitter en todas las URLs públicas. Mantener vacíos deliberados fuera del camino crítico.
6. Mejorar sitemap y fechas de modificación si los datos de Directus permiten hacerlo de forma fiable.
7. Diseñar un sistema escalable de redirecciones para futuros cambios de slug, posiblemente con una colección en Directus.
8. Medir Core Web Vitals y atender problemas reales de rendimiento y accesibilidad que afecten SEO.
9. Al final, configurar o revisar Google Search Console, enviar el sitemap y preparar una lista editorial sencilla para futuras publicaciones.

Recuerda: un cambio pequeño, validación local, explicación corta y pausa para que el usuario pueda confirmar.

---
