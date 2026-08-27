---
name: web-creative-direction
description: Usar ANTES de construir cualquier pieza visual/interactiva nueva de tamaño real — un hero, una sección nueva, una herramienta interactiva, un rediseño. No usar para retoques puntuales sobre algo que ya existe (eso es directamente `web-design-craft`). Genera 2-3 direcciones creativas divergentes como briefs cortos, sin código y sin maquetas, para elegir una ANTES de construir con fidelidad completa — en vez de interpretar una sola dirección a ciegas, construirla entera, y descubrir recién ahí que no era la que se quería. Es la fase de ideación que precede a `web-design-craft` (ejecución con disciplina) y `web-design-critic` (juicio adversarial posterior): las tres trabajan en secuencia — idear, construir, juzgar — y no se duplican entre sí. Dispara con: "hero", "rediseño", "nueva sección", "herramienta interactiva", "opciones de diseño", "propuesta creativa", o cualquier pedido abierto tipo "que se vea profesional" / "sin restricciones" / "usá todos los recursos disponibles".

---

# Dirección creativa — la fase que faltaba

## Por qué existe esta skill

En este proyecto, tres rondas de rediseño se rechazaron seguidas porque cada intento fue una interpretación única, construida entera con fidelidad completa, mostrada recién al final. Nunca hubo un punto barato donde elegir entre alternativas reales antes de comprometerse a una. Esta skill es exactamente ese punto: **antes de construir nada, generar varias direcciones divergentes de verdad, y que se elija una explícitamente.**

No reemplaza a `web-design-craft` — lo alimenta. `web-design-craft` sigue siendo quien ejecuta con fidelidad total (fuentes reales, tokens reales, motion real) y quien invoca a `web-design-critic` después de construir. Esta skill sólo resuelve la pregunta de *qué construir*, antes de que eso empiece a costar caro.

## Proceso

1. **Entender el brief real**: qué tarea del usuario resuelve esta pieza, a quién le habla, qué restricciones de marca/técnicas aplican (design system del proyecto, stack instalado — ver `web-design-craft`).
2. **Reunir contexto barato**: capturas de referencia ya guardadas (`scratchpad/refshots/` si existen), el design system, el inventario de técnicas de abajo. No construir nada todavía.
3. **Invocar al agente `web-creative-director`** (o razonar directamente con el mismo criterio si el alcance es chico) para producir **2-3 direcciones divergentes**, nunca más — más de 3 opciones no es más creativo, es indecisión disfrazada de generosidad. Cada dirección tiene que ser genuinamente distinta en al menos uno de estos ejes, no una variación de color de la misma idea:
   - **Composición**: cómo se organiza el espacio (partido, apilado, escalonado, a sangre completa, con pin/scrub).
   - **Ángulo de UX/CX**: a qué prioriza (densidad de información para quien vuelve, impacto editorial para quien llega por primera vez, la tarea interactiva como protagonista).
   - **Vocabulario de movimiento**: qué confirma el motion y con qué mecanismo real del stack.
4. **Presentar las direcciones para elegir una** — con `AskUserQuestion` si hay un humano disponible para decidir, describiendo cada dirección en un párrafo corto (la idea central, qué UX prioriza, qué capacidad técnica real usa, complejidad relativa de construir). Nunca construir código en este paso.
5. **Entregar la dirección elegida a `web-design-craft`** como el brief de su paso 3 ("elegir el alcance más chico que sea representativo, con fidelidad total"). De ahí en adelante, el proceso de esa skill manda.

Este proceso es barato por diseño: los pasos 1-4 son texto, no código ni maquetas. La inversión fuerte (fidelidad completa) llega recién después de elegir, no antes — exactamente al revés de cómo se hizo esta sesión.

## Vocabulario de técnicas disponibles en este stack

Punto de partida para generar direcciones, no una lista cerrada — pero acotado a lo que este proyecto puede construir de verdad hoy (Astro estático, GSAP + ScrollTrigger + SplitText + DrawSVGPlugin, Lenis, sin backend, sin gradientes/glassmorphism/3D/sombra fuera de flotantes/Bézier en gráficos):

