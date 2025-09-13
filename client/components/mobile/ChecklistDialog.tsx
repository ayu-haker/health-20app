import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ChecklistDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Disaster response checklist</DialogTitle>
          <DialogDescription>
            Basic readiness steps. Follow local authorities for official
            guidance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 text-sm">
          <div>
            <p className="font-medium">Before</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                Prepare go‑bag: water, non‑perishables, meds, ID, cash, charger.
              </li>
              <li>Share emergency plan and meeting point.</li>
              <li>Keep power bank charged and fuel above 50%.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">During</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Follow evacuation orders. Avoid flooded roads.</li>
              <li>Tune to official channels. Beware of misinformation.</li>
              <li>Text instead of call to preserve network capacity.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">After</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Check injuries, provide first aid, document damage.</li>
              <li>Avoid downed lines and contaminated water.</li>
              <li>Contact insurers and local relief services.</li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Button asChild>
              <a href="#" download>
                Save checklist
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
