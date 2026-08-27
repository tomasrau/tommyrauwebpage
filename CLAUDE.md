# tomasrau.ar — guía de proyecto

Sitio personal de Tomás Rau (economista, Business Intelligence, analítica financiera). Astro 6 + Tailwind CSS v4, deploy estático a GitHub Pages (dominio `tomasrau.ar`).

## Entorno de desarrollo — conda, no el Node del sistema

**Toda orden de `node`/`npm`/`npx` va dentro del entorno de conda `tommyrauwebpage`.** No hay Node moderno en el `PATH` del sistema: lo único que aparece ahí es `/opt/homebrew/opt/heroku-node/bin/node` (v14.19.0), que Astro 6 no soporta, y `npm` directamente no está. Si una sesión corre `npm run build` sin activar el entorno, el error es `command not found: npm` — **no falta instalar nada, falta activar el entorno.**

Como el shell de la herramienta Bash no conserva estado entre llamadas, el `source` + `conda activate` va **en la misma línea** que el comando, cada vez:

```bash
source /Users/tomasrau/miniconda3/etc/profile.d/conda.sh && conda activate tommyrauwebpage && cd "/Users/tomasrau/Storage/03 desarrollos/tommyrauwebpage" && npm run build
```

Verificado el 2026-08-23 dentro del entorno: `node v22.22.2`, `npm 10.9.7` (`package.json` exige `node >=22.12.0`). Scripts disponibles: `dev`, `build`, `preview`, `astro`.

**El conteo de páginas del build varía con el contenido, no es un número fijo a memorizar.** Llegó a 16 cuando `research`/`work` tenían entradas de ejemplo; al día de hoy (2026-08-24), con la sección Trabajo retirada entera y las notas de ejemplo de Research eliminadas (ver "Fase actual" abajo), el build produce sólo 2 páginas (`/` y `/en/`) — es el número correcto para el estado actual, no una regresión. Va a volver a crecer cuando se agreguen notas de Research reales.

## Git y deploy — `main` es la branch de producción

`.github/workflows/deploy.yml` despliega a GitHub Pages **con `on: push: branches: [main]`** (más `workflow_dispatch` manual). O sea: **el commit local no despliega nada — el `push` sí.** Es la distinción que gobierna todo lo de abajo, y conviene no confundirla porque cambia qué es riesgoso y qué no.

**Decisión del usuario (2026-08-23): no publicar hasta tener un MVP con la estructura cerrada.** Se sigue iterando el diseño sobre el working tree; recién cuando la estructura esté clara se publica. Reglas que se derivan de eso:

- **Nunca `git push` sin pedirlo explícitamente.** Un push a `main` es un deploy a `tomasrau.ar` — es la acción irreversible de este repo, y hoy el sitio no está listo para mostrarse.
- **Commitear localmente sí es seguro** y no publica nada. Si el usuario quiere checkpoints del trabajo de diseño sin publicar, esa es la vía: commits en local (o en una branch aparte), sin push.
- **Hoy hay mucho trabajo sin commitear sobre `6f78f2f`** — todo el rediseño (Hero, FloatingNav, BootTerminal, MediaFrame, ReadingProgress, Footer, content collections, páginas `[slug]`, la limpieza de placeholders y el retiro de la sección Trabajo). Es una decisión consciente del usuario, no un olvido: no commitear por iniciativa propia, pero tenerlo presente como riesgo real de pérdida de trabajo si algo se rompe, y ofrecerlo cuando una tanda de cambios quede estable.

## Gestión de costo — prioridad del proceso, no sólo del código

En este proyecto ya hubo rondas de rediseño visual completo que fallaron el objetivo y consumieron tokens y tiempo de forma desproporcionada al resultado. El costo del trabajo es una restricción de primer orden, al mismo nivel que la corrección técnica. Reglas concretas:

- **Antes de escribir código para un cambio visual grande y subjetivo** ("que se vea profesional", "que no parezca hecho por IA"), no asumir que un rediseño completo unilateral es el camino correcto. Ese tipo de pedido no se resuelve escribiendo más — se resuelve alineando primero: qué gustó, qué no, qué es negociable. Si ya hubo una ronda fallida sobre lo mismo, **preguntar antes de reintentar a la misma escala**, no repetir el patrón "rediseño completo → el usuario lo rechaza → rediseño completo de nuevo".
- **No reintroducir algo ya rechazado explícitamente.** Antes de un rediseño, repasar el feedback previo del usuario en la conversación (o en este archivo, ver "Patrones rechazados" abajo) y verificar que ningún elemento nuevo repita algo que ya se descartó. Volver a meter un patrón rechazado no es un error de gusto, es no haber revisado el propio trabajo.
- **Verificación en un solo paso, no en un loop por cada micro-ajuste.** Un build + una tanda de capturas (claro/oscuro/mobile) alcanza para validar un conjunto de cambios. No reconstruir ni volver a levantar el servidor de desarrollo por cada retoque individual — acumular cambios relacionados y verificar una vez.
- **No apagar el servidor de desarrollo por iniciativa propia al cerrar una respuesta.** Si el usuario lo pidió para revisar algo, se lo queda corriendo hasta que él diga que lo pare — apagarlo sin que lo pidan es una molestia extra la próxima vez que quiera mirar.
- **No reencuadrar un límite técnico como una decisión de diseño, y no acotar el alcance de un pedido en silencio.** Si falta un recurso para hacer algo que se pidió explícitamente (imágenes, video, un dato real, una API) — decirlo así, con esas palabras, y pedir lo que falta. Nunca reemplazar el pedido por una alternativa distinta sin avisar que es una alternativa y por qué. Confundir "no tengo el archivo" con "elegí no usar imágenes" es exactamente el tipo de cosa que generó la crisis de confianza de esta sesión.
- **Lo subjetivo no se autovalida.** "¿Se ve profesional?" o "¿parece hecho por un LLM?" no son preguntas que este agente pueda responder de forma confiable mirando su propio trabajo — el mismo punto ciego que produjo el problema no lo va a detectar en la revisión. Por eso existen la skill y el agente de abajo: no son opcionales para trabajo visual.
- Preferir cambios acotados y verificables sobre reescrituras totales cuando el pedido puede resolverse así.

### Trabajo visual: skill + agente obligatorios

Para cualquier tarea de diseño o implementación visual (hero, sección, página, rediseño, o un pedido tipo "que se vea más profesional"):

1. Cargar la skill `web-design-craft` (`.claude/skills/web-design-craft/SKILL.md`) **antes** de escribir layout o componentes. Tiene el checklist concreto de patrones que leen como "hecho por IA" y el proceso que evita repetir las rondas fallidas de este proyecto.
2. Después de implementar y **antes de mostrarle el resultado al usuario**, invocar el agente `web-design-critic` (`.claude/agents/web-design-critic.md`) contra el servidor de desarrollo corriendo. Es un agente sin memoria del trabajo construido y sin acceso de escritura — su único trabajo es encontrar qué sigue leyendo como genérico, no confirmar que está bien.
3. Actuar sobre esos hallazgos (o decidir conscientemente no hacerlo, y decir por qué) antes de presentar el resultado.

