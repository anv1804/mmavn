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
      
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,30,39,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Giant watermark background text */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ══════════════════════════════════════
              CỘT TRÁI: ẢNH VÕ SĨ & MẠNG XÃ HỘI (4/12)
              ══════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Thẻ Ảnh Võ Sĩ */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col items-center">
              
              {/* Vòng hào quang đỏ sau ảnh */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12)_0%,transparent_75%)] pointer-events-none" />
              
              {/* Bát giác trang trí */}
              <div className="absolute w-[200px] h-[200px] border border-red-500/[0.03] rounded-[45px] rotate-12 pointer-events-none" />

              {/* Khung ảnh */}
              <div className="relative z-10 w-full min-h-[300px] flex items-center justify-center">
                {fighter.photo ? (
                  <img
                    src={fighter.photo}
                    alt={fighter.name}
                    className="w-full max-w-[260px] object-contain drop-shadow-[0_20px_40px_rgba(239,68,68,0.2)] transition-transform duration-500 hover:scale-[1.03]"
                    style={{ maxHeight: "380px" }}
                  />
                ) : (
                  <div className="h-64 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-700 text-6xl">
                    👤
                  </div>
                )}
              </div>

              {/* Thông tin Câu Lạc Bộ dưới ảnh */}
              <div className="relative z-10 w-full mt-6 pt-5 border-t border-zinc-900/60 text-center space-y-1">
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase block">CÂU LẠC BỘ</span>
                <h4 className="text-sm font-extrabold text-white">{fighter.club}</h4>
                {fighter.coach && (
                  <p className="text-[11px] text-zinc-400 font-mono">HLV: {fighter.coach}</p>
                )}
              </div>

              {/* Icon mạng xã hội được nâng cấp (Gọn gàng, thẩm mỹ) */}
              {fighter.socialMedia && (
                <div className="flex items-center justify-center gap-3.5 mt-5 pt-4 border-t border-zinc-900/60 w-full relative z-10">
                  {fighter.socialMedia.facebook && (
                    <a href={fighter.socialMedia.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.instagram && (
                    <a href={fighter.socialMedia.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-500/30 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.tiktok && (
                    <a href={fighter.socialMedia.tiktok} target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.9-.97-1.24-1.55v7.71c.08 2.15-.69 4.35-2.24 5.86-1.71 1.73-4.32 2.45-6.66 1.83-2.45-.62-4.52-2.58-5.18-5.01-.84-2.92.38-6.27 2.94-7.66 1.34-.76 2.92-.98 4.43-.65v4.11c-.9-.31-1.92-.18-2.7.39-.77.53-1.21 1.45-1.18 2.39.01 1.12.78 2.13 1.86 2.41 1.09.31 2.33-.12 2.87-1.13.23-.42.33-.92.32-1.4V.02z"/>
                      </svg>
                    </a>
                  )}
                  {fighter.socialMedia.youtube && (
                    <a href={fighter.socialMedia.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-500/30 transition-all cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163c-.272-1.022-1.074-1.825-2.097-2.097C19.56 3.54 12 3.54 12 3.54s-7.56 0-9.401.526c-1.023.272-1.825 1.075-2.097 2.097C0 8.002 0 12 0 12s0 3.998.502 5.837c.272 1.022 1.074 1.825 2.097 2.097C4.44 20.46 12 20.46 12 20.46s7.56 0 9.401-.526c1.023-.272 1.825-1.075 2.097-2.097C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* ── KHUNG THÀNH TÍCH NỔI BẬT (NEW) ── */}
            {fighter.achievements && fighter.achievements.length > 0 && (
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <span className="text-base">🏅</span>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">THÀNH TÍCH NỔI BẬT</h3>
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

          {/* ══════════════════════════════════════
              CỘT PHẢI: TYPOGRAPHY, STATS & CHRONICLE (8/12)
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

            {/* Chỉ số nhanh (Wins - Losses - Draws - Winrate) */}
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

            {/* Chi tiết thể chất nâng cấp: Thêm năm sinh, quê quán */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Physical stats */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-4">
                <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-2">
                  CHI TIẾT VÕ SĨ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "NĂM SINH", val: fighter.birthYear ? `${fighter.birthYear}` : "—" },
                    { label: "CHIỀU CAO", val: fighter.height || "—" },
                    { label: "SẢI TAY", val: fighter.reach || "—" },
                    { label: "ĐỘ TUỔI", val: fighter.age ? `${fighter.age} tuổi` : "—" },
                    { label: "NƠI SINH / QUÊ QUÁN", val: fighter.hometown || "—" },
                    { label: "QUỐC TỊCH", val: `${fighter.flag ?? ""} ${fighter.nationality}` },
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
                  PHƯƠNG THỨC CHIẾN THẮNG
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

            {/* Bảng đấu */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">LỊCH SỬ THI ĐẤU (BATTLE CHRONICLE)</span>
                <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md">
                  {fighter.fights?.length ?? 0} TRẬN ĐẤU
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
                      <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${isWin ? 'bg-emerald-500' : isLoss ? 'bg-red-500' : 'bg-zinc-700'}`} />

                      <div className="space-y-0.5 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-500">VS</span>
                          <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                            {fight.opponent}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 block">{fight.event}</span>
                      </div>

                      <div className="space-y-0.5 md:text-center">
                        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded border uppercase ${
                          isWin 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {fight.method}
                        </span>
                      </div>

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
