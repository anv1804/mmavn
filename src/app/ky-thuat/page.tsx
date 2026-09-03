import { Metadata } from 'next'
import { getAllTechniques, getTechniqueStats } from '@/lib/services/technique-service'
import { TechniqueCatalogClient } from './TechniqueCatalogClient'
import { Swords, Zap, Shield, Flame, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thư viện Kỹ thuật MMA & Võ thuật đối kháng | MMAVN Hub',
  description: 'Bách khoa toàn thư kỹ thuật MMA: Đòn đấm đá (Striking), Vật & Quật ngã (Wrestling), Khoá siết (Submissions) và Clinch. Hướng dẫn chi tiết cùng dấu ấn các võ sĩ hàng đầu Việt Nam.',
}

export default function TechniquePage() {
  const techniques = getAllTechniques()
  const stats = getTechniqueStats()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card-hover to-card border border-border p-6 md:p-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bách khoa toàn thư đòn thế</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Thư Viện <span className="text-primary">Kỹ Thuật</span> MMA
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Khám phá hệ thống đòn thế MMA hiện đại phân theo 4 trụ cột chiến thuật: Đòn đấm đá (Striking), Vật & Quật ngã (Wrestling), Khóa siết (Submissions) và Áp sát (Clinch). Xem phân tích chuẩn xác, các bước thực hiện và dấu ấn thi đấu từ những võ sĩ hàng đầu Việt Nam như Nguyễn Trần Duy Nhất, Trần Quang Lộc, Phạm Văn Nam...
          </p>

          {/* Quick stats badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-primary">{stats.strikingCount}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Flame className="w-3 h-3 text-primary" />
                Đòn đấm đá (Striking)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-accent">{stats.wrestlingCount}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Zap className="w-3 h-3 text-accent" />
                Vật & Quật ngã (Wrestling)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-green-400">{stats.submissionCount}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-green-400" />
                Khoá siết (Submissions)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-blue-400">{stats.clinchCount}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Swords className="w-3 h-3 text-blue-400" />
                Áp sát & Clinch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Catalog Client */}
      <TechniqueCatalogClient
        initialTechniques={techniques}
        stats={stats}
      />
    </div>
  )
}
