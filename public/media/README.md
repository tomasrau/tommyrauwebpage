# Media pendiente

Esta carpeta es donde van los archivos reales de foto/video del sitio. Hasta que
no exista el archivo en la ruta esperada, el componente `MediaFrame.astro` que
lo usa muestra un estado de placeholder honesto (no una foto falsa) — apenas el
archivo aparece acá con el nombre correcto, se aplica el tratamiento de §8 del
design system automáticamente, sin tocar ningún componente.

| Ruta esperada | Usado en | Proporción | Notas |
|---|---|---|---|
| `hero-loop.mp4` | Hero (`sections/Hero.astro`) | 16:9 o vertical, se recorta con `object-fit: cover` | **Pendiente.** Loop corto y silencioso (~8-15s) para el panel del hero: se reproduce en bucle detrás del titular y se desplaza a la izquierda al scrollear. Mientras no exista, se ve el retrato real y un aviso declarando qué falta — nunca contenido fabricado. Apenas aparezca el archivo con este nombre, se activa solo, sin tocar código. Se le aplica el mismo duotono petróleo que al retrato. |
| `retrato.jpg` | Hero (`sections/Hero.astro`) | 4:5 (vertical) | Foto de perfil. Se aplica duotono petróleo. Buena luz, fondo simple — el tratamiento ya aporta la unidad de marca. |

Formatos: `.jpg`/`.png`/`.webp`, cualquiera funciona — el `<img>` no discrimina
por extensión. Sin límite de tamaño estricto pero conviene exportar a un ancho
razonable (~1600px) para no pesar la página.
