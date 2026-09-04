import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EventCard } from '@/components/event/EventCard'
import { FighterCard } from '@/components/fighter/FighterCard'
import { ArticleCard } from '@/components/article/ArticleCard'
import { Badge } from '@/components/ui/Badge'
import { getUpcomingEventsWithDetails } from '@/lib/services/event-service'
import { getChampions, getTopRankedFighters } from '@/lib/services/fighter-service'
import { getAllPromotions } from '@/lib/services/promotion-service'
import { getAllGymsWithDetails } from '@/lib/services/gym-service'
import { fighters, events, fights, articles, gyms } from '@/data/mock-data'
import Link from 'next/link'
import { 
  ChevronRight, 
  Users, 
  Calendar, 
  Swords, 
  Trophy, 
  Flame, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  Layers,
  Crown,
  Medal,
  MapPin,
  Dumbbell,
  Star,
  CheckCircle2
} from 'lucide-react'

// Specific visual branding for the 3 major national MMA promotions
const PROMOTION_THEMES: Record<string, {
  accentColor: string
  accentBg: string
  borderColor: string
  hoverBorder: string
  bgGradient: string
  tagText: string
  tagBadge: string
  iconBg: string
  specs: { label: string; value: string }[]
}> = {
  p1: {
    accentColor: 'text-red-400',
    accentBg: 'bg-red-500/15',
    borderColor: 'border-red-500/30',
    hoverBorder: 'hover:border-red-500/80',
    bgGradient: 'bg-gradient-to-b from-red-950/25 via-card to-card',
    tagText: 'Pro Cage 9m',
    tagBadge: 'bg-red-500/15 text-red-300 border-red-500/30',
    iconBg: 'bg-red-500/20 text-red-400 border border-red-500/30',
    specs: [
      { label: 'Sàn đấu', value: 'Lồng bát giác Octagon 9m' },
      { label: 'Thời lượng', value: '3x5p (Tranh đai: 5x5p)' },
      { label: 'Hệ thống đai', value: '9 Hạng cân VMMAF' },
    ],
  },
  p2: {
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/80',
    bgGradient: 'bg-gradient-to-b from-emerald-950/25 via-card to-card',
    tagText: 'Semi-Pro Grassroots',
    tagBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    specs: [
      { label: 'Sàn đấu', value: 'Lục giác & Thảm chống sốc' },
      { label: 'Thời lượng', value: '3x3p (Cân cùng ngày)' },
      { label: 'Mục tiêu', value: 'Ươm mầm tài năng trẻ' },
    ],
  },
  p3: {
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/15',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/80',
    bgGradient: 'bg-gradient-to-b from-amber-950/25 via-card to-card',
    tagText: 'Grand Prix Knockout',
    tagBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    iconBg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    specs: [
      { label: 'Sàn đấu', value: 'Ring dây vuông kết hợp rào' },
      { label: 'Thời lượng', value: 'Nhánh đấu loại trực tiếp' },
      { label: 'Đặc trưng', value: 'Thách đấu liên môn đỉnh cao' },
    ],
  },
}

