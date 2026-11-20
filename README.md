# GerardoACR.github.io

Portafolio personal de Gerardo Antonio Corral Ruiz en inglés, español e italiano.

## Dónde editar los textos

| Idioma | Página y elementos fijos | Tarjetas de Habilidades y del carrusel |
| --- | --- | --- |
| Español | [index-es.html](index-es.html) | [content.es.js](assets/data/content.es.js) |
| Inglés | [index.html](index.html) | [content.en.js](assets/data/content.en.js) |
| Italiano | [index-it.html](index-it.html) | [content.it.js](assets/data/content.it.js) |

### Portada, biografía y proyectos destacados

Abre el HTML del idioma que quieras editar. Puedes buscar una frase tal como se ve en pantalla o buscar estas marcas:

| Elemento | Qué buscar en el HTML |
| --- | --- |
| Título de la pestaña y descripción del sitio | `<title>` y `name="description"` |
| Nombre de la cabecera, menú y selector de idioma | `site-header`, `primary-navigation` y `lang-group` |
| Saludo, presentación, ubicación, botones y redes | `class="hero"` |
| Saludo sobre la foto, descripción y enlace de contacto | `media-card-body` |
| Sobre mí y video de presentación | `id="about"` |
| Encabezados de Habilidades y nota de la maestría | `id="skills"` y `section-note` |
| Introducción a Proyectos, tesis, enlace al PDF y pie de figura | `id="projects"`, `thesis-feature` y `<figcaption>` |
| Encabezado del carrusel, palabra «Proyecto» y controles | `archive-title`, `data-project-label` y `carousel-arrow` |
| Cortos, títulos, premios, créditos, miniaturas y enlaces | `film-selection` y `film-card` |
| Invitación a colaborar, contactos y pie de página | `id="contact"` y `footer-meta` |

En los enlaces, el texto entre `<a>` y `</a>` es lo que lee el visitante y `href` indica el destino. Las descripciones de imágenes se editan en `alt` y los nombres accesibles de botones o enlaces en `aria-label`. Si sustituyes el PDF de la tesis, actualiza también el tamaño que aparece en el enlace de cada HTML. Si sustituyes un corto, actualiza sus enlaces de YouTube y el identificador `data-film-id` del reproductor.

### Tarjetas de Habilidades y del carrusel

Abre el archivo `content` del idioma correspondiente. Cada tarjeta está entre llaves. Conserva las comillas y las comas que separan los campos y las tarjetas.

- En `portfolioSkills`, edita `name` (nombre), `level` (nivel) y `description` (detalle opcional). `group` coloca la tarjeta en `science`, `other` o `languages`. Por ejemplo, para cambiar el nivel de Blender en italiano, busca `"name": "Blender"` en `content.it.js` y modifica el campo `level` de esa tarjeta.
- En `portfolioProjects`, edita `title`, `description`, `cta` (texto del enlace) y `href` (destino). Cuando una tarjeta tiene varios enlaces, están en la lista `links`. El orden de las tarjetas en esta lista de proyectos es el orden del carrusel.
- Al final del título del proyecto, escribe `[ENG]`, `[ESP]` o `[ITA]` según el idioma de la obra. Un proyecto con documentación en inglés y cuadernos en italiano puede llevar `[ENG] [ITA]`. La etiqueta se conserva al traducir el título. En la tesis y los cortos se edita en el HTML.
- Para añadir una tarjeta en los tres idiomas, copia una del mismo tipo en cada archivo de contenido y traduce sus campos visibles. Guarda y recarga la página. Puedes comprobar cada versión abriendo su HTML con doble clic.

### Imágenes, documentos y aspecto visual

| Recurso | Ubicación |
| --- | --- |
| Foto, logotipo, figura de la tesis y miniaturas | `assets/images/` |
| PDF del CV | `assets/resume/Gerardo-Corral-Resume.pdf` |
| Tesis y artículos en PDF | `assets/documents/` |
| Video de presentación y modelo 3D | `assets/video/` y `assets/models/` |
| Tipografía, colores, espacios y diseño adaptable | [style.css](assets/css/style.css) |
| Comportamiento del carrusel, los reproductores y las partículas | [main.js](assets/js/main.js) |