### Patrones ya rechazados (no reintroducir)

- **Trama de nodos / grid de fondo en el hero.** Rechazada explícitamente ("no me gusta el grid del hero, tampoco la línea tipo line chart") y sin embargo reapareció en la ronda de rediseño siguiente porque no se cruzó el nuevo diseño contra el feedback previo. `Hero.astro` no debe volver a llevar `NodeField` ni ningún motivo de fondo similar.
- **Hero simétrico y centrado por defecto** (eyebrow + H1 + párrafo + dos botones, todo en una columna centrada). Es exactamente el patrón #1 del checklist de `web-design-craft` — el más reconocible como "hecho por un LLM" — y varias rondas de este proyecto cayeron en variantes de esta misma forma aunque cambiara el contenido visual alrededor.

## Stack de animación e interacción — instalado y a disposición (2026-08-17)

Antes de este stack, el sitio no tenía una sola librería de animación: todo el movimiento (`.reveal`, `.draw-in`, parallax, conteo animado) es CSS + un `IntersectionObserver`/`requestAnimationFrame` artesanal en `layouts/Layout.astro` y en el script de `SensitivityModel.astro`. Eso sigue siendo válido y no se reescribe retroactivamente sin necesidad, pero para el rediseño completo que sigue, estas herramientas están instaladas (`package.json`) y evaluadas contra el sistema de marca — **usarlas es la vía esperada, no opcional, para lo que el `IntersectionObserver` a mano no puede resolver con calidad** (orquestación de timelines, scroll scrubbing, pinning, texto que se parte en palabras/caracteres):

- **`gsap`** (incluye `ScrollTrigger`, `SplitText`, `DrawSVGPlugin` y el resto de los plugins que antes eran de pago — Webflow adquirió GreenSock en 2024 y en mayo de 2025 liberó todo el ecosistema, incluso para uso comercial). Es el motor de referencia de prácticamente todos los sitios premiados que el usuario trajo como inspiración. Reemplaza al observer artesanal cuando la orquestación lo justifique: `ScrollTrigger` para scrubbing/pinning atado a la posición de scroll, `SplitText` para revelar titulares palabra por palabra o carácter por carácter (el recurso tipográfico real que falta hoy), `DrawSVGPlugin` para que el trazo del gráfico de `Method.astro` se dibuje con control real de timing en vez del `stroke-dashoffset` manual actual.
- **`lenis`** — scroll suave con inercia (envuelve el scroll nativo, no lo reemplaza: `position: sticky`, anchors y accesibilidad siguen funcionando). Es el "feel" presente en la mayoría de las referencias (abtc.com, icomat.co.uk, species-in-pieces.com). Se sincroniza al ticker de GSAP (`gsap.ticker.add`), no con su propio rAF, para no duplicar el loop de render.
- **`@fontsource-variable/newsreader`, `@fontsource-variable/instrument-sans`, `@fontsource/spline-sans-mono`** — versiones self-hosted de las tres tipografías del sistema, ya en `package.json`. Cierra el pendiente que estaba anotado más abajo. **El `<link>` a Google Fonts en `layouts/Layout.astro` (línea ~90) todavía no se reemplazó por el import local** — eso es código y no se tocó en esta pasada, que fue sólo de investigación + instalación.

**Evaluado y descartado explícitamente** (para que no se reintente sin una razón concreta y nueva):
- **Three.js / cualquier motor WebGL** — el grafo del isotipo es estrictamente 2D, con trazos ortogonales/45°, y el sistema prohíbe iconografía 3D y gradientes. Una escena WebGL necesitaría romper esas reglas para no leerse como decorativa; no hay contenido hoy que justifique una tercera dimensión real.
- **Alpine.js o cualquier framework de UI reactivo** — el sitio es contenido mayormente estático con JS vanilla puntual (command palette, sliders del modelo). Sumar un runtime de framework no se justifica por lo que hay que construir; sería peso sin beneficio.
- **D3 u otra librería de charting** para el gráfico de `SensitivityModel.astro`/`Method.astro` — el sistema de diseño exige sólo segmentos rectos (nunca Bézier) y que cada vértice sea un valor efectivamente calculado, no interpolado por la librería. El SVG artesanal actual ya cumple eso mejor que una librería de charting genérica, que además tendría que forzarse para no suavizar curvas.

**Reglas de uso, no negociables, para cuando se implemente con este stack:**
- `prefers-reduced-motion` se sigue respetando sin excepción — con GSAP, vía `gsap.matchMedia()` (revierte automáticamente todas las animaciones/ScrollTriggers creados bajo esa media query cuando deja de matchear), no un chequeo disperso por componente.
- Limpieza obligatoria de `ScrollTrigger`/timelines si algún elemento se desmonta u oculta condicionalmente — evita tweens fantasma. Más relevante si el sitio adopta `astro:transitions`/`<ClientRouter>` para navegar entre `/` y `/en/`: hay un problema conocido de Lenis pisando el guardado de posición de scroll de Astro al combinarse con el router de cliente — revisar antes de sumar ambos.
- Ninguna de estas librerías habilita gradientes, glassmorphism, sombras fuera de flotantes, radio en contenedores, ni Bézier en gráficos de datos — son motores de scroll/animación, no licencia para relajar las reglas no negociables del sistema de marca (ver abajo).
- Un movimiento sigue teniendo que confirmar algo (un dato que cambia, un estado que resuelve). La potencia nueva de `ScrollTrigger` no es excusa para el "fade-up genérico en todo" que el patrón #8 del checklist de `web-design-craft` ya prohíbe — más fácil de producir con más poder, no más aceptable.
- `astro:transitions` (`<ClientRouter>`) es nativo de Astro 6, sin instalar nada — vale la pena para transiciones reales entre `/` y `/en/` si el sitio pasa a navegación multi-página, pero no aplica hoy a una landing de una sola página con anchors internos.

### Segunda pasada: gráficos interactivos, look-and-feel de terceros, otras librerías de interacción

