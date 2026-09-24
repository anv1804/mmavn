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
    accentColor: 'text-sky-700',
    accentBg: 'bg-sky-50',
    borderColor: 'border-slate-200',
    hoverBorder: 'hover:border-sky-300',
    bgGradient: 'bg-white',
    tagText: 'Pro Cage 9m',
    tagBadge: 'bg-sky-50 text-sky-800 border-sky-200',
    iconBg: 'bg-sky-100 text-sky-700 border border-sky-200',
    specs: [
      { label: 'Sàn đấu', value: 'Lồng bát giác Octagon 9m' },
      { label: 'Thời lượng', value: '3x5p (Tranh đai: 5x5p)' },
      { label: 'Hệ thống đai', value: '9 Hạng cân VMMAF' },
    ],
  },
  p2: {
    accentColor: 'text-blue-700',
    accentBg: 'bg-blue-50',
    borderColor: 'border-slate-200',
    hoverBorder: 'hover:border-blue-300',
    bgGradient: 'bg-white',
    tagText: 'Semi-Pro Grassroots',
    tagBadge: 'bg-blue-50 text-blue-800 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700 border border-blue-200',
    specs: [
      { label: 'Sàn đấu', value: 'Lục giác & Thảm chống sốc' },
      { label: 'Thời lượng', value: '3x3p (Cân cùng ngày)' },
      { label: 'Mục tiêu', value: 'Ươm mầm tài năng trẻ' },
    ],
  },
  p3: {
    accentColor: 'text-indigo-700',
    accentBg: 'bg-indigo-50',
    borderColor: 'border-slate-200',
    hoverBorder: 'hover:border-indigo-300',
    bgGradient: 'bg-white',
    tagText: 'Grand Prix Knockout',
    tagBadge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
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
      {/* Modern, Borderless Clean Webapp Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-8 md:py-12">
        {/* Subtle Background Radial Glowing Gradients */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[960px] h-[380px] md:h-[480px] bg-sky-200/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Hero Content Container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Cổng thông tin &amp; Đấu trường số MMA Việt Nam
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 uppercase border border-sky-100">
              Live Hub
            </span>
          </div>

          {/* Punchy Hero Typography */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
              MMA<span className="text-primary font-bold">VN</span> <span className="text-sky-600 font-bold">Hub</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 tracking-tight">
              Sàn đấu tri thức &amp; Đấu trường số MMA Việt Nam
            </p>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              Cập nhật bảng xếp hạng Elo chuẩn xác, dữ liệu đối đầu chi tiết, theo dõi LION Championship, GMA, V1 Champion và cộng đồng võ thuật Việt Nam.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/vo-si" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white bg-primary hover:bg-sky-600 shadow-xs hover:shadow-md hover:shadow-sky-100 transition-all duration-200 cursor-pointer">
                <Users className="w-4 h-4" />
                <span>Khám phá Võ sĩ</span>
              </button>
            </Link>

            <Link href="/giai-dau" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all duration-200 cursor-pointer">
                <Swords className="w-4 h-4 text-sky-600" />
                <span>Đấu trường &amp; Giải đấu</span>
              </button>
            </Link>
          </div>

          {/* Quick Sub-Link to Rankings */}
          <div className="pt-1">
            <Link 
              href="/bang-xep-hang" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary transition-colors py-1 group"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Xem Bảng xếp hạng Elo Pound-for-Pound toàn quốc</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Modern Clean KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 text-left transition-all duration-200 hover:border-sky-300 hover:shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-primary shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {fighters.length}+
                </div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-1">
                  Võ sĩ hồ sơ số
                </div>
                <div className="text-[11px] text-slate-400">Chuyên nghiệp &amp; Phong trào</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 text-left transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {events.length}+
                </div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-1">
                  Sự kiện thi đấu
                </div>
                <div className="text-[11px] text-slate-400">LION, GMA, V1 Champion</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 text-left transition-all duration-200 hover:border-sky-300 hover:shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {fights.length}+
                </div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-1">
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
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Tâm Điểm Đại Chiến: Chung Kết Tranh Đai 52kg
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Trận tranh đai vô địch hạng Rơm được mong đợi nhất tại LION Championship 35
                </p>
              </div>
            </div>
            <Link href="/su-kien/e-lc35">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 gap-1 text-xs">
                <span>Chi tiết LC35</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Fighter 1: Lê Hoàng Đức */}
              <Link href={`/vo-si/${f19.id}`} className="flex-1 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-slate-200 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <img src={f19.avatar} alt={f19.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-1">
                    #1 Contender
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {f19.name}
                  </h3>
                  <p className="text-xs text-sky-700 italic font-medium">"{f19.nickname}"</p>
                  <div className="text-xs text-slate-600 mt-1">
                    <span className="font-mono font-bold text-emerald-600">{f19.record.wins}W</span>
                    <span className="text-slate-400"> - </span>
                    <span className="font-mono font-bold text-rose-600">{f19.record.losses}L</span>
                    <span className="text-slate-400 ml-1">• No.1 Muay Club</span>
                  </div>
                </div>
              </Link>

              {/* VS Centerpiece */}
              <div className="flex flex-col items-center justify-center shrink-0 px-4 py-2">
                <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-primary font-bold text-sm shadow-xs">
                  VS
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700 mt-1.5">
                  5 HIỆP TRANH ĐAI
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  12/09/2026 • NTĐ Xuân Đỉnh
                </div>
              </div>

              {/* Fighter 2: Bùi Đình Khải */}
              <Link href={`/vo-si/${f20.id}`} className="flex-1 flex flex-col sm:flex-row-reverse items-center gap-4 text-center sm:text-right group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-slate-200 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <img src={f20.avatar} alt={f20.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                    #2 Contender
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {f20.name}
                  </h3>
                  <p className="text-xs text-blue-700 italic font-medium">"{f20.nickname}"</p>
                  <div className="text-xs text-slate-600 mt-1">
                    <span className="font-mono font-bold text-emerald-600">{f20.record.wins}W</span>
                    <span className="text-slate-400"> - </span>
                    <span className="font-mono font-bold text-rose-600">{f20.record.losses}L</span>
                    <span className="text-slate-400 ml-1">• Xuân Bắc / The Champ</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Matchup Quick Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Người chiến thắng sẽ chính thức sở hữu đai vô địch 52kg LION đầu tiên trong lịch sử</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link href="/du-doan" className="flex-1 sm:flex-initial">
                  <Button size="sm" className="w-full text-xs gap-1.5 shadow-xs">
                    <Flame className="w-3.5 h-3.5" />
                    Bình chọn kết quả
                  </Button>
                </Link>
                <Link href="/su-kien/e-lc35" className="flex-1 sm:flex-initial">
                  <Button variant="outline" size="sm" className="w-full text-xs text-slate-700 hover:text-slate-900 border-slate-200">
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
                <div className="h-full rounded-2xl border border-slate-200 hover:border-sky-300 bg-white p-6 shadow-xs transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-50">
                  {/* Card Header */}
                  <div className="space-y-3.5">
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
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
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
                    <div className="space-y-1.5 py-3 border-y border-slate-100 bg-slate-50/70 rounded-xl px-3 my-2">
                      {theme.specs.map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">{s.label}:</span>
                          <span className="text-slate-800 font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* League Description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {promo.formatDescription || promo.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className={`pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${theme.accentColor}`}>
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

      {/* Top 5 Elo Ranked Fighters - Sleek Clean Leaderboard Table */}
      <section className="space-y-6">
        <SectionHeader 
          title="Top 5 võ sĩ theo Elo Rating" 
          subtitle="Bảng xếp hạng hiệu suất thi đấu cập nhật dựa trên thuật toán Elo quốc tế"
          action={
            <Link href="/bang-xep-hang">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-1.5 text-xs font-semibold">
                <span>Toàn bộ BXH Elo</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="col-span-1 text-center">Hạng</div>
            <div className="col-span-4">Võ sĩ</div>
            <div className="col-span-3">Hạng cân &amp; CLB</div>
            <div className="col-span-2 text-center">Kỷ lục Pro</div>
            <div className="col-span-2 text-right pr-2">Chỉ số Elo</div>
          </div>

          {/* Leaderboard Rows */}
          <div className="divide-y divide-slate-100">
            {topFighters.map((fighter, idx) => {
              const rank = idx + 1
              const divisionName = fighter.division?.nameVi || fighter.division?.name || 'Hạng tự do'
              const gymName = fighter.gym?.name || 'Đang cập nhật'
              const initials = fighter.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
              
              // Normalize Elo progress bar: 1000 = 0%, 1800 = 100%
              const eloPercentage = Math.min(Math.max(((fighter.eloRating - 1000) / 800) * 100, 10), 100)

              const renderRankBadge = () => {
                if (rank === 1) {
                  return (
                    <div className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 shadow-xs text-amber-700">
                      <Crown className="w-4 h-4 text-amber-600 fill-amber-300" />
                      <span className="text-[10px] font-black leading-none mt-0.5">#1</span>
                    </div>
                  )
                }
                if (rank === 2) {
                  return (
                    <div className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
                      <Medal className="w-4 h-4 text-slate-500" />
                      <span className="text-[10px] font-black leading-none mt-0.5">#2</span>
                    </div>
                  )
                }
                if (rank === 3) {
                  return (
                    <div className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                      <Medal className="w-4 h-4 text-sky-600" />
                      <span className="text-[10px] font-black leading-none mt-0.5">#3</span>
                    </div>
                  )
                }
                return (
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-xs text-slate-600">
                    #{rank}
                  </div>
                )
              }

              return (
                <Link
                  key={fighter.id}
                  href={`/vo-si/${fighter.id}`}
                  className="block hover:bg-slate-50 transition-colors group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 sm:px-6 py-4 items-center">
                    {/* Rank Number */}
                    <div className="flex md:justify-center items-center gap-3 md:col-span-1">
                      {renderRankBadge()}
                      <span className="md:hidden text-xs font-bold text-slate-500">
                        Hạng #{rank} Toàn quốc
                      </span>
                    </div>

                    {/* Fighter Avatar & Names */}
                    <div className="flex items-center gap-3.5 md:col-span-4 min-w-0">
                      <div className="w-11 h-11 rounded-full p-0.5 bg-slate-200 shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                          {fighter.avatar ? (
                            <img
                              src={fighter.avatar}
                              alt={fighter.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-bold text-xs text-slate-700">
                              {initials}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-tight">
                            {fighter.name}
                          </h4>
                          {fighter.isChampion && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                              👑 Vô địch
                            </span>
                          )}
                          {!fighter.isChampion && fighter.championshipTitle?.includes('Cựu') && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              Cựu VĐ
                            </span>
                          )}
                        </div>
                        {fighter.nickname && (
                          <div className="text-xs font-medium text-sky-700 italic truncate">
                            "{fighter.nickname}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Division & Gym */}
                    <div className="md:col-span-3 text-xs space-y-1">
                      <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{divisionName}</span>
                      </div>
                      <div className="text-slate-400 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{gymName}</span>
                      </div>
                    </div>

                    {/* Pro Record */}
                    <div className="md:col-span-2 md:text-center text-xs">
                      <span className="md:hidden text-slate-400 mr-2">Thành tích:</span>
                      <span className="font-bold font-mono text-sm">
                        <span className="text-emerald-600">{fighter.record.wins}W</span>
                        <span className="text-slate-300 mx-1">-</span>
                        <span className="text-rose-600">{fighter.record.losses}L</span>
                        {fighter.record.draws > 0 && (
                          <>
                            <span className="text-slate-300 mx-1">-</span>
                            <span className="text-slate-400">{fighter.record.draws}D</span>
                          </>
                        )}
                      </span>
                      <div className="text-[10px] text-slate-400 hidden md:block mt-0.5">
                        {fighter.record.winsByKo} KO • {fighter.record.winsBySub} Sub
                      </div>
                    </div>

                    {/* Elo Power Progress Bar */}
                    <div className="md:col-span-2 space-y-1.5 text-right">
                      <div className="flex items-center justify-between md:justify-end gap-2">
                        <span className="md:hidden text-xs text-slate-400">Điểm Elo:</span>
                        <div className="inline-flex items-center gap-1.5">
                          <span className="font-mono font-bold text-sm sm:text-base text-slate-900">
                            {Math.round(fighter.eloRating)}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 uppercase border border-sky-100">
                            ELO
                          </span>
                        </div>
                      </div>
                      {/* Elo Power Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
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
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-1.5 text-xs font-semibold">
                <span>Xem tất cả 25 CLB</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          } 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredGyms.map((gym) => (
            <Link key={gym.id} href="/phong-tap" className="group block">
              <div className="h-full rounded-2xl bg-white border border-slate-200 hover:border-sky-300 overflow-hidden shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-50 flex flex-col">
                <div className="relative h-32 w-full overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={gym.coverImage || gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="primary" size="sm">
                      {gym.city}
                    </Badge>
                  </div>
                  {gym.rating && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/90 shadow-xs text-amber-600 text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{gym.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                      {gym.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      HLV: {gym.headCoach || 'Ban huấn luyện'}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-primary font-semibold">
                      {gym.fighterCount} võ sĩ biên chế
                    </span>
                    <span className="text-slate-400 group-hover:text-primary flex items-center gap-0.5">
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
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 gap-1.5 text-xs font-semibold">
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
