import { cn } from "@/lib/utils";

// Using the logo from the public directory
const logoPath = "/logo.jpeg";

interface LogoProps {
  className?: string;
  textClassName?: string;
  showText?: boolean;
}

export default function Logo({ className, textClassName, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoPath} 
        alt="ThereWeGo.AI Logo" 
        className="h-10 mr-2"
      />
      {showText && (
        <span className={cn("text-2xl font-bold flex items-center", className)}>
          <span className={cn("text-accent mr-1", textClassName)}>ThereWeGo</span>
          <span className={cn("text-primary", textClassName)}>.AI</span>
        </span>
      )}
    </div>
  );
}
