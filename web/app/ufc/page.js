import GlassCard from "../../components/UI/GlassCard";
import Button from "../../components/UI/Button";
import { theme } from "../../config/theme";

export default function UfcPage() {
  return (
    <div className={theme.container}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">UFC</h1>
          <p className="text-xs text-amber-500 font-mono tracking-wider uppercase mt-1">Ultimate Fighting Championship</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <GlassCard>
              <h2 className="text-lg font-bold mb-2">Lịch Thi Đấu UFC (Main Card)</h2>
              <p className="text-xs text-zinc-400">Danh sách các sự kiện UFC Pay-Per-View và UFC Fight Night sắp diễn ra. Cập nhật giờ thi đấu theo múi giờ Việt Nam.</p>
              <Button variant="secondary" className="mt-4 text-xs">Xem lịch phát sóng</Button>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="border-l-4 border-l-amber-500">
              <h3 className="text-sm font-bold mb-2">Trận Đấu Tâm Điểm Tuần</h3>
              <div className="pt-2 space-y-2">
                <p className="text-xs font-bold">Dricus Du Plessis vs Israel Adesanya</p>
                <p className="text-[10px] text-zinc-400">UFC 305 - Trận tranh đai hạng trung</p>
                <Button variant="primary" className="text-[10px] py-1 px-3 mt-2">Dự đoán kết quả</Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
