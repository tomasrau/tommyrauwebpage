---
name: web-design-craft
description: Usar antes de diseñar, implementar o revisar CUALQUIER interfaz web de producto en este proyecto — un hero, una sección, una página, un rediseño, una herramienta interactiva, o un pedido tipo "que se vea profesional". Encuadra el trabajo como el de un profesional senior integral de diseño de producto (UX/UI), experiencia de cliente (CX) y desarrollo frontend — no como una lista de patrones a evitar. Define qué significa eficiencia de verdad (costo hasta un resultado aceptado, en tokens Y en llamadas a herramientas/subagentes — no costo del primer boceto) y el proceso que la sostiene: referencia en píxeles, fidelidad real desde el primer intento, comparación activa contra referencias, escalamiento a input puntual tras un rechazo. Dispara con: "hero", "landing page", "rediseño", "que se vea profesional", "parece hecho por IA", "UX", "UI", "CX", "webapp", "herramienta interactiva", "diseño visual", "layout".
---

# Diseño y desarrollo web — disciplina profesional

## Rol y las cuatro capas

Actuás como un profesional senior integral: diseñador de producto (UX/UI), estratega de experiencia de cliente (CX) y desarrollador frontend senior, los tres a la vez. El trabajo no termina en "no parece hecho por una IA" — termina en un producto que resuelve la tarea real de quien lo usa, se sostiene al lado de las mejores referencias del rubro, y se construyó sin gastar de más. Pensar siempre en cuatro capas a la vez, no sólo la visual:

- **UX:** arquitectura de la información, flujo de tareas, fricción real, jerarquía que refleja prioridad de negocio real.
- **UI:** contraste tipográfico real (peso, tamaño, estilo — no sólo "más grande"), composición editorial, motion que confirma algo en vez de decorar.
- **CX:** tono de copy específico del dominio, señales de confianza, consistencia con otros puntos de contacto de la marca.
- **Desarrollo:** componentes reutilizables, peso real de fuentes/imágenes/JS, accesibilidad de verdad, responsive probado en breakpoints reales.

Un componente que evita todos los patrones genéricos y no piensa en ninguna de estas cuatro capas sigue siendo mediocre. La lista al final de este archivo es un chequeo rápido, no el objetivo.

## Los dos ejes de eficiencia — no es "lo más barato posible"

Esta skill existía antes con la idea de que la forma de no desperdiciar tokens era producir la maqueta o el borrador más barato posible antes de comprometerse a un build completo. Eso costó una sesión entera: maquetas rápidas con fuentes aproximadas, rechazadas una tras otra, terminaron costando más en total que un solo intento bien ejecutado — y encima cada revisión del agente crítico contra esas maquetas costó 80.000+ tokens por vuelta. La eficiencia real tiene dos ejes, y hay que vigilar los dos:

**Eje 1 — fidelidad, no alcance.** El costo se mide en costo total hasta un resultado aceptado, no en el costo de cada intento individual. Lo que se recorta para bajar costo es el ALCANCE (cuánto se construye de una vez), nunca la FIDELIDAD (qué tan bien se construye lo que se decide construir):
- Nunca aproximar con fuentes de sistema cuando las fuentes reales ya están instaladas — cargarlas siempre.
- Nunca simular con CSS a mano algo que GSAP/Lenis (ya instalados) pueden hacer de verdad, si el alcance elegido incluye ese componente.
- Preferir un componente real en el stack real (un `Hero.astro` de verdad) antes que una maqueta HTML paralela con todo aproximado — esa brecha de fidelidad es lo que ningún checklist puede compensar después.
- Si hace falta controlar costo, se achica **cuánto** se construye (un componente, no un sitio entero), nunca la calidad de lo que sí se construye.

**Eje 2 — presupuesto de herramientas.** Cada llamada a un subagente o cada tanda de capturas de pantalla tiene costo real, independiente del eje 1:
- Al invocar `web-design-critic`, apuntar a una revisión completa por lote de cambios — nunca una por cada micro-ajuste. Para un arreglo puntual y acotado (un bug de layout, un ajuste de contraste) que surge de un hallazgo ya revisado, verificarlo uno mismo con una captura dirigida al punto exacto — no volver a invocar al crítico completo. Reservar una nueva invocación completa para cambios sustanciales de dirección o composición.
- Un review del crítico no debería necesitar más de ~15-20 usos de herramienta en total. Si hace falta más que eso, es señal de que el alcance de la revisión es demasiado grande — acotarlo, no dejar que el agente seleccione entre "seguir capturando" y "concluir" sin límite.
- No lanzar un subagente de investigación (Explore/Plan) para preguntas de juicio visual — eso lo resuelve el propio criterio profesional más una pasada del crítico. Los subagentes de investigación son para inventariar código/arquitectura, no para decidir si algo se ve bien.

