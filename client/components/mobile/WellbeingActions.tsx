import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const MOOD_KEY = "aether_mood";

const moods = [
  { key: "bad", label: "Bad", emoji: "😞" },
  { key: "ok", label: "OK", emoji: "😐" },
  { key: "good", label: "Good", emoji: "🙂" },
  { key: "great", label: "Great", emoji: "😄" },
];

export default function WellbeingActions() {
  const [mood, setMood] = useState<string | null>(null);
  const [breath, setBreath] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MOOD_KEY);
      if (saved) setMood(saved);
    } catch {}
  }, []);

  const setMoodPersist = (m: string) => {
    setMood(m);
    try { localStorage.setItem(MOOD_KEY, m); } catch {}
  };

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-3">
        <p className="text-sm font-medium">Mood check‑in</p>
        <div className="mt-2 flex items-center gap-2">
          {moods.map((m) => (
            <button
              key={m.key}
              onClick={() => setMoodPersist(m.key)}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors ${mood === m.key ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              aria-pressed={mood === m.key}
            >
              <span>{m.emoji}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>
        {mood && (
          <p className="mt-2 text-xs text-muted-foreground">Saved mood: {mood}</p>
        )}
      </div>
      <div className="rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Breathing exercise</p>
          <Button size="sm" onClick={() => setBreath((v) => !v)}>{breath ? "Stop" : "Start"}</Button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <div
            className={`h-20 w-20 rounded-full border-2 ${breath ? "animate-pulse" : ""}`}
            style={{ borderColor: "hsl(var(--primary))" }}
            aria-label="Breathing indicator"
          />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Inhale as the circle expands, exhale as it contracts.</p>
      </div>
    </div>
  );
}
