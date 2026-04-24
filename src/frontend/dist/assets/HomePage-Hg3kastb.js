import { j as jsxRuntimeExports, Z as Zap, B as Button, L as Link, P as PageLoader, S as Swords, a as Shield } from "./index-DJ3jSp6d.js";
import { M as MatchCard } from "./MatchCard-DC5tyUoh.js";
import { u as useMatches } from "./useBackend-CUConDby.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import "./StatusBadge-DYNS6d9D.js";
import "./badge-BuGF_AhT.js";
import "./calendar-Cat1lWzg.js";
import "./users-DFO1ACl1.js";
import "./backend-DPSn0mZX.js";
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-5 w-5 text-primary" }),
    title: "Weekly Tournaments",
    desc: "Solo & squad matches every week with guaranteed prize pools."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-accent" }),
    title: "Real Cash Prizes",
    desc: "Win and withdraw directly to your UPI. No points, no coins."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-chart-4" }),
    title: "Fair Play Guaranteed",
    desc: "Admin-reviewed registrations and results. Zero tolerance for cheating."
  }
];
function HomePage() {
  const { data: matches, isLoading } = useMatches();
  const openMatches = (matches ?? []).filter((m) => m.status === "open").slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative cyber-grid flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 border-b border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.3em] text-primary", children: "Free Fire Tournament Platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-hero text-foreground", children: [
        "COMPETE. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "WIN." }),
        " REPEAT."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base max-w-md leading-relaxed", children: "Join daily Free Fire tournaments, pay entry fee via UPI, and claim real cash prizes. Register in seconds, play your best." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "font-mono uppercase tracking-widest",
            "data-ocid": "home.cta_primary",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/matches", children: "View Matches" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            variant: "outline",
            className: "font-mono uppercase tracking-widest",
            "data-ocid": "home.cta_secondary",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register Free" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background px-4 py-12",
        "data-ocid": "home.matches_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-1", children: "Now Open" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground uppercase tracking-wide", children: "Upcoming Matches" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/matches",
                className: "font-mono text-xs uppercase tracking-widest text-primary hover:underline",
                "data-ocid": "home.view_all_matches_link",
                children: "View All →"
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading matches..." }) : openMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border border-dashed border-border py-12 text-center",
              "data-ocid": "home.matches_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "No open matches right now. Check back soon!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              "data-ocid": "home.matches_list",
              children: openMatches.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match, index: i + 1 }, match.id))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/20 border-t border-border px-4 py-12",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-6 text-center", children: "Why FF Tournament Hub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border p-5 flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  f.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wide text-foreground", children: f.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
              ]
            },
            f.title
          )) })
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
