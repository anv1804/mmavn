interface Props {
  title: string;
  subtitle?: string;
  addLabel?: string;
  onAdd?: () => void;
}

export default function CmsPageHeader({ title, subtitle, addLabel, onAdd }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
      {onAdd && addLabel && (
        <button
          onClick={onAdd}
          className="px-5 py-2.5 bg-[#dc2626] hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none transition-all shadow-md shadow-red-600/20 cursor-pointer"
        >
          {addLabel}
        </button>
      )}
    </div>
  );
}
