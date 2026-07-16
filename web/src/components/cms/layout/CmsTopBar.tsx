import { useTheme } from "../../../context/ThemeContext";
import { useCms } from "../../../context/CmsContext";

const ROUTE_LABELS: Record<string, string> = {
  "": "dashboard",
  fighters: "fighters",
  clubs: "clubs",
  rankings: "rankings",
  events: "events",
};

export default function CmsTopBar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { loading } = useCms();

  const segment = location.pathname.replace("/cms", "").replace("/", "");
  const label = ROUTE_LABELS[segment] ?? segment;

  return (
    <header
      className={`h-14 border-b flex items-center justify-between px-6 z-10 shrink-0 ${
        isDark ? "bg-zinc-950/40 border-zinc-900/80" : "bg-white border-zinc-200"
      }`}
    >
      <div className={`flex items-center gap-2 text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
        <span>ANV PORTAL</span>
        <span>/</span>
        <span className="text-red-500 font-bold uppercase">{label}</span>
      </div>
      <span
        className={`text-[9px] border rounded-md px-2 py-0.5 ${
          isDark ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-100 text-zinc-500"
        }`}
      >
        DB: {loading ? "CONNECTING..." : "ONLINE"}
      </span>
    </header>
  );
}
