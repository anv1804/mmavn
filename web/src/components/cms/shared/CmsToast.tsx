

interface Props {
  msg: { text: string; type: string };
}

export default function CmsToast({ msg }: Props) {
  if (!msg.text) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all animate-in ${
        msg.type === "success"
          ? "bg-emerald-500 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <span>{msg.type === "success" ? "✓" : "⚠"}</span>
      <span>{msg.text}</span>
    </div>
  );
}
