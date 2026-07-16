import { useTheme } from "../../../context/ThemeContext";

interface Props {
  isOpen: boolean;
  onConfirm: () => void; // "Rời đi"
  onCancel: () => void;  // "Ở lại"
}

export default function CmsUnsavedChangesModal({ isOpen, onConfirm, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div
        className={`w-full max-w-sm rounded-3xl border p-6 relative z-10 shadow-2xl ${
          isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
        }`}
      >
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-red-500">
          ⚠️ Thay đổi chưa lưu
        </h3>
        <p className={`text-xs mb-6 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
          Bạn đã thực hiện các thay đổi nhưng chưa lưu lại. Bạn có chắc chắn muốn thoát? Các chỉnh sửa này sẽ bị mất hoàn toàn.
        </p>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              isDark ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
            }`}
          >
            Ở lại thiết lập
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-red-600/10"
          >
            Rời đi
          </button>
        </div>
      </div>
    </div>
  );
}
