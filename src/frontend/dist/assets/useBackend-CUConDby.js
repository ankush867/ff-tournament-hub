import "./index-DJ3jSp6d.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-DPSn0mZX.js";
function useMatches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getMatches();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useMatch(matchId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getMatch(matchId);
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!matchId
  });
}
function useMyPayments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myPayments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getMyPayments();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getCallerUserProfile();
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false
  });
}
function useMatchResults(matchId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["results", matchId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getMatchResults(matchId);
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!matchId
  });
}
function useAllUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getAllUsers();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useAllPayments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "payments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getAllPayments();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useAllMatches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "matches"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getAllMatches();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useAllResults() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "results"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getAllResults();
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useMyProfile as a,
  useMyPayments as b,
  useMatch as c,
  useMatchResults as d,
  useAllUsers as e,
  useAllMatches as f,
  useAllPayments as g,
  useAllResults as h,
  useMatches as u
};
