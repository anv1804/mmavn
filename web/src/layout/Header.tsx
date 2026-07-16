import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NAV = [
  { label: "Trang chủ",        path: "/",          emoji: "⬡" },
  { label: "LION Championship", path: "/lion",      emoji: "🦁" },
  { label: "UFC",               path: "/ufc",       emoji: "🥊" },
  { label: "Cộng đồng",         path: "/community", emoji: "💬" },
  { label: "Liên hệ",           path: "/contact",   emoji: "📡" },
];

const TICKER = [
  "🏆  LÊ VĂN TUẦN — VÔ ĐỊCH LION 56kg NAM 2026",
  "🥊  TRẦN NGỌC LƯỢNG — VÔ ĐỊCH LION 60kg NAM 2026",
  "🔴  LION CHAMPIONSHIP 2026 — MÙA GIẢI ĐANG DIỄN RA",
  "📅  LỊCH THI ĐẤU TIẾP THEO: CẬP NHẬT TUẦN 3 THÁNG 7",
  "⚡  THÔNG TIN VMMAF CHÍNH THỨC TẠI MMAVN.VN",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevated, setElevated]     = useState(false);
  const [tickerIdx, setTickerIdx]   = useState(0);
  const [fade, setFade]             = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;
  
  // Theme context hook
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Change active path header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setElevated(true);
      } else {
        setElevated(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycle news ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTickerIdx((prev) => (prev + 1) % TICKER.length);
        setFade(true);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark 
          ? (elevated ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-zinc-900/80" : "bg-transparent") 
          : "bg-white/95 backdrop-blur-md shadow-md shadow-zinc-200/10 border-b border-zinc-200/80"
      }`}
    >
      
      {/* ── TICKER STRIP ── */}
      <div className={`relative h-7 w-full border-b transition-colors duration-300 ${
        isDark ? "bg-black/60 border-zinc-900/60" : "bg-zinc-100 border-zinc-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          <div className="flex items-center flex-1 h-full overflow-hidden">
            {/* LIVE badge */}
            <div className="shrink-0 flex items-center gap-1.5 px-3.5 h-full bg-red-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="text-[8px] font-mono font-bold text-white tracking-[0.2em] uppercase">
                LIVE
              </span>
            </div>

            {/* Scrolling text */}
            <div className="flex-1 overflow-hidden px-4">
              <p
                className={`text-[9px] font-mono font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                } ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}`}
              >
                {TICKER[tickerIdx]}
              </p>
            </div>
          </div>

          <div className={`shrink-0 px-4 text-[8px] font-mono tracking-widest border-l h-full flex items-center ${
            isDark ? "text-zinc-500 border-zinc-900/65" : "text-zinc-400 border-zinc-200"
          }`}>
            MMAVN · OFFICIAL
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[65px] relative">
        
        {/* ── Logo & Title ── */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 shrink-0 group no-underline"
        >
          {/* Logo container */}
          <div className={`relative h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden border ${
            isDark ? "bg-zinc-900/60 border-zinc-800/80 group-hover:border-red-600/30" : "bg-zinc-100 border-zinc-200 group-hover:border-red-500/40"
          }`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_75%)] pointer-events-none" />
            <img 
              src="/log-mmavn.png" 
              alt="MMAVN Logo" 
              className="h-9 w-9 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
            />
          </div>

          {/* Title Text */}
          <div className="text-left leading-none">
            <div className="flex items-baseline gap-0.5">
              <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${
                isDark ? "text-white" : "text-zinc-900"
              }`}>MMA</span>
              <span className="text-xl font-black uppercase tracking-tighter text-red-500">VN</span>
            </div>
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-[0.25em] mt-1 group-hover:text-zinc-400 transition-colors">
              VIETNAM COMBAT HUB
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden md:flex items-center gap-1.5 h-full">
          {NAV.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-xl
                  text-[10px] font-mono font-bold uppercase tracking-wider
                  outline-none transition-all duration-200 no-underline
                  ${active
                    ? "text-red-500 bg-red-500/5 border border-red-500/10"
                    : isDark 
                      ? "text-zinc-400 hover:text-white border border-transparent hover:bg-zinc-900/40"
                      : "text-zinc-600 hover:text-black border border-transparent hover:bg-zinc-100"
                  }
                `}
              >
                {link.path === "/lion" ? (
                  <img src="/logo-lionchampionship.png" alt="Lion Logo" className="w-3.5 h-3.5 object-contain" />
                ) : (
                  <span className={`text-[11px] ${active ? "opacity-100" : "opacity-60"}`}>
                    {link.emoji}
                  </span>
                )}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Right Dashboard CTA & Controls ── */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              flex items-center justify-center h-8 w-8 rounded-xl cursor-pointer border transition-all duration-300
              ${isDark 
                ? "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900" 
                : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200"
              }
            `}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Trophy BXH Link */}
          <Link
            to="/lion"
            className={`
              flex items-center gap-2 h-8 px-4 rounded-xl cursor-pointer border no-underline transition-all duration-300 group/trophy
              ${isDark
                ? "bg-zinc-900/60 border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-900"
                : "bg-zinc-100 border-zinc-200 hover:border-amber-500/40 hover:bg-zinc-200"
              }
            `}
          >
            <span className="text-xs group-hover/trophy:scale-110 transition-transform">🏆</span>
            <span className="text-[9px] font-mono font-bold text-amber-500 tracking-wider uppercase">
              BẢNG XẾP HẠNG
            </span>
          </Link>

          {/* Glowing Status Indicator */}
          <div className="flex items-center gap-2 bg-red-500/[0.04] border border-red-500/10 px-3 py-1.5 rounded-xl">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600" />
            </span>
            <span className="text-[8px] font-mono font-black text-red-500 tracking-widest uppercase">
              LIVE
            </span>
          </div>
        </div>

        {/* ── Mobile Hamburger & Toggle ── */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              flex items-center justify-center h-9 w-9 rounded-xl border transition-all duration-200 cursor-pointer
              ${isDark 
                ? "border-zinc-800 bg-zinc-900/40 text-zinc-300" 
                : "border-zinc-200 bg-zinc-100 text-zinc-700"
              }
            `}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`
              md:hidden flex flex-col justify-center items-center gap-[5px] h-9 w-9 rounded-xl border cursor-pointer outline-none transition-all duration-200
              ${isDark 
                ? "border-zinc-800 bg-zinc-900/40 text-zinc-300" 
                : "border-zinc-200 bg-zinc-100 text-zinc-700"
              }
            `}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                  isDark ? "bg-zinc-300" : "bg-zinc-800"
                } ${
                  i === 0 ? `w-5 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}` :
                  i === 1 ? `w-5 ${mobileOpen ? "opacity-0 scale-x-0" : ""}` :
                  `w-5 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`
                }`}
              />
            ))}
          </button>
        </div>

        {/* Fading neon accent red bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent pointer-events-none" />
      </div>

      {/* ── Mobile menu drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-5 py-4 space-y-1.5 border-t border-b ${
          isDark ? "border-zinc-900 bg-[#050506]" : "border-zinc-250 bg-white"
        }`}>
          {NAV.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border no-underline transition-all duration-200 ${
                  active
                    ? "text-red-500 bg-red-500/5 border-red-500/15"
                    : isDark 
                      ? "text-zinc-400 hover:text-white hover:bg-zinc-900/40 border-transparent"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-100 border-transparent"
                }`}
                style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}
              >
                {link.path === "/lion" ? (
                  <img src="/logo-lionchampionship.png" alt="Lion Logo" className="w-3.5 h-3.5 object-contain" />
                ) : (
                  <span className="text-xs">{link.emoji}</span>
                )}
                <span>{link.label}</span>
                {active && <span className="ml-auto h-1 w-1 rounded-full bg-red-500 shrink-0" />}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
