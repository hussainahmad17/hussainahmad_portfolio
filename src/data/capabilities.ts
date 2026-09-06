import type { Capability } from "@/types";

/**
 * AI engineering capabilities.
 *
 * Each entry describes work that exists in the linked repositories. Practices are
 * written as things built, not as adjectives — a capability list that cannot be
 * traced back to an implementation is a buzzword list.
 */
export const capabilities: Capability[] = [
  {
    id: "agents",
    title: "AI Agents",
    summary:
      "Agents are control flow before they are prompts. I build them as explicit graphs — ordered steps, concurrent branches, and routing that depends on state — so a failing step can be identified instead of a whole prompt being suspect.",
    practices: [
      "Sequential, parallel and conditional workflow graphs, implemented rather than diagrammed",
      "State passed explicitly between nodes so each transition is inspectable",
      "Tool calls treated as a typed boundary, not as free-text the model improvises",
      "Concurrent execution for steps with no data dependency between them",
      "Escalation paths for the cases an agent should not decide alone",
    ],
    tools: ["LangGraph", "LangChain", "Python", "Tool calling"],
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation",
    summary:
      "Most RAG systems fail at retrieval, not at generation. I treat ingestion, chunking and retrieval as the parts with the quality problem, and provenance as a requirement rather than a feature.",
    practices: [
      "Headless-browser ingestion so client-rendered sources are captured instead of returning empty shells",
      "Overlapping chunk windows so a fact spanning a boundary survives whole in at least one chunk",
      "Batched embedding per document, which is the difference between minutes and hours of ingestion",
      "Source URL stored beside every vector, captured at write time so citations are real",
      "Multi-query retrieval to raise recall; contextual compression to raise precision",
      "One embedding model on both sides of the pipeline, enforced by construction",
    ],
    tools: ["OpenAI embeddings", "Astra DB", "FAISS", "Chroma", "LangChain retrievers"],
  },
  {
    id: "llm-apps",
    title: "LLM Applications",
    summary:
      "The boundary between a model and application code is where LLM products break. Anything crossing it gets a schema, so a malformed response fails at the boundary instead of propagating.",
    practices: [
      "Structured output constrained by Pydantic models and TypedDict schemas",
      "Validation at the boundary, so an invalid response is an error rather than a silent bad value",
      "Prompts held as configuration, so behaviour can be tuned without a deployment",
      "Context budget managed deliberately — pruning retrieved documents rather than truncating blindly",
      "Streaming responses on standard Node.js runtimes, no special-cased infrastructure",
    ],
    tools: ["OpenAI API", "Pydantic", "Zod", "Next.js route handlers"],
  },
  {
    id: "automation",
    title: "Intelligent Automation",
    summary:
      "An AI feature only creates value when it is wired into the systems where work actually happens. That means queues, schedules, webhooks and delivery — the unglamorous half that decides whether anything reaches a person.",
    practices: [
      "Slow and scheduled work moved onto Redis-backed queues, off the request path",
      "Scheduled jobs that run on their own clock rather than on a user's click",
      "Two-tier delivery: realtime sockets for connected clients, push for everyone else",
      "Document and export pipelines — PDF and CSV generation as background jobs",
      "One shared transport per integration, so a provider change touches one module",
    ],
    tools: ["Bull", "Redis", "Socket.IO", "Firebase Cloud Messaging", "Resend"],
  },
  {
    id: "reliability",
    title: "AI Reliability",
    summary:
      "A demo has to work once. A system has to keep working while inputs, models and providers change underneath it. That difference is mostly boring engineering, and it is the part I care most about.",
    practices: [
      "Integration tests against real API surfaces backed by in-memory infrastructure",
      "Continuous integration that builds and tests every push before it merges",
      "Fail-fast configuration checks, so a misconfigured service refuses to start rather than failing later",
      "Validation, sanitisation and rate limiting applied at the boundary, not per handler",
      "Explicit failure surfaces — a missing provider produces a visible error, never a silently dropped message",
    ],
    tools: ["Jest", "Supertest", "GitHub Actions", "Joi", "Helmet"],
  },
  {
    id: "delivery",
    title: "Production Delivery",
    summary:
      "Architecture that cannot be deployed is a proposal. I build for the constraints of the target platform from the start — stateless compute, external storage, environment-scoped secrets.",
    practices: [
      "Stateless compute with external object storage, because serverless filesystems do not persist",
      "One codebase that runs as a long-lived server locally and as a function in production",
      "Secrets read from the environment only, never bundled and never committed",
      "Versioned migration and seed scripts instead of manual database edits",
      "Idempotent provisioning, so re-running setup is safe",
    ],
    tools: ["Vercel", "GitHub Actions", "Cloudinary", "MongoDB", "Docker-free deploys"],
  },
];
