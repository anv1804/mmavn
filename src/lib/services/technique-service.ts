import { techniques, fighters, divisions } from '@/data/mock-data'
import type { Technique, TechniqueCategory, TechniqueDifficulty, NotableFighterUsage } from '@/types'

export interface EnrichedNotableFighter extends NotableFighterUsage {
  fighter?: {
    id: string
    name: string
    nickname?: string
    isChampion: boolean
    divisionName?: string
  }
}

export interface TechniqueWithFighterDetails extends Omit<Technique, 'notableFighters'> {
  notableFighters: EnrichedNotableFighter[]
  categoryLabelVi: string
}

export const CATEGORY_INFO: Record<TechniqueCategory, {
  labelVi: string
  labelEn: string
  description: string
  color: string
}> = {
  striking: {
    labelVi: 'Đòn đấm đá',
    labelEn: 'Striking',
    description: 'Các kỹ thuật đánh đứng từ Boxing, Kickboxing, Muay Thai và Vovinam nhằm gây choáng và knockout đối thủ.',
    color: 'text-red-500',
  },
  wrestling: {
    labelVi: 'Vật & Quật ngã',
    labelEn: 'Wrestling & Takedowns',
    description: 'Kỹ thuật đổi tầng trọng tâm, bắt chân và quật ngã đối phương từ Tán thủ, Vật tự do và Judo để kiểm soát địa chiến.',
    color: 'text-amber-500',
  },
  submission: {
    labelVi: 'Khoá siết',
    labelEn: 'Submissions',
    description: 'Các đòn bẻ khớp và bóp nghẹt động mạch từ Brazilian Jiu-Jitsu (BJJ) buộc đối phương phải xin hàng.',
    color: 'text-emerald-500',
  },
  clinch: {
    labelVi: 'Áp sát & Ôm ghì',
    labelEn: 'Clinch',
    description: 'Nghệ thuật khống chế gáy, ép lồng bát giác và giã đòn cự ly gần bằng cùi chỏ và đầu gối.',
    color: 'text-blue-500',
  },
}

export function enrichTechnique(tech: Technique): TechniqueWithFighterDetails {
  const notableFighters: EnrichedNotableFighter[] = tech.notableFighters.map(nf => {
    if (!nf.fighterId) return nf
    const fighter = fighters.find(f => f.id === nf.fighterId)
    if (!fighter) return nf

    const div = divisions.find(d => d.id === fighter.divisionId)
    const divisionName = div ? (div.nameVi || div.name) : undefined

    return {
      ...nf,
      fighter: {
        id: fighter.id,
        name: fighter.name,
        nickname: fighter.nickname,
        isChampion: fighter.isChampion,
        divisionName,
      },
    }
  })

  return {
    ...tech,
    notableFighters,
    categoryLabelVi: CATEGORY_INFO[tech.category]?.labelVi || tech.category,
  }
}

export function getAllTechniques(): TechniqueWithFighterDetails[] {
  return techniques.map(enrichTechnique)
}

export function getTechniqueById(id: string): TechniqueWithFighterDetails | null {
  const tech = techniques.find(t => t.id === id)
  if (!tech) return null
  return enrichTechnique(tech)
}

export function getTechniquesByCategory(category: TechniqueCategory): TechniqueWithFighterDetails[] {
  return techniques
    .filter(t => t.category === category)
    .map(enrichTechnique)
}

export interface TechniqueFilterOptions {
  query?: string
  category?: TechniqueCategory | 'all'
  difficulty?: TechniqueDifficulty | 'all'
}

export function filterTechniques(options: TechniqueFilterOptions): TechniqueWithFighterDetails[] {
  const { query, category, difficulty } = options
  let results = getAllTechniques()

  if (category && category !== 'all') {
    results = results.filter(t => t.category === category)
  }

  if (difficulty && difficulty !== 'all') {
    results = results.filter(t => t.difficulty === difficulty)
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim()
    results = results.filter(t => {
      const matchName = t.name.toLowerCase().includes(q)
      const matchNameVi = t.nameVi.toLowerCase().includes(q)
      const matchDesc = t.description.toLowerCase().includes(q)
      const matchCategory = t.categoryLabelVi.toLowerCase().includes(q)
      const matchKeyPoints = t.keyPoints.some(k => k.toLowerCase().includes(q))
      const matchFighter = t.notableFighters.some(f => 
        f.fighterName.toLowerCase().includes(q) || 
        f.highlight.toLowerCase().includes(q)
      )
      return matchName || matchNameVi || matchDesc || matchCategory || matchKeyPoints || matchFighter
    })
  }

  return results
}

export function getTechniqueStats() {
  const all = getAllTechniques()
  const strikingCount = all.filter(t => t.category === 'striking').length
  const wrestlingCount = all.filter(t => t.category === 'wrestling').length
  const submissionCount = all.filter(t => t.category === 'submission').length
  const clinchCount = all.filter(t => t.category === 'clinch').length

  const basicCount = all.filter(t => t.difficulty === 'Cơ bản').length
  const advancedCount = all.filter(t => t.difficulty === 'Nâng cao').length

  return {
    total: all.length,
    strikingCount,
    wrestlingCount,
    submissionCount,
    clinchCount,
    basicCount,
    advancedCount,
  }
}