- **Narrativa por scroll**: scrub atado a la posición de scroll (no pin salvo que el contenido lo justifique), trazo de gráfico que se dibuja, texto que se revela palabra por palabra o carácter por carácter (`SplitText`).
- **Composición partida/asimétrica**: columna estática + panel a sangre completa, texto cruzando el borde entre dos zonas, grillas escalonadas donde un elemento domina y el resto son satélites.
- **Tipografía como protagonista**: contraste romana/itálica dentro de la misma oración, escala arquitectónica para una sola cifra o palabra, texto que sangra fuera del contenedor a propósito.
- **Dato real como imagen**: cuando no hay foto/video real todavía, un gráfico o cifra calculada (como el modelo de bonos) puede sostener la composición en vez de un placeholder — nunca un ícono genérico ni un hachurado simulando una imagen que falta.
- **Foto y video reales, tratados**: `MediaFrame.astro` ya soporta ambos (`kind="image"|"video"`) con los tres tratamientos del §8 (duotono/duotono-acento/velo) y placeholder honesto si el archivo no existe todavía — cualquier dirección puede reservar ese espacio aunque el archivo no esté, con `expectedPath` explícito.
- **Herramientas interactivas paramétricas**: cálculos client-side reales (sliders, inputs) con resultado que interpola, no salta — el patrón ya establecido por `bond.ts`/`SensitivityModel.astro`.
- **Contenido de aprendizaje/consulta no interactivo**: notas, guías o explicaciones que no requieren cómputo — el hub de herramientas no es sólo calculadoras; una dirección puede priorizar densidad de referencia/consulta sobre interactividad si el brief lo pide.
- **Registro claro/oscuro alternado**: bandas a sangre completa que alternan modo entre secciones, ya construido en `global.css` (`.register-paper`/`.register-ink`).
- **Marcas de registro técnico**: crosshairs, tickers/marquesinas, numeración de capítulo — vocabulario editorial/técnico que no depende de imagen alguna.

Cualquier dirección que dependa de un recurso que no existe (foto real, video real, una librería no instalada) tiene que decirlo explícitamente como parte del brief, no asumirlo ni sustituirlo en silencio.

### Referencias visuales de este proyecto — lecciones ya extraídas en píxeles

Cuatro sitios se estudiaron en píxeles (no en texto) como referencia para tomasrau.ar; cada uno aportó algo puntual que sigue siendo válido citar al proponer direcciones, sin copiar el sitio entero:

- **abtc.com** — tipografía de despliegue sobredimensionada que sangra fuera del viewport; secciones con tabs pineados que scrubean con el scroll; marcas de conexión ortogonales nodo+línea (coinciden con el vocabulario del isotipo de esta marca).
- **icomat.co.uk** — hero a sangre completa con media oscuro y atmosférico; marcas de registro tipo crosshair enmarcando bloques de contenido/dato; registros de sección claro/oscuro alternados a sangre completa (ya construido en este proyecto, ver arriba).
- **aventuradentalarts.com** — hero partido (columna estática + media a sangre completa); titular serif mixto romana+itálica cruzando la costura entre columna y media; retrato tratado en B/N (coincide con el tratamiento `velo` de `MediaFrame`).
- **carlesfaus.com** — grilla de tarjetas/imágenes escalonada y asimétrica que rompe la grilla a propósito; etiquetas de nav entre corchetes en tono técnico/mono.

Estudio completo (capturas + contexto extendido) en el archivo de plan de la sesión donde se generó — si no está disponible, volver a capturar estos cuatro sitios en píxeles antes de citarlos de memoria.

## Qué NO hace esta skill

No construye componentes de producción, no toma screenshots de trabajo ya construido, no reemplaza la revisión adversarial de `web-design-critic`. Si el pedido es un ajuste puntual sobre algo que ya existe (un color, un espaciado, un bug), no hace falta pasar por acá — eso es directamente `web-design-craft`.
