import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import { StatusBadge } from "../../components/StatusBadge";
import { useAllPayments } from "../../hooks/useBackend";
import type { PaymentStatus } from "../../types";

const FILTERS: { label: string; value: "all" | PaymentStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { data: payments, isLoading } = useAllPayments();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const filtered = (payments ?? []).filter((p) =>
    filter === "all" ? true : p.status === filter,
  );

  const handleAction = async (
    paymentId: string,
    action: "approve" | "reject",
  ) => {
    if (!actor) return;
    setActionLoading(paymentId + action);
    try {
      const a = actor as unknown as {
        approvePayment: (id: string) => Promise<void>;
        rejectPayment: (id: string) => Promise<void>;
      };
      if (action === "approve") await a.approvePayment(paymentId);
      else await a.rejectPayment(paymentId);
      await queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      toast.success(`Payment ${action}d`);
    } catch {
      toast.error(`Failed to ${action} payment`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.payments.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/admin" data-ocid="admin.payments.back_link">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold font-display">Payments</h1>
          </div>
          <span className="ml-auto font-mono text-sm text-muted-foreground">
            {filtered.length} records
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 space-y-4">
        {/* Filter Tabs */}
        <div
          className="flex gap-2 flex-wrap"
          data-ocid="admin.payments.filter_tabs"
        >
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-sm border transition-smooth ${
                filter === f.value
                  ? "bg-primary/10 border-primary/60 text-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
              data-ocid={`admin.payments.filter.${f.value}`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-1.5 opacity-60">
                  ({(payments ?? []).filter((p) => p.status === f.value).length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-sm border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Player
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Match
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  UTR #
                </th>
                <th className="px-4 py-3 text-center text-label text-muted-foreground">
                  Screenshot
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Time
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["p0", "p1", "p2", "p3", "p4"].map((sk) => (
                  <tr key={sk} className="border-b border-border">
                    {["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
                      (ck) => (
                        <td key={ck} className="px-4 py-3">
                          <Skeleton className="h-4 w-16 bg-muted" />
                        </td>
                      ),
                    )}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="admin.payments.empty_state"
                  >
                    <CreditCard className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-mono text-sm">
                      No {filter !== "all" ? filter : ""} payments found
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((payment, idx) => (
                  <tr
                    key={payment.id}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.payments.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {payment.username}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[140px] truncate">
                      {payment.matchName}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-accent">
                      {payment.utrNumber}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {payment.screenshotUrl ? (
                        <button
                          type="button"
                          onClick={() => setPreviewUrl(payment.screenshotUrl)}
                          className="inline-block group"
                          data-ocid={`admin.payments.screenshot.${idx + 1}`}
                          title="View screenshot"
                        >
                          <img
                            src={payment.screenshotUrl}
                            alt="Payment proof"
                            className="h-9 w-9 object-cover rounded-sm border border-border group-hover:border-primary/50 transition-colors"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </button>
                      ) : (
                        <span className="text-muted-foreground text-xs font-mono">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-primary">
                      ₹{payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {payment.status === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs font-mono bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20"
                            variant="ghost"
                            disabled={actionLoading === `${payment.id}approve`}
                            onClick={() => handleAction(payment.id, "approve")}
                            data-ocid={`admin.payments.approve.${idx + 1}`}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            {actionLoading === `${payment.id}approve`
                              ? "..."
                              : "Approve"}
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs font-mono bg-destructive/10 border border-destructive/40 text-destructive hover:bg-destructive/20"
                            variant="ghost"
                            disabled={actionLoading === `${payment.id}reject`}
                            onClick={() => handleAction(payment.id, "reject")}
                            data-ocid={`admin.payments.reject.${idx + 1}`}
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            {actionLoading === `${payment.id}reject`
                              ? "..."
                              : "Reject"}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-muted-foreground px-4">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot Preview Modal */}
      <Dialog
        open={!!previewUrl}
        onOpenChange={(open) => !open && setPreviewUrl(null)}
      >
        <DialogContent
          className="bg-card border-border max-w-xl p-4"
          data-ocid="admin.payments.screenshot_dialog"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-label text-muted-foreground">
              Payment Screenshot
            </p>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs font-mono flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" /> Open Original
              </a>
            )}
          </div>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Payment screenshot"
              className="w-full rounded-sm border border-border max-h-[70vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
