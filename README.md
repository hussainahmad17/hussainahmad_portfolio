# Hussain Ahmad — AI Software Engineer

Personal portfolio. Next.js 16 (App Router), React 19, TypeScript in strict mode, Tailwind CSS v4, MDX. Built to deploy on Vercel.

Statically prerendered end to end, with four client components and no animation library — scroll reveals and the hero schematic are CSS.

**Live:** _set `NEXT_PUBLIC_SITE_URL` once a domain is attached_

---

## Contents

- [Quick start](#quick-start)
- [Editing content](#editing-content)
- [Project structure](#project-structure)
- [Publishing an article](#publishing-an-article)
- [Environment variables](#environment-variables)
- [Deployment to Vercel](#deployment-to-vercel)
- [Verification](#verification)
- [Design system](#design-system)
- [Before you share your repositories](#before-you-share-your-repositories)

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local development
npm run dev                  # http://localhost:3000
```

Requires Node.js 20 or newer (22 recommended — CI uses 22).

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | Lint, typecheck and build — run this before pushing |

---

## Editing content

**No personal fact is hard-coded into a component.** Everything a visitor reads lives in `src/data`, typed against `src/types/index.ts`. To change the site, edit data — not JSX.

| What | File |
| --- | --- |
| Name, title, contact, links, availability | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Technical stack | `src/data/stack.ts` |
| AI engineering capabilities | `src/data/capabilities.ts` |
| Principles and process steps | `src/data/process.ts` |
| Currently exploring | `src/data/now.ts` |
| Work experience | `src/data/experience.ts` |
| Education | `src/data/education.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Article registry | `src/data/writing.ts` |

### Sections hide themselves when they have no data

`experience`, `education` and `testimonials` are empty arrays. Their sections do not render at all — the site never shows a visitor a placeholder or an invented claim. Fill an array in and the section appears.

The same applies to individual fields: `site.email`, `site.resumeUrl`, `site.photo` and `site.twitter` are `null`, and every surface that consumes them degrades gracefully rather than rendering a dead link or a broken image.

**`PROJECT_INFO.md` lists everything still marked `[REQUIRED]` or `[CONFIRM]`, in priority order.** Start there.

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. TypeScript enforces the shape. Set `featured: true` to place it on the homepage. The case-study route, sitemap entry, metadata and JSON-LD are all generated from it — no other file needs touching.

The `architecture.layers` array drives both the full diagram on the case study and the schematic thumbnail on the project card, so a new project has a usable visual immediately, without a screenshot.

### Adding screenshots

Drop images in `public/projects/<slug>/` and reference them in the project's `images` array:

```ts
images: [{ src: "/projects/cogniflow/chat.png", alt: "CogniFlow answering with cited sources" }],
```

The first image replaces the generated schematic on cards and case-study headers. Use real screenshots only — the generated schematic is an honest abstraction, and a mocked-up screenshot is not.

---

## Project structure

```
src/
  app/
    (routes)              home, work, projects/[slug], ai-engineering,
                          about, writing, contact
    api/contact/          contact form handler
    sitemap.ts            generated from the data layer
    robots.ts             blocks indexing on preview deployments
    opengraph-image.tsx   social card, generated at build time
  components/
    contact/              contact form (client)
    layout/               header, footer
    projects/             case study, project card, architecture diagram
    sections/             composable homepage sections
    ui/                   button, section, tag, reveal, status pill
  data/                   all portfolio content
  lib/                    metadata, structured data, validation, helpers
  types/                  content types
```

Server Components by default. Only four are client components: the header (menu state), the reveal wrapper, the contact form, and the error boundary. The hero and architecture diagrams are server-rendered and animate in CSS.

---

## Publishing an article

The writing section is fully wired but deliberately has nothing published — the index shows an honest empty state plus the essays in progress, rather than filler.

To publish one:

1. Create `src/app/writing/(articles)/<slug>/page.mdx`
2. Export metadata from it:

   ```tsx
   export const metadata = {
     title: "Designing Reliable AI Agents",
     description: "Why agent failures are control-flow failures.",
   };
   ```

3. Update the matching entry in `src/data/writing.ts`:

   ```ts
   status: "published",
   date: "2026-10-02",
   readingTime: "8 min read",
   ```

The registry is the source of truth for the index and the sitemap. Article typography comes from `.prose-article` in `globals.css`; internal links are routed through `next/link` by `src/mdx-components.tsx`.

---

## Environment variables

Copy `.env.example` to `.env.local` locally, and set the same keys in Vercel.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in Production | Canonical origin for canonical tags, sitemap, robots and Open Graph. Falls back safely when absent — see below. |
| `RESEND_API_KEY` | For email | API key from [resend.com](https://resend.com). |
| `RESEND_FROM_EMAIL` | For email | Verified sender address. |
| `CONTACT_TO_EMAIL` | For email | Inbox that receives contact-form messages. |

**If the email variables are absent, nothing pretends to work.** The API route logs a clear server-side error and returns `503`; the form shows the failure and offers a direct email link instead. It never reports success for a message that was not sent.

`NEXT_PUBLIC_SITE_URL` is optional everywhere. Resolution order, with every step validated:

1. `NEXT_PUBLIC_SITE_URL`, if set to something parseable
2. Vercel's deployment URL — the stable production domain on production builds, the ephemeral deployment URL otherwise
3. `site.url` in `src/data/site.ts`

A value that is empty, whitespace, missing its scheme, or has a trailing slash or path is handled rather than trusted: blank and unparseable values fall through to the next step, and valid ones are reduced to a bare origin. The resolved value is therefore always a usable absolute URL, which `metadataBase`, the sitemap and `robots.txt` all require.

---

## Deployment to Vercel

```
Local development  →  GitHub  →  Vercel  →  Production
```

### 1. Push to GitHub

```bash
git init                       # if not already a repository
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/hussainahmad17/<repo-name>.git
git push -u origin main
```

Confirm no `.env` file is staged: `git status --short | grep env` should show only `.env.example`.

### 2. Create the Vercel project

1. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
2. Vercel detects **Next.js** automatically.
3. Leave the build settings at their defaults:
   - Framework preset: `Next.js`
   - Build command: `next build`
   - Output directory: `.next` (managed by Vercel)
   - Install command: `npm install`

No `vercel.json` is needed. Everything the platform requires is inferred, and security headers are set in `next.config.ts`.

### 3. Set environment variables

In **Project Settings → Environment Variables**, add:

| Name | Environments |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production |
| `RESEND_API_KEY` | Production, Preview |
| `RESEND_FROM_EMAIL` | Production, Preview |
| `CONTACT_TO_EMAIL` | Production, Preview |

`NEXT_PUBLIC_SITE_URL` is inlined at build time, so **redeploy after changing it**.

With the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env pull .env.local      # sync into local development
```

### 4. Deploy

Pushing to `main` deploys to production. Every pull request gets a preview URL. Manually:

```bash
vercel           # preview
vercel --prod    # production
```

### 5. Add a domain

**Project Settings → Domains → Add.** Point the DNS records Vercel shows at your registrar, then set `NEXT_PUBLIC_SITE_URL` to the final origin (for example `https://hussainahmad.dev`) and redeploy so canonical URLs, the sitemap and Open Graph tags all use it.

### 6. Verify the deployment

- [ ] Every route loads: `/`, `/work`, `/projects/cogniflow`, `/ai-engineering`, `/about`, `/writing`, `/contact`, and a 404 on a nonsense path
- [ ] `/{sitemap.xml}` lists your production domain, not `localhost` — check `https://your-domain.com/sitemap.xml`
- [ ] `https://your-domain.com/robots.txt` allows crawling (previews correctly disallow it)
- [ ] `https://your-domain.com/opengraph-image` renders the social card
- [ ] The contact form sends and the message arrives
- [ ] Mobile navigation opens, closes on selection and closes on `Escape`
- [ ] Lighthouse on the deployed URL, not on localhost

### Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Build fails on a type error | Type errors deliberately fail the build. Run `npm run typecheck` locally. Never set `typescript.ignoreBuildErrors`. |
| Canonical URLs show the wrong domain | `NEXT_PUBLIC_SITE_URL` is unset or stale. Set it and **redeploy** — it is inlined at build time. |
| `TypeError: Invalid URL` during `Collecting page data` | An environment variable exists but is empty. Fixed in `src/data/site.ts`: blank and unparseable origins now fall through to the next candidate instead of reaching `new URL()`. If you see this again, a *different* `new URL()` call is being handed an unvalidated value. |
| Contact form returns 503 | Email is not configured. Set all three Resend variables and redeploy. |
| Contact form returns 502 | Resend rejected the message — usually an unverified sender domain. Check `RESEND_FROM_EMAIL`. |
| Site is not being indexed | Preview deployments block crawlers by design. Confirm you are checking the production domain. |
| Fonts look wrong | Geist is self-hosted through the `geist` package. Confirm `npm ci` completed and that `geist` is in `dependencies`. |
| Images 404 | Files under `public/` are served from the path after `public` — `public/projects/x/a.png` is `/projects/x/a.png`. |

---

## Verification

```bash
npm run verify   # lint + typecheck + build
npm run build && npm run start   # exercise the production build at :3000
```

CI (`.github/workflows/ci.yml`) runs the same three steps on every push and pull request.

---

## Design system

Tokens are defined once in `src/app/globals.css` under `@theme`:

- **Canvas** `#08090b`, surfaces `#0d0f13` → `#171b21`
- **Accent** `#5ef2c0`, used for state and emphasis only — never as decoration
- **Type** Geist Sans and Geist Mono, self-hosted (no external requests, no layout shift)
- **Scale** fluid `clamp()` values for display, h1, h2 and h3

To rebrand, change the tokens. Nothing downstream hard-codes a colour.

Accessibility choices that are load-bearing:

- `prefers-reduced-motion` is honoured in CSS in one place: reveals become immediately visible and the hero flow animation is removed entirely
- Visible focus rings via `:focus-visible`, with a skip link to `#main`
- The architecture diagrams are real DOM, not images: they scale with font size and are readable by a screen reader as an ordered list of layers
- Form fields have real labels, `aria-invalid`, and errors tied by `aria-describedby`

---

## Before you share your repositories

A reviewer who reads this site will open your GitHub. Two things to fix first:

1. **`Support-Issue-Tracker` has `backend/.env` and `frontend/.env` committed.** Rotate any credentials in them, then:

   ```bash
   git rm --cached backend/.env frontend/.env
   echo ".env" >> .gitignore
   git commit -m "Remove committed environment files"
   ```

   Deleting them in a new commit does **not** remove them from history — anyone can still read them. Purge with [`git filter-repo`](https://github.com/newren/git-filter-repo) and force-push, and assume every secret they contained is compromised until rotated.

2. **Add a README to each featured repository.** The case studies here link to source; a repo whose README is still the `create-next-app` default undercuts the case study pointing at it.

---

## License

Code is available for reference. Content, copy and project write-ups are © Hussain Ahmad.
