type gameState = {
  position: option(int),
  color: option(int),
  icon: option(int),
};

let advanceState = (configuration: GameConfiguration.t): gameState => {
  Random.self_init();
  {
    position:
      configuration.position
      ->Belt.Option.map(value => Random.int(value * value)),
    color: configuration.color->Belt.Option.map(Random.int),
    icon: configuration.icon->Belt.Option.map(Random.int),
  };
};

type t = gameState;
