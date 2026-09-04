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
    avatar: f.avatar,
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
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-8 sm:pt-12 pb-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-bold">
          <span>🥊</span>
          <span>Dữ Liệu Võ Sĩ MMA Quốc Gia 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Danh Sách <span className="text-primary">Võ Sĩ</span> MMA Việt Nam
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
          Khám phá hồ sơ số, thành tích thi đấu W-L-D, tỷ lệ kết liễu KO/Sub, chỉ số Elo quốc tế và câu lạc bộ chủ quản của hơn 30 võ sĩ MMA hàng đầu tại Việt Nam.
        </p>
      </div>

      <FighterListClient 
        fighters={fightersForClient} 
        divisions={divisions} 
        gyms={gyms} 
      />
    </div>
  )
}
