import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";

export default function CmsDashboard() {
  const { fighters, clubs, events, loading } = useCms();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const card = (label: string, value: number | string, icon: string, sub: string) => (
    <div className={`p-6 border rounded-3xl flex justify-between items-start shadow-lg ${isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"}`}>
      <div className="space-y-4">
        <div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">{label}</span>
          <span className="text-4xl font-bold mt-1 block text-zinc-900 dark:text-white">{value}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 dark:text-red-500 dark:bg-red-500/10 dark:border-red-500/20 px-2 py-0.5 rounded">
          ↗ {sub}
        </span>
      </div>
      <span className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-500/15 flex items-center justify-center text-xl shadow-sm">{icon}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Tổng Quan Hệ Thống</h1>
        <p className="text-xs text-zinc-500 font-light mt-1">Theo dõi hiệu suất và số liệu của nền tảng ngày hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {card("VÕ SĨ HOẠT ĐỘNG", loading ? "..." : fighters.length, "🥋", "Đang hoạt động")}
        {card("VÕ ĐƯỜNG LIÊN KẾT", loading ? "..." : clubs.length, "🏢", "Kết nối ổn định")}
        {card("LỊCH SỰ KIỆN LIVE", loading ? "..." : events.length, "📅", "Đồng bộ hệ thống")}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1 */}
        <div className={`p-6 border rounded-3xl space-y-4 shadow-lg ${isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase">Lượt xem 24 giờ qua</h3>
            <span className="text-[9px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase">Realtime</span>
          </div>
          <div className="h-44 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,28 Q10,25 20,27 T40,25 T60,20 T80,28 T100,28" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="0" y1="29" x2="100" y2="29" stroke={isDark ? "#1f1f23" : "#e4e4e7"} strokeWidth="0.5" />
            </svg>
          </div>
          <div className="flex justify-between text-[8px] text-zinc-400">
            {["11:00","15:00","19:00","23:00","3:00","7:00"].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>

        {/* Graph 2 */}
        <div className={`p-6 border rounded-3xl space-y-4 shadow-lg ${isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase">Lượt xem 7 ngày qua</h3>
            <span className="text-[9px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase">Daily</span>
          </div>
          <div className="h-44 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,29 L50,29 C55,29 58,10 65,10 C70,10 73,20 80,26 C85,29 100,29 100,29" fill="url(#rg2)" />
              <path d="M0,29 L50,29 C55,29 58,10 65,10 C70,10 73,20 80,26 C85,29 100,29 100,29" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="0" y1="29" x2="100" y2="29" stroke={isDark ? "#1f1f23" : "#e4e4e7"} strokeWidth="0.5" />
            </svg>
          </div>
          <div className="flex justify-between text-[8px] text-zinc-400">
            {["10-07","11-07","12-07","13-07","14-07","15-07","16-07"].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
