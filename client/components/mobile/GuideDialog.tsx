import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const scenarios = [
  {
    key: "bleeding",
    label: "Severe bleeding",
    steps: [
      "Call emergency services immediately.",
      "Apply firm, direct pressure with a clean cloth.",
      "Do not remove soaked dressings. Add more layers.",
      "Elevate the limb if possible.",
    ],
  },
  {
    key: "chest",
    label: "Chest pain",
    steps: [
      "Call emergency services.",
      "Keep the person at rest and calm.",
      "If prescribed, help take aspirin unless allergic.",
      "Monitor breathing and prepare for CPR if needed.",
    ],
  },
  {
    key: "choking",
    label: "Choking",
    steps: [
      "Ask if they can cough or speak. If not, call emergency services.",
      "Give 5 back blows, then 5 abdominal thrusts. Repeat.",
      "For infants: 5 back slaps + 5 chest thrusts.",
    ],
  },
  {
    key: "burns",
    label: "Burns",
    steps: [
      "Cool under cool running water for 20 minutes.",
      "Remove tight items (rings/watches).",
      "Cover loosely with sterile, non‑adhesive dressing.",
    ],
  },
];

export default function GuideDialog({ trigger }: { trigger: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const selected = scenarios.find((s) => s.key === active);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>AI Guide (offline)</DialogTitle>
          <DialogDescription>
            Choose a scenario for quick step‑by‑step guidance. This does not
            replace professional medical advice.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <Button
                key={s.key}
                size="sm"
                variant={active === s.key ? "default" : "outline"}
                onClick={() => setActive(s.key)}
              >
                {s.label}
              </Button>
            ))}
          </div>
          {selected ? (
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
              {selected.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a scenario to see steps.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
