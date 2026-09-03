import { fighters, divisions, gyms, articles, getFighterById, getFightersByDivision, searchFighters, getFighterFights } from '@/data/mock-data'
import type { Fighter, FighterStats, Division, Gym, Fight, Article, FighterGalleryItem, FighterHighlightVideo } from '@/types'

// Get fighter with resolved references
export interface FighterWithDetails extends Fighter {
  division: Division
  gym: Gym
  totalFights: number
  finishRate: number
  recentFights: Fight[]
}

const DEFAULT_GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80', title: 'Tung đòn tay uy lực', caption: 'Pha ra đòn chính xác khiến đối thủ choáng váng trong hiệp 1.' },
  { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80', title: 'Tập huấn kỹ thuật chuyên sâu', caption: 'Rèn giũa thể lực và chiến thuật cùng ban huấn luyện.' },
  { url: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1200&auto=format&fit=crop&q=80', title: 'Khoảnh khắc chiến thắng', caption: 'Trọng tài tuyên bố chiến thắng thuyết phục sau các hiệp đấu căng thẳng.' },
  { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80', title: 'Takedown dũng mãnh', caption: 'Kỹ thuật quật ngã đối thủ kiểm soát thế trận trên mặt sàn.' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80', title: 'Buổi cân ký chính thức', caption: 'Hoàn thành thủ tục cân ký và kiểm tra y tế trước giờ thi đấu.' },
  { url: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=1200&auto=format&fit=crop&q=80', title: 'Tập trung cao độ', caption: 'Khởi động kỹ lưỡng trong phòng chờ trước khi bước vào lồng bát giác.' }
]

export function getFighterWithDetails(id: string): FighterWithDetails | null {
  const fighter = getFighterById(id)
  if (!fighter) return null
  
  const division = divisions.find(d => d.id === fighter.divisionId)
  const gym = gyms.find(g => g.id === fighter.gymId)
  const fighterFights = getFighterFights(id)
  const totalFights = fighter.record.wins + fighter.record.losses + fighter.record.draws
  const finishRate = totalFights > 0 
    ? Math.round(((fighter.record.winsByKo + fighter.record.winsBySub) / Math.max(fighter.record.wins, 1)) * 100) 
    : 0

  const fallbackImage = 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80'
  const fallbackAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80'
  const fallbackQuote = fighter.isChampion
    ? 'Khi bước vào lồng bát giác, tôi không chỉ chiến đấu cho riêng mình, mà chiến đấu vì màu cờ sắc áo Việt Nam và niềm tự hào của người hâm mộ võ thuật.'
    : 'Kỷ luật thép trong phòng tập và ngọn lửa nhiệt huyết trên võ đài là con đường duy nhất dẫn tới đỉnh cao vinh quang.'
  const fallbackQuoteAuthor = `${fighter.name} — ${fighter.isChampion ? 'Đương kim Vô địch' : 'Võ sĩ MMA Chuyên nghiệp'}`

  const gallery: FighterGalleryItem[] = fighter.gallery && fighter.gallery.length > 0 
    ? fighter.gallery 
    : DEFAULT_GALLERY_IMAGES.map((img, idx) => ({
        id: `gal-${fighter.id}-${idx}`,
        url: img.url,
        title: img.title,
        caption: `${fighter.name} - ${img.caption}`
      }))

  const highlightVideos: FighterHighlightVideo[] = fighter.highlightVideos && fighter.highlightVideos.length > 0
    ? fighter.highlightVideos
    : [
        {
          id: `vid-${fighter.id}-1`,
          title: `Những đòn đánh uy lực nhất của ${fighter.name} trên sàn đấu MMA`,
          thumbnail: fighter.image || fallbackImage,
          duration: '06:15',
          views: '124K lượt xem'
        },
        {
          id: `vid-${fighter.id}-2`,
          title: `Phỏng vấn độc quyền: Mục tiêu chinh phục đỉnh cao của võ sĩ ${fighter.name}`,
          thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
          duration: '10:45',
          views: '88K lượt xem'
        },
        {
          id: `vid-${fighter.id}-3`,
          title: `Hậu trường buổi tập thể lực và chiến thuật khắc nghiệt của ${fighter.name}`,
          thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
          duration: '14:20',
          views: '65K lượt xem'
        }
      ]

  const socialLinks = fighter.socialLinks || {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com'
  }

  return {
    ...fighter,
    image: fighter.image || fallbackImage,
    avatar: fighter.avatar || fallbackAvatar,
    quote: fighter.quote || fallbackQuote,
    quoteAuthor: fighter.quoteAuthor || fallbackQuoteAuthor,
    socialLinks,
    gallery,
    highlightVideos,
    division: division!,
    gym: gym!,
    totalFights,
    finishRate,
    recentFights: fighterFights.slice(0, 5),
  }
}

export function getFighterRelatedArticles(fighterId: string, fighterName: string): Article[] {
  const directMatches = articles.filter(a => 
    a.relatedFighterIds?.includes(fighterId) || 
    a.title.toLowerCase().includes(fighterName.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(fighterName.toLowerCase()))
  )

  if (directMatches.length >= 3) {
    return directMatches
  }

  // Fallback to latest general articles so the tab is always rich
  const others = articles.filter(a => !directMatches.some(m => m.id === a.id))
  return [...directMatches, ...others].slice(0, 6)
}

export function getAllFightersWithDetails(): FighterWithDetails[] {
  return fighters
    .map(f => getFighterWithDetails(f.id)!)
    .filter(Boolean)
}

export function getChampions(): FighterWithDetails[] {
  return getAllFightersWithDetails().filter(f => f.isChampion)
}

export function getTopRankedFighters(limit = 10): FighterWithDetails[] {
  return getAllFightersWithDetails()
    .sort((a, b) => b.eloRating - a.eloRating)
    .slice(0, limit)
}

export function compareTwoFighters(id1: string, id2: string) {
  const fighter1 = getFighterWithDetails(id1)
  const fighter2 = getFighterWithDetails(id2)
  if (!fighter1 || !fighter2) return null

  return {
    fighter1,
    fighter2,
    commonOpponents: findCommonOpponents(id1, id2),
    advantages: analyzeAdvantages(fighter1, fighter2),
  }
}

function findCommonOpponents(id1: string, id2: string): string[] {
  const fights1 = getFighterFights(id1)
  const fights2 = getFighterFights(id2)
  const opponents1 = new Set(fights1.map(f => f.fighter1Id === id1 ? f.fighter2Id : f.fighter1Id))
  const opponents2 = new Set(fights2.map(f => f.fighter1Id === id2 ? f.fighter2Id : f.fighter1Id))
  return [...opponents1].filter(id => opponents2.has(id))
}

function analyzeAdvantages(f1: FighterWithDetails, f2: FighterWithDetails) {
  const advantages: { fighter: string; category: string; detail: string }[] = []
  
  if (f1.reach > f2.reach) advantages.push({ fighter: f1.id, category: 'Sải tay', detail: `+${f1.reach - f2.reach}cm` })
  else if (f2.reach > f1.reach) advantages.push({ fighter: f2.id, category: 'Sải tay', detail: `+${f2.reach - f1.reach}cm` })
  
  if (f1.stats.striking > f2.stats.striking) advantages.push({ fighter: f1.id, category: 'Đòn đánh', detail: `${f1.stats.striking} vs ${f2.stats.striking}` })
  else if (f2.stats.striking > f1.stats.striking) advantages.push({ fighter: f2.id, category: 'Đòn đánh', detail: `${f2.stats.striking} vs ${f1.stats.striking}` })
  
  if (f1.stats.groundGame > f2.stats.groundGame) advantages.push({ fighter: f1.id, category: 'Mặt đất', detail: `${f1.stats.groundGame} vs ${f2.stats.groundGame}` })
  else if (f2.stats.groundGame > f1.stats.groundGame) advantages.push({ fighter: f2.id, category: 'Mặt đất', detail: `${f2.stats.groundGame} vs ${f1.stats.groundGame}` })

  if (f1.stats.wrestling > f2.stats.wrestling) advantages.push({ fighter: f1.id, category: 'Vật', detail: `${f1.stats.wrestling} vs ${f2.stats.wrestling}` })
  else if (f2.stats.wrestling > f1.stats.wrestling) advantages.push({ fighter: f2.id, category: 'Vật', detail: `${f2.stats.wrestling} vs ${f1.stats.wrestling}` })
  
  return advantages
}

export function searchFightersWithDetails(query: string): FighterWithDetails[] {
  return searchFighters(query)
    .map(f => getFighterWithDetails(f.id)!)
    .filter(Boolean)
}

// Format record as string: "12W - 2L - 0D"
export function formatRecord(record: { wins: number; losses: number; draws: number }): string {
  return `${record.wins}W - ${record.losses}L - ${record.draws}D`
}

// Format record compact: "12-2-0"
export function formatRecordCompact(record: { wins: number; losses: number; draws: number }): string {
  return `${record.wins}-${record.losses}-${record.draws}`
}
