import { Metadata } from 'next'
import { NewsfeedForum } from '@/components/forum/NewsfeedForum'
import { MessageSquare, Sparkles, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Diễn đàn & Mạng xã hội Võ thuật MMA Việt Nam | MMAVN Hub',
  description:
    'Newsfeed cộng đồng võ thuật MMA: Cập nhật tin chính thức từ LION Championship, GMA, V1, thảo luận dự đoán trận đấu, chia sẻ kỹ thuật và gắn kết cộng đồng võ đạo.',
}

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Social Newsfeed Page Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#11172a] to-[#0a0d18] border border-border/70 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Bảng Tin Mạng Xã Hội MMAVN</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Diễn Đàn & Bảng Tin Võ Thuật Tổng Hợp
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cập nhật thông báo chính thức từ các giải đấu <strong>LION Championship, GMA, V1</strong>, thảo luận chiến thuật, giao lưu võ sĩ và chia sẻ niềm đam mê đối kháng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-card/60 border border-border/60 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Trạng thái</span>
              <strong className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 justify-center mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Feed
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Newsfeed Experience */}
      <NewsfeedForum />
    </div>
  )
}
