import { useTheme } from "../../../context/ThemeContext";

interface Props {
  fighter: any;
  clubs: any[];
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function FighterForm({ fighter, clubs, onChange, onSave, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
      : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const disabledClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-400"
  }`;

  const set = (field: string, value: any) => onChange({ ...fighter, [field]: value });

  const Field = ({ label, field, type = "text", disabled = false }: { label: string; field: string; type?: string; disabled?: boolean }) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={fighter[field] ?? ""}
        onChange={(e) => set(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
        className={disabled ? disabledClass : inputClass}
      />
    </div>
  );

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
          {fighter.name ? "Cập nhật võ sĩ" : "Tạo mới võ sĩ"}
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

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Mã Võ Sĩ (ID)*" field="id" disabled />
        <div className="col-span-2"><Field label="Họ Tên Võ sĩ*" field="name" /></div>
        <Field label="Biệt danh (Nickname)" field="nickname" />
        <Field label="Hạng cân (ví dụ: 56kg)" field="weight_class" />

        {/* Gender select */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-400 uppercase block">Giới tính</label>
          <select value={fighter.gender ?? "Nam"} onChange={(e) => set("gender", e.target.value)} className={inputClass}>
            <option value="Nam">♂ Nam</option>
            <option value="Nữ">♀ Nữ</option>
          </select>
        </div>

        {/* Club select — linked to clubs list */}
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-400 uppercase block">Võ đường trực thuộc</label>
          <select value={fighter.club ?? ""} onChange={(e) => set("club", e.target.value)} className={inputClass}>
            <option value="">— Chưa có võ đường —</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.name}>{c.name}{c.short_name ? ` (${c.short_name})` : ""}</option>
            ))}
          </select>
        </div>

        <Field label="Tuổi" field="age" type="number" />
        <Field label="Chiều cao (cm)" field="height" type="number" />
        <Field label="Sải tay (cm)" field="reach" type="number" />
        <Field label="Quê quán" field="hometown" />
        <Field label="Quốc tịch" field="nationality" />
        <Field label="Quốc kỳ (Emoji)" field="flag" />
        <Field label="Số trận thắng" field="wins" type="number" />
        <Field label="Số trận thua" field="losses" type="number" />
        <Field label="Số trận hòa" field="draws" type="number" />
      </div>

      <Field label="Đường dẫn ảnh võ sĩ (URL)" field="photo" />

      <div className="space-y-1">
        <label className="text-[10px] text-zinc-400 uppercase block">Tiểu sử võ sĩ</label>
        <textarea
          value={fighter.bio || ""}
          rows={3}
          onChange={(e) => set("bio", e.target.value)}
          className={inputClass}
        ></textarea>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-[10px] text-zinc-400 uppercase block">Trạng thái thi đấu</label>
        <div className="flex gap-2 flex-wrap">
          {["Thi đấu", "Chấn thương", "Giải nghệ", "Ẩn"].map((s) => {
            const isActive = (fighter.status ?? "Thi đấu") === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => set("status", s)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isActive
                    ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                    : isDark
                    ? "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    : "border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-700"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all"
        >
          Lưu võ sĩ
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
