import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, Pencil, Plus, Trash2, Trophy, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import { StatusBadge } from "../../components/StatusBadge";
import { useAllMatches } from "../../hooks/useBackend";
import type { Match } from "../../types";

interface MatchFormData {
  name: string;
  entryFee: string;
  prizePool: string;
  scheduledAt: string;
  roomId: string;
  roomPassword: string;
  map: string;
  gameMode: string;
  maxPlayers: string;
}

const emptyForm: MatchFormData = {
  name: "",
  entryFee: "",
  prizePool: "",
  scheduledAt: "",
  roomId: "",
  roomPassword: "",
  map: "Bermuda",
  gameMode: "Battle Royale",
  maxPlayers: "50",
};

function MatchForm({
  initial,
  onSubmit,
  onClose,
  loading,
}: {
  initial: MatchFormData;
  onSubmit: (data: MatchFormData) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<MatchFormData>(initial);
  const set =
    (k: keyof MatchFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Match Name
          </Label>
          <Input
            className="bg-background border-border font-mono"
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Friday Showdown"
            data-ocid="admin.match_form.name_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Entry Fee (₹)
          </Label>
          <Input
            type="number"
            className="bg-background border-border font-mono"
            value={form.entryFee}
            onChange={set("entryFee")}
            placeholder="50"
            data-ocid="admin.match_form.entry_fee_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Prize Pool (₹)
          </Label>
          <Input
            type="number"
            className="bg-background border-border font-mono"
            value={form.prizePool}
            onChange={set("prizePool")}
            placeholder="2000"
            data-ocid="admin.match_form.prize_pool_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Max Players
          </Label>
          <Input
            type="number"
            className="bg-background border-border font-mono"
            value={form.maxPlayers}
            onChange={set("maxPlayers")}
            placeholder="50"
            data-ocid="admin.match_form.max_players_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Scheduled Time
          </Label>
          <Input
            type="datetime-local"
            className="bg-background border-border font-mono"
            value={form.scheduledAt}
            onChange={set("scheduledAt")}
            data-ocid="admin.match_form.scheduled_at_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Map
          </Label>
          <Input
            className="bg-background border-border font-mono"
            value={form.map}
            onChange={set("map")}
            placeholder="Bermuda"
            data-ocid="admin.match_form.map_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Game Mode
          </Label>
          <Input
            className="bg-background border-border font-mono"
            value={form.gameMode}
            onChange={set("gameMode")}
            placeholder="Battle Royale"
            data-ocid="admin.match_form.game_mode_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Room ID
          </Label>
          <Input
            className="bg-background border-border font-mono"
            value={form.roomId}
            onChange={set("roomId")}
            placeholder="Optional"
            data-ocid="admin.match_form.room_id_input"
          />
        </div>
        <div>
          <Label className="text-label text-muted-foreground mb-1.5 block">
            Room Password
          </Label>
          <Input
            className="bg-background border-border font-mono"
            value={form.roomPassword}
            onChange={set("roomPassword")}
            placeholder="Optional"
            data-ocid="admin.match_form.room_password_input"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
          onClick={() => onSubmit(form)}
          disabled={
            loading || !form.name || !form.entryFee || !form.scheduledAt
          }
          data-ocid="admin.match_form.submit_button"
        >
          {loading ? "Saving..." : "Save Match"}
        </Button>
        <Button
          variant="outline"
          className="border-border"
          onClick={onClose}
          data-ocid="admin.match_form.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function AdminMatchesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMatch, setEditMatch] = useState<Match | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: matches, isLoading } = useAllMatches();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin", "matches"] });

  const handleCreate = async (data: MatchFormData) => {
    if (!actor) return;
    setSaving(true);
    try {
      await (
        actor as unknown as { createMatch: (p: object) => Promise<void> }
      ).createMatch({
        name: data.name,
        entryFee: Number.parseFloat(data.entryFee),
        prizePool: Number.parseFloat(data.prizePool),
        scheduledAt: data.scheduledAt,
        roomId: data.roomId || undefined,
        roomPassword: data.roomPassword || undefined,
        map: data.map,
        gameMode: data.gameMode,
        maxPlayers: Number.parseInt(data.maxPlayers),
      });
      await invalidate();
      setModalOpen(false);
      toast.success("Match created successfully");
    } catch {
      toast.error("Failed to create match");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (data: MatchFormData) => {
    if (!actor || !editMatch) return;
    setSaving(true);
    try {
      await (
        actor as unknown as {
          updateMatch: (id: string, p: object) => Promise<void>;
        }
      ).updateMatch(editMatch.id, {
        name: data.name,
        entryFee: Number.parseFloat(data.entryFee),
        prizePool: Number.parseFloat(data.prizePool),
        scheduledAt: data.scheduledAt,
        roomId: data.roomId || undefined,
        roomPassword: data.roomPassword || undefined,
        map: data.map,
        gameMode: data.gameMode,
        maxPlayers: Number.parseInt(data.maxPlayers),
      });
      await invalidate();
      setEditMatch(null);
      toast.success("Match updated");
    } catch {
      toast.error("Failed to update match");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !deleteId) return;
    try {
      await (
        actor as unknown as { deleteMatch: (id: string) => Promise<void> }
      ).deleteMatch(deleteId);
      await invalidate();
      setDeleteId(null);
      toast.success("Match deleted");
    } catch {
      toast.error("Failed to delete match");
    }
  };

  const handleClose = async (matchId: string) => {
    if (!actor) return;
    try {
      await (
        actor as unknown as { closeMatch: (id: string) => Promise<void> }
      ).closeMatch(matchId);
      await invalidate();
      toast.success("Match closed");
    } catch {
      toast.error("Failed to close match");
    }
  };

  const editFormData = editMatch
    ? {
        name: editMatch.name,
        entryFee: String(editMatch.entryFee),
        prizePool: String(editMatch.prizePool),
        scheduledAt: editMatch.scheduledAt,
        roomId: editMatch.roomId ?? "",
        roomPassword: editMatch.roomPassword ?? "",
        map: editMatch.map,
        gameMode: editMatch.gameMode,
        maxPlayers: String(editMatch.maxPlayers),
      }
    : emptyForm;

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.matches.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/admin" data-ocid="admin.matches.back_link">
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
            <Trophy className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold font-display">Matches</h1>
          </div>
          <Button
            className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm"
            size="sm"
            onClick={() => setModalOpen(true)}
            data-ocid="admin.matches.create_button"
          >
            <Plus className="h-4 w-4 mr-1" /> Create Match
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-8">
        <div className="rounded-sm border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Fee
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Prize
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Time
                </th>
                <th className="px-4 py-3 text-center text-label text-muted-foreground">
                  Players
                </th>
                <th className="px-4 py-3 text-left text-label text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-label text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["m0", "m1", "m2", "m3"].map((sk) => (
                  <tr key={sk} className="border-b border-border">
                    {["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => (
                      <td key={ck} className="px-4 py-3">
                        <Skeleton className="h-4 w-16 bg-muted" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : !matches?.length ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                    data-ocid="admin.matches.empty_state"
                  >
                    <Trophy className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-mono text-sm">
                      No matches yet. Create one!
                    </p>
                  </td>
                </tr>
              ) : (
                matches.map((match, idx) => (
                  <tr
                    key={match.id}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.matches.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">
                        {match.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {match.map} · {match.gameMode}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-primary">
                      ₹{match.entryFee}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-accent">
                      ₹{match.prizePool}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {new Date(match.scheduledAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-sm">
                      <span className="text-foreground">
                        {match.playerCount}
                      </span>
                      <span className="text-muted-foreground">
                        /{match.maxPlayers}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={match.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {match.status === "open" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-accent hover:bg-accent/10"
                            onClick={() => handleClose(match.id)}
                            aria-label="Close match"
                            title="Close match"
                            data-ocid={`admin.matches.close.${idx + 1}`}
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() => setEditMatch(match)}
                          aria-label="Edit match"
                          data-ocid={`admin.matches.edit_button.${idx + 1}`}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(match.id)}
                          aria-label="Delete match"
                          data-ocid={`admin.matches.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="bg-card border-border max-w-lg"
          data-ocid="admin.matches.create_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Create Match
            </DialogTitle>
          </DialogHeader>
          <MatchForm
            initial={emptyForm}
            onSubmit={handleCreate}
            onClose={() => setModalOpen(false)}
            loading={saving}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editMatch}
        onOpenChange={(open) => !open && setEditMatch(null)}
      >
        <DialogContent
          className="bg-card border-border max-w-lg"
          data-ocid="admin.matches.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Pencil className="h-4 w-4 text-primary" /> Edit Match
            </DialogTitle>
          </DialogHeader>
          <MatchForm
            initial={editFormData}
            onSubmit={handleEdit}
            onClose={() => setEditMatch(null)}
            loading={saving}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent
          className="bg-card border-border"
          data-ocid="admin.matches.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" /> Delete Match
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action is permanent. All related data will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-border"
              data-ocid="admin.matches.delete_cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              data-ocid="admin.matches.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
