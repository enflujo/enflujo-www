# Archivo audiovisual — propuesta editorial y de implementación

Documento de trabajo, 7 de septiembre de 2026. Propone estructura y contenidos; no modifica Directus ni el sitio publicado.

## 1. Decisión principal

Organizar las líneas permanentes de EnFlujo bajo **Líneas de trabajo**, con índice `/lineas/` y páginas `/lineas/[slug]/`. Archivo audiovisual tendrá la URL `/lineas/archivo-audiovisual/`. Su descripción: **Investigación, herramientas y procesos para trabajar con archivos fílmicos y magnéticos.** Estas rutas son la propuesta actual; sustituyen las rutas de la primera versión del plan, que todavía no se implementaron.

La adaptación latinoamericana de Gugusse es una investigación destacada dentro de esta línea. La página debe mostrar también inspección, catalogación, digitalización y postproducción, y explicar cómo se conectan.

La estructura editorial distingue tres escalas:

- **Línea de trabajo:** propósito, método, capacidades, equipo y formas de participar; se actualiza de manera continua.
- **Investigaciones y proyectos:** adaptación de Gugusse, trabajo con una colección o desarrollo de una herramienta; pueden tener hitos y resultados propios.
- **Bitácora:** pruebas, decisiones, hallazgos, documentación y avances fechados.

El usuario confirma que esta estructura debe servir también para Visualización de datos, Artes electrónicas y otras líneas. Crear un índice de Líneas de trabajo que muestre solo registros publicados; preparar las demás líneas como borradores hasta disponer de contenido. Archivo audiovisual puede tener un destacado propio en el inicio mientras crece la sección.

Los proyectos constituyen el cruce entre líneas mediante una relación muchos a muchos. En una página de proyecto se muestran sus líneas; en cada línea, sus proyectos relacionados. Una sección «Cruces con otras líneas» puede derivarse de los proyectos publicados compartidos, indicando qué proyecto produce cada conexión. No mantener otra relación manual entre líneas que duplique esa información. Los ejemplos de cruces deberán verificarse antes de asignarse a proyectos reales.

Hay una cuarta escala ya existente: **el registro de materiales audiovisuales**. El usuario tiene la colección `archivo_audiovisual` en Directus para videos y películas que ingresan al laboratorio. Empieza por el ingreso y evolucionará hacia la descripción del objeto y el registro de procesos. Conservar esa colección y revisar su esquema antes de proponer ampliaciones.

## 2. Lo que ya permite el sitio

Revisado en el repositorio:

- Astro obtiene contenido de Directus por GraphQL durante la construcción del sitio.
- `paginas` aporta metadatos y las entradas publicadas del menú. Cada ruta necesita además su implementación en Astro.
- `proyectos` ya incluye título, descripción, contenido Markdown, imagen, fechas, repositorios, colegas y temas. Hay relaciones existentes con equipo.
- La ficha actual asocia `fecha_publicacion` con proyecto terminado, tanto en la presentación como en los datos estructurados. Esa lógica no representa una línea permanente.
- La identidad usa la fuente EnFlujo, texto monoespaciado, color `#5757f7`, marcos, líneas y fotografía/video del espacio real.
- El contacto actual incluye el correo `enflujo@uniandes.edu.co`, además de mecanismos experimentales del laboratorio.

Se consultó por introspección el esquema público GraphQL de `archivo_audiovisual`, `proyectos` y `paginas`. No se consultaron registros de materiales. Esta revisión muestra los campos accesibles públicamente; no expone la configuración administrativa completa, interfaces, opciones de selección ni campos restringidos.

Hallazgos de la consulta:

- `archivo_audiovisual`: `id`, `orden`, `fecha_creacion`, `fecha_actualizacion`, `titulo`, `motivo` (JSON), `tipo_ingreso`, `observaciones`, `soporte`, `estado`, `slug`, `descripcion`, `imagen` (archivo), `fotos` (relación mediante `archivo_audiovisual_files`), `institucion`, `procedencia`, `persona_remitente` (listas de `colegas`) y `persona_recibe` (lista de `equipo`). Se omiten campos auxiliares `_func`.
- No aparece una relación con proyectos ni un historial de intervenciones en el tipo público consultado. No se infiere de ello que no existan campos privados.
- `proyectos` ya tiene relaciones con equipo, colegas y glosario. La relación nueva se consulta desde `lineas_trabajo.proyectos`, mediante `lineas_trabajo_proyectos`, con campos `lineas_trabajo_id` y `proyectos_id`; no se observó un campo inverso público en `proyectos`.
- `paginas` ya tiene `sort`: reutilizarlo para el orden de navegación; la consulta del menú deberá solicitar un orden explícito.
- `lineas_trabajo` fue creada por el usuario y se verificó en GraphQL público con sus campos básicos, `orden` y relación con proyectos.
- El significado y los valores posibles de `archivo_audiovisual.estado` siguen por confirmar. No asumir que describe publicación o conservación.

