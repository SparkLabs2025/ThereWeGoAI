import { Card } from "@/components/ui/card";
import RevealOnScroll from "./RevealOnScroll";

export default function VisionSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
            </RevealOnScroll>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealOnScroll delay={0.1}>
              <Card className="bg-white dark:bg-dark/90 p-8 rounded-xl shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500" 
                  alt="Insurance industry" 
                  className="w-full h-48 object-cover rounded-lg mb-6" 
                />
                <h3 className="text-xl font-bold mb-3">Transforming the Industry</h3>
                <p className="text-dark/70 dark:text-white/70">
                  We envision a future where insurance providers leverage AI to increase efficiency, reduce costs, and deliver superior customer experiences.
                </p>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <Card className="bg-white dark:bg-dark/90 p-8 rounded-xl shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500" 
                  alt="Business collaboration" 
                  className="w-full h-48 object-cover rounded-lg mb-6" 
                />
                <h3 className="text-xl font-bold mb-3">Collaborative Growth</h3>
                <p className="text-dark/70 dark:text-white/70">
                  By working together with existing insurance providers, we create solutions that benefit the entire ecosystem—from insurers to end customers.
                </p>
              </Card>
            </RevealOnScroll>
          </div>
          
          <div className="text-center mt-12">
            <RevealOnScroll delay={0.3}>
              <p className="text-xl text-dark/80 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
                "We don't just see AI as a technology tool. We see it as an enabler that, when guided by deep industry expertise, can transform insurance for the better."
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
