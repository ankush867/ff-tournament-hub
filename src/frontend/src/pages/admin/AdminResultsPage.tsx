import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  Medal,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import { useAllMatches, useAllResults } from "../../hooks/useBackend";

interface ResultEntry {
  userId: string;
  username: string;
  rank: string;
  kills: string;
  prize: string;
}

const emptyEntry = (): ResultEntry => ({
  userId: "",
  username: "",
  rank: "",
  kills: "",
  prize: "",
});

export default function AdminResultsPage() {
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [rows, setRows] = useState<ResultEntry[]>([emptyEntry()]);
  const [submitting, setSubmitting] = useState(false);

  const { data: matches, isLoading: matchesLoading } = useAllMatches();
  const { data: allResults, isLoading: resultsLoading } = useAllResults();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const matchResults = (allResults ?? []).filter(
    (r) => r.matchId === selectedMatchId,
  );

  const updateRow = (idx: number, field: keyof ResultEntry, value: string) => {
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)),
    );
  };

  const addRow = () => setRows((prev) => [...prev, emptyEntry()]);
  const removeRow = (idx: number) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    if (!actor || !selectedMatchId) return;
    const validRows = rows.filter((r) => r.userId && r.rank);
    if (!validRows.length) {
      toast.error("Add at least one result row with User ID and Rank");
      return;
    }
    setSubmitting(true);
    try {
      const payload = validRows.map((r) => ({
        matchId: selectedMatchId,
        userId: r.userId,
        username: r.username,
        rank: Number.parseInt(r.rank),
        kills: Number.parseInt(r.kills || "0"),
        prize: Number.parseFloat(r.prize || "0"),
      }));
      await (
        actor as unknown as {
          uploadResults: (results: typeof payload) => Promise<void>;
        }
      ).uploadResults(payload);
      await queryClient.invalidateQueries({ queryKey: ["admin", "results"] });
      setRows([emptyEntry()]);
      toast.success(`${validRows.length} result(s) uploaded successfully`);
    } catch {
      toast.error("Failed to upload results");
    } finally {
      setSubmitting(false);
    }
  };

  const rankColor = (rank: number) => {
    if (rank === 1) return "text-accent";
    if (rank === 2) return "text-muted-foreground";
    if (rank === 3) return "text-chart-3";
    return "text-foreground";
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.results.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-5 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/admin" data-ocid="admin.results.back_link">
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
            <BarChart2 className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold font-display">Results</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 space-y-8">
        {/* Match Selector */}
        <div
          className="bg-card border border-border rounded-sm p-5"
          data-ocid="admin.results.match_selector"
        >
          <Label className="text-label text-muted-foreground mb-2 block">
            Select Match
          </Label>
          {matchesLoading ? (
            <Skeleton className="h-10 w-full max-w-sm bg-muted" />
          ) : (
            <select
              className="w-full max-w-sm bg-background border border-border rounded-sm px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              data-ocid="admin.results.match_select"
            >
              <option value="">— Choose a match —</option>
              {(matches ?? []).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ·{" "}
                  {new Date(m.scheduledAt).toLocaleDateString("en-IN")}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedMatchId && (
          <>
            {/* Upload Form */}
            <section
              className="bg-card border border-border rounded-sm p-5"
              data-ocid="admin.results.upload_form"
            >
              <div className="flex items-center gap-3 mb-5">
                <Upload className="h-4 w-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  Upload Results
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 pr-3 text-left text-label text-muted-foreground">
                        User ID
                      </th>
                      <th className="pb-2 pr-3 text-left text-label text-muted-foreground">
                        Username
                      </th>
                      <th className="pb-2 pr-3 text-left text-label text-muted-foreground">
                        Rank
                      </th>
                      <th className="pb-2 pr-3 text-left text-label text-muted-foreground">
                        Kills
                      </th>
                      <th className="pb-2 pr-3 text-left text-label text-muted-foreground">
                        Prize (₹)
                      </th>
                      <th className="pb-2 text-right text-label text-muted-foreground" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr
                        key={row.userId || `row-${idx}`}
                        className="group"
                        data-ocid={`admin.results.row.${idx + 1}`}
                      >
                        <td className="pr-3 py-2">
                          <Input
                            className="bg-background border-border font-mono text-xs h-8 w-28"
                            value={row.userId}
                            onChange={(e) =>
                              updateRow(idx, "userId", e.target.value)
                            }
                            placeholder="principal-id"
                            data-ocid={`admin.results.user_id.${idx + 1}`}
                          />
                        </td>
                        <td className="pr-3 py-2">
                          <Input
                            className="bg-background border-border font-mono text-xs h-8 w-28"
                            value={row.username}
                            onChange={(e) =>
                              updateRow(idx, "username", e.target.value)
                            }
                            placeholder="GamerTag"
                            data-ocid={`admin.results.username.${idx + 1}`}
                          />
                        </td>
                        <td className="pr-3 py-2">
                          <Input
                            type="number"
                            className="bg-background border-border font-mono text-xs h-8 w-20"
                            value={row.rank}
                            onChange={(e) =>
                              updateRow(idx, "rank", e.target.value)
                            }
                            placeholder="1"
                            min={1}
                            data-ocid={`admin.results.rank.${idx + 1}`}
                          />
                        </td>
                        <td className="pr-3 py-2">
                          <Input
                            type="number"
                            className="bg-background border-border font-mono text-xs h-8 w-20"
                            value={row.kills}
                            onChange={(e) =>
                              updateRow(idx, "kills", e.target.value)
                            }
                            placeholder="0"
                            min={0}
                            data-ocid={`admin.results.kills.${idx + 1}`}
                          />
                        </td>
                        <td className="pr-3 py-2">
                          <Input
                            type="number"
                            className="bg-background border-border font-mono text-xs h-8 w-24"
                            value={row.prize}
                            onChange={(e) =>
                              updateRow(idx, "prize", e.target.value)
                            }
                            placeholder="0"
                            min={0}
                            data-ocid={`admin.results.prize.${idx + 1}`}
                          />
                        </td>
                        <td className="py-2 text-right">
                          {rows.length > 1 && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeRow(idx)}
                              data-ocid={`admin.results.remove_row.${idx + 1}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:text-foreground font-mono text-xs"
                  onClick={addRow}
                  data-ocid="admin.results.add_row_button"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Row
                </Button>
                <Button
                  className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm"
                  onClick={handleSubmit}
                  disabled={submitting}
                  data-ocid="admin.results.submit_button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {submitting
                    ? "Uploading..."
                    : `Upload ${rows.filter((r) => r.userId).length} Result(s)`}
                </Button>
              </div>
            </section>

            {/* Existing Results */}
            <section data-ocid="admin.results.existing_section">
              <div className="flex items-center gap-3 mb-3">
                <Medal className="h-4 w-4 text-accent" />
                <h2 className="font-display font-semibold text-foreground">
                  Current Leaderboard
                </h2>
                <span className="font-mono text-xs text-muted-foreground ml-auto">
                  {matchResults.length} entries
                </span>
              </div>

              <div className="rounded-sm border border-border bg-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-label text-muted-foreground">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-label text-muted-foreground">
                        Player
                      </th>
                      <th className="px-4 py-3 text-center text-label text-muted-foreground">
                        Kills
                      </th>
                      <th className="px-4 py-3 text-right text-label text-muted-foreground">
                        Prize
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsLoading ? (
                      ["r0", "r1", "r2"].map((sk) => (
                        <tr key={sk} className="border-b border-border">
                          {["c0", "c1", "c2", "c3"].map((ck) => (
                            <td key={ck} className="px-4 py-3">
                              <Skeleton className="h-4 w-16 bg-muted" />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : matchResults.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-10 text-center text-muted-foreground"
                          data-ocid="admin.results.empty_state"
                        >
                          <Medal className="h-8 w-8 mx-auto mb-2 opacity-30" />
                          <p className="font-mono text-sm">
                            No results uploaded yet
                          </p>
                        </td>
                      </tr>
                    ) : (
                      [...matchResults]
                        .sort((a, b) => a.rank - b.rank)
                        .map((result, idx) => (
                          <tr
                            key={result.id}
                            className="border-b border-border hover:bg-muted/20 transition-colors"
                            data-ocid={`admin.results.existing.${idx + 1}`}
                          >
                            <td className="px-4 py-3">
                              <span
                                className={`text-lg font-bold font-display ${rankColor(result.rank)}`}
                              >
                                #{result.rank}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-semibold text-foreground">
                                {result.username}
                              </p>
                              <p className="text-xs font-mono text-muted-foreground truncate max-w-[160px]">
                                {result.userId}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-center font-mono text-foreground">
                              {result.kills}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-primary font-semibold">
                              {result.prize > 0 ? `₹${result.prize}` : "—"}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {!selectedMatchId && !matchesLoading && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="admin.results.no_match_selected"
          >
            <BarChart2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-mono text-sm">
              Select a match above to upload results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
