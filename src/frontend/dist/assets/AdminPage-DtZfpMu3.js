import { j as jsxRuntimeExports, f as cn, a as Shield, L as Link } from "./index-DJ3jSp6d.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { e as useAllUsers, f as useAllMatches, g as useAllPayments } from "./useBackend-CUConDby.js";
import { U as Users } from "./users-DFO1ACl1.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { C as CreditCard } from "./credit-card-D97yhFK-.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-C1JrFtnA.js";
import { C as ChevronRight } from "./chevron-right-UM97vO6F.js";
import "./backend-DPSn0mZX.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function StatCard({
  label,
  value,
  icon,
  accent = "text-primary",
  loading,
  href,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/40 transition-smooth group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-2", children: label }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-20 bg-muted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-4xl font-bold font-display ${accent}`, children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `p-3 rounded-sm bg-muted/50 ${accent} group-hover:scale-110 transition-smooth`,
          children: icon
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" })
    ] })
  ] }) }) });
}
const adminNav = [
  {
    label: "Users",
    href: "/admin/users",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
    desc: "Manage players, suspend/unsuspend accounts"
  },
  {
    label: "Matches",
    href: "/admin/matches",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }),
    desc: "Create, edit, and manage tournaments"
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }),
    desc: "Approve or reject payment submissions"
  },
  {
    label: "Results",
    href: "/admin/results",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-5 w-5" }),
    desc: "Upload match results and leaderboards"
  }
];
function AdminPage() {
  const { data: users, isLoading: usersLoading } = useAllUsers();
  const { data: matches, isLoading: matchesLoading } = useAllMatches();
  const { data: payments, isLoading: paymentsLoading } = useAllPayments();
  const totalUsers = (users == null ? void 0 : users.length) ?? 0;
  const openMatches = (matches == null ? void 0 : matches.filter((m) => m.status === "open").length) ?? 0;
  const pendingPayments = (payments == null ? void 0 : payments.filter((p) => p.status === "pending").length) ?? 0;
  const completedMatches = (matches == null ? void 0 : matches.filter((m) => m.status === "completed").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 border border-primary/30 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-mono", children: "Free Fire Tournament Management" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.stats.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-4", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Users",
              value: totalUsers,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
              accent: "text-primary",
              loading: usersLoading,
              href: "/admin/users",
              ocid: "admin.stat.users"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Open Matches",
              value: openMatches,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }),
              accent: "text-primary",
              loading: matchesLoading,
              href: "/admin/matches",
              ocid: "admin.stat.open-matches"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Pending Payments",
              value: pendingPayments,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }),
              accent: "text-accent",
              loading: paymentsLoading,
              href: "/admin/payments",
              ocid: "admin.stat.pending-payments"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Completed Matches",
              value: completedMatches,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-5 w-5" }),
              accent: "text-chart-4",
              loading: matchesLoading,
              href: "/admin/results",
              ocid: "admin.stat.completed-matches"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.nav.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-4", children: "Manage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: adminNav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.href,
            "data-ocid": `admin.nav.${item.label.toLowerCase()}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/50 hover:bg-card/80 transition-smooth group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary group-hover:glow-primary transition-smooth", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: item.desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" })
            ] }) })
          },
          item.href
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminPage as default
};