- **`fuse.js`** — instalado. Fuzzy search liviano y sin dependencias para el filtro de texto de `CommandPalette.astro` (hoy coincidencia literal). Paquete presente, **todavía no cableado** en el componente — eso es código, queda para el rediseño.
- **Librerías de gráficos financieros (`lightweight-charts` de TradingView, `uPlot`) — evaluadas, no instaladas.** `lightweight-charts` es la más pensada para este dominio, pero su licencia Apache 2.0 exige atribución visible a TradingView en la página — un widget con logo ajeno choca con el propósito de `SensitivityModel.astro`, que existe para mostrar modelado propio, no un widget de mercado. `uPlot` no tiene esa traba y es igual de liviano. Ambas quedan como opción concreta el día que haya que graficar una serie de mercado real (no el modelo interactivo, que sigue mejor servido por el SVG artesanal) — no antes, no especulativamente.
- **D3 modular (`d3-shape`/`d3-scale`, no el bundle completo) — evaluado, no instalado.** Corrección respecto a la primera pasada: D3 no fuerza curvas Bézier, su generador de línea por defecto (`curveLinear`) es recto. Sigue sin instalarse porque no hay tarea que lo necesite hoy — el SVG a mano de `Method.astro`/`SensitivityModel.astro` ya cumple la restricción de vértices calculados. Candidato legítimo si aparece una serie de datos nueva y más compleja que reemplace el dato ilustrativo actual.
- **Alpine.js — evaluado, no instalado.** Es más liviano de lo que se asumió en la primera pasada (~15kb, sin build step, declarativo vía atributos), no un framework de UI pesado tipo React/Vue. Se activaría si `ResearchIndex.astro` necesita filtrado/orden en vivo — hoy no hay esa tarea, y el JS vanilla existente (command palette, sliders) ya resuelve lo que hace falta.
- **Floating UI (o equivalente de posicionamiento) — descartado.** En 2026, CSS Anchor Positioning + el atributo `popover` nativo (soporte baseline) cubren tooltips/popovers/dropdowns con foco y accesibilidad manejados por el navegador, sin JS. No hace falta una librería para esto.
- **Plotly.js — evaluado, descartado.** Ni siquiera el bundle recortado (`plotly.js-basic-dist`, bar/pie/scatter) baja de ~1MB minificado (~3.5MB el completo) — desproporcionado para dos o tres gráficos en un sitio estático que ya cuida performance. Además trae chrome propio por defecto (mode bar, tooltips, leyendas) pensado para notebooks/dashboards de datos, que hay que desarmar por completo para no chocar con el sistema de marca. No fuerza curvas Bézier (las líneas son rectas salvo que se pida `shape: 'spline'`), pero eso no alcanza para justificar el peso frente a `uPlot`/D3 modular/el SVG artesanal actual, todos órdenes de magnitud más livianos.
- **Bootstrap / MDB / cualquier framework de componentes con look-and-feel propio — descartado, no es una omisión.** Estos frameworks son un sistema visual completo por defecto (radio redondeado, sombra en tarjetas, paleta propia) que choca directamente con reglas no negociables del sistema de marca (sin radio en contenedores, sin sombra fuera de flotantes). Usarlos implica más tiempo sobreescribiendo sus defaults que construyendo, y el resultado arrastra señales reconocibles de "clase Bootstrap" — exactamente el efecto "se nota que es una plantilla" que este proyecto viene tratando de evitar desde las rondas fallidas. Tailwind v4 (ya instalado) cumple el rol de herramienta de utilidades sin imponer identidad visual propia, que es lo que este proyecto necesita.

Vulnerabilidades de `npm audit` detectadas al instalar (astro/vite/esbuild/postcss/sharp/svgo/js-yaml/nanoid, todas preexistentes en la cadena de dependencias de Astro, no introducidas por `gsap`/`lenis`/`fontsource`): no se corrigieron en esta pasada porque `npm audit fix` implica subir la versión de Astro/Vite, que es un cambio de código/build fuera del alcance pedido ("no toquemos nada del código todavía"). Si se decide actualizar, es una decisión aparte.

## Design system — fuente de verdad

Toda decisión visual (color, tipografía, espaciado, componentes, uso del logo) se rige por:

- `src/assets/media/design_system/design-system-tomas-rau.md` — especificación técnica completa, autocontenida. **Leer antes de tocar cualquier estilo.**
- `src/assets/media/design_system/Catálogo de marca.dc.html` — versión navegable/visual del mismo sistema, útil para ver los componentes renderizados.

Esta carpeta está en `.gitignore` a propósito: el repo es público y ese material de marca no es necesario para que el sitio funcione. Existe localmente pero nunca se commitea.

**El doc se actualiza sin avisar — es una fuente viva, no un snapshot.** Antes de asumir una regla de memoria (sobre todo el uso del dorado), releer el `.md` actual. La versión del 2026-08-17 cambió reglas centrales respecto de la que se implementó originalmente; ver "Actualización 2026-08-17" abajo.

**Principio rector:** base monocroma en escala verde petróleo con el dorado como **color de marca de uso libre** — no un acento limitado a una sola aparición. El único límite es técnico (contraste de lectura en modo claro), no de cantidad. Criterio de decisión ante cualquier ambigüedad: legibilidad en lectura extensa por sobre impacto visual.

### Reglas no negociables

- **El dorado es libre en cantidad.** Puede sostener títulos, botones, tags activos, fondos de bloque, la mayoría de las series de un gráfico, marcos completos — tantas veces como la pieza lo pida. El límite es sólo técnico: `--accent-rule` (`#C9A227`, croma pleno) **nunca** es color de letra en modo claro (2.11:1 de contraste) — ahí el texto usa `--accent` (`#75590C`, tinta, 5.74:1) o va sobre `--accent-substrate`. En modo oscuro los dos tokens colapsan y el dorado puede ser protagonista sin restricción (7.79:1 como texto).
- **Sin sombra** fuera de `--shadow-float`, y sólo en elementos flotantes (menú, popover, tooltip). Tarjetas, tablas, botones, inputs y secciones van sin sombra — en el sitio de producto; en piezas de redes sociales la sombra sí puede ayudar a separar capas (§9 del doc).
- **Sin radio en contenedores.** Tarjeta, tabla, bloque, modal, imagen y sección van a esquina viva (`--radius-0`). Sólo botón/input/select/control (`--radius-2`) y tag/chip/badge/paginación (`--radius-1`) se redondean.
- **Prohibido en el sitio de producto:** gradientes, glassmorphism, iconos 3D, terminales de código decorativas, badges de "generado con IA", curvas Bézier en gráficos de datos, franjas cebra en tablas, colorear categorías (el tag seleccionado invierte, no colorea).
- **Tipografía por rol, sin zonas grises:** prosa/títulos → Newsreader (`--font-read`); interfaz (nav, botón, label, metadato) → Instrument Sans (`--font-ui`), nunca en párrafos; cifras/fórmulas/código → Spline Sans Mono (`--font-data`) con `tabular-nums`. Ninguna cifra se compone en Newsreader; ningún párrafo en Instrument Sans.
- **Foco visible en todo elemento enfocable**, sin excepción (`--focus-ring` + `--focus-offset`), y no reemplaza al hover.
- **Un solo botón primario por vista** — regla de jerarquía de interfaz, no de color. No limita cuánto dorado hay en la vista, sólo cuántos botones tienen el tratamiento visual de "primario".
- Motivo gráfico del isotipo (nodo, viñeta, trama, marca de agua) es el vocabulario decorativo del sitio de producto, y la trama de fondo sólo va en hero/portada/banner — nunca detrás de texto de lectura ni de tarjetas.

