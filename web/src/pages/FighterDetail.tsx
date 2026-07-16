import { useState } from "react";
import type { FighterProfile } from "../interfaces/fighter";

interface FighterDetailProps {
  fighter: FighterProfile;
  onBack: () => void;
}

// Stats structure for MMA Radar Chart
interface CombatStats {
  STR: number; // Striking (Đứng công - Boxing/Muay Thai)
  GRP: number; // Grappling (Vật/Đè - Wrestling)
  SUB: number; // Submission (Nhu thuật - BJJ)
  DEF: number; // Defense (Phòng thủ - Takedown Defense/Guard)
  STA: number; // Stamina (Thể lực/Sức bền)
  POW: number; // Power (Thể chất/Sức mạnh bộc phát)
  IQ:  number; // Fight IQ (Chiến thuật/Trí tuệ trận đấu)
}

// Database of mock MMA stats for comparison candidates in the 56kg Nam division
const COMPARISON_CANDIDATES: Record<string, { name: string; club: string; record: string; stats: CombatStats; ratings: number[] }> = {
  "le-van-tuan": {
    name: "Lê Văn Tuần",
    club: "Vietnam Top Team",
    record: "8-3-0",
    stats: { STR: 90, GRP: 76, SUB: 82, DEF: 80, STA: 88, POW: 92, IQ: 84 },
    ratings: [8.5, 8.2, 7.9, 6.0, 8.4, 7.8],
  },
  "pham-van-nam": {
    name: "Phạm Văn Nam",
    club: "Saigon Sports Club",
    record: "7-1-0",
    stats: { STR: 82, GRP: 88, SUB: 90, DEF: 86, STA: 92, POW: 84, IQ: 88 },
    ratings: [8.8, 8.5, 7.5, 8.1, 8.0, 8.4],
  },
  "tran-minh-nhut": {
    name: "Trần Minh Nhựt",
    club: "Liên Phong Club",
    record: "6-2-0",
    stats: { STR: 88, GRP: 78, SUB: 80, DEF: 72, STA: 82, POW: 86, IQ: 85 },
    ratings: [7.9, 8.0, 8.3, 7.1, 6.8, 7.5],
  },
  "tran-trong-kim": {
    name: "Trần Trọng Kim",
    club: "PFC Phú Quốc",
    record: "5-2-0",
    stats: { STR: 78, GRP: 82, SUB: 84, DEF: 78, STA: 85, POW: 78, IQ: 80 },
    ratings: [7.2, 7.5, 7.0, 7.8, 6.5, 7.3],
  }
};

const METHOD_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  KO: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  TKO: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Submission: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20" },
  Decision: { bg: "bg-zinc-800/50", text: "text-zinc-400", border: "border-zinc-700/30" },
};

