import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Gamepad2,
  Lock,
  LogOut,
  Shield,
  Trophy,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuth } from "../contexts/AuthContext";
import { useMyPayments, useMyProfile } from "../hooks/useBackend";
import type { Payment, PaymentStatus } from "../types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  if (status === "approved")
    return (
      <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-[10px] uppercase tracking-widest gap-1">
        <CheckCircle2 className="h-3 w-3" /> Approved
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge className="bg-destructive/20 text-destructive border-destructive/40 font-mono text-[10px] uppercase tracking-widest gap-1">
        <XCircle className="h-3 w-3" /> Rejected
      </Badge>
    );
  return (
    <Badge className="bg-accent/20 text-accent border-accent/40 font-mono text-[10px] uppercase tracking-widest gap-1">
      <Clock className="h-3 w-3" /> Pending
    </Badge>
  );
}

function MatchPaymentRow({
  payment,
  index,
}: { payment: Payment; index: number }) {
  const isApproved = payment.status === "approved";
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 py-4 border-b border-border last:border-0"
      data-ocid={`profile.match_item.${index + 1}`}
    >
      <Trophy className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">
          {payment.matchName}
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-0.5">
          ₹{payment.amount} • UTR: {payment.utrNumber}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <PaymentStatusBadge status={payment.status} />
        {isApproved && payment.matchId && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/10 px-2 py-1">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Room
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="text-primary font-semibold">
              Credentials available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: payments, isLoading: paymentsLoading } = useMyPayments();
  const { principalId, isAdmin, logout } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Player info state
  const [username, setUsername] = useState("");
  const [ffUid, setFfUid] = useState("");
  const [isSavingInfo, setIsSavingInfo] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSavingPwd, setIsSavingPwd] = useState(false);

  // Sync form fields when profile loads
  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setFfUid(profile.ffUid);
    }
  }, [profile]);

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    setIsSavingInfo(true);
    try {
      if (actor) {
        await (
          actor as unknown as {
            updateMyProfile: (p: {
              username: string;
              ffUid: string;
            }) => Promise<void>;
          }
        ).updateMyProfile({ username: username.trim(), ffUid: ffUid.trim() });
      }
      await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSavingInfo(false);
    }
  };

  const handleSavePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsSavingPwd(true);
    try {
      if (actor) {
        await (
          actor as unknown as {
            changePassword: (p: {
              oldPassword: string;
              newPassword: string;
            }) => Promise<void>;
          }
        ).changePassword({ oldPassword, newPassword });
      }
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password — check your current password");
    } finally {
      setIsSavingPwd(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const approvedPayments =
    payments?.filter((p) => p.status === "approved") ?? [];
  const totalSpent =
    payments?.reduce(
      (sum, p) => sum + (p.status !== "rejected" ? p.amount : 0),
      0,
    ) ?? 0;

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      data-ocid="profile.page"
    >
      {/* Page header */}
      <div>
        <p className="text-label text-muted-foreground mb-1">Account</p>
        <h1 className="font-display font-bold text-2xl uppercase tracking-wide text-foreground">
          My Profile
        </h1>
      </div>

      {/* Identity card */}
      <div className="bg-card border border-border p-4 flex items-start gap-3">
        <div className="h-10 w-10 rounded-none bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          {profileLoading ? (
            <Skeleton className="h-5 w-40 mb-1" />
          ) : (
            <p className="font-display font-bold text-foreground truncate">
              {profile?.username ?? "—"}
            </p>
          )}
          <p className="text-[10px] font-mono text-muted-foreground truncate">
            {principalId ?? "—"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isAdmin && (
            <div className="flex items-center gap-1.5 border border-accent/60 bg-accent/10 px-2 py-1">
              <Shield className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                Admin
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 border border-border bg-muted/20 px-2 py-1">
            <Wallet className="h-3 w-3 text-muted-foreground" />
            {profileLoading ? (
              <Skeleton className="h-3 w-12" />
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-bold">
                ₹{profile?.walletBalance ?? 0}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Player Info Form ── */}
      <form
        onSubmit={handleSaveInfo}
        className="bg-card border border-border p-6 space-y-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Gamepad2 className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Player Info
          </h2>
        </div>
        <Separator className="bg-border" />

        <div className="space-y-1.5">
          <Label
            htmlFor="username"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Username
          </Label>
          {profileLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your display name"
              className="font-mono text-sm h-10"
              data-ocid="profile.username_input"
            />
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="ffuid"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Free Fire UID
          </Label>
          {profileLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="ffuid"
              value={ffUid}
              onChange={(e) => setFfUid(e.target.value)}
              placeholder="Your in-game UID"
              className="font-mono text-sm h-10"
              data-ocid="profile.ffuid_input"
            />
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Contact (read-only)
          </Label>
          <div className="h-10 flex items-center bg-muted/20 border border-border px-3 font-mono text-sm text-muted-foreground">
            {profileLoading ? (
              <Skeleton className="h-4 w-36" />
            ) : (
              (profile?.contact ?? "—")
            )}
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            disabled={isSavingInfo || profileLoading}
            size="sm"
            className="font-mono uppercase tracking-widest"
            data-ocid="profile.save_info_button"
          >
            {isSavingInfo ? "Saving…" : "Save Player Info"}
          </Button>
        </div>
      </form>

      {/* ── Change Password Form ── */}
      <form
        onSubmit={handleSavePwd}
        className="bg-card border border-border p-6 space-y-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Lock className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Change Password
          </h2>
        </div>
        <Separator className="bg-border" />

        {/* Old Password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="oldPassword"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="font-mono text-sm h-10 pr-10"
              data-ocid="profile.old_password_input"
            />
            <button
              type="button"
              onClick={() => setShowOld((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showOld ? "Hide password" : "Show password"}
            >
              {showOld ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="newPassword"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="font-mono text-sm h-10 pr-10"
              data-ocid="profile.new_password_input"
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="confirmPassword"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="font-mono text-sm h-10 pr-10"
              data-ocid="profile.confirm_password_input"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p
              className="text-xs text-destructive font-mono mt-1"
              data-ocid="profile.password_mismatch_error"
            >
              Passwords do not match
            </p>
          )}
        </div>

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            disabled={isSavingPwd}
            size="sm"
            variant="secondary"
            className="font-mono uppercase tracking-widest"
            data-ocid="profile.save_password_button"
          >
            {isSavingPwd ? "Changing…" : "Change Password"}
          </Button>
        </div>
      </form>

      {/* ── Joined Matches ── */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
              Joined Matches
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!paymentsLoading && (
              <>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {approvedPayments.length} approved
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  ₹{totalSpent} spent
                </span>
              </>
            )}
          </div>
        </div>
        <Separator className="bg-border mb-2" />

        {paymentsLoading ? (
          <div
            className="space-y-4 py-2"
            data-ocid="profile.matches_loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Skeleton className="h-4 w-4 rounded-none" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        ) : !payments || payments.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 text-center"
            data-ocid="profile.matches_empty_state"
          >
            <Trophy className="h-8 w-8 text-muted-foreground/40 mb-3" />
            <p className="font-display font-semibold text-muted-foreground text-sm">
              No matches joined yet
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Browse open matches and register to play
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 font-mono uppercase tracking-widest text-xs border-primary/40 text-primary hover:bg-primary/10"
              onClick={() => navigate({ to: "/matches" })}
              data-ocid="profile.browse_matches_button"
            >
              Browse Matches
            </Button>
          </div>
        ) : (
          <div data-ocid="profile.matches_list">
            {payments.map((payment, i) => (
              <MatchPaymentRow key={payment.id} payment={payment} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ── Sign Out ── */}
      <div className="border border-destructive/30 p-5">
        <h3 className="font-display font-bold text-sm uppercase tracking-widest text-destructive mb-2">
          Sign Out
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          You'll be signed out of your Internet Identity session on this device.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="border-destructive/40 text-destructive hover:bg-destructive/10 font-mono text-xs uppercase tracking-widest gap-2"
          data-ocid="profile.logout_button"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
