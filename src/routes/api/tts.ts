import { createFileRoute } from "@tanstack/react-router";
import { synthesizeSpeech } from "@/lib/nova/xai.server";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { text?: string; language?: string };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400 });
        }
        const text = typeof body.text === "string" ? body.text : "";
        const language = typeof body.language === "string" ? body.language : "en";
        return synthesizeSpeech({
          text,
          language,
          signal: request.signal,
        });
      },
    },
  },
});
