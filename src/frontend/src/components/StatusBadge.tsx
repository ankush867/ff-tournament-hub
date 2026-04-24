import { Badge } from "@/components/ui/badge";
import type { MatchStatus, PaymentStatus, UserStatus } from "../types";

type AnyStatus = MatchStatus | PaymentStatus | UserStatus;

const statusConfig: Record<AnyStatus, { label: string; classes: string }> = {
  // Match statuses
  open: {
    label: "OPEN",
    classes: "border-primary/60 bg-primary/10 text-primary",
  },
  closed: {
    label: "CLOSED",
    classes: "border-muted-foreground/40 bg-muted/40 text-muted-foreground",
  },
  completed: {
    label: "COMPLETED",
    classes: "border-chart-4/60 bg-chart-4/10 text-chart-4",
  },
  cancelled: {
    label: "CANCELLED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive",
  },
  // Payment statuses
  pending: {
    label: "PENDING",
    classes: "border-accent/60 bg-accent/10 text-accent",
  },
  approved: {
    label: "APPROVED",
    classes: "border-primary/60 bg-primary/10 text-primary",
  },
  rejected: {
    label: "REJECTED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive",
  },
  // User statuses
  active: {
    label: "ACTIVE",
    classes: "border-primary/60 bg-primary/10 text-primary",
  },
  suspended: {
    label: "SUSPENDED",
    classes: "border-destructive/60 bg-destructive/10 text-destructive",
  },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status.toUpperCase(),
    classes: "border-muted-foreground/40 bg-muted/40 text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={`font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 ${config.classes} ${className}`}
    >
      {config.label}
    </Badge>
  );
}
