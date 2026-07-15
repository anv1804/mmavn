import type { Champion } from "../../interfaces/ranking";

interface Props {
  champ: Champion & { division: string };
}

export default function ChampionCard({ champ }: Props) {
  const parts = champ.record.split("-").map(Number);
  const [wins, losses, draws] = parts;
  const total = wins + losses + (draws || 0);
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl cursor-pointer" style={{ aspectRatio: "3/4" }}>

      {/* Octagon grid texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(239,68,68,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(239,68,68,1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }} />

      {/* Fighter photo — full bleed */}
      {champ.photo ? (
        <img
          src={champ.photo}
          alt={champ.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
          <span className="text-5xl text-zinc-700">👤</span>
        </div>
      )}

      {/* Atmospheric red glow */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 90%, rgba(239,68,68,0.22) 0%, transparent 70%)" }} />

      {/* Deep gradient overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.75) 35%, rgba(9,9,11,0.1) 65%, transparent 100%)" }} />

      {/* Hover inset glow */}
      <div className="absolute inset-0 z-30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(239,68,68,0.3), inset 0 0 60px rgba(239,68,68,0.08)" }} />

      {/* TOP badges */}
      <div className="absolute top-3 left-3 right-3 z-40 flex items-start justify-between">
        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full px-2.5 py-1 shadow-lg shadow-amber-500/40">
          <span className="text-[8px]">🏆</span>
          <span className="text-[8px] font-black text-zinc-950 uppercase tracking-widest">Champion</span>
        </div>
        <div className="bg-zinc-950/70 backdrop-blur-sm border border-white/10 rounded-xl px-2 py-1.5 text-right">
          <div className="text-sm font-black text-white leading-none">{winRate}<span className="text-[8px] text-zinc-400 ml-0.5">%</span></div>
          <div className="text-[7px] font-mono text-zinc-500 uppercase tracking-wider">Win</div>
        </div>
      </div>

      {/* BOTTOM info overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-4 pb-4 space-y-3">
        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em]">{champ.division}</span>

        <div className="space-y-0.5">
          <h3 className="font-black text-lg text-white leading-tight tracking-tight group-hover:text-red-400 transition-colors duration-200">
            {champ.name}
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono">{champ.club}</p>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* W / D / L */}
        <div className="flex items-center gap-0">
          <div className="flex-1 text-center">
            <div className="text-lg font-black text-emerald-400 leading-none">{wins}</div>
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">W</div>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div className="flex-1 text-center">
            <div className="text-lg font-black text-zinc-500 leading-none">{draws ?? 0}</div>
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">D</div>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div className="flex-1 text-center">
            <div className="text-lg font-black text-red-400 leading-none">{losses}</div>
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">L</div>
          </div>
        </div>
      </div>
    </div>
  );
}
