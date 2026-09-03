import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface RankingRowProps {
  position: number;
  fighter: { 
    id: string; 
    name: string; 
    nickname?: string; 
    record: { wins: number; losses: number; draws: number }; 
    isChampion: boolean; 
    eloRating: number; 
    gymName?: string 
  };
  movement: 'up' | 'down' | 'same' | 'new';
  movementAmount: number;
}

export function RankingRow({ position, fighter, movement, movementAmount }: RankingRowProps) {
  const getPositionDisplay = () => {
    if (fighter.isChampion) return '🏆';
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return position;
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <Link href={`/vo-si/${fighter.id}`} className="block">
      <div className={cn(
        "flex items-center gap-3 p-3 border-b border-border hover:bg-card-hover transition-colors rounded-lg",
        fighter.isChampion && "border-l-2 border-l-accent bg-card-hover/30"
      )}>
        <div className="w-8 text-center font-bold text-lg text-muted shrink-0">
          {getPositionDisplay()}
        </div>
        
        <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold text-muted shrink-0">
          {getInitials(fighter.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground truncate">{fighter.name}</span>
            {fighter.nickname && <span className="text-xs text-muted italic hidden sm:inline-block">"{fighter.nickname}"</span>}
          </div>
          <div className="text-xs text-muted flex gap-2">
            <span>{fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</span>
            {fighter.gymName && <span className="truncate hidden sm:inline-block">• {fighter.gymName}</span>}
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1 shrink-0">
          <div className="text-sm font-medium">{Math.round(fighter.eloRating)}</div>
          <div className="text-xs">
            {movement === 'up' && <span className="text-green-500">▲ {movementAmount}</span>}
            {movement === 'down' && <span className="text-red-500">▼ {movementAmount}</span>}
            {movement === 'same' && <span className="text-muted">—</span>}
            {movement === 'new' && <Badge variant="primary" size="sm" className="px-1 py-0 text-[10px]">NEW</Badge>}
          </div>
        </div>
      </div>
    </Link>
  );
}
