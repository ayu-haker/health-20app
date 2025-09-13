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
import { useToast } from "@/hooks/use-toast";
import { Phone, Share2 } from "lucide-react";
import EmergencyContacts from "./EmergencyContacts";

function buildMapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/hospital/@${lat},${lng},14z`;
}

type Props = { trigger: React.ReactNode; emergency?: { main: string; ambulance?: string; police?: string; fire?: string; alt?: string[] }; country?: { code?: string; name?: string } };

export default function SOSDialog({ trigger, emergency, country }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Location unavailable", description: "Geolocation is not supported on this device." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLoc({ lat: latitude, lng: longitude });
        toast({ title: "Location ready", description: "We will include your location in supported actions." });
      },
      () => toast({ title: "Location error", description: "Could not fetch your location. Check permissions." }),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const shareLocation = () => {
    if (!loc) {
      fetchLocation();
      return;
    }
    const url = buildMapsUrl(loc.lat, loc.lng);
    const msg = `Emergency! My location: ${url}`;
    if (navigator.share) {
      navigator
        .share({ title: "Emergency location", text: msg, url })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(msg);
      toast({ title: "Copied", description: "Location copied to clipboard. Share it with your contacts." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Emergency actions</DialogTitle>
          <DialogDescription>
            {country?.name ? `Detected region: ${country.name}.` : "Use responsibly."} In a life‑threatening situation, call local emergency services.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Button size="lg" className="w-full" asChild>
            <a href={`tel:${(emergency?.main ?? "112")}`}><Phone className="mr-2 h-4 w-4" /> Call {(emergency?.main ?? "112")} {country?.code ? `(${country.code})` : ""}</a>
          </Button>
          {emergency?.alt?.map((n) => (
            <Button key={n} size="lg" variant="secondary" className="w-full" asChild>
              <a href={`tel:${n}`}><Phone className="mr-2 h-4 w-4" /> Alt {n}</a>
            </Button>
          ))}
          <div className="grid grid-cols-3 gap-2">
            {emergency?.ambulance && (
              <Button variant="outline" asChild>
                <a href={`tel:${emergency.ambulance}`}>Ambulance</a>
              </Button>
            )}
            {emergency?.police && (
              <Button variant="outline" asChild>
                <a href={`tel:${emergency.police}`}>Police</a>
              </Button>
            )}
            {emergency?.fire && (
              <Button variant="outline" asChild>
                <a href={`tel:${emergency.fire}`}>Fire</a>
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={fetchLocation} variant="outline">Get location</Button>
            <Button onClick={shareLocation}><Share2 className="mr-2 h-4 w-4" /> Share location</Button>
          </div>
          {loc && (
            <p className="mt-1 truncate text-xs text-muted-foreground">Ready: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
          )}
          <EmergencyContacts
            recommended={[
              { label: country?.code ? `${country.code} Main` : "Emergency", phone: emergency?.main ?? "112" },
              ...((emergency?.alt ?? []).map((n) => ({ label: country?.code ? `${country.code} Alt` : "Alt", phone: n }))),
              ...(emergency?.ambulance ? [{ label: "Ambulance", phone: emergency.ambulance }] : []),
              ...(emergency?.police ? [{ label: "Police", phone: emergency.police }] : []),
              ...(emergency?.fire ? [{ label: "Fire", phone: emergency.fire }] : []),
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
