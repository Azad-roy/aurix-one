# AURIX ONE — Design System Master File (UI/UX Pro Max)

> **PRODUCT:** AURIX ONE — Flagship Wireless Noise-Cancelling Headphones  
> **TAGLINE:** "Silence the noise. Feel everything."  
> **AESTHETIC:** Dark, cinematic, precision consumer electronics (Obsidian / Titanium / Deep Crimson).

---

## 1. Visual Style & Philosophy
- **Cinematic Industrial Precision**: Inspired by luxury bespoke acoustics, precision watchmaking, and high-performance aerospace engineering.
- **Architectural Surfaces**: Pure obsidian black backgrounds (`#070708`, `#0A0B0E`), brushed charcoal modules (`#121318`, `#161820`), razor-thin architectural boundaries (`rgba(255,255,255,0.08)`).
- **Deep Red Accentuation**: Precision crimson pulse accents (`#E11D48`, `#FF2A55`, `#9F1239`) used strictly for active telemetry, frequency peaks, audio mode status, and primary calls to action.
- **Anti-Generic Mandate**: No generic SaaS illustrations, no cartoonish blob gradients, no bubbly 3-column repetitive cards, no generic AI template UI. Every element carries functional acoustic and industrial intent.

---

## 2. Color Palette Tokens

| Role | Hex | CSS Variable | Semantic Purpose |
|------|-----|--------------|------------------|
| Surface Void | `#070708` | `--color-void` | Deepest backdrop layer |
| Surface Primary | `#0B0C0F` | `--color-bg-primary` | Main stage surface |
| Surface Elevated | `#13141B` | `--color-bg-elevated` | Structural cards & tech pods |
| Surface Overlay | `#1B1C26` | `--color-bg-overlay` | Modals, active states, pill docks |
| Text Titanium | `#FFFFFF` | `--color-text-primary` | Hero typography & headlines |
| Text Polished | `#E2E4EC` | `--color-text-secondary` | Body paragraphs & subtitles |
| Text Muted | `#888E9E` | `--color-text-muted` | Technical descriptors & specs |
| Text Dark Muted | `#525666` | `--color-text-faint` | Metadata, serial numbers & grids |
| Accent Crimson | `#E11D48` | `--color-accent-red` | Active telemetry & primary CTA |
| Accent Glow | `#FF2A55` | `--color-accent-glow` | Laser indicator, visualizer spikes |
| Border Razor | `rgba(255,255,255,0.08)` | `--color-border-subtle` | Precision hairline borders |
| Border Active | `rgba(225,29,72,0.4)` | `--color-border-accent` | Focused & active component outlines |

---

## 3. Typography Architecture
- **Display Headings**: `Space Grotesk`, `Syne`, or `Cinzel` with geometric clarity, tight letterspacing on titles (`tracking-tight`), uppercase tracked badge headers (`tracking-[0.2em]`).
- **Body & Narrative**: `Inter` / `Plus Jakarta Sans` — ultra-legible, calibrated optical sizing, high contrast (>= 7:1 against void).
- **Engineering / HUD / Specs**: `JetBrains Mono` / `Space Mono` (`font-mono`) — monospaced precision, calibrated unit measurements (`40mm`, `45h`, `99.4%`, `-42dB`).

---

## 4. Motion & Interaction Principles
- **Exploded View Sequence**:
  - Scrubbable 40-frame sequence rendered smoothly via HTML5 Canvas or synced RAF engine.
  - Hover / cursor-position / scrub triggers forward frame transition (`0 -> 39`) showing internal components:
    - Outer Shell
    - Ear Cushion
    - Acoustic Mesh
    - 40mm Graphene Driver
    - ANC Dual-Core DSP Electronics
    - High-Density Battery
    - Extruded Aluminium Frame
  - Mouse leave reverses frames back smoothly (`39 -> 0`).
  - Subtle interactive engineering callout pins appear at peak separation with hairline leader lines.
- **Audio Visualizer Simulation**: Interactive real-time canvas frequency visualizer reacting to ambient noise cancellation modes (Adaptive ANC, Spatial Audio, Transparency).
- **Spring Physics & Timing**:
  - Micro-interactions: `180ms - 240ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Section transitions: subtle stagger, parallax depth on hardware renders.
  - Respects `prefers-reduced-motion` with graceful degradation to high-contrast static states.

---

## 5. Responsive Behavior
- **Desktop (1280px - 1920px)**: Full cinematic experience, mouse-scrubbed exploded view with interactive HUD markers.
- **Tablet (768px - 1024px)**: Adaptive horizontal flow, interactive touch-scrub slider for exploded component view.
- **Mobile (375px - 640px)**: Compact vertical hierarchy, touch swipe or tap-to-explode toggle, 44px+ hit targets.
