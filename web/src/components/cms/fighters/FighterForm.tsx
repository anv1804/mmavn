import { useTheme } from "../../../context/ThemeContext";

interface Props {
  fighter: any;
  clubs: any[];
  rankings: any[];
  onChange: (updated: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function FighterForm({ fighter, clubs, rankings, onChange, onSave, onCancel }: Props) {
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

  // Dynamically calculate age from birth_date
  const handleBirthDateChange = (dateVal: string) => {
    if (!dateVal) {
      onChange({ ...fighter, birth_date: "", age: 0 });
      return;
    }
    const birthDate = new Date(dateVal);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    onChange({ ...fighter, birth_date: dateVal, age: Math.max(0, calculatedAge) });
  };

  const Field = ({ label, field, type = "text", disabled = false, placeholder = "" }: { label: string; field: string; type?: string; disabled?: boolean; placeholder?: string }) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={fighter[field] ?? ""}
        onChange={(e) => set(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
        className={disabled ? disabledClass : inputClass}
      />
    </div>
  );

  return (
    <form onSubmit={onSave} className={`p-6 rounded-3xl border space-y-8 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
        <div>
          <h2 className={`text-xl font-bold uppercase tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
            {fighter.name ? "Cập nhật hồ sơ võ sĩ" : "Thêm mới võ sĩ"}
          </h2>
          <p className="text-[10px] text-zinc-500 mt-0.5">Vui lòng nhập đầy đủ thông tin bên dưới</p>
        </div>
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

      {/* Main Grid: Left Column for Form, Right/Top Column for Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: Input Fields (3/4 width) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* I. Thông tin cá nhân */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">I. Thông tin cá nhân</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Mã Võ Sĩ (ID)*" field="id" disabled />
              <div className="md:col-span-2">
                <Field label="Họ Tên Võ sĩ*" field="name" placeholder="Ví dụ: Lê Văn Tuần" />
              </div>
              <Field label="Biệt danh (Nickname)" field="nickname" placeholder="Ví dụ: Tuần Trâu" />

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Giới tính</label>
                <select value={fighter.gender ?? "Nam"} onChange={(e) => set("gender", e.target.value)} className={inputClass}>
                  <option value="Nam">♂ Nam</option>
                  <option value="Nữ">♀ Nữ</option>
                </select>
              </div>

              {/* Dynamic Weight Class select */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Hạng cân*</label>
                <select value={fighter.weight_class ?? ""} onChange={(e) => set("weight_class", e.target.value)} className={inputClass}>
                  <option value="">— Chọn hạng cân —</option>
                  {rankings.map((r) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Birth Date Picker */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Ngày sinh</label>
                <input
                  type="date"
                  value={fighter.birth_date ?? ""}
                  onChange={(e) => handleBirthDateChange(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Age (Readonly computed) */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Tuổi (Tự động tính)</label>
                <input
                  type="number"
                  disabled
                  value={fighter.age ?? 0}
                  className={disabledClass}
                />
              </div>

              {/* Club select */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Võ đường trực thuộc</label>
                <select value={fighter.club ?? ""} onChange={(e) => set("club", e.target.value)} className={inputClass}>
                  <option value="">— Chưa có võ đường —</option>
                  {clubs.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}{c.short_name ? ` (${c.short_name})` : ""}</option>
                  ))}
                </select>
              </div>

              <Field label="Chiều cao (cm)" field="height" type="number" placeholder="Ví dụ: 168" />
              <Field label="Sải tay (cm)" field="reach" type="number" placeholder="Ví dụ: 168" />
              <Field label="Quê quán" field="hometown" placeholder="Ví dụ: Hà Đông, Hà Nội" />
              <Field label="Quốc tịch" field="nationality" placeholder="Ví dụ: Việt Nam" />
              <Field label="Quốc kỳ (Emoji)" field="flag" placeholder="Ví dụ: 🇻🇳" />
            </div>
          </div>

          {/* II. Hình ảnh & Truyền thông */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">II. Hình ảnh &amp; Đường dẫn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Ảnh đại diện / Avatar (avt) URL" field="photo" placeholder="/lvt.png hoặc https://..." />
              <Field label="Ảnh Thumb / Thumbnail URL (Danh sách)" field="thumb" placeholder="/lvt-thumb.png hoặc https://..." />
              <div className="md:col-span-2">
                <Field label="Ảnh bìa / Cover Banner URL (Chi tiết)" field="cover" placeholder="/lvt-cover.png hoặc https://..." />
              </div>
            </div>
          </div>

          {/* III. Mạng xã hội */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">III. Liên kết Mạng xã hội</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Facebook Link" field="facebook" placeholder="https://facebook.com/..." />
              <Field label="TikTok Link" field="tiktok" placeholder="https://tiktok.com/@..." />
              <Field label="Instagram Link" field="instagram" placeholder="https://instagram.com/..." />
              <Field label="YouTube Link" field="youtube" placeholder="https://youtube.com/c/..." />
            </div>
          </div>

          {/* IV. Thành tích & Stats */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">IV. Thành tích thi đấu</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <Field label="Thắng" field="wins" type="number" />
              <Field label="Thua" field="losses" type="number" />
              <Field label="Hòa" field="draws" type="number" />
              <Field label="Thắng KO/TKO" field="ko_wins" type="number" />
              <Field label="Thắng Submission" field="sub_wins" type="number" />
              <Field label="Thắng Decision" field="decision_wins" type="number" />
            </div>
          </div>

          {/* V. Tiểu sử & Trạng thái */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">V. Tiểu sử &amp; Trạng thái</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">Tiểu sử võ sĩ</label>
                <textarea
                  value={fighter.bio || ""}
                  rows={4}
                  onChange={(e) => set("bio", e.target.value)}
                  className={inputClass}
                  placeholder="Nhập thông tin giới thiệu ngắn về hành trình sự nghiệp và phong cách chiến đấu..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 uppercase block font-semibold">Trạng thái thi đấu</label>
                <div className="flex gap-2 flex-wrap">
                  {["Thi đấu", "Chấn thương", "Giải nghệ", "Ẩn"].map((s) => {
                    const isActive = (fighter.status ?? "Thi đấu") === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("status", s)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
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
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Media Preview Panel (1/4 width) */}
        <div className="space-y-6 lg:border-l lg:pl-6" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">🖼️ Ảnh xem trước</h3>
          
          {/* Avatar Preview */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase">Avatar</span>
            <div className={`w-full aspect-square rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {fighter.photo ? (
                <img src={fighter.photo} alt="Avatar" className="w-full h-full object-cover object-top" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase">Thumbnail</span>
            <div className={`w-full aspect-video rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {fighter.thumb ? (
                <img src={fighter.thumb} alt="Thumbnail" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>

          {/* Cover Preview */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase">Cover Banner</span>
            <div className={`w-full aspect-[21/9] rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {fighter.cover ? (
                <img src={fighter.cover} alt="Cover Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="flex gap-4 border-t pt-5" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
        <button
          type="submit"
          className="px-6 py-3 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all shadow-md shadow-red-600/10"
        >
          Lưu hồ sơ võ sĩ
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
