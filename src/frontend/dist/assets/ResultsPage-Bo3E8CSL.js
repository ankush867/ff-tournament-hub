import { c as createLucideIcon, e as useParams, u as useNavigate, j as jsxRuntimeExports, B as Button, S as Swords } from "./index-DJ3jSp6d.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { c as useMatch, d as useMatchResults } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import "./backend-DPSn0mZX.js";
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
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
const MEDAL_CONFIG = {
  1: {
    label: "1ST",
    varName: "--medal-gold",
    glow: "0 0 16px oklch(0.78 0.19 75 / 0.35)"
  },
  2: {
    label: "2ND",
    varName: "--medal-silver",
    glow: "0 0 14px oklch(0.75 0.02 250 / 0.3)"
  },
  3: {
    label: "3RD",
    varName: "--medal-bronze",
    glow: "0 0 14px oklch(0.70 0.18 55 / 0.3)"
  }
};
function RankBadge({ rank }) {
  const medal = MEDAL_CONFIG[rank];
  if (medal) {
    const color = `var(${medal.varName})`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center justify-center w-9 h-9 rounded-sm font-mono font-bold text-xs",
        style: {
          color,
          backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
          border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
          boxShadow: medal.glow
        },
        children: medal.label
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-9 h-9 rounded-sm font-mono text-sm text-muted-foreground bg-muted/50 border border-border", children: rank });
}
function MedalIcon({ rank }) {
  if (rank === 1)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Crown,
      {
        className: "w-4 h-4 shrink-0",
        style: { color: "var(--medal-gold)" }
      }
    );
  if (rank === 2)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trophy,
      {
        className: "w-4 h-4 shrink-0",
        style: { color: "var(--medal-silver)" }
      }
    );
  if (rank === 3)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trophy,
      {
        className: "w-4 h-4 shrink-0",
        style: { color: "var(--medal-bronze)" }
      }
    );
  return null;
}
function ResultRow({ result, index }) {
  const medal = MEDAL_CONFIG[result.rank];
  const isTop3 = result.rank <= 3;
  const medalColor = medal ? `var(${medal.varName})` : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      "data-ocid": `results.item.${index + 1}`,
      className: `border-b border-border transition-colors duration-150 ${isTop3 ? "hover:brightness-125" : "hover:bg-muted/30"}`,
      style: isTop3 && medal ? {
        backgroundColor: `color-mix(in oklch, var(${medal.varName}) 8%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(${medal.varName}) 25%, transparent)`
      } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: result.rank }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MedalIcon, { rank: result.rank }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display font-semibold truncate",
              style: { color: isTop3 ? medalColor : void 0 },
              children: result.username
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm text-muted-foreground hidden sm:table-cell", children: result.userId || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: result.kills })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: result.prize > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-primary", children: [
          "₹",
          result.prize.toLocaleString("en-IN")
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground text-sm", children: "—" }) })
      ]
    }
  );
}
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "results.loading_state", className: "space-y-px", children: ["s0", "s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 px-4 py-3 border-b border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-sm shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 hidden sm:block ml-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14 ml-auto" })
      ]
    },
    sk
  )) });
}
function ResultsPage() {
  const { matchId } = useParams({ from: "/results/$matchId" });
  const navigate = useNavigate();
  const { data: match, isLoading: matchLoading } = useMatch(matchId);
  const { data: results = [], isLoading: resultsLoading } = useMatchResults(matchId);
  const isLoading = matchLoading || resultsLoading;
  const sorted = [...results].sort((a, b) => a.rank - b.rank);
  const top1 = sorted.find((r) => r.rank === 1);
  const top2 = sorted.find((r) => r.rank === 2);
  const top3 = sorted.find((r) => r.rank === 3);
  const podiumSlots = [top2, top1, top3];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          "data-ocid": "results.back_button",
          onClick: () => navigate({ to: "/match/$id", params: { id: matchId } }),
          className: "gap-2 text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Match" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border" }),
      matchLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          "data-ocid": "results.match_heading",
          className: "font-display font-bold text-foreground truncate",
          children: (match == null ? void 0 : match.name) ?? "Match Results"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-primary" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      !isLoading && sorted.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "results.podium_section",
          className: "grid grid-cols-3 gap-2 sm:gap-4",
          children: [
            { slot: podiumSlots[0], height: "h-20", pos: 2 },
            { slot: podiumSlots[1], height: "h-28", pos: 1 },
            { slot: podiumSlots[2], height: "h-16", pos: 3 }
          ].map(({ slot, height, pos }) => {
            const cfg = MEDAL_CONFIG[pos];
            const medalColor = `var(${cfg.varName})`;
            if (!slot) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, pos);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex flex-col items-center justify-end gap-2 pb-3 rounded-sm border ${height} relative overflow-hidden`,
                style: {
                  borderColor: `color-mix(in oklch, ${medalColor} 40%, transparent)`,
                  backgroundColor: `color-mix(in oklch, ${medalColor} 8%, transparent)`,
                  boxShadow: cfg.glow
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-xs font-bold text-label",
                      style: { color: medalColor },
                      children: cfg.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-sm text-center truncate w-full px-2",
                      style: { color: medalColor },
                      children: slot.username
                    }
                  ),
                  slot.prize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono text-xs font-semibold",
                      style: {
                        color: `color-mix(in oklch, ${medalColor} 80%, transparent)`
                      },
                      children: [
                        "₹",
                        slot.prize.toLocaleString("en-IN")
                      ]
                    }
                  )
                ]
              },
              pos
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label text-muted-foreground", children: "Leaderboard" }),
          !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-xs text-muted-foreground", children: [
            sorted.length,
            " player",
            sorted.length !== 1 ? "s" : ""
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "results.empty_state",
            className: "flex flex-col items-center justify-center py-16 gap-3 text-center px-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 text-muted/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-muted-foreground text-lg", children: "No results yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Results will be published after the match concludes." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "results.back_to_match_button",
                  onClick: () => navigate({ to: "/match/$id", params: { id: matchId } }),
                  className: "mt-2 gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                    "Back to Match"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "results.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-center text-label text-muted-foreground w-16", children: "Rank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-label text-muted-foreground", children: "Player" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-label text-muted-foreground hidden sm:table-cell", children: "FF UID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-center text-label text-muted-foreground w-20", children: "Kills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right text-label text-muted-foreground w-24", children: "Prize" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((result, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResultRow, { result, index }, result.id)) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ResultsPage as default
};
