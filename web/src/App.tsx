import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import GlassCard from "./components/UI/GlassCard";
import Button from "./components/UI/Button";
import { theme } from "./config/theme";

// Import rankings data
import { nam_52 } from "./data/rankings/nam_52";
import { nam_56 } from "./data/rankings/nam_56";
import { nam_60 } from "./data/rankings/nam_60";
import { nam_65 } from "./data/rankings/nam_65";
import { nam_70 } from "./data/rankings/nam_70";
import { nam_77 } from "./data/rankings/nam_77";
import { nu_48 } from "./data/rankings/nu_48";
import { nu_52 } from "./data/rankings/nu_52";

// Import other datasets
import { mmaClubs } from "./data/clubs";
import { ufcEvents } from "./data/ufcEvents";

interface Todo {
  id: number;
  name: string;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [selectedLionDiv, setSelectedLionDiv] = useState("56_nam");

  // Supabase Fetch
  useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await supabase.from("todos").select();
        if (data) {
          setTodos(data as Todo[]);
        }
      } catch (err) {
        console.error("Lỗi khi kết nối Supabase:", err);
      }
    }
    getTodos();
  }, []);

  // Supabase Add Todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ name: newTodoName.trim() }])
        .select();

      if (error) throw error;
      if (data) {
        setTodos([...todos, ...data as Todo[]]);
        setNewTodoName("");
      }
    } catch (err) {
      alert("Không thể thêm ghi chú. Vui lòng kiểm tra bảng RLS hoặc cấu hình Supabase.");
    }
  };

  const divisions: Record<string, typeof nam_56> = {
    "56_nam": nam_56,
    "60_nam": nam_60,
    "65_nam": nam_65,
    "70_nam": nam_70,
    "77_nam": nam_77,
    "52_nu": nu_52,
    "52_nam": nam_52,
    "48_nu": nu_48
  };

  const currentRankings = divisions[selectedLionDiv];

  const champions = [
    { ...nam_56.champion, division: "56kg Nam" },
    { ...nam_60.champion, division: "60kg Nam" },
    { ...nam_65.champion, division: "65kg Nam" },
    { ...nam_70.champion, division: "70kg Nam" },
    { ...nu_52.champion, division: "52kg Nữ" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-500 selection:text-white">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1">
        {/* Render Tab Contents */}
        {currentTab === "home" && (
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
                  <button onClick={() => setCurrentTab("community")} className="text-[10px] font-mono text-red-500 hover:underline">
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
        )}

        {currentTab === "lion" && (
          <div className={theme.container}>
            <div className="space-y-12">
              <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                  LION Championship
                </h1>
                <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
                  Bảng Xếp Hạng & Nhà Vô Địch MMA Việt Nam 2026
                </p>
              </div>

              {/* Champions Gallery */}
              <section className="space-y-6">
                <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                  🏆 Đương Kim Vô Địch (Champions)
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {champions.map((champ, idx) => (
                    <GlassCard key={idx} className="relative overflow-hidden group flex flex-col justify-between border border-red-500/10 hover:border-red-500/30">
                      <div className="absolute top-0 right-0 h-16 w-16 bg-red-600/10 rounded-bl-full flex items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-red-500 font-bold rotate-45 translate-x-1.5 -translate-y-1.5">★</span>
                      </div>
                      
                      <div className="space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                            {champ.division}
                          </span>
                          
                          {champ.photo ? (
                            <div className="relative w-full aspect-[4/3] flex items-end justify-center mt-2">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)] pointer-events-none"></div>
                              <img 
                                src={champ.photo} 
                                alt={champ.name} 
                                className="h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(239,68,68,0.3)] transition-all duration-300 group-hover:scale-108"
                              />
                            </div>
                          ) : (
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-900/50 bg-zinc-900/20 flex items-center justify-center mt-2 text-zinc-700">
                              <span className="text-3xl">👤</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-3">
                          <h3 className="text-sm font-black text-white leading-tight">{champ.name}</h3>
                          <p className="text-[10px] text-zinc-400 mt-0.5">{champ.club}</p>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 mt-4 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                        <span>Record</span>
                        <span className="text-red-500 font-bold">{champ.record}</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>

              {/* Contender Rankings */}
              <section className="space-y-6">
                <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                  📊 Bảng Xếp Hạng Thách Đấu (Contenders)
                </h2>

                <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
                  {Object.keys(divisions).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLionDiv(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border-none cursor-pointer ${
                        selectedLionDiv === key ? "bg-red-600 text-white" : "text-zinc-500 hover:text-zinc-300 bg-transparent"
                      }`}
                    >
                      {divisions[key].weightClass}
                    </button>
                  ))}
                </div>

                <GlassCard className="overflow-hidden border border-zinc-900 p-0">
                  <div className="p-5 border-b border-zinc-900 bg-zinc-900/20">
                    <h3 className="font-extrabold text-base text-zinc-200">
                      Hạng cân {currentRankings.weightClass}
                    </h3>
                    {currentRankings.champion ? (
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        Đương kim vô địch: <span className="text-red-500 font-bold">{currentRankings.champion.name}</span> ({currentRankings.champion.club})
                      </p>
                    ) : (
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        {currentRankings.description || "Hạng cân hiện đang bỏ trống hoặc không hoạt động."}
                      </p>
                    )}
                  </div>

                  {currentRankings.rankings && currentRankings.rankings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-zinc-900 bg-zinc-950/40 text-zinc-500 uppercase tracking-wider font-mono">
                            <th className="p-4 w-16 text-center">Thứ Hạng</th>
                            <th className="p-4">Võ Sĩ</th>
                            <th className="p-4">Câu Lạc Bộ</th>
                            <th className="p-4 text-center">Thành Tích</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRankings.rankings.map((fighter) => (
                            <tr key={fighter.rank} className="border-b border-zinc-900/40 hover:bg-zinc-900/10 transition-colors">
                              <td className="p-4 text-center font-bold font-mono text-zinc-400 text-sm">#{fighter.rank}</td>
                              <td className="p-4 font-extrabold text-zinc-200 text-sm">{fighter.name}</td>
                              <td className="p-4 text-zinc-400">{fighter.club}</td>
                              <td className="p-4 text-center font-mono font-bold text-red-500/80">{fighter.record}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-10 text-center text-zinc-500 text-xs font-mono">
                      Không có dữ liệu bảng xếp hạng thách đấu cho hạng cân này.
                    </div>
                  )}
                </GlassCard>
              </section>
            </div>
          </div>
        )}

        {currentTab === "ufc" && (
          <div className={theme.container}>
            <div className="space-y-12">
              <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                  Ultimate Fighting Championship
                </h1>
                <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
                  Đấu trường MMA số 1 thế giới
                </p>
              </div>

              {/* Recent Event */}
              <GlassCard className="p-6 border border-zinc-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      SỰ KIỆN VỪA DIỄN RA
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{ufcEvents.recent.date}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase">{ufcEvents.recent.eventName}</h2>
                    <p className="text-xs text-zinc-400 mt-1">{ufcEvents.recent.location}</p>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-zinc-900/60">
                    {ufcEvents.recent.results.map((res, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-zinc-950/50 rounded-xl border border-zinc-900">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">{res.bout}</span>
                          <p className="font-extrabold text-white text-sm">{res.fighters}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-red-500">{res.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Upcoming Events */}
              <section className="space-y-6">
                <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                  📅 Sự Kiện Sắp Diễn Ra (Upcoming)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ufcEvents.upcoming.map((evt, i) => (
                    <GlassCard key={i} className="border border-zinc-900">
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-zinc-500">{evt.date} • {evt.time}</span>
                        <h3 className="font-black text-white text-base uppercase leading-tight">{evt.eventName}</h3>
                        <p className="text-xs text-zinc-400">{evt.location}</p>
                        <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-900/80 mt-4">
                          <span className="text-[8px] font-mono text-zinc-600 block uppercase">Trận đấu chính</span>
                          <span className="font-extrabold text-sm text-red-500/90">{evt.mainEvent}</span>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {currentTab === "community" && (
          <div className={theme.container}>
            <div className="space-y-8">
              <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                  Cộng đồng MMAVN
                </h1>
                <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
                  Bảng Tin Tích Hợp Supabase Database
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Supabase Section */}
                <div className="lg:col-span-2 space-y-6">
                  <GlassCard className="border border-red-500/10">
                    <h2 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
                      💬 Bảng Tin / Việc Cần Làm (Todos)
                    </h2>
                    
                    <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                      <input
                        type="text"
                        value={newTodoName}
                        onChange={(e) => setNewTodoName(e.target.value)}
                        placeholder="Thêm tin nhắn hoặc việc cần làm..."
                        className={theme.input}
                      />
                      <Button type="submit" variant="primary">Gửi</Button>
                    </form>

                    {todos.length > 0 ? (
                      <ul className="space-y-3 p-0 m-0 list-none">
                        {todos.map((todo) => (
                          <li 
                            key={todo.id} 
                            className="flex items-center justify-between p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors"
                          >
                            <span className="text-sm text-zinc-200">{todo.name}</span>
                            <span className="text-[9px] font-mono text-zinc-600">ID: #{todo.id}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                        Chưa có dữ liệu nào trong bảng. Hãy gửi nội dung đầu tiên!
                      </div>
                    )}
                  </GlassCard>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                  <GlassCard className="border border-zinc-900">
                    <h3 className="font-extrabold text-sm text-white mb-2">Supabase Connection</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Dữ liệu ở cột bên cạnh đang được truy vấn trực tiếp thời gian thực từ cơ sở dữ liệu Supabase của bạn:
                    </p>
                    <code className="text-[10px] block break-all text-red-400 bg-zinc-950 p-2 rounded border border-zinc-900">
                      https://lvdpvkzpmxshxtmqbpqy.supabase.co
                    </code>
                  </GlassCard>

                  <GlassCard className="border border-zinc-900">
                    <h3 className="font-extrabold text-sm text-white mb-2">Thống kê diễn đàn</h3>
                    <ul className="space-y-2 p-0 m-0 list-none text-xs text-zinc-400 font-mono">
                      <li className="flex justify-between">
                        <span>Số lượng bản ghi:</span>
                        <span className="text-red-500 font-bold">{todos.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Trạng thái kết nối:</span>
                        <span className="text-emerald-500">ONLINE</span>
                      </li>
                    </ul>
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === "contact" && (
          <div className={theme.container}>
            <div className="max-w-xl mx-auto space-y-8">
              <div className="text-center space-y-2 border-b border-zinc-900 pb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                  Liên Hệ
                </h1>
                <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
                  Gửi đóng góp ý kiến về MMAVN
                </p>
              </div>

              <GlassCard className="border border-zinc-900">
                <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã gửi ý kiến!'); }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Họ & Tên</label>
                    <input type="text" placeholder="Nguyễn Văn A" required className={theme.input} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Email</label>
                    <input type="email" placeholder="email@gmail.com" required className={theme.input} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Nội dung liên hệ</label>
                    <textarea rows={4} placeholder="Tôi muốn đóng góp ý kiến về..." required className={`${theme.input} resize-none`} />
                  </div>
                  <Button type="submit" variant="primary" className="w-full">
                    Gửi Liên Hệ
                  </Button>
                </form>
              </GlassCard>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
