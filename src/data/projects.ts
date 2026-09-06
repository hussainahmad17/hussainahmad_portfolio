import type { Project } from "@/types";

/**
 * Case-study content.
 *
 * Every technical statement below is verifiable against the linked repository:
 * dependency manifests, source files and CI configuration. Where an outcome has
 * not been measured, `results` is left empty on purpose — the case study renders
 * an explicit "not yet measured" note rather than an invented number.
 */
export const projects: Project[] = [
  {
    slug: "cogniflow",
    title: "CogniFlow",
    summary:
      "A retrieval-augmented chatbot that answers from a private, continuously ingested corpus instead of the model's training data — with every answer traceable to its source.",
    category: "Retrieval-Augmented Generation",
    capabilities: [
      "Document ingestion",
      "Vector retrieval",
      "Grounded generation",
      "Source attribution",
    ],
    primaryStack: ["Next.js 16", "TypeScript", "OpenAI", "Astra DB", "Puppeteer"],
    stack: [
      { group: "AI", items: ["OpenAI API", "text-embedding-3-small", "RAG pipeline"] },
      { group: "Data", items: ["DataStax Astra DB", "Vector search (cosine)", "1536-dim embeddings"] },
      { group: "Ingestion", items: ["Puppeteer", "Headless scraping", "Overlapping chunker"] },
      { group: "Application", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"] },
    ],
    status: "in-development",
    year: "2026",
    featured: true,
    overview:
      "CogniFlow is a vector RAG chatbot. An ingestion job crawls a defined set of sources, normalises the text, splits it into overlapping chunks, embeds each chunk and writes it to a vector collection alongside its source URL. At query time the application retrieves the nearest chunks and answers from them, so responses stay bounded by the corpus rather than by whatever the base model happens to remember.",
    problem: {
      heading: "Problem",
      body: [
        "A general-purpose language model has two failure modes that make it unusable as a knowledge interface: it does not know anything specific to your organisation, and when it does not know something it produces a fluent, confident answer anyway.",
        "Fine-tuning does not solve this well. It is expensive to repeat, it bakes knowledge into weights that cannot be updated cheaply when a document changes, and it still gives you no way to point at where an answer came from.",
      ],
    },
    businessContext: {
      heading: "Business context",
      body: [
        "This is the shape of almost every practical LLM deployment inside a company: a body of knowledge exists — documentation, policies, product data, support history — and people need answers from it in natural language, without a human having to read the source each time.",
        "The constraint that decides whether such a system is adopted is not answer quality in isolation. It is whether a reader can verify an answer. An unverifiable answer transfers risk to the reader, and readers reject it.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Separate the system into two pipelines that can evolve independently: an offline ingestion pipeline that owns the corpus, and an online query pipeline that owns the conversation.",
        "The ingestion pipeline renders each source with a headless browser rather than fetching raw HTML, so client-rendered content is captured. Extracted text is whitespace-normalised, split into 512-character chunks with 100 characters of overlap so a fact spanning a boundary survives in at least one chunk, then embedded in batches with text-embedding-3-small.",
        "Each chunk is stored as a vector alongside its text and originating URL. Retrieval therefore returns not just the supporting text but its provenance, which is what makes an answer checkable.",
      ],
    },
    architecture: {
      caption:
        "Two pipelines, one store. Ingestion runs offline and owns corpus freshness; the query path stays thin and predictable.",
      layers: [
        {
          label: "Sources",
          nodes: [
            { title: "Source documents", detail: "Web pages, docs, articles" },
          ],
        },
        {
          label: "Ingestion",
          nodes: [
            { title: "Headless render", detail: "Puppeteer · networkidle" },
            { title: "Chunker", detail: "512 chars · 100 overlap" },
            { title: "Embedding", detail: "text-embedding-3-small" },
          ],
        },
        {
          label: "Store",
          nodes: [
            {
              title: "Astra DB vector collection",
              detail: "1536-dim · cosine · text + source URL",
              accent: true,
            },
          ],
        },
        {
          label: "Query",
          nodes: [
            { title: "Chat route", detail: "Next.js route handler" },
            { title: "Retriever", detail: "Top-k nearest chunks" },
          ],
        },
        {
          label: "Generation",
          nodes: [
            {
              title: "Grounded answer",
              detail: "Retrieved context + question",
              accent: true,
            },
            { title: "Citations", detail: "Source URLs returned with answer" },
          ],
        },
      ],
    },
    aiWorkflow: {
      heading: "AI workflow",
      body: [
        "Ingest — a source is rendered, flattened to text, chunked with overlap, embedded in a single batched call per document, and upserted with its provenance.",
        "Retrieve — the incoming question is embedded with the same model, and the vector collection returns the nearest chunks by cosine similarity. Using one embedding model on both sides is not a detail: mixing models silently destroys retrieval quality because the vectors no longer share a space.",
        "Generate — retrieved chunks become the context for the answer. The model is instructed to answer from context, and the source URLs travel back with the response so the reader can check it.",
      ],
    },
    implementation: {
      heading: "Technical implementation",
      body: [
        "The chunker is hand-written rather than pulled from a library. It advances by chunk size minus overlap and guards the step so a pathological overlap value cannot produce an infinite loop — a real failure mode in naive implementations.",
        "Embeddings are requested per document rather than per chunk, which collapses dozens of round trips into one and is the difference between an ingestion run measured in minutes and one measured in hours.",
        "The browser is launched and closed inside a try/finally around each page, so a page that hangs or throws cannot leak a Chromium process across a long crawl.",
        "Credentials for the vector store and the model provider are read from the environment only. Nothing is embedded in the client bundle, and the collection is created idempotently with an explicit dimension and metric rather than relying on defaults.",
      ],
    },
    challenges: [
      {
        title: "Chunk boundaries destroy facts",
        body: "A fixed-size split will eventually cut a sentence, a definition or a number in half, and neither resulting chunk answers the question. Overlapping the windows means any span shorter than the overlap survives whole in at least one chunk. The cost is a larger index; the benefit is that retrieval stops missing facts that are demonstrably in the corpus.",
      },
      {
        title: "Client-rendered sources return empty text",
        body: "Fetching HTML directly returns an application shell for a large share of modern pages. Rendering with a headless browser and reading the evaluated document body is slower per page, but it is the difference between ingesting a page and ingesting nothing at all.",
      },
      {
        title: "Ingestion is the expensive half",
        body: "Embedding cost and wall-clock time are dominated by ingestion, not by queries. Batching per document, skipping empty chunks and making collection creation idempotent keeps re-runs cheap, which in turn makes it realistic to re-ingest when sources change.",
      },
    ],
    decisions: [
      {
        decision: "Retrieval augmentation rather than fine-tuning",
        rationale:
          "The corpus changes; model weights should not have to. RAG makes an update a re-ingestion rather than a training run, and it is the only one of the two approaches that can cite a source.",
      },
      {
        decision: "A managed vector database over a self-hosted index",
        rationale:
          "The interesting problems here are chunking, retrieval quality and grounding. Operating a vector index adds no differentiated value at this scale.",
      },
      {
        decision: "Store the source URL beside every vector",
        rationale:
          "Provenance has to be captured at write time. Reconstructing it at read time is guesswork, and guessed citations are worse than none.",
      },
      {
        decision: "One embedding model on both sides of the pipeline",
        rationale:
          "Query and document vectors must occupy the same space. This is enforced by construction rather than left as a convention someone can break later.",
      },
    ],
    results: [],
    demoUrl: null,
    githubUrl: "https://github.com/hussainahmad17/CogniFlow",
    images: [],
  },

  {
    slug: "edunexus",
    title: "EduNexus",
    summary:
      "A multi-role institute management platform covering attendance, finance, academics and operations — built as a tested, queue-backed system with realtime delivery and CI, not a CRUD app.",
    category: "Production Platform Engineering",
    capabilities: [
      "Multi-role access control",
      "Background job processing",
      "Realtime + push delivery",
      "Automated test suite",
    ],
    primaryStack: ["Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Jest"],
    stack: [
      { group: "Backend", items: ["Node.js", "Express", "REST API", "40+ domain controllers"] },
      { group: "Data", items: ["MongoDB", "Mongoose", "Redis"] },
      { group: "Async", items: ["Bull queues", "Scheduled jobs", "Socket.IO", "Firebase Cloud Messaging"] },
      { group: "Security", items: ["JWT", "Helmet", "express-rate-limit", "express-mongo-sanitize", "Joi validation"] },
      { group: "Output", items: ["PDFKit", "CSV export", "Cloudinary", "Nodemailer / Resend"] },
      { group: "Quality", items: ["Jest", "Supertest", "mongodb-memory-server", "GitHub Actions CI"] },
    ],
    status: "in-development",
    year: "2026",
    featured: true,
    overview:
      "EduNexus is an institute management platform spanning attendance, fees and finance, exams and results, timetables, transport, hostel, library, inventory, HR and payroll, complaints and messaging. It is included here not for its feature count but for its engineering shape: a modular Express service with more than forty domain controllers, background queues, realtime and push delivery, sixteen integration test suites running against an in-memory database, and continuous integration that builds the frontend and runs the backend suite on every push.",
    problem: {
      heading: "Problem",
      body: [
        "Institutions run on a patchwork of spreadsheets, paper registers and messaging groups. The data exists but is not connected, so every question that crosses two domains — has this student's fee cleared before results are released? — becomes manual work.",
        "The engineering problem is harder than the domain problem. A system like this has many roles with genuinely different views of the same records, work that must not happen inside a request (statement generation, bulk exports, monthly billing), and information that has to reach people who are not currently looking at the application.",
      ],
    },
    businessContext: {
      heading: "Business context",
      body: [
        "Administrative software is judged on trust rather than features. If a fee ledger disagrees with a receipt, or an attendance record silently changes, adoption stops immediately and does not restart.",
        "That pushes the engineering priorities somewhere specific: validated inputs at the boundary, authorisation that is enforced centrally rather than per handler, and a test suite that can prove the money-and-records paths still behave after a change.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The API is decomposed by domain — attendance, fees, exams, results, timetables, transport, hostel, library, inventory, HR, complaints, messaging — with each domain owning its controller, routes and models. Cross-cutting concerns live in middleware rather than being repeated per route.",
        "Requests are validated with Joi before reaching a controller, sanitised against operator injection, rate limited, and passed through JWT authentication and role middleware. A handler can assume its input is well-formed and its caller is authorised.",
        "Anything slow or scheduled is moved off the request path onto Bull queues backed by Redis: exports, document generation, notification fan-out, and a monthly fee scheduler that bills on its own clock rather than on a user's click.",
        "Delivery is two-tier. Socket.IO pushes to connected clients; Firebase Cloud Messaging reaches people who are not. Email uses a single shared mail service so every module sends through one configured transport instead of each inventing its own.",
      ],
    },
    architecture: {
      caption:
        "Validation and authorisation at the boundary, thin domain controllers, and every slow or scheduled task moved onto queues.",
      layers: [
        {
          label: "Clients",
          nodes: [
            { title: "Web application", detail: "Role-scoped dashboards" },
            { title: "Mobile / push targets", detail: "FCM device tokens" },
          ],
        },
        {
          label: "Edge",
          nodes: [
            { title: "Helmet + CORS", detail: "Transport hardening" },
            { title: "Rate limiting", detail: "express-rate-limit" },
            { title: "Sanitisation", detail: "express-mongo-sanitize" },
          ],
        },
        {
          label: "Access",
          nodes: [
            { title: "JWT authentication", detail: "Signed, expiring tokens" },
            { title: "Role middleware", detail: "Central RBAC", accent: true },
            { title: "Joi validation", detail: "Schema per endpoint" },
          ],
        },
        {
          label: "Domain",
          nodes: [
            { title: "Academics", detail: "Attendance · exams · results · timetables" },
            { title: "Finance", detail: "Fees · salary · ledger" },
            { title: "Operations", detail: "Transport · hostel · library · inventory" },
          ],
        },
        {
          label: "Async",
          nodes: [
            { title: "Bull queues", detail: "Redis-backed workers", accent: true },
            { title: "Scheduled jobs", detail: "Monthly fee scheduler" },
            { title: "Exports", detail: "PDFKit · CSV · archiver" },
          ],
        },
        {
          label: "Delivery",
          nodes: [
            { title: "Socket.IO", detail: "Connected clients" },
            { title: "FCM push", detail: "Disconnected clients" },
            { title: "Mail service", detail: "Single shared transport" },
          ],
        },
        {
          label: "Persistence",
          nodes: [
            { title: "MongoDB", detail: "Domain records" },
            { title: "Redis", detail: "Queues + ephemeral state" },
            { title: "Cloudinary", detail: "Documents and media" },
          ],
        },
      ],
    },
    implementation: {
      heading: "Technical implementation",
      body: [
        "Sixteen integration suites exercise auth, attendance, fees, exams, results, salary, staff attendance, timetables, transport, homework, complaints, notification attachments, CSV export and report-card export. They run against mongodb-memory-server, so the suite needs no external database and behaves identically on a laptop and in CI.",
        "GitHub Actions runs two jobs on every push and pull request: a frontend production build and the backend test suite with --runInBand. A change that breaks either is visible before it is merged rather than after it is deployed.",
        "A pre-start integrity check runs before both dev and start, so the process refuses to boot in a misconfigured state instead of failing later in a way that is harder to diagnose.",
        "Data migrations and seeds are explicit, versioned scripts — demo seeding, username backfill, transport and timetable model migrations — rather than ad-hoc database edits.",
      ],
    },
    challenges: [
      {
        title: "Many roles, one set of records",
        body: "Administrators, teachers, students and parents see overlapping but non-identical views of the same data. Encoding that per handler guarantees drift and eventually a leak. Authorisation is therefore expressed once in middleware and applied uniformly, so adding a domain does not mean re-deriving the access rules.",
      },
      {
        title: "Work that must not happen in a request",
        body: "Report cards, ledger exports and monthly billing are slow and must survive a closed browser tab. Moving them onto Redis-backed queues keeps request latency bounded and makes retries a property of the queue rather than something each caller reimplements.",
      },
      {
        title: "Testing a system with this much surface area",
        body: "Unit tests over forty controllers would prove little about whether the system works. Integration tests against a real Mongo API surface, backed by an in-memory server, test the paths that actually matter — request in, authorisation applied, database mutated, response out — without requiring shared infrastructure.",
      },
    ],
    decisions: [
      {
        decision: "Integration tests over unit tests",
        rationale:
          "The risk in this system lives at the seams: authorisation, validation and persistence interacting. Testing there catches the failures that matter; mocking them away hides exactly the bugs worth finding.",
      },
      {
        decision: "Queues rather than longer request timeouts",
        rationale:
          "Slow work in a request couples a user's connection to a job's duration. A queue decouples them and gives retries, backoff and observability for free.",
      },
      {
        decision: "A single shared mail service",
        rationale:
          "Every module needs to send email. Left to themselves they would each configure a transport, and provider changes would then require touching every module.",
      },
      {
        decision: "Fail fast on misconfiguration",
        rationale:
          "A pre-start integrity check turns a class of silent runtime failures into a loud startup failure, which is far cheaper to diagnose.",
      },
    ],
    results: [],
    demoUrl: null,
    githubUrl: "https://github.com/hussainahmad17/EduNexus",
    images: [],
    note: "This project was built in a team context. The description above covers the system and its architecture; it is not a claim of sole authorship. A precise breakdown of individual contribution is available on request.",
  },

  {
    slug: "generative-ai-lab",
    title: "Generative AI Engineering Lab",
    summary:
      "A working reference set for the primitives agent systems are actually made of — graph-structured workflows, retrieval strategies, vector stores and schema-constrained model output.",
    category: "Agent & Retrieval Engineering",
    capabilities: [
      "LangGraph workflows",
      "Retriever strategies",
      "Vector store comparison",
      "Structured output",
    ],
    primaryStack: ["Python", "LangGraph", "LangChain", "FAISS", "Chroma", "Pydantic"],
    stack: [
      { group: "Orchestration", items: ["LangGraph", "Sequential / parallel / conditional graphs"] },
      { group: "Composition", items: ["LangChain", "Chains", "Document loaders"] },
      { group: "Retrieval", items: ["Multi-query retriever", "Contextual compression retriever"] },
      { group: "Vector stores", items: ["FAISS", "Chroma", "Embedding models"] },
      { group: "Contracts", items: ["Pydantic", "TypedDict", "Structured output"] },
    ],
    status: "in-development",
    year: "2026",
    featured: true,
    overview:
      "This is a lab, not a product, and it is presented as one. It contains runnable implementations of the pieces that agent and retrieval systems are assembled from: LangGraph workflows in four control-flow shapes, LangChain composition patterns, two retriever strategies that address distinct retrieval failures, two vector store backends, and two approaches to constraining model output to a schema.",
    problem: {
      heading: "Problem",
      body: [
        "Most published agent code is a single prompt loop. That works in a demo and falls apart in production, because real workflows branch, run steps concurrently, and need to produce output that downstream code can rely on.",
        "The gap is rarely the model. It is control flow, retrieval quality and output contracts — three things that have to be understood at the level of implementation rather than the level of a diagram.",
      ],
    },
    businessContext: {
      heading: "Why this matters",
      body: [
        "When an AI feature underperforms, the cause is usually structural: the wrong chunks were retrieved, a step that should have branched did not, or a free-text response was parsed with a regular expression that broke on the first unusual answer.",
        "Being able to reach for the right primitive — a conditional graph, a multi-query retriever, a schema-constrained response — is what separates diagnosing those failures from guessing at prompt wording.",
      ],
    },
    solution: {
      heading: "What it covers",
      body: [
        "Workflow topology — sequential graphs for pipelines, parallel graphs for independent work that should not run serially, and conditional graphs for routing on state. Each is implemented rather than described.",
        "Retrieval strategies — a multi-query retriever that reformulates a question into several phrasings to widen recall when a user's wording does not match the corpus, and a contextual compression retriever that strips irrelevant passages from retrieved documents before they consume context budget. They fix opposite problems: one raises recall, the other raises precision.",
        "Storage — FAISS and Chroma implemented side by side, with document loaders and embedding models, so the trade-off between an in-process index and a persistent store is a measured choice rather than a default.",
        "Output contracts — Pydantic models and TypedDict schemas that make a model return parseable, validated structures instead of prose that downstream code has to guess at.",
      ],
    },
    architecture: {
      caption:
        "The primitives an agent system is composed from, and where each one sits in the request path.",
      layers: [
        {
          label: "Control flow",
          nodes: [
            { title: "Sequential graph", detail: "Ordered pipeline" },
            { title: "Parallel graph", detail: "Concurrent branches" },
            { title: "Conditional graph", detail: "Routing on state", accent: true },
          ],
        },
        {
          label: "Retrieval",
          nodes: [
            { title: "Multi-query", detail: "Reformulate → widen recall" },
            { title: "Contextual compression", detail: "Prune → raise precision" },
          ],
        },
        {
          label: "Storage",
          nodes: [
            { title: "FAISS", detail: "In-process index" },
            { title: "Chroma", detail: "Persistent store" },
            { title: "Document loaders", detail: "Directory · text" },
          ],
        },
        {
          label: "Model layer",
          nodes: [
            { title: "Chat models", detail: "Hosted + Hugging Face" },
            { title: "Embedding models", detail: "Vectorisation" },
          ],
        },
        {
          label: "Contracts",
          nodes: [
            { title: "Pydantic schema", detail: "Validated structured output", accent: true },
            { title: "TypedDict", detail: "Lightweight shape" },
          ],
        },
      ],
    },
    aiWorkflow: {
      heading: "AI workflow",
      body: [
        "State moves through a graph rather than through a single prompt. Each node owns one transformation, which makes a failing step identifiable instead of a whole prompt being suspect.",
        "Retrieval is treated as a tunable component with its own quality problem, not as a lookup that either works or does not. Recall and precision are addressed by different strategies, deliberately.",
        "Model output crossing into application code passes through a schema. A response that does not validate fails at the boundary rather than propagating a malformed value.",
      ],
    },
    implementation: {
      heading: "Technical implementation",
      body: [
        "Workflow topologies are implemented as LangGraph notebooks so state transitions can be inspected step by step rather than reasoned about from a diagram.",
        "Chains, loaders, models, retrievers, vector stores and structured-output approaches are organised as small standalone modules, each isolating one concept so it can be swapped or compared directly.",
        "Both vector backends are implemented against the same interface, so switching between an in-process index and a persistent store is a configuration change rather than a rewrite.",
      ],
    },
    challenges: [
      {
        title: "Recall and precision pull in opposite directions",
        body: "Widening a query improves the chance of finding the right passage and simultaneously admits more noise. Compressing retrieved documents removes noise and can discard something needed. Having both implemented makes it possible to choose per corpus instead of assuming one setting is universally correct.",
      },
      {
        title: "Free-text output is not an interface",
        body: "Parsing prose is brittle by construction. Schema-constrained output moves the failure from a silent misparse deep in application code to an explicit validation error at the boundary.",
      },
      {
        title: "Serial execution of independent steps",
        body: "Steps with no data dependency between them do not need to run in sequence, and in a latency-sensitive path they must not. Expressing them as parallel branches in the graph makes the independence explicit rather than accidental.",
      },
    ],
    decisions: [
      {
        decision: "Graph-structured workflows over a prompt loop",
        rationale:
          "Explicit state and explicit transitions are debuggable. A loop that hides its control flow inside a prompt is not.",
      },
      {
        decision: "Two retrievers rather than one default",
        rationale:
          "Retrieval failures have distinct causes. Keeping a strategy for each means diagnosing the cause instead of blindly reranking.",
      },
      {
        decision: "Schemas at every model boundary",
        rationale:
          "It converts an entire class of runtime parsing bugs into validation errors that surface immediately.",
      },
    ],
    results: [],
    demoUrl: null,
    githubUrl: "https://github.com/hussainahmad17/Gen-AI",
    images: [],
    note: "Presented as an engineering lab and reference implementation set rather than as a shipped product.",
  },

  {
    slug: "support-issue-tracker",
    title: "Support & Issue Tracking System",
    summary:
      "A role-based internal ticketing system — reporters, agents and administrators working the same queue through different permissions — deployed as serverless functions.",
    category: "Full-Stack Product",
    capabilities: [
      "Role-based access control",
      "Ticket lifecycle",
      "File attachments",
      "Serverless deployment",
    ],
    primaryStack: ["React", "Express", "MongoDB", "JWT", "Cloudinary", "Vercel"],
    stack: [
      { group: "Frontend", items: ["React", "Vite", "Client routing"] },
      { group: "Backend", items: ["Node.js", "Express", "REST API"] },
      { group: "Data", items: ["MongoDB", "Mongoose", "Ticket / Comment / User models"] },
      { group: "Access", items: ["JWT", "Auth middleware", "Role middleware"] },
      { group: "Media", items: ["Multer", "Cloudinary"] },
      { group: "Deployment", items: ["Vercel serverless entrypoint"] },
    ],
    status: "live",
    year: "2026",
    featured: true,
    overview:
      "An internal support desk where three roles interact with one queue. Reporters raise and track tickets, agents work and comment on them, administrators manage users and oversee the whole queue. Authentication is JWT-based and authorisation is enforced in middleware, so a role's boundaries are defined in one place rather than re-derived in each route handler.",
    problem: {
      heading: "Problem",
      body: [
        "Support requests arriving through email and chat have no state, no owner and no history. Nobody can answer who is handling a request, how long it has been open, or what was already tried.",
        "Adding a database alone does not fix it. The moment three roles share one queue, the real problem becomes authorisation: who may reassign, who may close, who may see another person's ticket.",
      ],
    },
    businessContext: {
      heading: "Business context",
      body: [
        "A support desk is a workflow tool before it is a data store. Its value is in making ownership and state explicit so that work stops being dropped.",
        "It is also the point where an internal tool most often leaks: a missing authorisation check on one endpoint exposes every ticket in the system.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Three models — user, ticket and comment — with the comment thread attached to the ticket, so the conversation and the state live together rather than in someone's inbox.",
        "Authentication middleware verifies a signed token and attaches the caller; role middleware then gates the route. Adding an endpoint means declaring which roles may reach it, not reimplementing the check.",
        "Attachments are uploaded through Multer and stored on Cloudinary rather than on the application filesystem, which is what makes the service safe to run on ephemeral serverless instances.",
        "An admin seed script creates the first administrator deterministically, so a fresh deployment has a defined starting state instead of requiring a manual database insert.",
      ],
    },
    architecture: {
      caption:
        "One queue, three roles. Authorisation is centralised in middleware and file storage is external so the compute layer stays stateless.",
      layers: [
        {
          label: "Clients",
          nodes: [
            { title: "Reporter", detail: "Raise and track" },
            { title: "Support agent", detail: "Work and comment" },
            { title: "Administrator", detail: "Users and oversight" },
          ],
        },
        {
          label: "Application",
          nodes: [
            { title: "React frontend", detail: "Role-aware views" },
            { title: "Serverless entrypoint", detail: "Vercel function" },
          ],
        },
        {
          label: "Access",
          nodes: [
            { title: "JWT auth middleware", detail: "Verify · attach caller" },
            { title: "Role middleware", detail: "Central RBAC", accent: true },
          ],
        },
        {
          label: "Domain",
          nodes: [
            { title: "Tickets", detail: "Lifecycle and assignment" },
            { title: "Comments", detail: "Threaded per ticket" },
            { title: "Users", detail: "Profiles and roles" },
          ],
        },
        {
          label: "Persistence",
          nodes: [
            { title: "MongoDB", detail: "Tickets · comments · users" },
            { title: "Cloudinary", detail: "Attachments" },
          ],
        },
      ],
    },
    implementation: {
      heading: "Technical implementation",
      body: [
        "Routes are grouped by resource — auth, tickets, comments, users — with controllers kept thin and shared concerns in middleware.",
        "Tokens are generated through a single utility so signing options and expiry are defined once instead of drifting between endpoints.",
        "The Express application is exported through a dedicated serverless entrypoint so the same codebase runs locally as a server and on Vercel as a function.",
        "No local disk writes: uploads stream to Cloudinary, which is a requirement rather than an optimisation on a platform where the filesystem does not persist between invocations.",
      ],
    },
    challenges: [
      {
        title: "Authorisation that does not drift",
        body: "Per-route permission checks are the standard way these systems leak, because one handler eventually forgets. Expressing roles as middleware means an endpoint without an explicit policy is visibly missing one.",
      },
      {
        title: "Stateless compute and file uploads",
        body: "Serverless instances do not keep a filesystem. Uploading straight to external object storage is what allows attachments to work at all in that environment.",
      },
      {
        title: "Running one Express app in two environments",
        body: "Local development wants a long-lived server; the platform wants a handler. Separating the application from its entrypoint lets both consume the same code without a parallel implementation.",
      },
    ],
    decisions: [
      {
        decision: "Roles in middleware, not in handlers",
        rationale:
          "It makes authorisation auditable in one file and makes a missing policy conspicuous.",
      },
      {
        decision: "External object storage for attachments",
        rationale:
          "It is the only correct choice on ephemeral compute, and it removes file serving from the application entirely.",
      },
      {
        decision: "A deterministic admin seed",
        rationale:
          "A new environment should reach a known good state through a script, not through manual database edits nobody records.",
      },
    ],
    results: [],
    demoUrl: "https://ticketingsystem-dusky.vercel.app",
    githubUrl: "https://github.com/hussainahmad17/Support-Issue-Tracker",
    images: [],
  },

  {
    slug: "echopersona",
    title: "EchoPersona",
    summary:
      "A voice-driven assistant for queries and task management, with configurable prompt and voice behaviour, persisted conversation history and usage analytics.",
    category: "LLM Application",
    capabilities: [
      "Speech recognition",
      "Speech synthesis",
      "Configurable prompts",
      "Conversation history",
    ],
    primaryStack: ["React", "TypeScript", "Supabase", "Web Speech API", "Zod"],
    stack: [
      { group: "Application", items: ["React", "Vite", "TypeScript", "React Router"] },
      { group: "Voice", items: ["Web Speech API", "Speech recognition", "Speech synthesis"] },
      { group: "Platform", items: ["Supabase auth", "Supabase persistence"] },
      { group: "State & contracts", items: ["React Query", "React Hook Form", "Zod"] },
      { group: "Interface", items: ["shadcn/ui", "Radix UI", "Tailwind CSS", "Recharts"] },
    ],
    status: "live",
    year: "2026",
    featured: false,
    overview:
      "A browser-based assistant driven by speech as well as text. Recognition and synthesis are isolated behind dedicated hooks, conversation history is persisted per authenticated user, and an admin surface exposes prompt, model, voice and general settings as configuration rather than as constants buried in the code.",
    problem: {
      heading: "Problem",
      body: [
        "A text-only assistant is the wrong interface when someone's hands or eyes are occupied, and a voice interface built directly against the browser speech APIs leaks their statefulness through the whole application.",
        "Assistant behaviour also needs to change without a deployment. If the system prompt and voice settings are constants in source, every adjustment becomes an engineering task.",
      ],
    },
    businessContext: {
      heading: "Business context",
      body: [
        "Assistant behaviour is tuned continuously after launch, mostly by people who are not going to open a pull request. Treating the prompt as configuration is what makes that iteration possible.",
        "Conversation history serves two purposes: continuity for the user, and a record that makes it possible to see what people actually ask rather than what was assumed.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Speech recognition and speech synthesis are each confined to their own hook, with shared types and utilities beside them, so the rest of the application consumes a stable interface instead of the browser's event-driven API surface.",
        "A single assistant context owns conversation state, which keeps chat views presentational and prevents the session from being reconstructed in several places.",
        "Authentication and persistence run on Supabase: accounts, verification and per-user history without operating a separate backend for what is a well-solved problem.",
        "Prompt, API, voice and general settings live in an admin surface, and analytics views surface query volume and the most frequent queries.",
      ],
    },
    architecture: {
      caption:
        "Browser speech APIs isolated behind hooks, session state owned by one context, identity and history delegated to a managed platform.",
      layers: [
        {
          label: "Input",
          nodes: [
            { title: "Speech recognition", detail: "Web Speech API hook" },
            { title: "Text input", detail: "Chat composer" },
          ],
        },
        {
          label: "Session",
          nodes: [
            { title: "Assistant context", detail: "Conversation state", accent: true },
            { title: "History context", detail: "Persisted transcripts" },
          ],
        },
        {
          label: "Configuration",
          nodes: [
            { title: "Prompt settings", detail: "Behaviour without redeploy" },
            { title: "Voice settings", detail: "Synthesis parameters" },
            { title: "API settings", detail: "Provider configuration" },
          ],
        },
        {
          label: "Platform",
          nodes: [
            { title: "Supabase auth", detail: "Accounts and verification" },
            { title: "Supabase data", detail: "History per user" },
          ],
        },
        {
          label: "Output",
          nodes: [
            { title: "Speech synthesis", detail: "Spoken response" },
            { title: "Analytics", detail: "Volume and top queries" },
          ],
        },
      ],
    },
    implementation: {
      heading: "Technical implementation",
      body: [
        "Recognition and synthesis are separated because they fail independently: a browser may support one and not the other, and permission handling applies only to input. Combining them would force the application to reason about both at once.",
        "Forms are validated with Zod schemas through React Hook Form, so settings that reach the assistant are shape-checked before they are stored.",
        "Server state is handled by React Query rather than by hand-rolled effects, which removes an entire category of stale-data and race bugs from the history and analytics views.",
        "The component layer is built on Radix primitives, so keyboard interaction and focus management in dialogs, menus and popovers come from accessible primitives rather than from bespoke implementations.",
      ],
    },
    challenges: [
      {
        title: "Browser speech APIs are stateful and inconsistent",
        body: "Recognition sessions start, end and error asynchronously, and support varies by browser. Confining that behind hooks keeps the inconsistency in one place instead of spreading it through every component that speaks or listens.",
      },
      {
        title: "Behaviour that must change without a deploy",
        body: "Prompts are tuned far more often than code ships. Storing them as configuration turns a release into a settings change.",
      },
      {
        title: "Conversation state in several views at once",
        body: "Chat, history and analytics all read the same session. A single owning context prevents three subtly different copies of the truth.",
      },
    ],
    decisions: [
      {
        decision: "A managed platform for auth and persistence",
        rationale:
          "Accounts, verification and per-user storage are solved problems. Building them again would add operational load without adding anything a user notices.",
      },
      {
        decision: "Prompt as configuration, not as code",
        rationale:
          "It moves iteration out of the deployment pipeline and to the people actually tuning the assistant.",
      },
      {
        decision: "Accessible primitives for the interface",
        rationale:
          "Keyboard and focus behaviour is easy to get wrong by hand and expensive to retrofit.",
      },
    ],
    results: [],
    demoUrl: "https://echo-persona-assistant.lovable.app/landing",
    githubUrl: "https://github.com/hussainahmad17/AI-Assistant-for-query-task-managment",
    images: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
