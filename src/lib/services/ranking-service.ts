import { rankings, divisions, getFighterById } from '@/data/mock-data'
import { promotions } from '@/data/mock-data'
import type { Ranking, Division, Fighter } from '@/types'
import { getFighterWithDetails, type FighterWithDetails } from './fighter-service'

export interface RankingWithDetails extends Ranking {
  fighter: FighterWithDetails
  division: Division
  movement: 'up' | 'down' | 'same' | 'new'
  movementAmount: number
}

export function getRankingsWithDetails(divisionId: string): RankingWithDetails[] {
  return rankings
    .filter(r => r.divisionId === divisionId)
    .sort((a, b) => a.position - b.position)
    .map(ranking => {
      const fighter = getFighterWithDetails(ranking.fighterId)!
      const division = divisions.find(d => d.id === ranking.divisionId)!
      
      let movement: 'up' | 'down' | 'same' | 'new' = 'same'
      let movementAmount = 0
      
      if (ranking.previousPosition === undefined) {
        movement = 'new'
      } else if (ranking.previousPosition > ranking.position) {
        movement = 'up'
        movementAmount = ranking.previousPosition - ranking.position
      } else if (ranking.previousPosition < ranking.position) {
        movement = 'down'
        movementAmount = ranking.position - ranking.previousPosition
      }
      
      return {
        ...ranking,
        fighter,
        division,
        movement,
        movementAmount,
      }
    })
}

export function getDivisionsWithRankings(): Division[] {
  const divisionIds = [...new Set(rankings.map(r => r.divisionId))]
  return divisionIds.map(id => divisions.find(d => d.id === id)!).filter(Boolean)
}
