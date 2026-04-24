import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/matches";
import Common "../types/common";

module {
  public func generateId(counter : Common.CounterState) : Common.MatchId {
    counter.value += 1;
    let t = Time.now();
    "match-" # t.toText() # "-" # counter.value.toText()
  };

  public func toPublic(match : Types.Match) : Types.MatchPublic {
    {
      id = match.id;
      name = match.name;
      entryFee = match.entryFee;
      prizePool = match.prizePool;
      scheduledTime = match.scheduledTime;
      status = match.status;
      playerCount = match.playerCount;
      createdAt = match.createdAt;
    }
  };

  public func create(
    matches : Map.Map<Common.MatchId, Types.Match>,
    counter : Common.CounterState,
    input : Types.CreateMatchInput,
  ) : Types.MatchPublic {
    if (input.name.size() == 0) Runtime.trap("Match name cannot be empty");
    let matchId = generateId(counter);
    let match : Types.Match = {
      id = matchId;
      var name = input.name;
      var entryFee = input.entryFee;
      var prizePool = input.prizePool;
      var scheduledTime = input.scheduledTime;
      var roomId = input.roomId;
      var roomPassword = input.roomPassword;
      var status = #open;
      var playerCount = 0;
      createdAt = Time.now();
    };
    matches.add(matchId, match);
    toPublic(match)
  };

  public func update(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
    input : Types.UpdateMatchInput,
  ) : Types.MatchPublic {
    let match = switch (matches.get(matchId)) {
      case null Runtime.trap("Match not found");
      case (?m) m;
    };
    switch (input.name) {
      case null {};
      case (?v) { match.name := v };
    };
    switch (input.entryFee) {
      case null {};
      case (?v) { match.entryFee := v };
    };
    switch (input.prizePool) {
      case null {};
      case (?v) { match.prizePool := v };
    };
    switch (input.scheduledTime) {
      case null {};
      case (?v) { match.scheduledTime := v };
    };
    switch (input.roomId) {
      case null {};
      case (?v) { match.roomId := v };
    };
    switch (input.roomPassword) {
      case null {};
      case (?v) { match.roomPassword := v };
    };
    toPublic(match)
  };

  public func delete(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
  ) : () {
    switch (matches.get(matchId)) {
      case null Runtime.trap("Match not found");
      case (?_) {};
    };
    matches.remove(matchId);
  };

  public func close(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
  ) : () {
    let match = switch (matches.get(matchId)) {
      case null Runtime.trap("Match not found");
      case (?m) m;
    };
    match.status := #closed;
  };

  public func getById(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
  ) : ?Types.MatchPublic {
    switch (matches.get(matchId)) {
      case null null;
      case (?match) ?toPublic(match);
    }
  };

  public func listAll(
    matches : Map.Map<Common.MatchId, Types.Match>,
  ) : [Types.MatchPublic] {
    let result = List.empty<Types.MatchPublic>();
    for ((_, match) in matches.entries()) {
      result.add(toPublic(match));
    };
    result.toArray()
  };

  public func getCredentials(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
  ) : ?Types.MatchCredentials {
    switch (matches.get(matchId)) {
      case null null;
      case (?match) ?{ roomId = match.roomId; roomPassword = match.roomPassword };
    }
  };

  public func incrementPlayerCount(
    matches : Map.Map<Common.MatchId, Types.Match>,
    matchId : Common.MatchId,
  ) : () {
    let match = switch (matches.get(matchId)) {
      case null Runtime.trap("Match not found");
      case (?m) m;
    };
    match.playerCount += 1;
  };
};
