import { Metadata } from 'next'
import { getAllGymsWithDetails, getAvailableCities, getAvailableDisciplines } from '@/lib/services/gym-service'
import { GymDirectoryClient } from './GymDirectoryClient'
import { Dumbbell, MapPin, Users, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Danh bạ Phòng tập MMA & Võ thuật Việt Nam | MMAVN Hub',
  description: 'Khám phá các phòng tập MMA, BJJ, Muay Thai, Boxing hàng đầu tại TP.HCM, Hà Nội, Đà Nẵng cùng đội ngũ huấn luyện viên và võ sĩ chuyên nghiệp.',
}

export default function GymDirectoryPage() {
  const gyms = getAllGymsWithDetails()
  const cities = getAvailableCities()
  const disciplines = getAvailableDisciplines()

  const totalFighters = gyms.reduce((acc, g) => acc + g.fighterCount, 0)
  const totalChampions = gyms.reduce((acc, g) => acc + g.championsCount, 0)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card-hover to-card border border-border p-6 md:p-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Mạng lưới lò đào tạo võ thuật</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Danh Bạ <span className="text-primary">Phòng Tập</span> Võ Thuật
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Tra cứu và kết nối với các lò đào tạo MMA, Brazilian Jiu-Jitsu (BJJ), Muay Thai và Boxing chuyên nghiệp hàng đầu trên toàn quốc. Tìm kiếm địa điểm tập luyện lý tưởng, thông tin liên hệ và dàn võ sĩ tiêu biểu.
          </p>

          {/* Highlights stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-foreground">{gyms.length}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Dumbbell className="w-3 h-3 text-primary" />
                CLB / Phòng tập
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-foreground">{cities.length - 1}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-accent" />
                Thành phố lớn
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-foreground">{totalFighters}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Users className="w-3 h-3 text-green-400" />
                Võ sĩ hoạt động
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <div className="text-2xl font-bold text-foreground">{totalChampions}</div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <Trophy className="w-3 h-3 text-amber-400" />
                Nhà vô địch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Directory List */}
      <GymDirectoryClient
        initialGyms={gyms}
        cities={cities}
        disciplines={disciplines}
      />
    </div>
  )
}
