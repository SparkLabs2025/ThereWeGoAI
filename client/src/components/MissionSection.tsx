import { Card } from "@/components/ui/card";
import RevealOnScroll from "./RevealOnScroll";

export default function MissionSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-lg text-dark/80 dark:text-white/80 leading-relaxed">
              We're working with—not against—insurance incumbents to create lasting and mutual gains through advanced AI technology.
            </p>
          </RevealOnScroll>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <RevealOnScroll delay={0.1}>
            <Card className="card bg-white dark:bg-dark/80 rounded-xl shadow-md p-6">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500" 
                alt="Insurance industry experts" 
                className="w-full h-48 object-cover rounded-lg mb-6" 
              />
              <h3 className="text-xl font-bold mb-3">Industry Experience</h3>
              <p className="text-dark/70 dark:text-white/70">
                Built by professionals with decades of insurance expertise who understand the nuances of the industry.
              </p>
            </Card>
          </RevealOnScroll>
          
          {/* Card 2 */}
          <RevealOnScroll delay={0.2}>
            <Card className="card bg-white dark:bg-dark/80 rounded-xl shadow-md p-6">
              <img 
                src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500" 
                alt="AI technology solutions" 
                className="w-full h-48 object-cover rounded-lg mb-6" 
              />
              <h3 className="text-xl font-bold mb-3">AI-Driven Innovation</h3>
              <p className="text-dark/70 dark:text-white/70">
                Leveraging cutting-edge artificial intelligence to solve complex insurance challenges.
              </p>
            </Card>
          </RevealOnScroll>
          
          {/* Card 3 */}
          <RevealOnScroll delay={0.3}>
            <Card className="card bg-white dark:bg-dark/80 rounded-xl shadow-md p-6">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500" 
                alt="Business collaboration" 
                className="w-full h-48 object-cover rounded-lg mb-6" 
              />
              <h3 className="text-xl font-bold mb-3">Industry Partnership</h3>
              <p className="text-dark/70 dark:text-white/70">
                Working collaboratively with insurance providers to enhance their capabilities, not replace them.
              </p>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
