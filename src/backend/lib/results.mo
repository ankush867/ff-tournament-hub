import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/results";
import Common "../types/common";

module {
  public func generateId(counter : Common.CounterState) : Common.ResultId {
    counter.value += 1;
    let t = Time.now();
    "res-" # t.toText() # "-" # counter.value.toText()
  };

  public func uploadBatch(
    results : Map.Map<Common.ResultId, Types.Result>,
    counter : Common.CounterState,
    matchId : Common.MatchId,
    entries : [Types.ResultInput],
  ) : [Types.Result] {
    // Clear existing results for this match
    let toRemove = List.empty<Common.ResultId>();
    for ((rid, r) in results.entries()) {
      if (r.matchId == matchId) toRemove.add(rid);
    };
    for (rid in toRemove.values()) {
      results.remove(rid);
    };

    // Insert new batch
    let inserted = List.empty<Types.Result>();
    for (entry in entries.vals()) {
      let resultId = generateId(counter);
      let result : Types.Result = {
        id = resultId;
        matchId = matchId;
        userId = entry.userId;
        username = entry.username;
        rank = entry.rank;
        kills = entry.kills;
        prize = entry.prize;
      };
      results.add(resultId, result);
      inserted.add(result);
    };
    inserted.toArray()
  };

  public func listByMatch(
    results : Map.Map<Common.ResultId, Types.Result>,
    matchId : Common.MatchId,
  ) : [Types.Result] {
    let out = List.empty<Types.Result>();
    for ((_, r) in results.entries()) {
      if (r.matchId == matchId) out.add(r);
    };
    out.toArray()
  };
};
