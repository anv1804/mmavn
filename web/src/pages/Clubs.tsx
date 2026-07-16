import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import type { MMAClub } from "../interfaces/club";

export default function Clubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<MMAClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchClubs() {
      try {
        const { data, error } = await supabase
          .from("clubs")
          .select("*")
          .eq("active", true);

        if (error) throw error;
        if (data) {
          // Map DB response to MMAClub model naming
          const mapped = data.map((d: any) => ({
            id: d.id,
            slug: d.slug,
            name: d.name,
            shortName: d.short_name,
            englishName: d.english_name,
            city: d.city,
            district: d.district,
            address: d.address,
            region: d.region,
            foundedYear: d.founded_year,
            logo: d.logo,
            cover: d.cover,
            website: d.website,
            facebook: d.facebook,
            youtube: d.youtube,
            instagram: d.instagram,
            tiktok: d.tiktok,
            headCoach: d.head_coach,
            assistantCoaches: d.assistant_coaches,
            description: d.description,
            disciplines: d.disciplines,
            achievements: d.achievements,
            competitions: d.competitions,
            statistics: d.statistics,
            active: d.active,
            updatedAt: d.updated_at,
          }));
          setClubs(mapped);
        }
      } catch (err) {
        console.error("Error loading clubs from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) || 
                          club.city.toLowerCase().includes(search.toLowerCase()) ||
                          club.headCoach.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "all" || club.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-[#030303] text-white py-12 px-6 relative overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Background glow sparks */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-zinc-800/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Page title and description */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-red-400 font-bold uppercase">Cơ sở Đào tạo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Võ Đường & CLB MMA Chuyên Nghiệp
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl font-light">
            Nơi rèn luyện, đào tạo và phát hiện những tài năng võ thuật xuất sắc hàng đầu, cống hiến cho giải đấu chuyên nghiệp LION Championship.
          </p>
        </div>

        {/* Filter controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên CLB, huấn luyện viên, địa điểm..."
              className="w-full bg-[#080809] border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-500/40"
            />
          </div>

          <div className="flex items-center gap-2">
            {["all", "north", "south"].map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 border cursor-pointer ${
                  regionFilter === reg 
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/15" 
                    : "bg-transparent border-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {reg === "all" ? "Tất cả miền" : reg === "north" ? "Miền Bắc" : "Miền Nam"}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Đang tải danh sách...</span>
          </div>
        ) : (
          /* Clubs grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div 
                key={club.id}
                onClick={() => navigate(`/club/${club.id}`)}
                className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/[0.01]"
              >
                {/* Subtle top corner neon bracket */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-red-600/10 group-hover:border-red-600/45 transition-colors" />

                <div className="space-y-5">
                  {/* Header card: logo and names */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden p-2 group-hover:border-red-500/20 transition-all">
                      <img 
                        src={club.logo} 
                        alt={club.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }} 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors leading-snug">{club.name}</h3>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{club.city} · {club.district}</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-light">
                    {club.description}
                  </p>

                  {/* Disciplines tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {club.disciplines.map((d) => (
                      <span 
                        key={d}
                        className="text-[9px] font-mono font-bold bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-800/60"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Stats block */}
                  <div className="grid grid-cols-3 gap-2 bg-[#080809] border border-zinc-900 rounded-xl p-3.5 text-center">
                    <div>
                      <div className="text-base font-black text-white font-mono">{club.statistics.lionFighters}</div>
                      <div className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">Võ sĩ LION</div>
                    </div>
                    <div>
                      <div className="text-base font-black text-amber-500 font-mono">{club.statistics.champions}</div>
                      <div className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">Đai Vô địch</div>
                    </div>
                    <div>
                      <div className="text-base font-black text-emerald-400 font-mono">{club.statistics.wins}</div>
                      <div className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">Thắng MMA</div>
                    </div>
                  </div>
                </div>

                {/* Action row footer */}
                <div className="mt-5 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-500">HLV trưởng: {club.headCoach}</span>
                  <span className="text-[9px] font-mono text-red-500 group-hover:translate-x-1.5 transition-transform duration-200 block font-bold">
                    XEM CHI TIẾT &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
