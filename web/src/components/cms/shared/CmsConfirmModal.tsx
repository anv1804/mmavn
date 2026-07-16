import { useTheme } from "../../../context/ThemeContext";

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CmsConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  onConfirm,
  onCancel,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div
        className={`w-full max-w-sm rounded-3xl border p-6 relative z-10 shadow-2xl transition-all scale-100 ${
          isDark
            ? "bg-zinc-950 border-zinc-800 text-white shadow-black/80"
            : "bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50"
        }`}
      >
        <h3 className="text-base font-bold uppercase tracking-tight mb-2">
          {title}
        </h3>
        <p className={`text-xs mb-6 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
          {message}
        </p>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              isDark
                ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-800"
            }`}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-red-600/10"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