## 3. Recorrido de la página

| Orden | Bloque                                   | Qué debe resolver                                             | Material inicial                                                                           |
| ----- | ---------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1     | Archivo audiovisual                      | Qué hacemos y por qué es una línea permanente                 | Introducción breve, imagen del trabajo y enlace «Apoyar esta línea»                        |
| 2     | Trabajar con las imágenes y sus soportes | Por qué EnFlujo se ocupa de este campo y para quién trabaja   | Dos párrafos sobre contexto, acceso y autonomía técnica                                    |
| 3     | Del soporte al archivo digital           | Cómo se conectan los procesos                                 | Secuencia con inspección, catalogación, captura y postproducción; foto de mesa y caseteras |
| 4     | Construir las herramientas aquí          | Qué aporta la adaptación de Gugusse                           | Máquina funcionando, piezas, una modificación concreta y enlace a documentación            |
| 5     | Lo que podemos hacer hoy                 | Qué está disponible, qué se prueba y qué falta                | Capacidades verificadas por soporte y etapa                                                |
| 6     | Pruebas, procesos y archivos             | Evidencia del trabajo y continuidad                           | Hasta tres entradas recientes o casos documentados                                         |
| 7     | Lo que queremos hacer posible            | Para qué se necesita apoyo                                    | Dos o tres necesidades concretas, con resultado esperado                                   |
| 8     | Participar                               | Cómo aportar financiación, equipos, materiales o conocimiento | Acciones diferenciadas y contacto directo                                                  |
| 9     | Quiénes sostienen este trabajo           | Quién responde por el proceso                                 | Equipo, colaboradores, apoyos y fecha de actualización                                     |

La lectura inicial debe poder hacerse en un minuto; los detalles técnicos se amplían en investigaciones y bitácora. Un índice de anclas puede facilitar recorrer la página, especialmente cuando crezca.

### Borrador de apertura

> **Archivo audiovisual**
>
> Trabajamos con películas y cintas magnéticas, con las imágenes que guardan y con las máquinas que permiten volver a verlas. Esta línea de EnFlujo reúne inspección, catalogación, digitalización y postproducción, junto con la investigación y construcción de herramientas adaptadas a nuestro contexto.
>
> Estamos desarrollando una variación de Gugusse que pueda construirse con componentes disponibles localmente y admitir otras soluciones. Nos interesa que el proceso deje también conocimiento para mantener, adaptar y construir estas herramientas.

Revisar el texto contra las capacidades actuales antes de publicarlo. La fecha de inicio queda por confirmar. Mostrar «Línea permanente · Activa» y una fecha de actualización editorial real.

### El flujo completo

Representar una secuencia con dos caminos en la etapa de captura:

1. **Conocer el material:** procedencia, contexto y propósito del trabajo.
2. **Inspeccionar:** reconocer soporte, estado y condiciones de trabajo; preparación según el caso.
3. **Catalogar:** identificar las piezas y vincular descripción, soporte y archivos resultantes. La catalogación se enriquece durante todo el proceso.
4. **Digitalizar:** captura fotograma por fotograma de película o captura de video de soporte magnético, según el material. El usuario precisa que el proceso fílmico no se describe técnicamente como escaneo.
5. **Revisar y postproducir:** control de calidad y tratamientos documentados según el propósito de cada caso.
6. **Organizar la entrega y el acceso:** archivos, metadatos y copias de consulta según lo acordado.

Para cada etapa, explicar qué entra, qué se hace y qué queda. Confirmar el alcance real de almacenamiento, preservación a largo plazo y acceso público antes de ofrecerlos como capacidades. No equiparar automáticamente postproducción y restauración.

