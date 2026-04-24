import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/matches";
import UserTypes "../types/users";
import PaymentTypes "../types/payments";
import Common "../types/common";
import MatchLib "../lib/matches";
import PaymentLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  matches : Map.Map<Common.MatchId, Types.Match>,
  payments : Map.Map<Common.PaymentId, PaymentTypes.Payment>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalToUserId : Map.Map<Principal, Common.UserId>,
  matchIdCounter : Common.CounterState,
) {
  /// Public: list all matches
  public query func listMatches() : async [Types.MatchPublic] {
    MatchLib.listAll(matches)
  };

  /// Public: get a single match by id
  public query func getMatch(matchId : Common.MatchId) : async ?Types.MatchPublic {
    MatchLib.getById(matches, matchId)
  };

  /// Get list of user IDs who have approved payments for a match (admin only)
  public query ({ caller }) func getMatchPlayers(matchId : Common.MatchId) : async [Common.UserId] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let result = List.empty<Common.UserId>();
    for ((_, p) in payments.entries()) {
      if (p.matchId == matchId and p.status == #approved) {
        result.add(p.userId);
      };
    };
    result.toArray()
  };

  /// Get room credentials — only available if caller has approved payment or is admin
  public query ({ caller }) func getRoomCredentials(matchId : Common.MatchId) : async Types.MatchCredentials {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    if (not isAdmin) {
      let userId = switch (principalToUserId.get(caller)) {
        case null Runtime.trap("Not registered");
        case (?id) id;
      };
      if (not PaymentLib.hasApprovedPayment(payments, userId, matchId)) {
        Runtime.trap("Access denied: No approved payment for this match");
      };
    };
    switch (MatchLib.getCredentials(matches, matchId)) {
      case null Runtime.trap("Match not found");
      case (?creds) creds;
    }
  };

  /// Admin: create a new match
  public shared ({ caller }) func createMatch(input : Types.CreateMatchInput) : async Types.MatchPublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    MatchLib.create(matches, matchIdCounter, input)
  };

  /// Admin: update match details
  public shared ({ caller }) func updateMatch(matchId : Common.MatchId, input : Types.UpdateMatchInput) : async Types.MatchPublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    MatchLib.update(matches, matchId, input)
  };

  /// Admin: delete a match
  public shared ({ caller }) func deleteMatch(matchId : Common.MatchId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    MatchLib.delete(matches, matchId)
  };

  /// Admin: close a match (no more registrations)
  public shared ({ caller }) func closeMatch(matchId : Common.MatchId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    MatchLib.close(matches, matchId)
  };
};
