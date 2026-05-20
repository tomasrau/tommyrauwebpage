# Astro + Tailwind Personal Website Implementation Checklist

This checklist tracks the development phases for building the professional personal website for **Tomas Rau (tomasrau.ar)**. The goal is to create a premium, data-driven, analytical aesthetic representing an economist specialized in Business Intelligence, finance, and strategic technology.

## Status Legend
- `[ ]` Uncompleted tasks
- `[/]` In progress tasks
- `[x]` Completed tasks

---

### Phase 1: Foundation and design tokens
- `[ ]` Define theme variables inside `src/styles/global.css` (Tailwind CSS v4 system)
  - [ ] Configure Obsidian Dark Palette (background, surfaces, cards)
  - [ ] Configure Premium Metallic Copper/Bronze accents (actions, hovers, primary hooks)
  - [ ] Configure Emerald/Mint highlight signals (data metrics, positive growth indices)
  - [ ] Configure neutral slate typography colors (headings, paragraph layouts)
- `[ ]` Setup typography integrations inside `src/layouts/Layout.astro`
  - [ ] Import Google Fonts (*Plus Jakarta Sans* or *Outfit* for headers; *Inter* for body; *JetBrains Mono* or *Fira Code* for data details)
  - [ ] Set up default styles and font family applications
- `[ ]` Setup common premium utility classes inside `src/styles/global.css`
  - [ ] Custom glassmorphic blur layers (`backdrop-blur-md` overlays)
  - [ ] Custom fine-border lines (1px translucent slate)
  - [ ] Tailored dark-academic scrollbar layout

### Phase 2: Layout shell
- `[ ]` Refactor `src/layouts/Layout.astro`
  - [ ] Implement default background structure (`#070A13` obsidian gray color) and typographic container properties
  - [ ] Arrange global grid alignment wrapper
- `[ ]` Build sticky navigation `src/components/core/Header.astro`
  - [ ] Glassmorphic blurring background, fine border borders, and drop shadow adjustments
  - [ ] Elegant typography brand signature (e.g., "Tomas Rau / Economist")
  - [ ] Responsive navigation linkages with active-state cues (underlines or bronze shifts)
- `[ ]` Build standard footer `src/components/core/Footer.astro`
  - [ ] Professional signature and current copyright year tracking
  - [ ] Professional connections grid (LinkedIn, GitHub, mail channels)

### Phase 3: Core components
- `[ ]` Create background mesh `src/components/core/VisualGrid.astro`
  - [ ] Generate elegant dot-matrix mesh overlay to establish data-driven background tone
- `[ ]` Create technical container `src/components/ui/Card.astro`
  - [ ] Render 1px fine-border boundaries and glass surfaces
  - [ ] Integrate cursor radial-glow gradient animation (follow mouse coordinates)
- `[ ]` Create metric primitive `src/components/ui/Metric.astro`
  - [ ] Format bold monospaced values for precise data delivery
  - [ ] Embed miniature growth trend vectors (subtle emerald vectors)
- `[ ]` Create data visualizer `src/components/ui/DynamicChart.astro`
  - [ ] Design custom high-fidelity SVG curve diagrams
  - [ ] Inject scroll-driven draw line animation (`stroke-dasharray` offsets)
- `[ ]` Create interactive query module `src/components/ui/Terminal.astro`
  - [ ] Create vintage-academic dark terminal frame
  - [ ] Implement mock scripting execution logs (econometric parsing, ETL scheduler logs)

### Phase 4: Homepage sections
- `[ ]` Implement Hero Section `src/components/sections/Hero.astro`
  - [ ] Formulate strategic introduction (Economist & BI Architect)
  - [ ] Embed the interactive query terminal console
- `[ ]` Implement Executive Summary `src/components/sections/About.astro`
  - [ ] Draft editorial briefing bridging mathematical finance and data engineering
- `[ ]` Implement Expertise Quadrant `src/components/sections/Expertise.astro`
  - [ ] Display modular cards detailing core capabilities (Data Modeling, Forecasting, BI Architecture)
- `[ ]` Implement Case Studies showcase `src/components/sections/CaseStudies.astro`
  - [ ] Structure professional project logs showing analytical methods and interactive graphs
- `[ ]` Implement Chronologicaltimeline `src/components/sections/Experience.astro`
  - [ ] Design elegant vertical timeline mapping advisor, analyst, and architect roles
- `[ ]` Implement Strategic Touchpoint `src/components/sections/Contact.astro`
  - [ ] Build minimal glassmorphic contact form and direct networking links

### Phase 5: Responsive QA
- `[ ]` Verify fluid scaling across standard viewport checkpoints (mobile, tablet, laptop, ultra-wide monitors)
- `[ ]` Test accessibility parameters (contrast checking, clear keyboard focus states, click actions spacing)
- `[ ]` Enforce clean hover degradations for touch screens (ensure cursor hover glows disable correctly on touch)

### Phase 6: SEO and metadata
- `[ ]` Set up index tags inside `Layout.astro`
  - [ ] Title tags and meta description values highlighting BI and economic expertise
  - [ ] Complete OpenGraph cards bundle (metadata, canvas image, absolute URLs) for high-end previews on social channels
  - [ ] Integrate responsive favicons and robot index parameters

### Phase 7: GitHub Pages deployment
- `[ ]` Configure parameters in `astro.config.mjs`
  - [ ] Setup standard domain site references and route base configurations
- `[ ]` Construct deploy pipeline `.github/workflows/deploy.yml`
  - [ ] Script Node environments caching, production compilation, and static asset bundle exports
  - [ ] Connect secure deployment actions targetting the repository's `gh-pages` branch

### Phase 8: Custom domain setup
- `[ ]` Establish domain assignment configuration in `public/CNAME`
  - [ ] Declare static domain target `tomasrau.ar`
- `[ ]` Check DNS registrations
  - [ ] Audit A, AAAA, and CNAME registry pointing configurations at registrar console
  - [ ] Confirm successful Let's Encrypt HTTPS certificate generation
