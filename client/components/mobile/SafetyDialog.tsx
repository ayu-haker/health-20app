import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function mapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/@${lat},${lng},14z`;
}

export default function SafetyDialog({ trigger }: { trigger: React.ReactNode }) {
  const { toast } = useToast();
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Location unavailable", description: "Geolocation not supported." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => toast({ title: "Location error", description: "Check permissions." }),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const share = () => {
    const msg = loc
      ? `I'm sharing my location: ${mapsUrl(loc.lat, loc.lng)}`
      : `I'm sharing my location.`;
    if (navigator.share) {
      navigator.share({ title: "My location", text: msg }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(msg);
      toast({ title: "Copied", description: "Message copied to clipboard." });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Personal safety</DialogTitle>
          <DialogDescription>Share your status and location with trusted contacts.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Button variant="outline" onClick={getLocation}>Get location</Button>
          <Button onClick={share}><Share2 className="mr-2 h-4 w-4" /> Share now</Button>
          {loc && (
            <p className="truncate text-xs text-muted-foreground">Ready: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
