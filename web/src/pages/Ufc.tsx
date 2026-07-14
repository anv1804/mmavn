import { theme } from "../config/theme";
import GlassCard from "../components/UI/GlassCard";
import { ufcEvents } from "../data/ufcEvents";

export default function Ufc() {
  return (
    <div className={theme.container}>
      <div className="space-y-12">
        <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white">
            Ultimate Fighting Championship
          </h1>
          <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
            Đấu trường MMA số 1 thế giới
          </p>
        </div>

        {/* Recent Event */}
        <GlassCard className="p-6 border border-zinc-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                SỰ KIỆN VỪA DIỄN RA
              </span>
              <span className="text-xs text-zinc-500 font-mono">{ufcEvents.recent.date}</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase">{ufcEvents.recent.eventName}</h2>
              <p className="text-xs text-zinc-400 mt-1">{ufcEvents.recent.location}</p>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-zinc-900/60">
              {ufcEvents.recent.results.map((res, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-zinc-950/50 rounded-xl border border-zinc-900">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{res.bout}</span>
                    <p className="font-extrabold text-white text-sm">{res.fighters}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-500">{res.result}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Upcoming Events */}
        <section className="space-y-6">
          <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
            📅 Sự Kiện Sắp Diễn Ra (Upcoming)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ufcEvents.upcoming.map((evt, i) => (
              <GlassCard key={i} className="border border-zinc-900">
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-zinc-500">{evt.date} • {evt.time}</span>
                  <h3 className="font-black text-white text-base uppercase leading-tight">{evt.eventName}</h3>
                  <p className="text-xs text-zinc-400">{evt.location}</p>
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-900/80 mt-4">
                    <span className="text-[8px] font-mono text-zinc-600 block uppercase">Trận đấu chính</span>
                    <span className="font-extrabold text-sm text-red-500/90">{evt.mainEvent}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
