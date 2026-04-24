import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, Trophy, Users, Zap } from "lucide-react";
import type { Match } from "../types";
import { StatusBadge } from "./StatusBadge";

interface MatchCardProps {
  match: Match;
  index?: number;
  showJoin?: boolean;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatCurrency(amount: number) {
  if (amount === 0) return "FREE";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function MatchCard({
  match,
  index = 1,
  showJoin = true,
}: MatchCardProps) {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate({ to: "/match/$id", params: { id: match.id } });
  };

  const playersPercent = Math.round(
    (match.playerCount / match.maxPlayers) * 100,
  );

  return (
    <div
      className="bg-card border border-border hover:border-primary/40 transition-colors duration-200 flex flex-col group"
      data-ocid={`match.item.${index}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4 pb-3 border-b border-border">
        <div className="min-w-0">
          <h3
            className="font-display font-bold text-foreground text-sm uppercase tracking-wide truncate group-hover:text-primary transition-colors"
            title={match.name}
          >
            {match.name}
          </h3>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {match.gameMode} · {match.map}
          </p>
        </div>
        <StatusBadge status={match.status} className="shrink-0 mt-0.5" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-0 border-b border-border">
        <div className="flex flex-col gap-0.5 p-3 border-r border-border">
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            Entry Fee
          </span>
          <span className="font-display font-bold text-foreground text-base">
            {formatCurrency(match.entryFee)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 p-3">
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex items-center gap-1">
            <Trophy className="h-2.5 w-2.5" aria-hidden="true" />
            Prize Pool
          </span>
          <span className="font-display font-bold text-primary text-base">
            {formatCurrency(match.prizePool)}
          </span>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="flex flex-col gap-2 p-3 mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
            {formatDate(match.scheduledAt)}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Users className="h-3 w-3 shrink-0" aria-hidden="true" />
            {match.playerCount}/{match.maxPlayers}
          </span>
        </div>

        {/* Players progress bar */}
        <div className="h-0.5 bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${playersPercent}%` }}
            role="progressbar"
            tabIndex={0}
            aria-valuenow={match.playerCount}
            aria-valuemin={0}
            aria-valuemax={match.maxPlayers}
            aria-label="Players filled"
          />
        </div>

        {showJoin && (
          <Button
            onClick={handleJoin}
            disabled={match.status !== "open"}
            className="w-full font-mono text-xs uppercase tracking-widest h-9 gap-1.5"
            variant={match.status === "open" ? "default" : "outline"}
            data-ocid={`match.join_button.${index}`}
          >
            {match.status === "open" ? (
              <>
                <Zap className="h-3 w-3" aria-hidden="true" />
                Join Now
              </>
            ) : (
              match.status.toUpperCase()
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