## 4. Cómo comunicar el valor propio

Presentar cualidades demostrables sin atribuir carencias a otros laboratorios:

| Apuesta                                           | Evidencia que conviene publicar                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Construcción y mantenimiento con recursos locales | Una pieza o componente sustituido: problema, alternativa, procedencia, costo y prueba realizada |
| Continuidad entre archivo y desarrollo técnico    | Un caso que conecte ficha de inspección, captura y resultado                                    |
| Conocimiento que puede circular                   | Guía, archivo de diseño, repositorio o registro de pruebas disponible                           |
| Atención al contexto de las imágenes              | Historia de una colección y participación de quienes la conservan                               |
| Investigación sostenida                           | Avances con fechas, límites encontrados y siguientes preguntas                                  |

El objetivo latinoamericano debe explicarse con decisiones concretas de disponibilidad, fabricación, reparación, documentación y costos. Identificar qué está probado en Bogotá y qué falta validar en otros lugares.

Gugusse tiene una documentación propia de construcción y operación: enlazar y acreditar el proyecto de origen, indicando qué versión sirve de base y cuáles son las contribuciones de EnFlujo. No trasladar las prestaciones anunciadas por el proyecto original a la variante local sin validarlas. Referencia: https://www.deniscarl.com/dokuwiki/doku.php

### Criterios editoriales derivados de la revisión de licencias

- Mantener diferenciados software, documentación y archivos de fabricación. La revisión identificó GPLv3 en el repositorio del software y un aviso CC BY-SA 4.0 en la wiki; el alcance para los archivos de fabricación queda por aclarar. No anunciar una licencia única para toda la variante.
- Identificar versión de origen, autoría, colaboradores y cambios propios en cada recurso publicado. La revisión del paquete de fabricación encontró también modificaciones atribuidas a Al Warner.
- Presentar el trabajo como una adaptación desarrollada por EnFlujo; no atribuir respaldo oficial sin acuerdo.
- Registrar fuente, licencia aplicable, créditos y modificaciones junto a los recursos técnicos. Verificar las condiciones de cada archivo antes de ofrecer descargas de adaptaciones.
- Tratar por separado los permisos del material audiovisual. La página de la línea no implica publicar los registros de ingreso, los archivos o sus imágenes.
- El protocolo y marco legal de recepción están en diseño, según confirma el usuario. Los contenidos públicos deben expresar ese estado y describir únicamente procedimientos ya acordados.

