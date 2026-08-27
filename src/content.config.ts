// src/content.config.ts
// Colección bilingüe, un archivo por idioma (mismo patrón que el sitio ya
// usa a nivel de páginas: /research/{slug}/ y /en/research/{slug}/ comparten
// el mismo `slug` de frontmatter, filtrado por `lang` en cada getStaticPaths
// — no se adopta el routing i18n nativo de Astro, que sería una migración
// aparte que nadie pidió.
//
// Existió una segunda colección, `work` (sección Trabajo) — se retiró
// entera a pedido del usuario, sección y contenido incluidos.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    // OJO: no llamar a este campo "slug" — el glob loader de Astro trata
    // `data.slug` como especial y lo usa como id de la entrada
    // (node_modules/astro/dist/content/loaders/glob.js: `if (data.slug)
    // return data.slug`). Como el mismo valor se repite en el archivo .es
    // y en el .en (a propósito, para poder generar /research/{routeSlug}/
    // y /en/research/{routeSlug}/ con el mismo parámetro), usar "slug"
    // colisiona el id entre ambos archivos y el loader descarta uno en
    // silencio ("later items... will overwrite earlier ones").
    routeSlug: z.string(),
    lang: z.enum(["es", "en"]),
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    // Freeform a propósito: hoy son notas de ejemplo ("Borrador"/"Draft"),
    // no hay fecha real todavía. El día que haya una nota real, este campo
    // pasa a llevar la fecha de publicación como string legible.
    date: z.string(),
    readMinutes: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { research };
