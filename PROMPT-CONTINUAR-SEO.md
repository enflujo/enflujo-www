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

## Actualización de continuidad — 6 de septiembre de 2026

Esta sección actualiza el estado del trabajo y prevalece sobre las notas históricas anteriores.

- Portada: implementados `WebSite` y `ResearchOrganization` con datos generales de Directus. Validados JSON local, URLs absolutas, título de marca y contenido visible.
- Proyectos: implementados `WebPage` y `CreativeWork` en los 29 proyectos publicados. Fechas y estados respetan la narrativa del laboratorio: `dateCreated` usa `fecha_inicio`; `datePublished` solo aparece con `fecha_publicacion`; `creativeWorkStatus` indica `En proceso` o `Terminado` según esta última.
- Corrección posterior de fechas: en el detalle de proyectos se eliminó por completo la sustitución de `fecha_publicacion` por `date_created`. Sin publicación, se muestra `En proceso` y el tiempo relativo parte de `fecha_inicio`. No reintroducir la sustitución descrita en las notas históricas.
- Eventos: añadidos `WebPage` y `Event` básicos y validados los 9 eventos publicados. El usuario decidió posponer completar esta sección. Los pendientes de campos, contenido, imágenes y validación están en [PENDIENTES-SEO-EVENTOS.md](PENDIENTES-SEO-EVENTOS.md). No bloquear el resto del plan por eventos.
- Perfiles: revisado `Person` y vinculado con `ProfilePage`, con identificadores absolutos, descripción existente y enlaces personales válidos en `sameAs`. El sitio personal se conserva como identidad externa y la URL del perfil identifica la página local canónica. Las fotos predeterminadas no se atribuyen a la persona en JSON-LD.
- Validación de perfiles: 19 páginas locales con HTTP 200 y JSON válido; nombres, descripciones, fotos y enlaces coinciden con Directus; título y contenido visible conservados. Se mantienen 5 descripciones vacías y 1 perfil sin foto propia en JSON-LD, sin bloquear el avance. `yarn revisar`: 0 errores, 0 advertencias y 0 indicaciones.
- 404: añadido `<meta name="robots" content="noindex">` únicamente en `src/pages/404.astro`, mediante el slot `cabeza`. El contenido visible se conserva. En desarrollo, `/404`, `/404.html` y una ruta inexistente responden 404. En la previsualización del sitio compilado, las rutas inexistentes responden 404; el acceso directo a `/404` o `/404.html` responde 200, pero contiene `noindex`.
- Validación de 404: `yarn build` pasó (incluye `astro check`: 0 errores, advertencias e indicaciones). Se revisaron 63 HTML compilados: solo `404.html` tiene `noindex`. El sitemap excluye la 404; `robots.txt` permite el rastreo y anuncia el sitemap. Portada local con HTTP 200 sin `noindex`. Servidores locales: desarrollo en 3000, previsualización en 3001. La respuesta HTTP del alojamiento real se comprobará al validar un despliegue autorizado; no inferirla de Astro preview.
- No se han creado campos de Directus ni desplegado el sitio en estas etapas. Conservar los cambios previos del usuario en `package.json` y `yarn.lock`.
- Filtros de publicación: Contacto ahora consulta `paginas` con `estado: publicado` y redirige a `/404` si no recibe un registro. En perfiles, la relación `proyectos` filtra por `proyectos_id.estado: publicado`; se descartan relaciones nulas antes de ordenar o renderizar. Las demás consultas a colecciones con estado ya tenían filtros. Se comprobó que `general`, `colegas` y `ciudades` no tienen campo `estado` en el esquema público; no añadir filtros inexistentes.
- Validación de filtros: `yarn revisar` pasó sin errores, advertencias ni indicaciones. Contacto publicado respondió HTTP 200; 19 perfiles mostraron las 84 relaciones de proyectos publicados esperadas y conservaron su contenido visible. En un servidor local temporal se simularon en memoria la ausencia de Contacto y una relación nula: redirección 302 a `/404` y perfil HTTP 200 sin enlace inválido, respectivamente. El servidor temporal se cerró y Directus no se modificó. Esto valida las consultas del sitio, no constituye una auditoría de permisos de Directus. La previsualización en 3001 conserva la compilación de la etapa 404; para probar los filtros recién cambiados se usó desarrollo en 3000.

## Siguiente paso exacto

Empezar la revisión SEO de imágenes con un paso pequeño: comprobar la imagen social predeterminada, sus dimensiones reales y los metadatos Open Graph/Twitter que la plantilla genera cuando no hay imagen editorial. Inspeccionar `src/plantillas/Plantilla.astro` y `recursos/imgs/og-EnFlujo-predeterminado.jpg`. Reutilizar los campos existentes de Directus; no crear campos de texto alternativo antes de consultar el esquema. Validar localmente cualquier cambio. Los eventos siguen pospuestos según su documento de pendientes.

Detente después de mostrarme el resultado de este paso y dime cuál sería el siguiente, en una sola propuesta breve.

## Ruta del plan después de ese paso

No ejecutes todo esto de una vez. Esta lista solo conserva la dirección del trabajo:

1. Datos estructurados básicos de portada, proyectos, eventos y perfiles implementados. Ampliaciones de eventos pospuestas por decisión del usuario; ver su documento de pendientes.
2. Página 404 revisada: `noindex` local y compilado, sitemap sin 404 y estado HTTP correcto para rutas inexistentes en Astro preview.
3. Filtros de publicación revisados en las consultas del sitio; corregidos Contacto y proyectos relacionados en perfiles, con validación local.
4. Mejorar el SEO de imágenes: textos alternativos editoriales en Directus, imagen social predeterminada y dimensiones adecuadas para compartir (siguiente etapa).
5. Volver a auditar títulos, descripciones, canonical, `h1`, Open Graph y Twitter en todas las URLs públicas. Mantener vacíos deliberados fuera del camino crítico.
6. Mejorar sitemap y fechas de modificación si los datos de Directus permiten hacerlo de forma fiable.
7. Diseñar un sistema escalable de redirecciones para futuros cambios de slug, posiblemente con una colección en Directus.
8. Medir Core Web Vitals y atender problemas reales de rendimiento y accesibilidad que afecten SEO.
9. Al final, configurar o revisar Google Search Console, enviar el sitemap y preparar una lista editorial sencilla para futuras publicaciones.

Recuerda: un cambio pequeño, validación local, explicación corta y pausa para que el usuario pueda confirmar.

---
