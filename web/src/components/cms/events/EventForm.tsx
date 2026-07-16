import { useTheme } from "../../../context/ThemeContext";

interface Props {
  event: any;
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const FIELDS = [
  { label: "Tiêu đề Sự kiện*", field: "title", placeholder: "LION Championship 34" },
  { label: "Thời gian diễn ra*", field: "date", placeholder: "Thứ Bảy, ngày 18 tháng 7, 2026" },
  { label: "Địa điểm thi đấu", field: "loc", placeholder: "Nhà thi đấu Rạch Miễu, TP. HCM" },
  { label: "Hạng mục thi đấu", field: "type", placeholder: "Championship Bout" },
  { label: "Trạng thái / Phát sóng", field: "status", placeholder: "Trực tiếp lúc 19:00" },
];

export default function EventForm({ event, onChange, onSave, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
      : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const set = (field: string, value: string) => onChange({ ...event, [field]: value });

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
          {event.title ? "Cập nhật sự kiện" : "Tạo mới sự kiện"}
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
        {FIELDS.map(({ label, field, placeholder }) => (
          <div key={field} className="space-y-1">
            <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              value={event[field] ?? ""}
              onChange={(e) => set(field, e.target.value)}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Lưu sự kiện
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">
          Hủy
        </button>
      </div>
    </form>
  );
}
