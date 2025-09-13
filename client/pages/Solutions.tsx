import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Solutions() {
  return (
    <main className="">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_10%_-20%,hsl(var(--brand-muted))_0%,transparent_50%),radial-gradient(40rem_40rem_at_120%_10%,hsl(var(--accent)/0.15)_0%,transparent_40%)]" />
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Solutions
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Explore how we apply AI, data platforms, and connected devices to
              deliver measurable outcomes across healthcare.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Clinical AI", "Population Health", "Interoperability"].map(
              (title) => (
                <Card
                  key={title}
                  className="backdrop-blur supports-[backdrop-filter]:bg-card/70"
                >
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                      High-impact modules designed to plug into your ecosystem.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="secondary">Learn more</Button>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>
      <section
        id="cta"
        className="border-t bg-gradient-to-b from-transparent to-brand/5"
      >
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to accelerate innovation?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Get a personalized walkthrough of our platform and capabilities.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg">Request a demo</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
