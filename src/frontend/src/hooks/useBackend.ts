import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Match, Payment, Result, User } from "../types";

// ---------------------------------------------------------------------------
// Matches
// ---------------------------------------------------------------------------

export function useMatches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getMatches: () => Promise<Match[]> }
        ).getMatches();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMatch(matchId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Match | null>({
    queryKey: ["match", matchId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await (
          actor as unknown as {
            getMatch: (id: string) => Promise<Match | null>;
          }
        ).getMatch(matchId);
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!matchId,
  });
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export function useMyPayments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Payment[]>({
    queryKey: ["myPayments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getMyPayments: () => Promise<Payment[]> }
        ).getMyPayments();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPayment() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (payload: {
      matchId: string;
      utrNumber: string;
      screenshotUrl: string;
      amount: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          submitPayment: (p: typeof payload) => Promise<void>;
        }
      ).submitPayment(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPayments"] });
    },
  });
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<User | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await (
          actor as unknown as {
            getCallerUserProfile: () => Promise<User | null>;
          }
        ).getCallerUserProfile();
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// ---------------------------------------------------------------------------
// Results / Leaderboard
// ---------------------------------------------------------------------------

export function useMatchResults(matchId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Result[]>({
    queryKey: ["results", matchId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as {
            getMatchResults: (id: string) => Promise<Result[]>;
          }
        ).getMatchResults(matchId);
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!matchId,
  });
}

// ---------------------------------------------------------------------------
// Admin hooks
// ---------------------------------------------------------------------------

export function useAllUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<User[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getAllUsers: () => Promise<User[]> }
        ).getAllUsers();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPayments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Payment[]>({
    queryKey: ["admin", "payments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getAllPayments: () => Promise<Payment[]> }
        ).getAllPayments();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllMatches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Match[]>({
    queryKey: ["admin", "matches"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getAllMatches: () => Promise<Match[]> }
        ).getAllMatches();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllResults() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Result[]>({
    queryKey: ["admin", "results"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getAllResults: () => Promise<Result[]> }
        ).getAllResults();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}
