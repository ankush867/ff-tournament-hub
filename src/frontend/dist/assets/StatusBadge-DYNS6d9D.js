import { j as jsxRuntimeExports } from "./index-DJ3jSp6d.js";
import { B as Badge } from "./badge-BuGF_AhT.js";
const statusConfig = {
  // Match statuses
  open: {
    label: "OPEN",
    classes: "border-primary/60 bg-primary/10 text-primary"
  },
  closed: {
    label: "CLOSED",
    classes: "border-muted-foreground/40 bg-muted/40 text-muted-foreground"
  },
  completed: {
    label: "COMPLETED",
    classes: "border-chart-4/60 bg-chart-4/10 text-chart-4"
  },
  cancelled: {
    label: "CANCELLED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive"
  },
  // Payment statuses
  pending: {
    label: "PENDING",
    classes: "border-accent/60 bg-accent/10 text-accent"
  },
  approved: {
    label: "APPROVED",
    classes: "border-primary/60 bg-primary/10 text-primary"
  },
  rejected: {
    label: "REJECTED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive"
  },
  // User statuses
  active: {
    label: "ACTIVE",
    classes: "border-primary/60 bg-primary/10 text-primary"
  },
  suspended: {
    label: "SUSPENDED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status] ?? {
    label: status.toUpperCase(),
    classes: "border-muted-foreground/40 bg-muted/40 text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 ${config.classes} ${className}`,
      children: config.label
    }
  );
}
export {
  StatusBadge as S
};
