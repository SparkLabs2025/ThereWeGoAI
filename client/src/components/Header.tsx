import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed w-full bg-white/95 dark:bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary flex items-center">
          <Logo />
        </a>
        <nav>
          <Button
            asChild
            variant="default"
            className="text-primary-foreground font-medium rounded-md px-5 py-2 transition-all"
          >
            <a href="#subscribe">Join Waitlist</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
