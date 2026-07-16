import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";

export default function CmsEvents() {
  const { events, saveEvents, showMsg, msg } = useCms();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.loc.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEvent = (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa sự kiện này?")) return;
    saveEvents(events.filter(e => e.id !== id));
    showMsg("Đã xóa sự kiện thành công!");
  };

  const initNew = () => setSelected({
    id: "event-" + Date.now(), title: "", date: "", loc: "",
    type: "Championship Bout", status: "Sắp diễn ra",
  });

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.title || !selected.date) return showMsg("Vui lòng điền tiêu đề và ngày sự kiện", "error");
    const idx = events.findIndex(ev => ev.id === selected.id);
    saveEvents(idx > -1 ? events.map(ev => ev.id === selected.id ? selected : ev) : [...events, selected]);
    setSelected(null);
    showMsg("Đã lưu sự kiện thành công!");
  };

  const inp = (label: string, field: string, placeholder = "") => (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-400 uppercase block">{label}</label>
      <input type="text" placeholder={placeholder} value={selected[field] ?? ""} onChange={e => setSelected({ ...selected, [field]: e.target.value })}
        className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/60 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`} />
    </div>
  );

  const statusColor = (status: string) => {
    if (status?.includes("Trực tiếp")) return "bg-red-500/10 text-red-500 border-red-500/20";
    if (status?.includes("Bán vé")) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
  };

  return (
    <div className="space-y-6">
      {msg.text && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider ${msg.type === "success" ? "bg-emerald-500 text-white" : "bg-red-600 text-white"}`}>
          <span>{msg.type === "success" ? "✓" : "⚠"}</span><span>{msg.text}</span>
        </div>
      )}

      {!selected ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Lịch Sự Kiện</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{filtered.length} sự kiện</p>
            </div>
            <button onClick={initNew} className="px-5 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none transition-all shadow-md shadow-red-600/20 cursor-pointer">
              + Thêm Sự Kiện
            </button>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Tìm tên sự kiện, địa điểm..." value={search} onChange={e => setSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs transition-all ${isDark ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:outline-none"}`} />
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
            <table className="w-full text-xs">
              <thead>
                <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
                  {["#", "Sự Kiện", "Thời Gian", "Địa Điểm", "Hạng Mục", "Phát Sóng", ""].map((h, i) => (
                    <th key={i} className={`${i === 6 ? "text-right" : "text-left"} px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <span className="text-4xl block mb-3">📅</span>
                      <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy sự kiện nào</p>
                    </td>
                  </tr>
                ) : filtered.map((evt, idx) => (
                  <tr key={evt.id} className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}>
                    <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{idx + 1}</td>
                    <td className="px-4 py-3">
                      <p className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>{evt.title}</p>
                    </td>
                    <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{evt.date}</td>
                    <td className={`px-4 py-3 text-xs max-w-[160px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                      <span className="line-clamp-2">{evt.loc}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}>{evt.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusColor(evt.status)}`}>{evt.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button title="Chỉnh sửa" onClick={() => setSelected(evt)}
                          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border-none cursor-pointer transition-all ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"}`}>✏️</button>
                        <button title="Xóa" onClick={() => deleteEvent(evt.id)}
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
        <form onSubmit={saveForm} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
              {selected.title ? "Cập nhật sự kiện" : "Tạo mới sự kiện"}
            </h2>
            <button type="button" onClick={() => setSelected(null)} className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>← Quay lại</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inp("Tiêu đề Sự kiện*", "title", "LION Championship 34")}
            {inp("Thời gian diễn ra*", "date", "Thứ Bảy, ngày 18 tháng 7, 2026")}
            {inp("Địa điểm thi đấu", "loc", "Nhà thi đấu Rạch Miễu, TP. HCM")}
            {inp("Hạng mục thi đấu", "type", "Championship Bout")}
            {inp("Trạng thái / Phát sóng", "status", "Trực tiếp lúc 19:00")}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu sự kiện</button>
            <button type="button" onClick={() => setSelected(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
          </div>
        </form>
      )}
    </div>
  );
}
