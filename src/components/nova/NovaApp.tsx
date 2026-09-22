import { HoloAvatar } from "./HoloAvatar";
import { ChatPanel } from "./ChatPanel";
import { MicStage } from "./MicStage";
import { StatusHud } from "./StatusHud";
import { TopBar } from "./TopBar";
import { useNova } from "./use-nova";

export function NovaApp() {
  const n = useNova();

  return (
    <div className="nova-grid relative flex h-dvh min-h-0 flex-col overflow-hidden text-nova-text">
      <div className="nova-scanlines pointer-events-none absolute inset-0 z-20" />
      <TopBar mode={n.mode} live={n.live} onMode={n.setMode} onToggleLive={n.toggleLive} />

      <div className="border-b border-nova-primary/10 py-2 lg:hidden">
        <StatusHud active={n.hud} compact />
      </div>

      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-[260px_minmax(0,1fr)_320px] lg:gap-4 lg:p-4">
        <aside className="hidden min-h-0 lg:block">
          <StatusHud active={n.hud} />
        </aside>

        <section className="flex min-h-0 flex-col items-center justify-between gap-2 py-1 lg:py-2">
          <p className="hidden font-mono text-[10px] tracking-[0.32em] text-nova-muted lg:block">
            {n.phase === "thinking"
              ? "NEURAL CORE · ACTIVE"
              : n.phase === "speaking"
                ? "VOICE UPLINK · TX"
                : n.phase === "listening"
                  ? "VOICE UPLINK · RX"
                  : "NEURAL CORE · IDLE"}
          </p>
          <div className="flex min-h-0 w-full flex-1 items-center justify-center">
            <HoloAvatar phase={n.phase} />
          </div>
          <MicStage
            phase={n.phase}
            live={n.live}
            lang={n.lang}
            engaged={n.engaged}
            partial={n.partial}
            draft={n.draft}
            onDraft={n.setDraft}
            onSend={n.sendDraft}
            onMic={n.onMic}
          />
          {n.error ? (
            <p className="max-w-sm text-center font-mono text-[11px] text-nova-danger">{n.error}</p>
          ) : null}
        </section>

        <aside className="min-h-0 max-lg:h-[28vh]">
          <ChatPanel messages={n.messages} streamingId={n.streamingId} onFeedback={n.onFeedback} />
        </aside>
      </div>
    </div>
  );
}
