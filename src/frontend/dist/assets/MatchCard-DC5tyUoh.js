import { u as useNavigate, j as jsxRuntimeExports, B as Button, Z as Zap } from "./index-DJ3jSp6d.js";
import { S as StatusBadge } from "./StatusBadge-DYNS6d9D.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { C as Calendar } from "./calendar-Cat1lWzg.js";
import { U as Users } from "./users-DFO1ACl1.js";
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
function formatCurrency(amount) {
  if (amount === 0) return "FREE";
  return `₹${amount.toLocaleString("en-IN")}`;
}
function MatchCard({
  match,
  index = 1,
  showJoin = true
}) {
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate({ to: "/match/$id", params: { id: match.id } });
  };
  const playersPercent = Math.round(
    match.playerCount / match.maxPlayers * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border hover:border-primary/40 transition-colors duration-200 flex flex-col group",
      "data-ocid": `match.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 p-4 pb-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display font-bold text-foreground text-sm uppercase tracking-wide truncate group-hover:text-primary transition-colors",
                title: match.name,
                children: match.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
              match.gameMode,
              " · ",
              match.map
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status, className: "shrink-0 mt-0.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-0 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 p-3 border-r border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-widest", children: "Entry Fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-base", children: formatCurrency(match.entryFee) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-widest flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-2.5 w-2.5", "aria-hidden": "true" }),
              "Prize Pool"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-base", children: formatCurrency(match.prizePool) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 p-3 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
              formatDate(match.scheduledAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
              match.playerCount,
              "/",
              match.maxPlayers
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary transition-all duration-500",
              style: { width: `${playersPercent}%` },
              role: "progressbar",
              tabIndex: 0,
              "aria-valuenow": match.playerCount,
              "aria-valuemin": 0,
              "aria-valuemax": match.maxPlayers,
              "aria-label": "Players filled"
            }
          ) }),
          showJoin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleJoin,
              disabled: match.status !== "open",
              className: "w-full font-mono text-xs uppercase tracking-widest h-9 gap-1.5",
              variant: match.status === "open" ? "default" : "outline",
              "data-ocid": `match.join_button.${index}`,
              children: match.status === "open" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3", "aria-hidden": "true" }),
                "Join Now"
              ] }) : match.status.toUpperCase()
            }
          )
        ] })
      ]
    }
  );
}
export {
  MatchCard as M
};
