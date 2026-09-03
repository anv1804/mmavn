import { gyms, fighters, divisions } from '@/data/mock-data'
import type { Gym } from '@/types'

export interface GymFighterSummary {
  id: string
  name: string
  nickname?: string
  isChampion: boolean
  styles: string[]
  divisionName: string
  recordStr: string
  eloRating: number
}

export interface GymWithDetails extends Gym {
  notableFighters: GymFighterSummary[]
  fighterCount: number
  championsCount: number
}

export function getGymWithDetails(id: string): GymWithDetails | null {
  const gym = gyms.find(g => g.id === id)
  if (!gym) return null

  // Find all fighters training at this gym or marked as notable
  const gymFighters = fighters.filter(f => {
    if (f.gymId === gym.id) return true
    if (gym.notableFighterIds && gym.notableFighterIds.includes(f.id)) return true
    return false
  })

  const notableFighters: GymFighterSummary[] = gymFighters.map(f => {
    const div = divisions.find(d => d.id === f.divisionId)
    const divisionName = div ? (div.nameVi || div.name) : ''
    const recordStr = `${f.record.wins}W - ${f.record.losses}L - ${f.record.draws}D`
    return {
      id: f.id,
      name: f.name,
      nickname: f.nickname,
      isChampion: f.isChampion,
      styles: f.styles,
      divisionName,
      recordStr,
      eloRating: f.eloRating,
    }
  })

  const championsCount = notableFighters.filter(f => f.isChampion).length

  return {
    ...gym,
    notableFighters,
    fighterCount: notableFighters.length,
    championsCount,
  }
}

export function getAllGymsWithDetails(): GymWithDetails[] {
  return gyms
    .map(g => getGymWithDetails(g.id)!)
    .filter(Boolean)
}

export function getGymsByCity(city: string): GymWithDetails[] {
  const all = getAllGymsWithDetails()
  if (!city || city === 'Tất cả') return all
  return all.filter(g => g.city.toLowerCase() === city.toLowerCase())
}

export function getGymsByDiscipline(discipline: string): GymWithDetails[] {
  const all = getAllGymsWithDetails()
  if (!discipline || discipline === 'Tất cả') return all
  return all.filter(g => 
    g.disciplines.some(d => d.toLowerCase() === discipline.toLowerCase())
  )
}

export interface GymFilterOptions {
  query?: string
  city?: string
  discipline?: string
}

export function searchGymsWithDetails(options: GymFilterOptions): GymWithDetails[] {
  const { query, city, discipline } = options
  let results = getAllGymsWithDetails()

  if (city && city !== 'Tất cả') {
    results = results.filter(g => g.city.toLowerCase() === city.toLowerCase())
  }

  if (discipline && discipline !== 'Tất cả') {
    results = results.filter(g => 
      g.disciplines.some(d => d.toLowerCase() === discipline.toLowerCase())
    )
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim()
    results = results.filter(g => {
      const matchName = g.name.toLowerCase().includes(q)
      const matchAddress = g.address ? g.address.toLowerCase().includes(q) : false
      const matchDescription = g.description ? g.description.toLowerCase().includes(q) : false
      const matchCoach = g.coaches ? g.coaches.some(c => c.toLowerCase().includes(q)) : false
      const matchHeadCoach = g.headCoach ? g.headCoach.toLowerCase().includes(q) : false
      const matchFighter = g.notableFighters.some(f => 
        f.name.toLowerCase().includes(q) || 
        (f.nickname && f.nickname.toLowerCase().includes(q))
      )
      return matchName || matchAddress || matchDescription || matchCoach || matchHeadCoach || matchFighter
    })
  }

  return results
}

export function getAvailableCities(): string[] {
  const citySet = new Set<string>()
  gyms.forEach(g => {
    if (g.city) citySet.add(g.city)
  })
  return ['Tất cả', ...Array.from(citySet)]
}

export function getAvailableDisciplines(): string[] {
  const disciplineSet = new Set<string>()
  gyms.forEach(g => {
    g.disciplines?.forEach(d => disciplineSet.add(d))
  })
  return ['Tất cả', ...Array.from(disciplineSet)]
}
