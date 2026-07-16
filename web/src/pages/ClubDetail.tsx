import { useParams, useNavigate, Link } from "react-router-dom";
import { mmaClubs } from "../data/clubs";

// Mappings of fighters enrolled in each club
const CLUB_FIGHTERS: Record<string, Array<{ id?: string; name: string; class: string; rank: string; record: string }>> = {
  "clb_lien_phong": [
    { name: "Trần Minh Nhựt", class: "56kg Nam", rank: "#2", record: "6-2-0" },
    { name: "Nguyễn Hoàng Thạch", class: "56kg Nam", rank: "#5", record: "4-3-0" },
    { name: "Bùi Trường Sinh", class: "60kg Nam", rank: "#4", record: "5-3-0" }
  ],
  "clb_ssc": [
    { name: "Phạm Văn Nam", class: "56kg Nam", rank: "Đương Kim Vô Địch", record: "7-1-0" },
    { name: "Robson Oliveira", class: "60kg Nam", rank: "Đương Kim Vô Địch", record: "9-2-0" },
    { name: "Nguyễn Vũ Phương Hoài", class: "65kg Nam", rank: "#6", record: "5-2-0" }
  ],
  "clb_vtt": [
    { id: "le-van-tuan", name: "Lê Văn Tuần", class: "56kg Nam", rank: "Đương Kim Vô Địch", record: "8-3-0" },
    { name: "Jovidon Khojaev", class: "70kg Nam", rank: "Đương Kim Vô Địch", record: "9-1-0" },
    { name: "Nguyễn Tiến Long", class: "65kg Nam", rank: "#3", record: "7-4-0" }
  ],
  "clb_raptor_mma": [
    { name: "Nguyễn Thế Anh", class: "56kg Nam", rank: "#4", record: "5-2-0" },
    { name: "Bàn Văn Hoàng", class: "70kg Nam", rank: "#5", record: "6-3-0" }
  ],
  "clb_tank_club": [
    { name: "Trần Văn Tùng", class: "77kg Nam", rank: "#6", record: "4-2-0" },
    { name: "Kamil Michal Nguyen", class: "70kg Nam", rank: "#2", record: "8-5-0" }
  ]
};

