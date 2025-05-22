import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import VisionSection from "@/components/VisionSection";
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
    <div className="font-sans bg-background text-foreground">
      <Helmet>
        <title>ThereWeGo.AI - Elevating Insurance with AI</title>
        <meta name="description" content="ThereWeGo.AI is elevating the insurance space with AI-driven solutions founded in decades of industry experience and a deep understanding of customer needs." />
        <meta property="og:title" content="ThereWeGo.AI - Elevating Insurance with AI" />
        <meta property="og:description" content="Reimagining insurance with AI-driven solutions and decades of industry experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://therewego.ai" />
      </Helmet>
      
      <Header />
      <HeroSection />
      <MissionSection />
      <ValuePropositionSection />
      <VisionSection />
      <SubscriptionSection />
      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}