function getMethodTheme(method: string, isWin: boolean) {
  if (!isWin) {
    return { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" };
  }
  for (const key of Object.keys(METHOD_THEMES)) {
    if (method.startsWith(key)) return METHOD_THEMES[key];
  }
  return { bg: "bg-zinc-800/50", text: "text-zinc-400", border: "border-zinc-700/30" };
}

export default function FighterDetail({ fighter, onBack }: FighterDetailProps) {
  const { wins, losses, draws } = fighter.record;
  const total = wins + losses + draws;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  // State for comparison
  const [searchQuery, setSearchQuery] = useState("");
  const [comparedKey, setComparedKey] = useState<string | null>(null);

  const activeStats = COMPARISON_CANDIDATES[fighter.id] || COMPARISON_CANDIDATES["le-van-tuan"];
  const comparedFighter = comparedKey ? COMPARISON_CANDIDATES[comparedKey] : null;

  // Filter comparison candidates
  const filteredCandidates = Object.entries(COMPARISON_CANDIDATES)
    .filter(([key, f]) => key !== fighter.id && f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 3);

  // Radar Chart setup (7 axes for MMA stats)
  const width = 280;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2;
  const r = 100;
  const tags = ["STR (Đứng)", "GRP (Vật)", "SUB (Siết)", "DEF (Thủ)", "STA (Bền)", "POW (Mạnh)", "IQ (Trí tuệ)"];

  // Helper to compute points on radar chart
  const getRadarPoint = (index: number, val: number) => {
    const angle = (Math.PI * 2 / 7) * index - Math.PI / 2;
    const distance = (val / 100) * r;
    return {
      x: cx + distance * Math.cos(angle),
      y: cy + distance * Math.sin(angle)
    };
  };

  // Build polygon strings
  const getPolygonPoints = (stats: CombatStats) => {
    const vals = [stats.STR, stats.GRP, stats.SUB, stats.DEF, stats.STA, stats.POW, stats.IQ];
    return vals.map((v, idx) => {
      const pt = getRadarPoint(idx, v);
      return `${pt.x},${pt.y}`;
    }).join(" ");
  };

  const currentPolyPoints = getPolygonPoints(activeStats.stats);
  const comparedPolyPoints = comparedFighter ? getPolygonPoints(comparedFighter.stats) : null;

  // Ratings for last 6 fights styling
  const ratingColor = (val: number) => {
    if (val >= 8.0) return "bg-blue-500 shadow-blue-500/20";
    if (val >= 7.0) return "bg-emerald-500 shadow-emerald-500/20";
    if (val >= 6.5) return "bg-amber-500 shadow-amber-500/20";
    return "bg-rose-500 shadow-rose-500/20";
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative selection:bg-red-600 selection:text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,30,39,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-zinc-800/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Giant background text */}
      <div className="absolute top-[25%] right-[5%] select-none pointer-events-none z-0 opacity-[0.01] text-right font-black uppercase leading-none">
        <span className="text-[15vw] block tracking-tighter" style={{ WebkitTextStroke: "1px white", fill: "transparent" }}>VTT</span>
        <span className="text-[12vw] block tracking-tighter text-red-600">56KG</span>
      </div>

      {/* ── STICKY CONTROL BAR ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-zinc-400 hover:text-white bg-black/60 border border-zinc-900 hover:border-red-500/40 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200 block">&larr;</span> 
          <span>QUAY LẠI</span>
        </button>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase bg-zinc-900/40 border border-zinc-900 px-4 py-1.5 rounded-full">
          HỒ SƠ ĐƯƠNG KIM VÔ ĐỊCH
        </span>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── CỘT TRÁI: ẢNH VÕ SĨ & MẠNG XÃ HỘI (4/12) ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col items-center group">
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-red-600/70" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-red-600/70" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-red-600/70" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-red-600/70" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10 w-full h-[340px] flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-950/80 border border-zinc-900">
                <div className="absolute inset-4 border border-zinc-900/30 pointer-events-none rounded-lg" />
                
                {fighter.photo ? (
                  <img
                    src={fighter.photo}
                    alt={fighter.name}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 scale-[2.2] translate-y-6 group-hover:scale-[2.4]"
                    style={{ filter: "drop-shadow(0 15px 25px rgba(239,68,68,0.3))" }}
                  />
                ) : (
                  <div className="h-64 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-700 text-6xl">
                    👤
                  </div>
                )}
              </div>

              <div className="relative z-10 w-full mt-6 pt-5 border-t border-zinc-900/60 text-center space-y-1">
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase block">CÂU LẠC BỘ</span>
                <h4 className="text-sm font-extrabold text-white tracking-wide">{fighter.club}</h4>
                {fighter.coach && (
                  <p className="text-[11px] text-zinc-400 font-mono">HLV: {fighter.coach}</p>
                )}
              </div>

              {/* Social media links */}
              {fighter.socialMedia && (
                <div className="flex items-center justify-center gap-3.5 mt-5 pt-4 border-t border-zinc-900/60 w-full relative z-10">
                  {fighter.socialMedia.facebook && (
                    <a href={fighter.socialMedia.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.instagram && (
                    <a href={fighter.socialMedia.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.tiktok && (
                    <a href={fighter.socialMedia.tiktok} target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.9-.97-1.24-1.55v7.71c.08 2.15-.69 4.35-2.24 5.86-1.71 1.73-4.32 2.45-6.66 1.83-2.45-.62-4.52-2.58-5.18-5.01-.84-2.92.38-6.27 2.94-7.66 1.34-.76 2.92-.98 4.43-.65v4.11c-.9-.31-1.92-.18-2.7.39-.77.53-1.21 1.45-1.18 2.39.01 1.12.78 2.13 1.86 2.41 1.09.31 2.33-.12 2.87-1.13.23-.42.33-.92.32-1.4V.02z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.youtube && (
                    <a href={fighter.socialMedia.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163c-.272-1.022-1.074-1.825-2.097-2.097C19.56 3.54 12 3.54 12 3.54s-7.56 0-9.401.526c-1.023.272-1.825 1.075-2.097 2.097C0 8.002 0 12 0 12s0 3.998.502 5.837c.272 1.022 1.074 1.825 2.097 2.097C4.44 20.46 12 20.46 12 20.46s7.56 0 9.401-.526c1.023-.272 1.825-1.075 2.097-2.097C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Achievements Card */}
            {fighter.achievements && fighter.achievements.length > 0 && (
              <div className="rounded-3xl border border-amber-500/10 bg-zinc-950/60 p-6 space-y-4 shadow-lg shadow-amber-500/[0.02]">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <span className="text-base text-amber-500">🏆</span>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">THÀNH TÍCH NỔI BẬT</h3>
                </div>
                <ul className="space-y-3 p-0 m-0 list-none text-xs">
                  {fighter.achievements.map((ach, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-zinc-300">
                      <span className="text-amber-500 font-bold mt-0.5 shrink-0">✦</span>
                      <span className="leading-relaxed font-light">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── CỘT PHẢI: TYPOGRAPHY, STATS & FIGHT TIMELINE (8/12) ── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Identity & Nickname Block */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-md uppercase">
                  LION CHAMPION
                </span>
                <span className="text-zinc-700">•</span>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  Hạng cân {fighter.weightClass}
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9] text-white">
                  {fighter.name}
                </h1>
                {fighter.nickname && (
                  <p className="text-lg md:text-xl font-bold text-red-500 tracking-wide uppercase font-mono">
                    &ldquo;{fighter.nickname}&rdquo;
                  </p>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {fighter.bio}
              </p>
            </div>

            {/* Wins / Losses Ledger */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { val: wins, label: "WINS", color: "text-emerald-400" },
                { val: losses, label: "LOSSES", color: "text-red-500" },
                { val: draws, label: "DRAWS", color: "text-zinc-500" },
                { val: `${winRate}%`, label: "WIN RATE", color: "text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 text-center hover:border-red-500/30 transition-all duration-300">
                  <div className={`text-3xl md:text-4xl font-black ${stat.color} leading-none font-mono`}>
                    {stat.val}
                  </div>
                  <div className="text-[8px] font-mono tracking-wider text-zinc-500 mt-2 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ── TỔNG QUAN CHỈ SỐ MMA & SO SÁNH VÕ SĨ ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Radar Chart skill mapping */}
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 flex flex-col items-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                    <h3 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">TỔNG QUAN CHỈ SỐ MMA</h3>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600">OCTAGON SKILL MAP</span>
                </div>

                <div className="relative">
                  <svg width={width} height={height} className="overflow-visible">
                    {/* Background rings */}
                    {[20, 40, 60, 80, 100].map((val) => {
                      const points = tags.map((_, i) => {
                        const pt = getRadarPoint(i, val);
                        return `${pt.x},${pt.y}`;
                      }).join(" ");
                      return (
                        <polygon
                          key={val}
                          points={points}
                          fill="none"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Axis lines */}
                    {tags.map((_, i) => {
                      const outerPt = getRadarPoint(i, 100);
                      return (
                        <line
                          key={i}
                          x1={cx}
                          y1={cy}
                          x2={outerPt.x}
                          y2={outerPt.y}
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Labels text */}
                    {tags.map((tag, i) => {
                      const pt = getRadarPoint(i, 115);
                      return (
                        <text
                          key={tag}
                          x={pt.x}
                          y={pt.y}
                          fill="#71717a"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {tag}
                        </text>
                      );
                    })}

                    {/* Current Fighter Stats Polygon */}
                    <polygon
                      points={currentPolyPoints}
                      fill="rgba(239,68,68,0.15)"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />

                    {/* Compared Fighter Stats Polygon */}
                    {comparedFighter && comparedPolyPoints && (
                      <polygon
                        points={comparedPolyPoints}
                        fill="rgba(59,130,246,0.15)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    )}
                  </svg>
                </div>

                {/* Legend indicator */}
                <div className="flex gap-4 mt-4 text-[9px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#ef4444] rounded" />
                    <span>{fighter.name}</span>
                  </div>
                  {comparedFighter && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#3b82f6] rounded" />
                      <span>{comparedFighter.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Search Selector & Performance History */}
              <div className="space-y-6">
                
                {/* Search comparison UI */}
                <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                    <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                    <h3 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">SO SÁNH VÕ SĨ</h3>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm võ sĩ để so sánh..."
                      className="w-full bg-[#080809] border border-zinc-900 rounded-xl px-4 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-500/40"
                    />
                    
                    {searchQuery.trim().length > 0 && (
                      <div className="absolute left-0 right-0 mt-1.5 bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden z-30">
                        {filteredCandidates.map(([key, item]) => (
                          <button
                            key={key}
                            onClick={() => {
                              setComparedKey(key);
                              setSearchQuery("");
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-zinc-900 transition-colors border-none text-xs text-zinc-300 flex items-center justify-between"
                          >
                            <span>{item.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">{item.club}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {comparedFighter && (
                    <div className="flex items-center justify-between bg-blue-500/5 border border-blue-500/10 rounded-xl p-3">
                      <div>
                        <p className="text-xs font-bold text-white">{comparedFighter.name}</p>
                        <p className="text-[9px] text-zinc-500 font-mono mt-0.5">{comparedFighter.club} · {comparedFighter.record}</p>
                      </div>
                      <button
                        onClick={() => setComparedKey(null)}
                        className="text-[9px] font-mono text-red-500 hover:text-red-400 bg-transparent border-none cursor-pointer"
                      >
                        HỦY
                      </button>
                    </div>
                  )}
                </div>

                {/* Form summary bar graph */}
                <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                      <h3 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">TÓM TẮT PHONG ĐỘ</h3>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      {(activeStats.ratings.reduce((a,b)=>a+b, 0) / 6).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-end justify-between h-28 pt-4 pb-2 border-b border-zinc-900/50">
                    {activeStats.ratings.map((rating, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 group/bar">
                        <span className="text-[9px] font-mono text-zinc-400 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {rating}
                        </span>
                        <div 
                          className={`w-7 rounded-t-lg transition-all duration-300 hover:brightness-125 ${ratingColor(rating)}`}
                          style={{ height: `${(rating / 10) * 80}px` }}
                        />
                        <span className="text-[8px] font-mono text-zinc-600">T{idx + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[8px] font-mono text-zinc-500">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-blue-500" />
                      <span>&ge; 8.0 Xuất sắc</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-emerald-500" />
                      <span>&ge; 7.0 Tốt</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-amber-500" />
                      <span>&ge; 6.5 Trung bình</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-rose-500" />
                      <span>Kém</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* General details and method ratios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                  <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    CHI TIẾT VÕ SĨ
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    { label: "NĂM SINH", val: fighter.birthYear ? `${fighter.birthYear}` : "—" },
                    { label: "CHIỀU CAO", val: fighter.height || "—" },
                    { label: "SẢI TAY", val: fighter.reach || "—" },
                    { label: "ĐỘ TUỔI", val: fighter.age ? `${fighter.age} tuổi` : "—" },
                    { label: "NƠI SINH / QUÊ QUÁN", val: fighter.hometown || "—" },
                    { label: "QUỐC TỊCH", val: `${fighter.flag ?? ""} ${fighter.nationality}` },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-wide">{stat.label}</span>
                      <span className="text-xs font-bold text-zinc-200 block">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4.5">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                  <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    PHƯƠNG THỨC CHIẾN THẮNG
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {[
                    { label: "KO / TKO", pct: Math.round(((fighter.koWins ?? 0) / wins) * 100), color: "from-red-600 to-rose-500" },
                    { label: "Submission", pct: Math.round(((fighter.subWins ?? 0) / wins) * 100), color: "from-sky-600 to-sky-400" },
                    { label: "Decision", pct: Math.round(((fighter.decisionWins ?? 0) / wins) * 100), color: "from-zinc-600 to-zinc-400" },
                  ].map((method, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400 font-medium">{method.label}</span>
                        <span className="text-zinc-200 font-bold">{method.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                        <div className={`h-full rounded-full bg-gradient-to-r ${method.color}`} style={{ width: `${method.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Battle Chronicle table list */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">LỊCH SỬ THI ĐẤU (BATTLE CHRONICLE)</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-900 px-3.5 py-1 rounded-md">
                  {fighter.fights?.length ?? 0} TRẬN ĐẤU
                </span>
              </div>

              <div className="space-y-3">
                {fighter.fights?.map((fight, idx) => {
                  const isWin = fight.result === "W";
                  const isLoss = fight.result === "L";
                  const theme = getMethodTheme(fight.method, isWin);
                  
                  return (
                    <div 
                      key={idx} 
                      className="group bg-black/40 border border-zinc-900/60 hover:border-red-500/20 hover:bg-zinc-900/15 rounded-2xl p-4 transition-all duration-200 grid grid-cols-12 items-center gap-4 relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 bottom-0 w-1 ${isWin ? 'bg-emerald-500' : isLoss ? 'bg-red-500' : 'bg-zinc-500'}`} />

                      <div className="col-span-2 pl-2">
                        <span className={`inline-flex items-center justify-center w-11 py-1 rounded-md text-[10px] font-mono font-black border tracking-wider text-center ${
                          isWin 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {isWin ? 'WIN' : 'LOSS'}
                        </span>
                      </div>

                      <div className="col-span-4 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-zinc-600">vs</span>
                          <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                            {fight.opponent}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 truncate block mt-0.5">{fight.event}</span>
                      </div>

                      <div className="col-span-3">
                        <span className={`inline-block text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded border uppercase truncate ${theme.bg} ${theme.text} ${theme.border}`}>
                          {fight.method}
                        </span>
                      </div>

                      <div className="col-span-3 text-right space-y-0.5">
                        <span className="text-xs font-mono font-semibold text-zinc-300 block">
                          Hiệp {fight.round} · {fight.time}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono block">
                          {fight.date}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
