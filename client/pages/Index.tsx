import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SOSDialog from "@/components/mobile/SOSDialog";
import {
  Ambulance,
  Robot,
  BookOpen,
  Bandage,
  HeartPulse,
  Image as ImageIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [visualAid, setVisualAid] = useState(false);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);

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

  const findHospitals = async () => {
    try {
      const position = await getLocation();
      setLoc(position);
      const url = `https://www.google.com/maps/search/hospital/@${position.lat},${position.lng},14z`;
      window.open(url, "_blank");
    } catch {
      window.open("https://www.google.com/maps/search/hospital+near+me", "_blank");
    }
  };

  const callEmergency = () => {
    window.location.href = "tel:911";
  };

  const featureTiles = [
    { title: "Active SOS", icon: Ambulance, onClick: callEmergency, accent: "bg-red-50 text-red-600" },
    { title: "First Aid Kit", icon: Bandage, href: "/first-aid" },
    { title: "Find Hospitals", icon: MapPin, onClick: findHospitals },
    { title: "First Aid Guide", icon: BookOpen, href: "/first-aid" },
    { title: "Disaster Response", icon: ShieldCheck, onClick: () => toast({ title: "Disaster response", description: "Follow local authorities. Keep essentials ready." }) },
    { title: "AI Guide", icon: Robot, onClick: () => toast({ title: "AI Guide", description: "Triage assistant coming soon." }) },
    { title: "Emergency Number", icon: Phone, onClick: callEmergency },
    { title: "Visual Aid", icon: ImageIcon, onClick: () => setVisualAid(true) },
    { title: "Personal Safety", icon: ShieldCheck, onClick: () => toast({ title: "Personal safety", description: "Share your trip and location with trusted contacts." }) },
    { title: "Health & Wellness", icon: HeartPulse, onClick: () => toast({ title: "Wellness tips", description: "Hydrate, sleep 7–9h, regular movement, balanced diet." }) },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile-first hero with SOS */}
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_30rem_at_0%_-10%,hsl(var(--brand-muted))_0%,transparent_60%),radial-gradient(30rem_20rem_at_120%_10%,hsl(var(--accent)/0.12)_0%,transparent_50%)]" />
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Aether Emergency</h1>
              <p className="mt-1 text-xs text-muted-foreground">Immediate help, first aid, and safety tools.</p>
            </div>
            <SOSDialog
              trigger={
                <Button size="lg" className="rounded-full bg-red-600 hover:bg-red-700">
                  SOS
                </Button>
              }
            />
          </div>

          {/* Quick actions grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {featureTiles.map(({ title, icon: Icon, href, onClick, accent }) => (
              <Card key={title} className="group cursor-pointer transition-colors hover:bg-accent/30" onClick={onClick as any}>
                <CardHeader className="p-4">
                  <div className={`mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ${accent ?? ""}`}>
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-sm">{href ? <a href={href}>{title}</a> : title}</CardTitle>
                  <CardDescription className="hidden sm:block">{title}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Location helper */}
          <div className="mt-4 text-xs text-muted-foreground">
            {loc ? (
              <span>
                Location ready: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
              </span>
            ) : (
              <button className="underline underline-offset-4" onClick={() => getLocation().then(setLoc).catch(() => toast({ title: "Location", description: "Permission denied." }))}>
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
            <div key={tip} className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">{tip}</div>
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
