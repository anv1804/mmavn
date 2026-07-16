import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t py-8 text-center text-xs mt-auto transition-colors duration-300 ${
      isDark 
        ? "border-zinc-900 bg-zinc-950/40 text-zinc-500" 
        : "border-zinc-200 bg-zinc-100/60 text-zinc-600"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 MMAVN Community. Thiết kế phi lợi nhuận cho người hâm mộ võ thuật.</p>
        <div className={`flex gap-4 font-mono text-[9px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
          <span>React 19 + Vite + Supabase</span>
        </div>
      </div>
    </footer>
  );
}
