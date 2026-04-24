import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Types "../types/users";
import Common "../types/common";

module {
  public func generateId(counter : Common.CounterState) : Common.UserId {
    counter.value += 1;
    let t = Time.now();
    (t.toText() # "-" # counter.value.toText())
  };

  /// Hash a password using a character-folding scheme with a fixed salt.
  /// Simple deterrent suitable for IC canister state.
  public func hashPassword(password : Text) : Text {
    let salted = "ff-tournament-salt-2024:" # password;
    var h : Nat = 5381;
    for (c in salted.toIter()) {
      let code = Nat.fromNat32(c.toNat32());
      h := ((h * 33) + code) % 4294967296;
    };
    h.toText()
  };

  public func verifyPassword(password : Text, hash : Text) : Bool {
    hashPassword(password) == hash
  };

  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      id = user.id;
      username = user.username;
      contact = user.contact;
      ffUid = user.ffUid;
      walletBalance = user.walletBalance;
      status = user.status;
      createdAt = user.createdAt;
    }
  };

  public func register(
    users : Map.Map<Common.UserId, Types.User>,
    usernameIndex : Map.Map<Text, Common.UserId>,
    contactIndex : Map.Map<Text, Common.UserId>,
    counter : Common.CounterState,
    input : Types.RegisterInput,
  ) : Types.UserPublic {
    // Validate uniqueness
    if (usernameIndex.get(input.username) != null) {
      Runtime.trap("Username already taken");
    };
    if (contactIndex.get(input.contact) != null) {
      Runtime.trap("Contact already registered");
    };
    if (input.username.size() == 0) {
      Runtime.trap("Username cannot be empty");
    };
    if (input.password.size() < 6) {
      Runtime.trap("Password must be at least 6 characters");
    };

    let userId = generateId(counter);
    let user : Types.User = {
      id = userId;
      var username = input.username;
      contact = input.contact;
      var ffUid = input.ffUid;
      var passwordHash = hashPassword(input.password);
      var walletBalance = 0;
      var status = #active;
      createdAt = Time.now();
    };
    users.add(userId, user);
    usernameIndex.add(input.username, userId);
    contactIndex.add(input.contact, userId);
    toPublic(user)
  };

  public func login(
    users : Map.Map<Common.UserId, Types.User>,
    contactIndex : Map.Map<Text, Common.UserId>,
    usernameIndex : Map.Map<Text, Common.UserId>,
    identifier : Text,
    password : Text,
  ) : ?Types.UserPublic {
    // Try contact first, then username
    let maybeId = switch (contactIndex.get(identifier)) {
      case (?id) ?id;
      case null usernameIndex.get(identifier);
    };
    switch (maybeId) {
      case null null;
      case (?userId) {
        switch (users.get(userId)) {
          case null null;
          case (?user) {
            if (verifyPassword(password, user.passwordHash)) {
              ?toPublic(user)
            } else {
              null
            }
          };
        }
      };
    }
  };

  public func getById(
    users : Map.Map<Common.UserId, Types.User>,
    userId : Common.UserId,
  ) : ?Types.UserPublic {
    switch (users.get(userId)) {
      case null null;
      case (?user) ?toPublic(user);
    }
  };

  public func updateProfile(
    users : Map.Map<Common.UserId, Types.User>,
    usernameIndex : Map.Map<Text, Common.UserId>,
    userId : Common.UserId,
    input : Types.UpdateProfileInput,
  ) : Types.UserPublic {
    let user = switch (users.get(userId)) {
      case null Runtime.trap("User not found");
      case (?u) u;
    };
    switch (input.username) {
      case null {};
      case (?newName) {
        if (newName != user.username) {
          if (usernameIndex.get(newName) != null) {
            Runtime.trap("Username already taken");
          };
          usernameIndex.remove(user.username);
          usernameIndex.add(newName, userId);
          user.username := newName;
        };
      };
    };
    switch (input.ffUid) {
      case null {};
      case (?uid) { user.ffUid := uid };
    };
    switch (input.password) {
      case null {};
      case (?pw) {
        if (pw.size() < 6) Runtime.trap("Password must be at least 6 characters");
        user.passwordHash := hashPassword(pw);
      };
    };
    toPublic(user)
  };

  public func setStatus(
    users : Map.Map<Common.UserId, Types.User>,
    userId : Common.UserId,
    status : Types.UserStatus,
  ) : () {
    let user = switch (users.get(userId)) {
      case null Runtime.trap("User not found");
      case (?u) u;
    };
    user.status := status;
  };

  public func listAll(
    users : Map.Map<Common.UserId, Types.User>,
  ) : [Types.UserPublic] {
    let result = List.empty<Types.UserPublic>();
    for ((_, user) in users.entries()) {
      result.add(toPublic(user));
    };
    result.toArray()
  };
};
