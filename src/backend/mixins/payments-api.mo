import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/payments";
import MatchTypes "../types/matches";
import UserTypes "../types/users";
import Common "../types/common";
import PaymentLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payments : Map.Map<Common.PaymentId, Types.Payment>,
  matches : Map.Map<Common.MatchId, MatchTypes.Match>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalToUserId : Map.Map<Principal, Common.UserId>,
  paymentIdCounter : Common.CounterState,
) {
  /// User: submit a payment (UTR + screenshot) for a match
  public shared ({ caller }) func submitPayment(input : Types.SubmitPaymentInput) : async Types.PaymentPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let userId = switch (principalToUserId.get(caller)) {
      case null Runtime.trap("Not registered as a player");
      case (?id) id;
    };
    // Check user is not suspended
    switch (users.get(userId)) {
      case null Runtime.trap("User not found");
      case (?user) {
        if (user.status == #suspended) Runtime.trap("Account is suspended");
      };
    };
    // Check match is open
    switch (matches.get(input.matchId)) {
      case null Runtime.trap("Match not found");
      case (?match) {
        if (match.status != #open) Runtime.trap("Match is not open for registration");
      };
    };
    let paymentPublic = PaymentLib.submit(payments, paymentIdCounter, userId, input);
    paymentPublic
  };

  /// User: list caller's own payments
  public query ({ caller }) func getMyPayments() : async [Types.PaymentPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let userId = switch (principalToUserId.get(caller)) {
      case null return [];
      case (?id) id;
    };
    PaymentLib.listByUser(payments, userId)
  };

  /// Admin: list all payments
  public query ({ caller }) func listAllPayments() : async [Types.PaymentPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    PaymentLib.listAll(payments)
  };

  /// Admin: list payments for a specific match
  public query ({ caller }) func listPaymentsByMatch(matchId : Common.MatchId) : async [Types.PaymentPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    PaymentLib.listByMatch(payments, matchId)
  };

  /// Admin: approve a payment (also increments match playerCount)
  public shared ({ caller }) func approvePayment(paymentId : Common.PaymentId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    PaymentLib.approve(payments, matches, paymentId)
  };

  /// Admin: reject a payment
  public shared ({ caller }) func rejectPayment(paymentId : Common.PaymentId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    PaymentLib.reject(payments, paymentId)
  };
};
