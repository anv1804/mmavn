"use client";

import { useState } from "react";
import GlassCard from "../../components/UI/GlassCard";
import Button from "../../components/UI/Button";
import { theme } from "../../config/theme";

// Import rankings mock data
import { nam_52 } from "../../data/rankings/nam_52";
import { nam_56 } from "../../data/rankings/nam_56";
import { nam_60 } from "../../data/rankings/nam_60";
import { nam_65 } from "../../data/rankings/nam_65";
import { nam_70 } from "../../data/rankings/nam_70";
import { nam_77 } from "../../data/rankings/nam_77";
import { nu_48 } from "../../data/rankings/nu_48";
import { nu_52 } from "../../data/rankings/nu_52";

export default function LionPage() {
  const divisions = {
    "56_nam": nam_56,
    "60_nam": nam_60,
    "65_nam": nam_65,
    "70_nam": nam_70,
    "77_nam": nam_77,
    "52_nu": nu_52,
    "52_nam": nam_52,
    "48_nu": nu_48
  };

  const [selectedDiv, setSelectedDiv] = useState("56_nam");
  const currentRankings = divisions[selectedDiv];

  // List of active champions to display at the top gallery
  const champions = [
    { ...nam_56.champion, division: "56kg Nam" },
    { ...nam_60.champion, division: "60kg Nam" },
    { ...nam_65.champion, division: "65kg Nam" },
    { ...nam_70.champion, division: "70kg Nam" },
    { ...nu_52.champion, division: "52kg Nữ" }
  ];

  return (
    <div className={theme.container}>
      <div className="space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white">
            LION Championship
          </h1>
          <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
            Bảng Xếp Hạng & Nhà Vô Địch MMA Việt Nam 2026
          </p>
        </div>

        {/* 1. Champions Gallery (Bảng Vàng Vô Địch) */}
        <section className="space-y-6">
          <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            🏆 Đương Kim Vô Địch (Champions)
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {champions.map((champ, idx) => (
              <GlassCard 
                key={idx} 
                className="relative overflow-hidden group flex flex-col justify-between border border-red-500/10 hover:border-red-500/30"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-red-600/10 rounded-bl-full flex items-center justify-center pointer-events-none group-hover:bg-red-600/20 transition-colors">
                  <span className="text-[10px] text-red-500 font-bold rotate-45 translate-x-1.5 -translate-y-1.5">★</span>
                </div>
                
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                    {champ.division}
                  </span>
                  
                  <div className="pt-2">
                    <h3 className="text-base font-black text-white leading-tight">{champ.name}</h3>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{champ.club}</p>
                  </div>
                </div>

                <div className="border-t border-zinc-900 mt-4 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>Record</span>
                  <span className="text-red-500 font-bold">{champ.record}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 2. Contender Rankings (Bảng Xếp Hạng Thách Đấu) */}
        <section className="space-y-6">
          <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
            📊 Bảng Xếp Hạng Thách Đấu (Contenders)
          </h2>

          {/* Division Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
            {Object.keys(divisions).map((key) => {
              const div = divisions[key];
              const isSelected = selectedDiv === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDiv(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? "bg-red-600 text-white shadow-md shadow-red-600/10"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {div.weightClass}
                </button>
              );
            })}
          </div>

          {/* Rankings Table */}
          <GlassCard className="overflow-hidden border border-zinc-900 p-0">
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-zinc-200">
                  Hạng cân {currentRankings.weightClass}
                </h3>
                {currentRankings.champion ? (
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Đương kim vô địch: <span className="text-red-500 font-bold">{currentRankings.champion.name}</span> ({currentRankings.champion.club})
                  </p>
                ) : (
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {currentRankings.description || "Hạng cân hiện đang bỏ trống hoặc không hoạt động."}
                  </p>
                )}
              </div>
            </div>

            {currentRankings.rankings && currentRankings.rankings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-950/40 text-zinc-500 uppercase tracking-wider font-mono">
                      <th className="p-4 w-16 text-center">Thứ Hạng</th>
                      <th className="p-4">Võ Sĩ</th>
                      <th className="p-4">Câu Lạc Bộ</th>
                      <th className="p-4 text-center">Thành Tích</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRankings.rankings.map((fighter) => (
                      <tr 
                        key={fighter.rank} 
                        className="border-b border-zinc-900/40 hover:bg-zinc-900/10 transition-colors"
                      >
                        <td className="p-4 text-center font-bold font-mono text-zinc-400 text-sm">
                          #{fighter.rank}
                        </td>
                        <td className="p-4 font-extrabold text-zinc-200 text-sm">
                          {fighter.name}
                        </td>
                        <td className="p-4 text-zinc-400">
                          {fighter.club}
                        </td>
                        <td className="p-4 text-center font-mono font-bold text-red-500/80">
                          {fighter.record}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-zinc-500 text-xs font-mono">
                Không có dữ liệu bảng xếp hạng thách đấu cho hạng cân này.
              </div>
            )}
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
