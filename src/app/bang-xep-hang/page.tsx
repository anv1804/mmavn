import { Metadata } from 'next';
import { getDivisionsWithRankings, getRankingsWithDetails } from '@/lib/services/ranking-service';
import { RankingsClient } from './RankingsClient';

export const metadata: Metadata = {
  title: 'Bảng xếp hạng | MMAVN Hub',
  description: 'Bảng xếp hạng các võ sĩ MMA Việt Nam',
};

export default function RankingsPage() {
  const divisions = getDivisionsWithRankings();
  const rankingsByDivision: Record<string, any[]> = {};

  divisions.forEach((div) => {
    const rankings = getRankingsWithDetails(div.id);
    rankingsByDivision[div.id] = rankings.map((r: any) => ({
      position: r.position,
      fighter: {
        id: r.fighter.id,
        name: r.fighter.name,
        nickname: r.fighter.nickname,
        record: r.fighter.record,
        isChampion: r.position === 0 || r.fighter.isChampion,
        eloRating: r.points || r.fighter.eloRating || 0,
        gymName: r.fighter.gym?.name || r.fighter.gymName,
      },
      movement: r.movement || 'same',
      movementAmount: r.movementAmount || 0,
    }));
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Bảng Xếp Hạng</h1>
      <RankingsClient divisions={divisions} rankingsByDivision={rankingsByDivision} />
    </div>
  );
}
