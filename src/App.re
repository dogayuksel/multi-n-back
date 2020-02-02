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
  let stateHistory = React.useRef([]);

  let advanceState = _ => {
    let currentHistory = React.Ref.current(stateHistory);
    stateHistory->React.Ref.setCurrent([gameState, ...currentHistory]);
    setGameState(_ => GameState.advanceState(gameConfiguration));
  };

  <div>
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
