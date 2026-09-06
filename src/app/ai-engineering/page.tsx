import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { StackSection } from "@/components/sections/StackSection";
import { ContactCta } from "@/components/sections/ContactCta";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { buildMetadata } from "@/lib/metadata";
import type { ArchitectureLayer } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "AI Engineering",
  description:
    "How I build AI systems: agent control flow, retrieval quality, structured output, evaluation, reliability and deployment — described through implementation rather than buzzwords.",
  path: "/ai-engineering",
  keywords: [
    "AI agents",
    "RAG architecture",
    "LangGraph",
    "LLM application architecture",
    "AI evaluation",
    "AI reliability",
  ],
});

/**
 * A reference architecture, not a project. It shows where each capability on this
 * page sits in a real system, so the list below reads as a system rather than as
 * six unrelated skills.
 */
const referenceArchitecture: ArchitectureLayer[] = [
  {
    label: "Interface",
    nodes: [
      { title: "Application", detail: "Server components · streaming" },
      { title: "Channels", detail: "Chat · API · scheduled triggers" },
    ],
  },
  {
    label: "Boundary",
    nodes: [
      { title: "Validation", detail: "Typed request schemas" },
      { title: "Auth + policy", detail: "Who may ask for what" },
      { title: "Rate limiting", detail: "Cost and abuse control" },
    ],
  },
  {
    label: "Orchestration",
    nodes: [
      {
        title: "Agent graph",
        detail: "Explicit state · routing · retries",
        accent: true,
      },
      { title: "Human-in-the-loop", detail: "Escalation on low confidence" },
    ],
  },
  {
    label: "Capabilities",
    nodes: [
      { title: "Reasoning", detail: "LLM with a bounded role" },
      { title: "Retrieval", detail: "Vector search · reranking" },
      { title: "Tools", detail: "Typed calls into real systems" },
    ],
  },
  {
    label: "Contracts",
    nodes: [
      {
        title: "Structured output",
        detail: "Schema-validated at the boundary",
        accent: true,
      },
      { title: "Citations", detail: "Provenance carried with the answer" },
    ],
  },
  {
    label: "Operations",
    nodes: [
      { title: "Evaluation", detail: "Fixed question set · baselines" },
      { title: "Observability", detail: "Traces of steps and retrievals" },
      { title: "Queues + workers", detail: "Slow work off the request path" },
    ],
  },
  {
    label: "State",
    nodes: [
      { title: "Vector store", detail: "Chunks · embeddings · sources" },
      { title: "Application data", detail: "Records and audit trail" },
    ],
  },
];

export default function AiEngineeringPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
            AI Engineering
          </p>
          <h1 className="mt-6 max-w-3xl text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
            The model is one component. The system is the work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Calling an API is the easy part and it is not where AI products fail. They fail on
            control flow, retrieval quality, output contracts, evaluation and everything that
            happens after deployment.
          </p>
        </div>
      </div>

      <section className="border-b border-line py-16 sm:py-20" aria-label="Reference architecture">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 className="text-[length:var(--text-h3)] leading-tight font-medium">
                A reference architecture
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                This is the shape most of my AI work takes. The capabilities below are not a
                skills list — each one is a layer of this diagram, and they are only worth
                anything together.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Two layers do most of the work in practice: the orchestration layer, which
                decides what happens and when a person is involved, and the contracts layer,
                which stops a bad model response from becoming a bad application state.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ArchitectureDiagram
                layers={referenceArchitecture}
                caption="Highlighted layers are the two that most often separate a system that holds up from a demonstration that does not."
              />
            </div>
          </div>
        </div>
      </section>

      <CapabilitiesSection />
      <Philosophy />
      <Process />
      <StackSection />
      <ContactCta />
    </>
  );
}
