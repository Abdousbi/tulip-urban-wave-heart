import { useEffect, useRef } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Frame } from "./Frame";
import type { ChatMessage, Feedback } from "@/lib/nova/types";
import { isArabic } from "@/lib/nova/types";
import { cn } from "@/lib/utils";

function MiniBot() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-nova-primary" aria-hidden>
      <rect x="5" y="4" width="14" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9.5" cy="10" r="1.3" fill="currentColor" />
      <circle cx="14.5" cy="10" r="1.3" fill="currentColor" />
      <path d="M9 15h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function ChatPanel({
  messages,
  streamingId,
  onFeedback,
}: {
  messages: ChatMessage[];
  streamingId: string | null;
  onFeedback: (id: string, vote: Feedback) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, streamingId]);

  return (
    <Frame className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-nova-primary/15 px-4 py-3">
        <p className="font-mono text-[11px] tracking-[0.22em] text-nova-muted">COMMS / LOG</p>
        <p className="font-mono text-[10px] tabular-nums text-nova-muted">{messages.length} TX</p>
      </div>
      <div className="nova-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.length === 0 ? (
          <p className="px-2 py-8 text-center font-mono text-xs tracking-wide text-nova-muted">
            Awaiting transmission…
          </p>
        ) : (
          messages.map((m) => {
            const rtl = isArabic(m.text);
            const nova = m.role === "nova";
            return (
              <article
                key={m.id}
                className={cn("flex gap-2", nova ? "items-start" : "flex-row-reverse items-start")}
              >
                {nova ? <MiniBot /> : <span className="size-6 shrink-0" />}
                <div className="max-w-[92%] space-y-1.5">
                  <div
                    dir={rtl ? "rtl" : "ltr"}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-[13px] leading-relaxed text-pretty",
                      nova
                        ? "rounded-tl-sm border-nova-primary/35 bg-nova-primary/8 text-nova-text shadow-[0_0_16px_rgba(0,212,255,0.08)]"
                        : "rounded-tr-sm border-nova-accent/30 bg-nova-accent/10 text-nova-text",
                    )}
                  >
                    {m.text || (m.id === streamingId ? <span className="shimmer font-mono">···</span> : "")}
                  </div>
                  {nova && m.text && m.id !== streamingId ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label="Helpful"
                        onClick={() => onFeedback(m.id, "up")}
                        className={cn(
                          "rounded p-1 text-nova-muted hover:text-nova-primary",
                          m.feedback === "up" && "text-nova-primary",
                        )}
                      >
                        <ThumbsUp className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Not helpful"
                        onClick={() => onFeedback(m.id, "down")}
                        className={cn(
                          "rounded p-1 text-nova-muted hover:text-nova-danger",
                          m.feedback === "down" && "text-nova-danger",
                        )}
                      >
                        <ThumbsDown className="size-3.5" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
        <div ref={endRef} />
      </div>
    </Frame>
  );
}
