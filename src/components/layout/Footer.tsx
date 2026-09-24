'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return null
  }
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-10 pb-20 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="text-xl font-bold flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-sm border border-sky-200">🥊</span>
              <span className="text-slate-900 font-black">MMA</span>
              <span className="text-primary font-bold">VN</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">Hub</span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Cổng dữ liệu thi đấu, bảng xếp hạng võ sĩ, sự kiện và trang bị võ thuật MMA chính hãng Việt Nam.
            </p>
          </div>

          {/* Giải đấu */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Giải đấu</h4>
            <Link href="/giai-dau" className="text-sm text-slate-500 hover:text-primary transition-colors">Tất cả giải đấu</Link>
            <Link href="/giai-dau/p1" className="text-sm text-slate-500 hover:text-primary transition-colors">LION Championship</Link>
            <Link href="/giai-dau/p2" className="text-sm text-slate-500 hover:text-primary transition-colors">GMA (Gods of Martial Arts)</Link>
            <Link href="/giai-dau/p3" className="text-sm text-slate-500 hover:text-primary transition-colors">V1 Champion</Link>
          </div>

          {/* Khám phá & Dịch vụ */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Khám phá &amp; Tiện ích</h4>
            <Link href="/cua-hang" className="text-sm text-sky-600 font-semibold hover:text-sky-700 transition-colors flex items-center gap-1.5">
              <span>🛍️ Cửa hàng trang bị MMA</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-bold uppercase">Mới</span>
            </Link>
            <Link href="/vo-si" className="text-sm text-slate-500 hover:text-primary transition-colors">Võ sĩ</Link>
            <Link href="/bang-xep-hang" className="text-sm text-slate-500 hover:text-primary transition-colors">Bảng xếp hạng</Link>
            <Link href="/su-kien" className="text-sm text-slate-500 hover:text-primary transition-colors">Lịch sự kiện</Link>
            <Link href="/dien-dan" className="text-sm text-slate-500 hover:text-primary transition-colors">Diễn đàn</Link>
            <Link href="/so-sanh" className="text-sm text-slate-500 hover:text-primary transition-colors">So sánh võ sĩ</Link>
          </div>

          {/* Kết nối */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Kết nối cộng đồng</h4>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-primary transition-colors">Facebook MMAVN</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-primary transition-colors">Kênh YouTube chính thức</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-primary transition-colors">TikTok võ thuật</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MMAVN Hub • Thiết kế hiện đại, tinh gọn và thân thiện</p>
          <p>Dữ liệu võ thuật đối kháng Việt Nam</p>
        </div>
      </div>
    </footer>
  )
}
