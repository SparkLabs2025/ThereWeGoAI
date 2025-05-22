import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <span className={cn("text-2xl font-bold flex items-center", className)}>
      <span className={cn("text-accent mr-1", textClassName)}>ThereWeGo</span>
      <span className={cn("text-primary", textClassName)}>.AI</span>
    </span>
  );
}
