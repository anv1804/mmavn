'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return null
  }
  return (
    <footer className="bg-card/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-xl font-bold flex items-center gap-1">
              <span>🥊</span>
              <span className="text-primary">MMA</span>
              <span className="text-accent">VN</span>
            </Link>
            <p className="text-muted text-sm max-w-xs">
              Nền tảng dữ liệu & cộng đồng MMA Việt Nam
            </p>
          </div>

          {/* Giải đấu */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Giải đấu</h4>
            <Link href="/giai-dau" className="text-sm text-muted hover:text-primary transition-colors">Tất cả giải đấu</Link>
            <Link href="/giai-dau/p1" className="text-sm text-muted hover:text-primary transition-colors">LION Championship</Link>
            <Link href="/giai-dau/p2" className="text-sm text-muted hover:text-primary transition-colors">GMA (Gods of Martial Arts)</Link>
            <Link href="/giai-dau/p3" className="text-sm text-muted hover:text-primary transition-colors">V1 Champion</Link>
          </div>

          {/* Khám phá */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Khám phá</h4>
            <Link href="/vo-si" className="text-sm text-muted hover:text-primary transition-colors">Võ sĩ</Link>
            <Link href="/bang-xep-hang" className="text-sm text-muted hover:text-primary transition-colors">BXH</Link>
            <Link href="/su-kien" className="text-sm text-muted hover:text-primary transition-colors">Sự kiện</Link>
            <Link href="/phong-tap" className="text-sm text-muted hover:text-primary transition-colors">Phòng tập</Link>
            <Link href="/ky-thuat" className="text-sm text-muted hover:text-primary transition-colors">Kỹ thuật</Link>
            <Link href="/so-sanh" className="text-sm text-muted hover:text-primary transition-colors">So sánh</Link>
          </div>

          {/* Kết nối */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Kết nối</h4>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">YouTube</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">TikTok</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© 2026 MMAVN Hub</p>
          <p>Sàn đấu tri thức MMA Việt Nam</p>
        </div>
      </div>
    </footer>
  )
}
