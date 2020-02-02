[@react.component]
let make = () => {
  let (gameConfiguration, _setGameConfiguration) =
    React.useState(() =>
      GameConfiguration.{position: Some(4), color: Some(4), icon: Some(4)}
    );
  let (gameState, _setGameState) =
    React.useState(() =>
      GameState.{position: Some(0), color: Some(0), icon: Some(0)}
    );

  <Canvas gameConfiguration gameState />;
};