export default function ClubDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find club, fallback to clb_lien_phong if none found
  const club = mmaClubs.find((c) => c.id === id) || mmaClubs[0];
  const fighters = CLUB_FIGHTERS[club.id] || [];

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-24 relative overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background cyber sparks */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[400px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-zinc-800/5 blur-[160px] rounded-full pointer-events-none" />

      {/* ── PROFILE COVER BANNER ── */}
      <div className="relative h-[240px] md:h-[320px] bg-[#09090b] border-b border-zinc-900/60 overflow-hidden">
        {/* Cover Photo */}
        {club.cover ? (
          <img 
            src={club.cover} 
            alt={`${club.name} Cover`} 
            className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        )}
        
        {/* Gradients & grid overlay over the cover */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/40" />
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => navigate("/clubs")}
            className="group flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-zinc-400 hover:text-white bg-black/80 border border-zinc-900 hover:border-red-500/40 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <span>&larr;</span> 
            <span>TẤT CẢ VÕ ĐƯỜNG</span>
          </button>
        </div>
      </div>

      {/* ── CENTERED AVATAR (LOGO) OVERLAY ── */}
      <div className="relative z-20 -mt-20 md:-mt-24 flex flex-col items-center px-6">
        
        {/* Centered Avatar Frame */}
        <div className="relative group">
          {/* Avatar glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-red-600/20 blur-xl scale-110 opacity-70 group-hover:bg-red-500/30 transition-all duration-300" />
          
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-[#070709] border-4 border-[#030303] p-4 flex items-center justify-center shadow-2xl shadow-black">
            <img 
              src={club.logo} 
              alt={club.name} 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* Centered Academy Identity Text */}
        <div className="text-center mt-6 space-y-3 max-w-2xl">
          <div className="flex justify-center items-center gap-2">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-md uppercase">
              {club.city} · VIỆT NAM
            </span>
            <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md">
              FOUNDED IN {club.foundedYear ?? "—"}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
            {club.name}
          </h1>

          <p className="text-xs md:text-sm text-zinc-400 font-mono tracking-wide">
            Huấn luyện viên trưởng: <span className="text-red-400 font-bold font-sans">{club.headCoach}</span>
          </p>

          {/* Social quick links */}
          <div className="flex gap-2.5 pt-2 justify-center">
            {club.facebook && (
              <a href={club.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-850 flex items-center justify-center hover:text-blue-500 transition-colors">
                <span className="text-xs font-mono">FB</span>
              </a>
            )}
            {club.website && (
              <a href={club.website} target="_blank" rel="noreferrer" title="Website" className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-850 flex items-center justify-center hover:text-red-500 transition-colors">
                <span className="text-xs">🌐</span>
              </a>
            )}
          </div>
        </div>

      </div>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-10 relative z-10">
        
        {/* ── HORIZONTAL METRIC METADATA BAR ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950/60 border border-zinc-900 rounded-3xl p-5 shadow-lg shadow-black/40">
          {[
            { val: club.statistics.lionFighters, label: "VÕ SĨ LION", desc: "Đang thi đấu chuyên nghiệp" },
            { val: club.statistics.champions, label: "ĐAI VÔ ĐỊCH", desc: "Tổng đai vô địch quốc gia" },
            { val: `${club.statistics.wins}-${club.statistics.losses}`, label: "THÀNH TÍCH MMA", desc: "Tổng tỉ lệ thắng/thua" },
            { val: `${Math.round((club.statistics.wins / (club.statistics.wins + club.statistics.losses)) * 100)}%`, label: "TỈ LỆ CHIẾN THẮNG", desc: "Tần suất hạ gục đối thủ" }
          ].map((stat, idx) => (
            <div key={idx} className="p-3 text-center md:text-left space-y-1 md:border-r border-zinc-900/60 last:border-r-0">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">{stat.label}</span>
              <div className="text-3xl font-black text-white font-mono leading-none">{stat.val}</div>
              <span className="text-[9px] text-zinc-600 block leading-tight font-mono">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* ── ACADEMY DETAILS GRID (3/3 layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: DOJO MISSION & RETAINED ROSTER (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Mission Statement */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">GIỚI THIỆU VÕ ĐƯỜNG</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {club.description}
              </p>
            </div>

            {/* Registered Roster */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                    VÕ SĨ TRONG BIÊN CHẾ
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900/50 border border-zinc-900 px-3 py-1 rounded-md">
                  {fighters.length} VÕ SĨ CHỦ LỰC
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fighters.map((f, idx) => (
                  <div 
                    key={idx}
                    className="group bg-zinc-950/60 border border-zinc-900 hover:border-red-500/30 p-5 rounded-2xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-600/5 to-transparent pointer-events-none" />
                    
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          {f.id ? (
                            <Link 
                              to={`/fighter/${f.id}`}
                              className="text-sm font-bold text-white hover:text-red-400 transition-colors no-underline block"
                            >
                              {f.name}
                            </Link>
                          ) : (
                            <span className="text-sm font-bold text-zinc-200 block">{f.name}</span>
                          )}
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">{f.class}</span>
                        </div>

                        <span className="text-[9px] font-mono font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase">
                          {f.rank}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono">
                        <span className="text-zinc-600">Thành tích MMA</span>
                        <span className="text-zinc-300 font-bold">{f.record}</span>
                      </div>

                      {f.id && (
                        <Link 
                          to={`/fighter/${f.id}`}
                          className="text-[9px] font-mono font-bold text-red-500 hover:text-red-400 tracking-wider uppercase flex items-center gap-1.5 pt-1.5 no-underline"
                        >
                          XEM CHI TIẾT HỒ SƠ &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: COACHES & TRAINING DISCIPLINES (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Disciplines Card */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  HỆ THỐNG ĐÀO TẠO
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {club.disciplines.map((d) => (
                  <div key={d} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-center hover:border-zinc-700 transition-colors">
                    <span className="text-lg block mb-1">🥋</span>
                    <span className="text-xs font-bold text-zinc-200 block font-mono">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Card */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  THÀNH TÍCH ĐÃ ĐẠT
                </h3>
              </div>
              <ul className="space-y-3.5 text-xs list-none p-0 m-0">
                {club.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-zinc-300 bg-[#080809] border border-zinc-900/60 p-3 rounded-xl">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">✦</span>
                    <span className="leading-relaxed font-light">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assistant Coaches Card */}
            {club.assistantCoaches && club.assistantCoaches.length > 0 && (
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                    TRỢ LÝ HUẤN LUYỆN
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {club.assistantCoaches.map((c) => (
                    <span key={c} className="bg-zinc-900 text-zinc-300 px-3.5 py-2 rounded-xl border border-zinc-800 text-xs">
                      👤 {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
