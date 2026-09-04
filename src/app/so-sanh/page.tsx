import { CompareClient } from './CompareClient';
import { getAllFightersWithDetails } from '@/lib/services/fighter-service';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'So sánh võ sĩ | MMAVN Hub'
};

export default async function ComparePage() {
  const fighters = await getAllFightersWithDetails();
  
  // Map fighters to the structure needed by the client component
  const allFighters = fighters.map(f => ({
    id: f.id,
    name: f.name,
    nickname: f.nickname,
    record: f.record,
    eloRating: f.eloRating,
    isChampion: f.isChampion,
    styles: f.styles,
    height: f.height,
    reach: f.reach,
    divisionName: f.division?.nameVi || f.division?.name,
    gymName: f.gym?.name,
    stats: f.stats
  }));

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      <SectionHeader 
        title="So Sánh Võ Sĩ" 
        subtitle="So sánh chỉ số, thành tích và kỹ năng giữa các võ sĩ" 
      />
      <div>
        <CompareClient allFighters={allFighters} />
      </div>
    </div>
  );
}
