import { isArabic, type Lang } from "./types";
import { browserSpeak, browserSpeakStop } from "./speech";
import { fetchTtsBlob } from "./chat-stream";

export class TtsQueue {
  private queue: string[] = [];
  private draining = false;
  private aborted = false;
  private audio: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;
  onStart: (() => void) | null = null;
  onEnd: (() => void) | null = null;

  enqueue(text: string): void {
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean || this.aborted) return;
    this.queue.push(clean);
    if (!this.draining) void this.drain();
  }

  abort(): void {
    this.aborted = true;
    this.queue = [];
    this.stopAudio();
    browserSpeakStop();
  }

  reset(): void {
    this.abort();
    this.aborted = false;
    this.draining = false;
  }

  get active(): boolean {
    return this.draining;
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  private async drain(): Promise<void> {
    this.draining = true;
    this.onStart?.();
    while (this.queue.length && !this.aborted) {
      const text = this.queue.shift()!;
      await this.speakOne(text);
    }
    const clean = !this.aborted;
    this.draining = false;
    if (clean) this.onEnd?.();
  }

  private async speakOne(text: string): Promise<void> {
    if (this.aborted) return;
    const lang: Lang = isArabic(text) ? "ar" : "en";
    const language = lang === "ar" ? "ar-EG" : "en";
    try {
      const blob = await fetchTtsBlob(text, language);
      if (this.aborted) return;
      if (blob && blob.size > 64) {
        await this.playBlob(blob);
        return;
      }
    } catch {
      /* fall through */
    }
    if (this.aborted) return;
    await browserSpeak(text, lang);
  }

  private playBlob(blob: Blob): Promise<void> {
    return new Promise((resolve) => {
      this.stopAudio();
      const url = URL.createObjectURL(blob);
      this.objectUrl = url;
      const audio = new Audio(url);
      this.audio = audio;
      const done = () => {
        audio.onended = null;
        audio.onerror = null;
        resolve();
      };
      audio.onended = done;
      audio.onerror = done;
      void audio.play().catch(() => done());
    });
  }
}
