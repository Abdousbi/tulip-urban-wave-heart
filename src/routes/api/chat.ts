import { createFileRoute } from "@tanstack/react-router";
import { streamNovaChat, type ChatTurn } from "@/lib/nova/xai.server";
import type { Mode } from "@/lib/nova/types";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: {
          messages?: ChatTurn[];
          mode?: Mode;
          langHint?: string;
        };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400 });
        }

        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return Response.json({ error: "messages required" }, { status: 400 });
        }

        const mode: Mode =
          body.mode === "chat" || body.mode === "action" ? body.mode : "auto";
        const langHint = body.langHint === "ar" ? "ar" : "en";

        return streamNovaChat({
          messages: messages.filter(
            (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
          ),
          mode,
          langHint,
          signal: request.signal,
        });
      },
    },
  },
});
