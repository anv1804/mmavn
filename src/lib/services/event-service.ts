import { events, fights, getFighterById, getUpcomingEvents, getCompletedEvents, getFightsByEventId } from '@/data/mock-data'
import { promotions, divisions } from '@/data/mock-data'
import type { MmaEvent, Fight, Fighter, Promotion, Division } from '@/types'

export interface EventWithDetails extends MmaEvent {
  promotion: Promotion
  fights: FightWithFighters[]
  mainEvent?: FightWithFighters
  totalFights: number
}

export interface FightWithFighters extends Fight {
  fighter1: Fighter
  fighter2: Fighter
  division: Division
}

export function resolveFight(fight: Fight): FightWithFighters {
  return {
    ...fight,
    fighter1: getFighterById(fight.fighter1Id)!,
    fighter2: getFighterById(fight.fighter2Id)!,
    division: divisions.find(d => d.id === fight.divisionId)!,
  }
}

export function getEventWithDetails(id: string): EventWithDetails | null {
  const event = events.find(e => e.id === id)
  if (!event) return null
  
  const promotion = promotions.find(p => p.id === event.promotionId)
  const eventFights = getFightsByEventId(id).map(resolveFight)
  const mainEvent = eventFights.find(f => f.isMainEvent)
  
  return {
    ...event,
    promotion: promotion!,
    fights: eventFights,
    mainEvent,
    totalFights: eventFights.length,
  }
}

export function getAllEventsWithDetails(): EventWithDetails[] {
  return events.map(e => getEventWithDetails(e.id)!).filter(Boolean)
}

export function getUpcomingEventsWithDetails(): EventWithDetails[] {
  return getUpcomingEvents().map(e => getEventWithDetails(e.id)!).filter(Boolean)
}

export function getCompletedEventsWithDetails(): EventWithDetails[] {
  return getCompletedEvents().map(e => getEventWithDetails(e.id)!).filter(Boolean)
}

// Format date for display
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', { 
    weekday: 'short',
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

export function formatEventDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

export function getDaysUntilEvent(dateString: string): number {
  const eventDate = new Date(dateString)
  const now = new Date()
  const diff = eventDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
