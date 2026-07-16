import { useTheme } from "../../../context/ThemeContext";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function CmsSearchBar({ value, onChange, placeholder = "Tìm kiếm..." }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="relative flex-1 min-w-[180px]">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs transition-all ${
          isDark
            ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
            : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:outline-none"
        }`}
      />
    </div>
  );
}
