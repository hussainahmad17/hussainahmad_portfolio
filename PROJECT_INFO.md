# PROJECT_INFO

Single source of truth for every personal fact used on this website.

**How to read this file**

- Values without a marker are **verified** — taken from your public GitHub profile and repositories on 2026-09-06.
- `[REQUIRED]` — the site needs this. It is currently missing, or a safe fallback is in use. Fill it in.
- `[CONFIRM]` — a value is in place but was inferred. Confirm it before you publish.

**Where these values live in code**

| Content | File |
| --- | --- |
| Identity, contact, links, availability | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Skills / technical stack | `src/data/stack.ts` |
| AI engineering capabilities | `src/data/capabilities.ts` |
| Engineering process and principles | `src/data/process.ts` |
| Currently exploring | `src/data/now.ts` |
| Work experience | `src/data/experience.ts` |
| Education | `src/data/education.ts` |
| Testimonials | `src/data/testimonials.ts` |

Nothing on this site is invented. Every claim traces back to a public repository or to a field you fill in below. Sections whose data is empty do not render at all — the site never shows a placeholder to a visitor.

---

# Personal Information

- **Name:** Hussain Ahmad
- **Professional Title:** AI Software Engineer
- **Short Bio:** `[CONFIRM]` — currently: "AI Software Engineer building intelligent, production-ready software and autonomous AI systems." Derived from your GitHub bio: *"AI Software Engineer | Web Developer | Business Automation Expert"*.
- **Location:** Faisalabad, Pakistan
- **Email:** `[REQUIRED]` — **blocking.** The contact CTA and every mailto link stay disabled until this is set in `src/data/site.ts`.
- **Phone:** `[REQUIRED — optional]` — leave blank if you would rather not publish one.
- **LinkedIn:** https://www.linkedin.com/in/hussainahmaddev/
- **GitHub:** https://github.com/hussainahmad17
- **Production domain:** `[REQUIRED]` — e.g. `https://hussainahmad.dev`. Used for canonical URLs, sitemap and Open Graph. Set as `NEXT_PUBLIC_SITE_URL` in Vercel.
- **Availability:** `[CONFIRM]` — currently: "Open to AI engineering roles and freelance work." Set to `null` in `src/data/site.ts` to hide the availability pill.
- **Timezone:** `[CONFIRM]` — currently PKT (UTC+5).
- **X / Twitter:** `[REQUIRED — optional]` — omitted from the site while blank.

---

# Professional Experience

## Position 1

- **Company:** Quantum Bytes Solution *(verified — listed on your GitHub profile)*
- **Role:** `[REQUIRED]`
- **Dates:** `[REQUIRED]` — start – end, or "Present"
- **Employment type:** `[REQUIRED]` — full-time / part-time / contract / internship
- **Location:** `[REQUIRED]` — on-site / remote / hybrid
- **Responsibilities:** `[REQUIRED]` — 3–5 concrete bullets
- **Achievements:** `[REQUIRED]` — measurable, verifiable outcomes only

> The Experience section renders from `src/data/experience.ts`, which is currently **empty**, so the section does not appear anywhere. Nothing false is shown. Fill this in to switch it on.

## Position 2 (add as many as apply)

- Company:
- Role:
- Dates:
- Responsibilities:
- Achievements:

---

# Projects

The five projects below are real, public repositories of yours. Every description was written from the actual source code, dependency manifests and CI configuration in each repo — not guessed.

## 1. CogniFlow — Vector RAG Chatbot

- **Repository:** https://github.com/hussainahmad17/CogniFlow
- **Verified stack:** Next.js 16, React 19, TypeScript, OpenAI `text-embedding-3-small` (1536-dim), DataStax Astra DB vector collection (cosine similarity), Puppeteer ingestion, Tailwind CSS v4.
- **Verified pipeline:** headless-browser scrape → 512-character chunks with 100-character overlap → batched embedding → vector upsert with source attribution → retrieval-augmented chat route.
- **Live URL:** `[REQUIRED]` — deploy it and add the URL, or the case study shows repository links only.
- **Screenshots:** `[REQUIRED]` — drop images into `public/projects/cogniflow/` (see **Assets**).
- **Results / metrics:** `[REQUIRED]` — leave blank rather than inventing. Worth measuring: retrieval hit-rate against a fixed question set, p95 answer latency, ingestion throughput, cost per query.

