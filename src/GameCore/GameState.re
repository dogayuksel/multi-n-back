type gameState = {
  position: option(int),
  color: option(int),
  icon: option(int),
};

type t = gameState;

type stateHistory = list(gameState);

let makeState = (configuration: GameConfiguration.t): t => {
  Random.self_init();
  {
    position:
      configuration.position
      ->Belt.Option.map(value => Random.int(value * value)),
    color: configuration.color->Belt.Option.map(Random.int),
    icon: configuration.icon->Belt.Option.map(Random.int),
  };
};

let compareValue =
    (
      modalityConfig: option(int),
      modalityAnswer: bool,
      modalityOldValue: option(int),
      modalityValue: option(int),
    ) =>
  switch (modalityConfig, modalityAnswer, modalityOldValue, modalityValue) {
  | (Some(_), isSame, Some(oldValue), Some(value)) =>
    oldValue == value == isSame
  | _ => true
  };

let compareToHistory =
    (
      answer: Answer.answer,
      gameState: t,
      stateHistory: stateHistory,
      configuration: GameConfiguration.t,
    ) => {
  let oldState = stateHistory->List.nth(configuration.depth - 1);
  compareValue(
    configuration.position,
    answer.position,
    oldState.position,
    gameState.position,
  )
  && compareValue(
       configuration.color,
       answer.color,
       oldState.color,
       gameState.color,
     )
  && compareValue(
       configuration.icon,
       answer.icon,
       oldState.icon,
       gameState.icon,
     );
};
