import { useTheme } from "../../../context/ThemeContext";

interface Props {
  club: any;
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ClubForm({ club, onChange, onSave, onCancel }: Props) {
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

  const set = (field: string, value: any) => onChange({ ...club, [field]: value });

  const Field = ({ label, field, type = "text", disabled = false }: { label: string; field: string; type?: string; disabled?: boolean }) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={club[field] ?? ""}
        onChange={(e) => set(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
        className={disabled ? disabledClass : inputClass}
      />
    </div>
  );

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
          {club.name ? "Cập nhật võ đường" : "Tạo mới võ đường"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Mã Võ đường (ID)*" field="id" disabled />
        <Field label="Slug đường dẫn*" field="slug" />
        <Field label="Tên Võ đường*" field="name" />
        <Field label="Tên viết tắt" field="short_name" />
        <Field label="Tỉnh / Thành Phố" field="city" />
        <Field label="Địa chỉ chi tiết" field="address" />
        <Field label="HLV trưởng" field="head_coach" />
        <Field label="Năm thành lập" field="founded_year" type="number" />

        <div className="space-y-1">
          <label className="text-[10px] text-zinc-400 uppercase block">Bộ môn (cách nhau bởi dấu phẩy)</label>
          <input
            type="text"
            value={(club.disciplines || []).join(", ")}
            onChange={(e) => set("disciplines", e.target.value.split(",").map((d: string) => d.trim()).filter(Boolean))}
            className={inputClass}
          />
        </div>

        <Field label="Đường dẫn Logo (URL)" field="logo" />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] text-zinc-400 uppercase block">Giới thiệu ngắn gọn</label>
        <textarea
          value={club.description || ""}
          rows={3}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Facebook URL" field="facebook" />
        <Field label="TikTok URL" field="tiktok" />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Lưu võ đường
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Hủy
        </button>
      </div>
    </form>
  );
}
