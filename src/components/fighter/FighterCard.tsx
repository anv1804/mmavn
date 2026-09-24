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
      ? 'bg-emerald-500'
      : eloRating >= 1300
      ? 'bg-sky-500'
      : 'bg-slate-400';

  if (compact) {
    return (
      <Link href={`/vo-si/${id}`} className="block group">
        <div
          className={cn(
            "relative rounded-xl border transition-all duration-200 p-3 bg-white hover:bg-slate-50 shadow-xs hover:shadow-sm hover:-translate-y-0.5",
            isChampion
              ? "border-sky-300 bg-sky-50/30"
              : "border-slate-200 hover:border-sky-300"
          )}
        >
          {/* Top meta: Champion & Elo */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {isChampion ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
                  <Trophy className="w-3 h-3 text-sky-600" />
                  Vô địch
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-500 truncate">
                  {divisionName || 'MMA Fighter'}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 shrink-0">
              <span className={cn("w-2 h-2 rounded-full", eloColor)} />
              <span className="text-[11px] font-mono font-bold text-slate-700">
                {Math.round(eloRating)}
              </span>
            </div>
          </div>

          {/* Fighter Info */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "rounded-full p-0.5 shrink-0 overflow-hidden",
              isChampion
                ? "bg-gradient-to-tr from-sky-400 to-blue-600"
                : "bg-slate-200"
            )}>
              <div className="w-11 h-11 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-bold text-sm text-slate-600 group-hover:text-primary transition-colors">
                    {initials}
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors leading-tight break-words">
                {name}
              </h4>
              {nickname && (
                <p className="text-[11px] font-medium text-sky-700 italic truncate">
                  "{nickname}"
                </p>
              )}
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                <span className="text-emerald-600">{record.wins}W</span>
                <span className="text-slate-400 mx-1">-</span>
                <span className="text-rose-600">{record.losses}L</span>
                {record.draws > 0 && (
                  <>
                    <span className="text-slate-400 mx-1">-</span>
                    <span className="text-slate-500">{record.draws}D</span>
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
          "h-full flex flex-col justify-between relative overflow-hidden transition-all duration-200 p-5 bg-white border-slate-200",
          isChampion && "border-sky-300 bg-gradient-to-b from-sky-50/40 via-white to-white"
        )}
      >
        <div>
          {/* Top Bar: Champion Badge & Elo Badge neatly aligned */}
          <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
            <div>
              {isChampion ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide bg-sky-100 text-sky-800 border border-sky-200 shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-sky-600" />
                  ĐƯƠNG KIM VÔ ĐỊCH
                </span>
              ) : (
                divisionName && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    <Shield className="w-3 h-3 text-primary" />
                    {divisionName}
                  </span>
                )
              )}
            </div>

            {/* Elo Rating Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
              <span className={cn("w-2 h-2 rounded-full", eloColor)} />
              <span className="text-xs font-mono font-bold text-slate-700">
                {Math.round(eloRating)} <span className="text-[10px] text-slate-400 font-normal">ELO</span>
              </span>
            </div>
          </div>

          {/* Fighter Identity Row */}
          <div className="flex items-start gap-4 mb-3 relative z-10">
            {/* Martial Arts Avatar with stylish ring */}
            <div className={cn(
              "rounded-full p-0.5 shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden",
              isChampion
                ? "bg-gradient-to-tr from-sky-400 to-blue-600 shadow-sm shadow-sky-200"
                : "bg-slate-200"
            )}>
              <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center font-bold text-xl text-slate-700 group-hover:text-primary transition-colors border border-white">
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
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors">
                {name}
              </h3>
              {nickname && (
                <div className="text-xs sm:text-sm font-semibold text-sky-700 italic mt-0.5">
                  "{nickname}"
                </div>
              )}
              {gymName && (
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 truncate">
                  <Dumbbell className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{gymName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pro Fight Record */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 flex items-center justify-between text-xs mt-3 relative z-10">
            <span className="text-slate-500 font-medium">Thành tích Pro:</span>
            <div className="font-bold font-mono text-sm">
              <span className="text-emerald-600">{record.wins}W</span>
              <span className="text-slate-300 mx-1.5">-</span>
              <span className="text-rose-600">{record.losses}L</span>
              {record.draws > 0 && (
                <>
                  <span className="text-slate-300 mx-1.5">-</span>
                  <span className="text-slate-500">{record.draws}D</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Styles Badges */}
        {styles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-100 relative z-10">
            {styles.map((style) => (
              <span
                key={style}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-sky-50/70 border border-sky-100 text-sky-800"
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
