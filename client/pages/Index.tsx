import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SOSDialog from "@/components/mobile/SOSDialog";
import GuideDialog from "@/components/mobile/GuideDialog";
import ChecklistDialog from "@/components/mobile/ChecklistDialog";
import SafetyDialog from "@/components/mobile/SafetyDialog";
import {
  Ambulance,
  Activity,
  BookOpen,
  Stethoscope,
  HeartPulse,
  Image as ImageIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { reverseGeocode, getEmergencyForCountry, type EmergencyNumbers } from "@/lib/emergency";

export default function Index() {
  const { toast } = useToast();
  const [visualAid, setVisualAid] = useState(false);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [country, setCountry] = useState<{ code?: string; name?: string }>({});
  const [emergency, setEmergency] = useState<EmergencyNumbers>({ main: "112" });

  useEffect(() => {
    if (!visualAid) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY });
    };
  }, [visualAid]);

  const getLocation = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("Geolocation not supported"));
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 8000 },
      );
    });

  const setGeoContext = async (position: { lat: number; lng: number }) => {
    try {
      const res = await reverseGeocode(position.lat, position.lng);
      setCountry({ code: res.countryCode, name: res.countryName });
      setEmergency(getEmergencyForCountry(res.countryCode));
    } catch {}
  };

  const findHospitals = async () => {
    try {
      const position = await getLocation();
      setLoc(position);
      setGeoContext(position);
      const url = `https://www.google.com/maps/search/hospital/@${position.lat},${position.lng},14z`;
      window.open(url, "_blank");
    } catch {
      window.open("https://www.google.com/maps/search/hospital+near+me", "_blank");
    }
  };

  const callEmergency = () => {
    window.location.href = "tel:911";
  };

  const featureTiles: Array<React.ReactNode> = [
    <SOSDialog key="sos-tile" trigger={
      <Card className="group cursor-pointer transition-colors hover:bg-accent/30">
        <CardHeader className="p-4">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary bg-red-50 text-red-600">
            <Ambulance className="size-5" />
          </div>
          <CardTitle className="text-sm">Active SOS</CardTitle>
          <CardDescription className="hidden sm:block">Emergency actions</CardDescription>
        </CardHeader>
      </Card>
    } />,
    <Card key="kit" className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <Stethoscope className="size-5" />
        </div>
        <CardTitle className="text-sm"><a href="/first-aid">First Aid Kit</a></CardTitle>
        <CardDescription className="hidden sm:block">Open the guide</CardDescription>
      </CardHeader>
    </Card>,
    <Card key="hospitals" onClick={findHospitals as any} className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <MapPin className="size-5" />
        </div>
        <CardTitle className="text-sm">Find Hospitals</CardTitle>
        <CardDescription className="hidden sm:block">Near you</CardDescription>
      </CardHeader>
    </Card>,
    <Card key="guide" className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <BookOpen className="size-5" />
        </div>
        <CardTitle className="text-sm"><a href="/first-aid">First Aid Guide</a></CardTitle>
        <CardDescription className="hidden sm:block">CPR, bleeding, choking</CardDescription>
      </CardHeader>
    </Card>,
    <ChecklistDialog key="disaster" trigger={
      <Card className="group cursor-pointer transition-colors hover:bg-accent/30">
        <CardHeader className="p-4">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
            <ShieldCheck className="size-5" />
          </div>
          <CardTitle className="text-sm">Disaster Response</CardTitle>
          <CardDescription className="hidden sm:block">Checklists</CardDescription>
        </CardHeader>
      </Card>
    } />,
    <GuideDialog key="ai" trigger={
      <Card className="group cursor-pointer transition-colors hover:bg-accent/30">
        <CardHeader className="p-4">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
            <Activity className="size-5" />
          </div>
          <CardTitle className="text-sm">AI Guide</CardTitle>
          <CardDescription className="hidden sm:block">Symptom triage</CardDescription>
        </CardHeader>
      </Card>
    } />,
    <Card key="call" onClick={callEmergency} className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <Phone className="size-5" />
        </div>
        <CardTitle className="text-sm">Emergency Number</CardTitle>
        <CardDescription className="hidden sm:block">Call now</CardDescription>
      </CardHeader>
    </Card>,
    <Card key="visual" onClick={() => setVisualAid(true)} className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <ImageIcon className="size-5" />
        </div>
        <CardTitle className="text-sm">Visual Aid</CardTitle>
        <CardDescription className="hidden sm:block">Attention screen</CardDescription>
      </CardHeader>
    </Card>,
    <SafetyDialog key="safety" trigger={
      <Card className="group cursor-pointer transition-colors hover:bg-accent/30">
        <CardHeader className="p-4">
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
            <ShieldCheck className="size-5" />
          </div>
          <CardTitle className="text-sm">Personal Safety</CardTitle>
          <CardDescription className="hidden sm:block">Share location</CardDescription>
        </CardHeader>
      </Card>
    } />,
    <Card key="wellness" onClick={() => toast({ title: "Wellness tips", description: "Hydrate, sleep 7–9h, regular movement, balanced diet." })} className="group cursor-pointer transition-colors hover:bg-accent/30">
      <CardHeader className="p-4">
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ">
          <HeartPulse className="size-5" />
        </div>
        <CardTitle className="text-sm">Health & Wellness</CardTitle>
        <CardDescription className="hidden sm:block">Daily tips</CardDescription>
      </CardHeader>
    </Card>,
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile-first hero with SOS */}
      <section className="relative border-b">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://my.spline.design/dnaparticles-XogOjO4A5qxlEqHmokAmmL5L/"
            className="h-full w-full"
            frameBorder="0"
            aria-hidden
            loading="lazy"
            allow="autoplay; xr-spatial-tracking; fullscreen"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(40rem_30rem_at_0%_-10%,hsl(var(--brand-muted))_0%,transparent_60%),radial-gradient(30rem_20rem_at_120%_10%,hsl(var(--accent)/0.12)_0%,transparent_50%)]" />
        <div className="container relative z-20 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Aether Emergency</h1>
              <p className="mt-1 text-xs text-muted-foreground">Immediate help, first aid, and safety tools.</p>
            </div>
            <SOSDialog
              emergency={emergency}
              country={country}
              trigger={
                <Button size="lg" className="rounded-full bg-red-600 hover:bg-red-700">
                  SOS
                </Button>
              }
            />
          </div>

          {/* Quick actions grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {featureTiles.map((node, i) => (
              <div key={i}>{node}</div>
            ))}
          </div>

          {/* Location helper */}
          <div className="mt-4 text-xs text-muted-foreground">
            {loc ? (
              <span>
                Location ready: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}{country.code ? ` • ${country.name} (${country.code})` : ""} • Local emergency: {emergency.main}
              </span>
            ) : (
              <button className="underline underline-offset-4" onClick={() => getLocation().then((p)=>{ setLoc(p); setGeoContext(p); }).catch(() => toast({ title: "Location", description: "Permission denied." }))}>
                Enable location for faster help
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Health & Wellness tips */}
      <section className="container py-8">
        <h2 className="text-lg font-semibold">Health & wellness</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {["Stay hydrated and keep a small first‑aid kit.", "Store emergency contacts under ICE (In Case of Emergency).", "Know CPR basics and choking response.", "Prepare a go‑bag for disasters (water, meds, IDs)."].map((tip) => (
            <div key={tip} className="rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-4 text-sm text-muted-foreground">{tip}</div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t bg-card/40">
        <div className="container py-10">
          <h2 className="text-lg font-semibold">What our users say</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { name: "Riya", text: "The SOS and hospital finder helped me during a road incident." },
              { name: "Karan", text: "Clear first‑aid steps gave me confidence in an emergency." },
            ].map((r) => (
              <div key={r.name} className="rounded-lg border bg-background p-5 shadow-sm">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                <p className="mt-2 text-xs font-medium">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Aid Overlay */}
      {visualAid && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-red-600/95 p-6 text-white animate-pulse">
          <div className="text-center">
            <div className="text-6xl font-extrabold tracking-tight">HELP</div>
            <p className="mt-2 text-sm">Show this screen to attract attention</p>
            <div className="mt-6">
              <Button variant="secondary" onClick={() => setVisualAid(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section id="cta" className="border-t">
        <div className="container py-12 text-center">
          <p className="text-sm text-muted-foreground">In an emergency, call your local number immediately.</p>
        </div>
      </section>
    </main>
  );
}
