import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";

interface Props {
  weightClasses: any[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (wc: any) => void;
  onDelete: (id: string) => void;
  onManageBxh: (wc: any) => void;
}

const GENDER_BADGE = {
  Nam:  "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Nữ:   "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

export default function WeightClassTable({ weightClasses, search, onSearch, onEdit, onDelete, onManageBxh }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const thClass = `px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className={`p-3 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
        <CmsSearchBar value={search} onChange={onSearch} placeholder="Tìm hạng cân..." />
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
        <table className="w-full text-xs">
          <thead>
            <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
              {["#", "Tên hạng cân", "Giới tính", "Đương kim VĐ", ""].map((h, i) => (
                <th key={i} className={`${i === 4 ? "text-right" : "text-left"} ${thClass}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
            {weightClasses.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <span className="text-4xl block mb-3">🏋️</span>
                  <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Chưa có hạng cân nào</p>
                  <p className="text-xs text-zinc-500 mt-1">Nhấn "+ Thêm Hạng Cân" để tạo mới</p>
                </td>
              </tr>
            ) : weightClasses.map((wc, idx) => (
              <tr key={wc.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{idx + 1}</td>
                <td className="px-4 py-3">
                  <p className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>{wc.name}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${GENDER_BADGE[wc.gender as keyof typeof GENDER_BADGE] || "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                    {wc.gender === "Nữ" ? "♀" : "♂"} {wc.gender || "Nam"}
                  </span>
                </td>
                <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  {wc.champion?.name || <span className="text-zinc-400 italic">Chưa có</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      title="Quản lý BXH"
                      onClick={() => onManageBxh(wc)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
                        isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                      }`}
                    >
                      BXH
                    </button>
                    <button
                      title="Chỉnh sửa"
                      onClick={() => onEdit(wc)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all ${
                        isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      title="Xóa hạng cân"
                      onClick={() => onDelete(wc.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