### Actualización 2026-08-17: qué cambió en el doc de marca

1. **"Un solo dorado por vista" ya no existe.** La versión anterior del doc limitaba el dorado a un acento quirúrgico; la actual lo declara explícitamente "color de marca de uso libre... tantas veces como la pieza lo pida" (§2.2), y el checklist de auditoría de producto (§7) **ya no incluye** ese ítem. Este sitio se construyó bajo la regla vieja — cada capítulo tiene exactamente un toque dorado (el dato del panel del modelo, un nodo del puente, la fila destacada de la tabla), lo cual sigue siendo válido pero es más conservador de lo que el sistema permite hoy. No se reescribió el código para aprovechar la libertad nueva sin confirmar antes con el usuario — ver "Gestión de costo" arriba.
2. **Nueva §8: tratamiento de imagen.** El sistema ya no evita la fotografía — la exige tratada. Tres tratamientos válidos: **duotono petróleo** (default), **duotono con acento** (highlights en dorado, para piezas de redes), **blanco y negro con velo verde**. CSS de referencia en el doc. Nunca una foto sin tratar detrás de texto de lectura o de una tabla. El sitio hoy no usa ninguna fotografía — sigue siendo válido (el doc no la exige, la habilita), pero si en algún momento se agrega una foto de perfil/contexto, tiene que llevar uno de estos tres tratamientos.
3. **Nueva §9: mockups de redes sociales, de libertad total** (modo, sombra, dorado dominante, foto de fondo completo) — no aplica al sitio de producto, que sigue bajo las reglas de legibilidad extensa de §2.3. Relevante sólo si en el futuro se producen piezas para LinkedIn/Instagram desde este repo.
4. El doc tiene una inconsistencia propia menor: en §2.2 dice que el dorado "puede sostener... botones", pero la tabla "Qué no marca" (texto heredado de la versión anterior, no reescrito) todavía dice "un botón primario". Se resuelve a favor del texto reescrito explícitamente (dorado libre) — la tabla vieja quedó desactualizada, no es una restricción real.

### Desviación deliberada respecto al documento

El doc especifica que el modo oscuro es sólo un "registro de énfasis" reservado a hero/portadas/LinkedIn (§2.4), con el resto del sitio siempre en claro. **En este sitio se decidió conservar el toggle claro/oscuro para todo el sitio** (decisión explícita del usuario). Ambos modos usan siempre el bloque de tokens correspondiente (`:root`/`[data-theme="light"]` o `[data-theme="dark"]`) — nunca se mezclan tokens de un modo con el otro.

El hero **no** está fijo en oscuro: sigue el tema como el resto del sitio. Se probó fijarlo y el efecto fue que el conmutador parecía no hacer nada. El contraste editorial que el §2.4 buscaba con el hero oscuro lo aportan ahora los registros alternados de capítulo (ver abajo).

## Trampas del proyecto (verificadas, no teóricas)

### 1. Un agente o skill nuevo no se reconoce en la misma sesión que lo crea

Claude Code descubre `.claude/agents/*.md` y `.claude/skills/*/SKILL.md` al arrancar la sesión. Si el directorio `.claude/agents/` o `.claude/skills/` no existía cuando la sesión empezó, un archivo creado ahí a mitad de sesión **no aparece como agente/skill invocable hasta reiniciar la sesión** — el error es "Agent type 'x' not found" aunque el archivo esté bien formado. No es un problema de formato del frontmatter; es puramente de timing. Si esto pasa, hacer la tarea a mano siguiendo las instrucciones del archivo recién creado, y avisar que quedará disponible como agente/skill real recién en la próxima sesión.

### 2. Astro rompe todo selector que dependa de `[data-theme]` en `<html>`

Astro scopea los `<style>` de componente añadiendo `[data-astro-cid-…]` a **cada** compound del selector, incluido el que apunta al `<html>`. Un `[data-theme="dark"] .foo { … }` dentro de un componente compila a:

```css
[data-astro-cid-x][data-theme=dark] .foo[data-astro-cid-x] { … }
```

…que nunca matchea, porque `<html>` no lleva el atributo de scope. El síntoma es silencioso: la regla simplemente no aplica (se vieron los dos logos y los dos íconos del toggle superpuestos).

**Regla:** cualquier estilo condicionado por tema va en `src/styles/global.css`, nunca en un `<style>` de componente. Los helpers ya existen ahí: `.brand-ink-on-light` / `.brand-ink-on-dark`, `.theme-icon-light` / `.theme-icon-dark`, `.register-paper` / `.register-ink`.

### 3. Convención de tinta de los archivos de logo

Verificado componiendo cada archivo sobre fondo real (el preview de un visor compone sobre blanco y **engaña**):

| Archivo | Contenido real | Va sobre |
|---|---|---|
| `logo_black_cropped.png` | tinta **negra**, fondo transparente | fondo claro |
| `logo_white_cropped.png` | tinta **blanca**, fondo transparente | fondo oscuro |
| `isotype_black_cropped.png` | nodos blancos sobre **caja negra opaca** | sólo superficie oscura |
| `isotype_white_cropped.png` | nodos oscuros sobre **caja blanca opaca** | sólo superficie clara |
| `logo_*_no_bkg.png` | logo diminuto en lienzo 500×500 | inservible a tamaños de UI |

`_black_` / `_white_` nombran **la tinta**, no el fondo. Los `isotype_*_cropped` incumplen §5.1 (traen caja opaca); si algún día se reemplazan por versiones transparentes, mantener el nombre y todo sigue funcionando.

### 4. El campo de frontmatter `slug` es especial en las content collections de Astro

`node_modules/astro/dist/content/loaders/glob.js`: `if (data.slug) return data.slug;` — el glob loader usa `data.slug` como id único de la entrada si existe, ignorando el nombre de archivo. Si dos archivos de idiomas distintos (`{slug}.es.md` / `{slug}.en.md`) comparten a propósito el mismo valor para poder generar `/research/{slug}/` y `/en/research/{slug}/` con el mismo parámetro, **colisionan como el mismo id** y el loader descarta uno en silencio (`"Duplicate id... later items will overwrite earlier ones"` — un warning fácil de no ver). Por eso `research` usa `routeSlug`, no `slug`, como nombre del campo (la colección `work` tenía el mismo patrón; se retiró entera junto con la sección Trabajo).

### 5. Los paquetes `@fontsource-variable/*` registran la familia con el sufijo "Variable"

