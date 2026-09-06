import type { StackGroup } from "@/types";

/**
 * Technical stack.
 *
 * Restricted to technologies demonstrated in public repositories. Tools that
 * appear on most portfolios but not in the work are deliberately absent.
 */
export const stackGroups: StackGroup[] = [
  {
    group: "AI",
    note: "Agent orchestration, retrieval and output contracts.",
    items: [
      "Python",
      "LangGraph",
      "LangChain",
      "OpenAI API",
      "Embeddings",
      "RAG pipelines",
      "Tool calling",
      "Structured output",
      "Pydantic",
    ],
  },
  {
    group: "Backend",
    note: "APIs, access control and asynchronous work.",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "JWT + RBAC",
      "Socket.IO",
      "Bull queues",
      "Joi",
      "PDFKit",
    ],
  },
  {
    group: "Data",
    note: "Relational, document and vector storage.",
    items: [
      "MongoDB",
      "Mongoose",
      "Redis",
      "Astra DB",
      "FAISS",
      "Chroma",
      "Prisma",
      "GraphQL",
    ],
  },
  {
    group: "Frontend",
    note: "Typed, server-rendered interfaces.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "shadcn/ui",
      "Radix UI",
    ],
  },
  {
    group: "Infrastructure",
    note: "Deployment, CI and platform services.",
    items: [
      "Vercel",
      "GitHub Actions",
      "Git",
      "Supabase",
      "Cloudinary",
      "Firebase",
      "Resend",
    ],
  },
  {
    group: "Quality",
    note: "Proving the system still works after a change.",
    items: [
      "Jest",
      "Supertest",
      "mongodb-memory-server",
      "ESLint",
      "Prettier",
      "Zod",
    ],
  },
];
