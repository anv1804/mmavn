import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Home() {
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-28 relative overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,30,39,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,39,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-zinc-800/5 blur-[150px] rounded-full pointer-events-none" />

      {/* ── SECTION 1: HERO PORTAL BANNER ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
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
          <div className="lg:col-span-4 rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6 relative shadow-xl shadow-black/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03)_0%,transparent_75%)] pointer-events-none" />
            <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-3">
              📊 THỐNG KÊ HỆ THỐNG (LIVE)
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "VÕ SĨ LION HOẠT ĐỘNG", val: stats.fighters, color: "text-white" },
                { label: "TỔNG SỐ CHIẾN THẮNG MMA", val: stats.wins, color: "text-emerald-400" },
                { label: "THẮNG ĐOÁN HẠ CỤC (KO/SUB)", val: stats.kos, color: "text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-900/30 last:border-0">
                  <span className="text-[10px] text-zinc-400 font-mono tracking-wider">{stat.label}</span>
                  <span className={`text-2xl font-black font-mono ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: LATEST MMA NEWS (TIN TỨC NÓNG) ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-8">
          <div className="w-1 h-6 bg-red-600 rounded-full" />
          <div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">MMA HOT NEWS</span>
            <h2 className="text-2xl font-black uppercase text-white">TIN TỨC & BÊN LỀ ĐẤU TRƯỜNG</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "LION 34", time: "2 giờ trước", title: "Lê Văn Tuần hoàn tất buổi cân thử, sẵn sàng bảo vệ đai vô địch hạng 56kg Nam", desc: "Đương kim vô địch tỏ ra vô cùng tự tin và đạt trạng thái thể lực tốt nhất trước thềm trận đấu tâm điểm ngày mai.", img: "🥊" },
            { tag: "SỰ KIỆN", time: "1 ngày trước", title: "Johnny Trí Nguyễn chia sẻ chiến thuật độc bản của Liên Phong trước mùa giải mới", desc: "HLV trưởng võ đường Liên Phong tin tưởng dàn võ sĩ trẻ sẽ tạo nên nhiều bất ngờ lớn với sự đột phá trong địa chiến.", img: "🥋" },
            { tag: "UFC 326", time: "3 ngày trước", title: "Jon Jones chính thức lên tiếng về tin đồn giải nghệ trước thềm đại chiến Aspinall", desc: "Huyền thoại hạng nặng khẳng định anh vẫn khao khát chiến đấu và muốn cống hiến một trận cầu kinh điển cuối cùng.", img: "🔥" }
          ].map((news, idx) => (
            <div key={idx} className="group bg-zinc-950/40 border border-zinc-900 hover:border-red-500/20 rounded-2xl p-5 space-y-4 transition-all duration-300">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <span className="text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">{news.tag}</span>
                <span className="text-zinc-500">{news.time}</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug line-clamp-2">{news.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-light">{news.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: FEATURED CHAMPION SPOTLIGHT ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-xl shadow-black/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-red-600/5 to-transparent pointer-events-none" />
          
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <span className="text-[10px]">🏆</span>
              <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-widest">Đương Kim Vô Địch Nổi Bật</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              LÊ VĂN TUẦN <br/>
              <span className="text-red-500 text-lg md:text-xl font-mono block mt-2 font-bold tracking-widest">&ldquo;THE SOUTHWARK BEAST&rdquo; · 56KG NAM</span>
            </h2>

            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl font-light">
              Nhà vô địch LION Championship sở hữu lối thi đấu vô cùng cống hiến, pha trộn tinh hoa võ cổ truyền Việt Nam và BJJ hiện đại. Gần đây anh liên tục thống trị hạng cân 56kg Nam với phong cách khóa siết nghẹt thở.
            </p>

            <div className="flex gap-6 items-center">
              <div>
                <div className="text-2xl font-black font-mono text-white">8-3-0</div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">THÀNH TÍCH (W-L-D)</span>
              </div>
              <div className="w-px h-8 bg-zinc-900" />
              <div>
                <div className="text-2xl font-black font-mono text-emerald-400">73%</div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">TỈ LỆ THẮNG</span>
              </div>
              <div className="w-px h-8 bg-zinc-900" />
              <div>
                <div className="text-2xl font-black font-mono text-amber-500">Vietnam Top Team</div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">CÂU LẠC BỘ CHỦ QUẢN</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate("/fighter/le-van-tuan")}
                className="px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer"
              >
                Xem chi tiết hồ sơ võ sĩ &rarr;
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-amber-500/30 bg-zinc-950 flex items-center justify-center p-3 shadow-2xl shadow-amber-500/5">
              <img 
                src="/lvt.png" 
                alt="Lê Văn Tuần" 
                className="w-full h-full object-contain scale-150 translate-y-6" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MATCH HIGHLIGHT & FAN POLL (GRID INTERACTIVE) ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Fan Poll Widget (5/12) */}
          <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
              <span className="text-red-500">🗳️</span>
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">FAN POLL & BÌNH CHỌN</h3>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-zinc-500 uppercase">Dự đoán kết quả trận đấu tâm điểm LION 34</h4>
              <p className="text-sm font-bold text-white leading-snug">Lê Văn Tuần vs Đối thủ thách đấu đai vô địch?</p>
              
              {!voted ? (
                <div className="space-y-2.5 pt-2">
                  <button 
                    onClick={() => handleVote("tuan")}
                    className="w-full text-left bg-zinc-900 border border-zinc-800 hover:border-red-500/40 p-3 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    🏆 Lê Văn Tuần thắng bằng khóa siết (Submission)
                  </button>
                  <button 
                    onClick={() => handleVote("opponent")}
                    className="w-full text-left bg-zinc-900 border border-zinc-800 hover:border-red-500/40 p-3 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    ⚡ Thách đấu giành đai thắng điểm đồng thuận (Decision)
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-red-400 font-bold">Lê Văn Tuần bảo vệ đai</span>
                      <span className="text-white font-bold">{tuanPct}%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${tuanPct}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">Đổi ngôi vô địch</span>
                      <span className="text-white font-bold">{opponentPct}%</span>
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
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-red-500">🥋</span>
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">GÓC KỸ THUẬT COMBAT TOOLKIT</h3>
              </div>
              <span className="text-[9px] font-mono text-zinc-600">MMA TUTORIALS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Kỹ thuật đấm Overhand Right", level: "Cơ bản", duration: "Muay Thai / Boxing", desc: "Cách phát lực từ hông và giữ thăng bằng đầu để tạo ra đòn đấm Overhand uy lực nhất vượt qua tay thủ đối phương." },
                { title: "Cách thoát thế chẹn cổ Rear-Naked Choke", level: "Nâng cao", duration: "BJJ / Grappling", desc: "Các bước gỡ tay khóa, xoay vai hướng về phía mặt đối thủ để thoát hiểm an toàn khi bị kiểm soát lưng." }
              ].map((tech, idx) => (
                <div key={idx} className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-[9px] font-mono">
                    <span className="text-amber-500 font-bold">{tech.level}</span>
                    <span className="text-zinc-500">{tech.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{tech.title}</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: UPCOMING BROADCASTS TIMELINE ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-8">
          <div className="w-1 h-6 bg-red-600 rounded-full" />
          <div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">MMA SCHEDULE</span>
            <h2 className="text-2xl font-black uppercase text-white">LỊCH PHÁT SÓNG & SỰ KIỆN SẮP TỚI</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "LION Championship 34", date: "Thứ Bảy, ngày 18 tháng 7, 2026", loc: "Nhà thi đấu Rạch Miễu, TP. HCM", type: "Championship Bout", status: "Trực tiếp lúc 19:00" },
            { title: "UFC 326: Jones vs Aspinall", date: "Chủ Nhật, ngày 26 tháng 7, 2026", loc: "Madison Square Garden, New York", type: "Heavyweight Title Match", status: "Phát sóng độc quyền" },
            { title: "LION Championship 35", date: "Thứ Bảy, ngày 15 tháng 8, 2026", loc: "Quần Ngựa, Tây Hồ, Hà Nội", type: "Official Rankings Matches", status: "Bán vé chính thức" },
          ].map((evt, idx) => (
            <div key={idx} className="bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 space-y-4 transition-all">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-red-500 font-bold uppercase tracking-wider">{evt.type}</span>
                <span className="text-zinc-500">{evt.status}</span>
              </div>
              <h3 className="text-base font-black text-white leading-tight">{evt.title}</h3>
              <div className="space-y-1 text-xs">
                <p className="text-zinc-400 font-mono">📅 {evt.date}</p>
                <p className="text-zinc-500">📍 {evt.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: CLUBS SECTION ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-red-600 rounded-full" />
            <div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">VÕ ĐƯỜNG LIÊN KẾT</span>
              <h2 className="text-2xl font-black uppercase text-white">CÁC LÒ ĐÀO TẠO MMA HÀNG ĐẦU</h2>
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
                  className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 flex flex-col justify-between hover:border-red-500/25 transition-all duration-300 cursor-pointer"
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
                      {club.disciplines.slice(0, 3).map((d: string, i: number) => (
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
        )}
      </section>

    </div>
  );
}
