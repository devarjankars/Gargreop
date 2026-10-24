# Sonu Garg — Analytics Portfolio

An editorial portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Lucide icons, and Three.js. Midnight blue, periwinkle, warm apricot, and pale lavender connect the visual identity to analytics and AI. Requires Node.js 20.9+; validated with Node 24.

## Development

```bash
npm ci
npm run dev
```

The development server uses port 3000. No database, API keys, or remote font service is required.

## Production

```bash
npm run build
npm run typecheck
npm start
```

Deploy to a Node-compatible host or import the repository into Vercel. The lockfile is committed for repeatable installs. Manrope Variable and Lora Variable Italic are self-hosted with `next/font/local` from the installed Fontsource packages, including their licenses.

## Structure

- `app/page.tsx`: professional content and server-rendered sections.
- `app/layout.tsx`: metadata, local fonts, intro, and ambient motion.
- `app/globals.css`: base layouts, illustrations, responsive styling, and animation foundations.
- `app/refinements.css`: current theme, bolder typography, responsive loader, cursor effects, and scroll depth.
- `components/arrival.tsx`: skippable native-dialog introduction.
- `components/hero-copy.tsx`: coordinated animated headline and perspective controls.
- `components/interactive.tsx`: navigation, independently observed impact counters, project filters and case-study selection, timeline, assistant demo, and contact copy.
- `components/ambient-motion.tsx`: fading cursor constellation, tap ripples, contextual cursor, project tilt, and scroll-driven sculpture depth.
- `components/signal-journey.tsx`: scroll-linked Data → Context → Clarity story.
- `components/scroll-compass.tsx`: desktop chapter rail and touch-friendly section guide.
- `app/discovery.css`: discovery interactions and responsive story layouts.
- `components/signal-sculpture.tsx`: interactive WebGL intelligence core, AI/Risk/Data views, pause control, and matching rendered-poster fallback.
- `lib/intelligence-scene.ts`: procedural Three.js geometry, lighting, materials, local reflection environment, animation lifecycle, and disposal.
- `app/intelligence.css`: responsive sculpture composition and controls.
- `components/project-artwork.tsx`: original illustrative project visuals, not internal screenshots.
- `components/brand-star.tsx`: platform-independent SVG identity mark.
- `lib/data.ts`: project descriptions, contributions, approaches, and career history.
- `public/Sonu-Garg-Resume.pdf`: owner-provided downloadable résumé.

## Motion and mobile behavior

The intro runs on each full page load, including reloads. It shows Data → Context → Clarity, then exits in about 1.8 seconds. It uses a safe-area-aware, three-row viewport layout that fits portrait and landscape mobile screens. Skip intro and Escape close it immediately. Its decorative progress line is an introduction sequence, not a measurement of asset download progress. Reduced-motion users skip the intro, and with JavaScript disabled a noscript fallback hides it and leaves the page visible and scrollable.

The headline rotates every 3.4 seconds with a 520ms slide and shorter opacity crossfade. Manual selection pauses autoplay; the play/pause control resumes or stops it. The screen-reader heading stays stable. The main Manrope text is semibold; the variable Lora italic headline uses a real 600 weight. Words and descriptions reserve layout space.

Each metric observes its own visibility and counts for about 1.25 seconds on viewport entry. They replay on re-entry, finish at their true values, and render those final values in server HTML. Counters sit outside the parent scroll-reveal wrapper. Reduced-motion preferences and unavailable JavaScript leave the true numbers visible rather than zero.

The cursor halo and pointer-driven project tilt run only on fine-pointer devices. The native cursor remains available. Scroll adds a small smoothed lift and rotation to the sculpture composition on both desktop and mobile. All ambient effects use event-driven requestAnimationFrame scheduling; they stop when settled. Reduced-motion mode disables the cursor halo, tilt, scroll depth, and decorative animation.

## Content and privacy

Update `lib/data.ts` for projects and career details, `app/page.tsx` for remaining content, and the PDF for résumé changes. The assistant is a deterministic demo with fictional records. It makes no network requests and has no live IA3 or LLM access. A real integration requires a server-side authenticated route and approved audit-data access; never put model credentials or confidential audit records in browser code.

