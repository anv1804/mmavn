import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { mmaClubs } from "../data/clubs";

import ChampionCarousel from "../components/Lion/ChampionCarousel";
import DivisionTabs from "../components/Lion/DivisionTabs";
import RankingsTable from "../components/Lion/RankingsTable";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

type GenderFilter = "all" | "nam" | "nu";

export default function Lion() {
  const navigate = useNavigate();
  const [selectedLionDiv, setSelectedLionDiv] = useState("nam_56");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [loading, setLoading] = useState(true);
  
  // Dynamic rankings from database
  const [dbRankings, setDbRankings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const { data, error } = await supabase.from("rankings").select("*");
        if (error) throw error;
        if (data) {
          setDbRankings(data);
        }
      } catch (err) {
        console.error("Error loading rankings from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, []);

  // Format rankings into a Record map lookup
  const divisions: Record<string, any> = {};
  dbRankings.forEach((item) => {
    divisions[item.id] = {
      weightClass: item.weight_class,
      status: item.description ? "Hoạt động" : "Không hoạt động",
      description: item.description,
      champion: item.champion,
      rankings: item.rankings || [],
    };
  });

  const currentRankings = divisions[selectedLionDiv] || {
    weightClass: "...",
    champion: null,
    rankings: []
  };

  // Filter divisions to display based on selected gender
  const filteredDivisions = Object.keys(divisions).reduce((acc, key) => {
    const isNu = key.includes("nu");
    if (genderFilter === "all") {
      acc[key] = divisions[key];
    } else if (genderFilter === "nam" && !isNu) {
      acc[key] = divisions[key];
    } else if (genderFilter === "nu" && isNu) {
      acc[key] = divisions[key];
    }
    return acc;
  }, {} as Record<string, any>);

  // Dynamically assemble champions list
  const champions = dbRankings
    .filter((div) => div.champion)
    .map((div) => ({
      name: div.champion.name,
      club: div.champion.club,
      record: div.champion.record,
      photo: div.champion.photo,
      division: div.weight_class,
    }));

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        {/* Octagon grid bg */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(239,68,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Glow orbs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.6) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left: Title */}
            <div className="space-y-6">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 border border-red-500/25 bg-red-500/8 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-[0.2em]">Season 2026 · Live</span>
              </div>

              <div className="flex items-center gap-4">
                <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-28 h-28 object-contain drop-shadow-[0_10px_20px_rgba(239,68,68,0.25)]" />
                <div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1.5">
                    Giải MMA Hàng Đầu Việt Nam
                  </div>
                  <h1
                    className="font-black uppercase leading-[0.95] tracking-tighter"
                    style={{ textShadow: "0 0 80px rgba(239,68,68,0.25)" }}
                  >
                    <span className="text-white block text-3xl md:text-5xl">LION</span>
                    <span
                      className="block bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent text-4xl md:text-6xl"
                    >
                      CHAMPIONSHIP
                    </span>
                  </h1>
                </div>
              </div>

              <p className="text-zinc-500 text-sm font-mono max-w-sm leading-relaxed">
                Bảng xếp hạng chính thức & nhà vô địch các hạng cân MMA Việt Nam mùa giải 2026.
              </p>

              {/* LION Championship Official Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.9-.97-1.24-1.55v7.71c.08 2.15-.69 4.35-2.24 5.86-1.71 1.73-4.32 2.45-6.66 1.83-2.45-.62-4.52-2.58-5.18-5.01-.84-2.92.38-6.27 2.94-7.66 1.34-.76 2.92-.98 4.43-.65v4.11c-.9-.31-1.92-.18-2.7.39-.77.53-1.21 1.45-1.18 2.39.01 1.12.78 2.13 1.86 2.41 1.09.31 2.33-.12 2.87-1.13.23-.42.33-.92.32-1.4V.02z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163c-.272-1.022-1.074-1.825-2.097-2.097C19.56 3.54 12 3.54 12 3.54s-7.56 0-9.401.526c-1.023.272-1.825 1.075-2.097 2.097C0 8.002 0 12 0 12s0 3.998.502 5.837c.272 1.022 1.074 1.825 2.097 2.097C4.44 20.46 12 20.46 12 20.46s7.56 0 9.401-.526c1.023-.272 1.825-1.075 2.097-2.097C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Featured panel */}
            <div className="flex flex-col gap-3 lg:w-72 shrink-0">
              {loading ? (
                <div className="h-[260px] bg-zinc-900/40 rounded-3xl animate-pulse border border-zinc-900" />
              ) : (
                <ChampionCarousel champions={champions} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left panel: Filters (4/12) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Gender filter */}
            <div className="flex p-1 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
              {(["all", "nam", "nu"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 border-none cursor-pointer ${
                    genderFilter === g
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "bg-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {g === "all" ? "Tất cả" : g === "nam" ? "Nam" : "Nữ"}
                </button>
              ))}
            </div>

            {/* Division tabs list */}
            {loading ? (
              <div className="h-64 bg-zinc-900/40 rounded-3xl animate-pulse border border-zinc-900" />
            ) : (
              <DivisionTabs
                divisions={filteredDivisions}
                selectedDiv={selectedLionDiv}
                onSelect={(key) => setSelectedLionDiv(key)}
              />
            )}
          </div>

          {/* Right panel: Rankings details & Table (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            {loading ? (
              <div className="space-y-4">
                <div className="h-44 bg-zinc-900/40 rounded-3xl animate-pulse border border-zinc-900" />
                <div className="h-96 bg-zinc-900/40 rounded-3xl animate-pulse border border-zinc-900" />
              </div>
            ) : (
              <>
                {/* Champion highlight */}
                {currentRankings.champion ? (() => {
                  const recordParts = currentRankings.champion.record.split("-");
                  const w = recordParts[0] || "0";
                  const l = recordParts[1] || "0";
                  const d = recordParts[2] || "0";
                  const totalWins = parseInt(w);
                  const totalLosses = parseInt(l);
                  const totalDraws = parseInt(d);
                  const totalFights = totalWins + totalLosses + totalDraws;
                  const rate = totalFights > 0 ? Math.round((totalWins / totalFights) * 100) : 0;

                  return (
                    <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 group"
                      style={{ boxShadow: "0 0 0 1px rgba(245,158,11,0.08), 0 8px 32px rgba(245,158,11,0.08)" }}>

                      {/* BG layers */}
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-amber-950/30" />
                      <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                      }} />

                      {/* Photo — right side */}
                      {currentRankings.champion.photo && (
                        <div className="absolute right-0 top-0 bottom-0 w-40 overflow-hidden">
                          <img src={currentRankings.champion.photo} alt={currentRankings.champion.name}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(24,24,27,1) 0%, rgba(24,24,27,0.3) 60%, transparent 100%)" }} />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 p-5 pr-44">
                        {/* Title badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full px-2.5 py-1">
                            <span className="text-[10px]">🏆</span>
                            <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-widest">Đương Kim Vô Địch</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-600">{currentRankings.weightClass}</span>
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl font-black text-white leading-tight mb-0.5">{currentRankings.champion.name}</h3>
                        <p className="text-xs text-zinc-500 font-mono mb-4">{currentRankings.champion.club}</p>

                        {/* Stats row */}
                        <div className="flex items-center gap-5">
                          <div className="text-center">
                            <div className="text-xl font-black text-emerald-400 leading-none">{w}</div>
                            <div className="text-[8px] text-zinc-600 font-mono uppercase mt-0.5">Thắng</div>
                          </div>
                          <div className="w-px h-6 bg-zinc-800" />
                          <div className="text-center">
                            <div className="text-xl font-black text-zinc-500 leading-none">{d}</div>
                            <div className="text-[8px] text-zinc-600 font-mono uppercase mt-0.5">Hòa</div>
                          </div>
                          <div className="w-px h-6 bg-zinc-800" />
                          <div className="text-center">
                            <div className="text-xl font-black text-red-400 leading-none">{l}</div>
                            <div className="text-[8px] text-zinc-600 font-mono uppercase mt-0.5">Thua</div>
                          </div>
                          <div className="ml-4 flex flex-col justify-center">
                            <div className="text-[9px] font-mono text-zinc-600 uppercase mb-1">Win Rate</div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                                  style={{ width: `${rate}%` }} />
                              </div>
                              <span className="text-sm font-black text-white">{rate}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className="h-0.5 bg-gradient-to-r from-amber-500 via-amber-400/60 to-transparent" />
                    </div>
                  );
                })() : (
                  <div className="bg-zinc-900/30 border border-zinc-850 p-5 rounded-2xl text-center">
                    <span className="text-xs text-zinc-500 font-mono">Hạng cân chưa có nhà vô địch chính thức</span>
                  </div>
                )}

                {/* Top 3 podium */}
                {currentRankings.rankings && currentRankings.rankings.length >= 3 && (
                  <div className="grid grid-cols-3 gap-3">
                    {currentRankings.rankings.slice(0, 3).map((f: any, i: number) => (
                      <div key={f.rank}
                        className="relative rounded-xl p-4 text-center border transition-colors"
                        style={{
                          background: i === 0 ? "rgba(245,158,11,0.06)" : "rgba(39,39,42,0.3)",
                          borderColor: i === 0 ? "rgba(245,158,11,0.25)" : "rgba(63,63,70,0.4)",
                        }}>
                        <div className="text-2xl mb-2">{RANK_MEDALS[i]}</div>
                        <div className="font-black text-xs text-white leading-tight">{f.name}</div>
                        <div className="text-[9px] text-zinc-600 font-mono mt-1">{f.club}</div>
                        <div className="text-xs font-mono font-bold text-zinc-400 mt-2">{f.record}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Full rankings table */}
                <RankingsTable
                  rankings={currentRankings}
                  skipFirst={currentRankings.rankings && currentRankings.rankings.length >= 3 ? 3 : 0}
                />
              </>
            )}
          </div>
        </div>

        {/* ── SECTION: TOP CLUBS PREVIEW ── */}
        <div className="mt-20 pt-16 border-t border-zinc-900/60 max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
              <div>
                <div className="text-[9px] font-mono text-red-500/60 uppercase tracking-[0.3em]">Affiliated Gyms</div>
                <h2 className="text-lg font-black text-white uppercase tracking-wide">Võ Đường & CLB MMA Tiêu Biểu</h2>
              </div>
            </div>
            <button
              onClick={() => navigate("/clubs")}
              className="text-[10px] font-mono font-bold tracking-widest text-red-500 hover:text-red-400 bg-transparent border-none cursor-pointer flex items-center gap-1.5"
            >
              XEM TẤT CẢ CLB &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mmaClubs.slice(0, 3).map((club) => (
              <div
                key={club.id}
                onClick={() => navigate(`/club/${club.id}`)}
                className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 cursor-pointer hover:bg-zinc-950/70"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center p-1.5 overflow-hidden">
                      <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors leading-tight">{club.name}</h4>
                      <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">{club.city}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-light">
                    {club.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900/60 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                  <span>HLV: {club.headCoach}</span>
                  <span className="text-red-500 group-hover:translate-x-1 transition-transform">CHI TIẾT &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
