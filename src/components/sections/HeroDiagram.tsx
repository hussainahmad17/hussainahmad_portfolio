type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  accent?: boolean;
};

const NODES: Node[] = [
  { id: "user", label: "Request", sub: "user intent", x: 96, y: 14, w: 128 },
  { id: "app", label: "Application", sub: "Next.js · API", x: 96, y: 90, w: 128 },
  {
    id: "orchestrator",
    label: "Orchestrator",
    sub: "state · routing",
    x: 76,
    y: 166,
    w: 168,
    accent: true,
  },
  { id: "llm", label: "LLM", sub: "reasoning", x: 6, y: 252, w: 92 },
  { id: "rag", label: "Retrieval", sub: "vector search", x: 114, y: 252, w: 92 },
  { id: "tools", label: "Tools", sub: "external APIs", x: 222, y: 252, w: 92 },
  { id: "store", label: "Persistence", sub: "records · vectors", x: 84, y: 334, w: 152 },
];

const EDGES = [
  "M160 54 L160 90",
  "M160 130 L160 166",
  "M160 206 L160 226 L52 226 L52 252",
  "M160 206 L160 252",
  "M160 206 L160 226 L268 226 L268 252",
  "M52 292 L52 312 L160 312 L160 334",
  "M160 292 L160 334",
  "M268 292 L268 312 L160 312 L160 334",
];

/**
 * Hero schematic: a request descending through an orchestrator into reasoning,
 * retrieval and tools before reaching persistence — the shape of every system
 * on this site.
 *
 * The flow animation is a CSS keyframe on `stroke-dashoffset`, so this is a
 * Server Component and ships no JavaScript at all. The animated layer is
 * removed entirely under `prefers-reduced-motion`.
 */
export function HeroDiagram() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute inset-0 opacity-70 blur-2xl"
      />
      <svg
        viewBox="0 0 320 380"
        role="img"
        aria-label="System schematic: a request enters the application, passes through an orchestrator, and fans out to a language model, a retrieval layer and external tools before reaching persistence."
        className="relative w-full max-w-sm lg:max-w-md"
      >
        <defs>
          <linearGradient id="hero-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3039" />
            <stop offset="100%" stopColor="#5ef2c0" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#hero-edge)" strokeWidth="1">
          {EDGES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g
          className="hero-flow"
          fill="none"
          stroke="#5ef2c0"
          strokeWidth="1.25"
          strokeLinecap="round"
        >
          {EDGES.map((d, index) => (
            <path
              key={d}
              d={d}
              style={{ animationDelay: `${index * 0.28}s` }}
            />
          ))}
        </g>

        {NODES.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={40}
              rx={9}
              fill={node.accent ? "#12251f" : "#12151a"}
              stroke={node.accent ? "rgba(94,242,192,0.4)" : "#2a3039"}
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + 17}
              textAnchor="middle"
              fill={node.accent ? "#9df7d9" : "#eceef1"}
              fontSize="10.5"
              fontWeight="500"
              fontFamily="var(--font-sans)"
            >
              {node.label}
            </text>
            <text
              x={node.x + node.w / 2}
              y={node.y + 30}
              textAnchor="middle"
              fill="#868e9b"
              fontSize="8"
              fontFamily="var(--font-mono)"
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
