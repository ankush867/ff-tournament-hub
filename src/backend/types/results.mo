import Common "common";

module {
  public type Result = {
    id : Common.ResultId;
    matchId : Common.MatchId;
    userId : Common.UserId;
    username : Text;
    rank : Nat;
    kills : Nat;
    prize : Nat;
  };

  public type ResultInput = {
    userId : Common.UserId;
    username : Text;
    rank : Nat;
    kills : Nat;
    prize : Nat;
  };
};
