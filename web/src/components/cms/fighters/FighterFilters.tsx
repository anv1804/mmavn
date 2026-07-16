import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";

interface Props {
  searchQuery: string;
  filterWeightClass: string;
  filterGender: string;
  filterStatus: string;
  uniqueWeightClasses: string[];
  hasFilter: boolean;
  onSearch: (v: string) => void;
  onWeightClass: (v: string) => void;
  onGender: (v: string) => void;
  onStatus: (v: string) => void;
  onReset: () => void;
}

const DEFAULT_WEIGHT_CLASSES = ["52kg","56kg","60kg","65kg","70kg","77kg","84kg","93kg","+93kg"];

export default function FighterFilters({
  searchQuery, filterWeightClass, filterGender, filterStatus,
  uniqueWeightClasses, hasFilter,
  onSearch, onWeightClass, onGender, onStatus, onReset,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const selectClass = `px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all ${
    isDark
      ? "bg-zinc-900 border-zinc-800 text-white focus:border-red-500 focus:outline-none"
      : "bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-red-500 focus:outline-none"
  }`;

  const weightOptions = uniqueWeightClasses.length > 0 ? uniqueWeightClasses : DEFAULT_WEIGHT_CLASSES;

  return (
    <div
      className={`p-4 rounded-2xl border flex flex-wrap gap-3 items-center ${
        isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"
      }`}
    >
      <CmsSearchBar
        value={searchQuery}
        onChange={onSearch}
        placeholder="Tìm tên, biệt danh, võ đường..."
      />

      <select value={filterWeightClass} onChange={(e) => onWeightClass(e.target.value)} className={selectClass}>
        <option value="">Tất cả hạng cân</option>
        {weightOptions.map((wc) => <option key={wc} value={wc}>{wc}</option>)}
      </select>

      <select value={filterGender} onChange={(e) => onGender(e.target.value)} className={selectClass}>
        <option value="">Giới tính</option>
        <option value="Nam">♂ Nam</option>
        <option value="Nữ">♀ Nữ</option>
      </select>

      <select value={filterStatus} onChange={(e) => onStatus(e.target.value)} className={selectClass}>
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang hoạt động</option>
        <option value="inactive">Ngưng hoạt động</option>
      </select>

      <button
        disabled={!hasFilter}
        onClick={onReset}
        title="Xóa bộ lọc"
        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
          !hasFilter
            ? isDark
              ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
              : "border-zinc-200 text-zinc-300 cursor-not-allowed"
            : isDark
            ? "border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-500/40 cursor-pointer"
            : "border-zinc-300 text-zinc-500 hover:text-red-600 hover:border-red-300 cursor-pointer"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
