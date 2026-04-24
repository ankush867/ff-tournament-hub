import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, Swords } from "lucide-react";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { MatchCard } from "../components/MatchCard";
import { useMatches } from "../hooks/useBackend";
import type { MatchStatus } from "../types";

const STATUS_FILTERS: { label: string; value: MatchStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Completed", value: "completed" },
];

export default function MatchesPage() {
  const [filter, setFilter] = useState<MatchStatus | "all">("all");
  const [search, setSearch] = useState("");
  const { data: matches, isLoading, error, refetch } = useMatches();

  const filtered = (matches ?? []).filter((m) => {
    const matchesFilter = filter === "all" || m.status === filter;
    const matchesSearch =
      search === "" || m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCount = (matches ?? []).filter((m) => m.status === "open").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-ocid="matches.page">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-label text-muted-foreground mb-1">Browse</p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display font-bold text-2xl uppercase tracking-wide text-foreground">
            All Tournaments
          </h1>
          {!isLoading && openCount > 0 && (
            <span className="font-mono text-xs text-primary border border-primary/40 bg-primary/10 px-2 py-1 uppercase tracking-widest shrink-0">
              {openCount} open
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tournaments…"
            className="pl-9 font-mono text-sm h-10 bg-card border-border"
            aria-label="Search matches"
            data-ocid="matches.search_input"
          />
        </div>

        <div
          className="flex gap-1 flex-wrap"
          role="tablist"
          aria-label="Filter by status"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono uppercase tracking-widest pr-1 hidden sm:flex">
            <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
            Filter:
          </span>
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              type="button"
              key={value}
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors duration-200 ${
                filter === value
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
              }`}
              data-ocid={`matches.filter.${value}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          data-ocid="matches.loading_state"
        >
          {["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((sk) => (
            <Skeleton key={sk} className="h-52" />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage
          title="Failed to load matches"
          message="Could not fetch tournament data. Please try again."
          onRetry={() => refetch()}
        />
      ) : filtered.length === 0 ? (
        <div
          className="border border-dashed border-border py-20 text-center flex flex-col items-center gap-4"
          data-ocid="matches.empty_state"
        >
          <Swords
            className="h-10 w-10 text-muted-foreground/30"
            aria-hidden="true"
          />
          <div>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">
              No matches found
            </p>
            {search && (
              <p className="text-xs text-muted-foreground">
                No results for &quot;{search}&quot;
              </p>
            )}
          </div>
          {(search || filter !== "all") && (
            <div className="flex gap-2">
              {search && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="font-mono text-xs uppercase tracking-widest h-8"
                  data-ocid="matches.clear_search_button"
                >
                  Clear search
                </Button>
              )}
              {filter !== "all" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="font-mono text-xs uppercase tracking-widest h-8"
                  data-ocid="matches.clear_filter_button"
                >
                  All statuses
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">
            {filtered.length} tournament{filtered.length !== 1 ? "s" : ""}
            {filter !== "all" && ` · ${filter}`}
            {search && ` · "${search}"`}
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="matches.list"
          >
            {filtered.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
