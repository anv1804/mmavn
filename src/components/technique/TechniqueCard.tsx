'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Users,
  Swords,
  Flame,
  Award
} from 'lucide-react'
import type { TechniqueWithFighterDetails } from '@/lib/services/technique-service'

interface TechniqueCardProps {
  technique: TechniqueWithFighterDetails
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'striking':
        return <Badge variant="primary">Đòn đấm đá</Badge>
      case 'wrestling':
        return <Badge variant="accent">Vật & Quật ngã</Badge>
      case 'submission':
        return <Badge variant="success">Khoá siết</Badge>
      case 'clinch':
        return <Badge variant="default" className="bg-blue-900/40 text-blue-300 border border-blue-700/50">Clinch</Badge>
      default:
        return <Badge variant="default">{category}</Badge>
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    if (difficulty === 'Cơ bản') {
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
          Cơ bản
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/60 flex items-center gap-1">
        <Flame className="w-3 h-3 text-red-400" />
        Nâng cao
      </span>
    )
  }

  return (
    <Card hover className="flex flex-col h-full bg-card border-border hover:border-primary/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {getCategoryBadge(technique.category)}
            {getDifficultyBadge(technique.difficulty)}
          </div>
          <h3 className="text-lg font-bold text-foreground mt-1.5 leading-snug">
            {technique.name}
          </h3>
          <p className="text-xs text-muted font-medium mt-0.5">
            {technique.nameVi}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground/90 leading-relaxed mb-4">
        {technique.description}
      </p>

      {/* Key points preview */}
      <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-card-hover/40 border border-border/40">
        <div className="text-[11px] font-semibold text-accent-soft uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3 h-3 text-accent" />
          Điểm mấu chốt kỹ thuật:
        </div>
        <ul className="space-y-1">
          {technique.keyPoints.slice(0, 2).map((point, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notable Vietnamese Fighters */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-2">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span>Võ sĩ Việt Nam tiêu biểu:</span>
        </div>

        <div className="space-y-2">
          {technique.notableFighters.map((nf, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-background/70 border border-border/60 hover:border-primary/30 transition-all text-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  {nf.fighter ? (
                    <Link
                      href={`/vo-si/${nf.fighter.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span className="truncate">{nf.fighterName}</span>
                      {nf.fighter.isChampion && (
                        <span className="text-[10px] text-amber-400">🏆</span>
                      )}
                    </Link>
                  ) : (
                    <span className="font-semibold text-foreground">{nf.fighterName}</span>
                  )}
                  {nf.fighter?.nickname && (
                    <span className="text-[11px] text-muted italic truncate">
                      "{nf.fighter.nickname}"
                    </span>
                  )}
                </div>

                {nf.fighter?.divisionName && (
                  <span className="text-[10px] text-muted bg-slate-800/80 px-1.5 py-0.5 rounded shrink-0">
                    {nf.fighter.divisionName}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted leading-relaxed pl-1 border-l-2 border-primary/40">
                {nf.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Breakdown Drawer */}
      {isExpanded && (
        <div className="space-y-4 pt-3 mt-2 border-t border-border/60 animate-fade-in text-xs">
          {/* Execution steps */}
          {technique.executionSteps && technique.executionSteps.length > 0 && (
            <div className="space-y-2">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-primary" />
                Các bước thực hiện chuẩn xác:
              </div>
              <ol className="space-y-1.5 pl-1">
                {technique.executionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-primary/20 text-primary-soft font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Counters */}
          {technique.counters && technique.counters.length > 0 && (
            <div className="space-y-1.5 p-2.5 rounded-xl bg-blue-950/20 border border-blue-900/30">
              <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Cách phòng thủ & Khắc chế:
              </div>
              <ul className="space-y-1 pl-1">
                {technique.counters.map((counter, idx) => (
                  <li key={idx} className="text-slate-300 flex items-start gap-1.5">
                    <span className="text-blue-400">•</span>
                    <span>{counter}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common mistakes */}
          {technique.commonMistakes && technique.commonMistakes.length > 0 && (
            <div className="space-y-1.5 p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/30">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Sai lầm phổ biến cần tránh:
              </div>
              <ul className="space-y-1 pl-1">
                {technique.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Expand/Collapse Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-auto pt-3 border-t border-border/40 flex items-center justify-center gap-1 text-xs text-muted hover:text-primary-soft transition-colors font-medium cursor-pointer w-full py-1"
      >
        <span>{isExpanded ? 'Thu gọn phân tích chi tiết' : 'Xem các bước thực hiện & cách khắc chế'}</span>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
    </Card>
  )
}
