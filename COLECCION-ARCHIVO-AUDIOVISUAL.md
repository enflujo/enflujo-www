# Colección de Archivo Audiovisual

Actualización: 16 de septiembre de 2026.

## Página y fichas

`/archivo-audiovisual/` abre en vista de lista, también sin JavaScript. Permite cambiar a galería y combinar búsqueda con filtros de soporte, procedencia, institución y motivo del ingreso. La búsqueda incluye título, identificador, descripción y los metadatos de los filtros; ignora tildes y mayúsculas. Imagen, título y código enlazan a `/archivo-audiovisual/[slug]/`. Se conservan las anclas antiguas para volver al material desde su ficha.

Las fichas incluyen título, descripción, soporte, tipo y motivo de ingreso, institución, procedencia, remitentes, receptores, observaciones, imagen principal y archivos relacionados, además de las fechas de creación y actualización del registro. Las fechas describen el registro, no la producción de la película. Se conservan el HTML editorial de observaciones y las entidades acentuadas. Las imágenes se muestran completas y enlazan al original; los archivos de video y audio tienen controles nativos. Los medios duplicados se muestran una sola vez.

La consulta pública actual no expone campos técnicos adicionales ni una relación específica de inspecciones. La ficha muestra lo disponible, sin inventar esos metadatos. Los campos administrativos de publicación, orden y slug no se presentan como descripción del material.

El índice y las fichas usan REST con campos explícitos para compartir los datos de procedencia e institución. `institucion` y `procedencia` están declarados como String en el GraphQL público, pero devuelven listas de relaciones y provocan errores internos. REST permite resolver sus relaciones con `colegas` y mostrar sus nombres. Esto evita modificar el esquema de Directus para construir el sitio.

Ambas consultas paginan e incluyen solo `estado: publicado`. Las fichas solicitan también todas las relaciones de medios y personas. Los contenidos se actualizan al construir y desplegar, como el resto del sitio. Hay enlaces de ida y vuelta con `/lineas/archivo-audiovisual/`.

## Identificador de Directus

Directus genera y almacena el código definitivo en `identificador`. El frontend consulta ese campo por REST y lo muestra tal como llega, sin prefijos, relleno con ceros ni cálculos basados en el ID. Se usa en lista, galería, búsqueda, encabezado de ficha y título de página. Si falta, se muestra «Sin identificador», sin inventar un código alternativo.

Las rutas públicas usan el `slug` de Directus: `/archivo-audiovisual/[slug]/`. El ID interno solo se usa para las anclas de retorno y la identificación interna de los elementos. El build comprueba que los slugs estén presentes, sean válidos y no estén duplicados. El sitio ya no consulta `numero_catalogo` ni realiza introspección para detectar ese campo.

La propuesta SQL anterior para `numero_catalogo` quedó obsoleta y no debe ejecutarse: el sistema de identificación ya está resuelto en Directus. No se modificaron datos ni configuración del CMS desde el frontend.

## Filtros y orden

Los filtros se combinan entre categorías. Los materiales con varios motivos o procedencias aparecen al seleccionar cualquiera de sus valores. Las opciones muestran cantidades recalculadas según la búsqueda y los otros filtros, ignorando su propio filtro para permitir explorar alternativas. Las opciones sin coincidencias se deshabilitan, conservando cualquier selección activa para poder retirarla.

Cada filtro activo se puede quitar individualmente; «Limpiar filtros» elimina búsqueda y filtros sin alterar orden ni vista. Las opciones de orden son identificador (orden natural numérico), título A–Z y fecha de creación del registro descendente. Esta última no representa la fecha de producción de la película.

La URL conserva `q`, `soporte`, `procedencia`, `institucion`, `motivo`, `orden` y `vista`. Se puede copiar para compartir o recargar la selección. Los parámetros se restauran al volver con la navegación del navegador. Los valores de filtros desconocidos en un enlace se conservan con cero resultados, en lugar de ampliar silenciosamente la búsqueda. Sin JavaScript se muestra la lista completa y se ocultan los controles.

Pruebas de búsqueda, cruce de categorías, cantidades, valores faltantes y orden: `node --test tests/filtrosArchivo.test.mjs` (Node 24).

## Tarjeta imprimible de devolución

Cada ficha incluye un botón «Imprimir ficha con QR» y una vista de la tarjeta al final del registro. La tarjeta contiene el logo del laboratorio, «Laboratorio EnFlujo», identificador de Directus, título del material, QR y URL escrita.

Al imprimir se oculta el resto de la página. El ancho de la tarjeta es 140 mm, con altura adaptable al contenido, y el QR mide 38 mm. Usar escala 100 % y desactivar los encabezados/pies automáticos del navegador. La opción Guardar como PDF de la ventana de impresión permite conservarla como archivo.

El QR se genera localmente durante el build con `qrcode`, corrección Q, margen blanco de cuatro módulos y PNG de 768 píxeles. No utiliza servicios externos. La URL usa `Astro.site` y el slug de Directus de la ficha, por lo que apunta a `https://enflujo.com/archivo-audiovisual/[slug]/` incluso al imprimir desde desarrollo local. Las rutas deben estar desplegadas para que las personas puedan abrirlas al escanear.

Verificación: build completo sin errores ni advertencias de Astro; los ocho PNG generados se decodificaron con OpenCV y coincidieron con sus URLs escritas y sus slugs. No se verificó la vista previa de impresión porque no había navegador conectado.

Los enlaces del índice, la URL canónica de la ficha, el QR y el enlace impreso usan el mismo slug. Una vez entregadas las tarjetas, conservar ese slug o configurar una redirección si se cambia, para que los QR impresos sigan funcionando.

## Descarga como imagen

Junto a «Imprimir ficha con QR» se añadió «Descargar como imagen». Genera un PNG de la tarjeta completa, con nombre `ficha-[identificador].png`. La conversión se hace en el navegador con `html-to-image`, cargado únicamente al pulsar el botón, sin enviar contenido a servicios externos.

La exportación usa una copia temporal con el ancho de impresión de 140 mm, fondo blanco y resolución ampliada (factor 300/96). Mantiene las dos columnas de la tarjeta aunque se descargue desde una pantalla móvil. Espera a que el QR esté cargado y retira la copia temporal al finalizar. El botón indica el estado de la descarga, evita solicitudes simultáneas y permite reintentar si ocurre un error.

La compilación y los tipos se verifican localmente. La descarga interactiva requiere una comprobación en navegador; no había navegador conectado en esta sesión.
