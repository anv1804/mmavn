import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  minWidth?: string;
}

export default function CmsSelect({ value, onChange, options, placeholder = "Tất cả", minWidth = "140px" }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);
  const label = selected ? selected.label : placeholder;
  const hasValue = !!value;

  return (
    <div ref={ref} className="relative" style={{ minWidth }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer select-none ${
          open
            ? isDark
              ? "border-red-500/50 bg-zinc-900 text-white"
              : "border-red-400/60 bg-white text-zinc-900 shadow-sm shadow-red-500/10"
            : hasValue
            ? isDark
              ? "border-red-500/40 bg-zinc-900/80 text-white"
              : "border-red-400/50 bg-red-50/50 text-zinc-900"
            : isDark
            ? "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:text-white"
            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
        }`}
      >
        <span className={`truncate ${!selected ? (isDark ? "text-zinc-500" : "text-zinc-400") : ""}`}>
          {label}
        </span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute top-full mt-1.5 left-0 z-50 rounded-2xl border shadow-xl overflow-hidden ${
            isDark
              ? "bg-zinc-900 border-zinc-800 shadow-black/60"
              : "bg-white border-zinc-200 shadow-zinc-200/80"
          }`}
          style={{ minWidth: "100%", maxHeight: 260, overflowY: "auto" }}
        >
          {/* All / placeholder option */}
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2 cursor-pointer border-none ${
              !value
                ? isDark
                  ? "bg-zinc-800 text-white font-semibold"
                  : "bg-zinc-100 text-zinc-900 font-semibold"
                : isDark
                ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            {!value ? (
              <svg className="w-3 h-3 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            ) : (
              <span className="w-3 shrink-0" />
            )}
            <span>{placeholder}</span>
          </button>

          {/* Divider */}
          <div className={`h-px mx-3 ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`} />

          {/* Options */}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2 cursor-pointer border-none ${
                value === opt.value
                  ? isDark
                    ? "bg-zinc-800 text-white font-semibold"
                    : "bg-zinc-50 text-zinc-900 font-semibold"
                  : isDark
                  ? "text-zinc-400 hover:bg-zinc-800/70 hover:text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              {value === opt.value ? (
                <svg className="w-3 h-3 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              ) : (
                <span className="w-3 shrink-0" />
              )}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
