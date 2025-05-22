import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed w-full bg-white/90 dark:bg-dark/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary flex items-center">
          <Logo />
        </a>
        <nav>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2 font-medium transition-all"
          >
            <a href="#subscribe">Join Waitlist</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
