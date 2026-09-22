const BOUNDARY = /(?<=[.!?؟。…])\s+|(?<=\n)/;

export function pullSentences(buffer: string): { ready: string[]; rest: string } {
  const parts = buffer.split(BOUNDARY);
  if (parts.length <= 1) return { ready: [], rest: buffer };
  const rest = parts.pop() ?? "";
  const ready = parts.map((p) => p.trim()).filter((p) => p.length >= 2);
  return { ready, rest };
}
