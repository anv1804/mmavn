import type { Division } from "../../interfaces/ranking";

interface Props {
  divisions: Record<string, Division>;
  selectedDiv: string;
  onSelect: (key: string) => void;
}

export default function DivisionTabs({ divisions, selectedDiv, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/50 rounded-2xl border border-zinc-800/60">
      {Object.keys(divisions).map((key) => {
        const div = divisions[key];
        const isSelected = selectedDiv === key;
        const isNu = key.includes("nu");
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer border-none"
            style={{
              background: isSelected
                ? isNu ? "#f59e0b" : "#dc2626"
                : "transparent",
              color: isSelected
                ? isNu ? "#09090b" : "#fff"
                : "#71717a",
              boxShadow: isSelected
                ? isNu ? "0 4px 12px rgba(245,158,11,0.2)" : "0 4px 12px rgba(220,38,38,0.25)"
                : "none",
            }}
          >
            {div.weightClass}
            {isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}