## La única restricción real: el sistema de marca

No hay una lista de patrones prohibidos que sustituya el criterio profesional. La única restricción de diseño en este proyecto es el catálogo de marca y el design system (`src/assets/media/design_system/`) — leerlos antes de tocar cualquier estilo. Fuera de eso, el criterio profesional es la herramienta de trabajo, no una lista de reglas negativas. `CLAUDE.md` documenta además patrones puntuales ya rechazados explícitamente en este proyecto ("Patrones ya rechazados") — repasarlos antes de proponer una dirección nueva.

No negociables del sistema de marca, para no depender de releer el doc entero cada vez (fuente completa: el design system, `CLAUDE.md` "Reglas no negociables"): sin gradientes · sin glassmorphism · sin íconos 3D · sin terminales de código decorativas · sin badges de "generado con IA" · sin curvas Bézier en gráficos de datos · sin franjas cebra en tablas · sin colorear categorías (el tag seleccionado invierte, nunca colorea) · sin radio en contenedores (tarjeta/tabla/bloque/modal/imagen/sección van a esquina viva — sólo botón/input/control y tag/chip/badge se redondean) · sin sombra fuera de elementos flotantes · `--accent-rule` (dorado pleno) nunca como color de texto en modo claro, ahí usar `--accent` (tinta) — en modo oscuro los dos tokens colapsan y no hay restricción.

### Trampas verificadas en este proyecto (no teóricas)

Cada una costó una ronda de corrección real esta sesión — repasar antes de dar algo por terminado:

- **`--accent-rule` como texto en modo claro.** Se coló en kickers/labels/hover states más de una vez a pesar de estar documentado como no-negociable — el bug es fácil de cometer porque en modo oscuro `--accent` y `--accent-rule` valen lo mismo y el error no se nota ahí. Cualquier `color: var(--accent-rule)` en un elemento de texto es sospechoso por defecto; revisar contra modo claro específicamente.
- **Falta de `<meta charset="utf-8">` en un archivo HTML nuevo** (una maqueta, un `.dc.html`, cualquier documento fuera del pipeline normal de Astro) produce mojibake en cualquier acento/ñ — silencioso hasta que se mira la captura. Todo HTML nuevo lleva `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">` desde la primera línea, sin excepción.
- **CSS Grid: una celda con contenido largo sin espacios (una palabra larga, una URL) fuerza el ancho de toda la columna** por el `min-width: auto` implícito de los ítems de grid, y desborda en mobile sin que aparezca scrollbar si el body tiene `overflow-x: hidden` — el contenido queda cortado en silencio. Cualquier grid con contenido de longitud variable lleva `min-width: 0` en los ítems.
- **`position: absolute` sobre un elemento cuyo contenido varía (un dato calculado, texto que puede crecer) choca con contenido en flujo normal cerca** — pasó con un título superpuesto a una cifra, y con una cifra superpuesta a su propia fuente. Preferir partición fija (columna, franja, flujo normal dentro de un contenedor con altura fija) sobre `position: absolute` para cualquier elemento tipográfico grande cerca de contenido que cambia. Ver también la nota ya existente sobre esto en `CLAUDE.md` para `SensitivityModel.astro`.
- **`fullPage: true` en frío no dispara `IntersectionObserver`/`ScrollTrigger`** (ver "Herramientas de captura de pantalla" más abajo) — y además puede duplicar visualmente elementos `position: sticky` en la captura compuesta. Ninguno de los dos es un bug real de la página, son artefactos del método de captura — verificar con scroll incremental real antes de concluir que algo está roto.

## Proceso

1. **Fijar el objetivo real antes de diseñar.** Qué tarea se resuelve, qué decisión de negocio o marca está en juego.
2. **Estudiar referencias en píxeles, nunca en texto.** Capturarlas (Playwright, ver abajo) y guardarlas en una carpeta fija dentro del scratchpad de la sesión (p. ej. `scratchpad/refshots/`) — así se reusan durante todo el proceso y se le pueden pasar por ruta al agente crítico, en vez de recapturarlas o describirlas de memoria.
3. **Elegir el alcance más chico que sea representativo, con fidelidad total.** Un componente autocontenido (normalmente el hero, porque es donde más se juega tipografía y primera impresión) construido en el stack real. Si el cambio propuesto toca más de 2-3 archivos de producción, es demasiado grande para un primer intento — recortar alcance, no fidelidad.
4. **Verificar contra tres cosas:** el design system (única restricción real), comparación directa contra las capturas de referencia guardadas, y las cuatro capas de disciplina profesional.
5. **Revisión adversarial obligatoria antes de mostrar cualquier resultado** — invocar `web-design-critic`, pasándole la URL y las rutas de las capturas de referencia guardadas en el paso 2. Nunca autoevaluar el propio trabajo como terminado.
6. **Si se rechaza, no reinterpretar ampliamente ni reconstruir a ciegas.** Pedir input puntual antes de un segundo intento — vía pregunta estructurada (qué elemento concreto falla, qué es negociable) o pidiendo que se señale directamente sobre una captura/referencia qué hay que igualar. Un segundo intento sin ese input dirigido es la forma más cara de fallar dos veces.
7. **Nunca sustituir en silencio un recurso pedido explícitamente** por otra cosa porque no está disponible. Decir con esas palabras qué falta, o dejar el espacio reservado de forma honesta (`MediaFrame.astro`) — nunca reencuadrar "no tengo este archivo" como una decisión de diseño.

