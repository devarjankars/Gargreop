# Sonu Garg — Analytics Portfolio

A responsive, dark-first portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide icons. Requires Node.js 20.9+ (validated with Node 24).

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
- `lib/data.ts`: project and experience data.

## Customize

Edit `lib/data.ts` for projects and career history, and `app/page.tsx` for skills, contact details, recognition, and education. Adjust colors and layouts in `app/globals.css`. Update title and description in `app/layout.tsx` before deployment.

The audit assistant is a deterministic simulation with fictional names and records, not an LLM or IA3 integration. It makes no network requests. To connect a real service, implement a server-side route with authentication, authorization, input validation, rate limits, and approved data access; never expose audit data or model credentials in browser code.

The 40% hero metric refers to recurring report preparation time. Dap’er’s separate project metric refers to manual follow-up effort. Certification labels reflect the supplied CV; confirm exact credentials and issuers before publication.

## Verification

Run `npm run build` and `npm run typecheck`. For interaction checks, use the project filters, expand each employer, submit HR/Finance/Payroll sample questions, test unsupported input, and exercise mobile navigation. Test keyboard focus, email links, and reduced-motion preferences. The demo response intentionally has a short simulated delay.
