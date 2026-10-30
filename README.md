# Portafolio — Eudy Joel Reyes

Sitio personal de **Eudy Joel Reyes**, backend developer en Santo Domingo, República Dominicana.
Está construido como sitio estático (HTML, CSS y JavaScript sin dependencias ni build) y está listo para publicarse en GitHub Pages, Netlify o cualquier hosting estático.

## Qué incluye

- **Hero** con presentación, estado de disponibilidad y una terminal con el resumen del perfil.
- **Proyectos reales** extraídos de GitHub, con descripción, stack y enlace a cada repositorio.
- **Sobre mí**, principios de trabajo y trayectoria.
- **Stack** agrupado por área (backend, datos, testing, seguridad, automatización y entorno).
- **Contacto** con LinkedIn, GitHub y X.
- **Tema claro y oscuro** con preferencia guardada en el navegador.
- Diseño responsive, navegación móvil, foco visible, `prefers-reduced-motion` y contraste verificado.

No hay frameworks, dependencias de npm ni proceso de compilación.

## Estructura

```
.
├── index.html              # Todo el contenido del sitio
├── assets/
│   ├── css/styles.css      # Design system, layout, temas y responsive
│   ├── js/main.js          # Tema, menú, scroll, reveal y navegación activa
│   ├── img/avatar.jpg      # Foto de perfil (avatar de GitHub)
│   └── favicon.svg         # Favicon con monograma JR
└── README.md
```

## Ver el sitio localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 4173
```

Abre `http://localhost:4173`.

También puedes abrir `index.html` directamente, aunque un servidor local reproduce mejor el comportamiento de un hosting real.

## Publicarlo en GitHub Pages

### Opción A — Sitio de usuario (`https://joel-rd.github.io`)

1. Crea un repositorio llamado exactamente `Joel-RD.github.io`.
2. Sube el contenido de esta carpeta a la rama `main`.
3. En **Settings → Pages**, selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.
4. Guarda y espera unos minutos.

### Opción B — Sitio de proyecto (`https://joel-rd.github.io/my-web-site`)

1. Sube el proyecto a un repositorio (por ejemplo `my-web-site`).
2. En **Settings → Pages**, selecciona la rama `main` y la carpeta `/ (root)`.
3. Las rutas del sitio son relativas, así que funcionará igual en una subcarpeta.

## Qué editar antes de publicar

| Qué | Dónde |
|---|---|
| Textos, proyectos y enlaces | `index.html` |
| Foto de perfil | Reemplaza `assets/img/avatar.jpg` (cuadrada, idealmente 800×800) |
| Colores, tipografías y espaciado | Variables al inicio de `assets/css/styles.css` |
| Metadatos para redes sociales | Etiquetas `og:*` y `twitter:*` en el `<head>` |
| Año del pie de página | Se actualiza automáticamente con JavaScript |

### Añadir un email de contacto

El perfil público de GitHub no expone un email, por eso el contacto principal es LinkedIn. Si quieres añadirlo:

1. En `index.html`, agrega un cuarto enlace en `.contact__grid`:

```html
<a class="contact-link" href="mailto:tu-correo@dominio.com">
  <span class="contact-link__icon" aria-hidden="true"><svg><use href="#icon-mail"/></svg></span>
  <span class="contact-link__body">
    <span class="contact-link__label">Correo</span>
    <span class="contact-link__value">tu-correo@dominio.com</span>
  </span>
  <svg class="contact-link__arrow" aria-hidden="true"><use href="#icon-arrow-up-right"/></svg>
</a>
```

2. Actualiza el JSON-LD del `<head>` si quieres incluir el dato estructurado.

## Notas sobre el contenido

- Los proyectos y el stack se obtuvieron de los repositorios públicos de [Joel-RD](https://github.com/Joel-RD) y de sus README, revisados en octubre de 2026.
- Las pruebas técnicas están identificadas como tales; no se presentan como experiencia laboral.
- Las tarjetas incluyen diagramas SVG propios, no capturas de pantalla inventadas.
- Antes de publicar, revisa que la descripción de tu rol en GrupoRamos y las fechas de trayectoria sigan siendo correctas.

## Accesibilidad

- HTML semántico con `main`, secciones etiquetadas y jerarquía de encabezados.
- Enlace para saltar al contenido.
- Foco visible y navegación por teclado; menú móvil con `inert` en el fondo.
- Iconos decorativos ocultos para lectores de pantalla y enlaces sociales con nombre accesible.
- Contraste AA verificado en tema claro y oscuro (axe-core sin violaciones).
- Movimiento reducido: se desactivan animaciones y el marquee.

## Créditos

Diseñado y construido para **Eudy Joel Reyes**. Tipografías: Archivo, Space Grotesk y JetBrains Mono (Google Fonts).
