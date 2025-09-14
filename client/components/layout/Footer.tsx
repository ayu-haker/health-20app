export default function Footer() {
  return (
    <footer className="border-t bg-background/60" id="contact">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <p className="font-brand text-xl font-semibold">Arogya Health Tech</p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Building cutting-edge technology that advances healthcare outcomes
            for growing populations around the world.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground md:grid-cols-3">
          <a href="#sectors" className="hover:text-foreground">
            Sectors
          </a>
          <a href="#trends" className="hover:text-foreground">
            Trends
          </a>
          <a href="#cta" className="hover:text-foreground">
            Get a demo
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Careers
          </a>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arogya Health Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
