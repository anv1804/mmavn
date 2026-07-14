import type { ReactNode } from "react";
import { theme } from "../../config/theme";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className = "", hoverEffect = true }: GlassCardProps) {
  const hoverClass = hoverEffect ? "glow-red" : "";
  return (
    <div className={`${theme.card} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