The 40% impact metric refers to report preparation time. Dap’er’s separate 40% metric refers to manual follow-up effort. Certification labels reflect the supplied CV; confirm exact issuers and titles before publication.

## Validation

Production build and TypeScript checks pass. Chromium touch emulation at 390×844, 375×667, 320×568, and 844×390 verifies intro placement, dismissal without scroll jumps, replay on reload, visible counter transitions and re-entry, all headline words fitting, and no custom touch cursor. Desktop checks cover the cursor halo, hover response, card tilt, scroll depth, and reduced-motion overrides. Reduced-motion and no-JavaScript checks verify the true final metric values. These are browser-emulation checks, not physical iPhone/Safari certification.

## Signal discovery interactions

The desktop cursor leaves a short constellation trail and shows contextual OPEN or VIEW labels over actionable controls. A bounded canvas particle pool (at most 40 particles) fades after movement stops; the render loop sleeps when there is nothing to update. The canvas is capped at 1.5 device pixels per CSS pixel, stays pointer-transparent, and clears when the tab becomes hidden. Native cursors, keyboard navigation, links, and scrolling remain available.

Touch devices use a brief tap ripple instead of a mouse follower. Pointer cancellation distinguishes native pan gestures from taps, and input fields are excluded. No sensor access, device permissions, or gesture interception is used.

The Method section traces an illustrated signal from Data to Context to Clarity as the visitor scrolls. On taller screens, the story panel briefly sticks while the page scrolls normally. At heights of 640px or less, it becomes an ordinary flowing section and still updates the path with scroll. Reduced-motion and no-JavaScript modes keep all three stages readable without pinning.

A desktop chapter rail tracks page progress and links directly to sections. Narrow screens and coarse-pointer devices get a compact bottom guide with the current chapter and a next-section link. The guide stays inert and outside keyboard navigation until it becomes visible; footer spacing leaves room for it.

Browser checks verify drawn cursor-trail pixels and their expiry, contextual labels, all three story stages, chapter anchors, touch-ripple drawing and expiry, no mobile follower, and story bounds at 390×844, 375×667, 320×568, and 844×390. No horizontal overflow or browser errors were observed. Reduced-motion and no-JavaScript story fallbacks are checked separately.

## Executive portfolio structure

The page now follows an evidence-first reading order: introduction → executive brief → selected case studies → AI demonstration → working method → career experience → expertise and credentials → contact. The header and chapter guide follow that order.

`components/executive-brief.tsx` combines the verified 11+ years / 50–60 audits / 40% report-preparation metrics with an asymmetrical profile layout: current BI leadership at Accenture, fraud-risk coverage across four business functions, and two analysts directly managed and mentored. Its detail links lead to career history, expertise, and the résumé.

The project collection is an interactive case-study navigator instead of a repeated card grid. Six selectable projects retain category filtering. The selected case shows its actual name, context, approach, contribution, delivered outcome, and tech stack. The audit assistant case links directly to the clearly labeled simulation; other cases link to contact. Selection is manual, keyboard-accessible, and announced through a short status message. On mobile, the case index scrolls horizontally with native touch scrolling. A no-JavaScript fallback includes the remaining five projects below the featured first case.

`app/portfolio.css` contains these structural layouts. Case names and contexts are maintained alongside the existing project data in `lib/data.ts`. All earlier cursor, tap, scroll, loader, and counter behaviors remain available.

Verified with the production build, TypeScript, and Chromium browser checks: reading order, all six selections, category defaults, keyboard selection, AI demo anchor, HR demo response, chapter order, touch selection and horizontal index, main navigation, résumé response, reduced-motion selection, no-JavaScript project content, and no overflow at 320, 390, 768, 1024, and 1440px.

## Portrait feature

The executive brief includes a portrait-oriented image in a cut-corner frame, a layered backplate, and a navy nameplate. Desktop places it beside the introduction; mobile stacks a smaller portrait above the copy. `next/image` uses a static import, responsive sizes, a blur placeholder, and default lazy loading. The local WebP is approximately 91 KB at 960×1200, with Next.js generating device-sized variants. Hover scaling is disabled for reduced-motion users.

