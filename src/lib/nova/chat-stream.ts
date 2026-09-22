import type { ChatMessage, Mode } from "./types";

export async function streamChat(input: {
  messages: ChatMessage[];
  mode: Mode;
  langHint: string;
  signal?: AbortSignal;
  onDelta: (chunk: string) => void;
}): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: input.signal,
    body: JSON.stringify({
      mode: input.mode,
      langHint: input.langHint,
      messages: input.messages.map((m) => ({
        role: m.role === "nova" ? "assistant" : "user",
        content: m.text,
      })),
    }),
  });

  if (!res.ok || !res.body) {
    const err = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(err?.error || `uplink failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let leftover = "";
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    leftover += decoder.decode(value, { stream: true });
    const lines = leftover.split("\n");
    leftover = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data) continue;
      try {
        const json = JSON.parse(data) as { t?: string; c?: string };
        if (json.t === "d" && json.c) {
          full += json.c;
          input.onDelta(json.c);
        }
      } catch {
        /* ignore */
      }
    }
  }
  return full;
}

export async function fetchTtsBlob(
  text: string,
  language: string,
  signal?: AbortSignal,
): Promise<Blob | null> {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({ text, language }),
  });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") || "";
  if (type.includes("application/json")) return null;
  return res.blob();
}
