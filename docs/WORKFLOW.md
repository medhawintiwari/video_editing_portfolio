# Build Workflow & Progress Tracker
**Last Updated:** 2026-09-21

---

## Phase 1: Project Scaffolding & Documentation
- [x] Create Next.js project with TypeScript + Tailwind CSS v4
- [x] Create `docs/PDR.md`
- [x] Create `docs/DESIGN.md`
- [x] Create `docs/ARCHITECTURE.md`
- [x] Create `docs/WORKFLOW.md`
- [ ] Install all project dependencies

## Phase 2: Design System & Core Infrastructure
- [ ] Implement `globals.css` with full design token system
- [ ] Create `lib/utils.ts` with `cn()` utility
- [ ] Define TypeScript interfaces in `types/index.ts`

## Phase 3: UI Primitives (`/components/ui/`)
- [ ] `liquid-metal-button.tsx` — shader-powered CTA button
- [ ] `image-stream-hero.tsx` — 3D corridor background
- [ ] `Button.tsx` — standard button component
- [ ] `SplitText.tsx` — GSAP text reveal animation
- [ ] `CustomCursor.tsx` — custom desktop cursor
- [ ] `VideoModal.tsx` — video preview modal

## Phase 4: Layout Components (`/components/layout/`)
- [ ] `Header.tsx` — fixed navigation with mobile menu
- [ ] `Footer.tsx` — site footer
- [ ] `Section.tsx` — reusable section wrapper
- [ ] `SmoothScroll.tsx` — Lenis smooth scroll provider

## Phase 5: Section Components (`/components/sections/`)
- [ ] `Hero.tsx` — hero with corridor + shader overlay
- [ ] `WorkGallery.tsx` — dual-layout work showcase
- [ ] `Experience.tsx` — timeline + skill proficiency
- [ ] `Contact.tsx` — inquiry form + shader accent

## Phase 6: Data Layer (`/data/`)
- [ ] `personal.ts` — personal/brand information
- [ ] `projects.ts` — video project entries
- [ ] `navigation.ts` — navigation links

## Phase 7: App Shell & Pages
- [ ] `app/layout.tsx` — root layout with fonts, Header, Footer
- [ ] `app/page.tsx` — home page assembly

## Verification
- [ ] `npm run build` passes without errors
- [ ] Visual verification in browser
- [ ] Responsive behavior check
- [ ] `prefers-reduced-motion` behavior check
