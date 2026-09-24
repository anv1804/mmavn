'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Swords,
  Share2,
  Play,
  Maximize2,
  X,
  Building2,
  Ruler,
  Scale,
  Zap,
  Flame,
  Shield,
  Eye,
  CheckCircle2,
  FileText,
  ChevronRight,
  ChevronLeft,
  Edit3,
  Calendar,
  Image as ImageIcon,
  Award,
  Crown,
  Medal,
  Clock,
  ExternalLink,
  ArrowLeft
} from 'lucide-react'
import { RadarChart } from '@/components/charts/RadarChart'
import { cn } from '@/lib/utils'
import type { Fighter, Division, Gym, Article } from '@/types'
import type { User } from '@/types/admin'
import { getCurrentUser } from '@/lib/services/admin-service'
import { useLiveFighter } from '@/lib/services/data-store'
import { rankings } from '@/data/mock-data'

// Social Media Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

interface FormattedFight {
  id: string
  eventId: string
  fighter1: { id: string; name: string; nickname?: string; avatar?: string; record: { wins: number; losses: number; draws: number } }
  fighter2: { id: string; name: string; nickname?: string; avatar?: string; record: { wins: number; losses: number; draws: number } }
  division?: { name: string; nameVi: string; weightLimit: number }
  numberOfRounds: number
  isTitleFight: boolean
  isMainEvent: boolean
  result?: { winnerId: string; method: string; round: number; time: string }
}

interface FighterDetailClientProps {
  fighter: Fighter
  division?: Division
  gym?: Gym
  fights: FormattedFight[]
  relatedArticles: Article[]
}

// Multi-Promotion & Multi-Division Rankings Helper
interface FighterRankingEntry {
  promotionName: string
  promotionSlug: string
  promotionBadgeColor: string
  divisionName: string
  weightLimit: number
  rankTitle: string
  rankBadge: string
  isChampion: boolean
  recordAtPromotion: string
  statusText: string
}

function getFighterRankings(fighter: Fighter, division?: Division): FighterRankingEntry[] {
  const ranking = rankings.find(r => r.fighterId === fighter.id && r.divisionId === fighter.divisionId)
  const isChamp = Boolean(fighter.isChampion)
  const rankPos = isChamp ? '👑 #C' : (ranking ? `#${ranking.position}` : '#Contender')
  const rankTitle = isChamp
    ? 'ĐƯƠNG KIM VÔ ĐỊCH'
    : (fighter.championshipTitle || (ranking ? `ỨNG VIÊN TOP ${ranking.position}` : 'VÕ SĨ XẾP HẠNG'))

  return [
    {
      promotionName: 'LION Championship',
      promotionSlug: 'lion-championship',
      promotionBadgeColor: isChamp ? 'from-amber-500 to-yellow-600' : 'from-red-600 to-rose-600',
      divisionName: division?.nameVi ? `${division.nameVi} (${division.weightLimit}kg)` : 'MMA Chuyên Nghiệp',
      weightLimit: division?.weightLimit || 70,
      rankTitle,
      rankBadge: rankPos,
      isChampion: isChamp,
      recordAtPromotion: `${fighter.record.wins}W - ${fighter.record.losses}L - ${fighter.record.draws}D`,
      statusText: isChamp ? 'Đang giữ đai vô địch' : `${fighter.eloRating} ELO Rating`
    },
    {
      promotionName: 'Bảng Xếp Hạng Quốc Gia',
      promotionSlug: 'p4p',
      promotionBadgeColor: 'from-emerald-600 to-teal-600',
      divisionName: 'MMA Việt Nam Toàn Năng',
      weightLimit: division?.weightLimit || 70,
      rankTitle: isChamp ? 'TOP 1 ĐỈNH BẢNG QUỐC GIA' : 'VÕ SĨ HẠNG A QUỐC GIA',
      rankBadge: `${fighter.eloRating} Elo`,
      isChampion: false,
      recordAtPromotion: `${fighter.styles.join(', ')}`,
      statusText: `${fighter.record.winsByKo} KOs, ${fighter.record.winsBySub} Submissions`
    }
  ]
}

