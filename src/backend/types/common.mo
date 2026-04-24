module {
  public type UserId = Text;
  public type MatchId = Text;
  public type PaymentId = Text;
  public type ResultId = Text;
  public type Timestamp = Int;

  /// Mutable counter state — passed by reference so mixins can increment
  public type CounterState = { var value : Nat };
  public func initCounter() : CounterState = { var value = 0 };
};
