'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EventCard } from '@/components/event/EventCard'
import { FighterCard } from '@/components/fighter/FighterCard'
import { cn } from '@/lib/utils'
import type { PromotionWithDetails } from '@/lib/services/promotion-service'
import type { User } from '@/types/admin'
import { getCurrentUser } from '@/lib/services/admin-service'
import { 
  Trophy, 
  Flame, 
  Shield, 
  Swords, 
  Calendar, 
  Users, 
  BookOpen, 
  Award, 
  MapPin, 
  Clock, 
  Scale, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Ticket,
  ExternalLink,
  Timer,
  Edit3
} from 'lucide-react'

interface PromotionDetailClientProps {
  promotion: PromotionWithDetails
}

const PROMOTION_COVERS: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&auto=format&fit=crop&q=80',
  p2: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=80',
  p3: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1600&auto=format&fit=crop&q=80'
}

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  })

  useEffect(() => {
    // Parse target date or fallback to 15 days ahead
    const target = new Date(targetDate).getTime() || (Date.now() + 15 * 24 * 60 * 60 * 1000)

    const updateTimer = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <div className="flex flex-col items-center bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[56px] shadow-xs">
        <span className="text-base sm:text-lg font-black text-slate-900 font-mono leading-none">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Ngày</span>
      </div>

      <span className="text-primary font-bold text-sm">:</span>

      <div className="flex flex-col items-center bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[56px] shadow-xs">
        <span className="text-base sm:text-lg font-black text-slate-900 font-mono leading-none">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Giờ</span>
      </div>

      <span className="text-primary font-bold text-sm">:</span>

      <div className="flex flex-col items-center bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[56px] shadow-xs">
        <span className="text-base sm:text-lg font-black text-slate-900 font-mono leading-none">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Phút</span>
      </div>

      <span className="text-primary font-bold text-sm">:</span>

      <div className="flex flex-col items-center bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[56px] shadow-xs">
        <span className="text-base sm:text-lg font-black text-primary font-mono leading-none">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Giây</span>
      </div>
    </div>
  )
}

import { useLivePromotion } from '@/lib/services/data-store'

