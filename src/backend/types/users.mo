import Common "common";

module {
  public type UserStatus = { #active; #suspended };

  public type User = {
    id : Common.UserId;
    var username : Text;
    contact : Text;
    var ffUid : Text;
    var passwordHash : Text;
    var walletBalance : Nat;
    var status : UserStatus;
    createdAt : Common.Timestamp;
  };

  public type UserPublic = {
    id : Common.UserId;
    username : Text;
    contact : Text;
    ffUid : Text;
    walletBalance : Nat;
    status : UserStatus;
    createdAt : Common.Timestamp;
  };

  public type RegisterInput = {
    username : Text;
    contact : Text;
    ffUid : Text;
    password : Text;
  };

  public type UpdateProfileInput = {
    username : ?Text;
    ffUid : ?Text;
    password : ?Text;
  };
};
