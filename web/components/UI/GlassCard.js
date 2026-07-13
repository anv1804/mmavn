import { theme } from "../../config/theme";

export default function GlassCard({ children, className = "", hoverEffect = true }) {
  const hoverClass = hoverEffect ? "glow-red" : "";
  return (
    <div className={`${theme.card} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
