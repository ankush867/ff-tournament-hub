import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Swords, B as Button } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { E as ErrorMessage } from "./ErrorMessage-C95OFxXJ.js";
import { M as MatchCard } from "./MatchCard-DC5tyUoh.js";
import { u as useMatches } from "./useBackend-CUConDby.js";
import { S as Search } from "./search-BxSTf2UY.js";
import "./StatusBadge-DYNS6d9D.js";
import "./badge-BuGF_AhT.js";
import "./trophy-jt2i0eZn.js";
import "./calendar-Cat1lWzg.js";
import "./users-DFO1ACl1.js";
import "./backend-DPSn0mZX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Completed", value: "completed" }
];
function MatchesPage() {
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const { data: matches, isLoading, error, refetch } = useMatches();
  const filtered = (matches ?? []).filter((m) => {
    const matchesFilter = filter === "all" || m.status === filter;
    const matchesSearch = search === "" || m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const openCount = (matches ?? []).filter((m) => m.status === "open").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", "data-ocid": "matches.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-1", children: "Browse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl uppercase tracking-wide text-foreground", children: "All Tournaments" }),
        !isLoading && openCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-primary border border-primary/40 bg-primary/10 px-2 py-1 uppercase tracking-widest shrink-0", children: [
          openCount,
          " open"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search tournaments…",
            className: "pl-9 font-mono text-sm h-10 bg-card border-border",
            "aria-label": "Search matches",
            "data-ocid": "matches.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-1 flex-wrap",
          role: "tablist",
          "aria-label": "Filter by status",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground font-mono uppercase tracking-widest pr-1 hidden sm:flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3", "aria-hidden": "true" }),
              "Filter:"
            ] }),
            STATUS_FILTERS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": filter === value,
                onClick: () => setFilter(value),
                className: `px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors duration-200 ${filter === value ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"}`,
                "data-ocid": `matches.filter.${value}`,
                children: label
              },
              value
            ))
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        "data-ocid": "matches.loading_state",
        children: ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52" }, sk))
      }
    ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Failed to load matches",
        message: "Could not fetch tournament data. Please try again.",
        onRetry: () => refetch()
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-dashed border-border py-20 text-center flex flex-col items-center gap-4",
        "data-ocid": "matches.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Swords,
            {
              className: "h-10 w-10 text-muted-foreground/30",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1", children: "No matches found" }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              'No results for "',
              search,
              '"'
            ] })
          ] }),
          (search || filter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setSearch(""),
                className: "font-mono text-xs uppercase tracking-widest h-8",
                "data-ocid": "matches.clear_search_button",
                children: "Clear search"
              }
            ),
            filter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setFilter("all"),
                className: "font-mono text-xs uppercase tracking-widest h-8",
                "data-ocid": "matches.clear_filter_button",
                children: "All statuses"
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4", children: [
        filtered.length,
        " tournament",
        filtered.length !== 1 ? "s" : "",
        filter !== "all" && ` · ${filter}`,
        search && ` · "${search}"`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
          "data-ocid": "matches.list",
          children: filtered.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match, index: i + 1 }, match.id))
        }
      )
    ] })
  ] });
}
export {
  MatchesPage as default
};
