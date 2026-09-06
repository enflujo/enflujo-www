# Pendientes SEO de eventos

Actualizado: 6 de septiembre de 2026.

## Prioridad y alcance

El usuario decidió posponer esta sección. No retomarla como bloqueo del resto del plan SEO; continuar con perfiles, 404 y las siguientes etapas de `PROMPT-CONTINUAR-SEO.md`. No modificar Directus ni desplegar al retomar sin respetar las instrucciones de la sesión.

## Trabajo realizado

- `src/pages/eventos/[slug].astro` genera un bloque JSON-LD con `WebPage` y `Event`, vinculados por identificadores absolutos.
- Reutiliza título, descripción, fechas, imagen y organizadores de Directus. Los tipos están en `src/tipos.ts`.
- Las fechas se publican como días, sin atribuir horarios ni zonas horarias no confirmados.
- No declara ubicación, modalidad, entradas ni estado del evento sin datos suficientes.
- Se validaron localmente los 9 eventos publicados: HTTP 200, JSON válido, coincidencia con Directus, canonical y referencias absolutas, título y contenido visible conservados.
- `yarn revisar` pasó sin errores, advertencias ni indicaciones.
- No se crearon campos ni se editaron registros de Directus en esta etapa.

## Campos propuestos en `eventos` — todavía pendientes

Volver a consultar el esquema antes de crearlos: el usuario puede haber adelantado trabajo. Estos campos no aparecían en el esquema público consultado.

| Campo                  | Tipo / interfaz                    | Uso                                                           |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------- |
| `modalidad`            | Texto, selección única             | `presencial`, `virtual`, `hibrido`; sin valor predeterminado. |
| `recinto`              | Texto                              | Nombre concreto del recinto.                                  |
| `direccion`            | Texto                              | Dirección física del recinto.                                 |
| `region`               | Texto                              | Departamento, estado o provincia cuando corresponda.          |
| `codigo_postal`        | Texto                              | Opcional; conservar ceros iniciales.                          |
| `enlace_virtual`       | Texto, interfaz URL                | Acceso público al encuentro o transmisión, cuando exista.     |
| `zona_horaria`         | Texto                              | Zona IANA, por ejemplo `America/Bogota` o `Europe/Brussels`.  |
| `horarios_confirmados` | Booleano, desactivado inicialmente | Distinguir horarios verificados de valores de relleno.        |

Permitir vacíos para datos desconocidos. Completar recinto y dirección en eventos presenciales, acceso virtual en virtuales y ambos en híbridos. Habilitar lectura pública de los nuevos campos con el alcance de los eventos publicados.

## Campos existentes que se deben reutilizar

- `lugar`: relación con `ciudades`; el país llega por `ciudades.pais`. No duplicar ciudad y país ni convertir esta relación en un recinto.
- `fecha_inicio` y `fecha_fin`: confirmar días y horas. Si solo se conocen días, conservar esa precisión en el JSON-LD.
- `organizador`: relación con `colegas`; los 9 organizadores consultados tienen nombre y `enlace`. Reutilizar este último como URL del organizador al ampliar las consultas.
- `enlace`: página oficial del evento con URL absoluta.
- `registro`: grabaciones y materiales posteriores; no reutilizarlo automáticamente para entradas o acceso virtual.
- `descripcion`: descripción breve del evento en español, no de su imagen.
- `imagen` y `fotos`: archivos representativos; revisar calidad y textos alternativos editoriales.
- `estado`: controla publicación en el CMS. No equivale a cancelación, aplazamiento o reprogramación del evento.

## Revisión editorial pendiente

- [ ] SinDeclarar 2024: modalidad virtual; corregir `enlace` (contenía solo `sin-declarar-2024`); reemplazar la descripción de la imagen por una descripción del encuentro.
- [ ] Charla Enflujo: ante el presente digital: añadir una imagen real si está disponible.
- [ ] Charla del Externado: buscar original de la imagen, que tiene 500 px de ancho.
- [ ] Taller de la ERG: buscar original de la imagen, que tiene 603 px de ancho.
- [ ] DWeb Camp: confirmar localidad y recinto; `lugar` contiene California, una región. Revisar también duración: el contenido decía cinco días y el intervalo guardado era 21–24 de agosto de 2022.
- [ ] Taller de la ERG: confirmar el intervalo 22 de octubre–21 de noviembre de 2021.
- [ ] Revisar horarios de las charlas guardadas a las 02:00 y 05:00 y los valores de las 12:00 que puedan ser de relleno.
- [ ] Completar recintos, direcciones y modalidades de los demás eventos con información comprobada. El texto de Animation in Society ya menciona Project(ion) Room y su dirección; comprobarlos al trasladarlos a campos.
- [ ] Mantener la excepción deliberada de Moving pictures, controversial memoirs. No modificarlo ni bloquear el avance por ese evento.

## Implementación al retomar

1. Consultar el esquema y datos actuales; acordar y completar un lote razonable.
2. Ampliar tipos y consultas. Generar `Place` y dirección para eventos presenciales, `VirtualLocation` para virtuales y ambos para híbridos, según datos confirmados.
3. Convertir horarios confirmados con su zona IANA y el desplazamiento válido para la fecha del evento. Si no se conocen, seguir usando solo fechas. No asumir que todos los países comparten zona horaria.
4. Incorporar URL de organizadores. Añadir datos de entradas, cancelaciones o reprogramaciones únicamente si existen y aplican; no inventar gratuidad, disponibilidad ni organizadores.
5. Mostrar los datos esenciales en la página visible respetando la estética del laboratorio.
6. Revisar tamaño y recortes de imágenes del JSON-LD: hoy se usa la transformación `og-imagen`. Google indica al menos 720 px de ancho y recomienda 1920 px para eventos; no ampliar artificialmente originales pequeños.
7. Ejecutar `yarn revisar`, validar HTML local y comparar contenido. Probar código con Schema Markup Validator y, para requisitos específicos de Google, Rich Results Test. No presentar la validación de JSON o TypeScript como una validación de Google.

## Alcance de las herramientas

Schema.org admite eventos virtuales. La experiencia específica de eventos de Google requiere componente presencial y acceso al público general; los eventos exclusivamente virtuales no son elegibles para esa experiencia. Los datos actuales no completan sus requisitos de ubicación. Los eventos históricos se conservan con sus fechas reales y no se presentan como próximos.

- [Guía de eventos de Google](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Event en Schema.org](https://schema.org/Event)
- [VirtualLocation en Schema.org](https://schema.org/VirtualLocation)
- [Schema Markup Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)

Revisar de nuevo las guías al retomar, porque pueden cambiar. No desplegar ni hacer push como parte de las comprobaciones locales.
