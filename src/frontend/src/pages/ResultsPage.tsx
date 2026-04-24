import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Crown, Swords, Trophy } from "lucide-react";
import { useMatch, useMatchResults } from "../hooks/useBackend";
import type { Result } from "../types";

const MEDAL_CONFIG: Record<
  number,
  { label: string; varName: string; glow: string }
> = {
  1: {
    label: "1ST",
    varName: "--medal-gold",
    glow: "0 0 16px oklch(0.78 0.19 75 / 0.35)",
  },
  2: {
    label: "2ND",
    varName: "--medal-silver",
    glow: "0 0 14px oklch(0.75 0.02 250 / 0.3)",
  },
  3: {
    label: "3RD",
    varName: "--medal-bronze",
    glow: "0 0 14px oklch(0.70 0.18 55 / 0.3)",
  },
};

function RankBadge({ rank }: { rank: number }) {
  const medal = MEDAL_CONFIG[rank];
  if (medal) {
    const color = `var(${medal.varName})`;
    return (
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-sm font-mono font-bold text-xs"
        style={{
          color,
          backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
          border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
          boxShadow: medal.glow,
        }}
      >
        {medal.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-sm font-mono text-sm text-muted-foreground bg-muted/50 border border-border">
      {rank}
    </span>
  );
}

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <Crown
        className="w-4 h-4 shrink-0"
        style={{ color: "var(--medal-gold)" }}
      />
    );
  if (rank === 2)
    return (
      <Trophy
        className="w-4 h-4 shrink-0"
        style={{ color: "var(--medal-silver)" }}
      />
    );
  if (rank === 3)
    return (
      <Trophy
        className="w-4 h-4 shrink-0"
        style={{ color: "var(--medal-bronze)" }}
      />
    );
  return null;
}

