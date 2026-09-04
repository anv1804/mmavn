'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MapPin, Phone, Globe, Users, Award, Clock, Dumbbell, ExternalLink, Star, CheckCircle2, ChevronRight } from 'lucide-react'
import type { GymWithDetails } from '@/lib/services/gym-service'

interface GymCardProps {
  gym: GymWithDetails
}

export function GymCard({ gym }: GymCardProps) {
  const getCityBadgeVariant = (city: string) => {
    switch (city) {
      case 'TP.HCM':
        return 'primary'
      case 'Hà Nội':
        return 'accent'
      case 'Đà Nẵng':
        return 'success'
      default:
        return 'default'
    }
  }

  const coverPhoto = gym.coverImage || gym.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&auto=format&fit=crop&q=80'
  const logoPhoto = gym.logo || gym.image

  return (
    <Card hover className="flex flex-col h-full bg-card/90 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl">
      {/* 1. Cover Image Banner - Fixed Height */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-900 shrink-0">
        <img
          src={coverPhoto}
          alt={gym.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant={getCityBadgeVariant(gym.city)} size="sm" className="shadow-md backdrop-blur-md">
            {gym.city}
          </Badge>
          {gym.rating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-md">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{gym.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Logo and Gym Quick Meta */}
        <div className="absolute bottom-2 left-3 right-3 flex items-end gap-2.5 pointer-events-none">
          <div className="w-11 h-11 rounded-xl bg-card border-2 border-primary/50 overflow-hidden shadow-lg shrink-0 flex items-center justify-center p-0.5">
            {logoPhoto ? (
              <img src={logoPhoto} alt={gym.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <Dumbbell className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1 pb-0.5 flex items-center justify-between">
            {gym.foundedYear ? (
              <span className="text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                Năm {gym.foundedYear}
              </span>
            ) : <span />}
            {gym.memberCount && (
              <span className="text-[10px] text-emerald-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-emerald-500/20">
                {gym.memberCount}+ Học viên
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Body - Normalized Structure with Fixed Height Slots */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Name & Address (Slot 1) */}
        <div>
          <h3 className="font-bold text-base text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {gym.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted mt-1 h-4">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary-soft" />
            <span className="truncate">{gym.address || gym.city}</span>
          </div>
        </div>

        {/* Disciplines (Slot 2) - Fixed 1 Row */}
        <div className="flex items-center gap-1 overflow-hidden h-6">
          {gym.disciplines.slice(0, 3).map((d) => (
            <span
              key={d}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50 whitespace-nowrap"
            >
              {d}
            </span>
          ))}
          {gym.disciplines.length > 3 && (
            <span className="text-[10px] font-semibold text-slate-400 px-1 whitespace-nowrap">
              +{gym.disciplines.length - 3} môn
            </span>
          )}
        </div>

        {/* Description (Slot 3) - Fixed 2-line height */}
        <p className="text-xs text-muted line-clamp-2 h-8 leading-relaxed">
          {gym.description || 'Trung tâm đào tạo võ thuật đối kháng chuyên nghiệp với giáo trình chuẩn quốc tế.'}
        </p>

        {/* Coaches & Facilities Combined Box (Slot 4) - Fixed Height Box */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-border/50 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-foreground h-4">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-bold text-amber-400/90 text-[11px] shrink-0">HLV:</span>
            <span className="truncate text-[11px] text-slate-200">
              {gym.headCoach || 'Ban Huấn Luyện Chuyên Nghiệp'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] h-4">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">
              {gym.facilities && gym.facilities.length > 0 
                ? gym.facilities.slice(0, 2).join(' • ')
                : 'Lồng bát giác • Thảm đấu tiêu chuẩn • Tạ Functional'}
            </span>
          </div>
        </div>

        {/* Notable Fighters / Roster Preview (Slot 5) - Fixed Height Box */}
        <div className="pt-2.5 border-t border-border/50">
          <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2 h-5">
            <span className="flex items-center gap-1 text-[11px] text-slate-300">
              <Users className="w-3.5 h-3.5 text-primary" />
              Võ sĩ ({gym.fighterCount})
            </span>
            {gym.championsCount > 0 ? (
              <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30">
                👑 {gym.championsCount} Vô địch
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-normal">
                Đang thi đấu LION/GMA
              </span>
            )}
          </div>

          {/* Consistent Avatar Stack Row - Fixed 28px height */}
          <div className="h-7 flex items-center justify-between">
            {gym.notableFighters.length > 0 ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="flex -space-x-2 overflow-hidden py-0.5">
                  {gym.notableFighters.slice(0, 4).map((fighter) => (
                    <div
                      key={fighter.id}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-card bg-slate-800 overflow-hidden"
                      title={`${fighter.name} (${fighter.recordStr})`}
                    >
                      {fighter.avatar ? (
                        <img src={fighter.avatar} alt={fighter.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-primary/20 text-primary-soft font-bold flex items-center justify-center text-[9px]">
                          {fighter.name.split(' ').pop()?.[0] || 'V'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-slate-200 truncate">
                  {gym.notableFighters[0]?.name}
                  {gym.notableFighters.length > 1 && ` +${gym.notableFighters.length - 1}`}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 italic">
                Đang tuyển chọn thế hệ đấu sĩ mới
              </span>
            )}

            <span className="text-[11px] font-semibold text-primary group-hover:translate-x-0.5 transition-transform flex items-center shrink-0">
              Chi tiết <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Footer Contact - Fixed Height */}
        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted h-6">
          {gym.phone || gym.contact?.phone ? (
            <a
              href={`tel:${(gym.phone || gym.contact?.phone || '').replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-slate-300 hover:text-primary transition-colors text-[11px] font-mono"
            >
              <Phone className="w-3 h-3 text-primary" />
              <span>{gym.phone || gym.contact?.phone}</span>
            </a>
          ) : (
            <span className="text-[11px] text-slate-500">Liên hệ CLB</span>
          )}

          <div className="flex items-center gap-2">
            {gym.openingHours && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="truncate max-w-[80px]">{gym.openingHours.split(' ')[0]}</span>
              </span>
            )}
            {gym.contact?.website && (
              <a
                href={gym.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-slate-400 hover:text-primary transition-colors"
                title="Website chính thức"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
            {gym.contact?.facebook && (
              <a
                href={gym.contact.facebook.startsWith('http') ? gym.contact.facebook : `https://${gym.contact.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-slate-400 hover:text-primary transition-colors"
                title="Facebook Fanpage"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
