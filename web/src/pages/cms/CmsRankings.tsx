import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../utils/supabase";

export default function CmsRankings() {
  const { rankings, setRankings, showMsg, msg } = useCms();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selected, setSelected] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const filtered = rankings.filter(r => r.name?.toLowerCase().includes(search.toLowerCase()));

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("rankings").upsert(selected);
    if (error) showMsg("Lỗi lưu bảng xếp hạng: " + error.message, "error");
    else {
      setRankings(rankings.map(r => r.id === selected.id ? selected : r));
      setSelected(null);
      showMsg("Đã lưu bảng xếp hạng thành công!");
    }
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
              <h1 className="text-2xl font-black tracking-tight">Hạng Cân / Bảng Xếp Hạng</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{filtered.length} hạng cân</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"}`}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Tìm hạng cân..." value={search} onChange={e => setSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs transition-all ${isDark ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:outline-none"}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((ranking) => (
              <div key={ranking.id} className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${isDark ? "bg-zinc-950/80 border-zinc-900/60 hover:border-zinc-800" : "bg-white border-zinc-200 hover:border-zinc-300"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}>🏆</div>
                  <div>
                    <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>{ranking.name}</h3>
                    <p className="text-[10px] text-zinc-500">
                      Đương kim VĐ: {ranking.champion?.name || <span className="italic">Chưa có</span>}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelected(ranking)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`}>
                  Quản lý BXH
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16">
                <span className="text-4xl block mb-3">🏆</span>
                <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Không tìm thấy hạng cân nào</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={saveForm} className={`p-6 rounded-3xl border space-y-6 ${isDark ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-200"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
              Bảng xếp hạng: {selected.name}
            </h2>
            <button type="button" onClick={() => setSelected(null)} className={`px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>← Quay lại</button>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">🏆 Đương kim vô địch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Họ tên Champion", field: "name" },
                { label: "Thành tích (ví dụ: 12-2-0)", field: "record" },
                { label: "Võ đường", field: "club" },
              ].map(({ label, field }) => (
                <div key={field} className="space-y-1">
                  <label className="text-[9px] text-zinc-500 uppercase block">{label}</label>
                  <input type="text" value={selected.champion?.[field] || ""}
                    onChange={e => setSelected({ ...selected, champion: { ...selected.champion, [field]: e.target.value } })}
                    className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500/65 focus:outline-none" : "bg-white border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">📋 Danh sách xếp hạng</h3>
            <div className="space-y-3">
              {((selected.rankings || []) as any[]).map((rf, rankIdx) => (
                <div key={rankIdx} className={`p-3 border rounded-xl grid grid-cols-12 gap-3 items-center ${isDark ? "bg-zinc-900/40 border-zinc-900/60" : "bg-zinc-50 border-zinc-200"}`}>
                  <div className={`col-span-1 text-center font-black text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>{rf.rank}</div>
                  {["name", "record", "club"].map((field, fi) => (
                    <div key={field} className={`col-span-${fi === 0 ? 4 : fi === 1 ? 3 : 4} space-y-1`}>
                      <label className="text-[8px] text-zinc-500 block">{field === "name" ? "Họ Tên" : field === "record" ? "Thành tích" : "Võ đường"}</label>
                      <input type="text" value={rf[field]} onChange={e => {
                        const next = [...selected.rankings];
                        next[rankIdx][field] = e.target.value;
                        setSelected({ ...selected, rankings: next });
                      }} className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 text-white focus:border-red-500/60 focus:outline-none rounded text-[11px]" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Lưu bảng xếp hạng</button>
            <button type="button" onClick={() => setSelected(null)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-all">Hủy</button>
          </div>
        </form>
      )}
    </div>
  );
}