export function PromotionDetailClient({ promotion: initialPromotion }: PromotionDetailClientProps) {
  // Live reactive promotion data from DataStore (updates immediately when edited in CMS)
  const livePromo = useLivePromotion(initialPromotion.id, initialPromotion)
  const promotion = {
    ...initialPromotion,
    ...(livePromo || {}),
    // Preserve calculated event lists and fighters while reflecting any updated rules/belts/info
    rules: livePromo?.rules || initialPromotion.rules,
    beltsWithChampions: initialPromotion.beltsWithChampions,
  }

  const allEvents = [...(promotion.upcomingEvents || []), ...(promotion.completedEvents || [])]
  const activeChampions = promotion.beltsWithChampions.filter(b => b.currentChampion)
  const coverImage = PROMOTION_COVERS[promotion.id] || PROMOTION_COVERS.p1

  // RBAC Permission Check
  const [canEdit, setCanEdit] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    setCanEdit(user ? (user.role === 'admin' || user.role === 'editor') : true)

    const handleRoleChange = (e: Event) => {
      const customEvent = e as CustomEvent<User>
      if (customEvent.detail) {
        setCanEdit(customEvent.detail.role === 'admin' || customEvent.detail.role === 'editor')
      }
    }
    window.addEventListener('mmavn-role-changed', handleRoleChange)
    return () => window.removeEventListener('mmavn-role-changed', handleRoleChange)
  }, [])

  // Spotlight Next Event
  const nextEvent = promotion.upcomingEvents && promotion.upcomingEvents.length > 0 
    ? promotion.upcomingEvents[0]
    : {
        id: `next-${promotion.id}`,
        name: `${promotion.shortName} 29: Đêm Quyết Đấu Vô Địch`,
        date: '2026-10-15T19:00:00Z',
        venue: 'Nhà thi đấu Quần Ngựa',
        city: 'Hà Nội',
        status: 'upcoming' as const,
        isNumbered: true,
        eventNumber: 29,
        fights: []
      }

  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${nextEvent.venue}, ${nextEvent.city}`)}`

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <Link 
          href="/giai-dau" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách giải đấu
        </Link>

        {canEdit && (
          <Link
            href={`/admin/promotions?edit=${promotion.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-primary border border-sky-200 text-xs font-bold shadow-xs transition-all"
            title="Chỉnh sửa luật thi đấu, thông tin và đai vô địch trong CMS"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Sửa giải đấu trong CMS</span>
          </Link>
        )}
      </div>

      {/* ========================================================= */}
      {/* 🥊 I. HERO BANNER GIẢI ĐẤU HOÀNH TRÁNG (CLEAN COVER)      */}
      {/* ========================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
        {/* Cover Background */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
          <img
            src={coverImage}
            alt={promotion.name}
            className="w-full h-full object-cover opacity-60 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/30" />

          {/* Top Info Tags */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-sky-200" />
                {promotion.formatType}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs border border-white/20">
                Thành lập {promotion.foundedYear}
              </span>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium text-xs border border-white/20 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-300" />
              {promotion.headquarters}
            </span>
          </div>

          {/* Bottom Title & Tagline */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none flex flex-wrap items-center gap-3">
              {promotion.name}
              <span className="text-base sm:text-xl font-mono font-bold px-3 py-1 rounded-xl bg-white/20 text-white backdrop-blur-md">
                {promotion.shortName}
              </span>
            </h1>
            {promotion.tagline && (
              <p className="text-sm sm:text-lg font-bold italic text-sky-200">
                "{promotion.tagline}"
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed pt-1 line-clamp-2">
              {promotion.formatDescription || promotion.description}
            </p>
          </div>
        </div>

        {/* Key Metrics Bar */}
        {promotion.keyMetrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 bg-white border-t border-slate-200/80">
            {promotion.keyMetrics.map((metric, idx) => (
              <div key={idx} className="p-5 sm:p-6 text-center space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">
                  {metric.value}
                </span>
                {metric.detail && (
                  <p className="text-[11px] text-slate-500 line-clamp-1">{metric.detail}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 🧭 THANH ĐIỀU HƯỚNG CUỘN NHANH TRÊN TOÀN TRANG (SMOOTH)   */}
      {/* ========================================================= */}
      <div className="sticky top-16 z-30 py-2.5 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <a
            href="#su-kien-ke-tiep"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-primary border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Flame className="w-3.5 h-3.5 text-primary" /> Sự kiện kế tiếp ⏳
          </a>
          <a
            href="#dai-vo-dich"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Đai vô địch ({promotion.beltsWithChampions.length})
          </a>
          <a
            href="#tat-ca-su-kien"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-primary border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-500" /> Lịch sự kiện ({allEvents.length})
          </a>
          <a
            href="#vo-si-tieu-bieu"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Users className="w-3.5 h-3.5 text-indigo-500" /> Dàn võ sĩ ({promotion.signatureFighters.length})
          </a>
          <a
            href="#luat-dau"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Quy chuẩn luật đấu
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ⏳ II. SỰ KIỆN KẾ TIẾP + ĐỒNG HỒ ĐẾM NGƯỢC + GOOGLE MAPS   */}
      {/* ========================================================= */}
      <section id="su-kien-ke-tiep" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Flame className="w-6 h-6 text-primary fill-primary/20" /> Sự Kiện Kế Tiếp Của {promotion.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Đêm tranh tài đỉnh cao sắp diễn ra với những trận đối đầu hấp dẫn nhất
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canEdit && (
              <Link
                href="/admin/events"
                className="text-xs text-primary hover:text-sky-700 flex items-center gap-1 underline font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" /> Sửa sự kiện trong CMS
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-primary text-xs font-mono font-bold">
              <Timer className="w-3.5 h-3.5 animate-spin" /> Sắp khởi tranh
            </span>
          </div>
        </div>

        {/* Widescreen Spotlight Event Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Event Info Left */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider shadow-xs">
                  Main Event • Tranh Đai
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono font-semibold">
                  {nextEvent.city}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {nextEvent.name}
              </h3>

              {/* ⏱️ ĐỒNG HỒ ĐẾM NGƯỢC THỜI GIAN THỰC (COUNTDOWN TIMER) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Đếm ngược giờ khai màn trận đấu:
                </span>
                <CountdownTimer targetDate={nextEvent.date} />
              </div>

              {/* Event Details */}
              <div className="space-y-2 text-xs text-slate-600 pt-0.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>Thời gian: <strong className="text-slate-900">20:00 • Thứ Bảy, 15/10/2026</strong></span>
                </div>

                {/* 📍 GOOGLE MAPS LINK: BẤM VÀO ĐỊA ĐIỂM CHUYỂN SANG BẢN ĐỒ GOOGLE MAP */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Địa điểm:</span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-primary hover:text-sky-700 underline transition-colors group cursor-pointer"
                      title="Xem vị trí nhà thi đấu trên Google Maps"
                    >
                      <span>{nextEvent.venue}, {nextEvent.city}</span>
                      <ExternalLink className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Quy chuẩn: <strong className="text-slate-900">5 Hiệp x 5 Phút • Lồng Bát Giác Quốc Tế</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1.5">
                <Link
                  href="/du-doan"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                >
                  <Flame className="w-4 h-4" /> Dự đoán kết quả trận
                </Link>
                <Link
                  href={`/su-kien/${nextEvent.id}`}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs font-bold transition-all shadow-xs"
                >
                  Xem Fight Card đầy đủ
                </Link>
              </div>
            </div>

            {/* Face-off Visual Right */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-6 flex items-center justify-around gap-3 sm:gap-6 relative overflow-hidden">
              {/* Fighter 1 */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-amber-400 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200&auto=format&fit=crop&q=80"
                      alt="Trần Quang Lộc"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 border border-white text-[10px] sm:text-[11px] flex items-center justify-center shadow-xs">
                    👑
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Trần Quang Lộc</h4>
                  <p className="text-xs text-amber-700 italic">"Quái Vật Biển"</p>
                  <span className="text-[10px] sm:text-[11px] text-emerald-600 font-mono font-bold">8W - 0L • ĐKVĐ</span>
                </div>
              </div>

              {/* VS Center */}
              <div className="flex flex-col items-center justify-center relative z-10 shrink-0">
                <span className="text-2xl sm:text-3xl font-black italic text-primary font-mono">
                  VS
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                  Tranh Đai 70kg
                </span>
              </div>

              {/* Fighter 2 */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-sky-500 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                      alt="Võ Thành Đạt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary border border-white text-[10px] font-bold text-white flex items-center justify-center shadow-xs">
                    #1
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Võ Thành Đạt</h4>
                  <p className="text-xs text-sky-600 italic">"Cỗ Máy"</p>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono font-bold">14W - 4L • Thách Đấu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 🏆 III. HỆ THỐNG ĐAI VÔ ĐỊCH (CHAMPIONSHIP BELTS)          */}
      {/* ========================================================= */}
      <section id="dai-vo-dich" className="space-y-6 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Trophy className="w-6 h-6 text-amber-500" /> Hệ Thống Đai Vô Địch {promotion.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Danh sách các hạng cân chính thức và các đương kim vô địch đang giữ đai
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canEdit && (
              <Link
                href={`/admin/promotions?edit=${promotion.id}`}
                className="text-xs text-primary hover:text-sky-700 flex items-center gap-1 underline font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" /> Quản lý đai trong CMS
              </Link>
            )}
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
              {activeChampions.length} Đã có chủ / {promotion.beltsWithChampions.length} Hạng cân
            </span>
          </div>
        </div>

        {/* Active Champions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotion.beltsWithChampions.map((belt) => {
            const champion = belt.currentChampion
            return (
              <div
                key={belt.id}
                className={cn(
                  "rounded-3xl p-6 border transition-all shadow-xs flex flex-col justify-between group",
                  champion
                    ? "bg-amber-50/30 border-amber-200/90 hover:border-amber-300 hover:shadow-md"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                      {belt.weightLimit} kg • {belt.gender === 'male' ? 'Nam' : 'Nữ'}
                    </span>
                    <span className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono",
                      champion ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-slate-100 text-slate-500"
                    )}>
                      {champion ? '👑 ĐÃ CÓ CHỦ' : 'ĐAI TRỐNG'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {belt.divisionName}
                  </h4>

                  {champion ? (
                    <div className="flex items-center gap-3.5 mt-4 p-3 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-100 shrink-0 shadow-xs">
                        <img
                          src={champion.avatar || champion.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                          alt={champion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/vo-si/${champion.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary transition-colors block truncate"
                        >
                          {champion.name}
                        </Link>
                        {champion.nickname && (
                          <p className="text-xs text-amber-700 italic truncate">"{champion.nickname}"</p>
                        )}
                        <span className="text-[11px] text-emerald-600 font-mono font-semibold">
                          {champion.record.wins}W - {champion.record.losses}L • Bảo vệ: {belt.defenseCount || 1} lần
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                      Đai đang bỏ trống — Chờ trận tranh đai tại sự kiện tiếp theo
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Quy chuẩn: <strong className="text-slate-800">Unified 5 Hiệp</strong></span>
                  <span className="text-amber-700 font-bold font-mono">Đai Vàng {promotion.shortName}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 📅 IV. LỊCH TRÌNH SỰ KIỆN (ALL EVENTS)                    */}
      {/* ========================================================= */}
      <section id="tat-ca-su-kien" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-primary" /> Lịch Trình Sự Kiện Thi Đấu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Các đêm thi đấu đỉnh cao đã diễn ra và kế hoạch các chặng sắp tới
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canEdit && (
              <Link
                href="/admin/events"
                className="text-xs text-primary hover:text-sky-700 flex items-center gap-1 underline font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" /> Quản lý sự kiện trong CMS
              </Link>
            )}
            <Link
              href="/su-kien"
              className="text-xs font-bold text-primary hover:text-sky-700 flex items-center gap-1"
            >
              Xem toàn bộ sự kiện <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 🥊 V. DÀN VÕ SĨ TIÊU BIỂU (SIGNATURE FIGHTERS)            */}
      {/* ========================================================= */}
      <section id="vo-si-tieu-bieu" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Users className="w-6 h-6 text-indigo-600" /> Dàn Võ Sĩ Trụ Cột
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Những gương mặt biểu tượng làm nên bản sắc và danh tiếng của {promotion.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canEdit && (
              <Link
                href="/admin/fighters"
                className="text-xs text-primary hover:text-sky-700 flex items-center gap-1 underline font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" /> Quản lý võ sĩ trong CMS
              </Link>
            )}
            <Link
              href="/vo-si"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Khám phá 60+ võ sĩ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {promotion.signatureFighters.map((fighter) => (
            <FighterCard key={fighter.id} fighter={fighter} />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 📖 VI. LUẬT ĐẤU & QUY CHUẨN KỸ THUẬT                      */}
      {/* ========================================================= */}
      <section id="luat-dau" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-emerald-600" /> Luật Đấu & Quy Chuẩn Kỹ Thuật
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bộ quy tắc điều hành, hệ thống chấm điểm và trang bị thi đấu chính thức
            </p>
          </div>

          {canEdit && (
            <Link
              href={`/admin/promotions?id=${promotion.id}`}
              className="text-xs text-primary hover:text-sky-700 flex items-center gap-1 underline font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" /> Chỉnh sửa luật trong CMS
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Sàn đấu & Thời lượng */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Sàn Đấu & Thời Gian Thi Đấu
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-0.5">Quy cách lồng đấu:</strong>
                <p>{promotion.rules?.cageType || 'Lồng bát giác tiêu chuẩn 9m'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Thời lượng hiệp đấu:</strong>
                <p>{promotion.rules?.roundDuration || '3 hiệp x 5 phút | Tranh đai 5 hiệp x 5 phút'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Trang bị thi đấu:</strong>
                <p>{promotion.rules?.equipment || 'Găng MMA hở ngón 4oz, bảo hộ hàm tiêu chuẩn'}</p>
              </div>
            </div>
          </div>

          {/* Box 2: Đòn đánh & Quy tắc an toàn */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-500" /> Đòn Đánh & Địa Chiến (Striking & Ground)
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-0.5">Đòn chỏ (Elbow Strikes):</strong>
                <p>{promotion.rules?.elbowStrikes || 'Áp dụng theo bộ luật Unified Rules'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Đòn gối (Knees):</strong>
                <p>{promotion.rules?.kneesToHead || 'Cho phép khi cả hai võ sĩ đứng'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Đánh nằm (Ground and Pound):</strong>
                <p>{promotion.rules?.groundAndPound || 'Được phép đấm và chỏ vào phần thân và mặt'}</p>
              </div>
            </div>
          </div>

          {/* Box 3: Hệ thống tính điểm */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-sky-600" /> Trọng Tài & Tính Điểm
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-0.5">Hệ thống tính điểm:</strong>
                <p>{promotion.rules?.scoringSystem || 'Hệ thống 10-Point Must System'}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Quy chuẩn cân trọng lượng:</strong>
                <p>{promotion.rules?.weightCutting || 'Cân chính thức 24h trước trận đấu'}</p>
              </div>
            </div>
          </div>

          {/* Box 4: Điểm nhấn đặc sắc */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Đặc Điểm & Quy Chế Riêng
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {(promotion.rules?.specialRules || [
                'Quy trình kiểm tra y tế và xét nghiệm nghiêm ngặt',
                'Đai vô địch mạ vàng danh giá bảo trợ bởi VMMAF'
              ]).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
