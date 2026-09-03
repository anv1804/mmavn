'use client'

import { useState, useMemo } from 'react'
import { TechniqueCard } from '@/components/technique/TechniqueCard'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import {
  Swords,
  Zap,
  RotateCcw,
  Flame,
  ShieldAlert,
  Layers,
  Sparkles
} from 'lucide-react'
import type { TechniqueWithFighterDetails } from '@/lib/services/technique-service'
import type { TechniqueCategory, TechniqueDifficulty } from '@/types'

interface TechniqueCatalogClientProps {
  initialTechniques: TechniqueWithFighterDetails[]
  stats: {
    total: number
    strikingCount: number
    wrestlingCount: number
    submissionCount: number
    clinchCount: number
    basicCount: number
    advancedCount: number
  }
}

type FilterCategory = 'all' | TechniqueCategory
type FilterDifficulty = 'all' | TechniqueDifficulty

export function TechniqueCatalogClient({
  initialTechniques,
  stats,
}: TechniqueCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterDifficulty>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const CATEGORY_TABS: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Tất cả kỹ thuật', count: stats.total },
    { id: 'striking', label: 'Đòn đấm đá', count: stats.strikingCount },
    { id: 'wrestling', label: 'Vật & Quật ngã', count: stats.wrestlingCount },
    { id: 'submission', label: 'Khoá siết', count: stats.submissionCount },
    { id: 'clinch', label: 'Áp sát & Clinch', count: stats.clinchCount },
  ]

  const filteredTechniques = useMemo(() => {
    return initialTechniques.filter((tech) => {
      // Category filter
      if (selectedCategory !== 'all' && tech.category !== selectedCategory) {
        return false
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && tech.difficulty !== selectedDifficulty) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = tech.name.toLowerCase().includes(q)
        const matchNameVi = tech.nameVi.toLowerCase().includes(q)
        const matchDesc = tech.description.toLowerCase().includes(q)
        const matchCat = tech.categoryLabelVi.toLowerCase().includes(q)
        const matchKeyPoints = tech.keyPoints.some(k => k.toLowerCase().includes(q))
        const matchFighter = tech.notableFighters.some(
          (f) =>
            f.fighterName.toLowerCase().includes(q) ||
            f.highlight.toLowerCase().includes(q)
        )

        if (!matchName && !matchNameVi && !matchDesc && !matchCat && !matchKeyPoints && !matchFighter) {
          return false
        }
      }

      return true
    })
  }, [initialTechniques, selectedCategory, selectedDifficulty, searchQuery])

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedDifficulty !== 'all'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedDifficulty('all')
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-card border border-border p-2 rounded-2xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25 font-semibold'
                    : 'text-muted hover:text-foreground hover:bg-card-hover'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-background/80 text-muted'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search & Difficulty Filter Subbar */}
      <div className="bg-card border border-border p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="w-full md:max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm theo tên kỹ thuật, võ sĩ (Duy Nhất, Quang Lộc...)..."
          />
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted font-medium mr-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-accent" />
            Độ khó:
          </span>

          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-accent text-slate-950 font-bold'
                : 'bg-background/80 text-muted hover:text-foreground border border-border/40'
            }`}
          >
            Tất cả
          </button>

          <button
            onClick={() => setSelectedDifficulty('Cơ bản')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedDifficulty === 'Cơ bản'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-background/80 text-muted hover:text-foreground border border-border/40'
            }`}
          >
            Cơ bản ({stats.basicCount})
          </button>

          <button
            onClick={() => setSelectedDifficulty('Nâng cao')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedDifficulty === 'Nâng cao'
                ? 'bg-red-600 text-white font-bold'
                : 'bg-background/80 text-muted hover:text-foreground border border-border/40'
            }`}
          >
            Nâng cao ({stats.advancedCount})
          </button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs text-primary-soft hover:text-primary gap-1 h-7 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Đặt lại
            </Button>
          )}
        </div>
      </div>

      {/* Search results count */}
      <div className="flex items-center justify-between text-xs text-muted px-1">
        <span>
          Đang hiển thị <strong className="text-foreground">{filteredTechniques.length}</strong> kỹ thuật
        </span>
        {selectedCategory !== 'all' && (
          <span className="text-primary-soft font-medium">
            Danh mục: {CATEGORY_TABS.find(t => t.id === selectedCategory)?.label}
          </span>
        )}
      </div>

      {/* Technique Cards Grid */}
      {filteredTechniques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.map((tech) => (
            <TechniqueCard key={tech.id} technique={tech} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Swords className="w-12 h-12 stroke-[1.5]" />}
          title="Không tìm thấy kỹ thuật phù hợp"
          description="Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc độ khó / danh mục."
        />
      )}
    </div>
  )
}
