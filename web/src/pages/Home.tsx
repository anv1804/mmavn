import { useNavigate } from "react-router-dom";
import { mmaClubs } from "../data/clubs";

export default function Home() {
  const navigate = useNavigate();
  const totalFighters = mmaClubs.reduce((sum, club) => sum + club.statistics.lionFighters, 0);
  const totalWins = mmaClubs.reduce((sum, club) => sum + club.statistics.wins, 0);
  const totalKOs = mmaClubs.reduce((sum, club) => sum + club.statistics.koWins, 0);

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,30,39,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── HERO BANNER ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-red-400 font-bold uppercase">PORTAL CHÍNH THỨC</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              VÕ THUẬT TỔNG HỢP <br/>
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                VIỆT NAM 2026
              </span>
            </h1>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl font-light">
              Cổng thông tin tổng hợp cập nhật bảng xếp hạng LION Championship, lịch thi đấu đấu trường thế giới UFC, hồ sơ chi tiết võ đường và kết nối cộng đồng võ thuật Việt Nam.
            </p>

            <div className="pt-4 flex flex-wrap gap-3.5">
              <button
                onClick={() => navigate("/lion")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-widest border-none cursor-pointer transition-all shadow-lg shadow-red-600/20"
              >
                <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-4 h-4 object-contain rounded-full brightness-110" />
                <span>Bảng xếp hạng LION</span>
              </button>
              <button
                onClick={() => navigate("/community")}
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all"
              >
                💬 Diễn đàn thảo luận
              </button>
            </div>
          </div>

          {/* Quick stats sidebar */}
          <div className="lg:col-span-4 rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_75%)] pointer-events-none" />
            <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-3">
              📊 SỐ LIỆU HỆ THỐNG
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "VÕ SĨ LION HOẠT ĐỘNG", val: totalFighters, color: "text-white" },
                { label: "TỔNG SỐ CHIẾN THẮNG", val: totalWins, color: "text-red-400" },
                { label: "THẮNG BẰNG KO / SUB", val: totalKOs, color: "text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-zinc-900/30 last:border-0">
                  <span className="text-[10px] text-zinc-400 font-mono tracking-wider">{stat.label}</span>
                  <span className={`text-xl font-black ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CLUBS SECTION ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-8">
          <div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">VÕ ĐƯỜNG LIÊN KẾT</span>
            <h2 className="text-2xl font-black uppercase text-white">CÁC LÒ ĐÀO TẠO MMA HÀNG ĐẦU</h2>
          </div>
          <button 
            onClick={() => navigate("/community")} 
            className="text-[10px] font-mono tracking-widest text-red-500 hover:text-red-400 bg-transparent border-none cursor-pointer"
          >
            XEM TẤT CẢ &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mmaClubs.slice(0, 3).map((club) => {
            const ratio = club.statistics.wins + club.statistics.losses > 0 
              ? Math.round((club.statistics.wins / (club.statistics.wins + club.statistics.losses)) * 100) 
              : 0;
            return (
              <div 
                key={club.id} 
                className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 flex flex-col justify-between hover:border-red-500/20 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-md">
                      {club.city}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">
                      Est: {club.foundedYear || "N/A"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-white text-base group-hover:text-red-400 transition-colors leading-tight">
                      {club.name}
                    </h3>
                    <p className="text-[9px] font-mono text-zinc-500 mt-1">HLV TRƯỞNG: {club.headCoach}</p>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {club.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {club.disciplines.map((d, i) => (
                      <span key={i} className="text-[8px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900/60 mt-6 space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                    <span>TỈ LỆ THẮNG <span className="text-white font-bold">{ratio}%</span></span>
                    <span>{club.statistics.wins}W - {club.statistics.losses}L</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" 
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