Fuentes de la revisión: [software original](https://github.com/meantux/GugusseRoller), [wiki](https://www.deniscarl.com/dokuwiki/doku.php), [archivos de fabricación](https://www.deniscarl.com/dokuwiki/doku.php?id=list_of_materials). Esta síntesis conserva los hallazgos preliminares de la conversación; no sustituye la revisión de los archivos efectivamente utilizados.

## 5. Dirección visual y fotografías

Conservar tipografía, color y marcos del sitio. Dar importancia mediante el espacio, la jerarquía de lectura y la presencia de imágenes del trabajo. Alternar texto breve, fotografía amplia y notas de proceso. Evitar que toda la página sea una sucesión de tarjetas idénticas.

- Portada con foto del espacio que permita reconocer la amplitud del trabajo. Si aún no existe una toma adecuada, usar una foto de la máquina y colocar la mesa y los equipos magnéticos inmediatamente después.
- Flujo de trabajo legible como secuencia vertical en móvil; texto completo disponible sin depender de interacción.
- Investigación de Gugusse con imagen amplia y detalles de piezas; pies de foto que expliquen decisiones.
- Bitácora con fecha, título y extracto; puede reutilizar el lenguaje visual de las tarjetas existentes.
- Video corto de funcionamiento con controles, imagen de portada y carga diferida. Priorizar su utilidad para entender el movimiento.
- Necesidades presentadas con el mismo lenguaje editorial y enlaces claros.

Se revisaron visualmente tres imágenes de `C:/Users/enflujo/Nextcloud/Digitaluizadora EnFlujo`:

| Archivo                                      | Uso propuesto                                                                  | Trabajo editorial pendiente                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `Primer montaje completo digitalizadora.jpg` | Relato de construcción: máquina y fotograma en pantalla dentro del laboratorio | Confirmar fecha e hito; conservar contexto y revisar encuadre |
| `Detalle- digitalizando pelìcula 9.5mm.jpg`  | Detalle del transporte de película                                             | Confirmar soporte y describir qué muestra la prueba           |
| `20251203_171000240_iOS.jpg`                 | Piezas rotuladas Super8, útiles para hablar de fabricación y variantes         | Identificar pieza, función, autoría y modificación concreta   |

La carpeta contiene más fotos y videos aún sin revisar. No se ha hecho una selección exhaustiva. Falta ubicar las fotos de la mesa de inspección y las caseteras mencionadas por el usuario.

Selección inicial sugerida: una foto general, dos del flujo de archivo, dos de construcción, un detalle y un video breve. Cada archivo necesita crédito, fecha confirmada cuando se conozca, pie de foto, texto alternativo y contexto de publicación.

## 6. Modelo propuesto en Directus

Usar colecciones con significado editorial; mantener en Astro el diseño de la página. No hace falta construir un editor universal de bloques.

### `lineas_trabajo` — nueva colección

Primer registro a desarrollar: Archivo audiovisual. Visualización de datos y Artes electrónicas se contemplan en el modelo general y pueden prepararse como borradores.

| Campos                                                     | Tipo o relación                                          | Uso                                                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `id`, `titulo`, `slug`                                     | Identificador y textos; slug único                       | Identidad estable                                                                                    |
| `estado`                                                   | Borrador / publicado / archivado                         | Publicación editorial                                                                                |
| `situacion`                                                | Activa / en pausa                                        | Situación real de la línea, independiente de su publicación                                          |
| `descripcion`, `introduccion`                              | Texto corto y Markdown                                   | SEO y apertura                                                                                       |
| `proposito`, `metodologia`, `capacidades`, `participacion` | Markdown por sección                                     | Primera versión editable sin HTML de diseño                                                          |
| `fecha_inicio`, `fecha_revision`                           | Fechas                                                   | Inicio y revisión editorial; sin fecha de cierre obligatoria                                         |
| `imagen`, `video_portada`                                  | Archivos, video opcional                                 | Portada                                                                                              |
| `medios`                                                   | Relación múltiple con archivos mediante tabla intermedia | Orden, sección, pie y texto alternativo por uso                                                      |
| `equipo`, `colegas`                                        | Relaciones con colecciones existentes                    | Responsables y colaboradores                                                                         |
| `proyecto_destacado`                                       | Relación con`proyectos`                                  | Un proyecto relacionado que se destaca en la línea; en Archivo audiovisual, la adaptación de Gugusse |
| `contacto_email`                                           | Texto                                                    | Destino explícito de las acciones                                                                    |

En `proyectos`, agregar relación opcional múltiple `lineas_trabajo`, para que un proyecto pueda participar en varias líneas. Reutilizar las relaciones existentes donde sea posible y evitar duplicarlas. La línea consulta sus proyectos relacionados.

### `entradas_linea` — nueva colección

Campos: `id`, `linea` (relación), `proyecto` (opcional), `estado`, `titulo`, `slug`, `tipo` (avance / caso / prueba / guía), `fecha_publicacion`, `resumen`, `contenido` (Markdown), `imagen`, `medios` y `autores`.

Todas las entradas tendrán el mismo formato básico. Las guías pueden enlazar documentación técnica que se mantenga en repositorios. Las primeras entradas deben partir de hitos confirmados; no inferir fechas de realización a partir del nombre de un archivo.

### `necesidades_linea` — nueva colección

Campos: `id`, `linea`, `estado` editorial, `situacion` (abierta / cubierta / pausada), `titulo`, `tipo` (financiación / equipo / material / colaboración), `descripcion`, `para_que`, `prioridad`, `especificaciones`, `monto_estimado` y `moneda` opcionales, `fecha_revision`, `orden`.

Cada necesidad explica qué se busca, para qué sirve y qué resultado permitiría. Los importes solo se publican cuando haya un presupuesto. Una necesidad cubierta deja de figurar como solicitud activa.

### Reutilizar `paginas`

Crear un registro con título «Líneas de trabajo» y slug `lineas` para la navegación. La colección de líneas conserva el contenido de cada página. Revisar los campos obligatorios en administración y usar `paginas.sort` para ubicar esta entrada junto a Proyectos. No crear un registro de menú por cada línea.

El menú actual lista todas las páginas publicadas. Mantener el registro en borrador hasta que la ruta esté lista. Agregar esta entrada no genera por sí mismo la página.

### Primera carga

Un registro de línea, uno de navegación, un proyecto destacado, hasta tres entradas basadas en evidencia y dos o tres necesidades reales. Si faltan entradas documentadas, omitir temporalmente ese bloque en la web. No publicar ejemplos de relleno.

### Colección existente de archivo audiovisual

Directus cumple dos funciones en este proyecto: CMS editorial y registro del trabajo sobre materiales audiovisuales. La colección existente conserva los objetos y sus datos de ingreso; `lineas_trabajo` describe el área de trabajo públicamente. No duplicar objetos en la colección editorial.

Antes de alterar el registro existente, revisar campos, identificadores, relaciones y permisos. La ampliación hacia descripción del objeto e historial de procesos se diseñará con el protocolo. No imponer ahora estados técnicos, formularios legales ni una estructura definitiva de intervenciones.

Si se necesita relacionar materiales con proyectos, definirlo después de revisar el esquema y la cardinalidad real. Un caso editorial puede referenciar internamente los materiales que documenta, pero mostrará únicamente texto y medios seleccionados para publicación. No consultar automáticamente los registros de ingreso desde el sitio ni ampliar su acceso público para construir esta página.

## 7. Participar y apoyar

Ofrecer cuatro entradas diferenciadas:

| Acción                        | Información inicial que facilita responder                | Respuesta esperada del laboratorio                             |
| ----------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Apoyar esta línea             | Interés en financiar una necesidad o una etapa            | Conversación y propuesta con alcance, presupuesto y resultados |
| Ofrecer equipos o repuestos   | Modelo, estado, ubicación y fotos disponibles             | Evaluar utilidad y coordinar recepción si procede              |
| Conversar sobre un archivo    | Soportes, cantidad aproximada, ubicación y propósito      | Evaluar el caso y acordar cómo trabajar con el material        |
| Colaborar en la investigación | Conocimiento, herramienta o proceso que se quiere aportar | Contacto con el frente correspondiente                         |

Para la primera versión bastan enlaces de correo con asuntos distintos; sin backend nuevo. Confirmar si el correo existente es el apropiado. Hacer visible este contacto desde la propia línea.

La ruta para materiales debe distinguir la oferta de una donación, un préstamo o un encargo de digitalización. El primer contacto permite definirlo sin anunciar una capacidad ilimitada de recepción. Si se pretende recibir dinero directamente, definir primero el mecanismo institucional disponible; mientras tanto usar «Conversar sobre un apoyo».

Propuesta de cierre: «Esta línea crece con tiempo de investigación, herramientas y archivos con los cuales trabajar. Conoce lo que estamos buscando y conversemos sobre cómo participar».

## 8. Plan de ejecución

1. **Revisar y cerrar el modelo:** incorporar Líneas de trabajo como estructura transversal; inspeccionar el esquema existente de Directus, incluidos proyectos y archivo audiovisual; definir las relaciones sin duplicar el registro de materiales. Después confirmar soportes, capacidades, prioridades de apoyo y responsables para redactar los contenidos.
2. **Preparar contenido:** cerrar introducción y método; seleccionar imágenes; documentar una adaptación y un caso o prueba; redactar necesidades con resultados verificables.
3. **Configurar Directus:** revisar esquema existente, crear campos y relaciones necesarios, cargar borradores y configurar lectura pública solo de contenido publicado y medios destinados a publicación.
4. **Implementar Astro:** crear `/lineas/`, `/lineas/[slug]/` y `/lineas/[slug]/bitacora/[entrada]/`, consultar colecciones y relaciones, reutilizar la plantilla general, incorporar índice, flujo, imágenes, entradas y acciones de contacto. La plantilla compartida tendrá secciones opcionales para servir a distintas líneas.
5. **Dar visibilidad:** añadir enlace en navegación, un destacado estable en inicio y una referencia desde Proyectos. La presencia de la línea no depende de su posición cronológica.
6. **Revisar y publicar:** comprobar contenido, estados, enlaces, accesibilidad, móvil, imágenes y metadatos. Ejecutar las comprobaciones del repositorio y la construcción. Publicar la entrada del menú coordinadamente con la nueva ruta y el despliegue.
7. **Mantener:** asignar responsable editorial; publicar por hitos y revisar capacidades y solicitudes, por ejemplo trimestralmente. Registrar apoyos recibidos y qué permitieron hacer.

La plantilla de línea debe expresar «Activa» independientemente de su fecha de publicación. Para la investigación Gugusse, separar también publicación y situación del trabajo si se usa la ficha de proyecto existente; su estado no debería pasar a terminado automáticamente al asignarle una fecha pública.

La implementación debe conservar URL canónica, descripción social, imagen y datos estructurados coherentes con la nueva página, sin introducir un estado de finalización falso.

## 9. Criterios de una primera versión completa

- Una persona nueva entiende que el trabajo abarca película y magnético, investigación y práctica de archivo.
- Gugusse tiene protagonismo y una explicación accesible de su vínculo con el conjunto.
- Se distingue entre capacidades disponibles, pruebas en curso y objetivos futuros.
- Cada afirmación diferencial tiene una evidencia o está presentada como propósito.
- Hay una vía directa para ofrecer apoyo, equipos o materiales, con necesidades concretas.
- La navegación lleva a una página válida y la línea permanece visible aunque haya proyectos más recientes.
- Actualizar bitácora o necesidades requiere editar contenido, sin modificar la estructura de la página.

## 10. Datos pendientes para cerrar los textos

- Precisar variantes de Betacam buscadas y condiciones de captura magnética según cada caso; capacidades principales ya confirmadas.
- Nombre de la variante, versión de Gugusse de partida y cambios propios documentables.
- Ubicación de fotos de mesa de inspección y caseteras; créditos de los medios.
- Casos que puedan mostrarse, equipo participante y fecha de inicio de la línea.
- Alcance de recepción de material, entrega, almacenamiento y acceso.
- Configuración administrativa de `archivo_audiovisual`: significado de `estado`, opciones de ingreso y soporte, relaciones y campos no expuestos públicamente. El nombre técnico y el esquema público ya se verificaron.

Estos pendientes no impiden definir la arquitectura; sí determinan las afirmaciones que se publicarán.

## 11. Avance de configuración

- El usuario configura directamente Directus; el asistente consulta el esquema público y trabaja en el repositorio.
- Colección `lineas_trabajo` creada con campos básicos y `orden`. Se explicó cómo usar ordenación mediante arrastre.
- Relación `lineas_trabajo.proyectos` creada mediante `lineas_trabajo_proyectos`.
- Registro inicial verificado: ID `1`, título «Archivo audiovisual», slug `archivo-audiovisual`, estado `publicado`. Aunque se había propuesto borrador, la consulta confirma que está publicado en la API. La ruta web aún no está implementada.
- La consulta pública filtrada por `estado = borrador` devuelve una lista vacía. Sin un borrador conocido, esto no prueba por sí solo la configuración de permisos.
- Se verificaron en GraphQL público los cuatro campos de texto `proposito`, `metodologia`, `capacidades` y `participacion`, creados por el usuario.
- Contenido inicial de introducción, propósito, metodología, capacidades y participación cargado por el usuario y verificado en GraphQL. El protocolo y marco legal siguen en diseño.
- Capacidades confirmadas por el usuario: película de 8 mm, Super 8, 9,5 mm (Pathé Baby), 16 mm y 35 mm; digitalización a 4K, RAW de 12 bits, secuencia de imágenes. Magnético: U-matic, VHS y Betamax, con Blackmagic Design Intensity Pro 4K; Apple ProRes como formato previsto y configuración según el caso. No atribuir captura 4K al magnético por el nombre del equipo.
- Apoyos definidos: horas de trabajo, materiales para experimentos, donaciones y colaboración institucional mediante conocimientos, recursos, financiación, equipos y acceso a archivos. Los servicios de digitalización a precios accesibles contribuyen a financiar horas y materiales. Se solicita un reproductor Betacam; variantes y modelos por precisar.
- La línea aún no tiene imagen ni proyectos relacionados. No se encontró la investigación de la digitalizadora entre los proyectos publicados consultados; podría existir un borrador no visible públicamente.
- Siguiente paso editorial propuesto: preparar la ficha de la investigación de la digitalizadora y vincularla a la línea, reutilizando un borrador si existe. Después seleccionar la imagen de portada.
