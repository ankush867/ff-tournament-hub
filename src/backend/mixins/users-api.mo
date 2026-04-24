import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/users";
import Common "../types/common";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, Types.User>,
  usernameIndex : Map.Map<Text, Common.UserId>,
  contactIndex : Map.Map<Text, Common.UserId>,
  principalToUserId : Map.Map<Principal, Common.UserId>,
  userIdCounter : Common.CounterState,
) {
  /// Register a new user account — links the caller's principal to their new userId
  public shared ({ caller }) func register(input : Types.RegisterInput) : async Types.UserPublic {
    if (caller.isAnonymous()) Runtime.trap("Must be authenticated to register");
    // Prevent double-registration for same principal
    if (principalToUserId.get(caller) != null) Runtime.trap("Principal already registered");
    let userPublic = UserLib.register(users, usernameIndex, contactIndex, userIdCounter, input);
    principalToUserId.add(caller, userPublic.id);
    userPublic
  };

  /// Login with identifier (username or contact) and password; returns user if valid
  public shared ({ caller }) func loginUser(identifier : Text, password : Text) : async ?Types.UserPublic {
    UserLib.login(users, contactIndex, usernameIndex, identifier, password)
  };

  /// Get the calling user's own profile
  public query ({ caller }) func getMyProfile() : async ?Types.UserPublic {
    switch (principalToUserId.get(caller)) {
      case null null;
      case (?userId) UserLib.getById(users, userId);
    }
  };

  /// Update the calling user's profile fields
  public shared ({ caller }) func updateMyProfile(input : Types.UpdateProfileInput) : async Types.UserPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let userId = switch (principalToUserId.get(caller)) {
      case null Runtime.trap("No profile found for caller");
      case (?id) id;
    };
    UserLib.updateProfile(users, usernameIndex, userId, input)
  };

  /// Admin: list all users
  public query ({ caller }) func listUsers() : async [Types.UserPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.listAll(users)
  };

  /// Admin: get user by id
  public query ({ caller }) func getUserById(userId : Common.UserId) : async ?Types.UserPublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.getById(users, userId)
  };

  /// Admin: suspend a user
  public shared ({ caller }) func suspendUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.setStatus(users, userId, #suspended)
  };

  /// Admin: unsuspend a user
  public shared ({ caller }) func unsuspendUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.setStatus(users, userId, #active)
  };
};
