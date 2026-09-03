import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface FightMatchupProps {
  fighter1: { id: string; name: string; nickname?: string; record: { wins: number; losses: number; draws: number } };
  fighter2: { id: string; name: string; nickname?: string; record: { wins: number; losses: number; draws: number } };
  division?: { name: string; nameVi: string; weightLimit: number };
  isTitleFight: boolean;
  numberOfRounds: number;
  result?: { winnerId: string; method: string; round: number; time: string };
  isMainEvent?: boolean;
  compact?: boolean;
}

export function FightMatchup({ fighter1, fighter2, division, isTitleFight, numberOfRounds, result, isMainEvent, compact = false }: FightMatchupProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  
  const f1Won = result?.winnerId === fighter1.id;
  const f2Won = result?.winnerId === fighter2.id;
  const isFinished = !!result;

  return (
    <Card 
      className={cn(
        "flex flex-col relative overflow-hidden",
        isTitleFight && "border-accent/50 shadow-[0_0_15px_rgba(214,158,46,0.1)]",
        compact ? "p-3" : "p-6"
      )}
    >
      {(isTitleFight || division || isMainEvent) && (
        <div className="text-center mb-4 flex flex-col items-center gap-1">
          {isTitleFight && <Badge variant="accent">🏆 Tranh đai vô địch</Badge>}
          {division && <span className="text-xs text-muted font-medium uppercase tracking-wider">{division.nameVi} - {numberOfRounds} Hiệp</span>}
          {isMainEvent && <span className="text-sm font-bold text-primary">MAIN EVENT</span>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Fighter 1 */}
        <div className={cn("flex flex-col items-center w-full sm:w-2/5", isFinished && !f1Won && "opacity-60")}>
          <div className={cn("rounded-full bg-gradient-to-br from-card to-card-hover border-2 flex items-center justify-center text-foreground font-bold", compact ? "w-12 h-12 text-lg" : "w-20 h-20 text-2xl", f1Won ? "border-green-500" : "border-border", isFinished && f1Won && "shadow-[0_0_15px_rgba(34,197,94,0.3)]")}>
            {getInitials(fighter1.name)}
          </div>
          <h3 className={cn("font-bold text-center mt-2", compact ? "text-sm" : "text-lg")}>{fighter1.name}</h3>
          {fighter1.nickname && <span className="text-xs text-muted italic">"{fighter1.nickname}"</span>}
          <span className="text-xs text-muted mt-1">{fighter1.record.wins}W - {fighter1.record.losses}L - {fighter1.record.draws}D</span>
        </div>

        {/* Center / VS */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/5 my-2 sm:my-0">
          {result ? (
            <div className="flex flex-col items-center text-center bg-card-hover rounded-lg p-2 border border-border w-full">
              <span className="text-xs text-muted">Kết quả</span>
              <span className="font-bold text-sm text-foreground">{result.method}</span>
              <span className="text-xs text-muted mt-1">Hiệp {result.round} • {result.time}</span>
            </div>
          ) : (
            <span className="text-2xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent italic">VS</span>
          )}
        </div>

        {/* Fighter 2 */}
        <div className={cn("flex flex-col items-center w-full sm:w-2/5", isFinished && !f2Won && "opacity-60")}>
          <div className={cn("rounded-full bg-gradient-to-bl from-card to-card-hover border-2 flex items-center justify-center text-foreground font-bold", compact ? "w-12 h-12 text-lg" : "w-20 h-20 text-2xl", f2Won ? "border-green-500" : "border-border", isFinished && f2Won && "shadow-[0_0_15px_rgba(34,197,94,0.3)]")}>
            {getInitials(fighter2.name)}
          </div>
          <h3 className={cn("font-bold text-center mt-2", compact ? "text-sm" : "text-lg")}>{fighter2.name}</h3>
          {fighter2.nickname && <span className="text-xs text-muted italic">"{fighter2.nickname}"</span>}
          <span className="text-xs text-muted mt-1">{fighter2.record.wins}W - {fighter2.record.losses}L - {fighter2.record.draws}D</span>
        </div>
      </div>
    </Card>
  );
}
