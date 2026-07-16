import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Dynamic stats
  const [stats, setStats] = useState({
    fighters: 30,
    wins: 152,
    kos: 58
  });
  
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Poll state
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({ tuan: 64, opponent: 36 });

  useEffect(() => {
    async function loadHomeData() {
      try {
        const { data: clubsData } = await supabase
          .from("clubs")
          .select("*")
          .eq("active", true);

        if (clubsData) {
          setClubs(clubsData);
          
          const totalFighters = clubsData.reduce((sum: number, c: any) => sum + (c.statistics.lionFighters || 0), 0);
          const totalWins = clubsData.reduce((sum: number, c: any) => sum + (c.statistics.wins || 0), 0);
          const totalKOs = clubsData.reduce((sum: number, c: any) => sum + ((c.statistics.koWins || 0) + (c.statistics.submissionWins || 0)), 0);
          
          setStats({
            fighters: totalFighters,
            wins: totalWins,
            kos: totalKOs
          });
        }
      } catch (err) {
        console.error("Error loading home stats from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleVote = (option: "tuan" | "opponent") => {
    if (voted) return;
    setVotes((prev) => {
      const next = { ...prev };
      if (option === "tuan") {
        next.tuan += 1;
      } else {
        next.opponent += 1;
      }
      return next;
    });
    setVoted(true);
  };

  const totalVotes = votes.tuan + votes.opponent;
  const tuanPct = Math.round((votes.tuan / totalVotes) * 100);
  const opponentPct = 100 - tuanPct;

  const textTitle = isDark ? "text-white" : "text-zinc-900";
  const textDesc = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-28 relative overflow-hidden ${
      isDark ? "bg-[#020203]" : "bg-[#f9f9fc]"
    }`} style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}>
      
      {/* ── PREMIUM CINEMATIC COMBAT SPORTS BACKGROUND ── */}
      {/* High-fidelity Dot-grid (chấm bi) overlay for clean combat sports theme */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300" 
        style={{ 
          backgroundImage: isDark 
            ? `
              radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 75% 60%, rgba(245, 158, 11, 0.15) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.007) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.007) 1px, transparent 1px)
            `
            : "radial-gradient(circle at center, rgba(0, 0, 0, 0.055) 1.5px, transparent 1.5px)",
          backgroundSize: isDark ? "100px 100px, 120px 120px, 40px 40px, 40px 40px" : "32px 32px",
          opacity: isDark ? 0.07 : 0.75,
          maskImage: isDark ? "radial-gradient(circle_at_center, black 40%, transparent 90%)" : "none",
          WebkitMaskImage: isDark ? "radial-gradient(circle_at_center, black 40%, transparent 90%)" : "none"
        }}
      />

      {/* Floating Animated Neon Light Spheres for deep organic glow */}
      <div className={`absolute top-[-10%] left-[-10%] w-[80vw] h-[50vh] blur-[130px] rounded-full pointer-events-none animate-pulse duration-[10s] ${
        isDark ? "bg-gradient-to-br from-red-600/10 via-rose-600/5 to-transparent" : "bg-gradient-to-br from-red-500/5 via-rose-500/2 to-transparent"
      }`} />
      <div className={`absolute top-[25%] right-[-15%] w-[60vw] h-[60vh] blur-[140px] rounded-full pointer-events-none animate-pulse duration-[8s] ${
        isDark ? "bg-gradient-to-bl from-amber-500/[0.04] via-red-600/[0.03] to-transparent" : "bg-gradient-to-bl from-amber-400/[0.02] via-red-500/[0.01] to-transparent"
      }`} />
      <div className={`absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vh] blur-[120px] rounded-full pointer-events-none ${
        isDark ? "bg-gradient-to-tr from-red-600/[0.05]" : "bg-gradient-to-tr from-red-500/[0.02]"
      }`} />

      {/* Geometric background accents */}
      <div className={`absolute top-[15%] left-0 w-full h-[1px] rotate-[-6deg] scale-150 pointer-events-none ${
        isDark ? "bg-gradient-to-r from-transparent via-red-500/10 to-transparent" : "bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
      }`} />
      <div className={`absolute top-[55%] left-0 w-full h-[1px] rotate-[8deg] scale-150 pointer-events-none ${
        isDark ? "bg-gradient-to-r from-transparent via-amber-500/5 to-transparent" : "bg-gradient-to-r from-transparent via-amber-500/2 to-transparent"
      }`} />

      {/* ── SECTION 1: HERO PORTAL BANNER ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-4 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-red-400 font-bold uppercase">PORTAL CHÍNH THỨC</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.1] ${textTitle}`} style={{ fontFamily: "'Oswald', sans-serif" }}>
              VÕ THUẬT TỔNG HỢP <br/>
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                VIỆT NAM 2026
              </span>
            </h1>

            <p className={`text-sm md:text-base leading-relaxed max-w-xl font-light ${textDesc}`}>
              Cổng thông tin tổng hợp cập nhật bảng xếp hạng LION Championship, lịch thi đấu đấu trường thế giới UFC, hồ sơ chi tiết võ đường và kết nối cộng đồng võ thuật Việt Nam.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/lion")}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs font-bold uppercase tracking-wider border-none cursor-pointer transition-all shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 duration-200"
              >
                <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-4 h-4 object-contain rounded-full brightness-110" />
                <span>Bảng xếp hạng LION</span>
              </button>
              <button
                onClick={() => navigate("/community")}
                className={`px-6 py-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 duration-200 ${
                  isDark 
                    ? "bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800/80 text-zinc-300 hover:text-white" 
                    : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-black"
                }`}
              >
                💬 Diễn đàn thảo luận
              </button>
            </div>
          </div>

          {/* Quick stats sidebar */}
          <div className="lg:col-span-5">
            <div className={`rounded-3xl border p-4 md:p-6 space-y-6 relative overflow-hidden transition-all duration-300 shadow-2xl backdrop-blur-md ${
              isDark 
                ? "bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-black/80 border-zinc-900/90 shadow-black/90 hover:border-red-500/20" 
                : "bg-white border-zinc-200/80 shadow-zinc-200/25 hover:border-red-500/30"
            }`}>
              
              {isDark && <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}
              
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${isDark ? "#ffffff" : "#000000"} 0px, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 0, transparent 50%)`,
                backgroundSize: "8px 8px"
              }} />

              <div className="flex items-center justify-between border-b pb-4 relative z-10" style={{ borderColor: isDark ? "rgba(39, 39, 42, 0.6)" : "rgba(228, 228, 231, 0.8)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">📊</span>
                  <h3 className={`text-xs font-mono font-bold tracking-widest uppercase ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
                    THỐNG KÊ HỆ THỐNG
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-md px-2 py-0.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-[8px] font-mono font-black text-red-500 uppercase tracking-widest">LIVE</span>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  { 
                    label: "Võ sĩ LION hoạt động", 
                    val: stats.fighters, 
                    color: isDark ? "text-white" : "text-zinc-900", 
                    barColor: "bg-red-600",
                    progress: 68,
                    note: "Hạng A & B chính thức"
                  },
                  { 
                    label: "Tổng số chiến thắng MMA", 
                    val: stats.wins, 
                    color: "text-emerald-500", 
                    barColor: "bg-emerald-500",
                    progress: 88,
                    note: "Tính từ mùa giải 2023"
                  },
                  { 
                    label: "Thắng đoán hạ cục (KO/SUB)", 
                    val: stats.kos, 
                    color: "text-amber-500", 
                    barColor: "bg-amber-500",
                    progress: 74,
                    note: "Chiếm 42% tổng kết quả"
                  },
                ].map((stat, idx) => (
                  <div key={idx} className={`p-4.5 rounded-2xl border transition-all duration-300 ${
                    isDark 
                      ? "bg-zinc-900/20 border-zinc-900/60 hover:bg-zinc-900/40" 
                      : "bg-zinc-50/50 border-zinc-100 hover:bg-zinc-50"
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{stat.label}</span>
                        <span className="text-[9px] text-zinc-500 font-light block">{stat.note}</span>
                      </div>
                      <span className={`text-3xl font-black font-mono tracking-tight leading-none ${stat.color}`}>
                        {stat.val}
                      </span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-zinc-900" : "bg-zinc-200/60"}`}>
                      <div 
                        className={`h-full rounded-full ${stat.barColor} transition-all duration-500`}
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: LATEST MMA NEWS (TIN TỨC NÓNG) ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6">
        <div className={`flex items-center justify-between border-b pb-4 mb-8 ${isDark ? "border-zinc-900/60" : "border-zinc-200"}`}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-red-650 rounded-full shadow-[0_0_8px_#ef4444]" />
            <div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">MMA HOT NEWS</span>
              <h2 className={`text-2xl font-black uppercase tracking-wide ${textTitle}`} style={{ fontFamily: "'Oswald', sans-serif" }}>TIN TỨC & BÊN LỀ ĐẤU TRƯỜNG</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate("/community")}
            className="text-[10px] font-mono tracking-wider text-red-500 hover:text-red-400 bg-transparent border-none cursor-pointer flex items-center gap-1 transition-all"
          >
            TẤT CẢ TIN TỨC &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "LION 34", time: "2 giờ trước", read: "3 phút đọc", title: "Lê Văn Tuần hoàn tất buổi cân thử, sẵn sàng bảo vệ đai vô địch hạng 56kg Nam", desc: "Đương kim vô địch tỏ ra vô cùng tự tin và đạt trạng thái thể lực tốt nhất trước thềm trận đấu tâm điểm ngày mai." },
            { tag: "SỰ KIỆN", time: "1 ngày trước", read: "4 phút đọc", title: "Johnny Trí Nguyễn chia sẻ chiến thuật độc bản của Liên Phong trước mùa giải mới", desc: "HLV trưởng võ đường Liên Phong tin tưởng dàn võ sĩ trẻ sẽ tạo nên nhiều bất ngờ lớn với sự đột phá trong địa chiến." },
            { tag: "UFC 326", time: "3 ngày trước", read: "5 phút đọc", title: "Jon Jones chính thức lên tiếng về tin đồn giải nghệ trước thềm đại chiến Aspinall", desc: "Huyền thoại hạng nặng khẳng định anh vẫn khao khát chiến đấu và muốn cống hiến một trận cầu kinh điển cuối cùng." }
          ].map((news, idx) => (
            <div key={idx} className={`group border rounded-3xl p-4 md:p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:-translate-y-1 relative overflow-hidden ${
              isDark 
                ? "bg-gradient-to-b from-zinc-950/80 to-zinc-950/30 border-zinc-900/90 hover:border-red-500/30 shadow-black/45" 
                : "bg-white border-zinc-200/80 hover:border-red-500/25 shadow-zinc-200/10"
            }`}>
              
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-lg uppercase">{news.tag}</span>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span>{news.time}</span>
                    <span>•</span>
                    <span>{news.read}</span>
                  </div>
                </div>
                
                <h3 className={`text-sm font-bold group-hover:text-red-500 transition-colors leading-snug line-clamp-2 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>{news.title}</h3>
                
                <p className={`text-xs leading-relaxed line-clamp-2 font-light ${textDesc}`}>{news.desc}</p>
              </div>

              <div className="pt-4 mt-6 border-t flex items-center justify-between text-[10px] font-mono text-zinc-500 group-hover:text-red-500 transition-colors" style={{ borderColor: isDark ? "rgba(39, 39, 42, 0.4)" : "rgba(228, 228, 231, 0.6)" }}>
                <span>ĐỌC CHI TIẾT</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: FEATURED CHAMPION SPOTLIGHT ── Upgraded to ultra-premium design */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6">
        <div className={`rounded-3xl border p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-2xl transition-all duration-300 group ${
          isDark 
            ? "bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-black border-zinc-900/90 shadow-black/80 hover:border-amber-500/20" 
            : "bg-gradient-to-r from-white via-zinc-50/80 to-zinc-50/20 border-zinc-200/95 shadow-zinc-200/20 hover:border-amber-500/35"
        }`}>
          
          {/* Subtle Champion Background Radial Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-[0.06] pointer-events-none transition-all duration-500 group-hover:opacity-[0.1]"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }} />

          {/* Corner Decors */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-500/25" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-500/25" />

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full relative">
              <span className="text-[10px] animate-bounce">🏆</span>
              <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-widest">Đương Kim Vô Địch Nổi Bật</span>
            </div>
            
            <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] ${
              isDark ? "text-white" : "text-zinc-900"
            }`} style={{ fontFamily: "'Oswald', sans-serif" }}>
              LÊ VĂN TUẦN <br/>
              <span className="text-red-500 text-base md:text-lg font-mono block mt-2 font-bold tracking-widest uppercase">&ldquo;THE SOUTHWARK BEAST&rdquo; · 56KG NAM</span>
            </h2>

            <p className={`text-xs md:text-sm leading-relaxed max-w-xl font-light ${textDesc}`}>
              Nhà vô địch LION Championship sở hữu lối thi đấu vô cùng cống hiến, pha trộn tinh hoa võ cổ truyền Việt Nam và BJJ hiện đại. Gần đây anh liên tục thống trị hạng cân 56kg Nam với phong cách khóa siết nghẹt thở.
            </p>

            {/* Structured Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-lg pt-2">
              {[
                { label: "THÀNH TÍCH (W-L-D)", val: "8-3-0", sub: "Bảo vệ đai 3 lần", valColor: isDark ? "text-white" : "text-zinc-800" },
                { label: "TỈ LỆ THẮNG", val: "73%", sub: "4 Trận khóa siết", valColor: "text-emerald-500" },
                { label: "VÕ ĐƯỜNG CHỦ QUẢN", val: "VTT", sub: "Vietnam Top Team", valColor: "text-amber-500" }
              ].map((item, idx) => (
                <div key={idx} className={`p-3.5 rounded-2xl border ${
                  isDark ? "bg-zinc-900/30 border-zinc-900/60" : "bg-zinc-50/80 border-zinc-150"
                }`}>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">{item.label}</span>
                  <div className={`text-xl md:text-2xl font-black font-mono tracking-tight leading-none ${item.valColor}`}>{item.val}</div>
                  <span className="text-[8px] text-zinc-400 font-mono mt-1 block truncate">{item.sub}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate("/fighter/le-van-tuan")}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-600 text-amber-500 hover:text-white text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer shadow-md shadow-amber-500/5"
              >
                <span>XEM CHI TIẾT HỒ SƠ VÕ SĨ</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Upgraded Champion Photo Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className={`relative w-64 h-64 rounded-3xl overflow-hidden border flex items-center justify-center p-3 shadow-2xl transition-all duration-300 group ${
              isDark ? "border-zinc-800/90 bg-zinc-950" : "border-zinc-200 bg-zinc-50"
            }`}>
              
              {/* Spinning Octagonal Grid Frame on hover */}
              <div className="absolute inset-2 border border-dashed rounded-2xl border-amber-500/20 opacity-40 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] pointer-events-none" />
              <img 
                src="/lvt.png" 
                alt="Lê Văn Tuần" 
                className="w-full h-full object-contain scale-[1.3] translate-y-5 group-hover:scale-[1.4] transition-all duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MATCH HIGHLIGHT & FAN POLL ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Fan Poll Widget (5/12) */}
          <div className={`border rounded-3xl p-4 md:p-6 space-y-4 shadow-xl lg:col-span-5 ${
            isDark 
              ? "bg-zinc-950/60 border-zinc-900/80 shadow-black/30" 
              : "bg-white border-zinc-200/80 shadow-zinc-200/10"
          }`}>
            <div className={`flex items-center gap-2 border-b pb-3 ${isDark ? "border-zinc-900" : "border-zinc-100"}`}>
              <span className="text-red-500">🗳️</span>
              <h3 className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isDark ? "text-zinc-400" : "text-zinc-700"
              }`}>FAN POLL & BÌNH CHỌN</h3>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-zinc-500 uppercase">Dự đoán kết quả trận đấu tâm điểm LION 34</h4>
              <p className={`text-sm font-bold leading-snug ${isDark ? "text-white" : "text-zinc-800"}`}>Lê Văn Tuần vs Đối thủ thách đấu đai vô địch?</p>
              
              {!voted ? (
                <div className="space-y-2.5 pt-2">
                  <button 
                    onClick={() => handleVote("tuan")}
                    className={`w-full text-left border p-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isDark 
                        ? "bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-850" 
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100"
                    }`}
                  >
                    🏆 Lê Văn Tuần thắng bằng khóa siết (Submission)
                  </button>
                  <button 
                    onClick={() => handleVote("opponent")}
                    className={`w-full text-left border p-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isDark 
                        ? "bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-850" 
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100"
                    }`}
                  >
                    ⚡ Thách đấu giành đai thắng điểm đồng thuận (Decision)
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-red-500 font-bold">Lê Văn Tuần bảo vệ đai</span>
                      <span className={`font-bold ${isDark ? "text-white" : "text-zinc-800"}`}>{tuanPct}%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${tuanPct}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">Đổi ngôi vô địch</span>
                      <span className={`font-bold ${isDark ? "text-white" : "text-zinc-800"}`}>{opponentPct}%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-700 rounded-full transition-all duration-500" style={{ width: `${opponentPct}%` }} />
                    </div>
                  </div>
                  <p className="text-[9px] font-mono text-zinc-600 text-center">Cảm ơn bạn đã tham gia bình chọn!</p>
                </div>
              )}
            </div>
          </div>

          {/* Training Techniques Grid (7/12) */}
          <div className={`border rounded-3xl p-4 md:p-6 space-y-4 shadow-xl lg:col-span-7 ${
            isDark 
              ? "bg-zinc-950/60 border-zinc-900/80 shadow-black/30" 
              : "bg-white border-zinc-200/80 shadow-zinc-200/10"
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-zinc-900" : "border-zinc-100"}`}>
              <div className="flex items-center gap-2">
                <span className="text-red-500">🥋</span>
                <h3 className={`text-xs font-mono font-bold tracking-widest uppercase ${
                  isDark ? "text-zinc-400" : "text-zinc-700"
                }`}>GÓC KỸ THUẬT COMBAT TOOLKIT</h3>
              </div>
              <span className="text-[9px] font-mono text-zinc-600">MMA TUTORIALS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Kỹ thuật đấm Overhand Right", level: "Cơ bản", duration: "Muay Thai / Boxing", desc: "Cách phát lực từ hông và giữ thăng bằng đầu để tạo ra đòn đấm Overhand uy lực nhất vượt qua tay thủ đối phương." },
                { title: "Cách thoát thế chẹn cổ Rear-Naked Choke", level: "Nâng cao", duration: "BJJ / Grappling", desc: "Các bước gỡ tay khóa, xoay vai hướng về phía mặt đối thủ để thoát hiểm an toàn khi bị kiểm soát lưng." }
              ].map((tech, idx) => (
                <div key={idx} className={`border p-4 md:p-6 rounded-2xl space-y-2 ${
                  isDark ? "bg-zinc-900/40 border-zinc-900/60" : "bg-zinc-50/50 border-zinc-200"
                }`}>
                  <div className="flex justify-between text-[9px] font-mono">
                    <span className="text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded">{tech.level}</span>
                    <span className="text-zinc-500">{tech.duration}</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-zinc-800"}`}>{tech.title}</h4>
                  <p className={`text-[11px] leading-relaxed font-light ${textDesc}`}>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: UPCOMING BROADCASTS TIMELINE ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6">
        <div className={`flex items-center gap-3 border-b pb-4 mb-8 ${isDark ? "border-zinc-900/60" : "border-zinc-200"}`}>
          <div className="w-1 h-6 bg-red-600 rounded-full" />
          <div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">MMA SCHEDULE</span>
            <h2 className={`text-2xl font-black uppercase ${textTitle}`} style={{ fontFamily: "'Oswald', sans-serif" }}>LỊCH PHÁT SÓNG & SỰ KIỆN SẮP TỚI</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "LION Championship 34", date: "Thứ Bảy, ngày 18 tháng 7, 2026", loc: "Nhà thi đấu Rạch Miễu, TP. HCM", type: "Championship Bout", status: "Trực tiếp lúc 19:00" },
            { title: "UFC 326: Jones vs Aspinall", date: "Chủ Nhật, ngày 26 tháng 7, 2026", loc: "Madison Square Garden, New York", type: "Heavyweight Title Match", status: "Phát sóng độc quyền" },
            { title: "LION Championship 35", date: "Thứ Bảy, ngày 15 tháng 8, 2026", loc: "Quần Ngựa, Tây Hồ, Hà Nội", type: "Official Rankings Matches", status: "Bán vé chính thức" },
          ].map((evt, idx) => (
            <div key={idx} className={`border rounded-3xl p-4 md:p-6 space-y-4 transition-all hover:-translate-y-1 shadow-lg ${
              isDark 
                ? "bg-gradient-to-b from-zinc-950/70 to-zinc-950/40 border-zinc-900/80 hover:border-red-500/20 shadow-black/30" 
                : "bg-white border-zinc-200/80 hover:border-red-500/20 shadow-zinc-200/10"
            }`}>
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{evt.type}</span>
                <span className="text-zinc-500">{evt.status}</span>
              </div>
              <h3 className={`text-base font-black leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>{evt.title}</h3>
              <div className="space-y-1 text-xs">
                <p className={`${isDark ? "text-zinc-400" : "text-zinc-600"} font-mono`}>📅 {evt.date}</p>
                <p className="text-zinc-500">📍 {evt.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: CLUBS SECTION ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6">
        <div className={`flex items-center justify-between border-b pb-4 mb-8 ${isDark ? "border-zinc-900/60" : "border-zinc-200"}`}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-red-600 rounded-full" />
            <div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">VÕ ĐƯỜNG LIÊN KẾT</span>
              <h2 className={`text-2xl font-black uppercase ${textTitle}`} style={{ fontFamily: "'Oswald', sans-serif" }}>CÁC LÒ ĐÀO TẠO MMA HÀNG ĐẦU</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate("/clubs")} 
            className="text-[10px] font-mono tracking-widest text-red-500 hover:text-red-400 bg-transparent border-none cursor-pointer"
          >
            XEM TẤT CẢ &rarr;
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-60 bg-zinc-900/40 rounded-3xl animate-pulse border border-zinc-900" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clubs.slice(0, 3).map((club) => {
              const ratio = club.statistics.wins + club.statistics.losses > 0 
                ? Math.round((club.statistics.wins / (club.statistics.wins + club.statistics.losses)) * 100) 
                : 0;
              return (
                <div 
                  key={club.id} 
                  onClick={() => navigate(`/club/${club.id}`)}
                  className={`group relative overflow-hidden rounded-3xl border p-4 md:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 ${
                    isDark
                      ? "bg-gradient-to-b from-zinc-950/70 to-zinc-950/40 border-zinc-900/85 hover:border-red-500/25 shadow-black/30"
                      : "bg-white border-zinc-200 hover:border-red-500/25 shadow-zinc-200/10"
                  }`}
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
                      <h3 className={`font-extrabold text-base group-hover:text-red-500 transition-colors leading-tight ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}>
                        {club.name}
                      </h3>
                      <p className="text-[9px] font-mono text-zinc-500 mt-1">HLV TRƯỞNG: {club.headCoach}</p>
                    </div>

                    <p className={`text-xs line-clamp-2 leading-relaxed ${textDesc}`}>
                      {club.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {club.disciplines.slice(0, 3).map((d: string, i: number) => (
                        <span key={i} className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded border ${
                          isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-600"
                        }`}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t mt-6 space-y-2 ${isDark ? "border-zinc-900/60" : "border-zinc-100"}`}>
                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                      <span>TỈ LỆ THẮNG <span className={`font-bold ${isDark ? "text-white" : "text-zinc-800"}`}>{ratio}%</span></span>
                      <span>{club.statistics.wins}W - {club.statistics.losses}L</span>
                    </div>
                    <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}>
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
        )}
      </section>

    </div>
  );
}
