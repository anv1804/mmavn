import { promotions, events, fights } from '@/data/mock-data'
import { getEventWithDetails, type EventWithDetails } from '@/lib/services/event-service'
import { getFighterWithDetails, type FighterWithDetails } from '@/lib/services/fighter-service'
import type { Promotion, ChampionshipBelt } from '@/types'

export interface ChampionshipBeltWithChampion extends ChampionshipBelt {
  currentChampion?: FighterWithDetails | null
}

export interface PromotionWithDetails extends Promotion {
  beltsWithChampions: ChampionshipBeltWithChampion[]
  upcomingEvents: EventWithDetails[]
  completedEvents: EventWithDetails[]
  signatureFighters: FighterWithDetails[]
  totalEvents: number
}

export interface RuleComparisonRow {
  aspect: string
  aspectVi: string
  lion: string
  gma: string
  v1: string
}

/**
 * Get all promotions
 */
export function getAllPromotions(): Promotion[] {
  return promotions
}

/**
 * Find promotion by ID or slug/shortName (case-insensitive)
 */
export function getPromotionByIdOrSlug(idOrSlug: string): Promotion | undefined {
  const query = idOrSlug.toLowerCase().trim()
  return promotions.find(
    p => p.id.toLowerCase() === query ||
         (p.slug && p.slug.toLowerCase() === query) ||
         p.shortName.toLowerCase() === query
  )
}

/**
 * Get championship belts with populated champion details
 */
export function getPromotionBeltsWithChampions(promotionId: string): ChampionshipBeltWithChampion[] {
  const promotion = promotions.find(p => p.id === promotionId)
  if (!promotion || !promotion.belts) return []

  return promotion.belts.map(belt => {
    const champion = belt.currentChampionId ? getFighterWithDetails(belt.currentChampionId) : null
    return {
      ...belt,
      currentChampion: champion,
    }
  })
}

/**
 * Get upcoming and completed events for a promotion
 */
export function getPromotionEvents(promotionId: string): {
  upcoming: EventWithDetails[]
  completed: EventWithDetails[]
  all: EventWithDetails[]
} {
  const promotionEvents = events.filter(e => e.promotionId === promotionId)
  
  const allWithDetails = promotionEvents
    .map(e => getEventWithDetails(e.id)!)
    .filter(Boolean)

  const upcoming = allWithDetails
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const completed = allWithDetails
    .filter(e => e.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    upcoming,
    completed,
    all: allWithDetails,
  }
}

/**
 * Get signature fighters associated with a promotion
 */
export function getPromotionFighters(promotionId: string): FighterWithDetails[] {
  const promotion = promotions.find(p => p.id === promotionId)
  if (!promotion) return []

  // Collect fighter IDs from promotion events
  const promoEvents = events.filter(e => e.promotionId === promotionId)
  const promoEventIds = new Set(promoEvents.map(e => e.id))
  
  const fighterIds = new Set<string>()

  // Add champions
  if (promotion.belts) {
    for (const belt of promotion.belts) {
      if (belt.currentChampionId) {
        fighterIds.add(belt.currentChampionId)
      }
    }
  }

  // Add fighters from fights
  for (const fight of fights) {
    if (promoEventIds.has(fight.eventId)) {
      fighterIds.add(fight.fighter1Id)
      fighterIds.add(fight.fighter2Id)
    }
  }

  return Array.from(fighterIds)
    .map(id => getFighterWithDetails(id)!)
    .filter(Boolean)
    .sort((a, b) => {
      // Champions first, then by Elo rating
      if (a.isChampion && !b.isChampion) return -1
      if (!a.isChampion && b.isChampion) return 1
      return b.eloRating - a.eloRating
    })
}

/**
 * Get complete promotion details including belts, events, and fighters
 */
export function getPromotionWithDetails(idOrSlug: string): PromotionWithDetails | null {
  const promotion = getPromotionByIdOrSlug(idOrSlug)
  if (!promotion) return null

  const beltsWithChampions = getPromotionBeltsWithChampions(promotion.id)
  const { upcoming, completed, all } = getPromotionEvents(promotion.id)
  const signatureFighters = getPromotionFighters(promotion.id)

  return {
    ...promotion,
    beltsWithChampions,
    upcomingEvents: upcoming,
    completedEvents: completed,
    signatureFighters,
    totalEvents: all.length,
  }
}

/**
 * Get all promotions with their complete details
 */
