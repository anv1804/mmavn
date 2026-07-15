import { useState, useRef } from "react";
import type { Champion } from "../../interfaces/ranking";
import ChampionCard from "./ChampionCard";

interface ChampionWithDiv extends Champion {
  division: string;
}

interface Props {
  champions: ChampionWithDiv[];
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const SLOT_CONFIG: Record<string, { xPx: number; scale: number; opacity: number; z: number }> = {
  "-2": { xPx: -420, scale: 0.55, opacity: 0.18, z: 10 },
  "-1": { xPx: -230, scale: 0.77, opacity: 0.55, z: 20 },
   "0": { xPx:    0, scale: 1.00, opacity: 1.00, z: 40 },
   "1": { xPx:  230, scale: 0.77, opacity: 0.55, z: 20 },
   "2": { xPx:  420, scale: 0.55, opacity: 0.18, z: 10 },
};

function SideCard({ champ }: { champ: ChampionWithDiv }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl pointer-events-none" style={{ aspectRatio: "3/4" }}>
      {champ.photo ? (
        <img src={champ.photo} alt={champ.name}
          className="absolute inset-0 w-full h-full object-cover object-top" />
      ) : (
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
          <span className="text-5xl text-zinc-700">👤</span>
        </div>
      )}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.3) 55%, transparent 100%)" }} />
      <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
        <p className="font-black text-sm text-white/70 leading-tight truncate">{champ.name}</p>
        <p className="text-[9px] text-zinc-600 font-mono mt-0.5 uppercase tracking-widest">{champ.division}</p>
      </div>
    </div>
  );
}

export default function ChampionCarousel({ champions }: Props) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const total = champions.length;

  const prev = () => setCurrent(c => mod(c - 1, total));
  const next = () => setCurrent(c => mod(c + 1, total));

  const onPointerDown = (e: React.PointerEvent) => { dragStartX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    dragStartX.current = null;
  };

  const CARD_W = 280;
  const CARD_H = CARD_W * (4 / 3);
  // Center card spans from 50%-140px to 50%+140px
  // Nav buttons sit just inside those edges, vertically centered
  const NAV_TOP = CARD_H / 2 - 20; // center of card height

  return (
    <div className="relative w-full select-none">
      {/* Stage */}
      <div
        className="relative w-full overflow-visible"
        style={{ height: CARD_H + 40 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { dragStartX.current = null; setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cards */}
        {champions.map((champ, i) => {
          let offset = mod(i - current, total);
          if (offset > Math.floor(total / 2)) offset -= total;
          if (Math.abs(offset) > 2) return null;

          const cfg = SLOT_CONFIG[String(offset)];
          const isCenter = offset === 0;

          return (
            <div
              key={i}
              onClick={() => { if (!isCenter) (offset < 0 ? prev() : next()); }}
              style={{
                position: "absolute",
                left: "50%",
                top: isCenter ? 0 : 50,
                width: CARD_W,
                transform: `translateX(calc(-50% + ${cfg.xPx}px)) scale(${cfg.scale})`,
                opacity: cfg.opacity,
                zIndex: cfg.z,
                transition: "transform 0.5s cubic-bezier(0.34,1.08,0.64,1), opacity 0.45s ease, top 0.5s ease",
                cursor: isCenter ? "grab" : "pointer",
              }}
            >
              {isCenter ? <ChampionCard champ={champ} /> : <SideCard champ={champ} />}
            </div>
          );
        })}

        {/* ← Prev button — left edge of center card */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: `calc(50% - ${CARD_W / 2 + 56}px)`,
            top: NAV_TOP,
            zIndex: 50,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
          className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/60 hover:border-red-500/60 hover:bg-red-600/20 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer shadow-lg transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* → Next button — right edge of center card */}
        <button
          onClick={next}
          style={{
            position: "absolute",
            left: `calc(50% + ${CARD_W / 2 + 16}px)`,
            top: NAV_TOP,
            zIndex: 50,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
          className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/60 hover:border-red-500/60 hover:bg-red-600/20 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer shadow-lg transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {champions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 28 : 6,
              height: 4,
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              background: i === current
                ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                : "rgba(63,63,70,0.6)",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
