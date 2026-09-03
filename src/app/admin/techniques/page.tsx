'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Flame, 
  Sparkles
} from 'lucide-react'
import { techniques as initialTechniques } from '@/data/mock-data'
import { CATEGORY_INFO } from '@/lib/services/technique-service'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function AdminTechniquesPage() {
  const [techniqueList, setTechniqueList] = useState(initialTechniques)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'Tất cả kỹ thuật' },
    { id: 'striking', label: 'Striking (Đánh đứng)' },
    { id: 'wrestling', label: 'Wrestling (Vật)' },
    { id: 'submission', label: 'Submissions (Khóa siết)' },
    { id: 'clinch', label: 'Clinch (Ôm ghì)' },
  ]

  const filtered = techniqueList.filter(tech => {
    const matchesCat = selectedCategory === 'all' || tech.category === selectedCategory
    const matchesSearch = !searchQuery ||
      tech.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">Quản trị Thư viện Kỹ thuật MMA</h1>
          </div>
          <p className="text-sm text-slate-400">
            Biên soạn và quản lý các đòn Striking, Takedown, Ground & Pound và Submissions của võ sĩ Việt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ky-thuat"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161b2e] border border-[#232942] text-slate-300 hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem trên Web</span>
          </Link>
          <button
            onClick={() => {
              setToastMessage('Khung soạn thảo kỹ thuật mới đang mở!')
              setTimeout(() => setToastMessage(null), 3000)
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Kỹ thuật</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-[#121626] border border-[#1e243b] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên kỹ thuật (Vi / En)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161a2e] border border-[#232942] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                selectedCategory === cat.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                  : "bg-[#161a2e] border-[#232942] text-slate-400 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(tech => (
          <div
            key={tech.id}
            className="rounded-2xl bg-[#121626] border border-[#1e243b] overflow-hidden flex flex-col hover:border-purple-500/40 transition-all group"
          >
            <div className="p-5 border-b border-[#1e243b] bg-gradient-to-br from-[#161b2e] to-[#101424]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-600/20 text-purple-300 border border-purple-500/30 uppercase">
                  {tech.category}
                </span>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded",
                  tech.difficulty === 'Chuyên nghiệp' ? "bg-red-500/20 text-red-400" :
                  tech.difficulty === 'Nâng cao' ? "bg-amber-500/20 text-amber-400" :
                  "bg-emerald-500/20 text-emerald-400"
                )}>
                  {tech.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">
                {tech.nameVi}
              </h3>
              <p className="text-xs text-slate-400 font-mono italic">
                {tech.nameEn || tech.name}
              </p>
            </div>

            <div className="p-5 space-y-3 flex-1 text-xs">
              <p className="text-slate-300 leading-relaxed line-clamp-3">
                {tech.descriptionVi || tech.description}
              </p>

              <div className="pt-2 border-t border-[#1e243b] flex items-center justify-between text-slate-400 text-[11px]">
                <span>Nguồn gốc: <strong className="text-white">{tech.originArt || 'Võ thuật tổng hợp'}</strong></span>
                <span>Võ sĩ áp dụng: <strong className="text-purple-400 font-mono">{tech.notableFighters?.length || 0}</strong></span>
              </div>
            </div>

            <div className="p-3 border-t border-[#1e243b] bg-[#0c0f1c]/50 flex items-center justify-between">
              <Link
                href={`/ky-thuat/${tech.slug || tech.id}`}
                target="_blank"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
              >
                Xem chi tiết <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => {
                  setToastMessage(`Đã mở biên tập kỹ thuật ${tech.nameVi}`)
                  setTimeout(() => setToastMessage(null), 3000)
                }}
                className="px-3 py-1.5 rounded-lg bg-[#181d33] hover:bg-purple-600 hover:text-white text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-3 h-3" /> Chỉnh sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
