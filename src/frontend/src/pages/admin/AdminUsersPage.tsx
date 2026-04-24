import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, UserCheck, UserX, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import { StatusBadge } from "../../components/StatusBadge";
import { useAllUsers } from "../../hooks/useBackend";
import type { User } from "../../types";

function UserRow({
  user,
  index,
  onAction,
}: {
  user: User;
  index: number;
  onAction: (id: string, action: "suspend" | "unsuspend") => void;
}) {
  const isSuspended = user.status === "suspended";
  return (
    <tr
      className="border-b border-border hover:bg-muted/20 transition-colors"
      data-ocid={`admin.users.item.${index}`}
    >
      <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
        {index}
      </td>
      <td className="px-4 py-3">
        <p className="font-semibold text-foreground">{user.username}</p>
        <p className="text-xs text-muted-foreground font-mono">{user.id}</p>
      </td>
      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
        {user.contact}
      </td>
      <td className="px-4 py-3 text-sm font-mono text-accent">{user.ffUid}</td>
      <td className="px-4 py-3 text-right font-mono text-sm text-primary">
        ₹{user.walletBalance.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          size="sm"
          variant="outline"
          className={`text-xs font-mono ${
            isSuspended
              ? "border-primary/40 text-primary hover:bg-primary/10"
              : "border-destructive/40 text-destructive hover:bg-destructive/10"
          }`}
          onClick={() =>
            onAction(user.id, isSuspended ? "unsuspend" : "suspend")
          }
          data-ocid={
            isSuspended
              ? `admin.users.unsuspend.${index}`
              : `admin.users.suspend.${index}`
          }
        >
          {isSuspended ? (
            <>
              <UserCheck className="h-3.5 w-3.5 mr-1" />
              Unsuspend
            </>
          ) : (
            <>
              <UserX className="h-3.5 w-3.5 mr-1" />
              Suspend
            </>
          )}
        </Button>
      </td>
    </tr>
  );
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useAllUsers();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const filtered = (users ?? []).filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAction = async (
    userId: string,
    action: "suspend" | "unsuspend",
  ) => {
    if (!actor) return;
    try {
      const a = actor as unknown as {
        suspendUser: (id: string) => Promise<void>;
        unsuspendUser: (id: string) => Promise<void>;
      };
      if (action === "suspend") await a.suspendUser(userId);
      else await a.unsuspendUser(userId);
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success(
        `User ${action === "suspend" ? "suspended" : "unsuspended"} successfully`,
      );
    } catch {
      toast.error(`Failed to ${action} user`);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.users.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/admin" data-ocid="admin.users.back_link">
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
            <Users className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold font-display">User Management</h1>
          </div>
          <span className="ml-auto font-mono text-sm text-muted-foreground">
            {filtered.length} users
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-8">
        {/* Search */}
        <div className="mb-4 relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by username..."
            className="pl-9 bg-card border-border font-mono text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.users.search_input"
          />
        </div>

        {/* Table */}
        <div className="rounded-sm border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-label text-muted-foreground w-10">
                  #
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  User
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  FF UID
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Wallet
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["u0", "u1", "u2", "u3", "u4"].map((sk) => (
                  <tr key={sk} className="border-b border-border">
                    {["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => (
                      <td key={ck} className="px-4 py-3">
                        <Skeleton className="h-4 w-20 bg-muted" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="admin.users.empty_state"
                  >
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-mono text-sm">No users found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={idx + 1}
                    onAction={handleAction}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
