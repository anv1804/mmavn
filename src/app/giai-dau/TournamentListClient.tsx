'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { cn } from '@/lib/utils'
import type { PromotionWithDetails, RuleComparisonRow } from '@/lib/services/promotion-service'
import { useLivePromotions } from '@/lib/services/data-store'
import { 
  Trophy, 
  Flame, 
  Shield, 
  Swords, 
  CheckCircle2, 
  ChevronRight, 
  Calendar, 
  Users, 
  Layers, 
  Scale, 
  Clock, 
  Zap,
  Sparkles,
  Award,
  Edit3,
  Settings,
  Crown,
  MapPin,
  Building2
} from 'lucide-react'

interface TournamentListClientProps {
  promotions: PromotionWithDetails[]
  rulesComparison: RuleComparisonRow[]
}

// Visual covers for 3 promotions
const PROMOTION_COVERS: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80',
  p2: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
  p3: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1200&auto=format&fit=crop&q=80'
}

export function TournamentListClient({ promotions, rulesComparison }: TournamentListClientProps) {
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards')

  // Live synchronised promotions list from Data Store
  const livePromos = useLivePromotions(promotions)

  // Merge live promo data (name, tagline, description, formatType, etc.) with pre-calculated details
  const displayPromotions: PromotionWithDetails[] = livePromos.map(lp => {
    const originalDetail = promotions.find(p => p.id === lp.id)
    return {
      ...(originalDetail || ({} as PromotionWithDetails)),
      ...lp,
      beltsWithChampions: originalDetail?.beltsWithChampions || [],
      upcomingEvents: originalDetail?.upcomingEvents || [],
      completedEvents: originalDetail?.completedEvents || [],
      signatureFighters: originalDetail?.signatureFighters || [],
      totalEvents: originalDetail?.totalEvents || 0,
    }
  })

  const filterTabs: Tab[] = [
    { id: 'all', label: 'Tất cả giải đấu' },
    { id: 'pro-cage', label: 'Pro Cage (LION)' },
    { id: 'semi-pro', label: 'Semi-Pro (GMA)' },
    { id: 'grand-prix', label: 'Grand Prix (V1)' },
    { id: 'comparison', label: 'Bảng đối chiếu luật' },
  ]

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    if (id === 'comparison') {
      setViewMode('comparison')
    } else {
      setViewMode('cards')
    }
  }

  const filteredPromotions = displayPromotions.filter(p => {
    if (activeTab === 'all' || activeTab === 'comparison') return true
    if (activeTab === 'pro-cage') return p.formatType === 'Pro Cage'
    if (activeTab === 'semi-pro') return p.formatType === 'Semi-Pro Grassroots'
    if (activeTab === 'grand-prix') return p.formatType === 'Grand Prix'
    return true
  })

  const getFormatBadgeStyle = (format?: string) => {
    switch (format) {
      case 'Pro Cage':
        return {
          label: 'Lồng Bát Giác Pro',
          color: 'text-red-400',
          bg: 'bg-red-500/20 text-red-300 border-red-500/40',
          accent: 'from-red-600 to-rose-700',
          border: 'border-red-500/40 hover:border-red-500',
          icon: <Flame className="w-3.5 h-3.5 mr-1 text-red-400" />
        }
      case 'Semi-Pro Grassroots':
        return {
          label: 'Bán Chuyên Ươm Mầm',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          accent: 'from-emerald-600 to-teal-700',
          border: 'border-emerald-500/40 hover:border-emerald-500',
          icon: <Shield className="w-3.5 h-3.5 mr-1 text-emerald-400" />
        }
      case 'Grand Prix':
        return {
          label: 'Grand Prix Knock-out',
          color: 'text-amber-400',
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          accent: 'from-amber-500 to-yellow-600',
          border: 'border-amber-500/40 hover:border-amber-500',
          icon: <Trophy className="w-3.5 h-3.5 mr-1 text-amber-400" />
        }
      default:
        return {
          label: format || 'MMA',
          color: 'text-slate-300',
          bg: 'bg-slate-800 border-border text-slate-200',
          accent: 'from-slate-700 to-slate-800',
          border: 'border-border',
          icon: <Swords className="w-3.5 h-3.5 mr-1" />
        }
    }
  }

  return (
    <div className="space-y-10">
      {/* View Switcher & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <Tabs tabs={filterTabs} activeTab={activeTab} onChange={handleTabChange} />

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-card/60 p-1 rounded-xl border border-border/70">
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === 'cards' ? "bg-card text-white shadow-xs" : "text-slate-400 hover:text-white"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              Thẻ giải đấu
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === 'comparison' ? "bg-card text-white shadow-xs" : "text-slate-400 hover:text-white"
              )}
            >
              <Scale className="w-3.5 h-3.5" />
              Bảng đối chiếu
            </button>
          </div>

          <Link
            href="/admin/promotions"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            title="Mở bảng điều khiển quản trị CMS giải đấu"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quản trị CMS</span>
          </Link>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPromotions.map((promo) => {
            const formatStyle = getFormatBadgeStyle(promo.formatType)
            const activeChampions = promo.beltsWithChampions.filter(b => b.currentChampion)
            const coverImage = PROMOTION_COVERS[promo.id] || PROMOTION_COVERS.p1

            return (
              <div
                key={promo.id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-card/40 border transition-all duration-500 shadow-xl",
                  formatStyle.border,
                  "hover:-translate-y-1 hover:shadow-2xl"
                )}
              >
                {/* 1. VISUAL COVER BANNER ĐỈNH CAO */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black">
                  <img
                    src={coverImage}
                    alt={promo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-[#0e1322]/40 to-transparent" />

                  {/* Badges on Banner */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={cn("text-[11px] font-black px-3 py-1 rounded-full border backdrop-blur-md flex items-center shadow-lg", formatStyle.bg)}>
                      {formatStyle.icon}
                      {formatStyle.label}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                      Năm {promo.foundedYear}
                    </span>
                  </div>

                  {/* Promotion Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight flex items-center gap-2">
                      {promo.name}
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-sm">
                        {promo.shortName}
                      </span>
                    </h2>
                    {promo.tagline && (
                      <p className={cn("text-xs font-bold italic mt-1", formatStyle.color)}>
                        "{promo.tagline}"
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. CARD CONTENT BODY */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {promo.formatDescription || promo.description}
                    </p>

                    {/* Metrics Grid */}
                    {promo.keyMetrics && promo.keyMetrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2.5">
                        {promo.keyMetrics.map((metric, idx) => (
                          <div 
                            key={idx} 
                            className="bg-slate-900/80 border border-border/70 rounded-2xl p-3 flex flex-col"
                          >
                            <span className="text-[10px] text-slate-400 font-medium truncate">{metric.label}</span>
                            <span className="text-sm sm:text-base font-black text-white mt-0.5">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Active Champions Showcase */}
                    <div className="space-y-2.5 pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          Đai vô địch ({activeChampions.length}/{promo.beltsWithChampions.length})
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {promo.beltsWithChampions.length} hạng cân
                        </span>
                      </div>

                      <div className="space-y-2">
                        {activeChampions.slice(0, 3).map((belt) => (
                          <div 
                            key={belt.id}
                            className="flex items-center justify-between text-xs bg-slate-900/70 px-3 py-2 rounded-xl border border-border/50 hover:border-amber-500/40 transition-colors"
                          >
                            <span className="text-slate-300 font-medium truncate mr-2">{belt.divisionName}</span>
                            <span className="font-bold text-amber-400 truncate max-w-[140px] flex items-center gap-1 font-mono">
                              👑 {belt.currentChampion?.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    {promo.highlights && promo.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-2 text-xs">
                        {promo.highlights.slice(0, 2).map((hl, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-5 mt-4 border-t border-border/50">
                    <Link
                      href={`/giai-dau/${promo.slug || promo.id}`}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all group-hover:scale-[1.02]"
                    >
                      <span>Khám phá chi tiết giải {promo.shortName}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Rules Comparison Table View */}
      {viewMode === 'comparison' && (
        <div className="rounded-3xl bg-card/40 border border-border/70 overflow-hidden shadow-xl">
          <div className="p-6 bg-slate-900/80 border-b border-border/70">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" /> Bảng Đối Chiếu Luật Thi Đấu & Thể Thức
            </h3>
            <p className="text-xs text-slate-400 mt-1">So sánh trực tiếp quy chuẩn kỹ thuật giữa LION, GMA và V1</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-border/70 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="p-4 w-1/4">Quy chuẩn luật</th>
                  <th className="p-4 text-red-400">LION Championship (Pro)</th>
                  <th className="p-4 text-emerald-400">GMA (Bán Chuyên)</th>
                  <th className="p-4 text-amber-400">V1 Champion (Grand Prix)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-slate-300">
                {rulesComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-white">{row.aspectVi}</td>
                    <td className="p-4">{row.lion}</td>
                    <td className="p-4">{row.gma}</td>
                    <td className="p-4">{row.v1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. National Host Arenas Showcase */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Đấu Trường &amp; Nhà Thi Đấu Tiêu Biểu
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Các địa điểm quy mô lớn đăng cai tổ chức các sự kiện MMA chuyên nghiệp hàng đầu Việt Nam
            </p>
          </div>
          <Link href="/su-kien" className="text-xs text-primary hover:underline font-bold flex items-center gap-1">
            Xem lịch sự kiện các sân <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Nhà thi đấu Tây Hồ',
              city: 'Hà Nội',
              capacity: '5.000 khán giả',
              description: 'Đại bản doanh quen thuộc của LION Championship khu vực phía Bắc.',
              tag: 'LION Northern Hub',
              color: 'text-red-400 border-red-500/30'
            },
            {
              name: 'Nhà thi đấu Rạch Miễu',
              city: 'TP. Hồ Chí Minh',
              capacity: '4.500 khán giả',
              description: 'Sân nhà sôi động của các sự kiện LC miền Nam và giải đấu GMA.',
              tag: 'Southern Arena',
              color: 'text-emerald-400 border-emerald-500/30'
            },
            {
              name: 'The Grand Ho Tram Strip',
              city: 'Bà Rịa - Vũng Tàu',
              capacity: '3.000 khán giả',
              description: 'Khu phức hợp nghỉ dưỡng tổ chức các sự kiện quốc tế AFC và MMA du lịch.',
              tag: 'International Resort',
              color: 'text-amber-400 border-amber-500/30'
            },
            {
              name: 'Cung TTHN Quần Ngựa',
              city: 'Hà Nội',
              capacity: '8.000 khán giả',
              description: 'Nơi diễn ra các đêm chung kết tranh đai quy mô lớn nhất quốc gia.',
              tag: 'Mega Championship Arena',
              color: 'text-cyan-400 border-cyan-500/30'
            }
          ].map((venue, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-card/75 border border-border/70 hover:border-primary/50 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-900", venue.color)}>
                    {venue.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {venue.city}
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">{venue.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{venue.description}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-border/50 text-[11px] font-mono text-slate-400">
                Sức chứa: <span className="font-bold text-slate-200">{venue.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
