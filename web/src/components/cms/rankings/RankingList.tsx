import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";

interface Props {
  rankings: any[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (r: any) => void;
}

export default function RankingList({ rankings, search, onSearch, onEdit }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
        <CmsSearchBar value={search} onChange={onSearch} placeholder="Tìm hạng cân..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rankings.length === 0 ? (
          <div className="col-span-2 text-center py-16">
            <span className="text-4xl block mb-3">🏆</span>
            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy hạng cân nào</p>
          </div>
        ) : (
          rankings.map((ranking) => (
            <div
              key={ranking.id}
              className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-800" : "bg-white border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}>
                  🏆
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{ranking.name}</h3>
                  <p className="text-[10px] text-zinc-500">
                    Đương kim VĐ: {ranking.champion?.name || <span className="italic text-zinc-600">Chưa có</span>}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onEdit(ranking)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
                  isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                }`}
              >
                Quản lý BXH
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
