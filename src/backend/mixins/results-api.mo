import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/results";
import Common "../types/common";
import ResultLib "../lib/results";

mixin (
  accessControlState : AccessControl.AccessControlState,
  results : Map.Map<Common.ResultId, Types.Result>,
  resultIdCounter : Common.CounterState,
) {
  /// Admin: upload batch result entries for a match (clears existing results first)
  public shared ({ caller }) func uploadResults(matchId : Common.MatchId, entries : [Types.ResultInput]) : async [Types.Result] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    ResultLib.uploadBatch(results, resultIdCounter, matchId, entries)
  };

  /// Public: get leaderboard results for a match
  public query func getMatchResults(matchId : Common.MatchId) : async [Types.Result] {
    ResultLib.listByMatch(results, matchId)
  };
};
