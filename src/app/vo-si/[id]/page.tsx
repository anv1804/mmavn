import { notFound } from 'next/navigation'
import { getFighterWithDetails } from '@/lib/services/fighter-service'
import { getFighterFights, getFighterById, getDivisionById, articles } from '@/data/mock-data'
import { FighterDetailClient } from './FighterDetailClient'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const fighter = getFighterWithDetails(id)
  
  if (!fighter) {
    return { title: 'Không tìm thấy võ sĩ | MMAVN Hub' }
  }

  return {
    title: `${fighter.name} ${fighter.nickname ? `"${fighter.nickname}"` : ''} — Hồ sơ & Chỉ số võ sĩ | MMAVN Hub`,
    description: `Hồ sơ võ sĩ ${fighter.name}, bảng thống kê đòn đánh, tỷ lệ KO, album ảnh thi đấu và các video highlight tại MMA Việt Nam.`,
  }
}

export default async function FighterDetailPage({ params }: PageProps) {
  const { id } = await params
  const fighter = getFighterWithDetails(id)

  if (!fighter) {
    notFound()
  }

  // Get raw fights and resolve dependencies
  const rawFights = getFighterFights(id).reverse()
  
  const formattedFights = rawFights.map(fight => {
    const f1 = getFighterById(fight.fighter1Id)
    const f2 = getFighterById(fight.fighter2Id)
    const div = getDivisionById(fight.divisionId)
    
    return {
      id: fight.id,
      eventId: fight.eventId,
      fighter1: f1 ? { id: f1.id, name: f1.name, nickname: f1.nickname, record: f1.record } : { id: '', name: 'Unknown', record: { wins: 0, losses: 0, draws: 0 } },
      fighter2: f2 ? { id: f2.id, name: f2.name, nickname: f2.nickname, record: f2.record } : { id: '', name: 'Unknown', record: { wins: 0, losses: 0, draws: 0 } },
      division: div ? { name: div.name, nameVi: div.nameVi || div.name, weightLimit: div.weightLimit } : undefined,
      numberOfRounds: fight.numberOfRounds,
      isTitleFight: fight.isTitleFight,
      isMainEvent: fight.isMainEvent,
      result: fight.result ? {
        winnerId: fight.result.winnerId,
        method: fight.result.method,
        round: fight.result.round,
        time: fight.result.time
      } : undefined
    }
  })

  // Get related articles for this fighter
  const relatedArticles = articles.filter(art => 
    art.relatedFighterIds?.includes(id) ||
    art.title.toLowerCase().includes(fighter.name.toLowerCase()) ||
    art.tags.some(t => t.toLowerCase() === fighter.name.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
      <FighterDetailClient
        fighter={fighter}
        division={fighter.division}
        gym={fighter.gym}
        fights={formattedFights}
        relatedArticles={relatedArticles}
      />
    </div>
  )
}
