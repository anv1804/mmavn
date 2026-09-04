'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { RankingRow } from '@/components/ranking/RankingRow';

interface FighterData {
  id: string;
  name: string;
  nickname?: string;
  avatar?: string;
  styles?: string[];
  record: { wins: number; losses: number; draws: number };
  isChampion: boolean;
  eloRating: number;
  gymName?: string;
}

interface RankingData {
  position: number;
  fighter: FighterData;
  movement: 'up' | 'down' | 'same' | 'new';
  movementAmount: number;
}

interface RankingsPageData {
  divisions: Array<{ id: string; name: string; nameVi: string; weightLimit: number; gender: string }>;
  rankingsByDivision: Record<string, RankingData[]>;
}

export function RankingsClient({ divisions, rankingsByDivision }: RankingsPageData) {
  const [activeTab, setActiveTab] = useState(divisions[0]?.id || '');

  if (!divisions.length) {
    return <EmptyState title="Chưa có dữ liệu bảng xếp hạng" />;
  }

  const tabs = divisions.map((div) => ({
    id: div.id,
    label: `${div.nameVi} ${div.weightLimit}kg`,
  }));

  const activeRankings = rankingsByDivision[activeTab] || [];
  const champion = activeRankings.find((r) => r.position === 0);
  const contenders = activeRankings.filter((r) => r.position !== 0);

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeRankings.length === 0 ? (
        <EmptyState title="Chưa có bảng xếp hạng cho hạng cân này" />
      ) : (
        <div className="flex flex-col gap-2">
          {champion ? (
            <div className="mb-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <span>👑</span>
                <span>Đương Kim Vô Địch (Champion)</span>
              </div>
              <RankingRow
                position={champion.position}
                fighter={champion.fighter}
                movement={champion.movement}
                movementAmount={champion.movementAmount}
              />
            </div>
          ) : (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <span className="text-base">👑</span>
                <span>Đai vô địch đang bỏ trống (Vacant Belt) — Các ứng viên hàng đầu đang tranh suất</span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 shrink-0">
                Tranh đai mùa giải 2026
              </span>
            </div>
          )}

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 px-1 pt-1">
            <span>⚔️</span>
            <span>Bảng Xếp Hạng Ứng Viên Thách Đấu (Top Contenders)</span>
          </div>

          {contenders.map((ranking) => (
            <RankingRow
              key={ranking.fighter.id}
              position={ranking.position}
              fighter={ranking.fighter}
              movement={ranking.movement}
              movementAmount={ranking.movementAmount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
