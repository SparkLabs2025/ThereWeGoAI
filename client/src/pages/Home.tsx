import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SubscriptionSection from "@/components/SubscriptionSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  // Add the scroll-based reveal animation
  useEffect(() => {
    // Function to handle scroll animations
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };
    
    // Add event listener and initial check
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="font-sans bg-background text-foreground min-h-screen flex flex-col">
      <Helmet>
        <title>ThereWeGo.AI - Elevating Insurance with AI</title>
        <meta name="description" content="ThereWeGo.AI is elevating the insurance space with AI-driven solutions founded in decades of industry experience and a deep understanding of customer needs." />
        <meta property="og:title" content="ThereWeGo.AI - Elevating Insurance with AI" />
        <meta property="og:description" content="Reimagining insurance with AI-driven solutions and decades of industry experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://therewego.ai" />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SubscriptionSection />
      </main>
      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
