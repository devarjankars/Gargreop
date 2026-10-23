# Sonu Garg — Analytics Portfolio

A responsive, ivory-and-forest editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide icons. Requires Node.js 20.9+ (validated with Node 24).

## Run locally

```bash
cd /workspace/Gargreop
npm ci
npm run dev
```

Open the development server on port 3000 in your local development environment.

## Production

```bash
npm run build
npm run typecheck
npm start
```

Deploy to a Node-compatible host or import the repository into Vercel. No API keys, database, or external font service are required. Commit `package-lock.json` for repeatable installations.

## Structure

- `app/page.tsx`: server-rendered page sections and professional content.
- `app/layout.tsx`: page metadata and root layout.
- `app/globals.css`: Tailwind import, design tokens, responsive components, animation, and reduced-motion overrides.
- `components/interactive.tsx`: client-only navigation, counters, project filters, expandable experience, assistant simulation, and email copy action.
- `components/signal-sculpture.tsx`: original CSS 3D ribbon sculpture with pointer tilt, pause control, and reduced-motion support.
- `components/project-artwork.tsx`: six original project illustrations, not internal product screenshots.
- `lib/data.ts`: project, approach, contribution, and experience data.
- `public/Sonu-Garg-Resume.pdf`: downloadable résumé provided by the portfolio owner.

## Customize

Edit `lib/data.ts` for projects and career history, and `app/page.tsx` for skills, contact details, recognition, and education. Adjust colors and layouts in `app/globals.css`. Update title and description in `app/layout.tsx` before deployment.

The audit assistant is a deterministic simulation with fictional names and records, not an LLM or IA3 integration. It makes no network requests. To connect a real service, implement a server-side route with authentication, authorization, input validation, rate limits, and approved data access; never expose audit data or model credentials in browser code.

The 40% impact metric refers to recurring report preparation time. Dap’er’s separate project metric refers to manual follow-up effort. Certification labels reflect the supplied CV; confirm exact credentials and issuers before publication.

## Verification

Run `npm run build` and `npm run typecheck`. For interaction checks, use the project filters, expand each employer, submit HR/Finance/Payroll sample questions, test unsupported input, and exercise mobile navigation. Test keyboard focus, email links, and reduced-motion preferences. The demo response intentionally has a short simulated delay.

## Design direction

The “clarity engine” visual identity uses warm ivory, forest green, sage, and restrained lime accents. Large editorial type, dimensional data ribbons, illustrated project stories, and a contrasting forest-green AI section connect the visual design to analytics and risk. No stock images, WebGL, third-party fonts, or animation packages are needed.

Project outcome buttons expand the documented approach and contribution. The sculpture pause button stops its rotation; reduced-motion settings also disable rotation, pointer tilt, decorative movement, and scroll animations. The original portfolio owner’s résumé is available through the two download links; replace the PDF to update it.

Validated in headless Chromium at 1440, 1024, 768, 390, and 320px: no horizontal overflow; filters, expandable project stories, HR/Finance demo answers and fallback, experience timeline, mobile navigation and Escape, PDF delivery, and reduced-motion behavior all pass without browser errors.