export function FighterDetailClient({
  fighter: initialFighter,
  division,
  gym,
  fights,
  relatedArticles
}: FighterDetailClientProps) {
  // Live reactive fighter data from DataStore (updates immediately when edited in CMS)
  const liveFighter = useLiveFighter(initialFighter.id, initialFighter)
  const fighter = liveFighter ? { ...initialFighter, ...liveFighter } : initialFighter

  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string; title?: string } | null>(null)
  const [activeVideo, setActiveVideo] = useState<{ title: string; url?: string; thumbnail: string } | null>(null)
  const galleryScrollRef = useRef<HTMLDivElement>(null)

  // Role-Based Access Control
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

  // Calculations
  const { wins, losses, draws, winsByKo = 0, winsBySub = 0, winsByDec = 0 } = fighter.record
  const totalWins = winsByKo + winsBySub + winsByDec || wins || 1
  const koPct = Math.round((winsByKo / totalWins) * 100) || (wins > 0 ? 50 : 0)
  const subPct = Math.round((winsBySub / totalWins) * 100) || (wins > 0 ? 30 : 0)
  const decPct = Math.round((winsByDec / totalWins) * 100) || (wins > 0 ? 20 : 0)

  // Vertical standing fighter image (Poster stance)
  const standingImage = fighter.fullBodyImage || fighter.image || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&auto=format&fit=crop&q=80'
  const avatarImage = fighter.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'

  // Quote text
  const quoteText = fighter.quote || `Bước vào lồng bát giác, chỉ có bản lĩnh, sự khổ luyện và ý chí thép mới trả lời được tất cả.`
  const quoteAuthor = fighter.quoteAuthor || `${fighter.name} ${fighter.nickname ? `"${fighter.nickname}"` : ''}`

  // Multi-promotion rankings
  const rankingsList = getFighterRankings(fighter, division)

  // Slide controls for Horizontal Gallery
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <Link 
          href="/vo-si" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách võ sĩ
        </Link>

        {canEdit && (
          <Link
            href={`/admin/fighters?edit=${fighter.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-primary border border-sky-200 text-xs font-bold shadow-xs transition-all"
            title="Chỉnh sửa chỉ số, thành tích và ảnh võ sĩ trong CMS"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Sửa võ sĩ trong CMS</span>
          </Link>
        )}
      </div>

      {/* ========================================================= */}
      {/* 🥊 I. HERO SECTION: BỐ CỤC MỞ, TRẢI DÀI THOÁNG ĐÃNG        */}
      {/* ========================================================= */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* CỘT TRÁI: ẢNH VÕ SĨ ĐỨNG DỌC + AVATAR Ở DƯỚI VÀO GIỮA */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 1. ẢNH DỌC VÕ SĨ ĐỨNG */}
            <div className="relative w-full max-w-[330px] h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-md group border border-slate-200/90 bg-slate-100">
              <img
                src={standingImage}
                alt={fighter.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-slate-800 uppercase tracking-wider shadow-xs">
                  {division?.nameVi || 'MMA'} • {division?.weightLimit}kg
                </span>
                <span className="px-3.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-[11px] font-mono font-bold text-white shadow-xs">
                  ★ {fighter.eloRating} ELO
                </span>
              </div>
            </div>

            {/* 2. AVATAR TRÒN NẰM Ở DƯỚI ĐÁY VÀ VÀO CHÍNH GIỮA */}
            <div className="-mt-14 relative z-20 flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full p-1 bg-white shadow-md border border-slate-200">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                  <img
                    src={avatarImage}
                    alt={fighter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {fighter.isChampion && (
                  <span
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs shadow-xs"
                    title="Đương kim Vô địch"
                  >
                    👑
                  </span>
                )}
              </div>

              {/* 3. TÊN Ở DƯỚI VÀ CĂN GIỮA */}
              <div className="text-center mt-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {fighter.name}
                </h2>
                {fighter.nickname && (
                  <p className="text-sm sm:text-base font-bold italic text-primary mt-0.5">
                    "{fighter.nickname}"
                  </p>
                )}
                <p className="text-xs text-slate-500 font-medium mt-1">
                  CLB {gym?.name || 'Tự do'} • 🇻🇳 Việt Nam
                </p>
              </div>

              {/* 4. CỤM NÚT MẠNG XÃ HỘI */}
              <div className="flex items-center gap-2.5 mt-4">
                {fighter.socialLinks?.facebook && (
                  <a
                    href={fighter.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-xs"
                    title="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {fighter.socialLinks?.instagram && (
                  <a
                    href={fighter.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-pink-600 hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center shadow-xs"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {fighter.socialLinks?.youtube && (
                  <a
                    href={fighter.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-xs"
                    title="YouTube"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>
                )}
                {fighter.socialLinks?.tiktok && (
                  <a
                    href={fighter.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-xs"
                    title="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                )}
                {!fighter.socialLinks?.facebook && !fighter.socialLinks?.instagram && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
                    <span>Võ sĩ xác thực</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHI TIẾT HỒ SƠ */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {fighter.isChampion && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider border border-amber-200 shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  {fighter.championshipTitle || 'Đương Kim Vô Địch'}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                {division?.nameVi || 'MMA'} ({division?.weightLimit} kg)
              </span>
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-primary text-xs font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> CLB {gym?.name || 'Tự do'}
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                {fighter.name}
              </h1>
              {fighter.nickname && (
                <p className="text-2xl sm:text-3xl font-bold italic text-primary mt-2">
                  "{fighter.nickname}"
                </p>
              )}
            </div>

            {/* 💬 CÂU NÓI TRÍCH DẪN */}
            <div className="rounded-2xl bg-sky-50/60 border-l-4 border-primary p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="text-3xl text-primary font-serif select-none leading-none -mt-1">“</span>
                <p className="text-sm sm:text-base text-slate-700 italic font-serif leading-relaxed flex-1">
                  {quoteText}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pl-6 pt-2 border-t border-sky-100">
                <span className="text-xs font-bold text-primary font-mono">
                  — {quoteAuthor}
                </span>

                {canEdit && (
                  <Link
                    href={`/admin/fighters?edit=${fighter.id}`}
                    className="text-[11px] text-primary hover:text-sky-700 flex items-center gap-1 font-medium underline"
                  >
                    <Edit3 className="w-3 h-3" /> Sửa trong CMS
                  </Link>
                )}
              </div>
            </div>

            {/* 📜 TIỂU SỬ SỰ NGHIỆP (NẾU CÓ) */}
            {fighter.bio && (
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 space-y-1.5 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Tiểu Sử Võ Sĩ
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {fighter.bio}
                </p>
              </div>
            )}

            {/* BẢNG THÔNG SỐ NHANH */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">Thành tích Pro</span>
                <div className="text-2xl font-black font-mono mt-1">
                  <span className="text-emerald-600">{wins}W</span>
                  <span className="text-slate-300 mx-1.5">-</span>
                  <span className="text-rose-600">{losses}L</span>
                  {draws > 0 && <span className="text-slate-400 text-base font-normal ml-1">({draws}D)</span>}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">Tỷ lệ KO/TKO</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                  {koPct}%
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">Tỷ lệ Khóa Siết</span>
                <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">
                  {subPct}%
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">CLB Chủ Quản</span>
                <span className="text-sm font-bold text-slate-800 mt-1.5 block truncate" title={gym?.name}>
                  {gym?.name || 'Tự do'}
                </span>
              </div>
            </div>

            {/* THÔNG SỐ THỂ CHẤT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] block">Chiều cao</span>
                  <strong className="text-slate-900 font-mono">{fighter.height} cm</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] block">Sải tay</span>
                  <strong className="text-slate-900 font-mono">{fighter.reach} cm</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] block">Hạng cân</span>
                  <strong className="text-slate-900 font-mono">{division?.weightLimit || 70} kg</strong>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] block">Khu vực CLB</span>
                  <strong className="text-slate-900 truncate block max-w-[90px]">{gym?.city || 'TP.HCM'}</strong>
                </div>
              </div>
            </div>

            {/* PHONG CÁCH VÕ THUẬT & NÚT HÀNH ĐỘNG */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap gap-2">
                {fighter.styles.map((style) => (
                  <span
                    key={style}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200/80"
                  >
                    {style}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/so-sanh?fighter1=${fighter.id}`}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                >
                  <Swords className="w-4 h-4" /> So sánh đối đầu
                </Link>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Đã copy liên kết hồ sơ võ sĩ!')
                    }
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90 transition-all cursor-pointer shadow-xs"
                  title="Chia sẻ hồ sơ"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 🧭 THANH ĐIỀU HƯỚNG CUỘN NHANH TRÊN TOÀN TRANG (SMOOTH)   */}
      {/* ========================================================= */}
      <div className="sticky top-16 z-30 py-2.5 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <a
            href="#bxh"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Bảng xếp hạng ({rankingsList.length})
          </a>
          <a
            href="#chi-so"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-primary border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Zap className="w-3.5 h-3.5 text-primary" /> Chỉ số & Kỹ năng
          </a>
          <a
            href="#lich-su"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-primary border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Swords className="w-3.5 h-3.5 text-amber-600" /> Lịch sử thi đấu ({fights.length})
          </a>
          <a
            href="#album-anh"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-primary border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <ImageIcon className="w-3.5 h-3.5 text-sky-500" /> Album ảnh ({fighter.gallery?.length || 6})
          </a>
          <a
            href="#video"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <Play className="w-3.5 h-3.5 text-rose-500" /> Video ({fighter.highlightVideos?.length || 4})
          </a>
          <a
            href="#bai-viet"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/60 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap text-slate-700"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" /> Bài viết ({relatedArticles.length})
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🏆 PHẦN MỚI: BẢNG XẾP HẠNG HIỆN TẠI (ĐA GIẢI & HẠNG CÂN)   */}
      {/* ========================================================= */}
      <section id="bxh" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Trophy className="w-6 h-6 text-amber-500" /> Bảng Xếp Hạng & Danh Hiệu Hiện Tại
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Thứ hạng chính thức của võ sĩ trên các đấu trường chuyên nghiệp và các hạng cân thi đấu
            </p>
          </div>
          <Link
            href="/bang-xep-hang"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-sky-700 transition-colors"
          >
            Xem toàn bộ BXH <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rankingsList.map((rank, idx) => (
            <div
              key={idx}
              className={cn(
                "relative rounded-2xl p-5 border transition-all shadow-xs flex flex-col justify-between group",
                rank.isChampion
                  ? "bg-amber-50/40 border-amber-200/90 hover:border-amber-300"
                  : "bg-white border-slate-200/90 hover:border-slate-300"
              )}
            >
              {/* Badge Promotion Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-700 shadow-xs"
                  )}>
                    {rank.promotionName}
                  </span>
                  <span className={cn(
                    "font-mono font-bold text-sm px-2.5 py-0.5 rounded-md",
                    rank.isChampion
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  )}>
                    {rank.rankBadge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {rank.divisionName}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  {rank.rankTitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Thành tích:</span>
                  <strong className="text-slate-800 font-mono">{rank.recordAtPromotion}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Trạng thái:</span>
                  <strong className={rank.isChampion ? "text-amber-700" : "text-slate-700"}>
                    {rank.statusText}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 📊 PHẦN 1: CHỈ SỐ & KỸ NĂNG (TRẢI DÀI TRÊN TRANG)         */}
      {/* ========================================================= */}
      <section id="chi-so" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-primary" /> Chỉ Số & Phân Tích Kỹ Năng
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Đánh giá toàn diện 6 chiều võ thuật và hiệu suất thực chiến lồng bát giác
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            ★ {fighter.eloRating} Elo Rating
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: BIỂU ĐỒ RADAR 6 CHIỀU */}
          <div className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Zap className="w-4 h-4 text-primary" />
                <span>Kỹ Năng Toàn Diện (6 Chiều)</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Đánh Đứng • Vật • Khóa Siết • Địa Chiến • Phòng Thủ • Thể Lực</p>
            </div>

            <div className="w-full max-w-[340px] mx-auto py-1">
              <RadarChart stats={fighter.stats} size={270} />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Thang điểm: <strong className="text-slate-800">1 - 5 Sao</strong></span>
              <span className="text-emerald-600 font-mono font-bold">Chỉ số Pro MMA</span>
            </div>
          </div>

          {/* Card 2: HIỆU SUẤT TẤN CÔNG & PHÒNG THỦ */}
          <div className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Shield className="w-4 h-4 text-sky-600" />
                <span>Hiệu Suất Thực Chiến</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Tỷ lệ chính xác ra đòn và khả năng chống quật ngã</p>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> Chính xác đánh đứng
                  </span>
                  <span className="font-mono text-sky-600 font-bold">{fighter.stats.strikingAccuracy}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${fighter.stats.strikingAccuracy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" /> Phòng thủ đánh đứng
                  </span>
                  <span className="font-mono text-blue-600 font-bold">{fighter.stats.strikingDefense}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${fighter.stats.strikingDefense}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Quật ngã (Vật) thành công
                  </span>
                  <span className="font-mono text-emerald-600 font-bold">{fighter.stats.takedownAccuracy}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${fighter.stats.takedownAccuracy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" /> Chống quật ngã (Chống vật)
                  </span>
                  <span className="font-mono text-teal-600 font-bold">{fighter.stats.takedownDefense}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${fighter.stats.takedownDefense}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Tỉ lệ kết liễu trận
                  </span>
                  <span className="font-mono text-rose-600 font-bold">{fighter.stats.finishRate}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${fighter.stats.finishRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: CƠ CẤU CHIẾN THẮNG & ĐIỂM NỔI BẬT */}
          <div className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Cơ Cấu Phương Thức Thắng</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Phân bổ {wins} trận thắng chuyên nghiệp</p>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-rose-600 font-medium">Knockout / TKO</span>
                  <span className="font-mono text-slate-900 font-bold">{winsByKo} trận ({koPct}%)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${koPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-amber-600 font-medium">Khóa siết (Submission)</span>
                  <span className="font-mono text-slate-900 font-bold">{winsBySub} trận ({subPct}%)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${subPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-sky-600 font-medium">Tính điểm (Decision)</span>
                  <span className="font-mono text-slate-900 font-bold">{winsByDec} trận ({decPct}%)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${decPct}%` }} />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
              <span className="text-slate-400 block text-[11px] font-mono">Đánh giá chuyên môn:</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Võ sĩ có phong cách {fighter.styles.join(', ')} với tỷ lệ thắng sớm {fighter.stats.finishRate}%, sở trường đòn đánh dồn dập.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ⚔️ PHẦN 2: LỊCH SỬ THI ĐẤU (THIẾT KẾ ĐỐI ĐẦU BÁT GIÁC CỰC ĐẸP)*/}
      {/* ========================================================= */}
      <section id="lich-su" className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Swords className="w-6 h-6 text-amber-500" /> Nhật Ký Các Trận Đấu Bát Giác
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Chi tiết đối thủ, hiệp đấu, thời gian và phương thức định đoạt trận
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            Tổng: {fights.length} trận
          </span>
        </div>

        {fights.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
            Chưa có dữ liệu trận đấu cho võ sĩ này.
          </div>
        ) : (
          <div className="space-y-4">
            {fights.map((fight) => {
              const isWinner = fight.result?.winnerId === fighter.id
              const isOpponentFighter1 = fight.fighter1.id !== fighter.id
              const opponent = isOpponentFighter1 ? fight.fighter1 : fight.fighter2
              const isFinished = !!fight.result

              return (
                <div
                  key={fight.id}
                  className="relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden hover:border-sky-300 hover:shadow-md transition-all shadow-xs group"
                >
                  {/* Event Header Banner */}
                  <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-primary font-bold uppercase">LION Championship</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600">{fight.division?.nameVi || 'Hạng Nhẹ'} ({fight.division?.weightLimit}kg)</span>
                      {fight.isTitleFight && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-amber-500" /> Tranh Đai Vô Địch
                          </span>
                        </>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500">
                      {isFinished ? 'Trận đấu chính thức' : 'Trận đấu sắp diễn ra'}
                    </div>
                  </div>

                  {/* 3-Column Face-Off Arena Card */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Góc Trái: Võ Sĩ Của Chúng Ta */}
                    <div className="md:col-span-4 flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-full p-0.5 bg-amber-400 shrink-0 shadow-xs">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                          <img src={avatarImage} alt={fighter.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900">{fighter.name}</span>
                          {fighter.isChampion && <span title="Đương kim vô địch">👑</span>}
                        </div>
                        <p className="text-xs text-primary italic">"{fighter.nickname || 'Chiến binh'}"</p>
                        <span className="text-[11px] font-mono text-emerald-600 font-semibold">{wins}W - {losses}L</span>
                      </div>
                    </div>

                    {/* Ở Giữa: Trọng Tâm Kết Quả / Tỉ Số Hoặc VS */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center py-2 md:py-0 border-y md:border-y-0 md:border-x border-slate-100">
                      {isFinished && fight.result ? (
                        <div className="text-center space-y-1">
                          <div className={cn(
                            "inline-block px-3.5 py-0.5 rounded-full text-xs font-bold font-mono shadow-xs",
                            isWinner ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-rose-100 text-rose-800 border border-rose-200"
                          )}>
                            {isWinner ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
                          </div>
                          <div className="text-base font-black text-slate-900 font-mono tracking-wider">
                            {fight.result.method}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Hiệp {fight.result.round} • {fight.result.time}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <span className="text-xl font-black italic text-primary font-mono tracking-widest block">
                            VS
                          </span>
                          <Link
                            href={`/su-kien/${fight.eventId}`}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-all"
                          >
                            <Flame className="w-3.5 h-3.5" /> Dự đoán ngay
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Góc Phải: Đối Thủ */}
                    <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3.5">
                      <div className="text-left md:text-right">
                        <Link
                          href={`/vo-si/${opponent.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary transition-colors block"
                        >
                          {opponent.name}
                        </Link>
                        {opponent.nickname && (
                          <p className="text-xs text-slate-500 italic">"{opponent.nickname}"</p>
                        )}
                        <span className="text-[11px] font-mono text-slate-500">
                          {opponent.record.wins}W - {opponent.record.losses}L
                        </span>
                      </div>
                      <div className="relative w-14 h-14 rounded-full p-0.5 bg-slate-200 shrink-0 shadow-xs">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {opponent.avatar ? (
                            <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
                          ) : (
                            opponent.name.charAt(0)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 📸 PHẦN 3: ALBUM ẢNH (SLIDE NGANG CAROUSEL TIỆN LỢI)       */}
      {/* ========================================================= */}
      <section id="album-anh" className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <ImageIcon className="w-6 h-6 text-primary" /> Album Ảnh Thi Đấu & Tập Luyện
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Cuộn ngang slide để xem những khoảnh khắc võ đài chân thực
            </p>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollGallery('left')}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-xs"
              title="Trượt sang trái"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-xs"
              title="Trượt sang phải"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={galleryScrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
        >
          {(fighter.gallery || [
            { id: 'g1', url: standingImage, caption: 'Pha tung đòn quyết định hạ gục đối thủ.', title: 'Knockout quyết định' },
            { id: 'g2', url: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1200&auto=format&fit=crop&q=80', caption: 'Lễ đăng quang đai vô địch danh giá.', title: 'Nâng đai vô địch' },
            { id: 'g3', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80', caption: 'Buổi tập huấn thể lực và kỹ chiến thuật tại CLB.', title: 'Tập luyện cường độ cao' },
            { id: 'g4', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80', caption: 'Buổi cân ký chính thức trước trận tranh đai.', title: 'Cân ký chính thức' },
            { id: 'g5', url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1200&auto=format&fit=crop&q=80', caption: 'Kiểm soát thế trận trên mặt sàn bát giác.', title: 'Địa chiến áp đảo' },
            { id: 'g6', url: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=1200&auto=format&fit=crop&q=80', caption: 'Tập trung cao độ trước khi bước vào lồng bát giác.', title: 'Tập trung xuất trận' }
          ]).map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage({ url: item.url, caption: item.caption, title: item.title })}
              className="w-[280px] sm:w-[320px] aspect-[3/4] shrink-0 snap-start group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 cursor-pointer shadow-xs hover:border-sky-300 hover:shadow-md transition-all"
            >
              <img
                src={item.url}
                alt={item.title || 'Ảnh thi đấu'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-amber-300">{item.title || 'Khoảnh khắc MMA'}</span>
                <p className="text-[11px] text-white line-clamp-2 mt-1">{item.caption}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 🎬 PHẦN 4: VIDEO HIGHLIGHTS (THIẾT KẾ COMPACT GỌN GÀNG)   */}
      {/* ========================================================= */}
      <section id="video" className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Play className="w-6 h-6 text-primary fill-primary/20" /> Video Highlights & Khoảnh Khắc Đỉnh Cao
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tuyển tập những màn knock-out kinh điển và phóng sự độc quyền
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            {fighter.highlightVideos?.length || 4} video
          </span>
        </div>

        {/* 2-Column Compact Horizontal Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(fighter.highlightVideos || [
            { id: 'v1', title: `Top 5 pha Knockout kinh điển của ${fighter.name} tại đấu trường MMA`, thumbnail: standingImage, duration: '06:45', views: '280K lượt xem' },
            { id: 'v2', title: `${fighter.name} vs Hoàng Hữu Thái | Toàn bộ trận bảo vệ đai LION 28 mãn nhãn`, thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop&q=80', duration: '15:20', views: '450K lượt xem' },
            { id: 'v3', title: `Hành trình khổ luyện từ võ đường truyền thống tới sàn đấu MMA hiện đại`, thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', duration: '18:10', views: '195K lượt xem' },
            { id: 'v4', title: `Phân tích kỹ thuật đòn thế sở trường của "${fighter.nickname || 'Chiến binh'}"`, thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80', duration: '11:35', views: '135K lượt xem' }
          ]).map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group flex gap-4 p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md cursor-pointer shadow-xs transition-all items-center"
            >
              {/* Compact 16:9 Thumbnail */}
              <div className="relative w-36 sm:w-44 aspect-video shrink-0 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-primary transition-all">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-white">
                  {video.duration}
                </span>
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" /> {video.views}
                  </span>
                  <span>• MMAVN Hub</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 📰 PHẦN 5: BÀI VIẾT LIÊN QUAN (TRẢI DÀI TRÊN TRANG)        */}
      {/* ========================================================= */}
      <section id="bai-viet" className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-indigo-600" /> Tin Tức & Phân Tích Chuyên Sâu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Các bài báo, phỏng vấn và tiêu điểm liên quan tới {fighter.name}
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            {relatedArticles.length} bài viết
          </span>
        </div>

        {relatedArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
            Chưa có bài viết trực tiếp nào về võ sĩ này.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((art) => (
              <Link
                key={art.id}
                href={`/tin-tuc/${art.slug}`}
                className="group rounded-2xl bg-white border border-slate-200/90 overflow-hidden hover:border-sky-300 hover:shadow-md transition-all flex flex-col shadow-xs"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={art.coverImage.startsWith('http') ? art.coverImage : standingImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary text-[10px] font-bold text-white uppercase shadow-xs">
                    {art.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 mt-3 border-t border-slate-100">
                    <span>{art.author}</span>
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      Đọc bài <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 🔍 LIGHTBOX MODAL PHÓNG TO ẢNH                             */}
      {/* ========================================================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#121626] border border-[#1e243b] rounded-3xl overflow-hidden shadow-2xl cursor-default"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title || 'Ảnh phóng to'}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="p-5 bg-[#0e1322] border-t border-[#1e243b]">
              <h4 className="text-base font-bold text-white">{lightboxImage.title || 'Khoảnh khắc võ đài'}</h4>
              <p className="text-xs text-slate-300 mt-1">{lightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🎬 VIDEO PLAYER MOCKUP MODAL                              */}
      {/* ========================================================= */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#121626] border border-[#1e243b] rounded-3xl overflow-hidden shadow-2xl cursor-default"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl mb-3 animate-pulse">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>
                <h4 className="text-lg font-bold text-white max-w-md">{activeVideo.title}</h4>
                <p className="text-xs text-slate-300 mt-2">Trình phát video chất lượng cao MMAVN Hub</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
