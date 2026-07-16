import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";

interface Props {
  events: any[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (e: any) => void;
  onDelete: (id: string) => void;
}

const THEAD = ["#", "Sự Kiện", "Thời Gian", "Địa Điểm", "Hạng Mục", "Phát Sóng", ""];

function statusColor(status: string) {
  if (status?.includes("Trực tiếp")) return "bg-red-500/10 text-red-500 border-red-500/20";
  if (status?.includes("Bán vé")) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
  return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
}

export default function EventTable({ events, search, onSearch, onEdit, onDelete }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const thClass = `px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
        <CmsSearchBar value={search} onChange={onSearch} placeholder="Tìm tên sự kiện, địa điểm..." />
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
              {THEAD.map((h, i) => (
                <th key={i} className={`${i === 6 ? "text-right" : "text-left"} ${thClass}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <span className="text-4xl block mb-3">📅</span>
                  <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy sự kiện nào</p>
                </td>
              </tr>
            ) : (
              events.map((evt, idx) => (
                <tr key={evt.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                  <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{idx + 1}</td>
                  <td className="px-4 py-3">
                    <p className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>{evt.title}</p>
                  </td>
                  <td className={`px-4 py-3 text-xs whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{evt.date}</td>
                  <td className={`px-4 py-3 text-xs max-w-[160px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    <span className="line-clamp-2">{evt.loc}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}>
                      {evt.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusColor(evt.status)}`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Chỉnh sửa"
                        onClick={() => onEdit(evt)}
                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all ${
                          isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                        }`}
                      >✏️</button>
                      <button
                        title="Xóa"
                        onClick={() => onDelete(evt.id)}
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
