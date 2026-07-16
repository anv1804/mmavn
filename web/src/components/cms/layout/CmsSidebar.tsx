import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useCms } from "../../../context/CmsContext";

const NAV_ITEMS = [
  {
    section: "QUẢN LÝ",
    links: [
      { to: "/cms", end: true, icon: "🎛️", label: "Dashboard" },
      { to: "/cms/events", icon: "📅", label: "Lịch Sự Kiện" },
    ],
  },
  {
    section: "KHO DỮ LIỆU",
    links: [
      { to: "/cms/fighters", icon: "🥋", label: "Võ Sĩ / VĐV" },
      { to: "/cms/clubs", icon: "🏢", label: "Câu Lạc Bộ" },
      { to: "/cms/rankings", icon: "🏆", label: "Hạng Cân / BXH" },
    ],
  },
];

export default function CmsSidebar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { logout } = useCms();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all border-none cursor-pointer text-left ${
      isActive
        ? isDark
          ? "bg-zinc-900 text-red-500 font-bold"
          : "bg-red-50 text-red-600 font-bold"
        : isDark
        ? "bg-transparent text-zinc-400 hover:bg-zinc-900/40 hover:text-white"
        : "bg-transparent text-[#55555e] hover:bg-zinc-100 hover:text-black"
    }`;

  return (
    <div
      className={`w-64 flex flex-col justify-between border-r shrink-0 transition-colors duration-300 ${
        isDark ? "bg-zinc-950/90 border-zinc-900" : "bg-white border-zinc-200"
      }`}
    >
      {/* Top: brand + nav */}
      <div className="flex flex-col overflow-y-auto">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="p-6 border-b flex items-center gap-3 cursor-pointer w-full text-left bg-transparent border-none"
          style={{ borderColor: isDark ? "rgba(39,39,42,.4)" : "#f1f1f4" }}
        >
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-600/10">
            A
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-tight block">ANV SPORT</span>
            <span className="text-[8px] font-bold text-zinc-400 tracking-wider block">WORKSPACE</span>
          </div>
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {NAV_ITEMS.map(({ section, links }) => (
            <div key={section} className="space-y-1">
              <span
                className={`text-[9px] font-bold tracking-widest uppercase px-3 block ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {section}
              </span>
              {links.map(({ to, end, icon, label }) => (
                <NavLink key={to} to={to} end={end} className={linkClass}>
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom: profile + logout */}
      <div
        className="p-4 border-t space-y-3 shrink-0"
        style={{ borderColor: isDark ? "rgba(39,39,42,.4)" : "#e4e4e7" }}
      >
        <div
          className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            isDark ? "bg-zinc-900/40 border-zinc-900" : "bg-white border-zinc-200"
          }`}
        >
          <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-red-600/10">
            A
          </span>
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold block leading-none truncate">admin@mmavn.com</span>
            <span className="inline-block bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/25 rounded text-[8px] tracking-widest px-1.5 py-0.5 mt-1 font-black">
              ADMIN
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-bold uppercase cursor-pointer transition-all ${
            isDark
              ? "bg-zinc-900/60 hover:bg-red-950/20 hover:text-red-500 border-zinc-800 text-zinc-400"
              : "bg-white hover:bg-red-50 hover:text-red-600 border-zinc-200 text-zinc-600"
          }`}
        >
          🚪 Đăng xuất hệ thống
        </button>
      </div>
    </div>
  );
}
