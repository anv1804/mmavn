import { theme } from "../config/theme";
import Button from "../components/UI/Button";
import GlassCard from "../components/UI/GlassCard";
import { mmaClubs } from "../data/clubs";

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export default function Home({ setCurrentTab }: HomeProps) {
  return (
    <div className={theme.container}>
      <div className="space-y-12">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16 bg-gradient-to-r from-red-950/40 to-zinc-900/40 border border-red-500/10 text-center md:text-left">
          <div className="max-w-xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">
              VIETNAM MMA PORTAL
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight text-white">
              Võ thuật tổng hợp <br/>
              <span className="text-red-500">Việt Nam 2026</span>
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Theo dõi tin tức võ sĩ, lịch thi đấu đấu trường UFC, bảng xếp hạng chính thức LION Championship và giao lưu cùng cộng đồng võ thuật Việt Nam.
            </p>
            <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <Button variant="primary" onClick={() => setCurrentTab("lion")}>
                Bảng xếp hạng LION
              </Button>
              <Button variant="secondary" onClick={() => setCurrentTab("community")}>
                Diễn đàn thảo luận
              </Button>
            </div>
          </div>
        </section>

        {/* Clubs Quick List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-400">
              🏛️ Các lò đào tạo MMA hàng đầu
            </h2>
            <button onClick={() => setCurrentTab("community")} className="text-[10px] font-mono text-red-500 hover:underline bg-transparent border-none cursor-pointer">
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mmaClubs.slice(0, 3).map((club) => (
              <GlassCard key={club.id} className="flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {club.city}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">
                      Thành lập: {club.foundedYear}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-base">{club.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{club.description}</p>
                </div>
                <div className="pt-4 border-t border-zinc-900 mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Fighters</span>
                  <span className="text-red-500 font-bold">{club.statistics.lionFighters}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
