import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type PaymentStatus = { #pending; #approved; #rejected };

  public type Payment = {
    id : Common.PaymentId;
    userId : Common.UserId;
    matchId : Common.MatchId;
    utrNumber : Text;
    screenshot : Storage.ExternalBlob;
    var status : PaymentStatus;
    createdAt : Common.Timestamp;
  };

  public type PaymentPublic = {
    id : Common.PaymentId;
    userId : Common.UserId;
    matchId : Common.MatchId;
    utrNumber : Text;
    screenshot : Storage.ExternalBlob;
    status : PaymentStatus;
    createdAt : Common.Timestamp;
  };

  public type SubmitPaymentInput = {
    matchId : Common.MatchId;
    utrNumber : Text;
    screenshot : Storage.ExternalBlob;
  };
};
