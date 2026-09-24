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
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 shadow-xs shrink-0 text-amber-600">
          <Crown className="w-4 h-4 text-amber-500 fill-amber-400/40" />
          <span className="text-[10px] font-black tracking-tight uppercase">CHAMP</span>
        </div>
      );
    }
    if (position === 1) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-amber-50/80 border border-amber-200 shrink-0 text-amber-600 shadow-xs">
          <Medal className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-black leading-none mt-0.5">#1</span>
        </div>
      );
    }
    if (position === 2) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 shrink-0 text-slate-700 shadow-xs">
          <Medal className="w-4 h-4 text-slate-500" />
          <span className="text-[11px] font-black leading-none mt-0.5">#2</span>
        </div>
      );
    }
    if (position === 3) {
      return (
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-amber-100/50 border border-amber-200/80 shrink-0 text-amber-800 shadow-xs">
          <Medal className="w-4 h-4 text-amber-700" />
          <span className="text-[11px] font-black leading-none mt-0.5">#3</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 font-mono font-bold text-sm text-slate-500">
        #{position}
      </div>
    );
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <Link href={`/vo-si/${fighter.id}`} className="block group">
      <div className={cn(
        "flex items-center gap-3.5 p-3.5 sm:p-4 border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-md hover:shadow-sky-100/50 transition-all duration-200 rounded-2xl",
        (fighter.isChampion || position === 0) && "border-amber-300 bg-amber-50/20 hover:border-amber-400"
      )}>
        {/* Rank Badge */}
        {renderRankBadge()}
        
        {/* Real Avatar with Fallback */}
        <div className={cn(
          "w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 shrink-0 overflow-hidden shadow-xs",
          (fighter.isChampion || position === 0)
            ? "bg-amber-400"
            : "bg-slate-200 group-hover:bg-primary/50 transition-colors"
        )}>
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
            {fighter.avatar ? (
              <img
                src={fighter.avatar}
                alt={fighter.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold text-slate-600">
                {getInitials(fighter.name)}
              </span>
            )}
          </div>
        </div>

        {/* Fighter Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors truncate">
              {fighter.name}
            </span>
            {(fighter.isChampion || position === 0) && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 shadow-xs">
                👑 Vô địch
              </span>
            )}
            {fighter.nickname && (
              <span className="text-xs text-slate-500 italic hidden sm:inline-block truncate">
                "{fighter.nickname}"
              </span>
            )}
          </div>

          <div className="text-xs flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="font-mono font-semibold">
              <span className="text-emerald-600">{fighter.record.wins}W</span>
              <span className="text-slate-400"> - </span>
              <span className="text-rose-600">{fighter.record.losses}L</span>
              {fighter.record.draws > 0 && (
                <>
                  <span className="text-slate-400"> - </span>
                  <span className="text-slate-500">{fighter.record.draws}D</span>
                </>
              )}
            </span>
            {fighter.gymName && (
              <span className="text-slate-500 truncate hidden md:inline-block">
                • {fighter.gymName}
              </span>
            )}
            {fighter.styles && fighter.styles.length > 0 && (
              <span className="hidden lg:inline-flex text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {fighter.styles[0]}
              </span>
            )}
          </div>
        </div>

        {/* Elo & Movement */}
        <div className="text-right flex flex-col items-end gap-1 shrink-0 pl-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-black font-mono text-slate-900">
              {Math.round(fighter.eloRating)}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
              ELO
            </span>
          </div>
          <div className="text-xs">
            {movement === 'up' && <span className="text-emerald-600 font-semibold flex items-center gap-0.5">▲ {movementAmount}</span>}
            {movement === 'down' && <span className="text-rose-600 font-semibold flex items-center gap-0.5">▼ {movementAmount}</span>}
            {movement === 'same' && <span className="text-slate-400 font-mono">—</span>}
            {movement === 'new' && <Badge variant="primary" size="sm" className="px-1.5 py-0 text-[10px]">NEW</Badge>}
          </div>
        </div>
      </div>
    </Link>
  );
}
