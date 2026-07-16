import { useState } from "react";
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

  // Sub-tab selection state to keep the form clean
  const [activeSubTab, setActiveSubTab] = useState<"info" | "skills" | "history" | "achieve">("info");

  const inputClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none"
      : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const disabledClass = `w-full p-2.5 rounded-xl border text-xs ${
    isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-400"
  }`;

  const set = (field: string, value: any) => onChange({ ...fighter, [field]: value });

  const setSocial = (field: string, value: any) => {
    const nextSocial = { ...(fighter.social_media || {}) };
    nextSocial[field] = value;
    onChange({ ...fighter, social_media: nextSocial });
  };

  const getSocial = (field: string) => fighter.social_media?.[field] ?? "";

  // Skill indicators mapping helper
  const getSkill = (skillKey: string) => {
    return fighter.social_media?.skills?.[skillKey] ?? 50; // default 50
  };

  const setSkill = (skillKey: string, val: number) => {
    const nextSocial = { ...(fighter.social_media || {}) };
    const nextSkills = { ...(nextSocial.skills || {}) };
    nextSkills[skillKey] = val;
    nextSocial.skills = nextSkills;
    onChange({ ...fighter, social_media: nextSocial });
  };

  // Birth date helper
  const handleBirthDateChange = (dateVal: string) => {
    if (!dateVal) {
      const nextSocial = { ...(fighter.social_media || {}) };
      delete nextSocial.birth_date;
      onChange({ ...fighter, social_media: nextSocial, age: 0 });
      return;
    }
    const birthDate = new Date(dateVal);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    const nextSocial = { ...(fighter.social_media || {}) };
    nextSocial.birth_date = dateVal;
    onChange({ ...fighter, social_media: nextSocial, age: Math.max(0, calculatedAge), birth_year: birthDate.getFullYear() });
  };

  const parseNumericString = (val: any): string => {
    if (val === undefined || val === null) return "";
    const str = String(val).trim();
    if (!str) return "";
    if (str.includes("m") && /^\d+m\d+$/.test(str)) {
      const parts = str.split("m");
      return String(parseInt(parts[0]) * 100 + parseInt(parts[1]));
    }
    const digits = str.replace(/\D/g, "");
    return digits || "";
  };

  const Field = ({ label, field, type = "text", disabled = false, placeholder = "" }: { label: string; field: string; type?: string; disabled?: boolean; placeholder?: string }) => {
    const isDimension = field === "height" || field === "reach";
    const displayValue = isDimension ? parseNumericString(fighter[field]) : (fighter[field] ?? "");

    return (
      <div className="space-y-1">
        <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
        <input
          type={isDimension ? "number" : type}
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => set(field, type === "number" || isDimension ? parseInt(e.target.value) || 0 : e.target.value)}
          className={disabled ? disabledClass : inputClass}
        />
      </div>
    );
  };

  // Helper lists achievements edits
  const handleAddAchievement = () => {
    const current = [...(fighter.achievements || [])];
    current.push("");
    set("achievements", current);
  };

  const handleEditAchievement = (index: number, text: string) => {
    const current = [...(fighter.achievements || [])];
    current[index] = text;
    set("achievements", current);
  };

  const handleRemoveAchievement = (index: number) => {
    set("achievements", (fighter.achievements || []).filter((_: any, idx: number) => idx !== index));
  };

  // Helper fights history edits
  const handleAddFight = () => {
    const current = [...(fighter.fights || [])];
    current.unshift({
      date: new Date().toISOString().split("T")[0],
      event: "LION Championship",
      opponent: "",
      result: "W",
      round: 3,
      time: "5:00",
      method: "Decision (U)"
    });
    set("fights", current);
  };

  const handleEditFight = (index: number, field: string, value: any) => {
    const current = [...(fighter.fights || [])];
    current[index] = { ...current[index], [field]: value };
    set("fights", current);
  };

  const handleRemoveFight = (index: number) => {
    set("fights", (fighter.fights || []).filter((_: any, idx: number) => idx !== index));
  };

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

      {/* Main Grid: Left Column for Previews, Right Column for Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: Media Preview Panel */}
        <div className="space-y-6 lg:border-r lg:pr-6" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">🖼️ Ảnh xem trước</h3>
          
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

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase pl-1">Thumbnail</span>
            <div className={`w-full aspect-video rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {getSocial("thumb") ? (
                <img src={getSocial("thumb")} alt="Thumbnail" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 block uppercase pl-1">Cover Banner</span>
            <div className={`w-full aspect-[21/9] rounded-2xl overflow-hidden border flex items-center justify-center bg-zinc-900/10 ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200"}`}>
              {getSocial("cover") ? (
                <img src={getSocial("cover")} alt="Cover Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/lvt.png" }} />
              ) : (
                <span className="text-zinc-500 text-xs italic">Chưa có ảnh</span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Navigation & Forms */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sub Tab Headers */}
          <div className="flex border-b gap-4 text-xs font-bold" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
            <button
              type="button"
              onClick={() => setActiveSubTab("info")}
              className={`pb-3 bg-transparent border-b-2 px-1 transition-all cursor-pointer ${
                activeSubTab === "info"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Thông tin & MXH
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("skills")}
              className={`pb-3 bg-transparent border-b-2 px-1 transition-all cursor-pointer ${
                activeSubTab === "skills"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Chỉ số MMA (Skill map)
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("achieve")}
              className={`pb-3 bg-transparent border-b-2 px-1 transition-all cursor-pointer ${
                activeSubTab === "achieve"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Thành tích nổi bật
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("history")}
              className={`pb-3 bg-transparent border-b-2 px-1 transition-all cursor-pointer ${
                activeSubTab === "history"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Lịch sử đấu
            </button>
          </div>

          {/* TAB 1: THÔNG TIN CƠ BẢN & MẠNG XÃ HỘI */}
          {activeSubTab === "info" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* I. Thông tin cá nhân */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">I. Thông tin cá nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Mã Võ Sĩ (ID)*" field="id" disabled />
                  <div className="md:col-span-2">
                    <Field label="Họ Tên Võ sĩ*" field="name" placeholder="Ví dụ: Lê Văn Tuần" />
                  </div>
                  <Field label="Biệt danh (Nickname)" field="nickname" placeholder="Ví dụ: Tuần Trâu" />

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Giới tính</label>
                    <select value={fighter.gender ?? "Nam"} onChange={(e) => set("gender", e.target.value)} className={inputClass}>
                      <option value="Nam">♂ Nam</option>
                      <option value="Nữ">♀ Nữ</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Hạng cân*</label>
                    <select value={fighter.weight_class ?? ""} onChange={(e) => set("weight_class", e.target.value)} className={inputClass}>
                      <option value="">— Chọn hạng cân —</option>
                      {rankings.map((r) => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Ngày sinh</label>
                    <input
                      type="date"
                      value={getSocial("birth_date")}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Tuổi (Tự động tính)</label>
                    <input type="number" disabled value={fighter.age ?? 0} className={disabledClass} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Võ đường trực thuộc</label>
                    <select value={fighter.club ?? ""} onChange={(e) => set("club", e.target.value)} className={inputClass}>
                      <option value="">— Chưa có võ đường —</option>
                      {clubs.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}{c.short_name ? ` (${c.short_name})` : ""}</option>
                      ))}
                    </select>
                  </div>

                  <Field label="Chiều cao (cm)" field="height" placeholder="Ví dụ: 168" />
                  <Field label="Sải tay (cm)" field="reach" placeholder="Ví dụ: 170" />
                  <Field label="Quê quán" field="hometown" placeholder="Ví dụ: Hà Đông, Hà Nội" />
                  <Field label="Quốc tịch" field="nationality" placeholder="Ví dụ: Việt Nam" />
                  <Field label="Quốc kỳ (Emoji)" field="flag" placeholder="Ví dụ: 🇻🇳" />
                </div>
              </div>

              {/* II. Hình ảnh & Đường dẫn */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">II. Hình ảnh &amp; Đường dẫn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Ảnh đại diện / Avatar (avt) URL" field="photo" placeholder="/lvt.png hoặc https://..." />
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Ảnh Thumb / Thumbnail URL (Danh sách)</label>
                    <input type="text" value={getSocial("thumb")} onChange={e => setSocial("thumb", e.target.value)} placeholder="/lvt-thumb.png hoặc https://..." className={inputClass} />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase block">Ảnh bìa / Cover Banner URL (Chi tiết)</label>
                    <input type="text" value={getSocial("cover")} onChange={e => setSocial("cover", e.target.value)} placeholder="/lvt-cover.png hoặc https://..." className={inputClass} />
                  </div>
                </div>
              </div>

              {/* III. Mạng xã hội */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">III. Liên kết Mạng xã hội</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                      Facebook Link
                    </label>
                    <input type="text" value={getSocial("facebook")} onChange={e => setSocial("facebook", e.target.value)} placeholder="https://facebook.com/..." className={inputClass} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.85.95 1.96 1.66 3.19 2.06.01 1.25.01 2.5-.01 3.75-.92-.09-1.84-.4-2.65-.89-.96-.58-1.74-1.42-2.26-2.42V14.5c0 1.25-.26 2.48-.77 3.63-.58 1.27-1.52 2.37-2.68 3.16-1.51.98-3.32 1.4-5.11 1.18-1.88-.23-3.61-1.25-4.75-2.82C1.72 17.51 1.4 15.11 2.06 12.9c.57-1.86 1.93-3.44 3.7-4.27 1.05-.48 2.21-.69 3.36-.61.02 1.34.01 2.67.01 4.01-1.04-.15-2.14.07-3.03.68-.96.67-1.51 1.83-1.4 3.01.07 1.02.66 1.97 1.52 2.47.93.52 2.06.51 2.97-.04.75-.46 1.26-1.25 1.37-2.13.01-.29.01-.58.01-.87V.02h2.02z"/></svg>
                      TikTok Link
                    </label>
                    <input type="text" value={getSocial("tiktok")} onChange={e => setSocial("tiktok", e.target.value)} placeholder="https://tiktok.com/@..." className={inputClass} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      Instagram Link
                    </label>
                    <input type="text" value={getSocial("instagram")} onChange={e => setSocial("instagram", e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 00-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 002.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 002.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      YouTube Link
                    </label>
                    <input type="text" value={getSocial("youtube")} onChange={e => setSocial("youtube", e.target.value)} placeholder="https://youtube.com/c/..." className={inputClass} />
                  </div>
                </div>
              </div>

              {/* IV. Thành tích & Stats (Tóm tắt sơ bộ) */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">IV. Thông số thi đấu</h3>
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
                      placeholder="Giới thiệu hành trình..."
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
          )}

          {/* TAB 2: CHỈ SỐ MMA (RADAR SKILL CHART) */}
          {activeSubTab === "skills" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">Chỉ số MMA Bát Giác (0 - 100)</h3>
                <p className="text-[10px] text-zinc-500 mt-1">Kéo thanh trượt hoặc điều chỉnh giá trị số để cập nhật biểu đồ năng lực võ sĩ.</p>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 2/3 Width: Skills Sliders grid */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "STR", name: "Striking (Đứng công)", desc: "Boxing, Muay, Kicks", icon: "🥊" },
                    { key: "GRP", name: "Grappling (Vật đè)", desc: "Wrestling, Sambo, Judo", icon: "🤼" },
                    { key: "SUB", name: "Submission (Siết khóa)", desc: "BJJ, Chokes, Locks", icon: "🥋" },
                    { key: "DEF", name: "Defense (Phòng thủ)", desc: "Takedown Def, Evade", icon: "🛡️" },
                    { key: "STA", name: "Stamina (Thể lực)", desc: "Cardio, Rounds Pace", icon: "🫁" },
                    { key: "POW", name: "Power (Sức mạnh)", desc: "Explosiveness, Muscles", icon: "⚡" },
                    { key: "IQ", name: "Fight IQ (Trí tuệ)", desc: "Tactics, Adjustments", icon: "🧠" },
                  ].map((s) => {
                    const val = getSkill(s.key);
                    return (
                      <div 
                        key={s.key} 
                        className={`p-4 rounded-2xl border transition-all ${
                          isDark ? "bg-zinc-900/40 border-zinc-900/60 hover:bg-zinc-900/60" : "bg-zinc-50 border-zinc-200/80 hover:bg-zinc-100/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{s.icon}</span>
                            <div>
                              <span className={`text-xs font-bold block ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{s.name}</span>
                              <span className="text-[9px] text-zinc-500 font-medium block">{s.desc}</span>
                            </div>
                          </div>
                          <span className="text-sm font-black text-red-500 font-mono bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10">{val}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Custom range input track wrapper */}
                          <div className="relative flex-1 flex items-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={val}
                              onChange={(e) => setSkill(s.key, parseInt(e.target.value) || 0)}
                              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-800 accent-red-600 focus:outline-none"
                              style={{
                                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${val}%, ${isDark ? "#27272a" : "#e4e4e7"} ${val}%, ${isDark ? "#27272a" : "#e4e4e7"} 100%)`
                              }}
                            />
                          </div>
                          
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={val}
                            onChange={(e) => setSkill(s.key, Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                            className={`w-12 p-1 text-center font-bold rounded-lg text-xs font-mono focus:outline-none focus:border-red-500 border ${
                              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-300 text-zinc-900"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 1/3 Width: Realtime Live Radar Preview card */}
                <div className={`p-4 rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden ${
                  isDark ? "bg-zinc-900/20 border-zinc-900" : "bg-zinc-50/50 border-zinc-200"
                }`}>
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest mb-4">LIVE RADAR SKILL PREVIEW</span>
                  
                  {/* Miniature SVG Radar map */}
                  <svg width="220" height="220" className="overflow-visible">
                    {/* Background concentric rings */}
                    {[25, 50, 75, 100].map((ringVal) => {
                      const ringPoints = ["STR", "GRP", "SUB", "DEF", "STA", "POW", "IQ"].map((k, i) => {
                        const angle = (Math.PI * 2 / 7) * i - Math.PI / 2;
                        const distance = (ringVal / 100) * 80;
                        return `${110 + distance * Math.cos(angle)},${110 + distance * Math.sin(angle)}`;
                      }).join(" ");
                      return (
                        <polygon
                          key={ringVal}
                          points={ringPoints}
                          fill="none"
                          stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Outer label indicators */}
                    {["STR", "GRP", "SUB", "DEF", "STA", "POW", "IQ"].map((k, i) => {
                      const angle = (Math.PI * 2 / 7) * i - Math.PI / 2;
                      const lblPt = { x: 110 + 95 * Math.cos(angle), y: 110 + 95 * Math.sin(angle) };
                      return (
                        <text
                          key={k}
                          x={lblPt.x}
                          y={lblPt.y}
                          fill={isDark ? "#71717a" : "#27272a"}
                          fontSize="8"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {k}
                        </text>
                      );
                    })}

                    {/* Skill radar fill area */}
                    <polygon
                      points={["STR", "GRP", "SUB", "DEF", "STA", "POW", "IQ"].map((k, i) => {
                        const angle = (Math.PI * 2 / 7) * i - Math.PI / 2;
                        const distance = (getSkill(k) / 100) * 80;
                        return `${110 + distance * Math.cos(angle)},${110 + distance * Math.sin(angle)}`;
                      }).join(" ")}
                      fill="rgba(239,68,68,0.18)"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                  </svg>
                  
                  <span className="text-[10px] font-bold text-zinc-500 font-mono mt-4 uppercase">{fighter.name || "Võ sĩ mới"}</span>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: THÀNH TÍCH NỔI BẬT */}
          {activeSubTab === "achieve" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">Danh sách thành tích đạt được</h3>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg border-none cursor-pointer"
                >
                  + Thêm thành tích
                </button>
              </div>

              <div className="space-y-3">
                {(!fighter.achievements || fighter.achievements.length === 0) ? (
                  <p className="text-xs text-zinc-500 italic py-4">Chưa ghi nhận thành tích nào. Bấm nút phía trên để thêm.</p>
                ) : (
                  fighter.achievements.map((ach: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <span className="text-zinc-500 text-xs font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => handleEditAchievement(idx, e.target.value)}
                        placeholder="Ví dụ: Đương kim Vô địch LION Championship 56kg Nam (2025 - Hiện tại)"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        className="px-2 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border-none cursor-pointer shrink-0 transition-all"
                        title="Xóa dòng này"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: LỊCH SỬ ĐẤU (FIGHT TIMELINE) */}
          {activeSubTab === "history" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
                <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">Lịch sử các trận đấu đã qua</h3>
                <button
                  type="button"
                  onClick={handleAddFight}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg border-none cursor-pointer"
                >
                  + Thêm trận đấu
                </button>
              </div>

              <div className="space-y-4">
                {(!fighter.fights || fighter.fights.length === 0) ? (
                  <p className="text-xs text-zinc-500 italic py-4">Chưa có dữ liệu lịch sử đấu. Bấm nút phía trên để thêm.</p>
                ) : (
                  fighter.fights.map((fight: any, idx: number) => (
                    <div key={idx} className="border p-4 rounded-2xl relative space-y-3" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
                      
                      {/* Delete fight btn */}
                      <button
                        type="button"
                        onClick={() => handleRemoveFight(idx)}
                        className="absolute top-4 right-4 px-2 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border-none cursor-pointer transition-all"
                        title="Xóa trận đấu này"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      <div className="text-[10px] font-mono text-zinc-500 font-bold">TRẬN ĐẤU #{fighter.fights.length - idx}</div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Đối thủ*</label>
                          <input type="text" value={fight.opponent ?? ""} onChange={e => handleEditFight(idx, "opponent", e.target.value)} placeholder="Ví dụ: Nguyễn Văn An" className={inputClass} required />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Ngày đấu*</label>
                          <input type="date" value={fight.date ?? ""} onChange={e => handleEditFight(idx, "date", e.target.value)} className={inputClass} required />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Sự kiện*</label>
                          <input type="text" value={fight.event ?? ""} onChange={e => handleEditFight(idx, "event", e.target.value)} placeholder="LION Championship 33" className={inputClass} required />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Kết quả</label>
                          <select value={fight.result ?? "W"} onChange={e => handleEditFight(idx, "result", e.target.value)} className={inputClass}>
                            <option value="W">Thắng (W)</option>
                            <option value="L">Thua (L)</option>
                            <option value="D">Hòa (D)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Phương thức</label>
                          <input type="text" value={fight.method ?? ""} onChange={e => handleEditFight(idx, "method", e.target.value)} placeholder="KO / TKO / Submission / Decision" className={inputClass} />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-400 uppercase">Hiệp kết thúc</label>
                          <input type="number" min="1" max="5" value={fight.round ?? 3} onChange={e => handleEditFight(idx, "round", parseInt(e.target.value) || 1)} className={inputClass} />
                        </div>

                        <div className="space-y-1 col-span-2">
                          <label className="text-[9px] text-zinc-400 uppercase">Thời gian hiệp đấu (m:ss)</label>
                          <input type="text" value={fight.time ?? ""} onChange={e => handleEditFight(idx, "time", e.target.value)} placeholder="5:00" className={inputClass} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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
