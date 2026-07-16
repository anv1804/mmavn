import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useTheme } from "../context/ThemeContext";

type Tab = "dashboard" | "clubs" | "fighters" | "rankings" | "events";

export default function Cms() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Check login session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("mmavn_admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setAuthError("");
      sessionStorage.setItem("mmavn_admin_session", "active");
      showMsg("Đăng nhập hệ thống thành công!");
    } else {
      setAuthError("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất khỏi hệ thống CMS?")) {
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      sessionStorage.removeItem("mmavn_admin_session");
    }
  };

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Status message
  const [msg, setMsg] = useState({ text: "", type: "" });
  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 4000);
  };

  // Data states
  const [clubs, setClubs] = useState<any[]>([]);
  const [fighters, setFighters] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Edit / Form states
  const [selectedClub, setSelectedClub] = useState<any | null>(null);
  const [selectedFighter, setSelectedFighter] = useState<any | null>(null);
  const [selectedRanking, setSelectedRanking] = useState<any | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Fetch initial data
  useEffect(() => {
    if (!isLoggedIn) return;
    async function loadData() {
      setLoading(true);
      try {
        const { data: cData } = await supabase.from("clubs").select("*").order("name");
        const { data: fData } = await supabase.from("fighters").select("*").order("name");
        const { data: rData } = await supabase.from("rankings").select("*");

        if (cData) setClubs(cData);
        if (fData) setFighters(fData);
        if (rData) setRankings(rData);

        const storedEvts = localStorage.getItem("mmavn_events");
        if (storedEvts) {
          setEvents(JSON.parse(storedEvts));
        } else {
          const defaultEvts = [
            { id: "e1", title: "LION Championship 34", date: "Thứ Bảy, ngày 18 tháng 7, 2026", loc: "Nhà thi đấu Rạch Miễu, TP. HCM", type: "Championship Bout", status: "Trực tiếp lúc 19:00" },
            { id: "e2", title: "UFC 326: Jones vs Aspinall", date: "Chủ Nhật, ngày 26 tháng 7, 2026", loc: "Madison Square Garden, New York", type: "Heavyweight Title Match", status: "Phát sóng độc quyền" },
            { id: "e3", title: "LION Championship 35", date: "Thứ Bảy, ngày 15 tháng 8, 2026", loc: "Quần Ngựa, Tây Hồ, Hà Nội", type: "Official Rankings Matches", status: "Bán vé chính thức" },
          ];
          localStorage.setItem("mmavn_events", JSON.stringify(defaultEvts));
          setEvents(defaultEvts);
        }
      } catch (err) {
        console.error("Error loading CMS data:", err);
        showMsg("Lỗi tải cơ sở dữ liệu", "error");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [isLoggedIn]);

  const saveEvents = (newEvents: any[]) => {
    setEvents(newEvents);
    localStorage.setItem("mmavn_events", JSON.stringify(newEvents));
  };

  const deleteClub = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa võ đường này?")) return;
    const { error } = await supabase.from("clubs").delete().eq("id", id);
    if (error) {
      showMsg("Lỗi xóa: " + error.message, "error");
    } else {
      setClubs(clubs.filter(c => c.id !== id));
      showMsg("Đã xóa võ đường thành công!");
    }
  };

  const deleteFighter = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa võ sĩ này?")) return;
    const { error } = await supabase.from("fighters").delete().eq("id", id);
    if (error) {
      showMsg("Lỗi xóa: " + error.message, "error");
    } else {
      setFighters(fighters.filter(f => f.id !== id));
      showMsg("Đã xóa võ sĩ thành công!");
    }
  };

  const deleteEvent = (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa sự kiện này?")) return;
    const updated = events.filter(e => e.id !== id);
    saveEvents(updated);
    showMsg("Đã xóa sự kiện thành công!");
  };

  const initNewClub = () => {
    setSelectedClub({
      id: "club-" + Date.now(),
      slug: "new-club-" + Math.floor(Math.random() * 1000),
      name: "",
      short_name: "",
      city: "TP. Hồ Chí Minh",
      district: "",
      address: "",
      head_coach: "",
      disciplines: ["MMA"],
      description: "",
      founded_year: 2026,
      logo: "/logo-lionchampionship.png",
      cover: "",
      facebook: "",
      tiktok: "",
      statistics: { wins: 0, losses: 0, draws: 0, lionFighters: 0, koWins: 0, submissionWins: 0 },
      active: true
    });
  };

  const initNewFighter = () => {
    setSelectedFighter({
      id: "fighter-" + Date.now(),
      name: "",
      nickname: "",
      weight_class: "56kg",
      club: "",
      coach: "",
      photo: "/lvt.png",
      bio: "",
      birth_year: 1998,
      age: 28,
      height: 168,
      reach: 168,
      hometown: "",
      nationality: "Việt Nam",
      flag: "🇻🇳",
      wins: 0,
      losses: 0,
      draws: 0,
      ko_wins: 0,
      sub_wins: 0,
      decision_wins: 0,
      active: true
    });
  };

  const initNewEvent = () => {
    setSelectedEvent({
      id: "event-" + Date.now(),
      title: "",
      date: "",
      loc: "",
      type: "Championship Bout",
      status: "Sắp diễn ra"
    });
  };

  const saveClubForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClub.name) {
      showMsg("Vui lòng điền tên võ đường", "error");
      return;
    }
    const { error } = await supabase.from("clubs").upsert(selectedClub);
    if (error) {
      showMsg("Lỗi lưu võ đường: " + error.message, "error");
    } else {
      const idx = clubs.findIndex(c => c.id === selectedClub.id);
      if (idx > -1) {
        setClubs(clubs.map(c => c.id === selectedClub.id ? selectedClub : c));
      } else {
        setClubs([...clubs, selectedClub].sort((a,b) => a.name.localeCompare(b.name)));
      }
      setSelectedClub(null);
      showMsg("Đã lưu võ đường thành công!");
    }
  };

  const saveFighterForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFighter.name) {
      showMsg("Vui lòng nhập tên võ sĩ", "error");
      return;
    }
    const { error } = await supabase.from("fighters").upsert(selectedFighter);
    if (error) {
      showMsg("Lỗi lưu võ sĩ: " + error.message, "error");
    } else {
      const idx = fighters.findIndex(f => f.id === selectedFighter.id);
      if (idx > -1) {
        setFighters(fighters.map(f => f.id === selectedFighter.id ? selectedFighter : f));
      } else {
        setFighters([...fighters, selectedFighter].sort((a,b) => a.name.localeCompare(b.name)));
      }
      setSelectedFighter(null);
      showMsg("Đã lưu hồ sơ võ sĩ thành công!");
    }
  };

  const saveRankingForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("rankings").upsert(selectedRanking);
    if (error) {
      showMsg("Lỗi lưu bảng xếp hạng: " + error.message, "error");
    } else {
      setRankings(rankings.map(r => r.id === selectedRanking.id ? selectedRanking : r));
      setSelectedRanking(null);
      showMsg("Đã lưu bảng xếp hạng hạng cân thành công!");
    }
  };

  const saveEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent.title || !selectedEvent.date) {
      showMsg("Vui lòng điền tiêu đề và ngày sự kiện", "error");
      return;
    }
    const idx = events.findIndex(evt => evt.id === selectedEvent.id);
    let updated;
    if (idx > -1) {
      updated = events.map(evt => evt.id === selectedEvent.id ? selectedEvent : evt);
    } else {
      updated = [...events, selectedEvent];
    }
    saveEvents(updated);
    setSelectedEvent(null);
    showMsg("Đã lưu sự kiện thành công!");
  };

  const filteredClubs = clubs.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFighters = fighters.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || (f.nickname && f.nickname.toLowerCase().includes(searchQuery.toLowerCase())));
  const filteredRankings = rankings.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.loc.toLowerCase().includes(searchQuery.toLowerCase()));

  // ── RENDER LOGIN GATE IF NOT LOGGED IN ──
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? "bg-[#050508] text-white" : "bg-[#f8f9fa] text-zinc-900"
      }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        
        {/* Glow Spheres for Login page */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className={`w-full max-w-md p-8 border rounded-3xl relative z-10 shadow-2xl backdrop-blur-md transition-all ${
          isDark ? "bg-zinc-950/80 border-zinc-900 shadow-black/80" : "bg-white border-zinc-200 shadow-zinc-200/50"
        }`}>
          
          <div className="flex flex-col items-center mb-8">
            <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-14 h-14 object-contain mb-3 drop-shadow-[0_4px_10px_rgba(239,68,68,0.2)]" />
            <h2 className="text-2xl font-black uppercase font-mono tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              MMAVN CMS LOGIN
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">Cổng quản trị cơ sở dữ liệu hệ thống</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-500 text-center">
                ⚠️ {authError}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-mono uppercase block">Tài khoản</label>
              <input 
                type="text" 
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs transition-all ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500 focus:outline-none" 
                    : "bg-zinc-50 border-zinc-250 text-zinc-900 focus:border-red-500 focus:outline-none"
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 font-mono uppercase block">Mật khẩu</label>
              <input 
                type="password" 
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs transition-all ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500 focus:outline-none" 
                    : "bg-zinc-50 border-zinc-250 text-zinc-900 focus:border-red-500 focus:outline-none"
                }`}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-650 hover:to-red-550 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-red-600/20 active:scale-98"
            >
              Đăng Nhập
            </button>

            <button 
              type="button"
              onClick={() => navigate("/")}
              className={`w-full py-2.5 bg-transparent border-none text-[10px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer mt-2`}
            >
              &larr; Quay lại trang chủ
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── RENDER DEDICATED CMS DASHBOARD ONCE AUTHENTICATED ──
  return (
    <div className={`h-screen flex overflow-hidden ${
      isDark ? "bg-[#030303] text-zinc-100" : "bg-[#f8f9fa] text-zinc-900"
    }`} style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ── LEFT SIDEBAR NAVIGATION ── Styled identically to requested layout */}
      <div className={`w-64 flex flex-col justify-between border-r shrink-0 ${
        isDark ? "bg-zinc-950/90 border-zinc-900" : "bg-white border-zinc-200"
      }`}>
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="p-6 border-b flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")} style={{ borderColor: isDark ? "#121214" : "#f1f1f4" }}>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/10">
              A
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-tight block">ANV SPORT</span>
              <span className="text-[8px] font-mono font-bold text-zinc-400 tracking-wider block">WORKSPACE</span>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="p-4 space-y-6">
            
            {/* Section 1: Quản Lý */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">QUẢN LÝ</span>
              
              <button
                onClick={() => { setActiveTab("dashboard"); setSelectedClub(null); setSelectedFighter(null); setSelectedRanking(null); setSelectedEvent(null); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border-none cursor-pointer text-left ${
                  activeTab === "dashboard"
                    ? isDark ? "bg-zinc-900 text-white" : "bg-emerald-50 text-emerald-600"
                    : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/50" : "bg-transparent text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm">🎛️</span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => { setActiveTab("events"); setSelectedClub(null); setSelectedFighter(null); setSelectedRanking(null); setSelectedEvent(null); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border-none cursor-pointer text-left ${
                  activeTab === "events"
                    ? isDark ? "bg-zinc-900 text-white" : "bg-emerald-50 text-emerald-600"
                    : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/50" : "bg-transparent text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm">📅</span>
                <span>Lịch Sự Kiện</span>
              </button>
            </div>

            {/* Section 2: Kho dữ liệu */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">KHO DỮ LIỆU</span>
              
              <button
                onClick={() => { setActiveTab("fighters"); setSelectedClub(null); setSelectedFighter(null); setSelectedRanking(null); setSelectedEvent(null); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border-none cursor-pointer text-left ${
                  activeTab === "fighters"
                    ? isDark ? "bg-zinc-900 text-white" : "bg-emerald-50 text-emerald-600"
                    : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/50" : "bg-transparent text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm">🥋</span>
                <span>Võ Sĩ / VĐV</span>
              </button>

              <button
                onClick={() => { setActiveTab("clubs"); setSelectedClub(null); setSelectedFighter(null); setSelectedRanking(null); setSelectedEvent(null); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border-none cursor-pointer text-left ${
                  activeTab === "clubs"
                    ? isDark ? "bg-zinc-900 text-white" : "bg-emerald-50 text-emerald-600"
                    : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/50" : "bg-transparent text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm">🏢</span>
                <span>Câu Lạc Bộ</span>
              </button>

              <button
                onClick={() => { setActiveTab("rankings"); setSelectedClub(null); setSelectedFighter(null); setSelectedRanking(null); setSelectedEvent(null); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border-none cursor-pointer text-left ${
                  activeTab === "rankings"
                    ? isDark ? "bg-zinc-900 text-white" : "bg-emerald-50 text-emerald-600"
                    : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/50" : "bg-transparent text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm">🏆</span>
                <span>Hạng Cân / BXH</span>
              </button>
            </div>

          </div>
        </div>

        {/* Profile Card & Logout bottom layout */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: isDark ? "#121214" : "#f1f1f4" }}>
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${isDark ? "bg-zinc-900/40 border-zinc-900" : "bg-zinc-50 border-zinc-150"}`}>
            <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">
              A
            </span>
            <div className="overflow-hidden">
              <span className="text-[10px] font-bold block leading-none truncate">admin@mmavn.com</span>
              <span className="inline-block bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 rounded text-[8px] font-mono tracking-widest px-1 py-0.5 mt-1 font-black">
                ADMIN
              </span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-mono font-bold uppercase cursor-pointer transition-all ${
              isDark 
                ? "bg-zinc-900/60 hover:bg-red-950/20 hover:text-red-500 border-zinc-800 text-zinc-400" 
                : "bg-zinc-50 hover:bg-red-50 hover:text-red-600 border-zinc-200 text-zinc-600"
            }`}
          >
            <span>🚪 Đăng Xuất</span>
          </button>
        </div>
      </div>

      {/* ── RIGHT MAIN PANEL ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className={`h-16 border-b flex items-center justify-between px-8 z-10 shrink-0 ${
          isDark ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-zinc-200"
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>ANV PORTAL</span>
            <span>/</span>
            <span className="text-red-500 uppercase font-bold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[9px] font-mono border rounded-md px-2 py-0.5 ${
              isDark ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-100 text-zinc-600"
            }`}>
              DB: {loading ? "CONNECTING..." : "ONLINE"}
            </span>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Status notification */}
          {msg.text && (
            <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 transition-all text-xs font-bold uppercase tracking-wider ${
              msg.type === "success" 
                ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                : "bg-red-600 text-white shadow-red-600/20"
            }`}>
              <span>{msg.type === "success" ? "✓" : "⚠"}</span>
              <span>{msg.text}</span>
            </div>
          )}

          {/* ── TAB: OVERVIEW DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Title Header */}
              <div>
                <h1 className="text-3xl font-black tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Tổng Quan Hệ Thống</h1>
                <p className="text-xs text-zinc-500 font-light mt-1">Theo dõi hiệu suất và số liệu của nền tảng ngày hôm nay.</p>
              </div>

              {/* Dynamic Stats Cards (styled like the requested mockup screenshot) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Võ sĩ LION */}
                <div className={`p-6 border rounded-3xl flex justify-between items-start transition-all relative overflow-hidden shadow-lg ${
                  isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"
                }`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">VÕ SĨ HOẠT ĐỘNG</span>
                      <span className="text-4xl font-black font-mono mt-1 block">{loading ? "..." : fighters.length}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ↗ Đang hoạt động
                    </span>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 text-lg">
                    🥋
                  </span>
                </div>

                {/* Card 2: Lò Đào Tạo */}
                <div className={`p-6 border rounded-3xl flex justify-between items-start transition-all relative overflow-hidden shadow-lg ${
                  isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"
                }`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">VÕ ĐƯỜNG LIÊN KẾT</span>
                      <span className="text-4xl font-black font-mono mt-1 block">{loading ? "..." : clubs.length}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                      ↗ Kết nối ổn định
                    </span>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-500 text-lg">
                    🏢
                  </span>
                </div>

                {/* Card 3: Sự kiện đang chạy */}
                <div className={`p-6 border rounded-3xl flex justify-between items-start transition-all relative overflow-hidden shadow-lg ${
                  isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"
                }`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">LỊCH SỰ KIỆN LIVE</span>
                      <span className="text-4xl font-black font-mono mt-1 block">{loading ? "..." : events.length}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      ↗ Đồng bộ hệ thống
                    </span>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 text-lg">
                    📅
                  </span>
                </div>

              </div>

              {/* ── ANALYTICS LINE GRAPHS (Styled like the requested mockup screenshot) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Graph 1: Lượt xem 24 giờ qua */}
                <div className={`p-6 border rounded-3xl space-y-4 shadow-lg ${
                  isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase font-mono">Lượt xem 24 giờ qua</h3>
                    <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">Realtime</span>
                  </div>
                  {/* Clean SVG Line chart representation */}
                  <div className="h-44 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path 
                        d="M0,28 Q10,25 20,27 T40,25 T60,20 T80,28 T100,28" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="1.5" 
                      />
                      <line x1="0" y1="29" x2="100" y2="29" stroke={isDark ? "#1f1f23" : "#e4e4e7"} strokeWidth="0.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                    <span>11:00</span>
                    <span>15:00</span>
                    <span>19:00</span>
                    <span>23:00</span>
                    <span>3:00</span>
                    <span>7:00</span>
                  </div>
                </div>

                {/* Graph 2: Lượt xem 7 ngày qua */}
                <div className={`p-6 border rounded-3xl space-y-4 shadow-lg ${
                  isDark ? "bg-zinc-950/70 border-zinc-900" : "bg-white border-zinc-200/60"
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase font-mono">Lượt xem 7 ngày qua</h3>
                    <span className="text-[9px] font-mono font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded uppercase">Daily</span>
                  </div>
                  {/* Clean SVG Line chart representation with gradient fill */}
                  <div className="h-44 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,29 L10,29 L20,29 L30,29 L40,29 L50,29 C55,29 58,10 65,10 C70,10 73,20 80,26 C85,29 90,29 100,29"
                        fill="url(#purpleGrad)" 
                      />
                      <path 
                        d="M0,29 L10,29 L20,29 L30,29 L40,29 L50,29 C55,29 58,10 65,10 C70,10 73,20 80,26 C85,29 90,29 100,29" 
                        fill="none" 
                        stroke="#a855f7" 
                        strokeWidth="1.5" 
                      />
                      <line x1="0" y1="29" x2="100" y2="29" stroke={isDark ? "#1f1f23" : "#e4e4e7"} strokeWidth="0.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                    <span>10-07</span>
                    <span>11-07</span>
                    <span>12-07</span>
                    <span>13-07</span>
                    <span>14-07</span>
                    <span>15-07</span>
                    <span>16-07</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Form & List filters row (Only show when not editing) */}
          {activeTab !== "dashboard" && !selectedClub && !selectedFighter && !selectedRanking && !selectedEvent && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-transparent">
              <input
                type="text"
                placeholder={`Tìm kiếm ${activeTab === "clubs" ? "võ đường..." : activeTab === "fighters" ? "võ sĩ..." : activeTab === "rankings" ? "hạng cân..." : "sự kiện..."}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2.5 rounded-xl border text-sm w-full sm:max-w-xs transition-all ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500 focus:outline-none" 
                    : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
                }`}
              />
              
              {activeTab !== "rankings" && (
                <button
                  onClick={() => {
                    if (activeTab === "clubs") initNewClub();
                    if (activeTab === "fighters") initNewFighter();
                    if (activeTab === "events") initNewEvent();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-650 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none transition-all shadow-md shadow-red-600/10 cursor-pointer"
                >
                  + Tạo mới {activeTab === "clubs" ? "Võ Đường" : activeTab === "fighters" ? "Võ Sĩ" : "Sự Kiện"}
                </button>
              )}
            </div>
          )}

          {/* ── TAB 1: CLUBS MANAGEMENT LIST ── */}
          {activeTab === "clubs" && !selectedClub && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredClubs.map((club) => (
                <div key={club.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                  isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-850" : "bg-white border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <img src={club.logo || "/logo-lionchampionship.png"} alt={club.name} className="w-12 h-12 object-contain bg-zinc-950 rounded-xl p-1" />
                    <div>
                      <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{club.name}</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">{club.city} · HLV {club.head_coach}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedClub(club)} className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Sửa</button>
                    <button onClick={() => deleteClub(club.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-655 text-red-500 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Xóa</button>
                  </div>
                </div>
              ))}
              {filteredClubs.length === 0 && <p className="text-zinc-500 text-xs py-4 font-mono">Không tìm thấy kết quả.</p>}
            </div>
          )}

          {/* ── TAB 2: FIGHTERS MANAGEMENT LIST ── */}
          {activeTab === "fighters" && !selectedFighter && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFighters.map((fighter) => (
                <div key={fighter.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                  isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-850" : "bg-white border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <img src={fighter.photo || "/lvt.png"} alt={fighter.name} className="w-10 h-10 object-cover bg-zinc-950 rounded-full object-top" />
                    <div>
                      <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{fighter.name} {fighter.nickname && <span className="text-zinc-500 text-xs">({fighter.nickname})</span>}</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">{fighter.weight_class} · {fighter.club} · {fighter.wins}W-{fighter.losses}L</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedFighter(fighter)} className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Sửa</button>
                    <button onClick={() => deleteFighter(fighter.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-655 text-red-500 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Xóa</button>
                  </div>
                </div>
              ))}
              {filteredFighters.length === 0 && <p className="text-zinc-500 text-xs py-4 font-mono">Không tìm thấy kết quả.</p>}
            </div>
          )}

          {/* ── TAB 3: RANKINGS / DIVISIONS LIST ── */}
          {activeTab === "rankings" && !selectedRanking && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRankings.map((ranking) => (
                <div key={ranking.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                  isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-850" : "bg-white border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div>
                    <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{ranking.name}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono font-light">Đương kim vô địch: {ranking.champion?.name || "Bỏ trống"}</p>
                  </div>
                  <button onClick={() => setSelectedRanking(ranking)} className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Quản lý BXH</button>
                </div>
              ))}
            </div>
          )}

          {/* ── TAB 4: EVENTS LIST ── */}
          {activeTab === "events" && !selectedEvent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((evt) => (
                <div key={evt.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                  isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-850" : "bg-white border-zinc-200 hover:border-zinc-300"
                }`}>
                  <div>
                    <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{evt.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono">{evt.date} · {evt.loc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedEvent(evt)} className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Sửa</button>
                    <button onClick={() => deleteEvent(evt.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-655 text-red-500 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer">Xóa</button>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && <p className="text-zinc-500 text-xs py-4 font-mono">Không tìm thấy kết quả.</p>}
            </div>
          )}


          {/* ── FORM 1: CLUB CREATE/EDIT FORM ── */}
          {selectedClub && (
            <form onSubmit={saveClubForm} className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"
            }`}>
              <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
                {selectedClub.name ? "Cập nhật võ đường" : "Tạo mới võ đường"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Mã Võ đường (Unique ID)*</label>
                  <input type="text" value={selectedClub.id} disabled onChange={(e) => setSelectedClub({ ...selectedClub, id: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Slug đường dẫn*</label>
                  <input type="text" value={selectedClub.slug} onChange={(e) => setSelectedClub({ ...selectedClub, slug: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tên Võ đường*</label>
                  <input type="text" value={selectedClub.name} onChange={(e) => setSelectedClub({ ...selectedClub, name: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tên viết tắt (Short Name)</label>
                  <input type="text" value={selectedClub.short_name || ""} onChange={(e) => setSelectedClub({ ...selectedClub, short_name: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tỉnh / Thành Phố</label>
                  <input type="text" value={selectedClub.city} onChange={(e) => setSelectedClub({ ...selectedClub, city: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Địa chỉ chi tiết</label>
                  <input type="text" value={selectedClub.address || ""} onChange={(e) => setSelectedClub({ ...selectedClub, address: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Huấn luyện viên trưởng</label>
                  <input type="text" value={selectedClub.head_coach || ""} onChange={(e) => setSelectedClub({ ...selectedClub, head_coach: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Năm thành lập</label>
                  <input type="number" value={selectedClub.founded_year || 2026} onChange={(e) => setSelectedClub({ ...selectedClub, founded_year: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Bộ môn giảng dạy (cách nhau bởi dấu phẩy)</label>
                  <input type="text" value={selectedClub.disciplines.join(", ")} onChange={(e) => setSelectedClub({ ...selectedClub, disciplines: e.target.value.split(",").map(d => d.trim()) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Đường dẫn Logo URL</label>
                  <input type="text" value={selectedClub.logo || ""} onChange={(e) => setSelectedClub({ ...selectedClub, logo: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block">Giới thiệu ngắn gọn</label>
                <textarea value={selectedClub.description || ""} rows={3} onChange={(e) => setSelectedClub({ ...selectedClub, description: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu võ đường</button>
                <button type="button" onClick={() => setSelectedClub(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
              </div>
            </form>
          )}

          {/* ── FORM 2: FIGHTER CREATE/EDIT FORM ── */}
          {selectedFighter && (
            <form onSubmit={saveFighterForm} className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"
            }`}>
              <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
                {selectedFighter.name ? "Cập nhật võ sĩ" : "Tạo mới võ sĩ"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Mã Võ Sĩ (Unique ID)*</label>
                  <input type="text" value={selectedFighter.id} disabled onChange={(e) => setSelectedFighter({ ...selectedFighter, id: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-zinc-505" : "bg-zinc-100 border-zinc-200"}`} />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Họ Tên Võ sĩ*</label>
                  <input type="text" value={selectedFighter.name} onChange={(e) => setSelectedFighter({ ...selectedFighter, name: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Biệt danh (Nickname)</label>
                  <input type="text" value={selectedFighter.nickname || ""} onChange={(e) => setSelectedFighter({ ...selectedFighter, nickname: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Hạng cân (ví dụ: 56kg, 60kg)</label>
                  <input type="text" value={selectedFighter.weight_class} onChange={(e) => setSelectedFighter({ ...selectedFighter, weight_class: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Võ đường trực thuộc</label>
                  <input type="text" value={selectedFighter.club || ""} onChange={(e) => setSelectedFighter({ ...selectedFighter, club: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tuổi</label>
                  <input type="number" value={selectedFighter.age || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, age: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Chiều cao (cm)</label>
                  <input type="number" value={selectedFighter.height || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, height: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Sải tay (cm)</label>
                  <input type="number" value={selectedFighter.reach || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, reach: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Thành phố quê quán</label>
                  <input type="text" value={selectedFighter.hometown || ""} onChange={(e) => setSelectedFighter({ ...selectedFighter, hometown: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Quốc tịch</label>
                  <input type="text" value={selectedFighter.nationality || ""} onChange={(e) => setSelectedFighter({ ...selectedFighter, nationality: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Quốc kỳ (Emoji)</label>
                  <input type="text" value={selectedFighter.flag || "🇻🇳"} onChange={(e) => setSelectedFighter({ ...selectedFighter, flag: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Số Trận Thắng</label>
                  <input type="number" value={selectedFighter.wins || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, wins: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Số Trận Thua</label>
                  <input type="number" value={selectedFighter.losses || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, losses: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Số Trận Hòa</label>
                  <input type="number" value={selectedFighter.draws || 0} onChange={(e) => setSelectedFighter({ ...selectedFighter, draws: parseInt(e.target.value) })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block">Đường dẫn ảnh võ sĩ URL</label>
                <input type="text" value={selectedFighter.photo || ""} onChange={(e) => setSelectedFighter({ ...selectedFighter, photo: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tiểu sử võ sĩ</label>
                <textarea value={selectedFighter.bio || ""} rows={3} onChange={(e) => setSelectedFighter({ ...selectedFighter, bio: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu võ sĩ</button>
                <button type="button" onClick={() => setSelectedFighter(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
              </div>
            </form>
          )}

          {/* ── FORM 3: RANKINGS / DIVISION EDIT FORM ── */}
          {selectedRanking && (
            <form onSubmit={saveRankingForm} className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"
            }`}>
              <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
                Quản lý Bảng xếp hạng: {selectedRanking.name}
              </h2>

              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">🏆 Đương kim vô địch (Champion)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Họ tên Champion</label>
                    <input type="text" value={selectedRanking.champion?.name || ""} onChange={(e) => setSelectedRanking({
                      ...selectedRanking,
                      champion: { ...selectedRanking.champion, name: e.target.value }
                    })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Thành tích (ví dụ: 12-2-0)</label>
                    <input type="text" value={selectedRanking.champion?.record || ""} onChange={(e) => setSelectedRanking({
                      ...selectedRanking,
                      champion: { ...selectedRanking.champion, record: e.target.value }
                    })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-mono uppercase block">Võ đường</label>
                    <input type="text" value={selectedRanking.champion?.club || ""} onChange={(e) => setSelectedRanking({
                      ...selectedRanking,
                      champion: { ...selectedRanking.champion, club: e.target.value }
                    })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">📋 Danh sách xếp hạng từ Top 1 trở đi</h3>
                <div className="space-y-3">
                  {((selectedRanking.rankings || []) as any[]).map((rankedFighter, rankIdx) => (
                    <div key={rankIdx} className={`p-3 border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${isDark ? "bg-zinc-900/40 border-zinc-900" : "bg-zinc-50 border-zinc-150"}`}>
                      <div className="md:col-span-1 text-center font-black font-mono text-zinc-400">
                        Rank {rankedFighter.rank}
                      </div>
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[8px] text-zinc-500 font-mono block">Họ Tên</label>
                        <input type="text" value={rankedFighter.name} onChange={(e) => {
                          const nextRankings = [...selectedRanking.rankings];
                          nextRankings[rankIdx].name = e.target.value;
                          setSelectedRanking({ ...selectedRanking, rankings: nextRankings });
                        }} className={`w-full px-2 py-1 rounded border text-[11px] ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                      </div>
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[8px] text-zinc-500 font-mono block">Thành tích (LION record)</label>
                        <input type="text" value={rankedFighter.record} onChange={(e) => {
                          const nextRankings = [...selectedRanking.rankings];
                          nextRankings[rankIdx].record = e.target.value;
                          setSelectedRanking({ ...selectedRanking, rankings: nextRankings });
                        }} className={`w-full px-2 py-1 rounded border text-[11px] ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                      </div>
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[8px] text-zinc-500 font-mono block">Võ đường</label>
                        <input type="text" value={rankedFighter.club} onChange={(e) => {
                          const nextRankings = [...selectedRanking.rankings];
                          nextRankings[rankIdx].club = e.target.value;
                          setSelectedRanking({ ...selectedRanking, rankings: nextRankings });
                        }} className={`w-full px-2 py-1 rounded border text-[11px] ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu bảng xếp hạng</button>
                <button type="button" onClick={() => setSelectedRanking(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
              </div>
            </form>
          )}

          {/* ── FORM 4: EVENT CREATE/EDIT FORM ── */}
          {selectedEvent && (
            <form onSubmit={saveEventForm} className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"
            }`}>
              <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
                {selectedEvent.title ? "Cập nhật sự kiện" : "Tạo mới sự kiện"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Tiêu đề Sự kiện*</label>
                  <input type="text" placeholder="LION Championship 34" value={selectedEvent.title} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Thời gian diễn ra*</label>
                  <input type="text" placeholder="Thứ Bảy, ngày 18 tháng 7, 2026" value={selectedEvent.date} onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Địa điểm thi đấu</label>
                  <input type="text" placeholder="Nhà thi đấu Rạch Miễu, TP. HCM" value={selectedEvent.loc} onChange={(e) => setSelectedEvent({ ...selectedEvent, loc: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Hạng mục thi đấu (Bout Type)</label>
                  <input type="text" placeholder="Championship Bout" value={selectedEvent.type} onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-mono block">Trạng thái / Thông tin phát sóng</label>
                  <input type="text" placeholder="Trực tiếp lúc 19:00" value={selectedEvent.status} onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })} className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`} />
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu sự kiện</button>
                <button type="button" onClick={() => setSelectedEvent(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
