import { c as createLucideIcon, r as reactExports, d as useQueryClient, j as jsxRuntimeExports, L as Link, B as Button } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { L as Label } from "./label-Bwc9BENV.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { f as useAllMatches, h as useAllResults } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-C1JrFtnA.js";
import { U as Upload } from "./upload-M279uyg6.js";
import { T as Trash2, P as Plus } from "./trash-2-CrfEWxwg.js";
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
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
const Medal = createLucideIcon("medal", __iconNode);
const emptyEntry = () => ({
  userId: "",
  username: "",
  rank: "",
  kills: "",
  prize: ""
});
function AdminResultsPage() {
  const [selectedMatchId, setSelectedMatchId] = reactExports.useState("");
  const [rows, setRows] = reactExports.useState([emptyEntry()]);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const { data: matches, isLoading: matchesLoading } = useAllMatches();
  const { data: allResults, isLoading: resultsLoading } = useAllResults();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const matchResults = (allResults ?? []).filter(
    (r) => r.matchId === selectedMatchId
  );
  const updateRow = (idx, field, value) => {
    setRows(
      (prev) => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r)
    );
  };
  const addRow = () => setRows((prev) => [...prev, emptyEntry()]);
  const removeRow = (idx) => setRows((prev) => prev.filter((_, i) => i !== idx));
  const handleSubmit = async () => {
    if (!actor || !selectedMatchId) return;
    const validRows = rows.filter((r) => r.userId && r.rank);
    if (!validRows.length) {
      ue.error("Add at least one result row with User ID and Rank");
      return;
    }
    setSubmitting(true);
    try {
      const payload = validRows.map((r) => ({
        matchId: selectedMatchId,
        userId: r.userId,
        username: r.username,
        rank: Number.parseInt(r.rank),
        kills: Number.parseInt(r.kills || "0"),
        prize: Number.parseFloat(r.prize || "0")
      }));
      await actor.uploadResults(payload);
      await queryClient.invalidateQueries({ queryKey: ["admin", "results"] });
      setRows([emptyEntry()]);
      ue.success(`${validRows.length} result(s) uploaded successfully`);
    } catch {
      ue.error("Failed to upload results");
    } finally {
      setSubmitting(false);
    }
  };
  const rankColor = (rank) => {
    if (rank === 1) return "text-accent";
    if (rank === 2) return "text-muted-foreground";
    if (rank === 3) return "text-chart-3";
    return "text-foreground";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.results.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "admin.results.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display", children: "Results" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 md:px-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-sm p-5",
          "data-ocid": "admin.results.match_selector",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label text-muted-foreground mb-2 block", children: "Select Match" }),
            matchesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full max-w-sm bg-muted" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full max-w-sm bg-background border border-border rounded-sm px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50",
                value: selectedMatchId,
                onChange: (e) => setSelectedMatchId(e.target.value),
                "data-ocid": "admin.results.match_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Choose a match —" }),
                  (matches ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: m.id, children: [
                    m.name,
                    " ·",
                    " ",
                    new Date(m.scheduledAt).toLocaleDateString("en-IN")
                  ] }, m.id))
                ]
              }
            )
          ]
        }
      ),
      selectedMatchId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-sm p-5",
            "data-ocid": "admin.results.upload_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Upload Results" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 text-left text-label text-muted-foreground", children: "User ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 text-left text-label text-muted-foreground", children: "Username" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 text-left text-label text-muted-foreground", children: "Rank" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 text-left text-label text-muted-foreground", children: "Kills" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 text-left text-label text-muted-foreground", children: "Prize (₹)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right text-label text-muted-foreground" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "group",
                    "data-ocid": `admin.results.row.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "bg-background border-border font-mono text-xs h-8 w-28",
                          value: row.userId,
                          onChange: (e) => updateRow(idx, "userId", e.target.value),
                          placeholder: "principal-id",
                          "data-ocid": `admin.results.user_id.${idx + 1}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "bg-background border-border font-mono text-xs h-8 w-28",
                          value: row.username,
                          onChange: (e) => updateRow(idx, "username", e.target.value),
                          placeholder: "GamerTag",
                          "data-ocid": `admin.results.username.${idx + 1}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          className: "bg-background border-border font-mono text-xs h-8 w-20",
                          value: row.rank,
                          onChange: (e) => updateRow(idx, "rank", e.target.value),
                          placeholder: "1",
                          min: 1,
                          "data-ocid": `admin.results.rank.${idx + 1}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          className: "bg-background border-border font-mono text-xs h-8 w-20",
                          value: row.kills,
                          onChange: (e) => updateRow(idx, "kills", e.target.value),
                          placeholder: "0",
                          min: 0,
                          "data-ocid": `admin.results.kills.${idx + 1}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          className: "bg-background border-border font-mono text-xs h-8 w-24",
                          value: row.prize,
                          onChange: (e) => updateRow(idx, "prize", e.target.value),
                          placeholder: "0",
                          min: 0,
                          "data-ocid": `admin.results.prize.${idx + 1}`
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: rows.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "icon",
                          variant: "ghost",
                          className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity",
                          onClick: () => removeRow(idx),
                          "data-ocid": `admin.results.remove_row.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                        }
                      ) })
                    ]
                  },
                  row.userId || `row-${idx}`
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "border-border text-muted-foreground hover:text-foreground font-mono text-xs",
                    onClick: addRow,
                    "data-ocid": "admin.results.add_row_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1.5" }),
                      " Add Row"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "ml-auto bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm",
                    onClick: handleSubmit,
                    disabled: submitting,
                    "data-ocid": "admin.results.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
                      submitting ? "Uploading..." : `Upload ${rows.filter((r) => r.userId).length} Result(s)`
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.results.existing_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Current Leaderboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground ml-auto", children: [
              matchResults.length,
              " entries"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Rank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Player" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center text-label text-muted-foreground", children: "Kills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Prize" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: resultsLoading ? ["r0", "r1", "r2"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 bg-muted" }) }, ck)) }, sk)) : matchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 4,
                className: "px-4 py-10 text-center text-muted-foreground",
                "data-ocid": "admin.results.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm", children: "No results uploaded yet" })
                ]
              }
            ) }) : [...matchResults].sort((a, b) => a.rank - b.rank).map((result, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border hover:bg-muted/20 transition-colors",
                "data-ocid": `admin.results.existing.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-lg font-bold font-display ${rankColor(result.rank)}`,
                      children: [
                        "#",
                        result.rank
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: result.username }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground truncate max-w-[160px]", children: result.userId })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center font-mono text-foreground", children: result.kills }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-primary font-semibold", children: result.prize > 0 ? `₹${result.prize}` : "—" })
                ]
              },
              result.id
            )) })
          ] }) })
        ] })
      ] }),
      !selectedMatchId && !matchesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "admin.results.no_match_selected",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-12 w-12 mx-auto mb-4 opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm", children: "Select a match above to upload results" })
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminResultsPage as default
};