The asset at `public/images/sonu-garg-portrait.webp` is an AI-assisted portrait crop prepared from the image supplied in chat. To use a different or original photographic crop, replace that file and rebuild; the responsive framing is controlled in `app/portfolio.css`. The original generated working image remains outside the repository.

Validated portrait loading through the Next.js optimizer, nameplate bounds, local WebP delivery, reduced-motion hover, and no horizontal overflow at 320, 390, 768, 1024, and 1440px. Existing GitHub cursor updates were retained.

## First-paint intro timing

The introduction is visible in the initial server-rendered HTML instead of waiting for a client effect to open it. The document starts with `data-arrival="pending"`; first-paint styles place the intro over the landing page and hold the hero entrance animation. Hydration removes the dialog’s initial non-modal open state and immediately promotes it with `showModal()` in the same JavaScript task. This preserves native modal focus behavior without a paint gap. The intro’s decorative progress line waits until hydration starts the sequence.

Reduced-motion CSS bypasses the intro before JavaScript arrives. A noscript style restores the hero and normal page scrolling when JavaScript is disabled. Deliberately delayed-bundle browser checks on desktop and touch-mobile sampled the initial render and modal handoff without observing a landing-page flash, browser error, or hydration warning. Intro completion, reload/skip, Escape, no-JavaScript scrolling, and reduced-motion first paint also pass.

## Intelligence core / hero sculpture

The original CSS ribbon sphere has been replaced by an original, procedural Three.js sculpture: an iridescent torus knot around a faceted core, two orbital signal planes, and small satellite forms. Local RoomEnvironment reflections, directional lighting, clearcoat, and iridescence give the object its metallic finish. No GLB model, HDR texture, external asset service, or API credential is needed.

AI, Risk, and Data controls change the actual 3D material palette and orientation. Desktop pointer movement adds restrained perspective response. Pause freezes the current pose rather than resetting it. Reduced-motion users get a static rendered view and can still select a perspective manually. A poster rendered from the actual 3D model is included immediately in HTML, including without JavaScript; Three.js is dynamically imported after the introduction and when the sculpture is visible. If WebGL2 is unavailable or the context is lost, the rendered poster remains usable and labels/controls continue to work.

Geometry is bounded (one 192×24 torus knot, a small faceted core, two thin orbits, and 32 points). Pixel ratio is capped at 1.5 on desktop and 1.25 on coarse-pointer devices, with GPU rendering limited to 30fps on coarse-pointer devices. Animation sleeps offscreen, in background tabs, while paused, and with reduced motion. ResizeObserver updates camera aspect and renderer size. Unmount disposes geometry, materials, reflection targets, renderer resources, observers, and event listeners.

Validation covers real WebGL rendering in Chromium with a software GPU, rendered-image changes for all three perspectives, pixel-stable pause, resume, touch controls, responsive sizing at 320–1440px, reduced-motion static rendering, WebGL-unavailable fallback, no-JavaScript poster artwork, and simulated context loss. Software-GPU browser testing is not a physical-device performance benchmark.

## Consistent sculpture startup and personal profile

The flat projected SVG has been replaced with three transparent WebP posters under `public/images/core/`. These were captured from the actual Three.js scene at its AI, Risk, and Data rest poses, using the same geometry, camera, lighting, and materials. A square source displayed with `object-fit: contain` matches the live camera’s vertical framing without stretching. The default poster is preloaded. The poster-to-canvas switch is atomic, so it does not blend two different silhouettes. The source scene checks its actual viewport bounds after the dynamic import and defers GPU initialization if the visitor has already scrolled away.

A delayed-scene-module browser test confirms the poster is visible before WebGL initializes. At a fixed rest pose, the poster and live renderer have matching opaque silhouette bounds and scale. No-JavaScript visitors get the same dimensional artwork.

The profile section now uses a cut-corner editorial photo card, location label, navy nameplate, and layered backplate. Its shorter first-person copy describes Sonu’s work at Accenture, analyst management, and prior roles at Commvault and Amazon. A compact example of the IA3 audit assistant links directly to the simulation. `app/profile.css` contains this treatment; the existing portrait asset is unchanged.

Validated build, TypeScript, delayed-renderer startup, static/live silhouette consistency, direct profile copy, demo link and response, photo/nameplate bounds at 320–1440px, mobile profile rendering, and no-JavaScript poster loading.
