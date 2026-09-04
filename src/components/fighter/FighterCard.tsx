'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Trophy, Shield, Dumbbell } from 'lucide-react';

export interface FighterCardProps {
  fighter: {
    id: string;
    name: string;
    nickname?: string;
    avatar?: string;
    record: {
      wins: number;
      losses: number;
      draws: number;
      winsByKo?: number;
      winsBySub?: number;
      winsByDec?: number;
      noContests?: number;
    };
    eloRating: number;
    isChampion: boolean;
    styles: string[];
    height?: number;
    reach?: number;
    divisionName?: string;
    gymName?: string;
  };
  compact?: boolean;
}

export function FighterCard({ fighter, compact = false }: FighterCardProps) {
  const { name, nickname, avatar, record, isChampion, styles, eloRating, divisionName, gymName, id } = fighter;
  
  // Format initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const eloColor =
    eloRating >= 1500
      ? 'bg-emerald-500 shadow-emerald-500/50'
      : eloRating >= 1300
      ? 'bg-amber-500 shadow-amber-500/50'
      : 'bg-rose-500 shadow-rose-500/50';

  if (compact) {
    return (
      <Link href={`/vo-si/${id}`} className="block group">
        <div
          className={cn(
            "relative rounded-xl border transition-all duration-200 p-3 bg-card/90 hover:bg-card hover:-translate-y-0.5",
            isChampion
              ? "border-amber-500/40 shadow-sm shadow-amber-500/10"
              : "border-border/80 hover:border-primary/50"
          )}
        >
          {/* Top meta: Champion & Elo */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {isChampion ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  Vô địch
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-400 truncate">
                  {divisionName || 'MMA Fighter'}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 shrink-0">
              <span className={cn("w-2 h-2 rounded-full", eloColor)} />
              <span className="text-[11px] font-mono font-bold text-slate-200">
                {Math.round(eloRating)}
              </span>
            </div>
          </div>

          {/* Fighter Info */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "rounded-full p-0.5 shrink-0 overflow-hidden",
              isChampion
                ? "bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600"
                : "bg-gradient-to-tr from-primary via-red-500 to-amber-500/70"
            )}>
              <div className="w-11 h-11 rounded-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-black text-sm text-slate-100 group-hover:text-primary transition-colors">
                    {initials}
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight break-words">
                {name}
              </h4>
              {nickname && (
                <p className="text-[11px] font-medium text-amber-400/90 italic truncate">
                  "{nickname}"
                </p>
              )}
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                <span className="text-emerald-400">{record.wins}W</span>
                <span className="text-slate-500 mx-1">-</span>
                <span className="text-rose-400">{record.losses}L</span>
                {record.draws > 0 && (
                  <>
                    <span className="text-slate-500 mx-1">-</span>
                    <span className="text-slate-400">{record.draws}D</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/vo-si/${id}`} className="block group h-full">
      <Card
        hover
        className={cn(
          "h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 p-5",
          isChampion && "border-amber-500/40 bg-gradient-to-b from-amber-950/15 via-card to-card shadow-lg shadow-amber-500/5 hover:border-amber-400/70"
        )}
      >
        {/* Subtle decorative glow for champion */}
        {isChampion && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none -z-0" />
        )}

        <div>
          {/* Top Bar: Champion Badge & Elo Badge neatly aligned */}
          <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
            <div>
              {isChampion ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 border border-amber-500/40 shadow-sm">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  ĐƯƠNG KIM VÔ ĐỊCH
                </span>
              ) : (
                divisionName && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                    <Shield className="w-3 h-3 text-primary" />
                    {divisionName}
                  </span>
                )
              )}
            </div>

            {/* Elo Rating Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <span className={cn("w-2 h-2 rounded-full", eloColor)} />
              <span className="text-xs font-mono font-bold text-slate-200">
                {Math.round(eloRating)} <span className="text-[10px] text-slate-400 font-normal">ELO</span>
              </span>
            </div>
          </div>

          {/* Fighter Identity Row */}
          <div className="flex items-start gap-4 mb-3 relative z-10">
            {/* Martial Arts Avatar with stylish gradient ring */}
            <div className={cn(
              "rounded-full p-1 shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden",
              isChampion
                ? "bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 shadow-md shadow-amber-500/20"
                : "bg-gradient-to-tr from-primary via-red-500 to-amber-500/80 shadow-md shadow-primary/20"
            )}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-950 overflow-hidden flex items-center justify-center font-black text-xl text-white group-hover:text-primary transition-colors border border-white/10">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  initials
                )}
              </div>
            </div>

            {/* Full Name & Nickname */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="font-black text-lg sm:text-xl text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                {name}
              </h3>
              {nickname && (
                <div className="text-xs sm:text-sm font-semibold text-amber-400/95 italic mt-0.5">
                  "{nickname}"
                </div>
              )}
              {gymName && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 truncate">
                  <Dumbbell className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{gymName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pro Fight Record */}
          <div className="bg-background/60 rounded-xl p-2.5 border border-border/60 flex items-center justify-between text-xs mt-3 relative z-10">
            <span className="text-slate-400 font-medium">Thành tích Pro:</span>
            <div className="font-bold font-mono text-sm">
              <span className="text-emerald-400">{record.wins}W</span>
              <span className="text-slate-500 mx-1.5">-</span>
              <span className="text-rose-400">{record.losses}L</span>
              {record.draws > 0 && (
                <>
                  <span className="text-slate-500 mx-1.5">-</span>
                  <span className="text-slate-400">{record.draws}D</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Styles Badges (Clean Wrap) */}
        {styles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-border/60 relative z-10">
            {styles.map((style) => (
              <span
                key={style}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/70 text-slate-300"
              >
                {style}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
