'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MapPin, Phone, Globe, Users, Award, Clock, Dumbbell, ExternalLink } from 'lucide-react'
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

  return (
    <Card hover className="flex flex-col h-full bg-card border-border hover:border-primary/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
              <Dumbbell className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-lg text-foreground tracking-tight line-clamp-1">
              {gym.name}
            </h3>
          </div>
          {gym.address && (
            <div className="flex items-start gap-1.5 text-xs text-muted mt-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary-soft" />
              <span>{gym.address}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge variant={getCityBadgeVariant(gym.city)} size="sm">
            {gym.city}
          </Badge>
          {gym.foundedYear && (
            <span className="text-[11px] text-muted">Est. {gym.foundedYear}</span>
          )}
        </div>
      </div>

      {/* Disciplines */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {gym.disciplines.map((d) => (
          <span
            key={d}
            className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Description */}
      {gym.description && (
        <p className="text-xs text-muted line-clamp-2 mb-4 leading-relaxed">
          {gym.description}
        </p>
      )}

      {/* Coaches Section */}
      <div className="p-2.5 rounded-xl bg-card-hover/40 border border-border/50 text-xs mb-4 space-y-1">
        {gym.headCoach && (
          <div className="flex items-center gap-1.5 text-foreground">
            <Award className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-semibold text-accent-soft">HLV Trưởng:</span>
            <span className="truncate">{gym.headCoach}</span>
          </div>
        )}
        {gym.coaches && gym.coaches.length > 0 && (
          <div className="text-muted text-[11px] pl-5 truncate">
            Đội ngũ: {gym.coaches.join(', ')}
          </div>
        )}
      </div>

      {/* Notable Fighters / Roster */}
      <div className="mt-auto pt-3 border-t border-border/60">
        <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            Võ sĩ tiêu biểu
          </span>
          <span className="text-[11px] text-muted font-normal">
            {gym.fighterCount} võ sĩ
          </span>
        </div>

        {gym.notableFighters.length > 0 ? (
          <div className="space-y-1.5">
            {gym.notableFighters.slice(0, 3).map((fighter) => (
              <Link
                key={fighter.id}
                href={`/vo-si/${fighter.id}`}
                className="flex items-center justify-between p-1.5 px-2 rounded-lg bg-background/60 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-xs group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary-soft font-bold flex items-center justify-center text-[10px] shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    {fighter.name.split(' ').pop()?.[0] || 'V'}
                  </div>
                  <div className="truncate">
                    <span className="font-medium text-foreground group-hover:text-primary-soft transition-colors">
                      {fighter.name}
                    </span>
                    {fighter.isChampion && (
                      <span className="ml-1 text-[10px] text-amber-400 font-semibold">
                        🏆 Champ
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[11px] text-muted shrink-0 pl-2">
                  <span className="font-mono text-green-400">{fighter.recordStr.split(' - ')[0]}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="font-mono text-red-400">{fighter.recordStr.split(' - ')[1]}</span>
                </div>
              </Link>
            ))}
            {gym.notableFighters.length > 3 && (
              <div className="text-[11px] text-center text-muted pt-1">
                + thêm {gym.notableFighters.length - 3} võ sĩ khác
              </div>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-muted italic">Đang cập nhật danh sách võ sĩ...</p>
        )}
      </div>

      {/* Footer Contact */}
      <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs text-muted">
        {gym.contact?.phone ? (
          <a
            href={`tel:${gym.contact.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1 hover:text-primary-soft transition-colors"
          >
            <Phone className="w-3 h-3 text-primary" />
            <span className="text-[11px]">{gym.contact.phone}</span>
          </a>
        ) : (
          <span className="text-[11px]">Liên hệ đang cập nhật</span>
        )}

        <div className="flex items-center gap-2">
          {gym.openingHours && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400" title={gym.openingHours}>
              <Clock className="w-3 h-3 text-muted" />
              <span className="truncate max-w-[100px]">{gym.openingHours}</span>
            </span>
          )}
          {gym.contact?.website && (
            <a
              href={gym.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-muted hover:text-primary transition-colors"
              title="Trang web phòng tập"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {gym.contact?.facebook && (
            <a
              href={`https://${gym.contact.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-muted hover:text-primary transition-colors"
              title="Facebook Fanpage"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
