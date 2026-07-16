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
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        elevated
          ? "bg-[#080809]/98 shadow-[0_8px_48px_rgba(0,0,0,0.7)] border-b border-white/[0.06]"
          : "bg-[#080809]/80 border-b border-white/[0.04]"
      } backdrop-blur-2xl`}
    >

      {/* ══════════════════ TICKER STRIP ══════════════════ */}
      <div className="relative h-8 flex items-center overflow-hidden bg-gradient-to-r from-red-950/60 via-[#0f0007]/80 to-red-950/60 border-b border-red-900/20">

        {/* LIVE badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-red-600/90">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-90" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span
            style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.2em" }}
            className="text-[8px] font-bold text-white uppercase"
          >
            LIVE
          </span>
        </div>

        {/* Divider spark */}
        <div className="shrink-0 w-px h-4 bg-red-500/30 mx-1" />

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden px-3">
          <p
            style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.08em" }}
            className={`text-[9px] font-medium text-zinc-300/90 uppercase whitespace-nowrap transition-all duration-300 ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
            }`}
          >
            {TICKER[tickerIdx]}
          </p>
        </div>

        {/* Right label */}
        <div
          style={{ fontFamily: "JetBrains Mono, monospace" }}
          className="shrink-0 px-4 text-[8px] text-zinc-600 tracking-widest"
        >
          MMAVN · 2026
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-20 top-0 h-full w-10 bg-gradient-to-r from-[#0f0007]/70 to-transparent" />
        <div className="pointer-events-none absolute right-28 top-0 h-full w-10 bg-gradient-to-l from-[#0f0007]/70 to-transparent" />
      </div>

      {/* ── MAIN NAV ── */}
      <div className="max-w-[1280px] mx-auto px-6 flex items-stretch h-[60px]">

        {/* ── Logo ── */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 mr-8 shrink-0 bg-transparent border-none outline-none group no-underline"
        >
          {/* Shield mark (using official MMAVN Logo) */}
          <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-red-600/10 blur-md scale-110 group-hover:bg-red-500/20 transition-all duration-300" />
            <img 
              src="/log-mmavn.png" 
              alt="MMAVN Logo" 
              className="h-full w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-[1.08]" 
            />
          </div>

          {/* Brand name */}
          <div className="text-left leading-none">
            <div className="flex items-baseline">
              <span
                style={{ fontFamily: "Bebas Neue, Impact, sans-serif", fontSize: "1.45rem", letterSpacing: "0.06em" }}
                className="text-white group-hover:text-zinc-100 transition-colors"
              >
                MMA
              </span>
              <span
                style={{ fontFamily: "Bebas Neue, Impact, sans-serif", fontSize: "1.45rem", letterSpacing: "0.06em" }}
                className="text-red-500 group-hover:text-red-400 transition-colors"
              >
                VN
              </span>
            </div>
            <span
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.25em" }}
              className="block text-zinc-500 uppercase mt-[3px] group-hover:text-zinc-400 transition-colors"
            >
              Vietnam Combat Hub
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-stretch flex-1 relative">
          {NAV.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative flex items-center gap-1.5 px-[18px]
                  text-[11px] font-semibold uppercase tracking-[0.12em]
                  outline-none transition-all duration-250 no-underline
                  group/nav
                  ${active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-200"
                  }
                `}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {/* Emoji icon or official logo image */}
                {link.path === "/lion" ? (
                  <img src="/logo-lionchampionship.png" alt="Lion Logo" className="w-4 h-4 object-contain" />
                ) : (
                  <span className={`text-xs transition-all duration-300 ${active ? "opacity-100" : "opacity-0 group-hover/nav:opacity-60"}`}>
                    {link.emoji}
                  </span>
                )}

                {link.label}

                {/* Active neon underline */}
                {active && (
                  <>
                    <span className="absolute bottom-0 inset-x-3 h-[2px] rounded-t-full bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0" />
                    <span className="absolute bottom-0 inset-x-6 h-[8px] rounded-t-full blur-md bg-red-500/30" />
                  </>
                )}

                {/* Hover underline */}
                {!active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover/nav:w-1/2 rounded-t-full bg-zinc-600/80 transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Zone ── */}
        <div className="hidden md:flex items-center gap-2.5 pl-6 border-l border-white/[0.05]">

          {/* Championship Trophy CTA */}
          <Link
            to="/lion"
            className="
              flex items-center gap-2 h-8 px-3.5 rounded-lg cursor-pointer border-none outline-none no-underline
              bg-gradient-to-br from-amber-500/10 to-yellow-700/10
              border border-amber-500/20 hover:border-amber-400/45
              hover:from-amber-500/18 hover:to-yellow-600/18
              transition-all duration-250 group/trophy
            "
          >
            <span className="text-[13px] group-hover/trophy:rotate-[-8deg] transition-transform duration-200">🏆</span>
            <span
              style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.15em" }}
              className="text-[9px] font-bold text-amber-400/90 uppercase"
            >
              BXH
            </span>
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-white/[0.06]" />

          {/* Live dot */}
          <div className="flex items-center gap-2 px-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span
              style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.18em" }}
              className="text-[9px] font-bold text-zinc-500 uppercase"
            >
              LIVE
            </span>
          </div>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden self-center ml-auto flex flex-col justify-center items-center gap-[5px] h-9 w-9 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 cursor-pointer outline-none transition-all duration-200"
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
      </div>

      {/* ══════════════════ MOBILE DRAWER ══════════════════ */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-355 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/[0.05] bg-[#0a0a0d] px-5 py-4 space-y-1">
          {NAV.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-none cursor-pointer transition-all duration-200 no-underline ${
                  active
                    ? "text-white bg-red-600/15 border border-red-500/20"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent"
                }`}
                style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {link.path === "/lion" ? (
                  <img src="/logo-lionchampionship.png" alt="Lion Logo" className="w-4 h-4 object-contain" />
                ) : (
                  <span className="text-sm">{link.emoji}</span>
                )}
                <span>{link.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />}
              </Link>
            );
          })}

          <div className="pt-3 flex items-center gap-2 px-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span
              style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.2em" }}
              className="text-[8px] font-bold text-zinc-500 uppercase"
            >
              LIVE — LION Championship 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
