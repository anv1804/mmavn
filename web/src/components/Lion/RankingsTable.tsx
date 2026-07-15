import type { Division } from "../../interfaces/ranking";

// Rank 1-3: medal colors (handled separately)
const MEDAL_STYLES: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.45)", text: "#fbbf24" },
  2: { bg: "rgba(161,161,170,0.10)", border: "rgba(161,161,170,0.35)", text: "#e4e4e7" },
  3: { bg: "rgba(180,83,9,0.12)",   border: "rgba(180,83,9,0.35)",   text: "#f59e0b" },
};

// Tier system for rank 4+
function getRankTier(rank: number): {
  badge: { bg: string; border: string; text: string };
  row:   { accent: string; label: string };
} {
  if (rank <= 5)  return {
    badge: { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)", text: "#fb923c" },
    row:   { accent: "rgba(249,115,22,0.04)", label: "Thách đấu chính" },
  };
  if (rank <= 10) return {
    badge: { bg: "rgba(59,130,246,0.10)",  border: "rgba(59,130,246,0.30)", text: "#60a5fa" },
    row:   { accent: "rgba(59,130,246,0.03)", label: "Bảng xếp hạng" },
  };
  return {
    badge: { bg: "rgba(63,63,70,0.30)",    border: "rgba(63,63,70,0.50)",   text: "#71717a" },
    row:   { accent: "transparent", label: "" },
  };
}

interface Props {
  rankings: Division;
  skipFirst?: number;
}

export default function RankingsTable({ rankings, skipFirst = 0 }: Props) {
  if (!rankings) return null;

  const visibleRankings = rankings.rankings?.slice(skipFirst) ?? [];
  const remaining = rankings.rankings?.length ?? 0;

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900/30">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-800/60 bg-zinc-900/60 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-zinc-100">
            {skipFirst > 0 ? `#${skipFirst + 1} – #${remaining} · ${rankings.weightClass}` : `Hạng cân ${rankings.weightClass}`}
          </h3>
          {skipFirst > 0 ? (
            <p className="text-[11px] text-zinc-600 mt-0.5 font-mono">Các võ sĩ thách đấu tiếp theo</p>
          ) : rankings.champion ? (
            <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">
              Đương kim VĐ:{" "}
              <span className="text-red-400 font-bold">{rankings.champion.name}</span>
              {" "}· {rankings.champion.club}
            </p>
          ) : (
            <p className="text-[11px] text-zinc-600 mt-0.5 font-mono">
              {rankings.description || "Hạng cân hiện không hoạt động"}
            </p>
          )}
        </div>
        <span className="text-[10px] font-mono text-zinc-600 border border-zinc-800 rounded-lg px-2 py-1">
          {skipFirst > 0 ? `#${skipFirst + 1}–#${remaining}` : `TOP ${remaining}`}
        </span>
      </div>

      {visibleRankings.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/40 bg-zinc-950/30">
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest w-20 text-center">Hạng</th>
              <th className="px-4 py-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Võ Sĩ</th>
              <th className="px-4 py-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:table-cell">Câu Lạc Bộ</th>
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest text-center">Thành Tích</th>
            </tr>
          </thead>
          <tbody>
            {visibleRankings.map((fighter) => {
              const medal = MEDAL_STYLES[fighter.rank];
              const tier = fighter.rank > 3 ? getRankTier(fighter.rank) : null;
              const badgeStyle = medal ?? tier?.badge;
              const [wins, losses] = fighter.record.split("-").map(Number);

              return (
                <tr
                  key={fighter.rank}
                  className="border-b border-zinc-800/20 hover:bg-zinc-800/20 transition-colors duration-150 group"
                  style={{ background: tier ? tier.row.accent : "transparent" }}
                >
                  {/* Rank badge */}
                  <td className="px-6 py-3.5 text-center">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black border"
                      style={badgeStyle
                        ? { background: badgeStyle.bg, borderColor: badgeStyle.border, color: badgeStyle.text }
                        : { background: "transparent", borderColor: "transparent", color: "#52525b" }}
                    >
                      #{fighter.rank}
                    </span>
                  </td>

                  {/* Name + optional tier pill */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-200 group-hover:text-white transition-colors">
                        {fighter.name}
                      </span>
                      {tier && tier.row.label && (
                        <span
                          className="text-[7px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border"
                          style={{
                            color: tier.badge.text,
                            borderColor: tier.badge.border,
                            background: tier.badge.bg,
                            opacity: 0.75,
                          }}
                        >
                          {tier.row.label}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Club */}
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="text-xs text-zinc-500 font-mono">{fighter.club}</span>
                  </td>

                  {/* Record */}
                  <td className="px-6 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold">
                      <span className="text-emerald-400">{wins}W</span>
                      <span className="text-zinc-700">-</span>
                      <span className="text-red-400">{losses}L</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="py-14 text-center">
          <p className="text-zinc-600 text-xs font-mono">Không có dữ liệu cho hạng cân này.</p>
        </div>
      )}
    </div>
  );
}
