import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat } from "@/lib/nova/chat-stream";
import { loadMemory, saveMemory } from "@/lib/nova/memory";
import { pullSentences } from "@/lib/nova/sentences";
import { browserSpeakStop, createRecognizer, speechSupported } from "@/lib/nova/speech";
import { TtsQueue } from "@/lib/nova/tts-queue";
import {
  GREETING,
  detectLang,
  newId,
  type ChatMessage,
  type Feedback,
  type HudStage,
  type Lang,
  type Mode,
  type Phase,
} from "@/lib/nova/types";

const HUD_ORDER: HudStage[] = ["thinking", "searching", "analyzing", "preparing"];

export function useNova() {
  const [mode, setModeState] = useState<Mode>("auto");
  const [live, setLiveState] = useState(true);
  const [phase, setPhase] = useState<Phase>("boot");
  const [hud, setHud] = useState<HudStage | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [partial, setPartial] = useState("");
  const [draft, setDraft] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const [engaged, setEngaged] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const liveRef = useRef(live);
  const phaseRef = useRef(phase);
  const langRef = useRef(lang);
  const modeRef = useRef(mode);
  const messagesRef = useRef(messages);
  const busyRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const ttsRef = useRef(new TtsQueue());
  const recRef = useRef<ReturnType<typeof createRecognizer>>(null);
  const hudTimer = useRef<number[]>([]);
  const listenWatch = useRef<number | null>(null);
  const sendRef = useRef<(raw: string) => Promise<void>>(async () => {});

  liveRef.current = live;
  phaseRef.current = phase;
  langRef.current = lang;
  modeRef.current = mode;
  messagesRef.current = messages;

  const persist = useCallback(
    (next?: Partial<{ messages: ChatMessage[]; lang: Lang; mode: Mode; live: boolean }>) => {
      saveMemory({
        messages: next?.messages ?? messagesRef.current,
        lang: next?.lang ?? langRef.current,
        mode: next?.mode ?? modeRef.current,
        live: next?.live ?? liveRef.current,
      });
    },
    [],
  );

  const stopHud = useCallback(() => {
    hudTimer.current.forEach((id) => window.clearTimeout(id));
    hudTimer.current = [];
  }, []);

  const runHud = useCallback(() => {
    stopHud();
    setHud("thinking");
    HUD_ORDER.forEach((step, i) => {
      if (i === 0) return;
      const id = window.setTimeout(() => setHud(step), i * 420);
      hudTimer.current.push(id);
    });
  }, [stopHud]);

  const stopRec = useCallback(() => {
    try {
      recRef.current?.abort();
    } catch {
      /* already stopped */
    }
    recRef.current = null;
    setPartial("");
    if (listenWatch.current) {
      window.clearTimeout(listenWatch.current);
      listenWatch.current = null;
    }
  }, []);

  const interrupt = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    ttsRef.current.reset();
    browserSpeakStop();
    stopRec();
    stopHud();
    setHud(null);
    setStreamingId(null);
    busyRef.current = false;
  }, [stopHud, stopRec]);

  const sendText = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busyRef.current) return;
      busyRef.current = true;
      stopRec();
      ttsRef.current.reset();

      const nextLang = detectLang(text, langRef.current);
      setLang(nextLang);
      langRef.current = nextLang;

      const history = messagesRef.current.filter((m) => m.text);
      const userMsg: ChatMessage = { id: newId(), role: "user", text, ts: Date.now() };
      const novaMsg: ChatMessage = { id: newId(), role: "nova", text: "", ts: Date.now() };
      const seeded = [...history, userMsg];
      const visible = [...seeded, novaMsg];
      setMessages(visible);
      messagesRef.current = visible;
      setStreamingId(novaMsg.id);
      setPhase("thinking");
      runHud();
      setError(null);

      const ac = new AbortController();
      abortRef.current = ac;
      let assembled = "";
      let ttsBuf = "";
      let startedVoice = false;

      ttsRef.current.onStart = () => {
        startedVoice = true;
        setPhase("speaking");
        setHud("preparing");
      };
      ttsRef.current.onEnd = () => {
        setPhase(liveRef.current ? "listening" : "idle");
        setHud(null);
        busyRef.current = false;
      };

      try {
        await streamChat({
          messages: seeded,
          mode: modeRef.current,
          langHint: nextLang,
          signal: ac.signal,
          onDelta: (chunk) => {
            assembled += chunk;
            ttsBuf += chunk;
            setMessages((prev) =>
              prev.map((m) => (m.id === novaMsg.id ? { ...m, text: assembled } : m)),
            );
            const { ready, rest } = pullSentences(ttsBuf);
            ttsBuf = rest;
            for (const s of ready) ttsRef.current.enqueue(s);
          },
        });
        if (ttsBuf.trim()) ttsRef.current.enqueue(ttsBuf);
        if (!assembled.trim()) {
          assembled =
            nextLang === "ar" ? "ما قدرتش نوصل للنواة دابا." : "Neural core did not return a signal.";
          setMessages((prev) =>
            prev.map((m) => (m.id === novaMsg.id ? { ...m, text: assembled } : m)),
          );
          ttsRef.current.enqueue(assembled);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          busyRef.current = false;
          return;
        }
        const fallback =
          nextLang === "ar"
            ? "النواة العصبية مطفية دابا. نقدر نسمع ونتكلم محلياً حتى يرجع الاتصال."
            : "Neural core is dark. I can still listen and speak locally until the uplink returns.";
        assembled = fallback;
        setMessages((prev) =>
          prev.map((m) => (m.id === novaMsg.id ? { ...m, text: fallback } : m)),
        );
        setError((err as Error).message);
        ttsRef.current.enqueue(fallback);
      } finally {
        setStreamingId(null);
        stopHud();
        const finalMsgs = messagesRef.current.map((m) =>
          m.id === novaMsg.id ? { ...m, text: assembled } : m,
        );
        setMessages(finalMsgs);
        messagesRef.current = finalMsgs;
        persist({ messages: finalMsgs, lang: nextLang });
        if (!startedVoice && !ttsRef.current.active) {
          setPhase(liveRef.current ? "listening" : "idle");
          setHud(null);
          busyRef.current = false;
        }
      }
    },
    [persist, runHud, stopHud, stopRec],
  );

  sendRef.current = sendText;

  const startListening = useCallback(() => {
    if (!liveRef.current) return;
    if (busyRef.current) return;
    if (phaseRef.current === "speaking" || phaseRef.current === "thinking") return;
    stopRec();
    if (!speechSupported()) {
      setPhase("idle");
      return;
    }
    const rec = createRecognizer(langRef.current);
    if (!rec) {
      setPhase("idle");
      return;
    }
    recRef.current = rec;
    let finalText = "";
    rec.onresult = (ev) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const piece = ev.results[i]?.[0]?.transcript ?? "";
        if (ev.results[i]?.isFinal) finalText += piece;
        else interim += piece;
      }
      setPartial((finalText + " " + interim).trim());
      if (listenWatch.current) window.clearTimeout(listenWatch.current);
      listenWatch.current = window.setTimeout(() => {
        const said = (finalText || interim).trim();
        if (said.length > 1) {
          stopRec();
          void sendRef.current(said);
        }
      }, 1100);
    };
    rec.onerror = (ev) => {
      if (ev.error === "not-allowed") {
        setError("Microphone permission denied");
        setLiveState(false);
        liveRef.current = false;
        setPhase("idle");
      }
    };
    rec.onend = () => {
      if (phaseRef.current === "listening" && liveRef.current && recRef.current === rec) {
        try {
          rec.start();
        } catch {
          /* already started */
        }
      }
    };
    try {
      rec.start();
      setPhase("listening");
    } catch {
      setPhase("idle");
    }
  }, [stopRec]);

  useEffect(() => {
    if (phase === "listening") startListening();
  }, [phase, startListening]);

  useEffect(() => {
    const stored = loadMemory();
    setMessages(stored.messages);
    messagesRef.current = stored.messages;
    setModeState(stored.mode);
    modeRef.current = stored.mode;
    const navLang =
      typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("ar")
        ? "ar"
        : stored.lang;
    setLang(navLang);
    langRef.current = navLang;
    const nextLive = stored.mode === "chat" ? stored.live : true;
    setLiveState(nextLive);
    liveRef.current = nextLive;
    setPhase("idle");
  }, []);

  const speakGreeting = useCallback(() => {
    const nextLang = langRef.current;
    const text = GREETING[nextLang];
    const novaMsg: ChatMessage = { id: newId(), role: "nova", text, ts: Date.now() };
    const visible = [...messagesRef.current, novaMsg];
    setMessages(visible);
    messagesRef.current = visible;
    persist({ messages: visible, lang: nextLang });
    busyRef.current = true;
    ttsRef.current.reset();
    ttsRef.current.onStart = () => setPhase("speaking");
    ttsRef.current.onEnd = () => {
      busyRef.current = false;
      setPhase(liveRef.current ? "listening" : "idle");
    };
    setPhase("speaking");
    ttsRef.current.enqueue(text);
  }, [persist]);

  const engage = useCallback(() => {
    if (engaged) return;
    setEngaged(true);
    const nextLive = modeRef.current !== "chat";
    setLiveState(nextLive);
    liveRef.current = nextLive;
    speakGreeting();
  }, [engaged, speakGreeting]);

  const setMode = useCallback(
    (m: Mode) => {
      setModeState(m);
      modeRef.current = m;
      const nextLive = m !== "chat";
      setLiveState(nextLive);
      liveRef.current = nextLive;
      persist({ mode: m, live: nextLive });
      if (nextLive && phaseRef.current === "idle" && engaged) setPhase("listening");
      if (!nextLive) {
        stopRec();
        if (phaseRef.current === "listening") setPhase("idle");
      }
    },
    [engaged, persist, stopRec],
  );

  const toggleLive = useCallback(() => {
    const next = !liveRef.current;
    setLiveState(next);
    liveRef.current = next;
    persist({ live: next });
    if (next && !busyRef.current && engaged) setPhase("listening");
    else if (!next && phaseRef.current === "listening") {
      stopRec();
      setPhase("idle");
    }
  }, [engaged, persist, stopRec]);

  const onMic = useCallback(() => {
    if (!engaged) {
      engage();
      return;
    }
    if (phaseRef.current === "speaking" || phaseRef.current === "thinking") {
      interrupt();
      setPhase("listening");
      return;
    }
    if (phaseRef.current === "listening") {
      stopRec();
      setPhase("idle");
      setLiveState(false);
      liveRef.current = false;
      return;
    }
    setLiveState(true);
    liveRef.current = true;
    setPhase("listening");
  }, [engage, engaged, interrupt, stopRec]);

  const sendDraft = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    if (!engaged) setEngaged(true);
    setDraft("");
    void sendText(text);
  }, [draft, engaged, sendText]);

  const onFeedback = useCallback(
    (id: string, vote: Feedback) => {
      setMessages((prev) => {
        const next = prev.map((m) => (m.id === id ? { ...m, feedback: vote } : m));
        messagesRef.current = next;
        persist({ messages: next });
        return next;
      });
    },
    [persist],
  );

  useEffect(() => () => interrupt(), [interrupt]);

  return {
    mode,
    live,
    phase,
    hud,
    messages,
    partial,
    draft,
    setDraft,
    lang,
    engaged,
    streamingId,
    error,
    engage,
    setMode,
    toggleLive,
    onMic,
    sendDraft,
    onFeedback,
  };
}
