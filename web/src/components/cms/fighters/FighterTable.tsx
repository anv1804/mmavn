import { useTheme } from "../../../context/ThemeContext";
import CmsPagination from "../shared/CmsPagination";

const FIGHTERS_PER_PAGE = 25;

interface Props {
  fighters: any[];
  clubs: any[];
  page: number;
  totalPages: number;
  total: number;
  onEdit: (f: any) => void;
  onDelete: (id: string) => void;
  onPageChange: (p: number) => void;
}

function GenderIcon({ gender }: { gender?: string }) {
  return gender === "Nữ"
    ? <span className="text-sm text-pink-500 font-bold leading-none" title="Nữ">♀</span>
    : <span className="text-sm text-blue-400 font-bold leading-none" title="Nam">♂</span>;
}

function StatusDot({ active }: { active?: boolean }) {
  return (
    <span
      title={active !== false ? "Đang hoạt động" : "Ngưng hoạt động"}
      className={`inline-block w-2.5 h-2.5 rounded-full ${
        active !== false ? "bg-emerald-500 shadow-sm shadow-emerald-500/60" : "bg-zinc-500"
      }`}
    />
  );
}

const THEAD_COLS = ["#", "Võ Sĩ", "Hạng Cân", "Võ Đường", "Quốc tịch", "Trạng thái", ""];

export default function FighterTable({ fighters, clubs, page, totalPages, total, onEdit, onDelete, onPageChange }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const thClass = `px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap ${isDark ? "text-zinc-400" : "text-zinc-500"}`;

  return (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-zinc-900" : "border-zinc-200"}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className={isDark ? "bg-zinc-900/80" : "bg-zinc-50"}>
              {THEAD_COLS.map((h, i) => (
                <th key={i} className={`${i === 6 ? "text-right" : "text-left"} ${thClass}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-zinc-900" : "divide-zinc-100"}`}>
            {fighters.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-4xl">🔍</span>
                    <p className={`text-sm font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                      Không tìm thấy võ sĩ nào
                    </p>
                    <p className="text-xs text-zinc-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  </div>
                </td>
              </tr>
            ) : (
              fighters.map((fighter, idx) => {
                const linkedClub = clubs.find(
                  (c) => c.name === fighter.club || c.short_name === fighter.club || c.id === fighter.club,
                );
                return (
                  <tr
                    key={fighter.id}
                    className={`transition-colors ${isDark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"}`}
                  >
                    {/* Index */}
                    <td className={`px-4 py-3 text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                      {(page - 1) * FIGHTERS_PER_PAGE + idx + 1}
                    </td>

                    {/* Identity */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={fighter.photo || "/lvt.png"}
                          alt={fighter.name}
                          className="w-9 h-9 rounded-full object-cover object-top shrink-0"
                          style={{ background: isDark ? "#18181b" : "#f4f4f5" }}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className={`font-semibold leading-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                              {fighter.name}
                            </p>
                            <GenderIcon gender={fighter.gender} />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Weight class */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-100 text-zinc-700"}`}>
                        {fighter.weight_class || "—"}
                      </span>
                    </td>

                    {/* Club */}
                    <td className="px-4 py-3">
                      {linkedClub ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={linkedClub.logo || "/logo-lionchampionship.png"}
                            alt={linkedClub.name}
                            className="w-6 h-6 rounded object-contain"
                            style={{ background: isDark ? "#18181b" : "#f4f4f5" }}
                          />
                          <span className={`text-xs ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                            {linkedClub.short_name || linkedClub.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">{fighter.club || "—"}</span>
                      )}
                    </td>

                    {/* Nationality */}
                    <td className={`px-4 py-3 text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                      <span className="flex items-center gap-1.5">
                        {fighter.flag && <span>{fighter.flag}</span>}
                        <span>{fighter.nationality || "—"}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <StatusDot active={fighter.active} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="Chỉnh sửa"
                          onClick={() => onEdit(fighter)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all ${
                            isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          title="Xóa võ sĩ"
                          onClick={() => onDelete(fighter.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <CmsPagination
        page={page}
        totalPages={totalPages}
        total={total}
        perPage={FIGHTERS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
}
