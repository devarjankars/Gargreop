# Sonu Garg — Analytics Portfolio

An editorial portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Lucide icons. Midnight blue, periwinkle, warm apricot, and pale lavender connect the visual identity to analytics and AI. Requires Node.js 20.9+; validated with Node 24.

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
- `components/interactive.tsx`: navigation, independently observed impact counters, project filters and details, timeline, assistant demo, and contact copy.
- `components/ambient-motion.tsx`: fading cursor constellation, tap ripples, contextual cursor, project tilt, and scroll-driven sculpture depth.
- `components/signal-journey.tsx`: scroll-linked Data → Context → Clarity story.
- `components/scroll-compass.tsx`: desktop chapter rail and touch-friendly section guide.
- `app/discovery.css`: discovery interactions and responsive story layouts.
- `components/signal-sculpture.tsx`: original CSS 3D data-ribbon sphere, with pause control.
- `components/project-artwork.tsx`: original illustrative project visuals, not internal screenshots.
- `components/brand-star.tsx`: platform-independent SVG identity mark.
- `lib/data.ts`: project descriptions, contributions, approaches, and career history.
- `public/Sonu-Garg-Resume.pdf`: owner-provided downloadable résumé.

## Motion and mobile behavior

The intro runs on each full page load, including reloads. It shows Data → Context → Clarity, then exits in about 1.8 seconds. It uses a safe-area-aware, three-row viewport layout that fits portrait and landscape mobile screens. Skip intro and Escape close it immediately. Its decorative progress line is an introduction sequence, not a measurement of asset download progress. Reduced-motion users skip the intro, and with JavaScript disabled the dialog stays closed.

The headline rotates every 3.4 seconds with a 520ms slide and shorter opacity crossfade. Manual selection pauses autoplay; the play/pause control resumes or stops it. The screen-reader heading stays stable. The main Manrope text is semibold; the variable Lora italic headline uses a real 600 weight. Words and descriptions reserve layout space.

Each metric observes its own visibility and counts for about 1.25 seconds on viewport entry. They replay on re-entry, finish at their true values, and render those final values in server HTML. Counters sit outside the parent scroll-reveal wrapper. Reduced-motion preferences and unavailable JavaScript leave the true numbers visible rather than zero.

The cursor halo and pointer-driven project tilt run only on fine-pointer devices. The native cursor remains available. Scroll adds a small smoothed lift and rotation to the sculpture on both desktop and mobile. All ambient effects use event-driven requestAnimationFrame scheduling; they stop when settled. Reduced-motion mode disables the cursor halo, tilt, scroll depth, and decorative animation.

## Content and privacy

Update `lib/data.ts` for projects and career details, `app/page.tsx` for remaining content, and the PDF for résumé changes. The assistant is a deterministic demo with fictional records. It makes no network requests and has no live IA3 or LLM access. A real integration requires a server-side authenticated route and approved audit-data access; never put model credentials or confidential audit records in browser code.

The 40% impact metric refers to report preparation time. Dap’er’s separate 40% metric refers to manual follow-up effort. Certification labels reflect the supplied CV; confirm exact issuers and titles before publication.

## Validation

Production build and TypeScript checks pass. Chromium touch emulation at 390×844, 375×667, 320×568, and 844×390 verifies intro placement, dismissal without scroll jumps, replay on reload, visible counter transitions and re-entry, all headline words fitting, and no custom touch cursor. Desktop checks cover the cursor halo, hover response, card tilt, scroll depth, and reduced-motion overrides. Reduced-motion and no-JavaScript checks verify the true final metric values. These are browser-emulation checks, not physical iPhone/Safari certification.

## Signal discovery interactions

The desktop cursor leaves a short constellation trail and shows contextual OPEN or READ labels over actionable controls. A bounded canvas particle pool (at most 40 particles) fades after movement stops; the render loop sleeps when there is nothing to update. The canvas is capped at 1.5 device pixels per CSS pixel, stays pointer-transparent, and clears when the tab becomes hidden. Native cursors, keyboard navigation, links, and scrolling remain available.

Touch devices use a brief tap ripple instead of a mouse follower. Pointer cancellation distinguishes native pan gestures from taps, and input fields are excluded. No sensor access, device permissions, or gesture interception is used.

The Method section traces an illustrated signal from Data to Context to Clarity as the visitor scrolls. On taller screens, the story panel briefly sticks while the page scrolls normally. At heights of 640px or less, it becomes an ordinary flowing section and still updates the path with scroll. Reduced-motion and no-JavaScript modes keep all three stages readable without pinning.

A desktop chapter rail tracks page progress and links directly to sections. Narrow screens and coarse-pointer devices get a compact bottom guide with the current chapter and a next-section link. The guide stays inert and outside keyboard navigation until it becomes visible; footer spacing leaves room for it.

Browser checks verify drawn cursor-trail pixels and their expiry, contextual labels, all three story stages, chapter anchors, touch-ripple drawing and expiry, no mobile follower, and story bounds at 390×844, 375×667, 320×568, and 844×390. No horizontal overflow or browser errors were observed. Reduced-motion and no-JavaScript story fallbacks are checked separately.
