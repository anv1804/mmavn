'use client'

import { useState, useMemo } from 'react'
import { GymCard } from '@/components/gym/GymCard'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MapPin, Dumbbell, Filter, RotateCcw } from 'lucide-react'
import type { GymWithDetails } from '@/lib/services/gym-service'

interface GymDirectoryClientProps {
  initialGyms: GymWithDetails[]
  cities: string[]
  disciplines: string[]
}

export function GymDirectoryClient({
  initialGyms,
  cities,
  disciplines,
}: GymDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Tất cả')
  const [selectedDiscipline, setSelectedDiscipline] = useState('Tất cả')

  const filteredGyms = useMemo(() => {
    return initialGyms.filter((gym) => {
      // City filter
      if (selectedCity !== 'Tất cả' && gym.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false
      }

      // Discipline filter
      if (selectedDiscipline !== 'Tất cả') {
        const hasDiscipline = gym.disciplines.some(
          (d) => d.toLowerCase() === selectedDiscipline.toLowerCase()
        )
        if (!hasDiscipline) return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = gym.name.toLowerCase().includes(q)
        const matchAddress = gym.address ? gym.address.toLowerCase().includes(q) : false
        const matchDesc = gym.description ? gym.description.toLowerCase().includes(q) : false
        const matchCoach = gym.coaches ? gym.coaches.some(c => c.toLowerCase().includes(q)) : false
        const matchHeadCoach = gym.headCoach ? gym.headCoach.toLowerCase().includes(q) : false
        const matchFighter = gym.notableFighters.some(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            (f.nickname && f.nickname.toLowerCase().includes(q))
        )
        if (!matchName && !matchAddress && !matchDesc && !matchCoach && !matchHeadCoach && !matchFighter) {
          return false
        }
      }

      return true
    })
  }, [initialGyms, selectedCity, selectedDiscipline, searchQuery])

  const hasActiveFilters = searchQuery !== '' || selectedCity !== 'Tất cả' || selectedDiscipline !== 'Tất cả'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCity('Tất cả')
    setSelectedDiscipline('Tất cả')
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Controls */}
      <div className="bg-card border border-border p-4 md:p-6 rounded-2xl space-y-4">
        {/* Top bar: Search + Stats */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="w-full md:max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Tìm theo tên phòng tập, HLV, võ sĩ, địa chỉ..."
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 text-sm text-muted">
            <span>
              Hiển thị <strong className="text-foreground">{filteredGyms.length}</strong> / {initialGyms.length} phòng tập
            </span>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-primary-soft hover:text-primary gap-1 h-8"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại
              </Button>
            )}
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Khu vực / Thành phố:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => {
              const isActive = selectedCity === city
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/30 font-semibold'
                      : 'bg-card-hover/80 text-muted hover:text-foreground hover:bg-card-hover border border-border/60'
                  }`}
                >
                  {city}
                </button>
              )
            })}
          </div>
        </div>

        {/* Discipline Filter Chips */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
            <Dumbbell className="w-3.5 h-3.5 text-accent" />
            <span>Bộ môn đào tạo:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {disciplines.map((discipline) => {
              const isActive = selectedDiscipline === discipline
              return (
                <button
                  key={discipline}
                  onClick={() => setSelectedDiscipline(discipline)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-slate-950 font-bold shadow-sm shadow-accent/20'
                      : 'bg-background/80 text-muted hover:text-foreground hover:bg-card-hover border border-border/40'
                  }`}
                >
                  {discipline}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Gym Cards Grid */}
      {filteredGyms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Dumbbell className="w-12 h-12 stroke-[1.5]" />}
          title="Không tìm thấy phòng tập phù hợp"
          description="Thử đổi từ khóa tìm kiếm hoặc chọn thành phố, bộ môn khác."
        />
      )}
    </div>
  )
}
