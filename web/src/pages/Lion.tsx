import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mmaClubs } from "../data/clubs";
import { nam_52 } from "../data/rankings/nam_52";
import { nam_56 } from "../data/rankings/nam_56";
import { nam_60 } from "../data/rankings/nam_60";
import { nam_65 } from "../data/rankings/nam_65";
import { nam_70 } from "../data/rankings/nam_70";
import { nam_77 } from "../data/rankings/nam_77";
import { nu_48 } from "../data/rankings/nu_48";
import { nu_52 } from "../data/rankings/nu_52";
import type { Division } from "../interfaces/ranking";

import ChampionCarousel from "../components/Lion/ChampionCarousel";
import DivisionTabs from "../components/Lion/DivisionTabs";
import RankingsTable from "../components/Lion/RankingsTable";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

type GenderFilter = "all" | "nam" | "nu";

export default function Lion() {
  const navigate = useNavigate();
  const [selectedLionDiv, setSelectedLionDiv] = useState("56_nam");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");

  const divisions: Record<string, Division> = {
    "56_nam": nam_56, "60_nam": nam_60, "65_nam": nam_65,
    "70_nam": nam_70, "77_nam": nam_77, "52_nu": nu_52,
    "52_nam": nam_52, "48_nu": nu_48,
  };

  const currentRankings = divisions[selectedLionDiv];

  const champions = [
    { ...nam_56.champion!, division: "56kg Nam" },
    { ...nam_60.champion!, division: "60kg Nam" },
    { ...nam_65.champion!, division: "65kg Nam" },
    { ...nam_70.champion!, division: "70kg Nam" },
    { ...nu_52.champion!, division: "52kg Nữ" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
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

              {/* Featured Champion Card */}
              <div
                className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 group cursor-pointer hover:border-red-500/30 transition-all duration-300"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.03)" }}
                onClick={() => navigate("/fighter/le-van-tuan")}
              >
                <div className="flex items-stretch gap-0">
                  {/* Fighter photo */}
                  <div className="relative w-24 shrink-0 overflow-hidden">
                    <img src="/lvt.png" alt="Lê Văn Tuần"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent 50%, rgba(24,24,27,0.9) 100%)" }} />
                    {/* Red glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.15) 0%, transparent 70%)" }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-4 py-3 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7px] font-mono text-amber-400/80 uppercase tracking-[0.2em]">Vô Địch Nổi Bật</span>
                      <span className="text-amber-400 text-[10px]">★</span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white leading-tight">Lê Văn Tuần</h3>
                      <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Vietnam Top Team · 56kg</p>
                    </div>
                    {/* W/D/L row */}
                    <div className="flex items-center gap-3 pt-0.5">
                      <div className="text-center">
                        <div className="text-sm font-black text-emerald-400 leading-none">8</div>
                        <div className="text-[7px] text-zinc-600 font-mono uppercase">W</div>
                      </div>
                      <div className="w-px h-5 bg-zinc-800" />
                      <div className="text-center">
                        <div className="text-sm font-black text-zinc-500 leading-none">0</div>
                        <div className="text-[7px] text-zinc-600 font-mono uppercase">D</div>
                      </div>
                      <div className="w-px h-5 bg-zinc-800" />
                      <div className="text-center">
                        <div className="text-sm font-black text-red-400 leading-none">3</div>
                        <div className="text-[7px] text-zinc-600 font-mono uppercase">L</div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xs font-black text-white">73%</div>
                        <div className="text-[7px] text-zinc-600 font-mono uppercase">Win</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View profile CTA */}
                <div className="px-4 py-2 flex items-center justify-between bg-zinc-950/40 border-t border-zinc-800/40">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Xem hồ sơ đầy đủ</span>
                  <span className="text-[10px] text-red-500 font-mono group-hover:text-red-400 transition-colors">→</span>
                </div>
                {/* Bottom accent bar */}
                <div className="h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Upcoming Event */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-red-400 uppercase tracking-widest">Sự kiện tiếp theo</span>
                    </div>
                    <div className="font-black text-sm text-white">LION Championship 34</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Cung TT Quần Ngựa · Hà Nội</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-xl font-black text-red-400">15</div>
                    <div className="text-[8px] font-mono text-zinc-600 uppercase">Tháng 8</div>
                    <div className="text-[8px] font-mono text-zinc-600">2026</div>
                  </div>
                </div>
              </div>

              {/* 3 key stats in a row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "8", label: "Hạng cân" },
                  { value: "33+", label: "Sự kiện" },
                  { value: "5", label: "Vô địch" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-2 py-2.5 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-lg font-black text-white leading-none">{s.value}</div>
                    <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Red separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

      {/* ══════════════════════════════════════
          CHAMPIONS CAROUSEL
      ══════════════════════════════════════ */}
      <div className="relative py-16">
        {/* Section ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(239,68,68,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
              <div>
                <div className="text-[9px] font-mono text-amber-500/60 uppercase tracking-[0.3em]">Hall of Champions</div>
                <h2 className="text-lg font-black text-white uppercase tracking-wide">Đương Kim Vô Địch</h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            <div className="flex items-center gap-1.5 bg-amber-500/8 border border-amber-500/20 rounded-full px-3 py-1">
              <span className="text-sm">🏆</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold">{champions.length} TITLES HELD</span>
            </div>
          </div>

          <ChampionCarousel champions={champions} />
        </div>
      </div>

      {/* ══════════════════════════════════════
          RANKINGS SECTION
      ══════════════════════════════════════ */}
      <div className="border-t border-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
              <div>
                <div className="text-[9px] font-mono text-red-500/60 uppercase tracking-[0.3em]">Official Rankings</div>
                <h2 className="text-lg font-black text-white uppercase tracking-wide">Bảng Xếp Hạng</h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          {/* Layout: tabs + table side by side on large screens */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Division sidebar */}
            <div className="lg:w-52 shrink-0">

              {/* Gender filter buttons */}
              <div className="hidden lg:flex gap-1.5 mb-4 p-1 bg-zinc-900/60 rounded-xl border border-zinc-800/50">
                {(["all", "nam", "nu"] as GenderFilter[]).map(g => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className="flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border-none"
                    style={{
                      background: genderFilter === g
                        ? g === "nu" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"
                        : "transparent",
                      color: genderFilter === g
                        ? g === "nu" ? "#fbbf24" : "#f87171"
                        : "#52525b",
                    }}
                  >
                    {g === "all" ? "Tất cả" : g === "nam" ? "Nam" : "Nữ"}
                  </button>
                ))}
              </div>

              {/* Division list — sorted by weight asc, filtered by gender */}
              <div className="hidden lg:flex lg:flex-col gap-1.5">
                {Object.keys(divisions)
                  .filter(key => {
                    if (genderFilter === "all") return true;
                    return key.includes(genderFilter);
                  })
                  .sort((a, b) => {
                    const wa = parseInt(a.split("_")[0]);
                    const wb = parseInt(b.split("_")[0]);
                    return wa - wb;
                  })
                  .map((key) => {
                    const div = divisions[key];
                    const isSelected = selectedLionDiv === key;
                    const isNu = key.includes("nu");
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedLionDiv(key)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer border"
                        style={{
                          background: isSelected ? (isNu ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)") : "rgba(24,24,27,0.4)",
                          borderColor: isSelected ? (isNu ? "rgba(245,158,11,0.35)" : "rgba(239,68,68,0.35)") : "rgba(39,39,42,0.5)",
                          color: isSelected ? (isNu ? "#fbbf24" : "#f87171") : "#71717a",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{div.weightClass}</span>
                          {isNu
                            ? <span className="text-[8px] text-amber-600/60 font-normal">NỮ</span>
                            : <span className="text-[8px] text-zinc-700 font-normal">NAM</span>}
                        </div>
                        {isSelected && div.champion && (
                          <p className="text-[9px] mt-1 text-current opacity-70 font-normal truncate">{div.champion.name}</p>
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* Mobile: horizontal tabs */}
              <div className="lg:hidden">
                <DivisionTabs divisions={divisions} selectedDiv={selectedLionDiv} onSelect={setSelectedLionDiv} />
              </div>
            </div>

            {/* Right: Rankings */}
            <div className="flex-1 space-y-5">
              {/* Champion highlight card — prominent */}
              {currentRankings.champion && (() => {
                const parts = currentRankings.champion.record.split("-").map(Number);
                const [w, l, d] = parts;
                const total = w + l + (d || 0);
                const rate = total > 0 ? Math.round((w / total) * 100) : 0;
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
                          <div className="text-xl font-black text-zinc-500 leading-none">{d ?? 0}</div>
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
              })()}

              {/* Top 3 podium */}
              {currentRankings.rankings && currentRankings.rankings.length >= 3 && (
                <div className="grid grid-cols-3 gap-3">
                  {currentRankings.rankings.slice(0, 3).map((f, i) => (
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

              {/* Full rankings table — skip top 3 if podium shown above */}
              <RankingsTable
                rankings={currentRankings}
                skipFirst={currentRankings.rankings && currentRankings.rankings.length >= 3 ? 3 : 0}
              />
            </div>
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
