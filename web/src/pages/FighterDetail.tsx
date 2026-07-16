import type { FighterProfile } from "../interfaces/fighter";

interface FighterDetailProps {
  fighter: FighterProfile;
  onBack: () => void;
}

export default function FighterDetail({ fighter, onBack }: FighterDetailProps) {
  const { wins, losses, draws } = fighter.record;
  const total = wins + losses + draws;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative selection:bg-red-600 selection:text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* ── BACKGROUND GEOMETRIC PATTERNS & GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,30,39,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.012)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Giant watermark text behind the columns */}
      <div className="absolute top-[30%] right-[5%] select-none pointer-events-none z-0 opacity-[0.02] text-right font-black uppercase leading-none">
        <span className="text-[15vw] block tracking-tighter" style={{ WebkitTextStroke: "1px white", fill: "transparent" }}>VTT</span>
        <span className="text-[12vw] block tracking-tighter text-red-600">56KG</span>
      </div>

      {/* ── HEADER ACTION BAR ── */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ══════════════════════════════════════
              LEFT COLUMN: MAIN IMAGE & TEAM CARD (4/12)
              ══════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Visual Fighter Photo Card */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col items-center">
              
              {/* Highlight backdrop glow behind image */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_75%)] pointer-events-none" />
              
              {/* Giant abstract octagon watermark in the card */}
              <div className="absolute w-[200px] h-[200px] border border-red-500/[0.03] rounded-[45px] rotate-12 pointer-events-none" />

              {/* The Image (Left Aligned now) */}
              <div className="relative z-10 w-full min-h-[300px] flex items-center justify-center">
                {fighter.photo ? (
                  <img
                    src={fighter.photo}
                    alt={fighter.name}
                    className="w-full max-w-[280px] object-contain drop-shadow-[0_20px_40px_rgba(239,68,68,0.2)] transition-transform duration-500 hover:scale-[1.03]"
                    style={{ maxHeight: "380px" }}
                  />
                ) : (
                  <div className="h-64 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-700 text-6xl">
                    👤
                  </div>
                )}
              </div>

              {/* Team details underneath image */}
              <div className="relative z-10 w-full mt-6 pt-5 border-t border-zinc-900/60 text-center space-y-1.5">
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">TEAM & COACH</span>
                <h4 className="text-sm font-extrabold text-white">{fighter.club}</h4>
                {fighter.coach && (
                  <p className="text-[11px] text-zinc-400 font-mono">HLV: {fighter.coach}</p>
                )}
              </div>
            </div>

            {/* Social media links quick strip */}
            {fighter.socialMedia && (
              <div className="flex gap-2.5">
                {fighter.socialMedia.facebook && (
                  <a href={fighter.socialMedia.facebook} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-center text-xs font-mono text-zinc-400 hover:text-white transition-all no-underline">
                    FACEBOOK
                  </a>
                )}
                {fighter.socialMedia.instagram && (
                  <a href={fighter.socialMedia.instagram} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-center text-xs font-mono text-zinc-400 hover:text-white transition-all no-underline">
                    INSTAGRAM
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════
              RIGHT COLUMN: TYPOGRAPHY, STATS & CHRONICLE (8/12)
              ══════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Identity Block */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md uppercase">
                  🏆 LION CHAMPION
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  Hạng cân {fighter.weightClass}
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                  {fighter.name}
                </h1>
                {fighter.nickname && (
                  <p className="text-lg md:text-xl font-medium text-red-500 tracking-wide italic">
                    &ldquo;{fighter.nickname}&rdquo;
                  </p>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {fighter.bio}
              </p>
            </div>

            {/* Quick stats strip (Cyber tech design) */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { val: wins, label: "WINS", color: "text-emerald-400" },
                { val: losses, label: "LOSSES", color: "text-red-500" },
                { val: draws, label: "DRAWS", color: "text-zinc-500" },
                { val: `${winRate}%`, label: "WIN RATE", color: "text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-3.5 text-center">
                  <div className={`text-2xl md:text-3xl font-black ${stat.color} leading-none`}>
                    {stat.val}
                  </div>
                  <div className="text-[8px] font-mono tracking-wider text-zinc-500 mt-2 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Physical & Victory Methods Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Physical stats */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-2">
                  PHYSICAL DETAILS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "CHIỀU CAO", val: fighter.height || "—" },
                    { label: "SẢI TAY", val: fighter.reach || "—" },
                    { label: "TUỔI", val: fighter.age ? `${fighter.age} tuổi` : "—" },
                    { label: "NƠI SINH", val: fighter.hometown || "—" },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 block uppercase">{stat.label}</span>
                      <span className="text-xs font-bold text-zinc-200">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Method ratios */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4.5">
                <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-2">
                  VICTORY METHODS
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "KO / TKO", pct: Math.round(((fighter.koWins ?? 0) / wins) * 100), color: "bg-red-500" },
                    { label: "Submission", pct: Math.round(((fighter.subWins ?? 0) / wins) * 100), color: "bg-rose-500" },
                    { label: "Decision", pct: Math.round(((fighter.decisionWins ?? 0) / wins) * 100), color: "bg-zinc-500" },
                  ].map((method, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-400">{method.label}</span>
                        <span className="text-zinc-300 font-bold">{method.pct}%</span>
                      </div>
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${method.color}`} style={{ width: `${method.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Battle Chronology Matches */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">BATTLE CHRONICLE</span>
                <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md">
                  {fighter.fights?.length ?? 0} MATCHES
                </span>
              </div>

              <div className="space-y-3.5">
                {fighter.fights?.map((fight, idx) => {
                  const isWin = fight.result === "W";
                  const isLoss = fight.result === "L";
                  
                  return (
                    <div 
                      key={idx} 
                      className="group relative bg-[#09090b]/40 border border-zinc-900 hover:border-red-500/25 rounded-xl p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                    >
                      {/* Left Side Winner/Loser strip */}
                      <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${isWin ? 'bg-emerald-500' : isLoss ? 'bg-red-500' : 'bg-zinc-700'}`} />

                      {/* Opponent Block */}
                      <div className="space-y-0.5 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-500">VS</span>
                          <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                            {fight.opponent}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 block">{fight.event}</span>
                      </div>

                      {/* Method Block */}
                      <div className="space-y-0.5 md:text-center">
                        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded border uppercase ${
                          isWin 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {fight.method}
                        </span>
                      </div>

                      {/* Round & Date Block */}
                      <div className="space-y-0.5 md:text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-zinc-300 block">HIỆP {fight.round} ({fight.time})</span>
                        <span className="text-[9px] font-mono text-zinc-600 block">{fight.date}</span>
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
