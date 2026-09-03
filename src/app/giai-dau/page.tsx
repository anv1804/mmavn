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
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
          <Swords className="w-3.5 h-3.5" />
          <span>Hệ Thống Giải Đấu MMA Việt Nam</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Đấu Trường & <span className="text-primary">Giải Đấu</span> MMA
        </h1>
        
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          Tìm hiểu bản sắc và luật lệ của 3 tổ chức võ thuật tổng hợp tiêu biểu tại Việt Nam: 
          Lồng bát giác chuyên nghiệp (LION), Bệ phóng bán chuyên (GMA), và Đại hội Grand Prix loại trực tiếp (V1).
        </p>
      </div>

      {/* Interactive List & Comparison Client Component */}
      <TournamentListClient 
        promotions={promotions} 
        rulesComparison={rulesComparison} 
      />
    </div>
  )
}
