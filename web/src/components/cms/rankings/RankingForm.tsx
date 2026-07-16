import { useTheme } from "../../../context/ThemeContext";

interface Props {
  ranking: any;
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const RANKING_FIELDS = [
  { label: "Họ Tên", field: "name" },
  { label: "Thành tích", field: "record" },
  { label: "Võ đường", field: "club" },
];

const CHAMPION_FIELDS = [
  { label: "Họ tên Champion", field: "name" },
  { label: "Thành tích", field: "record" },
  { label: "Võ đường", field: "club" },
];

export default function RankingForm({ ranking, onChange, onSave, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
      : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const setChampion = (field: string, val: string) =>
    onChange({ ...ranking, champion: { ...ranking.champion, [field]: val } });

  const setRankingRow = (idx: number, field: string, val: string) => {
    const next = [...(ranking.rankings || [])];
    next[idx] = { ...next[idx], [field]: val };
    onChange({ ...ranking, rankings: next });
  };

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
          Bảng xếp hạng: {ranking.name}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${
            isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          ← Quay lại
        </button>
      </div>

      {/* Champion */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">🏆 Đương kim vô địch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHAMPION_FIELDS.map(({ label, field }) => (
            <div key={field} className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase block">{label}</label>
              <input
                type="text"
                value={ranking.champion?.[field] || ""}
                onChange={(e) => setChampion(field, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">📋 Danh sách xếp hạng</h3>
        <div className="space-y-3">
          {((ranking.rankings || []) as any[]).map((row, idx) => (
            <div
              key={idx}
              className={`p-3 border rounded-xl flex items-center gap-3 ${
                isDark ? "bg-zinc-900/40 border-zinc-900/60" : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <span className={`w-6 text-center font-black text-sm shrink-0 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                {row.rank}
              </span>
              {RANKING_FIELDS.map(({ label, field }) => (
                <div key={field} className="flex-1 space-y-0.5">
                  <label className="text-[8px] text-zinc-500 block">{label}</label>
                  <input
                    type="text"
                    value={row[field] || ""}
                    onChange={(e) => setRankingRow(idx, field, e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg text-[11px] bg-zinc-900 border border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Lưu bảng xếp hạng
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Hủy
        </button>
      </div>
    </form>
  );
}
