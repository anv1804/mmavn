import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../utils/supabase";

export default function CmsClubs() {
  const { clubs, setClubs, showMsg, msg } = useCms();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.city && c.city.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteClub = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa võ đường này?")) return;
    const { error } = await supabase.from("clubs").delete().eq("id", id);
    if (error) showMsg("Lỗi xóa: " + error.message, "error");
    else { setClubs(clubs.filter(c => c.id !== id)); showMsg("Đã xóa võ đường thành công!"); }
  };

  const initNew = () => setSelected({
    id: "club-" + Date.now(),
    slug: "new-club-" + Math.floor(Math.random() * 1000),
    name: "", short_name: "", city: "TP. Hồ Chí Minh", district: "", address: "",
    head_coach: "", disciplines: ["MMA"], description: "", founded_year: 2026,
    logo: "/logo-lionchampionship.png", cover: "", facebook: "", tiktok: "",
    statistics: { wins: 0, losses: 0, draws: 0 }, active: true,
  });

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.name) return showMsg("Vui lòng điền tên võ đường", "error");
    const { error } = await supabase.from("clubs").upsert(selected);
    if (error) showMsg("Lỗi lưu võ đường: " + error.message, "error");
    else {
      const idx = clubs.findIndex(c => c.id === selected.id);
      setClubs(idx > -1 ? clubs.map(c => c.id === selected.id ? selected : c) : [...clubs, selected].sort((a, b) => a.name.localeCompare(b.name)));
      setSelected(null);
      showMsg("Đã lưu võ đường thành công!");
    }
  };

  const inp = (label: string, field: string, type = "text", disabled = false) => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input type={type} disabled={disabled}
        value={selected[field] ?? ""}
        onChange={e => setSelected({ ...selected, [field]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
        className={`w-full p-2.5 rounded-xl border text-xs ${
          disabled ? isDark ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-400"
          : isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
        }`} />
    </div>
  );

  return (
    <div className="space-y-6">
      {msg.text && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider ${msg.type === "success" ? "bg-emerald-500 text-white" : "bg-red-600 text-white"}`}>
          <span>{msg.type === "success" ? "✓" : "⚠"}</span><span>{msg.text}</span>
        </div>
      )}

      {!selected ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Quản Lý Câu Lạc Bộ</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{filtered.length} võ đường</p>
            </div>
            <button onClick={initNew} className="px-5 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none transition-all shadow-md shadow-red-600/20 cursor-pointer">
              + Thêm Võ Đường
            </button>
          </div>

          {/* Search */}
          <div className={`p-4 rounded-2xl border flex gap-3 items-center ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Tìm tên võ đường, thành phố..." value={search} onChange={e => setSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs transition-all ${isDark ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:outline-none"}`} />
            </div>
          </div>

          {/* Table */}
          <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
            <table className="w-full text-xs">
              <thead>
                <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
                  {["#", "Võ Đường", "Thành Phố", "HLV Trưởng", "Bộ Môn", ""].map((h, i) => (
                    <th key={i} className={`${i === 5 ? "text-right" : "text-left"} px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-4xl">🔍</span>
                        <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy võ đường nào</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.map((club, idx) => (
                  <tr key={club.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                    <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={club.logo || "/logo-lionchampionship.png"} alt={club.name} className="w-9 h-9 rounded-xl object-contain shrink-0" style={{ background: isDark ? "#18181b" : "#f4f4f5", padding: 4 }} />
                        <div>
                          <p className={`font-semibold leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>{club.name}</p>
                          {club.short_name && <p className="text-[10px] text-zinc-500">{club.short_name}</p>}
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{club.city || "—"}</td>
                    <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{club.head_coach || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(club.disciplines || []).map((d: string) => (
                          <span key={d} className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}>{d}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button title="Chỉnh sửa" onClick={() => setSelected(club)}
                          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"}`}>✏️</button>
                        <button title="Xóa" onClick={() => deleteClub(club.id)}
                          className="w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* ── FORM ── */
        <form onSubmit={saveForm} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
              {selected.name ? "Cập nhật võ đường" : "Tạo mới võ đường"}
            </h2>
            <button type="button" onClick={() => setSelected(null)} className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>← Quay lại</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inp("Mã Võ đường (ID)*", "id", "text", true)}
            {inp("Slug đường dẫn*", "slug")}
            {inp("Tên Võ đường*", "name")}
            {inp("Tên viết tắt", "short_name")}
            {inp("Tỉnh / Thành Phố", "city")}
            {inp("Địa chỉ chi tiết", "address")}
            {inp("HLV trưởng", "head_coach")}
            {inp("Năm thành lập", "founded_year", "number")}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 uppercase block">Bộ môn (cách nhau bởi dấu phẩy)</label>
              <input type="text" value={(selected.disciplines || []).join(", ")}
                onChange={e => setSelected({ ...selected, disciplines: e.target.value.split(",").map((d: string) => d.trim()) })}
                className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`} />
            </div>
            {inp("Đường dẫn Logo URL", "logo")}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 uppercase block">Giới thiệu ngắn gọn</label>
            <textarea value={selected.description || ""} rows={3} onChange={e => setSelected({ ...selected, description: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`}></textarea>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu võ đường</button>
            <button type="button" onClick={() => setSelected(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
          </div>
        </form>
      )}
    </div>
  );
}
