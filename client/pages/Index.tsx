import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Network, ShieldCheck, Stethoscope, Users } from "lucide-react";

export default function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_0%_-10%,hsl(var(--brand-muted))_0%,transparent_60%),radial-gradient(40rem_30rem_at_120%_10%,hsl(var(--accent)/0.15)_0%,transparent_50%)]" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Healthcare innovation
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Cutting-edge technology for changing healthcare trends
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              As populations grow and needs evolve, opportunities for innovation expand. We build secure, intelligent platforms that deliver better outcomes at scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#cta">Get a demo</a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#sectors">Explore sectors</a>
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-10 hidden w-[38rem] md:block">
            <div className="relative">
              <div className="absolute -left-10 top-10 size-28 animate-float rounded-2xl bg-primary/10" />
              <div className="absolute right-20 top-40 size-14 animate-float rounded-full bg-accent/20 [animation-delay:1s]" />
              <svg viewBox="0 0 600 400" className="w-full drop-shadow-xl">
                <defs>
                  <linearGradient id="grad" x1="0" x2="1">
                    <stop offset="0%" stopColor="hsl(var(--brand))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
                <rect x="60" y="50" width="480" height="300" rx="24" fill="url(#grad)" opacity="0.15" />
                <g fill="none" stroke="url(#grad)" strokeWidth="2.5">
                  <path d="M80 220 C 200 80, 400 360, 520 220" />
                  <path d="M80 260 C 200 120, 400 400, 520 260" opacity="0.6" />
                  <path d="M80 180 C 200 40, 400 320, 520 180" opacity="0.35" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="border-t bg-gradient-to-b from-transparent to-brand/5">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Sectors we power</h2>
            <p className="mt-3 text-muted-foreground">
              From hospitals to public health systems, we help leaders operationalize innovation.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Healthcare Providers", desc: "Clinical decision support, care pathways, remote monitoring.", icon: Stethoscope },
              { title: "Population Health", desc: "Risk stratification, forecasting, community analytics.", icon: Users },
              { title: "MedTech & IoT", desc: "Device telemetry, edge AI, real‑time observability.", icon: Activity },
              { title: "Life Sciences", desc: "Trial intelligence, pharmacovigilance, R&D acceleration.", icon: Network },
            ].map(({ title, desc, icon: Icon }) => (
              <Card key={title} className="group transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/15">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trends */}
      <section id="trends" className="border-t">
        <div className="container py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Trends reshaping healthcare</h2>
              <p className="mt-3 text-muted-foreground">
                Recent shifts in care delivery, data interoperability, and AI adoption are creating new opportunities to transform outcomes.
              </p>
              <ul className="mt-6 grid gap-4">
                <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-5 text-primary" /> Privacy‑first architectures to safeguard patient trust</li>
                <li className="flex items-start gap-3"><Brain className="mt-0.5 size-5 text-primary" /> Responsible AI accelerating insights and decision support</li>
                <li className="flex items-start gap-3"><Network className="mt-0.5 size-5 text-primary" /> Interoperable data unlocking system‑wide efficiencies</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "AI‑powered", value: "85%" }, { label: "Connected devices", value: "+120M" }, { label: "Population coverage", value: "> 200M" }, { label: "Uptime", value: "99.99%" }].map(({ label, value }) => (
                <div key={label} className="rounded-lg border bg-card p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold tracking-tight text-primary">{value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t bg-gradient-to-b from-transparent to-brand/5">
        <div className="container py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold md:text-3xl">Partner with us to scale innovation</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            See how our platform can help you deliver better outcomes, faster.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button size="lg">Request a demo</Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="/solutions">View solutions</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
