# tomasrau.ar — guía de proyecto

Sitio personal de Tomás Rau (economista, Business Intelligence, analítica financiera). Astro 6 + Tailwind CSS v4, deploy estático a GitHub Pages (dominio `tomasrau.ar`).

## Design system — fuente de verdad

Toda decisión visual (color, tipografía, espaciado, componentes, uso del logo) se rige por:

- `src/assets/media/design_system/design-system-tomas-rau.md` — especificación técnica completa, autocontenida. **Leer antes de tocar cualquier estilo.**
- `src/assets/media/design_system/Catálogo de marca.dc.html` — versión navegable/visual del mismo sistema, útil para ver los componentes renderizados.

Esta carpeta está en `.gitignore` a propósito: el repo es público y ese material de marca no es necesario para que el sitio funcione. Existe localmente pero nunca se commitea.

**Principio rector:** lógica cromática cerrada — monocromo en escala verde petróleo, con dorado como acento quirúrgico (un solo uso por vista). Criterio de decisión ante cualquier ambigüedad: legibilidad en lectura extensa por sobre impacto visual.

### Reglas no negociables

- **Un solo dorado por vista.** `--accent` (`#75590C` claro / `#C9A227` oscuro) puede ser texto; `--accent-rule` (`#C9A227`) **nunca** es color de letra en modo claro (2.11:1 de contraste).
- **Sin sombra** fuera de `--shadow-float`, y sólo en elementos flotantes (menú, popover, tooltip). Tarjetas, tablas, botones, inputs y secciones van sin sombra.
- **Sin radio en contenedores.** Tarjeta, tabla, bloque, modal, imagen y sección van a esquina viva (`--radius-0`). Sólo botón/input/select/control (`--radius-2`) y tag/chip/badge/paginación (`--radius-1`) se redondean.
- **Prohibido:** gradientes, glassmorphism, iconos 3D, terminales de código decorativas, badges de "generado con IA", curvas Bézier en cualquier trazo, franjas cebra en tablas, colorear categorías (el tag seleccionado invierte, no colorea).
- **Tipografía por rol, sin zonas grises:** prosa/títulos → Newsreader (`--font-read`); interfaz (nav, botón, label, metadato) → Instrument Sans (`--font-ui`), nunca en párrafos; cifras/fórmulas/código → Spline Sans Mono (`--font-data`) con `tabular-nums`. Ninguna cifra se compone en Newsreader; ningún párrafo en Instrument Sans.
- **Foco visible en todo elemento enfocable**, sin excepción (`--focus-ring` + `--focus-offset`), y no reemplaza al hover.
- **Un solo botón primario por vista.**
- Motivo gráfico del isotipo (nodo, viñeta, trama, marca de agua) es el único vocabulario decorativo permitido, y la trama de fondo sólo va en hero/portada/banner — nunca detrás de texto de lectura ni de tarjetas.

### Desviación deliberada respecto al documento

El doc especifica que el modo oscuro es sólo un "registro de énfasis" reservado a hero/portadas/LinkedIn (§2.4), con el resto del sitio siempre en claro. **En este sitio se decidió conservar el toggle claro/oscuro para todo el sitio** (decisión explícita del usuario), incluido el hero, que sigue el estado global del toggle en vez de quedar fijo en oscuro. Ambos modos usan siempre el bloque de tokens correspondiente (`:root`/`[data-theme="light"]` o `[data-theme="dark"]`) — nunca se mezclan tokens de un modo con el otro.

### Adaptaciones de layout

El documento está pensado para un sitio de investigación con artículos largos (columna de lectura 680px + columna de márgenes 268px para notas/fuentes, §2.7). Este sitio es una landing de una página con secciones cortas de marketing/portfolio, no artículos largos — **no se fuerza el layout de dos columnas de investigación**. Sí se usan sus tokens de grid (`--grid-max`, `--page-margin`, `--gutter`), espaciado de componentes (`--space-*`) y ritmo vertical de prosa (`--flow-*`).

### Checklist antes de dar por cerrada una vista (§7 del doc)

- [ ] Un solo uso del dorado.
- [ ] Un solo botón primario.
- [ ] Ningún texto en `--border-strong` ni en `--accent-rule`.
- [ ] Todo elemento enfocable tiene anillo visible al llegar por Tab.
- [ ] Toda tabla y todo gráfico llevan línea de fuente.
- [ ] Ninguna curva Bézier en ningún trazo.
- [ ] Prosa dentro de 62–72 caracteres por línea.
- [ ] Ninguna cifra compuesta en Newsreader; ningún párrafo en Instrument Sans.
- [ ] Ninguna sombra fuera de elementos flotantes.
- [ ] La trama de nodos no está detrás de texto de lectura.

### Pendientes opcionales (no bloqueantes)

- Self-hosting de las tres tipografías variables (§4.2 del doc) en vez de Google Fonts CDN — mejora de performance, no crítica.
- No existen `isotipo-positivo.svg`/`isotipo-negativo.svg` en el repo; se usan los PNG recortados existentes en `src/assets/media/logos/`. Si en algún momento se generan versiones SVG, reemplazar ahí.
