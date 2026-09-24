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
          <label className="block text-sm font-bold text-slate-700 mb-2">Võ sĩ 1</label>
          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary shadow-xs"
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

        <div className="text-2xl font-black text-slate-400 text-center">VS</div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Võ sĩ 2</label>
          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary shadow-xs"
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
        <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xs">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-8">
            <span className="text-primary">{f1.name}</span> vs <span className="text-blue-600">{f2.name}</span>
          </h2>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-2 w-1/3 text-primary font-black text-base">{f1.name}</th>
                  <th className="py-4 px-2 w-1/3 text-slate-400 uppercase text-xs tracking-wider font-bold">Thuộc tính</th>
                  <th className="py-4 px-2 w-1/3 text-blue-600 font-black text-base">{f2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                <tr>
                  <td className="py-4">{f1.record.wins}-{f1.record.losses}-{f1.record.draws}</td>
                  <td className="py-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Thành tích</td>
                  <td className="py-4">{f2.record.wins}-{f2.record.losses}-{f2.record.draws}</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.height > f2.height ? 'text-emerald-600 font-bold' : f1.height < f2.height ? 'text-slate-400' : ''}`}>{f1.height}cm</td>
                  <td className="py-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Chiều cao</td>
                  <td className={`py-4 ${f2.height > f1.height ? 'text-emerald-600 font-bold' : f2.height < f1.height ? 'text-slate-400' : ''}`}>{f2.height}cm</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.reach > f2.reach ? 'text-emerald-600 font-bold' : f1.reach < f2.reach ? 'text-slate-400' : ''}`}>{f1.reach}cm</td>
                  <td className="py-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Sải tay</td>
                  <td className={`py-4 ${f2.reach > f1.reach ? 'text-emerald-600 font-bold' : f2.reach < f1.reach ? 'text-slate-400' : ''}`}>{f2.reach}cm</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.eloRating > f2.eloRating ? 'text-emerald-600 font-bold' : f1.eloRating < f2.eloRating ? 'text-slate-400' : ''}`}>{f1.eloRating}</td>
                  <td className="py-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Elo</td>
                  <td className={`py-4 ${f2.eloRating > f1.eloRating ? 'text-emerald-600 font-bold' : f2.eloRating < f1.eloRating ? 'text-slate-400' : ''}`}>{f2.eloRating}</td>
                </tr>
                <tr>
                  <td className={`py-4 ${f1.stats.finishRate > f2.stats.finishRate ? 'text-emerald-600 font-bold' : f1.stats.finishRate < f2.stats.finishRate ? 'text-slate-400' : ''}`}>{f1.stats.finishRate}%</td>
                  <td className="py-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Tỷ lệ kết thúc</td>
                  <td className={`py-4 ${f2.stats.finishRate > f1.stats.finishRate ? 'text-emerald-600 font-bold' : f2.stats.finishRate < f1.stats.finishRate ? 'text-slate-400' : ''}`}>{f2.stats.finishRate}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-6 text-center">Tổng quan kỹ năng</h3>
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
                color="#0284c7"
                secondStats={{
                  striking: f2.stats.striking,
                  wrestling: f2.stats.wrestling,
                  clinch: f2.stats.clinch,
                  groundGame: f2.stats.groundGame,
                  defense: f2.stats.defense,
                  cardio: f2.stats.cardio
                }}
                secondLabel={f2.name}
                secondColor="#2563eb"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 mb-6 text-center">Chỉ số chi tiết</h3>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="text-primary font-mono">{f1.stats.strikingAccuracy}%</span>
                  <span className="text-slate-400 font-medium">Chính xác Striking</span>
                  <span className="text-blue-600 font-mono">{f2.stats.strikingAccuracy}%</span>
                </div>
                <StatBar label="" value={f1.stats.strikingAccuracy} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.strikingAccuracy} color="bg-blue-600" showValue={false} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="text-primary font-mono">{f1.stats.strikingDefense}%</span>
                  <span className="text-slate-400 font-medium">Phòng thủ Striking</span>
                  <span className="text-blue-600 font-mono">{f2.stats.strikingDefense}%</span>
                </div>
                <StatBar label="" value={f1.stats.strikingDefense} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.strikingDefense} color="bg-blue-600" showValue={false} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="text-primary font-mono">{f1.stats.takedownAccuracy}%</span>
                  <span className="text-slate-400 font-medium">Chính xác Takedown</span>
                  <span className="text-blue-600 font-mono">{f2.stats.takedownAccuracy}%</span>
                </div>
                <StatBar label="" value={f1.stats.takedownAccuracy} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.takedownAccuracy} color="bg-blue-600" showValue={false} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="text-primary font-mono">{f1.stats.takedownDefense}%</span>
                  <span className="text-slate-400 font-medium">Phòng thủ Takedown</span>
                  <span className="text-blue-600 font-mono">{f2.stats.takedownDefense}%</span>
                </div>
                <StatBar label="" value={f1.stats.takedownDefense} color="bg-primary" showValue={false} />
                <div className="mt-1">
                  <StatBar label="" value={f2.stats.takedownDefense} color="bg-blue-600" showValue={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-4 text-center">Phân tích lợi thế</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {f1.reach > f2.reach && <Badge variant="outline" className="border-sky-200 bg-sky-50 text-primary">{f1.name} có lợi thế sải tay (+{f1.reach - f2.reach}cm)</Badge>}
              {f2.reach > f1.reach && <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">{f2.name} có lợi thế sải tay (+{f2.reach - f1.reach}cm)</Badge>}
              
              {f1.stats.striking > f2.stats.striking && <Badge variant="outline" className="border-sky-200 bg-sky-50 text-primary">{f1.name} đánh đứng tốt hơn</Badge>}
              {f2.stats.striking > f1.stats.striking && <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">{f2.name} đánh đứng tốt hơn</Badge>}
              
              {f1.stats.wrestling > f2.stats.wrestling && <Badge variant="outline" className="border-sky-200 bg-sky-50 text-primary">{f1.name} vật tốt hơn</Badge>}
              {f2.stats.wrestling > f1.stats.wrestling && <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">{f2.name} vật tốt hơn</Badge>}
              
              {f1.stats.groundGame > f2.stats.groundGame && <Badge variant="outline" className="border-sky-200 bg-sky-50 text-primary">{f1.name} kỹ năng địa chiến tốt hơn</Badge>}
              {f2.stats.groundGame > f1.stats.groundGame && <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">{f2.name} kỹ năng địa chiến tốt hơn</Badge>}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