`@fontsource-variable/newsreader` no expone la fuente como `"Newsreader"` sino como `"Newsreader Variable"` (ídem Instrument Sans). Si el token `--font-read`/`--font-ui` en `global.css` no incluye el nombre con el sufijo, la fuente cae en silencio al fallback del sistema — no hay error, sólo se ve distinto y nadie lo nota sin comparar letra por letra. `Spline Sans Mono` no es variable y su nombre de familia sí coincide con el token, sin sufijo.

### 6. Verificación con Playwright: `fullPage: true` no dispara `IntersectionObserver`, y Vite puede servir un bundle viejo tras instalar una dependencia a mitad de sesión

Dos gotchas de verificación, no de producto:

- Una captura `page.screenshot({ fullPage: true })` vía CDP renderiza toda la altura de la página sin scrollear de verdad — cualquier `[data-reveal]` fuera del viewport inicial queda con `opacity: 0` en la captura aunque en un uso real (con scroll real) se vea perfecto. Para verificar contenido con reveal, scrollear a cada sección con `scrollIntoView` y esperar antes de capturar, no confiar en un solo `fullPage`.
- Después de agregar una importación de cliente nueva (ej. `fuse.js` en un `<script>` de componente) a mitad de sesión con el dev server ya corriendo, el optimizador de dependencias de Vite puede seguir sirviendo el bundle anterior (`504 Outdated Optimize Dep` en la consola del navegador) aunque el archivo fuente ya esté actualizado — el síntoma es que el cambio "no aparece" pese a que el código está bien. Se resuelve reiniciando el dev server con `rm -rf node_modules/.vite` antes de levantar de nuevo.

## Estructura del sitio (estado real al 2026-08-24)

`ChapterOpener.astro`, `ChapterRail.astro`, `NodeField.astro`, `Thread.astro` **y también `NavHub.astro`** (el grafo del mapa del sitio, sobre Cytoscape.js) **y `Work.astro`** (la sección Trabajo entera, con su content collection `work` y sus páginas `/trabajo/{slug}/`) ya no existen — se borraron. `NavHub` se reemplazó por `core/FloatingNav.astro` (ver abajo); `Work` se retiró sin reemplazo, a pedido explícito del usuario ("no está bien logrado" fue el motivo del grafo; Work se sacó como parte de una limpieza más amplia hacia contenido real, ver "Fase actual" abajo). La landing (`/`, `/en/`) sigue siendo scroll largo de una página, pero cada nota de Research tiene su propia URL, generada desde una content collection real (`src/content.config.ts`, hoy sólo `research`). Todas las secciones/páginas reciben `lang` — **no se duplica markup por idioma**.

| Sección | Componente | Registro | Qué la distingue de las demás |
|---|---|---|---|
| Hero | `sections/Hero.astro` | paper | Composición partida real (molde: aventuradentalarts.com): columna izquierda fija de identidad + columna derecha a sangre completa con el retrato real tratado en duotono (filtro SVG `feComponentTransfer`, mapeo por luminancia). El titular cruza la costura entre columnas en dos bloques —romana e itálica—, cada uno con su propio mecanismo de contraste (`mix-blend-mode` resultó no confiable acá). Sin trama de fondo, sin eyebrow, sin par de botones |
| Research | `sections/ResearchIndex.astro` | ink | Lee de la colección `research`; primera entrada (`featured: true`) **promovida**; cada entrada linkea a `/research/{routeSlug}/`. **Hoy vacía** (0 entradas, se retiraron las de ejemplo) — muestra un estado honesto (`.research-empty`), no una lista rota |
| Método | `sections/Method.astro` | paper | Título integrado al tope de la columna de lectura (sin bloque de header separado). **Ya no lleva gráfico** — el gráfico ilustrativo (§3.10) se retiró entero junto con el resto de los placeholders; sólo el texto real de método queda |
| Modelo | `sections/SensitivityModel.astro` | ink | Sangre completa, sin `--grid-max`/`--page-margin`. Cifra dorada de hasta 128px con conteo animado (ver abajo) |
| Trayectoria | `sections/Experience.astro` | **paper** (era ink) | Se cambió de registro al retirar Trabajo (paper), que antes separaba a ésta de Modelo (ink) — sin ese separador quedaban dos secciones oscuras adyacentes sin transición visual. Header en dos columnas (título + bajada) que ecoa la grilla de la lista de abajo, no un bloque apilado |
| Contacto | `sections/Contact.astro` | paper | Apertura sparse: eyebrow + frase en `--pullquote` (itálica), sin título grande — Formulario de calificación, §3.1 un solo primario |

El orden real de montaje en `pages/index.astro` es Hero → FloatingNav → Research → Método → Modelo → Trayectoria → Contacto (`FloatingNav` es chrome flotante, no una sección con registro propio). La numeración de capítulos `00`–`06` que vivía en el hilo lateral **ya no existe** como elemento de UI.

Piezas transversales, todas montadas desde `layouts/Layout.astro` salvo donde se aclare:

- **`core/BootTerminal.astro`** — pantalla de carga (ver abajo).
- **`core/CommandPalette.astro`** — ⌘K, fuzzy search real vía `fuse.js` sobre secciones + notas de Research (el grupo "Trabajo" se retiró junto con la sección).
- **`core/FloatingNav.astro`** — sólo se monta en `pages/index.astro`/`en/index.astro`, no desde Layout (ver abajo).
- **`core/MediaFrame.astro`** — contenedor de foto/video con los tres tratamientos de §8 cableados (ver abajo). Lo monta la sección que lo usa, no el Layout.
- **`core/ReadingProgress.astro`** — barra de progreso de lectura de las páginas `[slug]` (ver abajo). Entra por `<slot name="thread">`.
- **`core/Header.astro`** / **`core/Footer.astro`** — `Header` ya no tiene link `[mapa]` (destino retirado); `Footer` se rediseñó como "panel técnico" (ver abajo).
- La capa de movimiento en `layouts/Layout.astro`: Lenis sincronizado al ticker de GSAP para el scroll global (expuesto en `window.__lenis`), más el `IntersectionObserver`/parallax vanilla para `[data-reveal]`/`[data-parallax]`. Las tres tipografías se importan self-hosted desde `@fontsource*` en el frontmatter del Layout.

**Vestigio a no confundir:** el slot de `Layout.astro` sigue llamándose `name="thread"` aunque el hilo ya no exista — hoy lo ocupa `ReadingProgress` en las páginas `[slug]`. Es sólo un nombre heredado, no queda código del hilo.

### `core/FloatingNav.astro` — navbar flotante de anclas a sección (reemplaza a `NavHub.astro`)

