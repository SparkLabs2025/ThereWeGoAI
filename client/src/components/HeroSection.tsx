import { Button } from "@/components/ui/button";
import RevealOnScroll from "./RevealOnScroll";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary">
              Reimagining Insurance with AI
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-lg md:text-xl mb-10 text-foreground/80 leading-relaxed">
              Elevating the insurance space with AI-driven solutions founded in decades of industry experience and a deep understanding of customer needs.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.3}>
            <Button
              asChild
              size="lg"
              className="inline-block text-primary-foreground font-medium rounded-md px-6 py-3 text-lg transition-all"
            >
              <a href="#subscribe">
                Join Our Waitlist
                <i className="ml-2 fas fa-arrow-right"></i>
              </a>
            </Button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