function ResultRow({ result, index }: { result: Result; index: number }) {
  const medal = MEDAL_CONFIG[result.rank];
  const isTop3 = result.rank <= 3;
  const medalColor = medal ? `var(${medal.varName})` : undefined;

  return (
    <tr
      data-ocid={`results.item.${index + 1}`}
      className={`border-b border-border transition-colors duration-150 ${
        isTop3 ? "hover:brightness-125" : "hover:bg-muted/30"
      }`}
      style={
        isTop3 && medal
          ? {
              backgroundColor: `color-mix(in oklch, var(${medal.varName}) 8%, transparent)`,
              boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(${medal.varName}) 25%, transparent)`,
            }
          : undefined
      }
    >
      <td className="px-4 py-3 text-center">
        <RankBadge rank={result.rank} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <MedalIcon rank={result.rank} />
          <span
            className="font-display font-semibold truncate"
            style={{ color: isTop3 ? medalColor : undefined }}
          >
            {result.username}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 font-mono text-sm text-muted-foreground hidden sm:table-cell">
        {result.userId || "—"}
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-1">
          <Swords className="w-3.5 h-3.5 text-primary/70 shrink-0" />
          <span className="font-mono font-semibold text-foreground">
            {result.kills}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        {result.prize > 0 ? (
          <span className="font-mono font-bold text-primary">
            ₹{result.prize.toLocaleString("en-IN")}
          </span>
        ) : (
          <span className="font-mono text-muted-foreground text-sm">—</span>
        )}
      </td>
    </tr>
  );
}

function TableSkeleton() {
  return (
    <div data-ocid="results.loading_state" className="space-y-px">
      {["s0", "s1", "s2", "s3", "s4", "s5"].map((sk) => (
        <div
          key={sk}
          className="flex items-center gap-4 px-4 py-3 border-b border-border"
        >
          <Skeleton className="w-9 h-9 rounded-sm shrink-0" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24 hidden sm:block ml-auto" />
          <Skeleton className="h-4 w-10 ml-auto" />
          <Skeleton className="h-4 w-14 ml-auto" />
        </div>
      ))}
    </div>
  );
}

export default function ResultsPage() {
  const { matchId } = useParams({ from: "/results/$matchId" });
  const navigate = useNavigate();

  const { data: match, isLoading: matchLoading } = useMatch(matchId);
  const { data: results = [], isLoading: resultsLoading } =
    useMatchResults(matchId);

  const isLoading = matchLoading || resultsLoading;
  const sorted = [...results].sort((a, b) => a.rank - b.rank);

  const top1 = sorted.find((r) => r.rank === 1);
  const top2 = sorted.find((r) => r.rank === 2);
  const top3 = sorted.find((r) => r.rank === 3);
  const podiumSlots = [top2, top1, top3];

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="results.back_button"
          onClick={() =>
            navigate({ to: "/match/$id", params: { id: matchId } })
          }
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Match</span>
        </Button>

        <div className="h-4 w-px bg-border" />

        {matchLoading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <h1
            data-ocid="results.match_heading"
            className="font-display font-bold text-foreground truncate"
          >
            {match?.name ?? "Match Results"}
          </h1>
        )}

        <div className="ml-auto">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Podium — top 3 highlights (only when loaded and data exists) */}
        {!isLoading && sorted.length >= 3 && (
          <div
            data-ocid="results.podium_section"
            className="grid grid-cols-3 gap-2 sm:gap-4"
          >
            {(
              [
                { slot: podiumSlots[0], height: "h-20", pos: 2 },
                { slot: podiumSlots[1], height: "h-28", pos: 1 },
                { slot: podiumSlots[2], height: "h-16", pos: 3 },
              ] as Array<{
                slot: Result | undefined;
                height: string;
                pos: number;
              }>
            ).map(({ slot, height, pos }) => {
              const cfg = MEDAL_CONFIG[pos];
              const medalColor = `var(${cfg.varName})`;
              if (!slot) return <div key={pos} />;
              return (
                <div
                  key={pos}
                  className={`flex flex-col items-center justify-end gap-2 pb-3 rounded-sm border ${height} relative overflow-hidden`}
                  style={{
                    borderColor: `color-mix(in oklch, ${medalColor} 40%, transparent)`,
                    backgroundColor: `color-mix(in oklch, ${medalColor} 8%, transparent)`,
                    boxShadow: cfg.glow,
                  }}
                >
                  <span
                    className="font-mono text-xs font-bold text-label"
                    style={{ color: medalColor }}
                  >
                    {cfg.label}
                  </span>
                  <span
                    className="font-display font-bold text-sm text-center truncate w-full px-2"
                    style={{ color: medalColor }}
                  >
                    {slot.username}
                  </span>
                  {slot.prize > 0 && (
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{
                        color: `color-mix(in oklch, ${medalColor} 80%, transparent)`,
                      }}
                    >
                      ₹{slot.prize.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-label text-muted-foreground">
              Leaderboard
            </span>
            {!isLoading && sorted.length > 0 && (
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {sorted.length} player{sorted.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : sorted.length === 0 ? (
            <div
              data-ocid="results.empty_state"
              className="flex flex-col items-center justify-center py-16 gap-3 text-center px-4"
            >
              <Trophy className="w-10 h-10 text-muted/60" />
              <p className="font-display font-semibold text-muted-foreground text-lg">
                No results yet
              </p>
              <p className="text-sm text-muted-foreground/70">
                Results will be published after the match concludes.
              </p>
              <Button
                variant="outline"
                size="sm"
                data-ocid="results.back_to_match_button"
                onClick={() =>
                  navigate({ to: "/match/$id", params: { id: matchId } })
                }
                className="mt-2 gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Match
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-ocid="results.table">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-2 text-center text-label text-muted-foreground w-16">
                      Rank
                    </th>
                    <th className="px-4 py-2 text-left text-label text-muted-foreground">
                      Player
                    </th>
                    <th className="px-4 py-2 text-left text-label text-muted-foreground hidden sm:table-cell">
                      FF UID
                    </th>
                    <th className="px-4 py-2 text-center text-label text-muted-foreground w-20">
                      Kills
                    </th>
                    <th className="px-4 py-2 text-right text-label text-muted-foreground w-24">
                      Prize
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((result, index) => (
                    <ResultRow key={result.id} result={result} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
