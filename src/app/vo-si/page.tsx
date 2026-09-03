import { getAllFightersWithDetails } from '@/lib/services/fighter-service'
import { divisions, gyms } from '@/data/mock-data'
import { FighterListClient } from './FighterListClient'

export const metadata = {
  title: 'Võ sĩ',
  description: 'Danh sách các võ sĩ MMA Việt Nam',
}

export default function FighterListPage() {
  const fightersData = getAllFightersWithDetails()

  const fightersForClient = fightersData.map(f => ({
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
    divisionId: f.divisionId,
    gymId: f.gymId,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Danh sách Võ sĩ</h1>
        <p className="text-muted-foreground">Khám phá hồ sơ các võ sĩ MMA hàng đầu tại Việt Nam</p>
      </div>

      <FighterListClient 
        fighters={fightersForClient} 
        divisions={divisions} 
        gyms={gyms} 
      />
    </div>
  )
}
