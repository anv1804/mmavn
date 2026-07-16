import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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

  /* Elevate header on scroll */
  useEffect(() => {
    const fn = () => setElevated(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Ticker rotation */
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % TICKER.length);
        setFade(true);
      }, 300);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <header
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        elevated
          ? "bg-[#050506]/96 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border-b border-zinc-900"
          : "bg-[#050506]/90 border-b border-zinc-950"
      } backdrop-blur-md`}
    >
      
      {/* ── TICKER STRIP ── */}
      <div className="relative h-7 bg-black/60 border-b border-zinc-900/60 w-full">
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
                className={`text-[9px] font-mono font-medium text-zinc-400 tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
                }`}
              >
                {TICKER[tickerIdx]}
              </p>
            </div>
          </div>

          <div className="shrink-0 px-4 text-[8px] font-mono text-zinc-500 tracking-widest border-l border-zinc-900/65 h-full flex items-center">
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
          <div className="relative h-11 w-11 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800/80 group-hover:border-red-600/30 transition-all duration-300 overflow-hidden">
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
              <span className="text-xl font-black uppercase tracking-tighter text-white">MMA</span>
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
                    : "text-zinc-400 hover:text-white border border-transparent hover:bg-zinc-900/40"
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

        {/* ── Right Dashboard CTA ── */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Trophy BXH Link */}
          <Link
            to="/lion"
            className="
              flex items-center gap-2 h-8 px-4 rounded-xl cursor-pointer border no-underline
              bg-zinc-900/60 border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-900
              transition-all duration-300 group/trophy
            "
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

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900/40 cursor-pointer outline-none transition-all duration-200"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[1.5px] bg-zinc-300 rounded-full transition-all duration-300 ${
                i === 0 ? `w-5 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}` :
                i === 1 ? `w-5 ${mobileOpen ? "opacity-0 scale-x-0" : ""}` :
                `w-5 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`
              }`}
            />
          ))}
        </button>

        {/* Fading neon accent red bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent pointer-events-none" />
      </div>

      {/* ── Mobile menu drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-zinc-900 bg-[#050506] px-5 py-4 space-y-1.5">
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
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/40 border-transparent"
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
