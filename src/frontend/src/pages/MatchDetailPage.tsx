import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCheck,
  Clock,
  Copy,
  Gamepad2,
  Lock,
  Map as MapPin,
  ShieldAlert,
  Trophy,
  Unlock,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";
import { useMatch, useMatchResults, useMyPayments } from "../hooks/useBackend";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2 bg-background border border-primary/30 px-3 py-2">
        <span className="font-mono text-sm font-bold text-primary flex-1 tracking-wider">
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <CheckCheck className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function MatchDetailPage() {
  const { id } = useParams({ from: "/match/$id" });
  const { data: match, isLoading, error, refetch } = useMatch(id);
  const { data: payments } = useMyPayments();
  const { data: results } = useMatchResults(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4"
        data-ocid="match_detail.loading_state"
      >
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-56" />
        <Skeleton className="h-20" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <ErrorMessage
        title="Match not found"
        message="This match doesn't exist or has been removed."
        onRetry={() => refetch()}
        className="min-h-[60vh]"
      />
    );
  }

  const playersPercent = Math.round(
    (match.playerCount / match.maxPlayers) * 100,
  );

  // Determine user's payment state for this match
  const myPayment = (payments ?? []).find((p) => p.matchId === id);
  const hasApprovedPayment = myPayment?.status === "approved";
  const hasPendingPayment = myPayment?.status === "pending";
  const hasRejectedPayment = myPayment?.status === "rejected";
  const hasNoPayment = !myPayment;

  const handleJoin = () => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    } else {
      navigate({ to: "/payment/$matchId", params: { matchId: match.id } });
    }
  };

  const sortedResults = [...(results ?? [])]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-ocid="match_detail.page">
      {/* Back */}
      <Link
        to="/matches"
        className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors"
        data-ocid="match_detail.back_link"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Matches
      </Link>

      {/* Match card */}
      <div className="bg-card border border-border p-6 mb-4">
        <div className="flex items-start justify-between gap-4 mb-5">
          <h1 className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-foreground">
            {match.name}
          </h1>
          <StatusBadge status={match.status} className="shrink-0 mt-1" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Entry Fee",
              value: match.entryFee === 0 ? "FREE" : `₹${match.entryFee}`,
              icon: <Zap className="h-3.5 w-3.5" />,
            },
            {
              label: "Prize Pool",
              value: `₹${match.prizePool.toLocaleString()}`,
              icon: <Trophy className="h-3.5 w-3.5 text-primary" />,
              accent: true,
            },
            {
              label: "Players",
              value: `${match.playerCount}/${match.maxPlayers}`,
              icon: <Users className="h-3.5 w-3.5" />,
            },
            {
              label: "Mode",
              value: match.gameMode,
              icon: <Gamepad2 className="h-3.5 w-3.5" />,
            },
            {
              label: "Map",
              value: match.map,
              icon: <MapPin className="h-3.5 w-3.5" />,
            },
            {
              label: "Date & Time",
              value: formatDate(match.scheduledAt),
              icon: <Calendar className="h-3.5 w-3.5" />,
            },
          ].map(({ label, value, icon, accent }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {icon}
                {label}
              </span>
              <span
                className={`font-semibold text-sm truncate ${accent ? "text-primary" : "text-foreground"}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Player fill progress */}
        <div className="mb-5">
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" aria-hidden="true" />
              Players filled
            </span>
            <span>{playersPercent}%</span>
          </div>
          <div className="h-1 bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${playersPercent}%` }}
              role="progressbar"
              tabIndex={0}
              aria-valuenow={match.playerCount}
              aria-valuemin={0}
              aria-valuemax={match.maxPlayers}
            />
          </div>
        </div>

        {/* Room credentials (approved users only) */}
        {hasApprovedPayment && match.roomId && (
          <div
            className="border border-primary/30 bg-primary/5 p-4 mb-5"
            data-ocid="match_detail.credentials_panel"
          >
            <div className="flex items-center gap-2 mb-3">
              <Unlock className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                Room Credentials Unlocked
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CopyField label="Room ID" value={match.roomId} />
              {match.roomPassword && (
                <CopyField label="Room Password" value={match.roomPassword} />
              )}
            </div>
          </div>
        )}

        {/* CTA section */}
        <div className="flex flex-col gap-3">
          {/* Approved */}
          {hasApprovedPayment && (
            <div
              className="flex items-center gap-2.5 border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary font-mono"
              data-ocid="match_detail.joined_status"
            >
              <UserCheck className="h-4 w-4 shrink-0" />
              You're registered for this match. Good luck!
            </div>
          )}

          {/* Pending */}
          {hasPendingPayment && (
            <div
              className="flex items-center gap-2.5 border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-mono text-accent"
              data-ocid="match_detail.pending_status"
            >
              <Clock className="h-4 w-4 shrink-0" />
              Payment Under Review — Room credentials will unlock once approved
            </div>
          )}

          {/* Rejected */}
          {hasRejectedPayment && (
            <div
              className="flex items-center gap-2.5 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive font-mono"
              data-ocid="match_detail.rejected_status"
            >
              <ShieldAlert className="h-4 w-4 shrink-0" />
              Your payment was rejected. Please re-submit or contact support.
            </div>
          )}

          {/* No payment — show join button */}
          {(hasNoPayment || hasRejectedPayment) && match.status === "open" && (
            <Button
              onClick={handleJoin}
              className="w-full font-mono uppercase tracking-widest h-11 gap-2"
              data-ocid="match_detail.join_button"
            >
              <Zap className="h-4 w-4" aria-hidden="true" />
              {isAuthenticated ? "Join & Pay Entry Fee" : "Sign in to Join"}
            </Button>
          )}

          {/* Match closed / completed */}
          {match.status !== "open" && hasNoPayment && (
            <div
              className="flex items-center gap-2.5 border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground font-mono"
              data-ocid="match_detail.closed_status"
            >
              <Lock className="h-4 w-4 shrink-0" />
              {match.status === "completed"
                ? "This match is completed."
                : "Registrations are closed."}
            </div>
          )}

          {/* View Results link */}
          {match.status === "completed" && (
            <Button
              asChild
              variant="outline"
              className="w-full font-mono uppercase tracking-widest h-10"
              data-ocid="match_detail.results_link"
            >
              <Link to="/results/$matchId" params={{ matchId: match.id }}>
                <Trophy className="h-4 w-4 mr-2" aria-hidden="true" />
                View Results
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Top players / results */}
      {sortedResults.length > 0 && (
        <div
          className="bg-card border border-border p-5"
          data-ocid="match_detail.results_panel"
        >
          <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Leaderboard
          </h2>
          <div className="divide-y divide-border">
            {sortedResults.map((result, i) => (
              <div
                key={result.id}
                className="flex items-center gap-3 py-2.5"
                data-ocid={`match_detail.result.item.${i + 1}`}
              >
                <span
                  className={`font-mono text-xs font-bold w-6 text-center ${i === 0 ? "text-accent" : i === 1 ? "text-muted-foreground" : "text-muted-foreground/60"}`}
                >
                  #{result.rank}
                </span>
                <span className="flex-1 font-semibold text-sm text-foreground truncate">
                  {result.username}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {result.kills}K
                </span>
                {result.prize > 0 && (
                  <span className="font-mono text-xs text-primary font-bold">
                    ₹{result.prize}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info note */}
      {!hasApprovedPayment && match.status === "open" && (
        <div className="mt-4 border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground font-mono flex items-start gap-2">
          <Lock className="h-3.5 w-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
          Room ID and password are revealed after admin approves your payment.
          Need help? Use the WhatsApp support button.
        </div>
      )}
    </div>
  );
}
