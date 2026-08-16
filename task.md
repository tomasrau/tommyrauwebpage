# Astro + Tailwind Personal Website Implementation Checklist

This checklist tracks the development phases for building the professional personal website for **Tomas Rau (tomasrau.ar)**. The goal is to create a premium, editorial, data-driven aesthetic representing an economist specialized in Business Intelligence, finance, and strategic technology — implemented per the brand design system in `src/assets/media/design_system/design-system-tomas-rau.md` (see `CLAUDE.md` for the project-level summary of its rules).

## Status Legend
- `[ ]` Uncompleted tasks
- `[/]` In progress tasks
- `[x]` Completed tasks

---

### Phase 1: Foundation and design tokens
- `[x]` Define theme variables inside `src/styles/global.css` (Tailwind CSS v4 system)
  - `[x]` Light-default monochrome petrol palette (`--bg`, `--surface`, `--surface-raised`, `--text-*`, `--border*`) + dark variant under `[data-theme="dark"]`
  - `[x]` Surgical gold accent, split into `--accent` (text-safe) and `--accent-rule` (never text)
  - `[x]` Chart series tokens (`--chart-1..4`, `--chart-accent`)
  - `[x]` Neutral petrol typography colors for headings/body (`--text-primary`, `--text-secondary`, `--text-tertiary`)
- `[x]` Setup typography integrations inside `src/layouts/Layout.astro`
  - `[x]` Import Google Fonts (Newsreader for reading/titles; Instrument Sans for interface; Spline Sans Mono for data)
  - `[x]` Set up default styles and font-role application (`--font-read`/`--font-ui`/`--font-data`)
- `[x]` Setup shared component tokens inside `src/styles/global.css`
  - `[x]` Radius scale (`--radius-0/1/2`) — square containers, rounded controls only
  - `[x]` Single elevation shadow (`--shadow-float`), used only by floating elements
  - `[x]` Node/isotype-derived graphic motif tokens (`--pattern-cell`, `--node-dot`, `--node-point`, `--watermark-*`)

### Phase 2: Layout shell
- `[x]` Refactor `src/layouts/Layout.astro`
  - `[x]` Light-default background (`--bg`), theme script defaults to light and respects `prefers-color-scheme` only on first visit
  - `[x]` Grid alignment via `--grid-max`/`--page-margin`/`--gutter`
- `[x]` Build header `src/components/core/Header.astro`
  - `[x]` Flat single-line header, no own background/blur, isotype lockup + `--ui-l` nav
  - `[x]` Active nav item marked with petrol filete (never gold)
- `[x]` Build standard footer `src/components/core/Footer.astro`
  - `[x]` Flat footer, node-motif divider instead of gradient line
  - `[x]` Professional connections list (LinkedIn, GitHub, mail)

### Phase 3: Core components
- `[x]` Background motif `src/components/core/VisualGrid.astro`
  - `[x]` Node-grid trama (`--pattern-cell` + ortogonal/45° nodes), hero-only — never behind reading content or cards
- `[x]` Data/focus panel `src/components/ui/FocusPanel.astro` (replaces the old decorative terminal, which the design system explicitly forbids)
- `[x]` Metric primitive `src/components/ui/Metric.astro`
  - `[x]` Flat data card, no shadow/radius, value in `--font-data` with `tabular-nums`

### Phase 4: Homepage sections
- `[x]` Hero section in `src/pages/index.astro` / `src/pages/en/index.astro`
- `[x]` Expertise / Metric grid
- `[x]` About `src/components/sections/About.astro`
- `[x]` Case studies `src/components/sections/CaseStudies.astro`
- `[x]` Experience timeline `src/components/sections/Experience.astro` (square node motif, not circular)
- `[x]` Contact `src/components/sections/Contact.astro` (button hierarchy: one primary per view)

### Phase 5: Responsive QA
- `[ ]` Verify fluid scaling across standard viewport checkpoints (mobile, tablet, laptop, ultra-wide monitors)
- `[ ]` Test accessibility parameters (contrast checking, clear keyboard focus states, click actions spacing)
- `[ ]` Run the design system audit checklist (see `CLAUDE.md`) against every section

### Phase 6: SEO and metadata
- `[x]` Title tags and meta description values highlighting BI and economic expertise
- `[x]` OpenGraph cards bundle (metadata, canvas image, absolute URLs)
- `[x]` Responsive favicons and robot index parameters
- `[ ]` Regenerate `tomasrau_og_image.png` with the new visual identity (out of scope for this pass — no source file to regenerate from)

### Phase 7: GitHub Pages deployment
- `[x]` Domain and route base configuration in `astro.config.mjs`
- `[x]` Deploy pipeline `.github/workflows/deploy.yml` (builds and deploys to GitHub Pages on push to `main`)

### Phase 8: Custom domain setup
- `[x]` Domain assignment in `public/CNAME`
- `[ ]` Audit DNS registrations / HTTPS certificate status (external, periodic check)

---

## Design system follow-ups (optional, non-blocking)

- `[ ]` Self-host the three variable fonts (`design-system-tomas-rau.md` §4.2) instead of Google Fonts CDN.
- `[ ]` Produce SVG isotype files (`isotipo-positivo.svg` / `isotipo-negativo.svg`); currently using the existing cropped PNGs.
