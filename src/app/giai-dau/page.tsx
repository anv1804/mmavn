import { Metadata } from 'next'
import { getAllPromotionsWithDetails, getPromotionRulesComparison } from '@/lib/services/promotion-service'
import { TournamentListClient } from './TournamentListClient'
import { Badge } from '@/components/ui/Badge'
import { Swords } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Giải Đấu & Đấu Trường MMA Việt Nam | LION Championship, GMA, V1 Champion',
  description: 'Khám phá và so sánh các giải đấu MMA hàng đầu Việt Nam: LION Championship (Pro Cage), GMA (Semi-Pro Grassroots), và V1 Champion (Grand Prix). Luật đấu, đai vô địch và lịch sự kiện.',
}

export default function TournamentsPage() {
  const promotions = getAllPromotionsWithDetails()
  const rulesComparison = getPromotionRulesComparison()

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-8 sm:pt-12 pb-16 space-y-10">
      {/* Header Hero Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-bold shadow-sm">
          <Swords className="w-3.5 h-3.5" />
          <span>Hệ Thống Đấu Trường &amp; Giải Đấu Võ Thuật Tổng Hợp Quốc Gia</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Đấu Trường &amp; <span className="text-primary">Giải Đấu</span> MMA Việt Nam
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Khám phá bản sắc thi đấu, luật lệ kỹ thuật, hệ thống đai vàng và lịch trình sự kiện của 3 tổ chức võ thuật hàng đầu định hình nền MMA chuyên nghiệp Việt Nam.
        </p>

        {/* 4 League Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
          <div className="p-3 rounded-2xl bg-card/70 border border-border/70 text-center">
            <span className="text-2xl font-black text-white font-mono block">3</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Giải đấu chính thức</span>
          </div>
          <div className="p-3 rounded-2xl bg-card/70 border border-border/70 text-center">
            <span className="text-2xl font-black text-amber-400 font-mono block">19</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Đai vô địch các hạng</span>
          </div>
          <div className="p-3 rounded-2xl bg-card/70 border border-border/70 text-center">
            <span className="text-2xl font-black text-emerald-400 font-mono block">45+</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Sự kiện đã tổ chức</span>
          </div>
          <div className="p-3 rounded-2xl bg-card/70 border border-border/70 text-center">
            <span className="text-2xl font-black text-cyan-400 font-mono block">120+</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Võ sĩ thượng đài</span>
          </div>
        </div>
      </div>

      {/* Interactive List & Comparison Client Component */}
      <TournamentListClient 
        promotions={promotions} 
        rulesComparison={rulesComparison} 
      />
    </div>
  )
}
