import GlassCard from "../components/UI/GlassCard";
import Button from "../components/UI/Button";
import { theme } from "../config/theme";

export default function Home() {
  return (
    <div className={theme.container}>
      {/* Hero section */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
          Thế giới Võ thuật tổng hợp <br />
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Việt Nam & Quốc Tế
          </span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          Cập nhật tin tức, sự kiện võ thuật tổng hợp LION Championship và UFC. Cộng đồng dành cho người đam mê đối kháng.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary">LION Championship</Button>
          <Button variant="secondary">UFC Network</Button>
        </div>
      </section>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <GlassCard>
          <span className="text-[10px] text-red-500 font-mono uppercase tracking-widest block mb-2">HOT SỰ KIỆN</span>
          <h2 className="text-xl font-bold mb-4 text-zinc-100">LION Championship 33</h2>
          <p className="text-xs text-zinc-400 mb-6">
            Màn đối đầu nảy lửa giữa các đại diện Việt Nam và võ sĩ quốc tế đến từ Trung Quốc. Xem kết quả chi tiết các trận đấu tại đây.
          </p>
          <Button variant="secondary" className="text-xs">Xem kết quả</Button>
        </GlassCard>

        <GlassCard>
          <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block mb-2">QUỐC TẾ</span>
          <h2 className="text-xl font-bold mb-4 text-zinc-100">UFC 305: Nhận định & Dự đoán</h2>
          <p className="text-xs text-zinc-400 mb-6">
            Trận chiến bảo vệ đai vô địch hạng trung thế giới đầy kịch tính. Xem lịch thi đấu và thông tin phân tích võ sĩ.
          </p>
          <Button variant="secondary" className="text-xs">Xem chi tiết</Button>
        </GlassCard>
      </div>
    </div>
  );
}
