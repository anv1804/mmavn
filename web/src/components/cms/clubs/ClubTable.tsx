import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";

interface Props {
  clubs: any[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (c: any) => void;
  onDelete: (id: string) => void;
}

const THEAD = ["#", "Võ Đường", "Thành Phố", "HLV Trưởng", "Bộ Môn", ""];

export default function ClubTable({ clubs, search, onSearch, onEdit, onDelete }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const thClass = `px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`;

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
        <CmsSearchBar
          value={search}
          onChange={onSearch}
          placeholder="Tìm tên võ đường, thành phố..."
        />
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
              {THEAD.map((h, i) => (
                <th key={i} className={`${i === 5 ? "text-right" : "text-left"} ${thClass}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
            {clubs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-4xl">🔍</span>
                    <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                      Không tìm thấy võ đường nào
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              clubs.map((club, idx) => (
                <tr key={club.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                  <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{idx + 1}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={club.logo || "/logo-lionchampionship.png"}
                        alt={club.name}
                        className="w-9 h-9 rounded-xl object-contain shrink-0"
                        style={{ background: isDark ? "#18181b" : "#f4f4f5", padding: 4 }}
                      />
                      <div>
                        <p className={`font-semibold leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>{club.name}</p>
                        {club.short_name && <p className="text-[10px] text-zinc-500">{club.short_name}</p>}
                      </div>
                    </div>
                  </td>

                  <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{club.city || "—"}</td>
                  <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{club.head_coach || "—"}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(club.disciplines || []).map((d: string) => (
                        <span key={d} className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Chỉnh sửa"
                        onClick={() => onEdit(club)}
                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all ${
                          isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                        }`}
                      >✏️</button>
                      <button
                        title="Xóa"
                        onClick={() => onDelete(club.id)}
                        className="w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white"
                      >🗑</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
