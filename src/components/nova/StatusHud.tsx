import { Activity, AudioLines, Brain, ScanSearch } from "lucide-react";
import { Frame } from "./Frame";
import { HUD_STEPS, type HudStage } from "@/lib/nova/types";
import { cn } from "@/lib/utils";

const ICONS = {
  thinking: Brain,
  searching: ScanSearch,
  analyzing: Activity,
  preparing: AudioLines,
} as const;

const ORDER: HudStage[] = ["thinking", "searching", "analyzing", "preparing"];

export function StatusHud({
  active,
  compact,
}: {
  active: HudStage | null;
  compact?: boolean;
}) {
  const activeIdx = active ? ORDER.indexOf(active) : -1;

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto px-3">
        {HUD_STEPS.map((step, i) => {
          const on = i <= activeIdx;
          const current = step.id === active;
          return (
            <span
              key={step.id}
              className={cn(
                "shrink-0 rounded-full border px-2 py-1 font-mono text-[9px] tracking-widest",
                current
                  ? "border-nova-primary/60 text-nova-primary"
                  : on
                    ? "border-nova-primary/30 text-nova-primary/80"
                    : "border-nova-primary/15 text-nova-muted",
              )}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <Frame className="flex h-full flex-col gap-3 p-4">
      <p className="font-mono text-[11px] tracking-[0.22em] text-nova-muted">SYS / PIPELINE</p>
      <ul className="flex flex-1 flex-col justify-evenly gap-2">
        {HUD_STEPS.map((step, i) => {
          const Icon = ICONS[step.id];
          const on = i <= activeIdx;
          const current = step.id === active;
          return (
            <li
              key={step.id}
              className={cn(
                "rounded-md border px-3 py-3 transition-colors duration-300",
                current
                  ? "border-nova-primary/50 bg-nova-primary/8"
                  : on
                    ? "border-nova-primary/25 bg-nova-primary/5"
                    : "border-nova-primary/10 bg-transparent",
              )}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={cn("size-3.5", current || on ? "text-nova-primary" : "text-nova-muted")}
                  strokeWidth={1.75}
                />
                <span
                  className={cn(
                    "font-mono text-[11px] tracking-[0.18em]",
                    current ? "hud-active" : on ? "text-nova-primary" : "text-nova-muted",
                    current && "shimmer",
                  )}
                >
                  {step.label}
                </span>
              </div>
              <p
                className={cn(
                  "mt-1 text-[12px] leading-snug",
                  current || on ? "text-nova-text/80" : "text-nova-muted",
                )}
              >
                {step.detail}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="font-mono text-[10px] tracking-widest text-nova-muted/80">CORE · STABLE</p>
    </Frame>
  );
}
