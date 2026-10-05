# Design System & Aesthetic Specification
**Version:** 1.0  
**Last Updated:** 2026-09-21

---

## 1. Inspiration & Motion Philosophy
- **Reference Website:** [WHP Creative](https://www.whpcreative.com/)
- **Core Aesthetic:** Instrument-grade dark canvas balancing focused electric/royal blue structures against high-energy warm amber accents.
- **Motion Philosophy:** Smooth, deliberate, cinematic — every animation serves a purpose. No gratuitous movement.

---

## 2. Color System Tokens (60-30-10 Harmonic Rule)

### 60% — Dark Ground (Base Canvas)
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0B0E14` | Deep Slate Charcoal — main page background |
| `--bg-container-1` | `#141B2B` | Container Low (Level 1) — cards, panels |
| `--bg-container-2` | `#191F2F` | Container Mid (Level 2) — elevated cards |
| `--bg-container-3` | `#232A3A` | Container High (Level 3) — modals, overlays |

### 30% — Structural Blue Core Spectrum
| Token | Value | Usage |
|---|---|---|
| `--blue-electric` | `#3B82F6` | Electric Blue — primary interactive elements |
| `--blue-royal` | `#2563EB` | Royal Blue — hover states, deeper accents |
| `--blue-glow` | `rgba(59, 130, 246, 0.15)` | Subtle muted glow — borders, shadows |
| `--blue-muted` | `rgba(59, 130, 246, 0.08)` | Very subtle — background tints |

### 10% — Amber Spark Accent (Focus Triggers)
| Token | Value | Usage |
|---|---|---|
| `--amber-warm` | `#F59E0B` | Warm Amber — primary accent, CTAs |
| `--amber-deep` | `#D97706` | Deep Gold — hover states |
| `--amber-spark` | `#FBBF24` | Highlight Spark — active states, indicators |

### Text Colors
| Token | Value | Usage |
|---|---|---|
| `--text-primary` | `#F0F0F5` | Primary text — headlines, body |
| `--text-secondary` | `#94A3B8` | Secondary text — descriptions, subtitles |
| `--text-tertiary` | `#64748B` | Tertiary text — metadata, timestamps |
| `--text-muted` | `#475569` | Muted text — placeholders, disabled |

### Border & Surface
| Token | Value | Usage |
|---|---|---|
| `--border-default` | `rgba(59, 130, 246, 0.12)` | Default border — cards, dividers |
| `--border-hover` | `rgba(59, 130, 246, 0.25)` | Hover border — interactive elements |

---

## 3. Depth Elevation Stack (Dark Hierarchy)
| Level | Background | Border | Shadow |
|---|---|---|---|
| Level 0 | `#0B0E14` | none | none |
| Level 1 | `#141B2B` | `--border-default` | `0 2px 8px rgba(0,0,0,0.3)` |
| Level 2 | `#191F2F` | `--border-default` | `0 4px 16px rgba(0,0,0,0.4)` |
| Level 3 | `#232A3A` | `--border-hover` | `0 8px 32px rgba(0,0,0,0.5)` |

---

## 4. Typography

### Font Stack
| Role | Font | Fallback | Weight | Tracking |
|---|---|---|---|---|
| Headings | Inter | system-ui, sans-serif | 700 (Bold) | `-0.03em` |
| Body | Inter | system-ui, sans-serif | 400 (Regular) | `0` |
| Metadata / Code | JetBrains Mono | monospace | 400 | `0.05em` |
| Category Tags | JetBrains Mono | monospace | 500 | `0.1em` |

### Type Scale
| Element | Size | Line Height |
|---|---|---|
| Hero Headline | `clamp(3rem, 10vw, 8rem)` | `0.9` |
| Section Title | `clamp(2rem, 5vw, 4rem)` | `1.1` |
| Subtitle | `clamp(1.125rem, 2vw, 1.5rem)` | `1.5` |
| Body | `1rem` / `1.125rem` | `1.6` |
| Caption / Meta | `0.75rem` / `0.875rem` | `1.4` |

---

## 5. Spacing Scale
Base unit: `4px`

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-24` | `96px` |
| `--space-32` | `128px` |

---

## 6. Easing Functions
| Name | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | General transitions |
| `--ease-in-out` | `cubic-bezier(0.76, 0, 0.24, 1)` | Layout shifts |
| `--ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Hero animations |

---

## 7. UI Components & Micro-Interactions

### Shader Effects
- **LiquidMetal:** Shader canvas on active buttons (`@paper-design/shaders-react`). Colors tuned to blue-to-amber gradient.
- **MeshGradient:** Hero overlay with deep blue/indigo tones.
- **NeuroNoise:** Contact section background accent.

### 3D Image Corridor (`ImageStreamHero`)
- Infinite 3D perspective corridor with dual keyframe tracks.
- `perspective: 1200px` on container.
- Images arranged in two rows flowing in opposite directions.
- `container-type: inline-size` for responsive `cqw` scaling.

### Micro-Interactions
- Button hover: scale(1.02) + blue glow shadow.
- Card hover: translateY(-4px) + border color transition.
- Input focus: blue border glow with `box-shadow`.
- Link hover: underline slide-in from left.
