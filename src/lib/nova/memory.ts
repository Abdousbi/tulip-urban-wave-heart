import type { ChatMessage, Lang, Mode } from "./types";

const KEY = "nova-memory-v1";
const MAX = 40;

type Store = {
  messages: ChatMessage[];
  lang: Lang;
  mode: Mode;
  live: boolean;
};

const empty: Store = {
  messages: [],
  lang: "en",
  mode: "auto",
  live: true,
};

export function loadMemory(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-MAX) : [],
      lang: parsed.lang === "ar" ? "ar" : "en",
      mode: parsed.mode === "chat" || parsed.mode === "action" ? parsed.mode : "auto",
      live: parsed.live !== false,
    };
  } catch {
    return empty;
  }
}

export function saveMemory(partial: Partial<Store>): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadMemory();
    const next: Store = {
      messages: (partial.messages ?? current.messages).slice(-MAX),
      lang: partial.lang ?? current.lang,
      mode: partial.mode ?? current.mode,
      live: partial.live ?? current.live,
    };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode */
  }
}
