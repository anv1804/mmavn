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
      
      {/* ── GIANT BACKGROUND WATERMARK ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.02]">
        <span className="text-[24vw] font-black tracking-tighter uppercase block leading-none text-center text-white" style={{ WebkitTextStroke: "2px white", fill: "transparent" }}>
          CHAMP
        </span>
      </div>

      <div className="absolute top-[40%] right-[-10%] select-none pointer-events-none z-0 opacity-[0.03]">
        <span className="text-[20vw] font-black tracking-tighter uppercase block leading-none text-zinc-500">
          56KG
        </span>
      </div>

      {/* Cybernetic Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,30,39,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.012)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* ── STICKY/FLOATING CONTROLS ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-zinc-400 hover:text-white bg-black/60 border border-zinc-800/80 hover:border-red-500/50 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200 block">&larr;</span> 
          <span>QUAY LẠI</span>
        </button>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[9px] font-mono tracking-widest text-red-400 font-bold uppercase">LION CHAMPIONSHIP</span>
        </div>
      </div>

      {/* ── HERO BANNER AREA (CINEMATIC DISPLAY) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Huge typography and high-tech status (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Stat Row */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-red-500 font-black tracking-widest uppercase">{fighter.flag} {fighter.nationality}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 tracking-widest uppercase">Vietnam Top Team</span>
            </div>

            {/* Huge Name Display */}
            <div className="space-y-0 relative">
              <span className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase block">
                FIGHTER PROFILE
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                {fighter.name.split(" ").slice(0, 2).join(" ")} <br/>
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  {fighter.name.split(" ").slice(2).join(" ") || "CHAMP"}
                </span>
              </h1>
              {fighter.nickname && (
                <div className="inline-block mt-3 text-sm font-mono tracking-widest text-zinc-400 uppercase bg-zinc-900/60 border border-zinc-800 px-3.5 py-1 rounded-md">
                  &ldquo;{fighter.nickname}&rdquo;
                </div>
              )}
            </div>

            {/* Quick stats strip (Cyber tech design) */}
            <div className="grid grid-cols-4 gap-4 max-w-xl">
              {[
                { val: wins, label: "WINS", color: "text-emerald-400" },
                { val: losses, label: "LOSSES", color: "text-red-500" },
                { val: draws, label: "DRAWS", color: "text-zinc-500" },
                { val: `${winRate}%`, label: "WIN RATE", color: "text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-3 text-center">
                  <div className={`text-2xl md:text-3xl font-black ${stat.color} leading-none`}>
                    {stat.val}
                  </div>
                  <div className="text-[8px] font-mono tracking-wider text-zinc-500 mt-1.5 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio summary */}
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xl">
              {fighter.bio}
            </p>
          </div>

          {/* Right Column: Dynamic Octagon & Image Overlap (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Tech Octagon background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] border border-red-500/20 rounded-[40px] rotate-45 animate-pulse" />
              <div className="absolute w-[240px] h-[240px] border border-zinc-800 rounded-[30px] -rotate-45" />
            </div>

            {/* Image container */}
            <div className="relative z-10">
              <img
                src={fighter.photo}
                alt={fighter.name}
                className="w-full max-w-[320px] object-contain drop-shadow-[0_25px_50px_rgba(239,68,68,0.25)] transition-transform duration-500 hover:scale-[1.04]"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── DETAILED STATS GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area: Info Strip & Physical Metrics (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cyber Info Panel */}
            <div className="rounded-2xl border border-zinc-900 bg-black/40 backdrop-blur-md p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">PHYSICAL STATS</span>
                <span className="text-[9px] font-mono text-red-500">SECURE PROFILE</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "CHIỀU CAO", val: fighter.height || "—" },
                  { label: "SẢI TAY", val: fighter.reach || "—" },
                  { label: "HẠNG CÂN", val: fighter.weightClass },
                  { label: "CÂN NẶNG", val: fighter.weight },
                  { label: "ĐỘ TUỔI", val: fighter.age ? `${fighter.age} tuổi` : "—" },
                  { label: "QUÊ QUÁN", val: fighter.hometown || "—" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#09090b]/60 border border-zinc-900/60 rounded-xl p-3.5 space-y-1">
                    <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-wider">{item.label}</span>
                    <span className="text-xs font-bold text-zinc-200 block">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Victory Gilded Breakdown */}
            <div className="rounded-2xl border border-zinc-900 bg-black/40 backdrop-blur-md p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">METHOD BREAKDOWN</span>
                <span className="text-[9px] font-mono text-amber-500">RATIO</span>
              </div>

              <div className="space-y-4">
                {[
                  { type: "Knockout / TKO", val: fighter.koWins ?? 0, pct: Math.round(((fighter.koWins ?? 0) / wins) * 100), color: "bg-red-500" },
                  { type: "Submission", val: fighter.subWins ?? 0, pct: Math.round(((fighter.subWins ?? 0) / wins) * 100), color: "bg-rose-500" },
                  { type: "Decision (Tính điểm)", val: fighter.decisionWins ?? 0, pct: Math.round(((fighter.decisionWins ?? 0) / wins) * 100), color: "bg-zinc-600" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">{item.type}</span>
                      <span className="text-zinc-200 font-bold">{item.val} trận ({item.pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden p-[1px] border border-zinc-900">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Area: Combative Chronology Match Poster (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="rounded-2xl border border-zinc-900 bg-black/40 backdrop-blur-md p-6">
              
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">BATTLE CHRONICLE</span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md">
                  {fighter.fights?.length ?? 0} MATCHES
                </span>
              </div>

              {/* Matchup Poster Cards */}
              <div className="space-y-4">
                {fighter.fights?.map((fight, idx) => {
                  const isWin = fight.result === "W";
                  const isLoss = fight.result === "L";
                  
                  return (
                    <div 
                      key={idx} 
                      className="group relative bg-[#09090b]/60 border border-zinc-900 hover:border-red-500/20 rounded-xl p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                    >
                      {/* Win indicator highlight */}
                      <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${isWin ? 'bg-emerald-500' : isLoss ? 'bg-red-500' : 'bg-zinc-700'}`} />

                      {/* Opponent Block */}
                      <div className="space-y-1 pl-2">
                        <span className="text-[8px] font-mono text-zinc-500 block tracking-widest uppercase">MATCHUP</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-400">VS</span>
                          <span className="text-sm font-black tracking-wide text-white group-hover:text-red-400 transition-colors">
                            {fight.opponent}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 block">{fight.event}</span>
                      </div>

                      {/* Method Block */}
                      <div className="space-y-1 md:text-center">
                        <span className="text-[8px] font-mono text-zinc-500 block tracking-widest uppercase">METHOD</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isWin 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {fight.method}
                        </span>
                      </div>

                      {/* Stats & Time Block */}
                      <div className="space-y-1 md:text-right shrink-0">
                        <span className="text-[8px] font-mono text-zinc-500 block tracking-widest uppercase">ROUND / TIME</span>
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
