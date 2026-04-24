import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/payments";
import MatchTypes "../types/matches";
import MatchLib "matches";
import Common "../types/common";

module {
  public func generateId(counter : Common.CounterState) : Common.PaymentId {
    counter.value += 1;
    let t = Time.now();
    "pay-" # t.toText() # "-" # counter.value.toText()
  };

  public func toPublic(payment : Types.Payment) : Types.PaymentPublic {
    {
      id = payment.id;
      userId = payment.userId;
      matchId = payment.matchId;
      utrNumber = payment.utrNumber;
      screenshot = payment.screenshot;
      status = payment.status;
      createdAt = payment.createdAt;
    }
  };

  public func submit(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    counter : Common.CounterState,
    userId : Common.UserId,
    input : Types.SubmitPaymentInput,
  ) : Types.PaymentPublic {
    // Check for duplicate pending/approved payment for this user+match
    for ((_, p) in payments.entries()) {
      if (p.userId == userId and p.matchId == input.matchId) {
        switch (p.status) {
          case (#pending) Runtime.trap("You already have a pending payment for this match");
          case (#approved) Runtime.trap("You already have an approved payment for this match");
          case (#rejected) {}; // rejected allows resubmission
        };
      };
    };
    if (input.utrNumber.size() == 0) Runtime.trap("UTR number cannot be empty");

    let paymentId = generateId(counter);
    let payment : Types.Payment = {
      id = paymentId;
      userId = userId;
      matchId = input.matchId;
      utrNumber = input.utrNumber;
      screenshot = input.screenshot;
      var status = #pending;
      createdAt = Time.now();
    };
    payments.add(paymentId, payment);
    toPublic(payment)
  };

  public func approve(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    matches : Map.Map<Common.MatchId, MatchTypes.Match>,
    paymentId : Common.PaymentId,
  ) : () {
    let payment = switch (payments.get(paymentId)) {
      case null Runtime.trap("Payment not found");
      case (?p) p;
    };
    if (payment.status != #pending) Runtime.trap("Payment is not in pending status");
    payment.status := #approved;
    MatchLib.incrementPlayerCount(matches, payment.matchId);
  };

  public func reject(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    paymentId : Common.PaymentId,
  ) : () {
    let payment = switch (payments.get(paymentId)) {
      case null Runtime.trap("Payment not found");
      case (?p) p;
    };
    if (payment.status != #pending) Runtime.trap("Payment is not in pending status");
    payment.status := #rejected;
  };

  public func listAll(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
  ) : [Types.PaymentPublic] {
    let result = List.empty<Types.PaymentPublic>();
    for ((_, p) in payments.entries()) {
      result.add(toPublic(p));
    };
    result.toArray()
  };

  public func listByUser(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    userId : Common.UserId,
  ) : [Types.PaymentPublic] {
    let result = List.empty<Types.PaymentPublic>();
    for ((_, p) in payments.entries()) {
      if (p.userId == userId) result.add(toPublic(p));
    };
    result.toArray()
  };

  public func listByMatch(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    matchId : Common.MatchId,
  ) : [Types.PaymentPublic] {
    let result = List.empty<Types.PaymentPublic>();
    for ((_, p) in payments.entries()) {
      if (p.matchId == matchId) result.add(toPublic(p));
    };
    result.toArray()
  };

  public func hasApprovedPayment(
    payments : Map.Map<Common.PaymentId, Types.Payment>,
    userId : Common.UserId,
    matchId : Common.MatchId,
  ) : Bool {
    for ((_, p) in payments.entries()) {
      if (p.userId == userId and p.matchId == matchId and p.status == #approved) {
        return true;
      };
    };
    false
  };
};
