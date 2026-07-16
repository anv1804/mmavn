import { useTheme } from "../../../context/ThemeContext";

interface Props {
  weightClass: any;          // full weight class object
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const RANKING_FIELDS = [
  { label: "Họ tên",     field: "name"   },
  { label: "Thành tích", field: "record" },
  { label: "Võ đường",   field: "club"   },
];

export default function RankingBxhForm({ weightClass, onChange, onSave, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = "w-full px-2.5 py-1.5 rounded-lg text-[11px] focus:outline-none " +
    (isDark
      ? "bg-zinc-900 border border-zinc-800 text-white focus:border-red-500/60"
      : "bg-white border border-zinc-200 text-zinc-900 focus:border-red-400");

  const rows: any[] = weightClass.rankings || [];

  const setRow = (idx: number, field: string, val: string) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [field]: val };
    onChange({ ...weightClass, rankings: next });
  };

  const addRow = () => onChange({
    ...weightClass,
    rankings: [...rows, { rank: rows.length + 1, name: "", record: "", club: "" }],
  });

  const removeRow = (idx: number) => onChange({
    ...weightClass,
    rankings: rows.filter((_, i) => i !== idx).map((r, i) => ({ ...r, rank: i + 1 })),
  });

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>{weightClass.name}</h2>
          <p className="text-[10px] text-zinc-500 mt-0.5">Bảng xếp hạng</p>
        </div>
        <button type="button" onClick={onCancel}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
          ← Quay lại
        </button>
      </div>

      {/* Rankings rows */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">📋 Danh sách ({rows.length} VĐV)</h3>
          <button type="button" onClick={addRow}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
              isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}>
            + Thêm dòng
          </button>
        </div>

        {rows.length === 0 ? (
          <div className={`text-center py-8 rounded-2xl border border-dashed ${isDark ? "border-zinc-800 text-zinc-600" : "border-zinc-200 text-zinc-400"}`}>
            <p className="text-xs">Chưa có VĐV nào. Nhấn "+ Thêm dòng" để bắt đầu.</p>
          </div>
        ) : rows.map((row, idx) => (
          <div key={idx} className={`flex items-center gap-2.5 p-3 rounded-xl border ${isDark ? "bg-zinc-900/40 border-zinc-900" : "bg-zinc-50 border-zinc-200"}`}>
            <span className={`w-6 text-center font-black text-sm shrink-0 ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{row.rank}</span>
            {RANKING_FIELDS.map(({ label, field }) => (
              <div key={field} className="flex-1 space-y-0.5 min-w-0">
                <label className="text-[8px] text-zinc-500 block">{label}</label>
                <input type="text" value={row[field] || ""} onChange={e => setRow(idx, field, e.target.value)} className={inputClass} />
              </div>
            ))}
            <button type="button" onClick={() => removeRow(idx)}
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-none cursor-pointer text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Lưu BXH
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Hủy
        </button>
      </div>
    </form>
  );
}
