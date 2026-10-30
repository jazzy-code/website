import type { ReactNode } from "react";

/*
 * Line-art illustrations for the service cards, drawn in the brand purples on
 * a dark purple panel. Each one has a small CSS animation (classes in
 * globals.css) that stops for users who prefer reduced motion.
 */

const stroke = "#C79BFF";
const soft = "#8B5CC4";
const white = "#F4F4F6";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 180"
      role="presentation"
      aria-hidden="true"
      className="size-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Web() {
  return (
    <Frame>
      <rect x="52" y="26" width="216" height="130" rx="12" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
      <path d="M52 50h216" stroke={soft} strokeWidth="2" />
      <circle cx="68" cy="38" r="3" fill={stroke} />
      <circle cx="80" cy="38" r="3" fill={soft} />
      <circle cx="92" cy="38" r="3" fill={soft} />
      <rect x="68" y="64" width="96" height="10" rx="5" fill={white} opacity="0.9" />
      <rect x="68" y="82" width="70" height="6" rx="3" fill={stroke} opacity="0.7" />
      <rect x="68" y="108" width="52" height="18" rx="9" fill={soft} />
      <rect x="180" y="64" width="72" height="62" rx="8" fill={soft} opacity="0.45" />
      <g className="art-float">
        <rect x="204" y="104" width="76" height="40" rx="8" fill="#2a1244" stroke={stroke} strokeWidth="2" />
        <rect x="214" y="116" width="40" height="6" rx="3" fill={white} opacity="0.85" />
        <rect x="214" y="128" width="24" height="5" rx="2.5" fill={stroke} opacity="0.7" />
      </g>
      <path className="art-cursor" d="M150 98l0 22 6-5 4 9 4-2-4-9 8 0z" fill={white} stroke="#1b0b2b" strokeWidth="1.5" />
    </Frame>
  );
}

function CustomSoftware() {
  return (
    <Frame>
      <g className="art-float" style={{ animationDelay: "0ms" }}>
        <path d="M160 36l82 28-82 28-82-28z" fill="#2a1244" stroke={stroke} strokeWidth="2" />
      </g>
      <g className="art-float" style={{ animationDelay: "250ms" }}>
        <path d="M78 84l82 28 82-28" stroke={soft} strokeWidth="2.5" />
        <path d="M78 104l82 28 82-28" stroke={soft} strokeWidth="2.5" opacity="0.7" />
      </g>
      <g className="art-float" style={{ animationDelay: "500ms" }}>
        <path d="M78 124l82 28 82-28" stroke={soft} strokeWidth="2.5" opacity="0.45" />
      </g>
      <path d="M132 58l-14 6 14 6M188 58l14 6-14 6M170 54l-20 20" stroke={white} strokeWidth="2.5" />
    </Frame>
  );
}

function Dashboards() {
  const bars = [
    { x: 64, h: 44 },
    { x: 94, h: 70 },
    { x: 124, h: 54 },
    { x: 154, h: 92 },
  ];
  return (
    <Frame>
      <rect x="40" y="24" width="240" height="132" rx="12" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
      {bars.map(({ x, h }, i) => (
        <rect
          key={x}
          className="art-bar"
          x={x}
          y={136 - h}
          width="18"
          height={h}
          rx="4"
          fill={i === 3 ? stroke : soft}
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
      <path d="M56 136h132" stroke={soft} strokeWidth="2" />
      <path
        className="art-draw"
        pathLength="1"
        d="M204 112l22-18 18 10 24-32"
        stroke={white}
        strokeWidth="3"
      />
      <circle cx="268" cy="72" r="4" fill={stroke} />
      <rect x="204" y="124" width="64" height="8" rx="4" fill={soft} opacity="0.6" />
    </Frame>
  );
}

function Apis() {
  const nodes = [
    [70, 48],
    [250, 48],
    [70, 132],
    [250, 132],
  ];
  return (
    <Frame>
      {nodes.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          className="art-flow"
          d={`M160 90L${x} ${y}`}
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="4 8"
        />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`n-${x}-${y}`}>
          <circle cx={x} cy={y} r="16" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
          <circle cx={x} cy={y} r="5" fill={stroke} />
        </g>
      ))}
      <circle cx="160" cy="90" r="30" fill="#2a1244" stroke={stroke} strokeWidth="2.5" />
      <path d="M150 78c-6 0-6 4-6 8s-2 4-4 4c2 0 4 0 4 4s0 8 6 8M170 78c6 0 6 4 6 8s2 4 4 4c-2 0-4 0-4 4s0 8-6 8" stroke={white} strokeWidth="2.5" />
    </Frame>
  );
}

function Gear({
  cx,
  cy,
  r,
  reverse,
}: {
  cx: number;
  cy: number;
  r: number;
  reverse?: boolean;
}) {
  const circumference = 2 * Math.PI * r;
  const teeth = Math.round(r / 3.2);
  const dash = circumference / (teeth * 2);
  return (
    <g
      className={reverse ? "art-spin-reverse" : "art-spin"}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r + 5}
        stroke={reverse ? soft : stroke}
        strokeWidth="9"
        strokeDasharray={`${dash} ${dash}`}
      />
      <circle cx={cx} cy={cy} r={r} fill="#2a1244" stroke={reverse ? soft : stroke} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r * 0.38} stroke={white} strokeWidth="2.5" />
    </g>
  );
}

function Automation() {
  return (
    <Frame>
      <Gear cx={122} cy={86} r={36} />
      <Gear cx={202} cy={116} r={24} reverse />
      <g className="art-float">
        <rect x="226" y="30" width="60" height="30" rx="15" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
        <path d="M242 45l6 6 12-12" stroke={white} strokeWidth="3" />
      </g>
      <path d="M44 150h232" stroke={soft} strokeWidth="2" strokeDasharray="2 8" />
    </Frame>
  );
}

function Cloud() {
  return (
    <Frame>
      <g className="art-float">
        <path
          d="M106 98a30 30 0 0 1 4-60 40 40 0 0 1 76-8 34 34 0 0 1 22 66z"
          fill="#2a1244"
          stroke={stroke}
          strokeWidth="2.5"
        />
      </g>
      <rect x="112" y="116" width="96" height="14" rx="5" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
      <rect x="112" y="136" width="96" height="14" rx="5" fill="#1b0b2b" stroke={soft} strokeWidth="2" />
      <circle cx="124" cy="123" r="2.5" fill={stroke} />
      <circle cx="124" cy="143" r="2.5" fill={stroke} />
      <g className="art-rise">
        <path d="M160 108v-26M150 92l10-12 10 12" stroke={white} strokeWidth="3" />
      </g>
    </Frame>
  );
}

const art = {
  web: Web,
  "custom-software": CustomSoftware,
  dashboards: Dashboards,
  apis: Apis,
  automation: Automation,
  cloud: Cloud,
} as const;

/** Illustration for a service id; renders nothing for an unknown id. */
export function ServiceArt({ id }: { id: string }) {
  const Art = art[id as keyof typeof art];
  return Art ? <Art /> : null;
}