export function getAllPromotionsWithDetails(): PromotionWithDetails[] {
  return promotions.map(p => getPromotionWithDetails(p.id)!).filter(Boolean)
}

/**
 * Get side-by-side rules & characteristics comparison table
 */
export function getPromotionRulesComparison(): RuleComparisonRow[] {
  return [
    {
      aspect: 'Format & Philosophy',
      aspectVi: 'Triết lý & Thể thức',
      lion: 'Pro Cage Fighting - Sàn đấu lồng bát giác đỉnh cao chuyên nghiệp quốc gia',
      gma: 'Semi-Pro Grassroots - Ươm mầm tài năng bán chuyên & phong trào học viện',
      v1: 'Grand Prix Tournament - Giải đấu nhánh loại trực tiếp & thách đấu liên môn',
    },
    {
      aspect: 'Cage / Ring Type',
      aspectVi: 'Võ đài thi đấu',
      lion: 'Lồng bát giác (Octagon Cage 9m) tiêu chuẩn quốc tế',
      gma: 'Sàn đài lục giác (Hexagon) / Thảm đấu an toàn có đệm',
      v1: 'Sàn đài dây vuông (Roped Ring) phong cách võ đài truyền thống',
    },
    {
      aspect: 'Round Duration',
      aspectVi: 'Thời lượng hiệp',
      lion: '3 hiệp x 5 phút (Tranh đai: 5 hiệp x 5 phút), nghỉ 1 phút',
      gma: '3 hiệp x 3 phút, hiệp phụ 3 phút khi hoà, nghỉ 1 phút',
      v1: 'Vòng loại: 3x3 phút | Chung kết: 3x4 phút (Hiệp phụ 3 phút)',
    },
    {
      aspect: 'Elbow Strikes',
      aspectVi: 'Đòn cùi chỏ',
      lion: 'Cho phép toàn diện khi đứng và địa chiến (tuân thủ góc hợp lệ)',
      gma: 'Hạn chế tối đa; CẤM hoàn toàn chỏ vào đầu và khi địa chiến',
      v1: 'Cho phép chỏ khi đứng có bọc bảo hộ mỏng; cấm chỏ cắm 12-6',
    },
    {
      aspect: 'Knees to Head',
      aspectVi: 'Lên gối vào đầu',
      lion: 'Cho phép khi cả hai đứng; CẤM khi đối thủ chạm sàn (grounded)',
      gma: 'CẤM HOÀN TOÀN gối vào đầu trong mọi tình huống (chỉ gối vào thân)',
      v1: 'Cho phép gối bay & gối ôm ghì (clinch) tối đa 3 giây',
    },
    {
      aspect: 'Ground and Pound',
      aspectVi: 'Địa chiến (Ground & Pound)',
      lion: 'Tự do đấm và chỏ vào thân và mặt đối thủ theo luật Unified',
      gma: 'Cho phép đấm thân; cấm đòn giã mặt dồn dập khi mất tự vệ',
      v1: 'Giới hạn thời gian (tối đa 45 giây nếu không chuyển thế hoặc dứt điểm)',
    },
    {
      aspect: 'Weight Cutting & Weigh-in',
      aspectVi: 'Cân ký & Cắt cân',
      lion: 'Cân chính thức 24h trước giờ thi đấu + kiểm tra y tế chuyên sâu',
      gma: 'Cân trong ngày thi đấu (Same-day) - Triệt tiêu ép cân tiêu cực',
      v1: 'Cân trước 12h thi đấu kèm kiểm tra chỉ số bù nước nghiêm ngặt',
    },
    {
      aspect: 'Gloves & Protection',
      aspectVi: 'Găng & Bảo hộ',
      lion: 'Găng MMA chuyên nghiệp 4oz, bọc răng, không bọc cẳng chân',
      gma: 'Găng bán chuyên dày 6oz-7oz, bảo vệ cẳng chân & mu chân, bọc răng',
      v1: 'Găng thi đấu hở ngón 5oz, bọc cùi chỏ co giãn, bọc răng',
    },
    {
      aspect: 'Championship / Awards',
      aspectVi: 'Đai vô địch & Giải thưởng',
      lion: 'Đai vô địch kim loại đúc mạ vàng danh giá bảo trợ bởi VMMAF',
      gma: 'Cúp vô địch mùa & Đai bán chuyên danh dự, vé thăng hạng Pro',
      v1: 'Cúp Grand Prix, Đai mở rộng và tiền thưởng từng chặng knock-out',
    },
  ]
}
