[@react.component]
let make = () => {
  let (gameConfiguration, _setGameConfiguration) =
    React.useState(() =>
      GameConfiguration.{position: Some(4), color: Some(4), icon: Some(4)}
    );
  let (gameState, setGameState) =
    React.useState(() =>
      GameState.{position: Some(0), color: Some(0), icon: Some(0)}
    );
  let (stateHistory, setStateHistory) = React.useState(_ => []);

  let advanceState = _ => {
    setStateHistory(currentHistory => [gameState, ...currentHistory]);
    setGameState(_ => GameState.advanceState(gameConfiguration));
  };

  <div>
    <div style={ReactDOMRe.Style.make(~margin="20px 10px", ())}>
      {switch (stateHistory |> List.length) {
       | 0 => React.string("First Turn!")
       | value => React.string("Turn: " ++ string_of_int(value + 1))
       }}
    </div>
    <Canvas gameConfiguration gameState />
    <div
      style={ReactDOMRe.Style.make(
        ~margin="25px",
        ~display="flex",
        ~justifyContent="center",
        (),
      )}>
      <button onClick=advanceState> {React.string("Next")} </button>
    </div>
  </div>;
};