El grafo del mapa del sitio (Cytoscape.js) se retiró entero — "no está bien logrado", feedback directo del usuario tras varias rondas de ajuste — y no se iteró más sobre él. En su lugar, una píldora flotante horizontal anclada abajo al centro, con anclas a las secciones (separador "·", sin corchetes — ver nota de Footer abajo) y una línea de progreso real de scroll (no decorativa). Dos comportamientos no obvios:

- **Ocultar/mostrar por dirección de scroll, con umbral.** Revela recién a ~56px de subida sostenida, no en el primer tick en que cambia el signo de la dirección — con momentum scrolling (trackpad) reaccionar al primer tick hacía que la píldora apareciera de forma errática, aterrizando encima de contenido que se estaba leyendo. El punto de referencia ("dónde se ocultó por última vez") se reancla en CADA tick de bajada, no sólo en la transición visible→oculto — si no, queda clavado en el primer ocultamiento (al dejar el Hero) y el umbral nunca se cumple después por más que se suba.
- **Colchón calculado al final del documento**, no un valor fijo — se mide el alto real de la píldora + su offset al piso + el umbral de revelado, para garantizar que nunca tape el pie de página al llegar al final y subir un poco.
- **Contraste por sección, no por tema.** La píldora tiene que verse clara sobre secciones oscuras y oscura sobre secciones claras, en cualquier tema del sitio — un intento anterior tomaba el registro de la sección vía `var()`, pero esos tokens siguen atados a `--theme` y en tema oscuro seguían dando fondo oscuro sobre fondo oscuro. Se resuelve con una paleta local fija (`--pill-*`, no `var()` del tema) alternada por JS según la combinación real tema×registro (la única sección realmente clara en pantalla es tema claro + `.register-paper`; las otras tres combinaciones son oscuras aunque el tema no sea "oscuro").

### `BootTerminal.astro` — la pantalla de carga

Una terminal de research/trading que se enciende panel por panel mientras cargan los recursos reales. El componente trae **sólo el markup y los estilos del chrome**; el contenido de cada panel lo construye el script de `Layout.astro` leyendo los `data-*` de acá — así el orquestador del progreso vive en un solo lugar y no hay coordinación entre scripts.

Dos cosas que no se pueden cambiar sin romperlo:

- Los estilos de los hijos generados por JS viven en `global.css`, **no** en un `<style>` del componente: un elemento creado con `createElement` nunca recibe el `data-astro-cid-*` que Astro estampa sobre el template estático, así que un `<style>` scopeado no lo alcanzaría (misma familia de trampa que `[data-theme]`, ver arriba).
- **Todos los valores son ilustrativos**, de instrumentos públicos genéricos. Nunca datos de mercado en vivo ni cifras de track record propio.

### `MediaFrame.astro` — foto/video con el tratamiento de §8

Cablea los tres tratamientos del design system: `duotono` (petróleo, default), `duotono-acento` (luces altas en dorado) y `velo` (blanco y negro + velo verde). Los valores son fijos e **independientes del tema claro/oscuro** — una foto no cambia de proceso porque el visitante prenda el modo oscuro.

No fabrica contenido: sin `src`, muestra un placeholder honesto que dice exactamente qué archivo poner y dónde (prop `expectedPath`). Apenas el archivo existe en esa ruta, pasar `src` alcanza para que aparezca tratado, sin tocar el componente que lo usa.

Los archivos que faltan están declarados en `public/media/README.md`: `hero-loop.mp4` (Hero) y `retrato.jpg` (Hero, redundante — ver nota abajo). Ojo con el retrato: el archivo real **sí existe**, pero como asset de Astro en `src/assets/media/photos/retrato-tomas-rau.jpg`, importado directo desde `Hero.astro` — no pasa por `MediaFrame`. `evidencia-lorenz.jpg` ya no está en la lista: era para `Work.astro`, que se retiró entero.

### `ReadingProgress.astro` — progreso de lectura de las páginas `[slug]`

Reemplaza al modo `progress` del `Thread.astro` retirado sin heredar nada de su vocabulario visual: una barra horizontal de 2px fija arriba del viewport, sin nodos ni metáfora de red — el progreso de lectura de un artículo no necesita más que eso. `ScrollTrigger` con `scrub` sobre el `trackSelector` que recibe por prop (`#note-body` en Research, `#case-body` en Trabajo). Con `prefers-reduced-motion` se pinta al 100% y no anima.

### Content collections — `src/content.config.ts`

Una colección (`research`; existió también `work`, retirada entera junto con la sección Trabajo), un archivo Markdown por idioma (`{slug}.es.md` / `{slug}.en.md}`) dentro de la carpeta de la colección. `getStaticPaths` en `src/pages/research/[slug].astro` (+ `en/research/[slug].astro`) genera una página por entrada, filtrando por `lang`. `ResearchIndex.astro` no tiene datos hardcodeados — lee de la colección vía `getCollection`.

**Hoy la colección está vacía a propósito** (`src/content/research/` sin archivos `.md`) — se retiraron las tres notas de ejemplo («Entradas de ejemplo», `date: "Borrador"`) como parte de la limpieza de placeholders del 2026-08-24. `getCollection("research", ...)` devuelve `[]`, y Astro emite un warning benigno en build/dev (`[glob-loader] No files found matching...` / `The collection "research" does not exist or is empty`) — no es un error, el build sigue completando con éxito. `ResearchIndex.astro` maneja el caso de 0 entradas con un estado honesto (`.research-empty`), no una lista vacía rota.

### Referencias de diseño: no todas sirven por igual

**Corrección importante (no repetir este error):** el sistema de marca **no es "monocromo sin imágenes"** — §8 del doc (`Tratamiento de imagen`) habilita fotografía explícitamente, con tres tratamientos válidos (duotono petróleo, duotono con acento, blanco y negro con velo verde) y sin restricción de cantidad de dorado. Durante varias rondas el sitio no usó fotografía, y la razón **nunca fue una regla de marca — era que no había un solo archivo de foto/video en el repo**, más el hecho de que este entorno no tiene herramienta de generación de imágenes ni de video.

**Actualizado al 2026-08-23:** ya hay un retrato real (`src/assets/media/photos/retrato-tomas-rau.jpg`) y el Hero lo usa con duotono real. Siguen faltando `hero-loop.mp4` y `evidencia-lorenz.jpg` (ver `public/media/README.md`), y mientras no existan, `MediaFrame` muestra el placeholder honesto que declara la ruta esperada.

No fabricar fotos falsas de una persona real es una postura ética que se mantiene, pero eso no equivale a "no usar imágenes" — si el usuario provee archivos reales (capturas de dashboards/modelos, contexto de mercado, etc.), se aplican los tratamientos de §8 de inmediato. **Antes de asumir que un recurso está fuera de alcance, decir explícitamente qué falta y pedirlo — no reencuadrar la limitación como una decisión de diseño.**

