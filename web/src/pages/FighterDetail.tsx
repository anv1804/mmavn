import type { FighterProfile } from "../interfaces/fighter";

interface FighterDetailProps {
  fighter: FighterProfile;
  onBack: () => void;
}

const METHOD_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  KO: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
  TKO: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  Submission: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  Decision: { bg: "bg-zinc-800/80", text: "text-zinc-400", border: "border-zinc-700/30" },
};

function getMethodTheme(method: string) {
  for (const key of Object.keys(METHOD_THEMES)) {
    if (method.startsWith(key)) return METHOD_THEMES[key];
  }
  return { bg: "bg-zinc-800/80", text: "text-zinc-400", border: "border-zinc-700/30" };
}

export default function FighterDetail({ fighter, onBack }: FighterDetailProps) {
  const { wins, losses, draws } = fighter.record;
  const total = wins + losses + draws;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 selection:bg-red-500 selection:text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* ── CINEMATIC HERO SECTION ── */}
      <div className="relative overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950">
        
        {/* Background Decorative Grid and Spotlights */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] bg-zinc-800/40 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-6 z-10">
          {/* Header Action Row */}
          <div className="flex items-center justify-between py-2 mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-red-400 bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              ← QUAY LẠI
            </button>
            <span className="text-[10px] font-mono tracking-widest text-zinc-600 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-900">
              ID: {fighter.id.toUpperCase()}
            </span>
          </div>

          {/* Asymmetric Profile Splitting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Side: Identity Info */}
            <div className="lg:col-span-8 space-y-6 pb-12">
              
              {/* Category Badge & Title */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md uppercase">
                  🏆 CHAMPION
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                  {fighter.weightClass}
                </span>
              </div>

              {/* Huge Name Header */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
                  {fighter.name}
                </h1>
                {fighter.nickname && (
                  <p className="text-lg md:text-xl font-medium text-red-500 italic tracking-wide">
                    "{fighter.nickname}"
                  </p>
                )}
              </div>

              {/* Bio snippet */}
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-light">
                {fighter.bio}
              </p>

              {/* Dynamic Record Gilded Display */}
              <div className="flex items-center gap-2 p-1.5 bg-zinc-900/30 border border-zinc-900 rounded-2xl w-fit">
                <div className="flex items-center divide-x divide-zinc-800">
                  <div className="px-5 py-2.5 text-center">
                    <span className="block text-2xl font-black text-emerald-400 leading-none">{wins}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mt-1 block">WINS</span>
                  </div>
                  <div className="px-5 py-2.5 text-center">
                    <span className="block text-2xl font-black text-red-400 leading-none">{losses}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mt-1 block">LOSSES</span>
                  </div>
                  <div className="px-5 py-2.5 text-center">
                    <span className="block text-2xl font-black text-zinc-500 leading-none">{draws}</span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mt-1 block">DRAWS</span>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-mono font-bold text-xs px-4 py-3.5 rounded-xl ml-1 text-center min-w-[70px]">
                  {winRate}% WR
                </div>
              </div>
            </div>

            {/* Right Side: Double Spotlight Transparent Image */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)] opacity-80 pointer-events-none" />
              {fighter.photo ? (
                <img
                  src={fighter.photo}
                  alt={fighter.name}
                  className="relative z-10 w-full max-w-[280px] lg:max-w-none object-contain drop-shadow-[0_20px_40px_rgba(239,68,68,0.3)] transition-transform duration-500 hover:scale-[1.03]"
                  style={{ maxHeight: "380px" }}
                />
              ) : (
                <div className="h-72 w-56 bg-zinc-900/40 border border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-700 text-6xl">
                  👤
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT GRID ── */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stats & Breakdown (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profile Metrics Card */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3">
                📋 THÔNG SỐ VÕ SĨ
              </h3>
              
              <div className="space-y-3.5">
                {[
                  { label: "Độ tuổi", value: fighter.age ? `${fighter.age} tuổi` : "—" },
                  { label: "Chiều cao / Sải tay", value: `${fighter.height ?? "—"} / ${fighter.reach ?? "—"}` },
                  { label: "Hạng cân thi đấu", value: fighter.weightClass },
                  { label: "Cơ sở đào tạo", value: fighter.club },
                  { label: "Quốc tịch / Quê quán", value: `${fighter.flag ?? ""} ${fighter.hometown ?? fighter.nationality}` },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-zinc-900/30 last:border-0">
                    <span className="text-[11px] text-zinc-500 font-mono">{item.label}</span>
                    <span className="text-xs font-bold text-zinc-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Methods Visualizer */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 space-y-5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3">
                📊 PHƯƠNG THỨC CHIẾN THẮNG
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Knockout / TKO", count: fighter.koWins ?? 0, pct: Math.round(((fighter.koWins ?? 0) / wins) * 100), color: "from-rose-500 to-rose-400" },
                  { label: "Submission", count: fighter.subWins ?? 0, pct: Math.round(((fighter.subWins ?? 0) / wins) * 100), color: "from-sky-500 to-sky-400" },
                  { label: "Tính điểm (Decision)", count: fighter.decisionWins ?? 0, pct: Math.round(((fighter.decisionWins ?? 0) / wins) * 100), color: "from-zinc-500 to-zinc-400" },
                ].map((m, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400 font-light">{m.label}</span>
                      <span className="font-mono text-zinc-300 font-bold">{m.count} trận ({m.pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${m.color}`} 
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disciplines Tags */}
            {fighter.disciplines && (
              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-3">
                  🥋 MÔN PHÁI & SỞ TRƯỜNG
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fighter.disciplines.map((d, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg bg-zinc-950 text-zinc-400 border border-zinc-900/80"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Combat Chronicle (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Timeline Match Card */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-900/10 flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                  ⚔️ LỊCH SỬ THI ĐẤU (COMBAT CHRONICLE)
                </h3>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-3 py-1 rounded-full border border-zinc-900">
                  {fighter.fights?.length ?? 0} TRẬN ĐẤU
                </span>
              </div>

              {/* Match timeline path */}
              <div className="divide-y divide-zinc-900/60">
                {fighter.fights?.map((fight, idx) => {
                  const theme = getMethodTheme(fight.method);
                  const isWin = fight.result === "W";
                  const isLoss = fight.result === "L";
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-zinc-900/10 transition-colors ${idx === 0 ? 'bg-red-500/[0.01]' : ''}`}
                    >
                      {/* Left: Result Badge & Opponent */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                          isWin 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : isLoss 
                              ? "bg-red-500/10 border-red-500/20 text-red-400" 
                              : "bg-zinc-800/40 border-zinc-800 text-zinc-400"
                        }`}>
                          <span className="text-xs font-black">{fight.result}</span>
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <h4 className="text-sm font-bold text-white tracking-wide truncate">
                            {fight.opponent}
                          </h4>
                          <p className="text-[11px] text-zinc-500 font-mono tracking-wide truncate">
                            {fight.event}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Method badge */}
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded border uppercase ${theme.bg} ${theme.text} ${theme.border}`}>
                          {fight.method}
                        </span>
                      </div>

                      {/* Right: Round & Date info */}
                      <div className="text-left md:text-right shrink-0 md:pl-4 space-y-0.5">
                        <div className="text-xs font-mono font-bold text-zinc-300">
                          Hiệp {fight.round} · {fight.time}
                        </div>
                        <div className="text-[9px] text-zinc-600 font-mono">
                          {fight.date}
                        </div>
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
