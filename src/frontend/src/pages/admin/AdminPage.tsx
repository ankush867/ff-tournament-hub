import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  ChevronRight,
  CreditCard,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import {
  useAllMatches,
  useAllPayments,
  useAllUsers,
} from "../../hooks/useBackend";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: string;
  loading?: boolean;
  href: string;
  ocid: string;
}

function StatCard({
  label,
  value,
  icon,
  accent = "text-primary",
  loading,
  href,
  ocid,
}: StatCardProps) {
  return (
    <Link to={href} data-ocid={ocid}>
      <Card className="bg-card border-border hover:border-primary/40 transition-smooth group cursor-pointer">
        <CardContent className="p-6 flex items-start justify-between">
          <div>
            <p className="text-label text-muted-foreground mb-2">{label}</p>
            {loading ? (
              <Skeleton className="h-9 w-20 bg-muted" />
            ) : (
              <p className={`text-4xl font-bold font-display ${accent}`}>
                {value}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`p-3 rounded-sm bg-muted/50 ${accent} group-hover:scale-110 transition-smooth`}
            >
              {icon}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

const adminNav = [
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
    desc: "Manage players, suspend/unsuspend accounts",
  },
  {
    label: "Matches",
    href: "/admin/matches",
    icon: <Trophy className="h-5 w-5" />,
    desc: "Create, edit, and manage tournaments",
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: <CreditCard className="h-5 w-5" />,
    desc: "Approve or reject payment submissions",
  },
  {
    label: "Results",
    href: "/admin/results",
    icon: <BarChart2 className="h-5 w-5" />,
    desc: "Upload match results and leaderboards",
  },
];

export default function AdminPage() {
  const { data: users, isLoading: usersLoading } = useAllUsers();
  const { data: matches, isLoading: matchesLoading } = useAllMatches();
  const { data: payments, isLoading: paymentsLoading } = useAllPayments();

  const totalUsers = users?.length ?? 0;
  const openMatches = matches?.filter((m) => m.status === "open").length ?? 0;
  const pendingPayments =
    payments?.filter((p) => p.status === "pending").length ?? 0;
  const completedMatches =
    matches?.filter((m) => m.status === "completed").length ?? 0;

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-primary/10 border border-primary/30 rounded-sm">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              Free Fire Tournament Management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-10">
        {/* Stats Grid */}
        <section data-ocid="admin.stats.section">
          <p className="text-label text-muted-foreground mb-4">Overview</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users"
              value={totalUsers}
              icon={<Users className="h-5 w-5" />}
              accent="text-primary"
              loading={usersLoading}
              href="/admin/users"
              ocid="admin.stat.users"
            />
            <StatCard
              label="Open Matches"
              value={openMatches}
              icon={<Trophy className="h-5 w-5" />}
              accent="text-primary"
              loading={matchesLoading}
              href="/admin/matches"
              ocid="admin.stat.open-matches"
            />
            <StatCard
              label="Pending Payments"
              value={pendingPayments}
              icon={<CreditCard className="h-5 w-5" />}
              accent="text-accent"
              loading={paymentsLoading}
              href="/admin/payments"
              ocid="admin.stat.pending-payments"
            />
            <StatCard
              label="Completed Matches"
              value={completedMatches}
              icon={<BarChart2 className="h-5 w-5" />}
              accent="text-chart-4"
              loading={matchesLoading}
              href="/admin/results"
              ocid="admin.stat.completed-matches"
            />
          </div>
        </section>

        {/* Quick Nav */}
        <section data-ocid="admin.nav.section">
          <p className="text-label text-muted-foreground mb-4">Manage</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                data-ocid={`admin.nav.${item.label.toLowerCase()}`}
              >
                <Card className="bg-card border-border hover:border-primary/50 hover:bg-card/80 transition-smooth group cursor-pointer">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:glow-primary transition-smooth">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold font-display text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