Las seis referencias que trajo el usuario (abtc.com, icomat.co.uk, aventuradentalarts.com, heliasoils.com, species-in-pieces.com, shopify.com/editions) son en su mayoría sitios de marca de consumo apoyados en fotografía real — útiles como referencia de composición, pero irreproducibles en pixel hasta que existan assets propios. De esas seis, **species-in-pieces.com** (una sola pieza SVG que ocupa toda la pantalla) y **shopify.com/editions** (tipografía mixta + líneas técnicas de precisión sobre negro) son las que ya se pudieron aplicar sin depender de fotografía.

Producto financiero/técnico (Bloomberg Terminal, Stripe, Linear, terminales de research) es un molde adicional razonable para esta marca — ahí el impacto viene de densidad de datos, movimiento con propósito y precisión — pero es un complemento a la fotografía tratada de §8, no un reemplazo elegido para evitarla.

### La cifra dorada del modelo: partición fija, no superposición absoluta

Primer intento: la cifra que sostiene la tesis (`.model-hero-number`) iba en `position: absolute` flotando sobre el gráfico. Con ciertos valores de la curva, el trazo pasaba justo por encima de los dígitos y se leía como un glitch de render, no como una decisión de diseño — el usuario lo señaló correctamente. **Regla general para cualquier elemento tipográfico grande superpuesto a un dato que cambia (gráfico, curva, mapa):** la cifra necesita su propio espacio con partición fija (columna, franja), nunca `position: absolute` sobre un elemento cuyo contenido visual varía con el estado. Si el layout puede chocar para *algún* valor de entrada, va a chocar.

### Ya no hay nada fijo en el margen izquierdo (restricción retirada)

Durante dos rediseños hubo una nav lateral fija (`ChapterRail`, después `Thread.astro`) que ocupaba ~190px a partir de 1200px, y las secciones de padding reducido (`SensitivityModel`, la ex `Work`, las páginas `[slug]`) llevaban un `padding-left: 190px` para despejarla. **Con `Thread.astro` retirado, esos overrides se eliminaron y ya no queda ninguno en el código.** `NavHub.astro` llegó a tener el único `@media (min-width: 1200px)` propio del sitio (para su grafo); con `NavHub` también retirado, **hoy no queda ningún override de ese tipo en ningún componente** — verificarlo de nuevo si esto se lee mucho después, no asumir que sigue siendo cierto sin comprobar.

Queda anotado porque es fácil reintroducir el bug al revés: si algún día vuelve un elemento fijo en el margen, hay que volver a auditar toda sección con padding lateral menor a `--page-margin` (64px). Hoy no hace falta.

### `CommandPalette.astro`: ⌘K / Ctrl K

Navegación por teclado real: filtra por texto, `↑↓` para moverse, `Enter` para saltar, `Esc` para cerrar. Dispara desde cualquier `[data-cmdk-trigger]` (el botón del header) o desde el atajo global. Usa `--shadow-float` (§3.9: elemento flotante, la única sombra permitida) — igual que las píldoras de `Header.astro` y `core/FloatingNav.astro`, los otros elementos genuinamente flotantes del sitio.

### `core/Footer.astro` — rediseño "panel técnico" (2026-08-24)

El footer original era genérico (identidad + dos columnas de links + copyright, sin usar el vocabulario visual del resto del sitio). Rediseñado a pedido explícito del usuario ("mucho más profesional, siguiendo los lineamientos de mi sistema de diseño"), eligiendo entre dos direcciones presentadas con `AskUserQuestion` (la otra era un cierre editorial silencioso, tipo colofón de revista). Dos piezas reutilizan vocabulario YA establecido en vez de inventar uno nuevo:

- **Navegación con separador "·"** — mismo lenguaje que `FloatingNav.astro` para la misma lista de anclas. Un primer intento usaba corchetes (`[research]`, eco del link `[mapa]` que tenía `Header.astro` antes de que se retirara el grafo del mapa del sitio), pero el crítico lo marcó como un tercer sistema de navegación en conflicto: el `[mapa]` que lo justificaba ya no existe, y el visitante SÍ tiene fresca en pantalla la píldora flotante con su propia puntuación. Se resolvió a favor del vocabulario que sigue vivo, no del retirado.
- **Canales de contacto como pares kicker/valor** (`EMAIL` / `tomasrau@lorenz.ar`, mono, kicker chico arriba) — mismo patrón que ya usan los paneles de datos del sitio (BootTerminal, el panel de riesgo del modelo), en vez de sólo el nombre del canal como link plano.

### Conteo animado en resultados calculados

En `SensitivityModel.astro`, los cuatro resultados calculados (precio, duración, convexidad, precio a +100pb) interpolan del valor viejo al nuevo en ~260ms (`--dur-slow`, ease-out cúbico) en vez de saltar — el movimiento confirma que la conclusión cambió (§2.9), no decora. Los tres ecos de los supuestos (lo que el usuario está moviendo con el slider) **no** interpolan, siguen al dial en directo — animarlos se sentiría desconectado de la manipulación directa. Respeta `prefers-reduced-motion` (salta directo al valor final).

El gráfico de `Method.astro` respeta la gramática del isotipo: **sólo segmentos ortogonales** (las tasas son funciones escalonadas, así que la restricción coincide con la semántica), vértices como nodos cuadrados, serie de contexto en `--chart-4` punteada, y línea de fuente obligatoria.

### La pieza firma: `SensitivityModel.astro`

Modelo de precio y sensibilidad de un bono, con matemática real en `src/lib/bond.ts` (sin dependencias). El módulo se importa **tanto desde el frontmatter como desde el script de cliente**, así el primer paint ya sale calculado y no hay destello.

Está validado contra seis identidades analíticas independientes (paridad cuando cupón = tasa ⇒ precio 100; duración de un cupón cero = plazo; asimetría de convexidad; la duración modificada aproxima un movimiento de 1 pb; descuento y premio). **Si tocás las fórmulas, revalidá contra esas identidades.**

La curva depende sólo de plazo y cupón, no de la tasa vigente — la tasa mueve el marcador. Sirve como chequeo rápido de que el render no se rompió.

## Fase actual del proyecto y contenido pendiente

**Actualizado 2026-08-24 — la fase avanzó.** Hasta el 2026-08-23 el proyecto estaba en fase de estructura visual, y la regla era no tocar los placeholders ("no son un descuido, se trabaja sobre el contenido de ejemplo que ya está"). El usuario pidió explícitamente pasar a "un terreno más real y concreto": **se retiraron todos los placeholders del sitio, excepto el video pendiente del hero** (`hero-loop.mp4` — sigue faltando el archivo, `MediaFrame` sigue mostrando su placeholder honesto ahí, eso no cambió). No volver a la regla vieja de "no tocar placeholders" sin que el usuario lo pida de nuevo — la fase cambió, no es un estado transitorio de esta sesión.

