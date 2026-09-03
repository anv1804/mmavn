'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatBar } from '@/components/ui/StatBar';
import { RadarChart } from '@/components/charts/RadarChart';

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  record: { wins: number; losses: number; draws: number; winsByKo: number; winsBySub: number; winsByDec: number };
  eloRating: number;
  isChampion: boolean;
  styles: string[];
  height: number;
  reach: number;
  divisionName?: string;
  gymName?: string;
  stats: {
    strikingAccuracy: number;
    strikingDefense: number;
    takedownAccuracy: number;
    takedownDefense: number;
    finishRate: number;
    striking: number;
    wrestling: number;
    clinch: number;
    groundGame: number;
    defense: number;
    cardio: number;
  };
}

interface CompareClientProps {
  allFighters: Fighter[];
}

export function CompareClient({ allFighters }: CompareClientProps) {
  const [fighter1Id, setFighter1Id] = useState<string | null>(null);
  const [fighter2Id, setFighter2Id] = useState<string | null>(null);

  const f1 = allFighters.find((f) => f.id === fighter1Id);
  const f2 = allFighters.find((f) => f.id === fighter2Id);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Võ sĩ 1</label>
          <select
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
            value={fighter1Id || ''}
            onChange={(e) => setFighter1Id(e.target.value || null)}
          >
            <option value="">Chọn võ sĩ...</option>
            {allFighters.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} {f.nickname ? `"${f.nickname}"` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="text-2xl font-bold text-muted-foreground text-center">VS</div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Võ sĩ 2</label>
          <select
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
            value={fighter2Id || ''}
            onChange={(e) => setFighter2Id(e.target.value || null)}
          >
            <option value="">Chọn võ sĩ...</option>
            {allFighters.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} {f.nickname ? `"${f.nickname}"` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {f1 && f2 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            {f1.name} vs {f2.name}
          </h2>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-2 w-1/3 text-primary">{f1.name}</th>
                  <th className="py-4 px-2 w-1/3 text-muted-foreground uppercase text-xs tracking-wider">Thuộc tính</th>
                  <th className="py-4 px-2 w-1/3 text-amber-500">{f2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-4">{f1.record.wins}-{f1.record.losses}-{f1.record.draws}</td>
                  <td className="py-4 text-muted-foreground text-sm">Thành tích</td>
                  <td className="py-4">{f2.record.wins}-{f2.record.losses}-{f2.record.draws}</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.height > f2.height ? 'text-green-400' : f1.height < f2.height ? 'text-muted-foreground' : ''}`}>{f1.height}cm</td>
                  <td className="py-4 text-muted-foreground text-sm">Chiều cao</td>
                  <td className={`py-4 ${f2.height > f1.height ? 'text-green-400' : f2.height < f1.height ? 'text-muted-foreground' : ''}`}>{f2.height}cm</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.reach > f2.reach ? 'text-green-400' : f1.reach < f2.reach ? 'text-muted-foreground' : ''}`}>{f1.reach}cm</td>
                  <td className="py-4 text-muted-foreground text-sm">Sải tay</td>
                  <td className={`py-4 ${f2.reach > f1.reach ? 'text-green-400' : f2.reach < f1.reach ? 'text-muted-foreground' : ''}`}>{f2.reach}cm</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.eloRating > f2.eloRating ? 'text-green-400' : f1.eloRating < f2.eloRating ? 'text-muted-foreground' : ''}`}>{f1.eloRating}</td>
                  <td className="py-4 text-muted-foreground text-sm">Elo</td>
                  <td className={`py-4 ${f2.eloRating > f1.eloRating ? 'text-green-400' : f2.eloRating < f1.eloRating ? 'text-muted-foreground' : ''}`}>{f2.eloRating}</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.stats.finishRate > f2.stats.finishRate ? 'text-green-400' : f1.stats.finishRate < f2.stats.finishRate ? 'text-muted-foreground' : ''}`}>{f1.stats.finishRate}%</td>
                  <td className="py-4 text-muted-foreground text-sm">Tỷ lệ kết thúc</td>
                  <td className={`py-4 ${f2.stats.finishRate > f1.stats.finishRate ? 'text-green-400' : f2.stats.finishRate < f1.stats.finishRate ? 'text-muted-foreground' : ''}`}>{f2.stats.finishRate}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-lg font-bold mb-6 text-center">Tổng quan kỹ năng</h3>
              <RadarChart 
                stats={{
                  striking: f1.stats.striking,
                  wrestling: f1.stats.wrestling,
                  clinch: f1.stats.clinch,
                  groundGame: f1.stats.groundGame,
                  defense: f1.stats.defense,
                  cardio: f1.stats.cardio
                }}
                label={f1.name}
                color="#e53e3e"
                secondStats={{
                  striking: f2.stats.striking,
                  wrestling: f2.stats.wrestling,
                  clinch: f2.stats.clinch,
                  groundGame: f2.stats.groundGame,
                  defense: f2.stats.defense,
                  cardio: f2.stats.cardio
                }}
                secondLabel={f2.name}
                secondColor="#d69e2e"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-bold mb-6 text-center">Chỉ số chi tiết</h3>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f1.stats.strikingAccuracy}%</span>
                  <span className="text-muted-foreground">Chính xác Striking</span>
                  <span>{f2.stats.strikingAccuracy}%</span>
                </div>
                <StatBar label="" value={f1.stats.strikingAccuracy} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.strikingAccuracy} color="bg-amber-500" showValue={false} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f1.stats.strikingDefense}%</span>
                  <span className="text-muted-foreground">Phòng thủ Striking</span>
                  <span>{f2.stats.strikingDefense}%</span>
                </div>
                <StatBar label="" value={f1.stats.strikingDefense} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.strikingDefense} color="bg-amber-500" showValue={false} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f1.stats.takedownAccuracy}%</span>
                  <span className="text-muted-foreground">Chính xác Takedown</span>
                  <span>{f2.stats.takedownAccuracy}%</span>
                </div>
                <StatBar label="" value={f1.stats.takedownAccuracy} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.takedownAccuracy} color="bg-amber-500" showValue={false} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f1.stats.takedownDefense}%</span>
                  <span className="text-muted-foreground">Phòng thủ Takedown</span>
                  <span>{f2.stats.takedownDefense}%</span>
                </div>
                <StatBar label="" value={f1.stats.takedownDefense} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.takedownDefense} color="bg-amber-500" showValue={false} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-center">Phân tích lợi thế</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {f1.reach > f2.reach && <Badge variant="outline" className="border-primary text-primary">{f1.name} có lợi thế sải tay (+{f1.reach - f2.reach}cm)</Badge>}
              {f2.reach > f1.reach && <Badge variant="outline" className="border-amber-500 text-amber-500">{f2.name} có lợi thế sải tay (+{f2.reach - f1.reach}cm)</Badge>}
              
              {f1.stats.striking > f2.stats.striking && <Badge variant="outline" className="border-primary text-primary">{f1.name} đánh đứng tốt hơn</Badge>}
              {f2.stats.striking > f1.stats.striking && <Badge variant="outline" className="border-amber-500 text-amber-500">{f2.name} đánh đứng tốt hơn</Badge>}
              
              {f1.stats.wrestling > f2.stats.wrestling && <Badge variant="outline" className="border-primary text-primary">{f1.name} vật tốt hơn</Badge>}
              {f2.stats.wrestling > f1.stats.wrestling && <Badge variant="outline" className="border-amber-500 text-amber-500">{f2.name} vật tốt hơn</Badge>}
              
              {f1.stats.groundGame > f2.stats.groundGame && <Badge variant="outline" className="border-primary text-primary">{f1.name} kỹ năng địa chiến tốt hơn</Badge>}
              {f2.stats.groundGame > f1.stats.groundGame && <Badge variant="outline" className="border-amber-500 text-amber-500">{f2.name} kỹ năng địa chiến tốt hơn</Badge>}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
