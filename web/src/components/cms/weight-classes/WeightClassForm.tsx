import { useTheme } from "../../../context/ThemeContext";

interface Props {
  wc: any;
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function WeightClassForm({ wc, onChange, onSave, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
      : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const set = (field: string, value: any) => onChange({ ...wc, [field]: value });

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
          {wc.name ? "Cập nhật hạng cân" : "Tạo mới hạng cân"}
        </h2>
        <button type="button" onClick={onCancel}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${
            isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}>
          ← Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-400 uppercase block">Tên hạng cân*</label>
          <input type="text" placeholder="Hạng 56kg Nam" value={wc.name ?? ""} onChange={e => set("name", e.target.value)} className={inputClass} />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase block">Giới tính</label>
          <div className="flex gap-2">
            {["Nam", "Nữ"].map(g => (
              <button key={g} type="button" onClick={() => set("gender", g)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  (wc.gender ?? "Nam") === g
                    ? "border-red-500 bg-red-500/10 text-red-600"
                    : isDark ? "border-zinc-800 text-zinc-500 hover:border-zinc-700" : "border-zinc-200 text-zinc-400 hover:border-zinc-300"
                }`}>
                {g === "Nam" ? "♂ Nam" : "♀ Nữ"}
              </button>
            ))}
          </div>
        </div>

        {/* Sort order */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-400 uppercase block">Thứ tự hiển thị</label>
          <input type="number" value={wc.sort_order ?? 0} onChange={e => set("sort_order", parseInt(e.target.value) || 0)} className={inputClass} />
        </div>
      </div>

      {/* Champion */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">🏆 Đương kim vô địch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Họ tên", field: "name" },
            { label: "Thành tích", field: "record" },
            { label: "Võ đường", field: "club" },
          ].map(({ label, field }) => (
            <div key={field} className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase block">{label}</label>
              <input type="text" value={wc.champion?.[field] || ""}
                onChange={e => set("champion", { ...wc.champion, [field]: e.target.value })}
                className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Lưu hạng cân
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Hủy
        </button>
      </div>
    </form>
  );
}
