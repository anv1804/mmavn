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
          <div className="flex items-center gap-3 pt-2 justify-center">
            {club.facebook && (
              <a href={club.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            )}
            {club.instagram && (
              <a href={club.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {club.tiktok && (
              <a href={club.tiktok} target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.72-.49-.44-.9-.97-1.24-1.55v7.71c.08 2.15-.69 4.35-2.24 5.86-1.71 1.73-4.32 2.45-6.66 1.83-2.45-.62-4.52-2.58-5.18-5.01-.84-2.92.38-6.27 2.94-7.66 1.34-.76 2.92-.98 4.43-.65v4.11c-.9-.31-1.92-.18-2.7.39-.77.53-1.21 1.45-1.18 2.39.01 1.12.78 2.13 1.86 2.41 1.09.31 2.33-.12 2.87-1.13.23-.42.33-.92.32-1.4V.02z"/>
                </svg>
              </a>
            )}
            {club.youtube && (
              <a href={club.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.022-1.074-1.825-2.097-2.097C19.56 3.54 12 3.54 12 3.54s-7.56 0-9.401.526c-1.023.272-1.825 1.075-2.097 2.097C0 8.002 0 12 0 12s0 3.998.502 5.837c.272 1.022 1.074 1.825 2.097 2.097C4.44 20.46 12 20.46 12 20.46s7.56 0 9.401-.526c1.023-.272 1.825-1.075 2.097-2.097C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}
            {club.website && (
              <a href={club.website} target="_blank" rel="noreferrer" title="Website" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
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

            {/* Address & Detailed Contact Information */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                <div className="w-1 h-3.5 bg-red-600 rounded-full" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">THÔNG TIN ĐỊA ĐIỂM & LIÊN HỆ</h3>
              </div>

              <div className="space-y-4 text-xs">
                {club.englishName && (
                  <div className="flex justify-between items-start border-b border-zinc-900/60 pb-2.5">
                    <span className="text-zinc-500 font-mono">Tên Tiếng Anh</span>
                    <span className="font-bold text-zinc-300 text-right">{club.englishName}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start border-b border-zinc-900/60 pb-2.5">
                  <span className="text-zinc-500 font-mono shrink-0">Địa Chỉ Võ Đường</span>
                  <span className="font-bold text-zinc-300 text-right max-w-md pl-4">{club.address || "Chưa cập nhật"}</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2.5">
                  <span className="text-zinc-500 font-mono">Khu Vực / Thành Phố</span>
                  <span className="font-bold text-zinc-300">{club.city} (Miền {club.region === "north" ? "Bắc" : club.region === "south" ? "Nam" : "Trung"})</span>
                </div>

                {/* Extended Contact Links with styling */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-3">Các kênh truyền thông chính thức</span>
                  <div className="flex flex-wrap gap-2.5">
                    {club.facebook && (
                      <a href={club.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-zinc-300 hover:text-blue-500 hover:border-blue-500/25 transition-all text-[11px] no-underline">
                        <span>FB</span>
                        <span className="text-[9px] text-zinc-600">Facebook</span>
                      </a>
                    )}
                    {club.instagram && (
                      <a href={club.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-zinc-300 hover:text-pink-500 hover:border-pink-500/25 transition-all text-[11px] no-underline">
                        <span>IG</span>
                        <span className="text-[9px] text-zinc-600">Instagram</span>
                      </a>
                    )}
                    {club.tiktok && (
                      <a href={club.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all text-[11px] no-underline">
                        <span>TK</span>
                        <span className="text-[9px] text-zinc-600">TikTok</span>
                      </a>
                    )}
                    {club.youtube && (
                      <a href={club.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-zinc-300 hover:text-red-500 hover:border-red-500/25 transition-all text-[11px] no-underline">
                        <span>YT</span>
                        <span className="text-[9px] text-zinc-600">YouTube</span>
                      </a>
                    )}
                    {club.website && (
                      <a href={club.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-zinc-300 hover:text-amber-500 hover:border-amber-500/25 transition-all text-[11px] no-underline">
                        <span>🌐</span>
                        <span className="text-[9px] text-zinc-600">Website</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
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
