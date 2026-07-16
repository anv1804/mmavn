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
    <div className="min-h-screen bg-[#030303] text-white py-10 px-6 relative" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background glow sparks */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-zinc-800/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Control bar */}
      <div className="relative z-20 max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate("/clubs")}
          className="group flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-zinc-400 hover:text-white bg-black/60 border border-zinc-900 hover:border-red-500/40 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200 block">&larr;</span> 
          <span>DANH SÁCH VÕ ĐƯỜNG</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: OVERVIEW CARD & COACHES (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col items-center group">
            <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-red-600/30" />
            <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-red-600/30" />
            <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-red-600/30" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-red-600/30" />

            {/* Logo box */}
            <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-3 overflow-hidden shadow-lg shadow-zinc-900/50">
              <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
            </div>

            <div className="text-center mt-6 w-full space-y-1">
              <h2 className="text-xl font-black text-white">{club.name}</h2>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                Năm thành lập: {club.foundedYear ?? "—"}
              </span>
            </div>

            {/* Contact quicklinks */}
            <div className="flex gap-2.5 mt-5 w-full border-t border-zinc-900/60 pt-4 justify-center">
              {club.facebook && (
                <a href={club.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-blue-500 transition-colors">
                  <span className="text-xs">FB</span>
                </a>
              )}
              {club.website && (
                <a href={club.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-red-500 transition-colors">
                  <span className="text-xs">🌐</span>
                </a>
              )}
            </div>
          </div>

          {/* Coaching Roster Card */}
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 border-b border-zinc-900 pb-2.5 uppercase">
              BAN HUẤN LUYỆN
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-[#080809] border border-zinc-900 p-3 rounded-xl">
                <span className="text-zinc-400 font-mono">Huấn luyện viên Trưởng</span>
                <span className="font-bold text-white">{club.headCoach}</span>
              </div>

              {club.assistantCoaches && club.assistantCoaches.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Trợ lý huấn luyện</span>
                  <div className="flex flex-wrap gap-1.5">
                    {club.assistantCoaches.map((c) => (
                      <span key={c} className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-lg border border-zinc-800/80">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL STATS, ACCOMPLISHMENTS, FIGHTERS RETAINED (8/12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Identity Header */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-md uppercase">
              {club.city} · VIỆT NAM
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">{club.name}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">{club.description}</p>
          </div>

          {/* Full Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: club.statistics.lionFighters, label: "Võ sĩ LION", color: "text-white" },
              { val: club.statistics.champions, label: "Đai Vô Địch", color: "text-amber-500" },
              { val: `${club.statistics.wins}-${club.statistics.losses}`, label: "Thành tích (W-L)", color: "text-emerald-400" },
              { val: `${Math.round((club.statistics.wins / (club.statistics.wins + club.statistics.losses)) * 100)}%`, label: "Tỉ lệ thắng MMA", color: "text-red-500" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 text-center">
                <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.val}</div>
                <div className="text-[8px] font-mono text-zinc-500 uppercase mt-1.5 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Training Disciplines & Achievements Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Disciplines Card */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 border-b border-zinc-900 pb-2.5 uppercase">
                BỘ MÔN ĐÀO TẠO
              </h3>
              <div className="flex flex-wrap gap-2">
                {club.disciplines.map((discipline) => (
                  <span key={discipline} className="bg-zinc-900 text-zinc-300 px-3.5 py-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
                    ✦ {discipline}
                  </span>
                ))}
              </div>
            </div>

            {/* Accomplishments Card */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 border-b border-zinc-900 pb-2.5 uppercase">
                THÀNH TÍCH ĐÃ ĐẠT
              </h3>
              <ul className="space-y-3 text-xs list-none p-0 m-0">
                {club.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-zinc-300">
                    <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                    <span className="leading-relaxed font-light">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Fighters Roster Table */}
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 border-b border-zinc-900 pb-2.5 uppercase">
              VÕ SĨ TRONG BIÊN CHẾ ({fighters.length})
            </h3>
            
            <div className="space-y-2.5">
              {fighters.map((f, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between bg-black/40 border border-zinc-900/60 hover:border-zinc-800 p-4 rounded-xl transition-all"
                >
                  <div>
                    {f.id ? (
                      <Link 
                        to={`/fighter/${f.id}`}
                        className="text-sm font-bold text-white hover:text-red-400 transition-colors no-underline"
                      >
                        {f.name} <span className="text-[9px] font-mono bg-red-600/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20 ml-1.5 uppercase">Xem hồ sơ</span>
                      </Link>
                    ) : (
                      <span className="text-sm font-bold text-zinc-300">{f.name}</span>
                    )}
                    <span className="text-[10px] text-zinc-500 font-mono block mt-1">{f.class} · {f.record}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/5 px-3 py-1 rounded-lg border border-amber-500/15">
                    {f.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