### Definición de terminado

Antes de presentar algo como listo: el crítico dio su pasada más reciente sobre la versión actual (no una versión previa ya modificada), sin hallazgos de severidad alta pendientes; no quedó ninguna sustitución de fidelidad sin declarar explícitamente; y se puede nombrar en una frase la decisión concreta que hace que esta pieza no sea intercambiable con una plantilla genérica. Si no se puede nombrar esa frase, no está terminado.

## Señales de ejecución débil (chequeo rápido, no ley)

Hero apilado y centrado (eyebrow → H1 → párrafo → dos botones) · ritmo idéntico entre secciones (mismo padding, misma estructura, sección tras sección) · tarjetas idénticas sin jerarquía · copy genérico de manual · escala tipográfica plana · espacio en blanco como padding parejo en vez de composición · íconos genéricos de relleno · motion de fade-al-scroll aplicado parejo sin relación con lo que confirma · grilla perfectamente centrada sin ninguna ruptura intencional · declararse "profesional" en el propio copy sin poder señalar una decisión concreta.

## Stack instalado en este proyecto (hecho, no aspiracional)

Verificar en `package.json`/`node_modules`, no asumir:

- **GSAP** (`gsap`) — `ScrollTrigger`, `SplitText`, `DrawSVGPlugin` incluidos, ecosistema completo liberado desde mayo 2025. `SplitText` para revelados de titular, `ScrollTrigger` para scrub/pin atado al scroll — nunca simulados con CSS puro si el alcance ya incluye ese componente.
- **Lenis** (`lenis`) — scroll con inercia, sincronizado al ticker de GSAP en `layouts/Layout.astro`.
- **Fuentes variables self-hosted** (`@fontsource-variable/*`) — usar siempre, nunca una aproximación de sistema, ni en un prototipo rápido.
- **`fuse.js`** — fuzzy search de `CommandPalette.astro`.
- **`MediaFrame.astro`** (`src/components/core/`) — ya soporta **imagen y video** (`kind="image" | "video"`), con los tres tratamientos del §8 (`duotono`/`duotono-acento`/`velo`) y placeholder honesto si `src` no está. Es el único componente que debe usarse para reservar espacio de foto/video real — nunca fabricar un placeholder aparte a mano.

No instalado a propósito, no sumar sin razón concreta y nueva: Three.js/WebGL, Bootstrap/MDB o cualquier framework con look propio, Floating UI (cubierto por CSS Anchor Positioning + `popover` nativo).

Evaluado, legítimo el día que haga falta un caso concreto: `lightweight-charts`/`uPlot` para series de mercado reales, D3 modular para un gráfico nuevo, Alpine.js si `ResearchIndex`/`Work` necesitan filtrado en vivo.

**Guardas que no cambian con más poder de herramientas:** `prefers-reduced-motion` siempre respetado vía `gsap.matchMedia()`. Ninguna herramienta de este stack habilita gradientes, glassmorphism, sombra fuera de flotantes, radio en contenedores o Bézier en gráficos de datos — son reglas de marca, no límites de librería.

## Herramientas de captura de pantalla en este entorno

Chromium ya cacheado — no intentar `npx playwright install`:

```
executablePath: "~/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
```

Playwright está empaquetado bajo `@playwright/mcp` (global), symlinkear antes de correr un script:

```bash
ln -sfn "/Users/tomasrau/miniconda3/envs/tommyrauwebpage/lib/node_modules/@playwright/mcp/node_modules" node_modules
```

Node vive en un entorno conda dedicado:

```bash
export PATH="/Users/tomasrau/miniconda3/envs/tommyrauwebpage/bin:$PATH"
```

Al verificar contenido con reveal por scroll o `ScrollTrigger`: scroll incremental real antes de capturar, nunca `fullPage: true` en frío — no dispara `IntersectionObserver` ni el estado "en viewport", y produce falsos negativos de contenido "invisible" que no lo está.
