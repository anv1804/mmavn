import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Crown, Medal, Trophy, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RankingRowProps {
  position: number;
  fighter: { 
    id: string; 
    name: string; 
    nickname?: string; 
    avatar?: string;
    record: { wins: number; losses: number; draws: number }; 
    isChampion: boolean; 
    eloRating: number; 
    gymName?: string;
    styles?: string[];
  };
  movement: 'up' | 'down' | 'same' | 'new';
  movementAmount: number;
}

export function RankingRow({ position, fighter, movement, movementAmount }: RankingRowProps) {
  const renderRankBadge = () => {
    if (fighter.isChampion || position === 0) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-amber-500/25 to-yellow-600/10 border border-amber-500/50 shadow-md shadow-amber-500/10 shrink-0 text-amber-300">
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400/30" />
          <span className="text-[10px] font-black tracking-tight uppercase">CHAMP</span>
        </div>
      );
    }
    if (position === 1) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-amber-500/20 to-amber-600/5 border border-amber-500/40 shadow-sm shrink-0 text-amber-400">
          <Medal className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-black leading-none mt-0.5">#1</span>
        </div>
      );
    }
    if (position === 2) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-slate-300/20 to-slate-400/5 border border-slate-400/40 shadow-sm shrink-0 text-slate-200">
          <Medal className="w-4 h-4 text-slate-300" />
          <span className="text-[11px] font-black leading-none mt-0.5">#2</span>
        </div>
      );
    }
    if (position === 3) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-amber-700/20 to-amber-800/5 border border-amber-700/40 shadow-sm shrink-0 text-amber-500">
          <Medal className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-black leading-none mt-0.5">#3</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-border/80 shrink-0 font-mono font-bold text-sm text-slate-400">
        #{position}
      </div>
    );
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <Link href={`/vo-si/${fighter.id}`} className="block group">
      <div className={cn(
        "flex items-center gap-3.5 p-3 sm:p-4 border border-border/70 hover:border-primary/50 bg-card/80 hover:bg-card-hover/90 transition-all duration-200 rounded-2xl shadow-sm hover:shadow-md",
        (fighter.isChampion || position === 0) && "border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-card to-card hover:border-amber-500/60"
      )}>
        {/* Rank Badge */}
        {renderRankBadge()}
        
        {/* Real Avatar with Fallback */}
        <div className={cn(
          "w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 shrink-0 overflow-hidden shadow-md",
          (fighter.isChampion || position === 0)
            ? "bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600"
            : "bg-gradient-to-tr from-primary/80 via-red-500/60 to-slate-700"
        )}>
          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 flex items-center justify-center">
            {fighter.avatar ? (
              <img
                src={fighter.avatar}
                alt={fighter.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-black text-slate-200">
                {getInitials(fighter.name)}
              </span>
            )}
          </div>
        </div>

        {/* Fighter Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
              {fighter.name}
            </span>
            {(fighter.isChampion || position === 0) && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                👑 Vô địch
              </span>
            )}
            {fighter.nickname && (
              <span className="text-xs text-amber-400/90 italic hidden sm:inline-block truncate">
                "{fighter.nickname}"
              </span>
            )}
          </div>

          <div className="text-xs text-muted flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="font-mono font-semibold">
              <span className="text-emerald-400">{fighter.record.wins}W</span>
              <span className="text-slate-500"> - </span>
              <span className="text-rose-400">{fighter.record.losses}L</span>
              {fighter.record.draws > 0 && (
                <>
                  <span className="text-slate-500"> - </span>
                  <span className="text-slate-400">{fighter.record.draws}D</span>
                </>
              )}
            </span>
            {fighter.gymName && (
              <span className="text-slate-400 truncate hidden md:inline-block">
                • {fighter.gymName}
              </span>
            )}
            {fighter.styles && fighter.styles.length > 0 && (
              <span className="hidden lg:inline-flex text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                {fighter.styles[0]}
              </span>
            )}
          </div>
        </div>

        {/* Elo & Movement */}
        <div className="text-right flex flex-col items-end gap-1 shrink-0 pl-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-black font-mono text-white">
              {Math.round(fighter.eloRating)}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary uppercase">
              ELO
            </span>
          </div>
          <div className="text-xs">
            {movement === 'up' && <span className="text-emerald-400 font-semibold flex items-center gap-0.5">▲ {movementAmount}</span>}
            {movement === 'down' && <span className="text-rose-400 font-semibold flex items-center gap-0.5">▼ {movementAmount}</span>}
            {movement === 'same' && <span className="text-slate-500 font-mono">—</span>}
            {movement === 'new' && <Badge variant="primary" size="sm" className="px-1.5 py-0 text-[10px]">NEW</Badge>}
          </div>
        </div>
      </div>
    </Link>
  );
}
