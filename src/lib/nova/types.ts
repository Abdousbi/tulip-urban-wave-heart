export type Mode = "auto" | "chat" | "action";
export type Lang = "en" | "ar";
export type Phase = "boot" | "idle" | "listening" | "thinking" | "speaking";
export type HudStage = "thinking" | "searching" | "analyzing" | "preparing";
export type Role = "user" | "nova";
export type Feedback = "up" | "down";

export type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  ts: number;
  feedback?: Feedback;
};

export const HUD_STEPS: { id: HudStage; label: string; detail: string }[] = [
  { id: "thinking", label: "THINKING", detail: "Understanding your message..." },
  { id: "searching", label: "SEARCHING", detail: "Browsing for the best solution..." },
  { id: "analyzing", label: "ANALYZING", detail: "Processing context..." },
  { id: "preparing", label: "PREPARING", detail: "Crafting the perfect response..." },
];

export const GREETING: Record<Lang, string> = {
  ar: "أهلاً بك، أنا نوفا. واش تحتاج نعاونك بيه اليوم؟",
  en: "Welcome. I am NOVA. How can I help you today?",
};

export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

export function detectLang(text: string, fallback: Lang = "en"): Lang {
  return isArabic(text) ? "ar" : fallback;
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
