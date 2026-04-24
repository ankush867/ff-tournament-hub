import { c as createLucideIcon, r as reactExports, d as useQueryClient, j as jsxRuntimeExports, L as Link, B as Button } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { e as useAllUsers } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { U as Users } from "./users-DFO1ACl1.js";
import { S as Search } from "./search-BxSTf2UY.js";
import { U as UserCheck } from "./user-check-6GtgapgZ.js";
import "./badge-BuGF_AhT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function UserRow({
  user,
  index,
  onAction
}) {
  const isSuspended = user.status === "suspended";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/20 transition-colors",
      "data-ocid": `admin.users.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-sm text-muted-foreground", children: index }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: user.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: user.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-mono text-muted-foreground", children: user.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-mono text-accent", children: user.ffUid }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-sm text-primary", children: [
          "₹",
          user.walletBalance.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: user.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: `text-xs font-mono ${isSuspended ? "border-primary/40 text-primary hover:bg-primary/10" : "border-destructive/40 text-destructive hover:bg-destructive/10"}`,
            onClick: () => onAction(user.id, isSuspended ? "unsuspend" : "suspend"),
            "data-ocid": isSuspended ? `admin.users.unsuspend.${index}` : `admin.users.suspend.${index}`,
            children: isSuspended ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3.5 w-3.5 mr-1" }),
              "Unsuspend"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3.5 w-3.5 mr-1" }),
              "Suspend"
            ] })
          }
        ) })
      ]
    }
  );
}
function AdminUsersPage() {
  const [search, setSearch] = reactExports.useState("");
  const { data: users, isLoading } = useAllUsers();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const filtered = (users ?? []).filter(
    (u) => u.username.toLowerCase().includes(search.toLowerCase())
  );
  const handleAction = async (userId, action) => {
    if (!actor) return;
    try {
      const a = actor;
      if (action === "suspend") await a.suspendUser(userId);
      else await a.unsuspendUser(userId);
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      ue.success(
        `User ${action === "suspend" ? "suspended" : "unsuspended"} successfully`
      );
    } catch {
      ue.error(`Failed to ${action} user`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "admin.users.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display", children: "User Management" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-sm text-muted-foreground", children: [
        filtered.length,
        " users"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 relative max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by username...",
            className: "pl-9 bg-card border-border font-mono text-sm",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "admin.users.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground w-10", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "FF UID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-label text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-label text-muted-foreground", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["u0", "u1", "u2", "u3", "u4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 bg-muted" }) }, ck)) }, sk)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 7,
            className: "px-4 py-12 text-center text-muted-foreground",
            "data-ocid": "admin.users.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm", children: "No users found" })
            ]
          }
        ) }) : filtered.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserRow,
          {
            user,
            index: idx + 1,
            onAction: handleAction
          },
          user.id
        )) })
      ] }) })
    ] })
  ] });
}
export {
  AdminUsersPage as default
};