## 2. EduNexus — AI-Assisted Institute Management Platform

- **Repository:** https://github.com/hussainahmad17/EduNexus
- **Verified stack:** Node.js, Express, MongoDB/Mongoose, Redis + Bull job queues, Socket.IO realtime, Firebase Admin (FCM push), JWT auth, Joi validation, Helmet, express-rate-limit, express-mongo-sanitize, Cloudinary, PDFKit, Nodemailer/Resend, Jest + Supertest + mongodb-memory-server, GitHub Actions CI (frontend build + backend test suite).
- **Verified scope:** 40+ domain controllers (attendance, fees, exams, results, timetables, transport, hostel, library, inventory, HR/salary, complaints, messaging, report cards), 16 integration test suites, scheduled jobs including a monthly fee scheduler, CSV and PDF export pipelines.
- **Your role:** `[REQUIRED]` — **important.** `backend/package.json` lists the author as `26-FYP-217`, which reads like a final-year-project team. The site currently describes the *system* and makes **no claim of sole authorship**. Tell me exactly what you owned (for example: "backend architecture, auth, fees and results modules, CI") and I will state it precisely. Do not publish until this is accurate.
- **Team size:** `[REQUIRED]`
- **Live URL:** `[REQUIRED]`
- **Results / metrics:** `[REQUIRED]`

## 3. Generative AI Engineering Lab (LangChain / LangGraph)

- **Repository:** https://github.com/hussainahmad17/Gen-AI
- **Verified contents:** LangGraph sequential, parallel, conditional and LLM workflows (Jupyter); LangChain chains (simple, parallel, conditional); document loaders; embedding models; Chroma and FAISS vector stores; multi-query retriever; contextual-compression retriever; structured output via Pydantic and TypedDict.
- **Framing:** presented on the site as an engineering lab and reference-implementation set — **not** as a product. That framing is deliberate and accurate.

## 4. Support & Issue Tracking System

- **Repository:** https://github.com/hussainahmad17/Support-Issue-Tracker
- **Live URL:** https://ticketingsystem-dusky.vercel.app *(verified — repository homepage field)*
- **Verified stack:** React frontend with an Express/MongoDB backend, JWT auth with role middleware (RBAC), Cloudinary uploads via Multer, ticket/comment/user domain models, admin seeding, deployed to Vercel through an `api/` serverless entrypoint.
- **Results / metrics:** `[REQUIRED]`

> ⚠️ **Security — action needed.** This repository has `backend/.env` and `frontend/.env` committed to git. Rotate any credentials they contain, delete the files, add `.env` to `.gitignore`, and purge them from history before you send this repo to anyone. See "Before you share your repositories" in `README.md`.

## 5. EchoPersona — Voice AI Assistant

- **Repository:** https://github.com/hussainahmad17/AI-Assistant-for-query-task-managment
- **Live URL:** https://echo-persona-assistant.lovable.app/landing *(verified — repository homepage field)*
- **Verified stack:** React + Vite + TypeScript, Supabase (auth and persistence), Web Speech API (recognition and synthesis), configurable prompt/API/voice admin settings, chat history, analytics views, shadcn/ui + Radix, React Query, Zod.
- `[CONFIRM]` — the repository looks partly scaffolded with Lovable. Confirm how much of it you authored. If it was largely generated, say so and I will reframe it honestly or remove it. A reviewer who spots this will discount the entire portfolio.

## Projects deliberately not featured

You have 41 public repositories. Learning exercises — sorting algorithms, recursion, DSA, WeatherApp, tic-tac-toe, CRUD and auth demos, websocket demos — are intentionally excluded. A short, strong set outperforms a long, average one. Say the word if you want any added back.

---

# Skills

Listed skills are restricted to what is demonstrated in your public repositories.

