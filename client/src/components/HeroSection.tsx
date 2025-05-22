import { Button } from "@/components/ui/button";
import RevealOnScroll from "./RevealOnScroll";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080" 
          alt="AI technology background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-accent">Reimagining</span> Insurance with <span className="text-primary">AI</span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl mb-8 text-dark/80 dark:text-white/80 leading-relaxed">
              Elevating the insurance space with AI-driven solutions founded in decades of industry experience.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.4}>
            <Button
              asChild
              size="lg"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-8 py-4 text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <a href="#subscribe">
                Join Our Waitlist
                <i className="ml-2 fas fa-arrow-right"></i>
              </a>
            </Button>
          </RevealOnScroll>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
