import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SLEEP_STATE_KEY = "aether_sleep_state"; // { sleeping: boolean, start: number, lastDuration: number }

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function SleepTracker() {
  const { toast } = useToast();
  const [sleeping, setSleeping] = useState(false);
  const [start, setStart] = useState<number | null>(null);
  const [last, setLast] = useState<number>(0);
  const [, force] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SLEEP_STATE_KEY);
      if (raw) {
        const state = JSON.parse(raw) as {
          sleeping: boolean;
          start: number | null;
          lastDuration: number;
        };
        setSleeping(state.sleeping);
        setStart(state.start);
        setLast(state.lastDuration || 0);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const state = { sleeping, start, lastDuration: last };
    try { localStorage.setItem(SLEEP_STATE_KEY, JSON.stringify(state)); } catch {}
  }, [sleeping, start, last]);

  useEffect(() => {
    if (sleeping) {
      intervalRef.current = window.setInterval(() => force((v) => v + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sleeping]);

  const elapsed = useMemo(() => (sleeping && start ? Date.now() - start : 0), [sleeping, start]);

  const startSleep = () => {
    if (sleeping) return;
    const now = Date.now();
    setSleeping(true);
    setStart(now);
    toast({ title: "Sleep started", description: "Tracking your sleep now." });
  };
  const stopSleep = () => {
    if (!sleeping || !start) return;
    const dur = Date.now() - start;
    setSleeping(false);
    setStart(null);
    setLast(dur);
    toast({ title: "Sleep saved", description: `Slept ${fmt(dur)}` });
  };

  return (
    <div className="mt-4 rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Sleep tracker</p>
        {sleeping ? (
          <span className="text-xs text-green-600">Sleeping…</span>
        ) : (
          <span className="text-xs text-muted-foreground">Idle</span>
        )}
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border p-3">
          <p className="text-[10px] text-muted-foreground">Last sleep</p>
          <p className="mt-1 text-lg font-semibold">{last ? fmt(last) : "—"}</p>
        </div>
        <div className="rounded-md border p-3">
          <p className="text-[10px] text-muted-foreground">Current</p>
          <p className="mt-1 text-lg font-semibold">{elapsed ? fmt(elapsed) : "—"}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          {!sleeping ? (
            <Button onClick={startSleep}>Start sleep</Button>
          ) : (
            <Button variant="destructive" onClick={stopSleep}>Stop</Button>
          )}
        </div>
      </div>
    </div>
  );
}
