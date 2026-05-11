import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MapPin } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <header className="fixed w-full bg-white/95 dark:bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-primary flex items-center">
          <Logo />
        </a>
        <nav className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium"
          >
            <a href="/itinerary/uruguay">
              <MapPin className="h-3.5 w-3.5" />
              Uruguay Planner
            </a>
          </Button>
          {isHome && (
            <Button
              asChild
              variant="default"
              className="text-primary-foreground font-medium rounded-md px-5 py-2 transition-all"
            >
              <a href="#subscribe">Join Waitlist</a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
