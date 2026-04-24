import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import UserTypes "types/users";
import MatchTypes "types/matches";
import PaymentTypes "types/payments";
import ResultTypes "types/results";
import Common "types/common";
import UsersMixin "mixins/users-api";
import MatchesMixin "mixins/matches-api";
import PaymentsMixin "mixins/payments-api";
import ResultsMixin "mixins/results-api";

actor {
  // Authorization state (required by MixinAuthorization)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (required by MixinObjectStorage)
  include MixinObjectStorage();

  // ID counters — mutable records so mixins can increment by reference
  let userIdCounter = Common.initCounter();
  let matchIdCounter = Common.initCounter();
  let paymentIdCounter = Common.initCounter();
  let resultIdCounter = Common.initCounter();

  // Core domain state
  let users = Map.empty<Common.UserId, UserTypes.User>();
  let usernameIndex = Map.empty<Text, Common.UserId>();
  let contactIndex = Map.empty<Text, Common.UserId>();
  let principalToUserId = Map.empty<Principal, Common.UserId>();

  let matches = Map.empty<Common.MatchId, MatchTypes.Match>();

  let payments = Map.empty<Common.PaymentId, PaymentTypes.Payment>();

  let results = Map.empty<Common.ResultId, ResultTypes.Result>();

  // Domain mixins
  include UsersMixin(accessControlState, users, usernameIndex, contactIndex, principalToUserId, userIdCounter);
  include MatchesMixin(accessControlState, matches, payments, users, principalToUserId, matchIdCounter);
  include PaymentsMixin(accessControlState, payments, matches, users, principalToUserId, paymentIdCounter);
  include ResultsMixin(accessControlState, results, resultIdCounter);
};
