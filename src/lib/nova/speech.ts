import type { Lang } from "./types";

type RecogResult = {
  readonly results: ArrayLike<{
    readonly isFinal: boolean;
    readonly length: number;
    readonly 0: { transcript: string };
  }>;
  readonly resultIndex: number;
};

type RecogInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
  onresult: ((ev: RecogResult) => void) | null;
};

type RecogCtor = new () => RecogInstance;

function getCtor(): RecogCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: RecogCtor;
    webkitSpeechRecognition?: RecogCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speechSupported(): boolean {
  return getCtor() !== null;
}

export function createRecognizer(lang: Lang): RecogInstance | null {
  const Ctor = getCtor();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.lang = lang === "ar" ? "ar-MA" : "en-US";
  return rec;
}

export function browserSpeak(text: string, lang: Lang): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ar" ? "ar-SA" : "en-US";
    u.rate = 1.02;
    u.pitch = 0.92;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export function browserSpeakStop(): void {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}
