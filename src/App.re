[@react.component]
let make = () => {
  let (gameConfiguration, _setGameConfiguration) =
    React.useState(() => GameConfiguration.getDefaultConfig());
  let (gameState, setGameState) =
    React.useState(() => GameState.makeState(gameConfiguration));
  let (stateHistory: GameState.stateHistory, setStateHistory) =
    React.useState(_ => []);
  let (answer, setAnswer) = {
    React.useState(() => Answer.make());
  };

  let toggleAnswer = modality => {
    setAnswer(currentAnswers => {
      currentAnswers |> Answer.toggleAnswer(modality)
    });
  };

  let advanceState = _ => {
    setStateHistory(currentHistory =>
      if (currentHistory->List.length >= gameConfiguration.depth) {
        if (GameState.compareToHistory(
              answer,
              gameState,
              currentHistory,
              gameConfiguration,
            )) {
          [gameState, ...currentHistory];
        } else {
          [];
        };
      } else {
        [gameState, ...currentHistory];
      }
    );
    setAnswer(_ => Answer.make());
    setGameState(_ => GameState.makeState(gameConfiguration));
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
    {if (List.length(stateHistory) >= gameConfiguration.depth) {
       <div
         style={ReactDOMRe.Style.make(
           ~margin="25px",
           ~display="flex",
           ~justifyContent="center",
           (),
         )}>
         {switch (gameConfiguration.position) {
          | Some(_) =>
            <label>
              <input
                onChange={_ => toggleAnswer(Modality.Position)}
                type_="checkbox"
                checked={answer.position}
              />
              {React.string("Same Position")}
            </label>
          | None => React.null
          }}
         {switch (gameConfiguration.color) {
          | Some(_) =>
            <label>
              <input
                onChange={_ => toggleAnswer(Modality.Color)}
                type_="checkbox"
                checked={answer.color}
              />
              {React.string("Same Color")}
            </label>
          | None => React.null
          }}
         {switch (gameConfiguration.icon) {
          | Some(_) =>
            <label>
              <input
                onChange={_ => toggleAnswer(Modality.Icon)}
                type_="checkbox"
                checked={answer.icon}
              />
              {React.string("Same Icon")}
            </label>
          | None => React.null
          }}
       </div>;
     } else {
       React.null;
     }}
  </div>;
};