export default function HomePage() {
  const upcomingEvents = getUpcomingEventsWithDetails().slice(0, 3)
  const champions = getChampions()
  const topFighters = getTopRankedFighters().slice(0, 5)
  const latestArticles = articles.slice(0, 3)
  const tournamentPromotions = getAllPromotions()
  const featuredGyms = getAllGymsWithDetails().slice(0, 4)
  const f19 = fighters.find(f => f.id === 'f19')
  const f20 = fighters.find(f => f.id === 'f20')

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 md:py-10 space-y-16 md:space-y-24">
      {/* Modern, Borderless Sports-Tech Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-8 md:py-12">
        {/* Subtle Background Radial Glowing Gradients */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[960px] h-[380px] md:h-[480px] bg-gradient-to-tr from-primary/20 via-primary/8 to-amber-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/10 blur-[90px] rounded-full pointer-events-none -z-10" />

        {/* Hero Content Container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-border/80 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold text-slate-300">
              Cổng thông tin &amp; Đấu trường số MMA Việt Nam
            </span>
            <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary uppercase">
              Live Hub
            </span>
          </div>

          {/* Punchy Hero Typography */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.08] text-white">
              MMA<span className="text-primary">VN</span> <span className="text-amber-400">Hub</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              Sàn đấu tri thức &amp; Đấu trường số MMA Việt Nam
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              Cập nhật bảng xếp hạng Elo chuẩn xác, dữ liệu đối đầu chi tiết, theo dõi LION Championship, GMA, V1 Champion và cộng đồng võ thuật Việt Nam.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/vo-si" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-200">
                <Users className="w-5 h-5" />
                <span>Khám phá Võ sĩ</span>
              </button>
            </Link>

            <Link href="/giai-dau" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base text-slate-200 hover:text-white bg-card/75 hover:bg-card border border-border/80 hover:border-primary/50 backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200">
                <Swords className="w-5 h-5 text-amber-400" />
                <span>Đấu trường &amp; Giải đấu</span>
              </button>
            </Link>
          </div>

          {/* Quick Sub-Link to Rankings */}
          <div className="pt-1">
            <Link 
              href="/bang-xep-hang" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-primary transition-colors py-1 group"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Xem Bảng xếp hạng Elo Pound-for-Pound toàn quốc</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Modern Translucent Glass Cards for KPI Stat Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="bg-card/65 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-5 shadow-lg shadow-black/25 flex items-center gap-4 text-left transition-all duration-200 group hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-white tracking-tight leading-none">
                  {fighters.length}+
                </div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                  Võ sĩ hồ sơ số
                </div>
                <div className="text-[11px] text-slate-400">Chuyên nghiệp &amp; Phong trào</div>
              </div>
            </div>

            <div className="bg-card/65 backdrop-blur-md border border-border/80 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg shadow-black/25 flex items-center gap-4 text-left transition-all duration-200 group hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-white tracking-tight leading-none">
                  {events.length}+
                </div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                  Sự kiện thi đấu
                </div>
                <div className="text-[11px] text-slate-400">LION, GMA, V1 Champion</div>
              </div>
            </div>

            <div className="bg-card/65 backdrop-blur-md border border-border/80 hover:border-cyan-500/50 rounded-2xl p-5 shadow-lg shadow-black/25 flex items-center gap-4 text-left transition-all duration-200 group hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-white tracking-tight leading-none">
                  {fights.length}+
                </div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                  Trận đấu số hóa
                </div>
                <div className="text-[11px] text-slate-400">Dữ liệu đòn &amp; Chỉ số KO/Sub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blockbuster Matchup: Chung kết tranh đai 52kg LC34/LC35 */}
      {f19 && f20 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Tâm Điểm Đại Chiến: Chung Kết Tranh Đai 52kg
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Trận tranh đai vô địch hạng Rơm được mong đợi nhất tại LION Championship 35
                </p>
              </div>
            </div>
            <Link href="/su-kien/e-lc35">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white gap-1 text-xs">
                <span>Chi tiết LC35</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/40 via-card to-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Fighter 1: Lê Hoàng Đức */}
              <Link href={`/vo-si/${f19.id}`} className="flex-1 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-amber-500 to-red-600 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <img src={f19.avatar} alt={f19.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                    #1 Contender
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-primary transition-colors">
                    {f19.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 italic font-medium">"{f19.nickname}"</p>
                  <div className="text-xs text-slate-300 mt-1">
                    <span className="font-mono font-bold text-emerald-400">{f19.record.wins}W</span>
                    <span className="text-slate-500"> - </span>
                    <span className="font-mono font-bold text-rose-400">{f19.record.losses}L</span>
                    <span className="text-slate-400 ml-1">• No.1 Muay Club</span>
                  </div>
                </div>
              </Link>

              {/* VS Centerpiece */}
              <div className="flex flex-col items-center justify-center shrink-0 px-4 py-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-primary/30 animate-pulse">
                  VS
                </div>
                <div className="text-[11px] font-black uppercase tracking-wider text-amber-400 mt-2">
                  5 HIỆP TRANH ĐAI
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  12/09/2026 • NTĐ Xuân Đỉnh
                </div>
              </div>

              {/* Fighter 2: Bùi Đình Khải */}
              <Link href={`/vo-si/${f20.id}`} className="flex-1 flex flex-col sm:flex-row-reverse items-center gap-4 text-center sm:text-right group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-500 to-blue-600 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <img src={f20.avatar} alt={f20.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-1">
                    #2 Contender
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-primary transition-colors">
                    {f20.name}
                  </h3>
                  <p className="text-xs text-cyan-400/90 italic font-medium">"{f20.nickname}"</p>
                  <div className="text-xs text-slate-300 mt-1">
                    <span className="font-mono font-bold text-emerald-400">{f20.record.wins}W</span>
                    <span className="text-slate-500"> - </span>
                    <span className="font-mono font-bold text-rose-400">{f20.record.losses}L</span>
                    <span className="text-slate-400 ml-1">• Xuân Bắc / The Champ</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Matchup Quick Actions */}
            <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Người chiến thắng sẽ chính thức sở hữu đai vô địch 52kg LION đầu tiên trong lịch sử</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link href="/du-doan" className="flex-1 sm:flex-initial">
                  <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xs gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    Bình chọn kết quả
                  </Button>
                </Link>
                <Link href="/su-kien/e-lc35" className="flex-1 sm:flex-initial">
                  <Button variant="outline" size="sm" className="w-full text-xs text-slate-200 hover:text-white border-border">
                    Xem toàn bộ Fight Card
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tournament Hub Showcase: High-tier League Cards */}
      <section className="space-y-6">
        <SectionHeader 
          title="Đấu trường MMA Việt Nam" 
          subtitle="3 tổ chức võ thuật tổng hợp tiêu biểu định hình nền MMA quốc gia"
          action={
            <Link href="/giai-dau">
              <Button variant="ghost" className="text-slate-300 hover:text-white gap-1.5">
                <span>So sánh luật thi đấu</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournamentPromotions.map((promo) => {
            const theme = PROMOTION_THEMES[promo.id] || PROMOTION_THEMES.p1

            return (
              <Link key={promo.id} href={`/giai-dau/${promo.id}`} className="group block">
                <div className={`h-full rounded-2xl border ${theme.borderColor} ${theme.hoverBorder} ${theme.bgGradient} p-6 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl`}>
                  {/* Card Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${theme.tagBadge}`}>
                        {theme.tagText}
                      </div>
                      <span className="text-xs font-medium text-slate-400">
                        Thành lập {promo.foundedYear}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors">
                          {promo.name}
                        </h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${theme.iconBg}`}>
                          {promo.shortName}
                        </span>
                      </div>
                      {promo.tagline && (
                        <p className={`text-xs font-medium mt-1 italic ${theme.accentColor}`}>
                          "{promo.tagline}"
                        </p>
                      )}
                    </div>

                    {/* League Specs List */}
                    <div className="space-y-2 py-3 border-y border-border/60 bg-background/30 rounded-xl px-3 my-2">
                      {theme.specs.map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">{s.label}:</span>
                          <span className="text-slate-200 font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* League Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {promo.formatDescription || promo.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className={`pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold ${theme.accentColor}`}>
                    <span>Khám phá luật đấu &amp; đai vô địch</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="space-y-6">
        <SectionHeader 
          title="Sự kiện sắp diễn ra" 
          subtitle="Lịch thi đấu các giải MMA chuyên nghiệp và bán chuyên trên cả nước"
          action={
            <Link href="/su-kien">
              <Button variant="ghost" className="text-slate-300 hover:text-white gap-1.5">
                <span>Xem tất cả sự kiện</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => {
            const mainEvent = event.fights?.find(f => f.isMainEvent)
            const mainEventStr = mainEvent 
              ? `${mainEvent.fighter1.name} vs ${mainEvent.fighter2.name}`
              : undefined

            return (
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  name: event.name,
                  date: event.date,
                  venue: event.venue,
                  city: event.city,
                  status: event.status,
                  promotionName: event.promotion?.name,
                  totalFights: event.totalFights,
                  mainEventFighters: mainEventStr
                }}
              />
            )
          })}
        </div>
      </section>

      {/* Current Champions Showcase */}
      <section className="space-y-6">
        <SectionHeader 
          title="Nhà vô địch hiện tại" 
          subtitle="Những người nắm giữ đai vàng danh giá của các tổ chức MMA Việt Nam"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {champions.map((f) => (
            <FighterCard
              key={f.id}
              fighter={{
                ...f,
                divisionName: f.division?.nameVi || f.division?.name,
                gymName: f.gym?.name,
              }}
            />
          ))}
        </div>
      </section>

      {/* Top 5 Elo Ranked Fighters - Sleek Leaderboard Table */}
      <section className="space-y-6">
        <SectionHeader 
          title="Top 5 võ sĩ theo Elo Rating" 
          subtitle="Bảng xếp hạng hiệu suất thi đấu cập nhật dựa trên thuật toán Elo quốc tế"
          action={
            <Link href="/bang-xep-hang">
              <Button variant="ghost" className="text-slate-300 hover:text-white gap-1.5">
                <span>Toàn bộ BXH Elo</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        
        <div className="bg-card/75 border border-border/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-background/50 border-b border-border/80 text-xs font-bold uppercase tracking-wider text-slate-400">
            <div className="col-span-1 text-center">Hạng</div>
            <div className="col-span-4">Võ sĩ</div>
            <div className="col-span-3">Hạng cân &amp; CLB</div>
            <div className="col-span-2 text-center">Kỷ lục Pro</div>
            <div className="col-span-2 text-right pr-2">Chỉ số Elo</div>
          </div>

          {/* Leaderboard Rows */}
          <div className="divide-y divide-border/60">
            {topFighters.map((fighter, idx) => {
              const rank = idx + 1
              const divisionName = fighter.division?.nameVi || fighter.division?.name || 'Hạng tự do'
              const gymName = fighter.gym?.name || 'Đang cập nhật'
              const initials = fighter.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
              
              // Normalize Elo progress bar: 1000 = 0%, 1800 = 100%
              const eloPercentage = Math.min(Math.max(((fighter.eloRating - 1000) / 800) * 100, 10), 100)

              // Clean SVG medal rank badges (NO ugly emoji line-wrapping)
              const renderRankBadge = () => {
                if (rank === 1) {
                  return (
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-amber-500/25 to-yellow-600/10 border border-amber-500/50 shadow-md shadow-amber-500/10 text-amber-300">
                      <Crown className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                      <span className="text-[11px] font-black leading-none mt-0.5">#1</span>
                    </div>
                  )
                }
                if (rank === 2) {
                  return (
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-slate-300/20 to-slate-400/5 border border-slate-400/40 shadow-sm text-slate-200">
                      <Medal className="w-4 h-4 text-slate-300" />
                      <span className="text-[11px] font-black leading-none mt-0.5">#2</span>
                    </div>
                  )
                }
                if (rank === 3) {
                  return (
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-b from-amber-700/20 to-amber-800/5 border border-amber-700/40 shadow-sm text-amber-500">
                      <Medal className="w-4 h-4 text-amber-500" />
                      <span className="text-[11px] font-black leading-none mt-0.5">#3</span>
                    </div>
                  )
                }
                return (
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-border/80 font-mono font-bold text-sm text-slate-400">
                    #{rank}
                  </div>
                )
              }

              return (
                <Link
                  key={fighter.id}
                  href={`/vo-si/${fighter.id}`}
                  className="block hover:bg-card-hover/80 transition-colors group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 sm:px-6 py-4 items-center">
                    {/* Rank Number */}
                    <div className="flex md:justify-center items-center gap-3 md:col-span-1">
                      {renderRankBadge()}
                      <span className="md:hidden text-xs font-bold text-slate-400">
                        Hạng #{rank} Toàn quốc
                      </span>
                    </div>

                    {/* Fighter Avatar & Names */}
                    <div className="flex items-center gap-3.5 md:col-span-4 min-w-0">
                      <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-primary via-red-500 to-amber-500 shrink-0 shadow-md">
                        <div className="w-full h-full rounded-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                          {fighter.avatar ? (
                            <img
                              src={fighter.avatar}
                              alt={fighter.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-black text-sm text-slate-200">
                              {initials}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                            {fighter.name}
                          </h4>
                          {fighter.isChampion && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              👑 Vô địch
                            </span>
                          )}
                          {!fighter.isChampion && fighter.championshipTitle?.includes('Cựu') && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                              Cựu VĐ
                            </span>
                          )}
                        </div>
                        {fighter.nickname && (
                          <div className="text-xs font-medium text-amber-400/90 italic truncate">
                            "{fighter.nickname}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Division & Gym */}
                    <div className="md:col-span-3 text-xs space-y-1">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{divisionName}</span>
                      </div>
                      <div className="text-slate-400 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{gymName}</span>
                      </div>
                    </div>

                    {/* Pro Record */}
                    <div className="md:col-span-2 md:text-center text-xs">
                      <span className="md:hidden text-slate-400 mr-2">Thành tích:</span>
                      <span className="font-bold font-mono text-sm">
                        <span className="text-emerald-400">{fighter.record.wins}W</span>
                        <span className="text-slate-500 mx-1">-</span>
                        <span className="text-rose-400">{fighter.record.losses}L</span>
                        {fighter.record.draws > 0 && (
                          <>
                            <span className="text-slate-500 mx-1">-</span>
                            <span className="text-slate-400">{fighter.record.draws}D</span>
                          </>
                        )}
                      </span>
                      <div className="text-[10px] text-slate-500 hidden md:block mt-0.5">
                        {fighter.record.winsByKo} KO • {fighter.record.winsBySub} Sub
                      </div>
                    </div>

                    {/* Elo Power Progress Bar */}
                    <div className="md:col-span-2 space-y-1.5 text-right">
                      <div className="flex items-center justify-between md:justify-end gap-2">
                        <span className="md:hidden text-xs text-slate-400">Điểm Elo:</span>
                        <div className="inline-flex items-center gap-1.5">
                          <span className="font-mono font-black text-base text-white">
                            {Math.round(fighter.eloRating)}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase">
                            ELO
                          </span>
                        </div>
                      </div>
                      {/* Elo Power Bar */}
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                        <div 
                          className="h-full bg-gradient-to-r from-primary via-red-500 to-amber-400 rounded-full shadow-sm shadow-primary/50 transition-all duration-500"
                          style={{ width: `${eloPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Training Academies (Mạng lưới phòng tập tiêu biểu) */}
      <section className="space-y-6">
        <SectionHeader 
          title="Lò Đào Tạo & CLB Hàng Đầu" 
          subtitle="Các trung tâm huấn luyện MMA chuyên nghiệp sản sinh ra những nhà vô địch quốc gia"
          action={
            <Link href="/phong-tap">
              <Button variant="ghost" className="text-slate-300 hover:text-white gap-1.5">
                <span>Xem tất cả 25 CLB</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredGyms.map((gym) => (
            <Link key={gym.id} href="/phong-tap" className="group block">
              <div className="h-full rounded-2xl bg-card border border-border hover:border-primary/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="relative h-32 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={gym.coverImage || gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="primary" size="sm">
                      {gym.city}
                    </Badge>
                  </div>
                  {gym.rating && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-amber-400 text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{gym.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {gym.name}
                    </h4>
                    <p className="text-xs text-muted line-clamp-1 mt-0.5">
                      HLV: {gym.headCoach || 'Ban huấn luyện'}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                    <span className="text-primary font-semibold">
                      {gym.fighterCount} võ sĩ biên chế
                    </span>
                    <span className="text-slate-400 group-hover:text-white flex items-center gap-0.5">
                      Chi tiết <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News & Articles */}
      <section className="space-y-6">
        <SectionHeader 
          title="Tin tức & Điểm tin MMA" 
          subtitle="Phân tích chuyên môn, phỏng vấn võ sĩ và thông báo chính thức từ ban tổ chức"
          action={
            <Link href="/tin-tuc">
              <Button variant="ghost" className="text-slate-300 hover:text-white gap-1.5">
                <span>Xem tất cả tin tức</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article, index) => (
            <div key={article.id} className={index === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
