import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCms } from "../../context/CmsContext";

export default function CmsLayout() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isLoggedIn, login, logout, loading } = useCms();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username, password);
    if (!ok) setAuthError("Tài khoản hoặc mật khẩu không chính xác!");
    else setAuthError("");
  };

  // ── LOGIN GATE ────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#07070a] text-white cms-font">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vh] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="w-full max-w-md p-8 border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl rounded-3xl relative z-10 shadow-[0_20px_50px_rgba(0,0,0,.8)]">
          <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-red-500/30" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-red-500/30" />

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 mb-3 shadow-lg shadow-black/50">
              <img src="/logo-lionchampionship.png" alt="LION Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">MMAVN CMS LOGIN</h2>
            <p className="text-[9px] text-zinc-500 tracking-widest uppercase mt-1">Hệ thống quản trị đấu trường võ thuật</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3.5 bg-red-950/20 border border-red-500/30 rounded-xl text-[11px] text-red-400 text-center">⚠️ {authError}</div>
            )}
            <div className="space-y-1.5">
              <label className="text-[9px] text-zinc-400 uppercase tracking-widest block">Tài khoản quản trị</label>
              <input type="text" placeholder="Nhập tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 focus:border-red-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] text-zinc-400 uppercase tracking-widest block">Mật khẩu hệ thống</label>
              <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 focus:border-red-500/60 rounded-xl text-xs text-white focus:outline-none transition-all placeholder-zinc-600" />
            </div>
            <button type="submit" className="w-full py-4 mt-2 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95 duration-200">
              Đăng Nhập Dashboard
            </button>
            <button type="button" onClick={() => navigate("/")} className="w-full py-2.5 bg-transparent border-none text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer mt-1">
              &larr; Quay lại trang chủ MMAVN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── NAV LINK HELPER ───────────────────────────────────────────────────────
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all border-none cursor-pointer text-left ${
      isActive
        ? isDark ? "bg-zinc-900 text-red-500 font-bold" : "bg-red-50 text-red-600 font-bold"
        : isDark ? "bg-transparent text-zinc-400 hover:bg-zinc-900/40 hover:text-white" : "bg-transparent text-[#55555e] hover:bg-zinc-100 hover:text-black"
    }`;

  // ── AUTHENTICATED LAYOUT ──────────────────────────────────────────────────
  return (
    <div className={`h-screen flex overflow-hidden cms-font ${isDark ? "bg-[#030303] text-zinc-100" : "bg-[#f8f9fa] text-zinc-900"}`}>

      {/* ── SIDEBAR ── */}
      <div className={`w-64 flex flex-col justify-between border-r shrink-0 transition-colors duration-300 ${isDark ? "bg-zinc-950/90 border-zinc-900" : "bg-white border-zinc-200"}`}>
        <div className="flex flex-col overflow-y-auto">

          {/* Brand */}
          <div className="p-6 border-b flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate("/")} style={{ borderColor: isDark ? "rgba(39,39,42,.4)" : "#f1f1f4" }}>
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-600/10">A</div>
            <div>
              <span className="text-xs font-black uppercase tracking-tight block">ANV SPORT</span>
              <span className="text-[8px] font-bold text-zinc-400 tracking-wider block">WORKSPACE</span>
            </div>
          </div>

          {/* Nav */}
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <span className={`text-[9px] font-bold tracking-widest uppercase px-3 block ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>QUẢN LÝ</span>
              <NavLink to="/cms" end className={navLinkClass}>
                <span className="text-sm">🎛️</span><span>Dashboard</span>
              </NavLink>
              <NavLink to="/cms/events" className={navLinkClass}>
                <span className="text-sm">📅</span><span>Lịch Sự Kiện</span>
              </NavLink>
            </div>

            <div className="space-y-1">
              <span className={`text-[9px] font-bold tracking-widest uppercase px-3 block ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>KHO DỮ LIỆU</span>
              <NavLink to="/cms/fighters" className={navLinkClass}>
                <span className="text-sm">🥋</span><span>Võ Sĩ / VĐV</span>
              </NavLink>
              <NavLink to="/cms/clubs" className={navLinkClass}>
                <span className="text-sm">🏢</span><span>Câu Lạc Bộ</span>
              </NavLink>
              <NavLink to="/cms/rankings" className={navLinkClass}>
                <span className="text-sm">🏆</span><span>Hạng Cân / BXH</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Profile + Logout */}
        <div className="p-4 border-t space-y-3 shrink-0" style={{ borderColor: isDark ? "rgba(39,39,42,.4)" : "#e4e4e7" }}>
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${isDark ? "bg-zinc-900/40 border-zinc-900" : "bg-white border-zinc-200"}`}>
            <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-red-600/10">A</span>
            <div className="overflow-hidden">
              <span className="text-[10px] font-bold block leading-none truncate text-zinc-800 dark:text-white">admin@mmavn.com</span>
              <span className="inline-block bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/25 rounded text-[8px] tracking-widest px-1.5 py-0.5 mt-1 font-black">ADMIN</span>
            </div>
          </div>
          <button onClick={logout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-bold uppercase cursor-pointer transition-all ${
              isDark ? "bg-zinc-900/60 hover:bg-red-950/20 hover:text-red-500 border-zinc-800 text-zinc-400" : "bg-white hover:bg-red-50 hover:text-red-600 border-zinc-200 text-zinc-600"
            }`}>
            🚪 Đăng xuất hệ thống
          </button>
        </div>
      </div>

      {/* ── MAIN PANEL ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className={`h-14 border-b flex items-center justify-between px-6 z-10 shrink-0 ${isDark ? "bg-zinc-950/40 border-zinc-900/80" : "bg-white border-zinc-200"}`}>
          <div className={`flex items-center gap-2 text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
            <span>ANV PORTAL</span>
            <span>/</span>
            <span className="text-red-500 font-bold uppercase">{location.pathname.replace("/cms", "").replace("/", "") || "dashboard"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] border rounded-md px-2 py-0.5 ${isDark ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-100 text-zinc-500"}`}>
              DB: {loading ? "CONNECTING..." : "ONLINE"}
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
