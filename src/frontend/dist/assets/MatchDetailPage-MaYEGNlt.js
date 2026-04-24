import { c as createLucideIcon, e as useParams, b as useAuth, u as useNavigate, j as jsxRuntimeExports, L as Link, Z as Zap, B as Button, r as reactExports } from "./index-DJ3jSp6d.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { E as ErrorMessage } from "./ErrorMessage-C95OFxXJ.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { c as useMatch, b as useMyPayments, d as useMatchResults } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { U as Users } from "./users-DFO1ACl1.js";
import { G as Gamepad2 } from "./gamepad-2-CmIK8hNm.js";
import { C as Calendar } from "./calendar-Cat1lWzg.js";
import { U as UserCheck } from "./user-check-6GtgapgZ.js";
import { C as Clock } from "./clock-Cp8UjU70.js";
import { L as Lock } from "./lock-PPsfBIG9.js";
import { C as Copy } from "./copy-DeTuURpH.js";
import "./badge-BuGF_AhT.js";
import "./backend-DPSn0mZX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function CopyField({ label, value }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-background border border-primary/30 px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-primary flex-1 tracking-wider", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          className: "text-muted-foreground hover:text-primary transition-colors shrink-0",
          "aria-label": `Copy ${label}`,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function MatchDetailPage() {
  const { id } = useParams({ from: "/match/$id" });
  const { data: match, isLoading, error, refetch } = useMatch(id);
  const { data: payments } = useMyPayments();
  const { data: results } = useMatchResults(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4",
        "data-ocid": "match_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" })
        ]
      }
    );
  }
  if (error || !match) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Match not found",
        message: "This match doesn't exist or has been removed.",
        onRetry: () => refetch(),
        className: "min-h-[60vh]"
      }
    );
  }
  const playersPercent = Math.round(
    match.playerCount / match.maxPlayers * 100
  );
  const myPayment = (payments ?? []).find((p) => p.matchId === id);
  const hasApprovedPayment = (myPayment == null ? void 0 : myPayment.status) === "approved";
  const hasPendingPayment = (myPayment == null ? void 0 : myPayment.status) === "pending";
  const hasRejectedPayment = (myPayment == null ? void 0 : myPayment.status) === "rejected";
  const hasNoPayment = !myPayment;
  const handleJoin = () => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    } else {
      navigate({ to: "/payment/$matchId", params: { matchId: match.id } });
    }
  };
  const sortedResults = [...results ?? []].sort((a, b) => a.rank - b.rank).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", "data-ocid": "match_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/matches",
        className: "flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors",
        "data-ocid": "match_detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          "All Matches"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-foreground", children: match.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status, className: "shrink-0 mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6", children: [
        {
          label: "Entry Fee",
          value: match.entryFee === 0 ? "FREE" : `₹${match.entryFee}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" })
        },
        {
          label: "Prize Pool",
          value: `₹${match.prizePool.toLocaleString()}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-primary" }),
          accent: true
        },
        {
          label: "Players",
          value: `${match.playerCount}/${match.maxPlayers}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" })
        },
        {
          label: "Mode",
          value: match.gameMode,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-3.5 w-3.5" })
        },
        {
          label: "Map",
          value: match.map,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5" })
        },
        {
          label: "Date & Time",
          value: formatDate(match.scheduledAt),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" })
        }
      ].map(({ label, value, icon, accent }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: [
          icon,
          label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-semibold text-sm truncate ${accent ? "text-primary" : "text-foreground"}`,
            children: value
          }
        )
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-mono text-muted-foreground mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3", "aria-hidden": "true" }),
            "Players filled"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            playersPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary transition-all duration-500",
            style: { width: `${playersPercent}%` },
            role: "progressbar",
            tabIndex: 0,
            "aria-valuenow": match.playerCount,
            "aria-valuemin": 0,
            "aria-valuemax": match.maxPlayers
          }
        ) })
      ] }),
      hasApprovedPayment && match.roomId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-primary/30 bg-primary/5 p-4 mb-5",
          "data-ocid": "match_detail.credentials_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-primary font-bold", children: "Room Credentials Unlocked" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CopyField, { label: "Room ID", value: match.roomId }),
              match.roomPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(CopyField, { label: "Room Password", value: match.roomPassword })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        hasApprovedPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary font-mono",
            "data-ocid": "match_detail.joined_status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 shrink-0" }),
              "You're registered for this match. Good luck!"
            ]
          }
        ),
        hasPendingPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-mono text-accent",
            "data-ocid": "match_detail.pending_status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 shrink-0" }),
              "Payment Under Review — Room credentials will unlock once approved"
            ]
          }
        ),
        hasRejectedPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive font-mono",
            "data-ocid": "match_detail.rejected_status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 shrink-0" }),
              "Your payment was rejected. Please re-submit or contact support."
            ]
          }
        ),
        (hasNoPayment || hasRejectedPayment) && match.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleJoin,
            className: "w-full font-mono uppercase tracking-widest h-11 gap-2",
            "data-ocid": "match_detail.join_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4", "aria-hidden": "true" }),
              isAuthenticated ? "Join & Pay Entry Fee" : "Sign in to Join"
            ]
          }
        ),
        match.status !== "open" && hasNoPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground font-mono",
            "data-ocid": "match_detail.closed_status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0" }),
              match.status === "completed" ? "This match is completed." : "Registrations are closed."
            ]
          }
        ),
        match.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "w-full font-mono uppercase tracking-widest h-10",
            "data-ocid": "match_detail.results_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/results/$matchId", params: { matchId: match.id }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }),
              "View Results"
            ] })
          }
        )
      ] })
    ] }),
    sortedResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border p-5",
        "data-ocid": "match_detail.results_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary" }),
            "Leaderboard"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: sortedResults.map((result, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 py-2.5",
              "data-ocid": `match_detail.result.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `font-mono text-xs font-bold w-6 text-center ${i === 0 ? "text-accent" : i === 1 ? "text-muted-foreground" : "text-muted-foreground/60"}`,
                    children: [
                      "#",
                      result.rank
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-semibold text-sm text-foreground truncate", children: result.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  result.kills,
                  "K"
                ] }),
                result.prize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-primary font-bold", children: [
                  "₹",
                  result.prize
                ] })
              ]
            },
            result.id
          )) })
        ]
      }
    ),
    !hasApprovedPayment && match.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground font-mono flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground/60 mt-0.5 shrink-0" }),
      "Room ID and password are revealed after admin approves your payment. Need help? Use the WhatsApp support button."
    ] })
  ] });
}
export {
  MatchDetailPage as default
};
