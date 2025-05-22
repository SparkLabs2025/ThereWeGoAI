import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-10 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo textClassName="text-white" />
            <p className="text-white/60 mt-2">Elevating Insurance with AI</p>
          </div>
          
          <div className="flex items-center">
            <a 
              href="mailto:viktor@therewego.ai" 
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>
              viktor@therewego.ai
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} ThereWeGo.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