- **AI:** Python, LangChain, LangGraph, OpenAI API, embeddings, RAG pipelines, vector search, agent workflows (sequential / parallel / conditional), structured output (Pydantic), retrievers (multi-query, contextual compression), prompt design
- **Backend:** Node.js, Express, REST APIs, JWT auth, RBAC, Socket.IO, Bull queues, Joi validation, Nodemailer / Resend, PDFKit, Multer
- **Databases:** MongoDB / Mongoose, Redis, Astra DB (vector), Chroma, FAISS, Prisma, GraphQL
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Vite, shadcn/ui, EJS
- **Cloud / DevOps:** Vercel, GitHub Actions, Cloudinary, Firebase (FCM), Git
- **Testing:** Jest, Supertest, mongodb-memory-server
- **Other:** Data Structures & Algorithms (Python)

**Additional skills to add:** `[REQUIRED — optional]` — Docker, PostgreSQL, FastAPI, Nginx, Linux and AWS appear in the original brief's suggested stack, but I found no evidence of them in your repositories, so I did **not** list them. Confirm any you genuinely use and I will add them.

---

# Education

- **Degree:** `[REQUIRED]`
- **University:** `[REQUIRED]`
- **Dates:** `[REQUIRED]`
- **Relevant coursework / distinctions:** `[REQUIRED]`

> Renders from `src/data/education.ts`, currently **empty**, so the block is hidden. The EduNexus repository hints at a final-year project, which suggests a CS/SE degree — but I will not publish a degree you have not confirmed.

---

# Testimonials

None supplied, so the testimonials section is **not rendered anywhere** on the site. This is correct behaviour: fabricated testimonials are the fastest way to lose a technical reader's trust.

To switch it on, add entries to `src/data/testimonials.ts`:

- Name:
- Role:
- Company:
- Testimonial:
- Permission to publish (yes / no):

---

# Resume

- **Resume file:** `[REQUIRED]` — put a PDF at `public/hussain-ahmad-resume.pdf` and set `resumeUrl` in `src/data/site.ts`. Resume links stay hidden while it is missing, rather than pointing at a 404.

---

# Brand

- **Preferred colors:** `[CONFIRM]` — currently a near-black canvas (`#08090B`) with a single mint-signal accent (`#5EF2C0`) and warm off-white text, chosen to avoid the default blue/purple "AI gradient" look. Change the tokens at the top of `src/app/globals.css`.
- **Preferred fonts:** `[CONFIRM]` — Geist Sans and Geist Mono, self-hosted via the `geist` package: no external font requests, no layout shift.
- **Logo:** `[REQUIRED — optional]` — currently a typographic monogram. Drop an SVG at `public/logo.svg` if you have one.
- **Profile photo:** `[REQUIRED — optional]` — a square photo at `public/hussain-ahmad.jpg`, minimum 800×800, then set `photo` in `src/data/site.ts`. Until then the About page shows a typographic panel rather than a broken image.
- **Open Graph image:** generated automatically from your name and title in `src/app/opengraph-image.tsx`.

---

# Assets

Create these folders and drop screenshots in; the case studies pick them up from the `images` array on each project in `src/data/projects.ts`:

```
public/projects/cogniflow/
public/projects/edunexus/
public/projects/support-issue-tracker/
public/projects/echopersona/
```

Preferred format: 1600×1000 PNG or WebP, real product screenshots. Where none exist, each case study renders its generated architecture diagram instead of a fake screenshot.

---

# Environment variables

See `.env.example`.

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph. Required in production. |
| `CONTACT_TO_EMAIL` | Where contact-form messages are delivered. |
| `RESEND_API_KEY` | Sending mail. Free tier at https://resend.com is enough. |
| `RESEND_FROM_EMAIL` | A verified sender address, e.g. `site@yourdomain.com`. |

If the Resend variables are absent, the contact form does **not** silently swallow messages. It fails loudly with a clear error and the UI falls back to a direct email link. Nothing pretends to work.

---

# What I need from you, in priority order

1. **Email address** — unblocks the entire contact surface.
2. **Your exact role on EduNexus, and team size** — must be right before publishing.
3. **How much of EchoPersona you authored** — or I remove it.
4. **Production domain** — SEO, canonical URLs, Open Graph.
5. **Resume PDF** — recruiters look for it first.
6. **Education** (degree, university, dates) — expected by international recruiters.
7. **Quantum Bytes Solution role and dates** — turns on the Experience section.
8. **Project screenshots** — the single biggest visual upgrade available.
9. **Any real metrics** from the projects — only if genuinely measured.
10. **Extra skills not visible in your repos** — Docker, PostgreSQL, FastAPI, and so on.
