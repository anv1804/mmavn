import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../utils/supabase";

const FIGHTERS_PER_PAGE = 25;

export default function CmsFighters() {
  const { fighters, setFighters, clubs, showMsg, msg } = useCms();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterWeightClass, setFilterWeightClass] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any | null>(null);

  // ── Filter ───────────────────────────────────────────────────────────────
  const filtered = fighters.filter(f => {
    const q = searchQuery.toLowerCase();
    const matchSearch = f.name.toLowerCase().includes(q) || (f.nickname && f.nickname.toLowerCase().includes(q)) || (f.club && f.club.toLowerCase().includes(q));
    const matchWeight = !filterWeightClass || f.weight_class === filterWeightClass;
    const matchGender = !filterGender || (f.gender || "Nam") === filterGender;
    const matchStatus = !filterStatus || (filterStatus === "active" ? f.active !== false : f.active === false);
    return matchSearch && matchWeight && matchGender && matchStatus;
  });

  const uniqueWeightClasses = Array.from(new Set(fighters.map(f => f.weight_class).filter(Boolean))).sort() as string[];
  const totalPages = Math.ceil(filtered.length / FIGHTERS_PER_PAGE);
  const paged = filtered.slice((page - 1) * FIGHTERS_PER_PAGE, page * FIGHTERS_PER_PAGE);

  const resetFilters = () => { setSearchQuery(""); setFilterWeightClass(""); setFilterGender(""); setFilterStatus(""); setPage(1); };
  const hasFilter = !!(searchQuery || filterWeightClass || filterGender || filterStatus);

  // ── CRUD ─────────────────────────────────────────────────────────────────
  const deleteFighter = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa võ sĩ này?")) return;
    const { error } = await supabase.from("fighters").delete().eq("id", id);
    if (error) showMsg("Lỗi xóa: " + error.message, "error");
    else { setFighters(fighters.filter(f => f.id !== id)); showMsg("Đã xóa võ sĩ thành công!"); }
  };

  const initNew = () => setSelected({
    id: "fighter-" + Date.now(), name: "", nickname: "", weight_class: "56kg", gender: "Nam",
    club: "", coach: "", photo: "/lvt.png", bio: "", age: 28, height: 168, reach: 168,
    hometown: "", nationality: "Việt Nam", flag: "🇻🇳", wins: 0, losses: 0, draws: 0,
    ko_wins: 0, sub_wins: 0, decision_wins: 0, active: true,
  });

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.name) return showMsg("Vui lòng nhập tên võ sĩ", "error");
    const { error } = await supabase.from("fighters").upsert(selected);
    if (error) showMsg("Lỗi lưu võ sĩ: " + error.message, "error");
    else {
      const idx = fighters.findIndex(f => f.id === selected.id);
      setFighters(idx > -1 ? fighters.map(f => f.id === selected.id ? selected : f) : [...fighters, selected].sort((a, b) => a.name.localeCompare(b.name)));
      setSelected(null);
      showMsg("Đã lưu hồ sơ võ sĩ thành công!");
    }
  };

  // ── INPUT helper ─────────────────────────────────────────────────────────
  const inp = (label: string, field: string, type = "text", disabled = false) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input
        type={type} disabled={disabled}
        value={selected[field] ?? ""}
        onChange={e => setSelected({ ...selected, [field]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
        className={`w-full p-2.5 rounded-xl border text-xs ${
          disabled ? isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-400"
          : isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
        }`}
      />
    </div>
  );

  const sel = (label: string, field: string, options: { v: string; l: string }[]) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <select value={selected[field] ?? ""} onChange={e => setSelected({ ...selected, [field]: e.target.value })}
        className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Toast */}
      {msg.text && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider ${
          msg.type === "success" ? "bg-emerald-500 text-white" : "bg-red-600 text-white"}`}>
          <span>{msg.type === "success" ? "✓" : "⚠"}</span><span>{msg.text}</span>
        </div>
      )}

      {!selected ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Quản Lý Võ Sĩ</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{filtered.length} võ sĩ · Trang {page}/{Math.max(totalPages, 1)}</p>
            </div>
            <button onClick={initNew} className="px-5 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none transition-all shadow-md shadow-red-600/20 cursor-pointer">
              + Thêm Võ Sĩ
            </button>
          </div>

          {/* Filter bar */}
          <div className={`p-4 rounded-2xl border flex flex-wrap gap-3 items-center ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
            <div className="relative flex-1 min-w-[180px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Tìm tên, biệt danh, võ đường..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs transition-all ${isDark ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:outline-none"}`} />
            </div>

            <select value={filterWeightClass} onChange={e => { setFilterWeightClass(e.target.value); setPage(1); }}
              className={`px-3 py-2 rounded-xl border text-xs cursor-pointer ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`}>
              <option value="">Tất cả hạng cân</option>
              {uniqueWeightClasses.length > 0
                ? uniqueWeightClasses.map(wc => <option key={wc} value={wc}>{wc}</option>)
                : ["52kg","56kg","60kg","65kg","70kg","77kg","84kg","93kg","+93kg"].map(wc => <option key={wc} value={wc}>{wc}</option>)
              }
            </select>

            <select value={filterGender} onChange={e => { setFilterGender(e.target.value); setPage(1); }}
              className={`px-3 py-2 rounded-xl border text-xs cursor-pointer ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`}>
              <option value="">Giới tính</option>
              <option value="Nam">♂ Nam</option>
              <option value="Nữ">♀ Nữ</option>
            </select>

            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
              className={`px-3 py-2 rounded-xl border text-xs cursor-pointer ${isDark ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`}>
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>

            <button disabled={!hasFilter} onClick={resetFilters}
              className={`px-3 py-2 rounded-xl border text-xs transition-all ${
                !hasFilter
                  ? isDark ? "border-zinc-800 text-zinc-700 cursor-not-allowed" : "border-zinc-200 text-zinc-300 cursor-not-allowed"
                  : isDark ? "border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-500/40 cursor-pointer" : "border-zinc-300 text-zinc-500 hover:text-red-600 hover:border-red-300 cursor-pointer"
              }`}>
              ✕ Xóa bộ lọc
            </button>
          </div>

          {/* Table */}
          <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
                    {["#", "Võ Sĩ", "Hạng Cân", "Võ Đường", "Quốc tịch", "Trạng thái", ""].map((h, i) => (
                      <th key={i} className={`${i === 6 ? "text-right" : "text-left"} px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3">
                          <span className="text-4xl">🔍</span>
                          <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy võ sĩ nào</p>
                          <p className="text-xs text-zinc-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                      </td>
                    </tr>
                  ) : paged.map((fighter, idx) => {
                    const linkedClub = clubs.find(c => c.name === fighter.club || c.short_name === fighter.club || c.id === fighter.club);
                    return (
                      <tr key={fighter.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                        <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                          {(page - 1) * FIGHTERS_PER_PAGE + idx + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={fighter.photo || "/lvt.png"} alt={fighter.name} className="w-9 h-9 rounded-full object-cover object-top shrink-0" style={{ background: isDark ? "#18181b" : "#f4f4f5" }} />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className={`font-semibold leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>{fighter.name}</p>
                                {fighter.gender === "Nữ"
                                  ? <span className="text-[11px] text-pink-500 font-bold" title="Nữ">♀</span>
                                  : <span className="text-[11px] text-blue-400 font-bold" title="Nam">♂</span>}
                              </div>
                              {fighter.nickname && <p className="text-[10px] text-zinc-500 italic">"{fighter.nickname}"</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-100 text-zinc-700"}`}>
                            {fighter.weight_class || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {linkedClub ? (
                            <div className="flex items-center gap-2">
                              <img src={linkedClub.logo || "/logo-lionchampionship.png"} alt={linkedClub.name} className="w-6 h-6 rounded object-contain" style={{ background: isDark ? "#18181b" : "#f4f4f5" }} />
                              <span className={`text-xs ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{linkedClub.short_name || linkedClub.name}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-500">{fighter.club || "—"}</span>
                          )}
                        </td>
                        <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                          <span className="flex items-center gap-1.5">
                            {fighter.flag && <span>{fighter.flag}</span>}
                            <span>{fighter.nationality || "—"}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span title={fighter.active !== false ? "Đang hoạt động" : "Ngưng hoạt động"}
                            className={`inline-block w-2.5 h-2.5 rounded-full ${fighter.active !== false ? "bg-emerald-500 shadow-sm shadow-emerald-500/60" : "bg-zinc-500"}`} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button title="Chỉnh sửa" onClick={() => setSelected(fighter)}
                              className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"}`}>✏️</button>
                            <button title="Xóa võ sĩ" onClick={() => deleteFighter(fighter.id)}
                              className="w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white">🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`px-4 py-3 border-t flex items-center justify-between ${isDark ? "border-zinc-900 bg-zinc-950/40" : "border-zinc-100 bg-zinc-50"}`}>
                <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                  Hiển thị {(page - 1) * FIGHTERS_PER_PAGE + 1}–{Math.min(page * FIGHTERS_PER_PAGE, filtered.length)} / {filtered.length} võ sĩ
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`}>
                    ‹ Trước
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const pg = totalPages > 7 ? Math.max(1, page - 3) + i : i + 1;
                    if (pg > totalPages) return null;
                    return (
                      <button key={pg} onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all ${
                          pg === page ? "bg-[#dc2626] text-white shadow-md shadow-red-600/20" : isDark ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-400" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-600"
                        }`}>{pg}</button>
                    );
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`}>
                    Sau ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ── FORM ─────────────────────────────────────────────────────────── */
        <form onSubmit={saveForm} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
              {selected.name ? "Cập nhật võ sĩ" : "Tạo mới võ sĩ"}
            </h2>
            <button type="button" onClick={() => setSelected(null)} className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
              ← Quay lại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inp("Mã Võ Sĩ (ID)*", "id", "text", true)}
            <div className="col-span-2">{inp("Họ Tên Võ sĩ*", "name")}</div>
            {inp("Biệt danh (Nickname)", "nickname")}
            {inp("Hạng cân (ví dụ: 56kg)", "weight_class")}
            {sel("Giới tính", "gender", [{ v: "Nam", l: "♂ Nam" }, { v: "Nữ", l: "♀ Nữ" }])}
            {inp("Võ đường trực thuộc", "club")}
            {inp("Tuổi", "age", "number")}
            {inp("Chiều cao (cm)", "height", "number")}
            {inp("Sải tay (cm)", "reach", "number")}
            {inp("Quê quán", "hometown")}
            {inp("Quốc tịch", "nationality")}
            {inp("Quốc kỳ (Emoji)", "flag")}
            {inp("Số trận thắng", "wins", "number")}
            {inp("Số trận thua", "losses", "number")}
            {inp("Số trận hòa", "draws", "number")}
          </div>

          {inp("Đường dẫn ảnh võ sĩ URL", "photo")}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 uppercase block">Tiểu sử võ sĩ</label>
            <textarea value={selected.bio || ""} rows={3} onChange={e => setSelected({ ...selected, bio: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`}></textarea>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu võ sĩ</button>
            <button type="button" onClick={() => setSelected(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
          </div>
        </form>
      )}
    </div>
  );
}
