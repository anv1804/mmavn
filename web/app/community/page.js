import GlassCard from "../../components/UI/GlassCard";
import Button from "../../components/UI/Button";
import { theme } from "../../config/theme";

export default function CommunityPage() {
  return (
    <div className={theme.container}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">Cộng đồng</h1>
            <p className="text-xs text-red-500 font-mono tracking-wider uppercase mt-1">Nơi đàm đạo võ thuật</p>
          </div>
          <Button variant="primary" className="text-xs">Đăng bài viết</Button>
        </div>

        <div className="space-y-4">
          <GlassCard>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-red-600/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded font-mono font-bold">Thảo luận</span>
              <span className="text-[10px] text-zinc-500 font-mono">Đăng bởi Tuấn Nguyễn - 2 giờ trước</span>
            </div>
            <h3 className="font-bold text-sm text-zinc-200">Liệu Duy Nhất có tái xuất LION Championship cuối năm nay?</h3>
            <p className="text-xs text-zinc-400 mt-2">Nhiều tin đồn cho rằng Duy Nhất đang chuẩn bị thể lực để thượng đài một trận siêu kinh điển (Super Fight) trước khi giải nghệ...</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">Kỹ thuật</span>
              <span className="text-[10px] text-zinc-500 font-mono">Đăng bởi Hùng MMA - 1 ngày trước</span>
            </div>
            <h3 className="font-bold text-sm text-zinc-200">Hướng dẫn kỹ thuật siết cổ sau (Rear-Naked Choke) đúng cách</h3>
            <p className="text-xs text-zinc-400 mt-2">Các chi tiết quan trọng cần lưu ý để gài đòn siết chặt và an toàn trong địa chiến, tránh bị đối thủ thoát ra...</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
