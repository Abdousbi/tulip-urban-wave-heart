import { systemPrompt } from "./prompts";
import type { Mode } from "./types";

const CHAT_URL = "https://api.x.ai/v1/chat/completions";
const TTS_URL = "https://api.x.ai/v1/tts";

export function hasXaiKey(): boolean {
  return Boolean(process.env.XAI_API_KEY?.trim());
}

function authHeaders(): HeadersInit {
  const key = process.env.XAI_API_KEY?.trim();
  if (!key) throw new Error("AI is not available in this environment");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export type ChatTurn = { role: "user" | "assistant" | "system"; content: string };

export async function streamNovaChat(input: {
  messages: ChatTurn[];
  mode: Mode;
  langHint: string;
  signal?: AbortSignal;
}): Promise<Response> {
  const apiKey = process.env.XAI_API_KEY?.trim();
  if (!apiKey) {
    return Response.json({ error: "AI is not available" }, { status: 503 });
  }

  const trimmed = input.messages.slice(-16).map((m) => ({
    role: m.role,
    content: m.content.slice(0, 4000),
  }));

  const upstream = await fetch(CHAT_URL, {
    method: "POST",
    headers: authHeaders(),
    signal: input.signal,
    body: JSON.stringify({
      model: "grok-4.5",
      stream: true,
      max_tokens: 700,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt(input.mode, input.langHint) },
        ...trimmed,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    return Response.json(
      { error: `neural core error ${upstream.status}`, detail: errText.slice(0, 240) },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  let leftover = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.enqueue(encoder.encode("data: {\"t\":\"done\"}\n\n"));
        controller.close();
        return;
      }
      leftover += decoder.decode(value, { stream: true });
      const lines = leftover.split("\n");
      leftover = lines.pop() ?? "";
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine.startsWith("data:")) continue;
        const data = trimmedLine.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const json = JSON.parse(data) as {
            choices?: { delta?: { content?: string } }[];
          };
          const token = json.choices?.[0]?.delta?.content;
          if (token) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ t: "d", c: token })}\n\n`),
            );
          }
        } catch {
          /* skip malformed sse */
        }
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function synthesizeSpeech(input: {
  text: string;
  language: string;
  signal?: AbortSignal;
}): Promise<Response> {
  const apiKey = process.env.XAI_API_KEY?.trim();
  if (!apiKey) {
    return Response.json({ error: "AI is not available" }, { status: 503 });
  }

  const text = input.text.slice(0, 1200);
  if (!text.trim()) {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  const upstream = await fetch(TTS_URL, {
    method: "POST",
    headers: authHeaders(),
    signal: input.signal,
    body: JSON.stringify({
      text,
      voice_id: "helix",
      language: input.language,
      speed: 1.02,
      optimize_streaming_latency: 2,
      output_format: { codec: "mp3", sample_rate: 24000, bit_rate: 64000 },
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return Response.json(
      { error: `voice error ${upstream.status}`, detail: errText.slice(0, 240) },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
