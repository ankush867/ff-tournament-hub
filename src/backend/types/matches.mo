import Common "common";

module {
  public type MatchStatus = { #open; #closed; #completed };

  public type Match = {
    id : Common.MatchId;
    var name : Text;
    var entryFee : Nat;
    var prizePool : Nat;
    var scheduledTime : Common.Timestamp;
    var roomId : Text;
    var roomPassword : Text;
    var status : MatchStatus;
    var playerCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type MatchPublic = {
    id : Common.MatchId;
    name : Text;
    entryFee : Nat;
    prizePool : Nat;
    scheduledTime : Common.Timestamp;
    status : MatchStatus;
    playerCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type MatchCredentials = {
    roomId : Text;
    roomPassword : Text;
  };

  public type CreateMatchInput = {
    name : Text;
    entryFee : Nat;
    prizePool : Nat;
    scheduledTime : Common.Timestamp;
    roomId : Text;
    roomPassword : Text;
  };

  public type UpdateMatchInput = {
    name : ?Text;
    entryFee : ?Nat;
    prizePool : ?Nat;
    scheduledTime : ?Common.Timestamp;
    roomId : ?Text;
    roomPassword : ?Text;
  };
};
