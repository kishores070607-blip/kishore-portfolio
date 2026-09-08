# Kishore S — Cinematic Portfolio Redesign

Date: 2026-09-06
Branch: `260906-feat-cinematic-redesign`
Status: approved to build (user: “do what looks best and premium”, mobile-first)

## Goal

Replace the current demo portfolio with a premium hybrid-cinematic site: dark luxury 2D + restrained WebGL, rewritten content, Credify instead of Smart Dustbin. Local verify only — no GitHub push.

## Decisions

- 3D intensity: hybrid cinematic (hero + atmosphere, not a full 3D world)
- First load: no Enter gate; land on the 3D hero
- Palette: obsidian + champagne gold
- Engine: React Three Fiber + Drei + GSAP ScrollTrigger + Lenis
- Name: KISHORE S
- Content: fully rewritten to match the new UI
- Mobile: first-class layout, not a shrunk desktop

## Visual system

- Background: `#0C0B0A` (never pure `#000`)
- Ivory type: `#F4EFE6`
- Muted: `#9A9184`
- Gold accent: `#C9A86C` (hairlines, 3D metal, CTAs — not body copy)
- Display: Syne
- Body: Geist
- Labels: Geist Mono
- Effects: film grain, vignette, glass nav, gold hairlines
- Cursor: gold dot + lagging ring on fine pointers only
- Motion: Expo-out / power3; 1–2 animated focal points per view
- Reduced motion: freeze 3D, skip parallax, instant section jumps

## Architecture

Single Next.js App Router page. Server `page.tsx` composes client sections.

1. Hero — 3D gold torus-knot, identity, scroll cue
2. Work — Credify featured + three supporting projects
3. Path — Curious / Building / Exploring / Becoming (compact timeline)
4. Systems — skill groups; constellation on desktop, chips on mobile
5. Contact — email, GitHub, LinkedIn

Shared: Lenis + ScrollTrigger sync, grain overlay, custom cursor, progress bar, nav.

## 3D rules

- One WebGL canvas (hero only)
- `dpr` capped at 2 desktop / ~1.25 mobile
- Alpha canvas over CSS background
- PBR gold mesh + sparse particles (desktop ~1200, mobile ~400)
- Mouse/touch lerp tilt; no OrbitControls
- Dispose on unmount; pause loop when tab hidden
- Fallback: static gradient if WebGL fails

## Mobile

- Hero: canvas upper field + gradient fade; type sits in remaining viewport
- Nav: bottom dock, 44px targets, readable labels, safe-area padding
- Work: single-column cards; featured first
- Path: left-rail timeline, auto-height stages (not 85vh each)
- Systems: categorized chips (no absolute graph)
- No custom cursor; no horizontal overflow
- Breakpoints: 375 / 768 / 1024 / 1440

## Projects

1. Credify (featured, BUILT, 2026) — live + repo
2. Personal Cloud (BUILT, 2025)
3. Energy Monitor (BUILDING, 2026)
4. Personal Interface (BUILDING, 2026)

Smart Dustbin removed.

## Out of scope

- GitHub push
- CMS / blog / extra routes
- Light mode
