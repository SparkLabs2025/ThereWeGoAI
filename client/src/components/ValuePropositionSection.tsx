import RevealOnScroll from "./RevealOnScroll";

export default function ValuePropositionSection() {
  return (
    <section className="py-20 bg-dark text-white relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080" 
          alt="AI technology pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Customer-Centric AI Solutions</h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                We're not just building technology — we're creating solutions based on a deep understanding of customer needs and wants in the insurance space.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-4">
                  <i className="fas fa-chart-line text-white"></i>
                </div>
                <p className="text-lg">Enhanced operational efficiency</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center mr-4">
                  <i className="fas fa-user-shield text-white"></i>
                </div>
                <p className="text-lg">Improved customer experiences</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.5}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
                  <i className="fas fa-brain text-white"></i>
                </div>
                <p className="text-lg">Data-driven decision making</p>
              </div>
            </RevealOnScroll>
          </div>
          
          <div className="md:w-1/2">
            <RevealOnScroll delay={0.3}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700" 
                  alt="Insurance professionals with technology" 
                  className="w-full rounded-xl shadow-2xl" 
                />
                <div className="absolute -bottom-5 -right-5 bg-accent text-white p-4 rounded-lg shadow-lg md:w-64">
                  <p className="font-bold">Decades of insurance expertise meets cutting-edge AI technology</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
