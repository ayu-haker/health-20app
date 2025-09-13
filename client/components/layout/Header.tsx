import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            {/* simple brand glyph */}
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path
                d="M12 3c4.97 0 9 4.03 9 9 0 1.79-.52 3.46-1.43 4.86l-1.7-1.06A7 7 0 1 0 5.2 16.8l-1.7 1.06A8.98 8.98 0 0 1 3 12C3 7.03 7.03 3 12 3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-base font-extrabold tracking-tight">
            Aether HealthTech
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <a
            href="#sectors"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Sectors
          </a>
          <a
            href="#trends"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Trends
          </a>
          <NavLink to="/first-aid" className={navLinkClass}>
            First Aid
          </NavLink>
          <NavLink to="/solutions" className={navLinkClass}>
            Solutions
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Contact
          </a>
          <Button asChild>
            <a href="#cta">Get a demo</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