Qué se retiró en esta pasada:

- **Sección Trabajo entera.** `Work.astro`, la content collection `work` (`src/content/work/*.md`, 4 casos × 2 idiomas), las páginas `/trabajo/{slug}/` y `/en/trabajo/{slug}/`. No es "contenido reemplazado por real" — es una sección que el usuario decidió que no debía existir, punto. Si vuelve una sección de casos de trabajo en el futuro, es una decisión nueva, no restaurar lo retirado.
- **Las notas de ejemplo de Research.** `src/content/research/*.md` (3 notas × 2 idiomas, «Entradas de ejemplo», `date: "Borrador"`) — borradas. La colección queda vacía a propósito; `ResearchIndex.astro` muestra un estado honesto (`.research-empty`) mientras no haya notas reales. Cuando se agregue la primera nota real, ese estado deja de mostrarse solo (es condicional a `entries.length`).
- **El gráfico ilustrativo de `Method.astro`** (§3.10, serie de tasas ficticia con tag "ILUSTRATIVO"). Se sacó entero — geometría SVG, leyenda, línea de fuente, los textos de traducción que sólo usaba el gráfico. El texto real de método (los tres párrafos + notas de trabajo del margen) **no era placeholder y se mantuvo intacto**.

Qué sigue pendiente, deliberadamente sin tocar (no es lo mismo que "placeholder genérico" — son recursos/integraciones reales que faltan, no contenido de relleno):

- `public/media/hero-loop.mp4` — video del hero. Único placeholder que sigue en pie, por instrucción explícita del usuario ("excepto la foto del hero" — el retrato ya está real; el video todavía no).
- `BootTerminal.astro` — todas las cotizaciones, métricas de riesgo y salidas de modelo del boot son ilustrativas, de instrumentos públicos genéricos, **a propósito y para siempre** — es contenido de ambientación de una pantalla de carga, no una promesa de dato real pendiente de reemplazo (a diferencia de Research/Method arriba). No se tocó ni debería tocarse por esto.
- `Contact.astro` — `FORMSPREE_ENDPOINT` está en `null`. Crear la cuenta en formspree.io y pegar el endpoint; hasta entonces el formulario se renderiza deshabilitado con un aviso visible, a propósito. No es contenido de ejemplo, es una integración real sin configurar.

**Sigue vigente, sin cambios:** no inventar cifras de track record, retornos ni credenciales, ni siquiera como relleno visual.

### Desvío autorizado: movimiento y escala

El §2.9 restringe el movimiento a «confirmar una acción; no decora», y la escala tipográfica topea en `--title-xl` (52px). **El usuario autorizó apartarse de ambas cosas** para que el sitio tenga el flujo de lectura y la presencia de sus referencias (abtc.com, icomat.co.uk, shopify.com/editions, species-in-pieces.com). El razonamiento: el documento está pensado para papel, informe y PDF; una pantalla necesita traducción, no transcripción.

Lo que se habilitó, y sus límites:

- **Revelado al scroll** (`.reveal` + `[data-reveal]`) y **parallax** (`[data-parallax]`). Usan **sólo** `opacity` y `transform: translate`, que son dos de las cinco propiedades que el propio §2.9 autoriza. Nunca `width`, `height`, `top/left` ni `scale`.
- **Trazo que se dibuja** (`.draw-in`, vía `stroke-dashoffset`) cuando una figura entra en viewport.
- **Escala arquitectónica** (`.display-numeral`, `.display-title`, `.chapter-numeral`): hasta ~180px. Es el «momento visual» que en las referencias aporta la fotografía — sustituto mientras no haya fotos propias, no la opción preferida por diseño.
- Todo respeta `prefers-reduced-motion` (verificado: 0 elementos ocultos con la preferencia activa) y el contenido queda visible sin JS (clase `no-js` en `<html>`, que el script remueve).

Lo que **no** se relajó: sigue sin haber gradientes, glassmorphism, sombras fuera de flotantes, radio en contenedores, ni curvas Bézier. Y el racionamiento del dorado se mantiene estricto — **un acento por capítulo**, verificado programáticamente. Los *kickers* y numerales de capítulo son deliberadamente neutros: si fueran dorados, el acento aparecería siete veces y dejaría de señalar nada (§2.2).

### Registros de capítulo, no hairlines

Las secciones **no** se separan con un borde de 1px. Alternan `.register-paper` / `.register-ink` a sangre completa (definidos en `global.css`). Ambos derivan de los tokens del tema, de modo que el conmutador cambia visiblemente toda la página — el hero ya **no** está fijo en oscuro. La relación se invierte entre modos, que es lo que el §2.1 prescribe: en claro la tinta es una banda petróleo profunda; en oscuro es una banda más clara.

### Nota de cumplimiento: la curva precio–rendimiento

La prohibición de Bézier (§2.3) apunta a la interpolación suavizada que **fabrica valores intermedios** entre datos escasos. La curva de `SensitivityModel.astro` es una polilínea de segmentos rectos (`L`) donde **cada vértice es un valor efectivamente calculado** por la fórmula de valuación. No inventa nada, así que cumple el espíritu de la regla.

### Adaptaciones de layout

El layout de dos columnas del §2.7 (lectura 680px + márgenes 268px) **sí se usa**, en `Method.astro` y en la cabecera de cada sección (`.section-head`: numeral en la columna angosta, título y bajada en la ancha). Colapsa a una columna por debajo de 1024px. En las secciones que no son prosa larga se usan sólo los tokens de grid (`--grid-max`, `--page-margin`, `--gutter`), espaciado (`--space-*`) y ritmo vertical (`--flow-*`).

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

- ~~Self-hosting de las tres tipografías variables~~ — **hecho.** `layouts/Layout.astro` importa `@fontsource-variable/newsreader/standard(-italic).css`, `@fontsource-variable/instrument-sans/standard.css` y `@fontsource/spline-sans-mono/{400,500}.css`; ya no hay `<link>` a Google Fonts.
- No existen `isotipo-positivo.svg`/`isotipo-negativo.svg` en el repo; se usan los PNG recortados existentes en `src/assets/media/logos/`. Si en algún momento se generan versiones SVG, reemplazar ahí.
- Una segunda herramienta de cálculo interactivo (más allá de `SensitivityModel`) — deliberadamente no se construyó una para no sumar una feature especulativa sin un caso concreto. Es el paso natural siguiente si aparece un cálculo real que valga la pena exponer.
- **Fase 2 diferida, no iniciada:** cuentas de usuario / estado guardado entre visitas. Requiere elegir proveedor de backend/auth (Supabase, Firebase u otro) — deja de ser un sitio 100% estático. Decisión de infraestructura que el usuario todavía no tomó; no asumir un proveedor sin preguntar.
