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
        avatar: r.fighter.avatar,
        styles: r.fighter.styles,
        record: r.fighter.record,
        isChampion: r.position === 0,
        eloRating: r.points || r.fighter.eloRating || 0,
        gymName: r.fighter.gym?.name || r.fighter.gymName,
      },
      movement: r.movement || 'same',
      movementAmount: r.movementAmount || 0,
    }));
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Bảng Xếp Hạng</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Thứ hạng chính thức các võ sĩ MMA Việt Nam theo từng hạng cân và bảng P4P toàn năng</p>
      </div>
      <RankingsClient divisions={divisions} rankingsByDivision={rankingsByDivision} />
    </div>
  );
}
