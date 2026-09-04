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
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-10 pb-20 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-xl font-bold flex items-center gap-1">
              <span>🥊</span>
              <span className="text-primary">MMA</span>
              <span className="text-accent">VN</span>
            </Link>
            <p className="text-muted text-sm max-w-xs">
              Nền tảng dữ liệu, trang bị võ thuật & cộng đồng MMA Việt Nam
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

          {/* Khám phá & Dịch vụ */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Khám phá &amp; Tiện ích</h4>
            <Link href="/cua-hang" className="text-sm text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span>🛍️ Cửa hàng trang bị MMA</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold uppercase">Mới</span>
            </Link>
            <Link href="/vo-si" className="text-sm text-muted hover:text-primary transition-colors">Võ sĩ</Link>
            <Link href="/bang-xep-hang" className="text-sm text-muted hover:text-primary transition-colors">Bảng xếp hạng</Link>
            <Link href="/su-kien" className="text-sm text-muted hover:text-primary transition-colors">Lịch sự kiện</Link>
            <Link href="/dien-dan" className="text-sm text-muted hover:text-primary transition-colors">Diễn đàn</Link>
            <Link href="/so-sanh" className="text-sm text-muted hover:text-primary transition-colors">So sánh võ sĩ</Link>
          </div>

          {/* Kết nối */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Kết nối</h4>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">YouTube</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">TikTok</a>
          </div>
        </div>

        {/* Bottom bar with clearance for floating widgets */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© 2026 MMAVN Hub • All rights reserved</p>
          <p className="text-xs sm:text-sm">Sàn đấu tri thức &amp; Trang bị MMA chính hãng</p>
        </div>
      </div>
    </footer>
  )
}
