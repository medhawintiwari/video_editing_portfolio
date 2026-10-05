# System Architecture & Technical Guidelines
**Version:** 1.0  
**Last Updated:** 2026-09-21

---

## 1. Tech Stack
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Component Primitives | shadcn/ui conventions | — |
| Shaders & FX | `@paper-design/shaders-react` | 0.x |
| Animation | GSAP + `@gsap/react` | 3.x |
| Smooth Scroll | Lenis | 1.x |
| Icons | `lucide-react` | latest |
| Utilities | `clsx`, `tailwind-merge` | latest |

---

## 2. Mandatory Project Structure

> **CRITICAL:** All core UI primitives MUST reside strictly in `/components/ui/` to guarantee compatibility with `shadcn` CLI generators and path resolution aliases (`@/components/ui/*`).

```
src/
├── app/
│   ├── globals.css          # Design tokens & base styles
│   ├── layout.tsx           # Root layout (fonts, Header, Footer)
│   ├── page.tsx             # Home page (Hero, Work, Experience, Contact)
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Fixed navigation bar
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Section.tsx      # Reusable section wrapper
│   │   └── SmoothScroll.tsx # Lenis smooth scroll provider
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with ImageStreamHero + shaders
│   │   ├── WorkGallery.tsx  # Dual-layout work showcase
│   │   ├── Experience.tsx   # Timeline + skills
│   │   └── Contact.tsx      # Contact form + shader accent
│   └── ui/
│       ├── liquid-metal-button.tsx  # Shader-powered CTA button
│       ├── image-stream-hero.tsx    # 3D corridor component
│       ├── Button.tsx               # Standard button
│       ├── SplitText.tsx            # GSAP text reveal
│       ├── CustomCursor.tsx         # Custom desktop cursor
│       └── VideoModal.tsx           # Video preview modal
├── data/
│   ├── personal.ts          # Personal/brand info
│   ├── projects.ts          # Video project entries
│   └── navigation.ts        # Nav link configuration
├── lib/
│   └── utils.ts             # cn() utility (clsx + twMerge)
├── types/
│   └── index.ts             # TypeScript interfaces
docs/
├── PDR.md                   # Product requirements
├── DESIGN.md                # Design system spec
├── ARCHITECTURE.md          # This file
└── WORKFLOW.md              # Build progress tracking
```

---

## 3. Component Hierarchy

```
RootLayout
├── CustomCursor
├── SmoothScroll
│   ├── Header (fixed)
│   ├── Main
│   │   ├── Hero
│   │   │   ├── ImageStreamHero (3D corridor BG)
│   │   │   ├── MeshGradient (shader overlay)
│   │   │   ├── SplitText (headline reveal)
│   │   │   └── LiquidMetalButton (CTA)
│   │   ├── WorkGallery
│   │   │   ├── CategoryFilterTabs
│   │   │   ├── LayoutToggle (Grid/Reel)
│   │   │   ├── ProjectCard[] (grid or horizontal)
│   │   │   └── VideoModal (on card click)
│   │   ├── Experience
│   │   │   ├── Timeline
│   │   │   └── SkillBars
│   │   └── Contact
│   │       ├── InquiryForm
│   │       └── NeuroNoise (shader BG)
│   └── Footer
```

---

## 4. Shader Integration Rules

### General Rules
1. All shader components must be rendered in **client components** (`"use client"` directive).
2. Shader canvases fill their parent container — parent MUST have defined dimensions.
3. Set `speed={0}` when `prefers-reduced-motion` is active.
4. Pin `@paper-design/shaders-react` version in `package.json`.

### LiquidMetalButton
- Place in `components/ui/liquid-metal-button.tsx`.
- Uses `LiquidMetal` shader as canvas backdrop behind button text.
- WebGL context cleanup handled automatically by React unmount.

### ImageStreamHero
- Place in `components/ui/image-stream-hero.tsx`.
- CSS-only animation (no WebGL) — uses `@keyframes` for corridor flow.
- `container-type: inline-size` for `cqw` responsive scaling.
- `prefers-reduced-motion`: freeze at 50% keyframe state.

---

## 5. Dependencies

```bash
npm install @paper-design/shaders-react clsx lucide-react tailwind-merge gsap @gsap/react lenis framer-motion @radix-ui/react-slot class-variance-authority
```

---

## 6. Import Aliases
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Usage: `import { cn } from "@/lib/utils"`
