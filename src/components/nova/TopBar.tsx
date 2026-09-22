import { Cpu } from "lucide-react";
import type { Mode } from "@/lib/nova/types";
import { cn } from "@/lib/utils";

const MODES: { id: Mode; label: string }[] = [
  { id: "auto", label: "AUTO" },
  { id: "chat", label: "CHAT" },
  { id: "action", label: "ACTION" },
];

export function TopBar({
  mode,
  live,
  onMode,
  onToggleLive,
}: {
  mode: Mode;
  live: boolean;
  onMode: (m: Mode) => void;
  onToggleLive: () => void;
}) {
  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-nova-primary/15 px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md border border-nova-primary/40 bg-nova-primary/10">
          <Cpu className="size-4 text-nova-primary" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="glow-cyan font-mono text-sm tracking-[0.28em] text-nova-primary">NOVA AI</p>
          <p className="hidden font-mono text-[10px] tracking-widest text-nova-muted sm:block">
            HOLOGRAPHIC OPS
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-nova-primary/20 bg-nova-bg/60 p-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onMode(m.id)}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest transition-colors duration-150 sm:px-3",
              mode === m.id
                ? "bg-nova-primary/15 text-nova-primary"
                : "text-nova-muted hover:text-nova-text",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggleLive}
        className="flex items-center gap-2 rounded-full border border-nova-primary/20 px-2 py-1 sm:px-3"
        aria-pressed={live}
      >
        <span className={cn(live ? "live-dot" : "size-2 rounded-full bg-nova-muted")} />
        <span className="font-mono text-[11px] tracking-[0.2em] text-nova-text">
          {live ? "LIVE MODE" : "PAUSED"}
        </span>
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        <span className="live-dot" />
        <span className="font-mono text-[11px] tracking-[0.18em] text-nova-text">Online</span>
      </div>
    </header>
  );
}
