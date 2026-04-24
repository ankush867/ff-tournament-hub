import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Swords, U as User, L as Link, B as Button } from "./index-DJ3jSp6d.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { M as MatchCard } from "./MatchCard-DC5tyUoh.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { a as useMyProfile, u as useMatches, b as useMyPayments } from "./useBackend-CUConDby.js";
import { W as Wallet } from "./wallet-DDejRzgz.js";
import { E as EyeOff, a as Eye } from "./eye-D00-3ofo.js";
import { C as Clock } from "./clock-Cp8UjU70.js";
import { C as CreditCard } from "./credit-card-D97yhFK-.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { C as ChevronRight } from "./chevron-right-UM97vO6F.js";
import "./calendar-Cat1lWzg.js";
import "./users-DFO1ACl1.js";
import "./badge-BuGF_AhT.js";
import "./backend-DPSn0mZX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function StatCard({
  label,
  value,
  icon,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border px-4 py-4 flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest ${highlight ? "text-primary" : "text-muted-foreground"}`,
        children: [
          icon,
          label
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `font-display font-bold text-lg truncate ${highlight ? "text-primary" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function PaymentRow({
  payment,
  index,
  onView
}) {
  const statusApproved = payment.status === "approved";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-4 py-3 gap-3 hover:bg-muted/20 transition-colors",
      "data-ocid": `dashboard.payment.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: payment.matchName ?? `Match #${payment.matchId.slice(0, 8)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
            "₹",
            payment.amount,
            statusApproved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-primary", children: "· Room credentials unlocked" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              status: payment.status
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onView(payment.matchId),
              className: "text-muted-foreground hover:text-primary transition-colors",
              "aria-label": "View match",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function DashboardPage() {
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = reactExports.useState(false);
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: matches, isLoading: matchesLoading } = useMatches();
  const { data: payments, isLoading: paymentsLoading } = useMyPayments();
  const openMatches = (matches ?? []).filter((m) => m.status === "open").slice(0, 3);
  const myPayments = (payments ?? []).slice(0, 8);
  const approvedCount = (payments ?? []).filter(
    (p) => p.status === "approved"
  ).length;
  const pendingCount = (payments ?? []).filter(
    (p) => p.status === "pending"
  ).length;
  const walletBalance = (profile == null ? void 0 : profile.walletBalance) ?? 0;
  const walletDisplay = showWallet ? `₹${Number(walletBalance)}` : "₹•••••";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 border-l-2 border-primary pl-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-0.5", children: "Welcome back" }),
      profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl uppercase tracking-wide text-foreground", children: (profile == null ? void 0 : profile.username) ?? "Player" }),
      (profile == null ? void 0 : profile.ffUid) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-1", children: [
        "FF UID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: profile.ffUid })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8", children: profileLoading ? ["s0", "s1", "s2", "s3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" }, sk)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-primary/30 px-4 py-4 flex flex-col gap-2 glow-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-mono uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5" }),
            "Wallet"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowWallet((v) => !v),
              className: "text-muted-foreground hover:text-primary transition-colors",
              "aria-label": showWallet ? "Hide balance" : "Show balance",
              "data-ocid": "dashboard.wallet_toggle",
              children: showWallet ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary truncate", children: walletDisplay })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Matches Won",
          value: approvedCount,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending",
          value: pendingCount,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "FF UID",
          value: (profile == null ? void 0 : profile.ffUid) ?? "—",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-4 w-4 text-primary" }),
            "Open Matches"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/matches",
              className: "font-mono text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "dashboard.view_matches_link",
              children: [
                "View All ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
              ]
            }
          )
        ] }),
        matchesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: ["m0", "m1"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44" }, sk)) }) : openMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-dashed border-border py-12 text-center flex flex-col items-center gap-3",
            "data-ocid": "dashboard.matches_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-8 w-8 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "No open matches right now" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => navigate({ to: "/matches" }),
                  className: "font-mono text-xs uppercase tracking-widest h-8 mt-1",
                  "data-ocid": "dashboard.browse_matches_button",
                  children: "Browse All Matches"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            "data-ocid": "dashboard.matches_list",
            children: openMatches.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match, index: i + 1 }, match.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/matches" }),
            variant: "outline",
            className: "w-full font-mono text-xs uppercase tracking-widest h-10 gap-2 border-dashed",
            "data-ocid": "dashboard.all_matches_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-3.5 w-3.5" }),
              "Browse All Tournaments"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-primary" }),
            "My Matches"
          ] }),
          myPayments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground uppercase tracking-widest", children: [
            myPayments.length,
            " entries"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border flex flex-col overflow-hidden", children: paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex flex-col gap-3", children: ["p0", "p1", "p2"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, sk)) }) : myPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-12 px-4 text-center flex flex-col items-center gap-3",
            "data-ocid": "dashboard.payments_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-8 w-8 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "No matches joined yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => navigate({ to: "/matches" }),
                  className: "font-mono text-xs uppercase tracking-widest h-8",
                  "data-ocid": "dashboard.join_first_button",
                  children: "Join a Match"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "divide-y divide-border",
            "data-ocid": "dashboard.payments_list",
            children: myPayments.map((payment, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaymentRow,
              {
                payment: {
                  id: payment.id,
                  matchId: payment.matchId,
                  status: payment.status,
                  amount: payment.amount ?? 0
                },
                index: i + 1,
                onView: (matchId) => navigate({ to: "/match/$id", params: { id: matchId } })
              },
              payment.id
            ))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground font-mono flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }),
          "Room ID & password are shown after admin approves your payment. Click the eye icon on any match to view."
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
