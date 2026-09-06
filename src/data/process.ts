import type { Principle, ProcessStep } from "@/types";

export const principles: Principle[] = [
  {
    title: "Reliability",
    body: "A model is a probabilistic component inside a deterministic system. The system's job is to make the unpredictable part safe: validate what comes back, constrain what it can do, and define behaviour for the case where it is wrong.",
  },
  {
    title: "Observability",
    body: "If you cannot see what an agent did, you cannot fix it. Explicit state transitions, logged tool calls and retrieval traces turn 'the answer was bad' into a specific step that misbehaved.",
  },
  {
    title: "Security",
    body: "AI systems handle credentials and private data by default. Secrets stay in the environment, inputs are validated and sanitised at the boundary, and access is enforced centrally rather than per handler.",
  },
  {
    title: "Scalability",
    body: "Slow work belongs on a queue, not in a request. Compute stays stateless so it can be replicated, and state lives where it can be shared — which is what makes growth a configuration change rather than a rewrite.",
  },
  {
    title: "Human in the loop",
    body: "The most important thing an agent can know is when to stop. Irreversible actions, low-confidence answers and unfamiliar situations should route to a person by design, not by accident.",
  },
  {
    title: "Evaluation",
    body: "Prompt changes are code changes without tests unless you measure them. A fixed question set, a retrieval quality baseline and a regression check make an improvement provable instead of anecdotal.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Understand the problem",
    body: "What decision or task is this actually replacing, who depends on it, and what does being wrong cost? Most AI projects that fail were correctly built and aimed at the wrong problem.",
  },
  {
    index: "02",
    title: "Design the architecture",
    body: "Decide what the model is responsible for and what it is not. Draw the data path, name the failure modes, and pick where a human belongs — before any code exists.",
  },
  {
    index: "03",
    title: "Build the system",
    body: "Typed boundaries, schema-constrained model output, thin handlers, secrets in the environment. The AI is one component in a system built to normal engineering standards.",
  },
  {
    index: "04",
    title: "Evaluate",
    body: "Measure retrieval quality and answer behaviour against a fixed question set. Establish a baseline first, so later changes can be shown to be improvements rather than assumed to be.",
  },
  {
    index: "05",
    title: "Deploy to production",
    body: "Stateless compute, external storage, environment-scoped configuration, CI that builds and tests before merge. Deployment is a property of the design, not a step at the end.",
  },
  {
    index: "06",
    title: "Monitor and improve",
    body: "Watch what users actually ask, where retrieval misses and where the system escalates. Real usage is the only source of the next set of improvements worth making.",
  },
];
