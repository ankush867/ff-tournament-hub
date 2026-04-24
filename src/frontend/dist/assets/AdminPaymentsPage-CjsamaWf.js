import { c as createLucideIcon, r as reactExports, d as useQueryClient, j as jsxRuntimeExports, L as Link, B as Button } from "./index-DJ3jSp6d.js";
import { g as Dialog, h as DialogContent } from "./dialog-DPWmmY6-.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { g as useAllPayments } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { C as CreditCard } from "./credit-card-D97yhFK-.js";
import { C as CircleX } from "./circle-x-cSV-jRds.js";
import "./badge-BuGF_AhT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
];
function AdminPaymentsPage() {
  const [filter, setFilter] = reactExports.useState("all");
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(null);
  const { data: payments, isLoading } = useAllPayments();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const filtered = (payments ?? []).filter(
    (p) => filter === "all" ? true : p.status === filter
  );
  const handleAction = async (paymentId, action) => {
    if (!actor) return;
    setActionLoading(paymentId + action);
    try {
      const a = actor;
      if (action === "approve") await a.approvePayment(paymentId);
      else await a.rejectPayment(paymentId);
      await queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      ue.success(`Payment ${action}d`);
    } catch {
      ue.error(`Failed to ${action} payment`);
    } finally {
      setActionLoading(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.payments.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "admin.payments.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display", children: "Payments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-sm text-muted-foreground", children: [
        filtered.length,
        " records"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 md:px-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 flex-wrap",
          "data-ocid": "admin.payments.filter_tabs",
          children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setFilter(f.value),
              className: `px-3 py-1.5 text-xs font-mono font-bold rounded-sm border transition-smooth ${filter === f.value ? "bg-primary/10 border-primary/60 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"}`,
              "data-ocid": `admin.payments.filter.${f.value}`,
              children: [
                f.label,
                f.value !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 opacity-60", children: [
                  "(",
                  (payments ?? []).filter((p) => p.status === f.value).length,
                  ")"
                ] })
              ]
            },
            f.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Match" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "UTR #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center text-label text-muted-foreground", children: "Screenshot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["p0", "p1", "p2", "p3", "p4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
          (ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 bg-muted" }) }, ck)
        ) }, sk)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 8,
            className: "px-4 py-12 text-center text-muted-foreground",
            "data-ocid": "admin.payments.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm", children: [
                "No ",
                filter !== "all" ? filter : "",
                " payments found"
              ] })
            ]
          }
        ) }) : filtered.map((payment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border hover:bg-muted/20 transition-colors",
            "data-ocid": `admin.payments.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: payment.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[140px] truncate", children: payment.matchName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-accent", children: payment.utrNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: payment.screenshotUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPreviewUrl(payment.screenshotUrl),
                  className: "inline-block group",
                  "data-ocid": `admin.payments.screenshot.${idx + 1}`,
                  title: "View screenshot",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: payment.screenshotUrl,
                      alt: "Payment proof",
                      className: "h-9 w-9 object-cover rounded-sm border border-border group-hover:border-primary/50 transition-colors",
                      onError: (e) => {
                        e.target.style.display = "none";
                      }
                    }
                  )
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-primary", children: [
                "₹",
                payment.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: payment.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: new Date(payment.createdAt).toLocaleString("en-IN", {
                dateStyle: "short",
                timeStyle: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: payment.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "h-7 px-2 text-xs font-mono bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20",
                    variant: "ghost",
                    disabled: actionLoading === `${payment.id}approve`,
                    onClick: () => handleAction(payment.id, "approve"),
                    "data-ocid": `admin.payments.approve.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                      actionLoading === `${payment.id}approve` ? "..." : "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "h-7 px-2 text-xs font-mono bg-destructive/10 border border-destructive/40 text-destructive hover:bg-destructive/20",
                    variant: "ghost",
                    disabled: actionLoading === `${payment.id}reject`,
                    onClick: () => handleAction(payment.id, "reject"),
                    "data-ocid": `admin.payments.reject.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                      actionLoading === `${payment.id}reject` ? "..." : "Reject"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground px-4", children: "—" }) })
            ]
          },
          payment.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!previewUrl,
        onOpenChange: (open) => !open && setPreviewUrl(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "bg-card border-border max-w-xl p-4",
            "data-ocid": "admin.payments.screenshot_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: "Payment Screenshot" }),
                previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: previewUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-primary hover:underline text-xs font-mono flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
                      " Open Original"
                    ]
                  }
                )
              ] }),
              previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Payment screenshot",
                  className: "w-full rounded-sm border border-border max-h-[70vh] object-contain"
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminPaymentsPage as default
};
