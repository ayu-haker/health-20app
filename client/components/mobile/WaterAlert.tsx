import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const HYDRATE_KEY = "aether_hydration"; // { target:number, total:number, enabled:boolean, nextAt:number|null }

export default function WaterAlert() {
  const { toast } = useToast();
  const [target, setTarget] = useState(2000); // ml
  const [total, setTotal] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [nextAt, setNextAt] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HYDRATE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as { target:number; total:number; enabled:boolean; nextAt:number|null };
        setTarget(s.target ?? 2000);
        setTotal(s.total ?? 0);
        setEnabled(s.enabled ?? true);
        setNextAt(s.nextAt ?? null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const s = { target, total, enabled, nextAt };
    try { localStorage.setItem(HYDRATE_KEY, JSON.stringify(s)); } catch {}
  }, [target, total, enabled, nextAt]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      if (!enabled) return;
      const now = Date.now();
      const hours = new Date().getHours();
      // Quiet hours 22:00 - 08:00
      if (hours >= 22 || hours < 8) return;
      if (nextAt && now >= nextAt) {
        toast({ title: "Hydration reminder", description: "Time to drink water." });
        // schedule next in 60 minutes
        setNextAt(now + 60 * 60 * 1000);
      }
    }, 60 * 1000); // check every minute
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [enabled, nextAt, toast]);

  const progress = useMemo(() => Math.min(100, Math.round((total / target) * 100)), [total, target]);

  const add = (ml: number) => {
    setTotal((t) => Math.min(target, t + ml));
  };

  const resetDay = () => setTotal(0);
  const remindIn = (min: number) => setNextAt(Date.now() + min * 60 * 1000);

  return (
    <div className="mt-4 rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Water alerts</p>
        <button
          className={`text-xs underline underline-offset-4 ${enabled ? "text-primary" : "text-muted-foreground"}`}
          onClick={() => setEnabled((v) => !v)}
        >
          {enabled ? "On" : "Off"}
        </button>
      </div>
      <div className="mt-2">
        <Progress value={progress} />
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{total} / {target} ml</span>
          <span>{progress}%</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" onClick={() => add(250)}>+250 ml</Button>
        <Button size="sm" variant="secondary" onClick={() => add(500)}>+500 ml</Button>
        <Button size="sm" variant="ghost" onClick={resetDay}>Reset</Button>
      </div>
      <div className="mt-2 grid grid-cols-3 items-center gap-2">
        <label className="text-xs text-muted-foreground">Daily target (ml)</label>
        <Input
          type="number"
          min={500}
          step={100}
          value={target}
          onChange={(e) => setTarget(Math.max(500, Number(e.target.value || 0)))}
          className="col-span-2 h-8"
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => remindIn(15)}>Remind in 15m</Button>
        <Button size="sm" variant="outline" onClick={() => remindIn(60)}>Remind in 1h</Button>
        <span className="text-xs text-muted-foreground">
          {nextAt ? `Next: ${new Date(nextAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "No reminder scheduled"}
        </span>
      </div>
    </div>
  );
}
