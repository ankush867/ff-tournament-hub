import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Shield, Swords, Trophy, Zap } from "lucide-react";
import { PageLoader } from "../components/LoadingSpinner";
import { MatchCard } from "../components/MatchCard";
import { useMatches } from "../hooks/useBackend";

const FEATURES = [
  {
    icon: <Swords className="h-5 w-5 text-primary" />,
    title: "Weekly Tournaments",
    desc: "Solo & squad matches every week with guaranteed prize pools.",
  },
  {
    icon: <Trophy className="h-5 w-5 text-accent" />,
    title: "Real Cash Prizes",
    desc: "Win and withdraw directly to your UPI. No points, no coins.",
  },
  {
    icon: <Shield className="h-5 w-5 text-chart-4" />,
    title: "Fair Play Guaranteed",
    desc: "Admin-reviewed registrations and results. Zero tolerance for cheating.",
  },
];

export default function HomePage() {
  const { data: matches, isLoading } = useMatches();
  const openMatches = (matches ?? [])
    .filter((m) => m.status === "open")
    .slice(0, 3);

  return (
    <div className="flex flex-col" data-ocid="home.page">
      {/* Hero */}
      <section className="relative cyber-grid flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 border-b border-border overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          <div className="flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-1">
            <Zap className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Free Fire Tournament Platform
            </span>
          </div>
          <h1 className="text-hero text-foreground">
            COMPETE. <span className="text-primary">WIN.</span> REPEAT.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
            Join daily Free Fire tournaments, pay entry fee via UPI, and claim
            real cash prizes. Register in seconds, play your best.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="font-mono uppercase tracking-widest"
              data-ocid="home.cta_primary"
            >
              <Link to="/matches">View Matches</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-mono uppercase tracking-widest"
              data-ocid="home.cta_secondary"
            >
              <Link to="/register">Register Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live matches */}
      <section
        className="bg-background px-4 py-12"
        data-ocid="home.matches_section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-label text-muted-foreground mb-1">Now Open</p>
              <h2 className="font-display font-bold text-2xl text-foreground uppercase tracking-wide">
                Upcoming Matches
              </h2>
            </div>
            <Link
              to="/matches"
              className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
              data-ocid="home.view_all_matches_link"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <PageLoader label="Loading matches..." />
          ) : openMatches.length === 0 ? (
            <div
              className="border border-dashed border-border py-12 text-center"
              data-ocid="home.matches_empty_state"
            >
              <Trophy className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                No open matches right now. Check back soon!
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="home.matches_list"
            >
              {openMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-muted/20 border-t border-border px-4 py-12"
        data-ocid="home.features_section"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-label text-muted-foreground mb-6 text-center">
            Why FF Tournament Hub
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {f.icon}
                  <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground">
                    {f.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
