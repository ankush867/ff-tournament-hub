import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  Swords,
  Trophy,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { MatchCard } from "../components/MatchCard";
import { StatusBadge } from "../components/StatusBadge";
import { useMatches, useMyPayments, useMyProfile } from "../hooks/useBackend";

function StatCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="bg-card border border-border px-4 py-4 flex flex-col gap-2">
      <div
        className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest ${highlight ? "text-primary" : "text-muted-foreground"}`}
      >
        {icon}
        {label}
      </div>
      <span
        className={`font-display font-bold text-lg truncate ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function PaymentRow({
  payment,
  index,
  onView,
}: {
  payment: {
    id: string;
    matchId: string;
    status: string;
    amount: number;
    matchName?: string;
  };
  index: number;
  onView: (matchId: string) => void;
}) {
  const statusApproved = payment.status === "approved";
  return (
    <div
      className="flex items-center justify-between px-4 py-3 gap-3 hover:bg-muted/20 transition-colors"
      data-ocid={`dashboard.payment.item.${index}`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground truncate">
          {payment.matchName ?? `Match #${payment.matchId.slice(0, 8)}`}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          ₹{payment.amount}
          {statusApproved && (
            <span className="ml-2 text-primary">
              · Room credentials unlocked
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge
          status={payment.status as "pending" | "approved" | "rejected"}
        />
        <button
          type="button"
          onClick={() => onView(payment.matchId)}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="View match"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = useState(false);
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: matches, isLoading: matchesLoading } = useMatches();
  const { data: payments, isLoading: paymentsLoading } = useMyPayments();

  const openMatches = (matches ?? [])
    .filter((m) => m.status === "open")
    .slice(0, 3);
  const myPayments = (payments ?? []).slice(0, 8);
  const approvedCount = (payments ?? []).filter(
    (p) => p.status === "approved",
  ).length;
  const pendingCount = (payments ?? []).filter(
    (p) => p.status === "pending",
  ).length;

  const walletBalance = profile?.walletBalance ?? 0;
  const walletDisplay = showWallet ? `₹${Number(walletBalance)}` : "₹•••••";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-ocid="dashboard.page">
      {/* Welcome banner */}
      <div className="mb-8 border-l-2 border-primary pl-4">
        <p className="text-label text-muted-foreground mb-0.5">Welcome back</p>
        {profileLoading ? (
          <Skeleton className="h-8 w-40 mt-1" />
        ) : (
          <h1 className="font-display font-bold text-2xl uppercase tracking-wide text-foreground">
            {profile?.username ?? "Player"}
          </h1>
        )}
        {profile?.ffUid && (
          <p className="font-mono text-xs text-muted-foreground mt-1">
            FF UID: <span className="text-foreground">{profile.ffUid}</span>
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {profileLoading ? (
          ["s0", "s1", "s2", "s3"].map((sk) => (
            <Skeleton key={sk} className="h-20" />
          ))
        ) : (
          <>
            <div className="bg-card border border-primary/30 px-4 py-4 flex flex-col gap-2 glow-primary">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-primary">
                <span className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5" />
                  Wallet
                </span>
                <button
                  type="button"
                  onClick={() => setShowWallet((v) => !v)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={showWallet ? "Hide balance" : "Show balance"}
                  data-ocid="dashboard.wallet_toggle"
                >
                  {showWallet ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <span className="font-display font-bold text-lg text-primary truncate">
                {walletDisplay}
              </span>
            </div>

            <StatCard
              label="Matches Won"
              value={approvedCount}
              icon={<Swords className="h-3.5 w-3.5" />}
            />
            <StatCard
              label="Pending"
              value={pendingCount}
              icon={<Clock className="h-3.5 w-3.5" />}
            />
            <StatCard
              label="FF UID"
              value={profile?.ffUid ?? "—"}
              icon={<User className="h-3.5 w-3.5" />}
            />
          </>
        )}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Open Matches */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground flex items-center gap-2">
              <Swords className="h-4 w-4 text-primary" />
              Open Matches
            </h2>
            <Link
              to="/matches"
              className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="dashboard.view_matches_link"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {matchesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["m0", "m1"].map((sk) => (
                <Skeleton key={sk} className="h-44" />
              ))}
            </div>
          ) : openMatches.length === 0 ? (
            <div
              className="border border-dashed border-border py-12 text-center flex flex-col items-center gap-3"
              data-ocid="dashboard.matches_empty_state"
            >
              <Swords className="h-8 w-8 text-muted-foreground/40" />
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                No open matches right now
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: "/matches" })}
                className="font-mono text-xs uppercase tracking-widest h-8 mt-1"
                data-ocid="dashboard.browse_matches_button"
              >
                Browse All Matches
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-ocid="dashboard.matches_list"
            >
              {openMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i + 1} />
              ))}
            </div>
          )}

          {/* Browse CTA */}
          <Button
            onClick={() => navigate({ to: "/matches" })}
            variant="outline"
            className="w-full font-mono text-xs uppercase tracking-widest h-10 gap-2 border-dashed"
            data-ocid="dashboard.all_matches_button"
          >
            <Swords className="h-3.5 w-3.5" />
            Browse All Tournaments
          </Button>
        </div>

        {/* My Joined Matches / Payments */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              My Matches
            </h2>
            {myPayments.length > 0 && (
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                {myPayments.length} entries
              </span>
            )}
          </div>

          <div className="bg-card border border-border flex flex-col overflow-hidden">
            {paymentsLoading ? (
              <div className="p-4 flex flex-col gap-3">
                {["p0", "p1", "p2"].map((sk) => (
                  <Skeleton key={sk} className="h-10" />
                ))}
              </div>
            ) : myPayments.length === 0 ? (
              <div
                className="py-12 px-4 text-center flex flex-col items-center gap-3"
                data-ocid="dashboard.payments_empty_state"
              >
                <Trophy className="h-8 w-8 text-muted-foreground/40" />
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  No matches joined yet
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate({ to: "/matches" })}
                  className="font-mono text-xs uppercase tracking-widest h-8"
                  data-ocid="dashboard.join_first_button"
                >
                  Join a Match
                </Button>
              </div>
            ) : (
              <div
                className="divide-y divide-border"
                data-ocid="dashboard.payments_list"
              >
                {myPayments.map((payment, i) => (
                  <PaymentRow
                    key={payment.id}
                    payment={{
                      id: payment.id,
                      matchId: payment.matchId,
                      status: payment.status,
                      amount: payment.amount ?? 0,
                    }}
                    index={i + 1}
                    onView={(matchId) =>
                      navigate({ to: "/match/$id", params: { id: matchId } })
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Room credentials note */}
          <div className="border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground font-mono flex items-start gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            Room ID &amp; password are shown after admin approves your payment.
            Click the eye icon on any match to view.
          </div>
        </div>
      </div>
    </div>
  );
}
