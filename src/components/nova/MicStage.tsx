import { Mic, MicOff, Send } from "lucide-react";
import type { FormEvent } from "react";
import type { Lang, Phase } from "@/lib/nova/types";
import { cn } from "@/lib/utils";

export function MicStage({
  phase,
  live,
  lang,
  engaged,
  partial,
  draft,
  onDraft,
  onSend,
  onMic,
}: {
  phase: Phase;
  live: boolean;
  lang: Lang;
  engaged: boolean;
  partial: string;
  draft: string;
  onDraft: (v: string) => void;
  onSend: () => void;
  onMic: () => void;
}) {
  const listening = phase === "listening";
  const speaking = phase === "speaking";
  const thinking = phase === "thinking";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSend();
  };

  const status = partial
    ? partial
    : !engaged
      ? lang === "ar"
        ? "اضغط الميكروفون للتشغيل"
        : "TAP MIC TO ENGAGE"
      : listening
        ? lang === "ar"
          ? "أستمع…"
          : "LISTENING"
        : speaking
          ? lang === "ar"
            ? "أتحدث…"
            : "SPEAKING"
          : thinking
            ? lang === "ar"
              ? "أحلل…"
              : "THINKING"
            : live
              ? "READY"
              : "STANDBY";

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="min-h-5 max-w-md px-4 text-center font-mono text-[11px] tracking-wide text-nova-primary/80">
        {status}
      </p>

      <div className="relative flex size-20 items-center justify-center">
        {listening || !engaged
          ? [0, 1, 2].map((i) => (
              <span
                key={i}
                className="ring-listen pointer-events-none absolute inset-0 rounded-full border border-nova-primary"
                style={{ animationDelay: `${i * 0.55}s` }}
              />
            ))
          : null}
        {speaking ? (
          <span className="pointer-events-none absolute inset-[-10px] flex items-center justify-center gap-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar h-8 w-0.5 rounded-full bg-nova-primary"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onMic}
          aria-label={listening ? "Stop listening" : engaged ? "Start listening" : "Engage NOVA"}
          className={cn(
            "relative z-10 flex size-20 items-center justify-center rounded-full border-2 transition-transform duration-150 ease-out active:scale-[0.96]",
            listening || !engaged
              ? "border-nova-primary bg-nova-primary/20 shadow-[0_0_28px_rgba(0,212,255,0.45)]"
              : speaking
                ? "border-nova-accent bg-nova-accent/20"
                : "border-nova-primary/50 bg-nova-primary/10 hover:border-nova-primary",
          )}
        >
          {listening || live ? (
            <Mic className="size-7 text-nova-primary" />
          ) : (
            <MicOff className="size-7 text-nova-muted" />
          )}
        </button>
      </div>

      <form onSubmit={submit} className="flex w-full max-w-md items-center gap-2 px-3">
        <input
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          dir={lang === "ar" ? "rtl" : "ltr"}
          placeholder={lang === "ar" ? "اكتب رسالتك…" : "Transmit a message…"}
          suppressHydrationWarning
          className="h-11 min-w-0 flex-1 rounded-lg border border-nova-primary/25 bg-nova-bg/70 px-3 font-sans text-sm text-nova-text outline-none placeholder:text-nova-muted focus:border-nova-primary/60"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex size-11 items-center justify-center rounded-lg border border-nova-primary/40 bg-nova-primary/10 text-nova-primary transition-transform duration-150 active:scale-[0.96]"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
