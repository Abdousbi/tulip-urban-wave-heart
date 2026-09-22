import { useEffect, useRef } from "react";
import type { Phase } from "@/lib/nova/types";
import { cn } from "@/lib/utils";

const DOTS = [
  { x: 8, y: 18, d: 9 },
  { x: 92, y: 22, d: 11 },
  { x: 14, y: 72, d: 8 },
  { x: 86, y: 68, d: 10 },
  { x: 48, y: 6, d: 12 },
  { x: 52, y: 94, d: 9 },
  { x: 6, y: 46, d: 13 },
  { x: 94, y: 48, d: 8 },
  { x: 22, y: 12, d: 14 },
  { x: 78, y: 14, d: 10 },
  { x: 28, y: 88, d: 11 },
  { x: 74, y: 86, d: 13 },
];

export function HoloAvatar({ phase }: { phase: Phase }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const speaking = phase === "speaking";
  const listening = phase === "listening";
  const thinking = phase === "thinking";

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      const x = Math.max(-3.2, Math.min(3.2, dx * 8));
      const y = Math.max(-2.2, Math.min(2.2, dy * 6));
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[min(280px,34vh)] lg:max-w-[min(400px,48vh)]">
      {DOTS.map((p, i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full bg-nova-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float-dot ${p.d * 0.28}s ease-in-out ${i * 0.18}s infinite`,
            boxShadow: "0 0 8px var(--color-nova-primary)",
          }}
        />
      ))}

      <div className="absolute inset-[4%] rounded-full border border-nova-primary/20" />
      <svg className="orbit pointer-events-none absolute inset-[2%]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="currentColor" className="text-nova-primary/40" strokeWidth="0.4" strokeDasharray="2 5" />
      </svg>
      <svg className="orbit-rev pointer-events-none absolute inset-[8%]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="currentColor" className="text-nova-accent/50" strokeWidth="0.35" strokeDasharray="1 7" />
      </svg>
      <svg
        className={cn("pointer-events-none absolute inset-[14%]", thinking ? "orbit-fast" : "orbit")}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" className="text-nova-primary/30" strokeWidth="0.3" strokeDasharray="12 8 2 8" />
      </svg>

      <div className="scan-beam" />

      <svg
        viewBox="0 0 200 240"
        className="holo-flicker relative z-10 h-full w-full drop-shadow-[0_0_18px_rgba(0,212,255,0.35)]"
      >
        <defs>
          <filter id="nova-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#0a1a36" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e6f4ff" />
            <stop offset="45%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* shoulders */}
        <path
          d="M38 198 L22 228 H178 L162 198"
          fill="url(#plate)"
          stroke="#00d4ff"
          strokeWidth="1.4"
          filter="url(#nova-glow)"
        />
        <path d="M48 198 L40 216 H160 L152 198" fill="none" stroke="#7c8cf8" strokeWidth="0.6" />

        {/* neck */}
        <rect x="86" y="168" width="28" height="18" rx="3" fill="url(#plate)" stroke="#00d4ff" strokeWidth="1.2" />
        <path d="M90 174 H110 M90 180 H110" stroke="#00d4ff" strokeOpacity="0.5" strokeWidth="0.8" />

        {/* helmet */}
        <path
          d="M100 18 L148 38 L162 92 L148 148 L100 168 L52 148 L38 92 L52 38 Z"
          fill="url(#plate)"
          stroke="#00d4ff"
          strokeWidth="1.6"
          filter="url(#nova-glow)"
        />
          <path
          d="M100 28 L140 44 L152 90 L140 138 L100 156 L60 138 L48 90 L60 44 Z"
          fill="none"
          stroke="#7c8cf8"
          strokeWidth="0.7"
          strokeDasharray="6 4"
        />

        {/* crest */}
        <path d="M100 18 L100 6 L108 14 L100 18 L92 14 Z" fill="#00d4ff" opacity="0.85" filter="url(#nova-glow)" />

        {/* ear vents */}
        <path d="M38 84 L22 90 L22 108 L38 114" fill="none" stroke="#00d4ff" strokeWidth="1.3" />
        <path d="M162 84 L178 90 L178 108 L162 114" fill="none" stroke="#00d4ff" strokeWidth="1.3" />
        <path d="M26 96 H34 M26 102 H34 M166 96 H174 M166 102 H174" stroke="#00d4ff" strokeWidth="0.8" />

        {/* visor */}
        <path
          d="M58 82 H142 L136 112 H64 Z"
          fill={listening ? "rgba(0,212,255,0.28)" : "rgba(0,212,255,0.14)"}
          stroke="#00d4ff"
          strokeWidth="1.3"
          filter="url(#nova-glow)"
        />

        <g ref={pupilRef} className="eye-pulse" style={{ transformOrigin: "100px 96px" }}>
          <ellipse cx="80" cy="96" rx={listening ? 8 : 7} ry={listening ? 5.5 : 4.5} fill="#00d4ff" />
          <ellipse cx="120" cy="96" rx={listening ? 8 : 7} ry={listening ? 5.5 : 4.5} fill="#00d4ff" />
          <circle cx="80" cy="96" r="2.2" fill="#e6f4ff" />
          <circle cx="120" cy="96" r="2.2" fill="#e6f4ff" />
        </g>

        {/* mouth / equalizer */}
        {speaking ? (
          <g transform="translate(100 132)" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round">
            {[ -16, -10, -4, 2, 8, 14 ].map((x, i) => (
              <line
                key={x}
                x1={x}
                x2={x}
                y1="-6"
                y2="6"
                className="wave-bar"
                style={{ animationDelay: `${i * 0.09}s` }}
              />
            ))}
          </g>
        ) : (
          <path d="M84 132 Q100 140 116 132" fill="none" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" />
        )}

        {/* jaw vents */}
        <path d="M70 148 L86 160 M130 148 L114 160" stroke="#00d4ff" strokeOpacity="0.55" strokeWidth="1" />

        {/* chest core */}
        <g transform="translate(100 210)">
          <polygon
            points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1.3"
            filter="url(#nova-glow)"
          />
          <circle r="6" fill="url(#core)" className="core-pulse" />
        </g>
      </svg>
    </div>
  );
}
