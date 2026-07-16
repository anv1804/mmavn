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

      {/* Main Grid: Left Column for Image Previews, Right Column for Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: Media Preview Panel (1/4 width) */}
        <div className="space-y-6 lg:border-r lg:pr-6" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">🖼️ Ảnh xem trước</h3>
          
          {/* Avatar Preview */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase pl-1">Avatar</span>
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
            <span className="text-[10px] text-zinc-400 block uppercase pl-1">Thumbnail</span>
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
            <span className="text-[10px] text-zinc-400 block uppercase pl-1">Cover Banner</span>
            <div className={`w-full aspect-[21/9] rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {fighter.cover ? (
                <img src={fighter.cover} alt="Cover Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Input Fields (3/4 width) */}
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
              
              {/* Facebook */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                  Facebook Link
                </label>
                <input type="text" value={fighter.facebook ?? ""} onChange={e => set("facebook", e.target.value)} placeholder="https://facebook.com/..." className={inputClass} />
              </div>

              {/* TikTok */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.85.95 1.96 1.66 3.19 2.06.01 1.25.01 2.5-.01 3.75-.92-.09-1.84-.4-2.65-.89-.96-.58-1.74-1.42-2.26-2.42V14.5c0 1.25-.26 2.48-.77 3.63-.58 1.27-1.52 2.37-2.68 3.16-1.51.98-3.32 1.4-5.11 1.18-1.88-.23-3.61-1.25-4.75-2.82C1.72 17.51 1.4 15.11 2.06 12.9c.57-1.86 1.93-3.44 3.7-4.27 1.05-.48 2.21-.69 3.36-.61.02 1.34.01 2.67.01 4.01-1.04-.15-2.14.07-3.03.68-.96.67-1.51 1.83-1.4 3.01.07 1.02.66 1.97 1.52 2.47.93.52 2.06.51 2.97-.04.75-.46 1.26-1.25 1.37-2.13.01-.29.01-.58.01-.87V.02h2.02z" />
                  </svg>
                  TikTok Link
                </label>
                <input type="text" value={fighter.tiktok ?? ""} onChange={e => set("tiktok", e.target.value)} placeholder="https://tiktok.com/@..." className={inputClass} />
              </div>

              {/* Instagram */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram Link
                </label>
                <input type="text" value={fighter.instagram ?? ""} onChange={e => set("instagram", e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
              </div>

              {/* YouTube */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                  <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 00-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 002.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 002.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube Link
                </label>
                <input type="text" value={fighter.youtube ?? ""} onChange={e => set("youtube", e.target.value)} placeholder="https://youtube.com/c/..." className={inputClass} />
              </div>

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
