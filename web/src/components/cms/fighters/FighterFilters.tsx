import { useTheme } from "../../../context/ThemeContext";
import CmsSearchBar from "../shared/CmsSearchBar";
import CmsSelect from "../shared/CmsSelect";

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

  const weightOptions = (uniqueWeightClasses.length > 0 ? uniqueWeightClasses : DEFAULT_WEIGHT_CLASSES)
    .map((wc) => ({ value: wc, label: wc }));

  const genderOptions = [
    { value: "Nam", label: "♂ Nam" },
    { value: "Nữ", label: "♀ Nữ" },
  ];

  const statusOptions = [
    { value: "Thi đấu", label: "🟢 Thi đấu" },
    { value: "Chấn thương", label: "🟠 Chấn thương" },
    { value: "Giải nghệ", label: "⚪ Giải nghệ" },
    { value: "Ẩn", label: "⚫ Ẩn" },
  ];

  return (
    <div
      className={`p-3 rounded-2xl border flex flex-wrap gap-2 items-center ${
        isDark ? "bg-zinc-950/60 border-zinc-900" : "bg-white border-zinc-200"
      }`}
    >
      <CmsSearchBar
        value={searchQuery}
        onChange={onSearch}
        placeholder="Tìm tên, võ đường..."
      />

      <CmsSelect
        value={filterWeightClass}
        onChange={onWeightClass}
        options={weightOptions}
        placeholder="Hạng cân"
        minWidth="130px"
      />

      <CmsSelect
        value={filterGender}
        onChange={onGender}
        options={genderOptions}
        placeholder="Giới tính"
        minWidth="110px"
      />

      <CmsSelect
        value={filterStatus}
        onChange={onStatus}
        options={statusOptions}
        placeholder="Trạng thái"
        minWidth="130px"
      />

      {/* Reset – icon only */}
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
