'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FighterCard } from '@/components/fighter/FighterCard'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { useLiveFighters } from '@/lib/services/data-store'
import { Edit3 } from 'lucide-react'

type FighterForList = {
  id: string
  name: string
  nickname?: string
  avatar?: string
  image?: string
  fullBodyImage?: string
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

export function FighterListClient({ fighters: initialFighters, divisions, gyms }: FighterListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedGym, setSelectedGym] = useState('')

  // Live fighters from DataStore
  const liveStoredFighters = useLiveFighters()

  // Merge live stored fighters with initial list details (divisionName, gymName)
  const displayFighters: FighterForList[] = useMemo(() => {
    return liveStoredFighters.map(stored => {
      const initial = initialFighters.find(f => f.id === stored.id)
      const div = divisions.find(d => d.id === stored.divisionId)
      const g = gyms.find(gymItem => gymItem.id === stored.gymId)
      return {
        id: stored.id,
        name: stored.name,
        nickname: stored.nickname,
        avatar: stored.avatar || initial?.avatar,
        image: stored.image || initial?.image,
        fullBodyImage: stored.fullBodyImage || initial?.fullBodyImage,
        record: stored.record || initial?.record || { wins: 0, losses: 0, draws: 0, winsByKo: 0, winsBySub: 0, winsByDec: 0 },
        eloRating: stored.eloRating || initial?.eloRating || 1500,
        isChampion: stored.isChampion ?? initial?.isChampion ?? false,
        styles: stored.styles || initial?.styles || ['MMA'],
        height: stored.height || initial?.height || 170,
        reach: stored.reach || initial?.reach || 170,
        divisionName: div?.nameVi || div?.name || initial?.divisionName,
        gymName: g?.name || initial?.gymName,
        divisionId: stored.divisionId || initial?.divisionId,
        gymId: stored.gymId || initial?.gymId,
      }
    })
  }, [liveStoredFighters, initialFighters, divisions, gyms])

  const filteredFighters = useMemo(() => {
    return displayFighters.filter((fighter) => {
      const matchesSearch = 
        !searchQuery || 
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesDivision = !selectedDivision || fighter.divisionId === selectedDivision
      const matchesGym = !selectedGym || fighter.gymId === selectedGym

      return matchesSearch && matchesDivision && matchesGym
    })
  }, [displayFighters, searchQuery, selectedDivision, selectedGym])

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

        <div className="w-full md:w-auto md:ml-auto flex items-center justify-between md:justify-end gap-3">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Tìm thấy {filteredFighters.length} võ sĩ
          </span>

          <Link
            href="/admin/fighters"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            title="Quản lý và cập nhật danh sách võ sĩ trong CMS"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quản trị CMS</span>
          </Link>
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
