import { useTheme } from "../../../context/ThemeContext";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (p: number) => void;
}

export default function CmsPagination({ page, totalPages, total, perPage, onPageChange }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (totalPages <= 1) return null;

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const pages: number[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const s = Math.max(1, page - 3);
    for (let i = 0; i < 7; i++) {
      const p = s + i;
      if (p <= totalPages) pages.push(p);
    }
  }

  const btn = (label: string, disabled: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
        isDark ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`px-4 py-3 border-t flex items-center justify-between ${
        isDark ? "border-zinc-900 bg-zinc-950/40" : "border-zinc-100 bg-zinc-50"
      }`}
    >
      <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
        Hiển thị {start}–{end} / {total}
      </span>
      <div className="flex items-center gap-1">
        {btn("‹ Trước", page === 1, () => onPageChange(page - 1))}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-all ${
              p === page
                ? "bg-[#dc2626] text-white shadow-md shadow-red-600/20"
                : isDark
                ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-400"
                : "bg-zinc-200 hover:bg-zinc-300 text-zinc-600"
            }`}
          >
            {p}
          </button>
        ))}
        {btn("Sau ›", page === totalPages, () => onPageChange(page + 1))}
      </div>
    </div>
  );
}
