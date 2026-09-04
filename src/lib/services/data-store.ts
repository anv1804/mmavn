'use client'

import { useState, useEffect } from 'react'
import { promotions as defaultPromotions, fighters as defaultFighters } from '@/data/mock-data'
import type { Promotion, Fighter } from '@/types'

const STORAGE_KEYS = {
  PROMOTIONS: 'mmavn_custom_promotions_v4',
  FIGHTERS: 'mmavn_custom_fighters_v4',
}

const CHANGE_EVENT = 'mmavn_datastore_change'

/**
 * Dispatch custom event to notify all listening components on same tab
 */
export function notifyDataStoreChange(type: 'promotions' | 'fighters') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { type } }))
  }
}

// ==========================================
// PROMOTIONS STORE
// ==========================================

export function getStoredPromotions(): Promotion[] {
  if (typeof window === 'undefined') return defaultPromotions
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROMOTIONS)
    if (!raw) return defaultPromotions
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultPromotions
  } catch {
    return defaultPromotions
  }
}

export function getStoredPromotionById(idOrSlug: string): Promotion | undefined {
  const list = getStoredPromotions()
  const q = idOrSlug.toLowerCase().trim()
  return list.find(
    p => p.id.toLowerCase() === q ||
         (p.slug && p.slug.toLowerCase() === q) ||
         p.shortName.toLowerCase() === q
  )
}

export function saveStoredPromotion(updatedPromo: Promotion) {
  if (typeof window === 'undefined') return
  const currentList = getStoredPromotions()
  const existsIndex = currentList.findIndex(p => p.id === updatedPromo.id)
  let nextList: Promotion[]
  if (existsIndex >= 0) {
    nextList = [...currentList]
    nextList[existsIndex] = updatedPromo
  } else {
    nextList = [...currentList, updatedPromo]
  }
  localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(nextList))
  notifyDataStoreChange('promotions')
}

export function saveAllStoredPromotions(list: Promotion[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(list))
  notifyDataStoreChange('promotions')
}

export function resetStoredPromotions() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.PROMOTIONS)
  notifyDataStoreChange('promotions')
}

// ==========================================
// FIGHTERS STORE
// ==========================================

export function getStoredFighters(): Fighter[] {
  if (typeof window === 'undefined') return defaultFighters
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FIGHTERS)
    if (!raw) return defaultFighters
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultFighters
  } catch {
    return defaultFighters
  }
}

export function getStoredFighterById(id: string): Fighter | undefined {
  const list = getStoredFighters()
  return list.find(f => f.id === id)
}

export function saveStoredFighter(updatedFighter: Fighter) {
  if (typeof window === 'undefined') return
  const currentList = getStoredFighters()
  const existsIndex = currentList.findIndex(f => f.id === updatedFighter.id)
  let nextList: Fighter[]
  if (existsIndex >= 0) {
    nextList = [...currentList]
    nextList[existsIndex] = updatedFighter
  } else {
    nextList = [updatedFighter, ...currentList]
  }
  localStorage.setItem(STORAGE_KEYS.FIGHTERS, JSON.stringify(nextList))
  notifyDataStoreChange('fighters')
}

export function deleteStoredFighter(id: string) {
  if (typeof window === 'undefined') return
  const currentList = getStoredFighters()
  const nextList = currentList.filter(f => f.id !== id)
  localStorage.setItem(STORAGE_KEYS.FIGHTERS, JSON.stringify(nextList))
  notifyDataStoreChange('fighters')
}

export function saveAllStoredFighters(list: Fighter[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.FIGHTERS, JSON.stringify(list))
  notifyDataStoreChange('fighters')
}

export function resetStoredFighters() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.FIGHTERS)
  notifyDataStoreChange('fighters')
}

// ==========================================
// REACT HOOKS FOR LIVE SYNCHRONIZATION
// ==========================================

export function useLivePromotions(initialList: Promotion[] = defaultPromotions): Promotion[] {
  const [promos, setPromos] = useState<Promotion[]>(initialList)

  useEffect(() => {
    // Sync on mount
    setPromos(getStoredPromotions())

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (!detail || detail.type === 'promotions') {
        setPromos(getStoredPromotions())
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.PROMOTIONS) {
        setPromos(getStoredPromotions())
      }
    }

    window.addEventListener(CHANGE_EVENT, handleCustomChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleCustomChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return promos
}

export function useLivePromotion(idOrSlug: string, fallback?: Promotion): Promotion | undefined {
  const [promo, setPromo] = useState<Promotion | undefined>(fallback)

  useEffect(() => {
    const found = getStoredPromotionById(idOrSlug)
    if (found) setPromo(found)

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (!detail || detail.type === 'promotions') {
        const updated = getStoredPromotionById(idOrSlug)
        if (updated) setPromo(updated)
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.PROMOTIONS) {
        const updated = getStoredPromotionById(idOrSlug)
        if (updated) setPromo(updated)
      }
    }

    window.addEventListener(CHANGE_EVENT, handleCustomChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleCustomChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [idOrSlug])

  return promo
}

export function useLiveFighters(initialList: Fighter[] = defaultFighters): Fighter[] {
  const [fightersList, setFightersList] = useState<Fighter[]>(initialList)

  useEffect(() => {
    setFightersList(getStoredFighters())

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (!detail || detail.type === 'fighters') {
        setFightersList(getStoredFighters())
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.FIGHTERS) {
        setFightersList(getStoredFighters())
      }
    }

    window.addEventListener(CHANGE_EVENT, handleCustomChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleCustomChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return fightersList
}

export function useLiveFighter(id: string, fallback?: Fighter): Fighter | undefined {
  const [fighter, setFighter] = useState<Fighter | undefined>(fallback)

  useEffect(() => {
    const found = getStoredFighterById(id)
    if (found) setFighter(found)

    const handleCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (!detail || detail.type === 'fighters') {
        const updated = getStoredFighterById(id)
        if (updated) setFighter(updated)
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.FIGHTERS) {
        const updated = getStoredFighterById(id)
        if (updated) setFighter(updated)
      }
    }

    window.addEventListener(CHANGE_EVENT, handleCustomChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleCustomChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [id])

  return fighter
}
