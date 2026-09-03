'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { RankingRow } from '@/components/ranking/RankingRow';

interface FighterData {
  id: string;
  name: string;
  nickname?: string;
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
  const champion = activeRankings.find((r) => r.position === 0 || r.fighter.isChampion);
  const contenders = activeRankings.filter((r) => r.position !== 0 && !r.fighter.isChampion);

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeRankings.length === 0 ? (
        <EmptyState title="Chưa có bảng xếp hạng cho hạng cân này" />
      ) : (
        <div className="flex flex-col gap-2">
          {champion && (
            <div className="mb-4">
              <RankingRow
                position={champion.position}
                fighter={champion.fighter}
                movement={champion.movement}
                movementAmount={champion.movementAmount}
              />
            </div>
          )}
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
