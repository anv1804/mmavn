'use client'

import { useState, useMemo } from 'react'
import { FighterCard } from '@/components/fighter/FighterCard'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'

type FighterForList = {
  id: string
  name: string
  nickname?: string
  record: { wins: number; losses: number; draws: number; winsByKo: number; winsBySub: number; winsByDec: number }
  eloRating: number
  isChampion: boolean
  styles: string[]
  height: number
  reach: number
  divisionName?: string
  gymName?: string
  divisionId?: string
  gymId?: string
}

type Division = {
  id: string
  nameVi: string
  name: string
}

type Gym = {
  id: string
  name: string
}

interface FighterListClientProps {
  fighters: FighterForList[]
  divisions: Division[]
  gyms: Gym[]
}

export function FighterListClient({ fighters, divisions, gyms }: FighterListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedGym, setSelectedGym] = useState('')

  const filteredFighters = useMemo(() => {
    return fighters.filter((fighter) => {
      const matchesSearch = 
        !searchQuery || 
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesDivision = !selectedDivision || fighter.divisionId === selectedDivision
      const matchesGym = !selectedGym || fighter.gymId === selectedGym

      return matchesSearch && matchesDivision && matchesGym
    })
  }, [fighters, searchQuery, selectedDivision, selectedGym])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/3">
          <SearchInput 
            placeholder="Tìm kiếm võ sĩ..." 
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
        </div>
        
        <select 
          className="w-full md:w-1/4 bg-card border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
        >
          <option value="">Tất cả hạng cân</option>
          {divisions.map((div) => (
            <option key={div.id} value={div.id}>{div.nameVi || div.name}</option>
          ))}
        </select>

        <select 
          className="w-full md:w-1/4 bg-card border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={selectedGym}
          onChange={(e) => setSelectedGym(e.target.value)}
        >
          <option value="">Tất cả phòng tập</option>
          {gyms.map((gym) => (
            <option key={gym.id} value={gym.id}>{gym.name}</option>
          ))}
        </select>
        
        <div className="w-full md:w-auto md:ml-auto text-sm text-muted-foreground whitespace-nowrap">
          Tìm thấy {filteredFighters.length} võ sĩ
        </div>
      </div>

      {filteredFighters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFighters.map((f) => (
            <FighterCard
              key={f.id}
              fighter={f}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="Không tìm thấy võ sĩ nào" 
          description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn." 
        />
      )}
    </div>
  )
}
