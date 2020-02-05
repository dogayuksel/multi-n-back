[@react.component]
let make = () => {
  let (config, _setConfig) =
    React.useState(() => GameConfiguration.makeDefault());
  let (gameState, setGameState) =
    React.useState(() => GameState.makeRandom(config));
  let (stateHistory: GameState.stateHistory, setStateHistory) =
    React.useState(_ => []);
  let (answer, setAnswer) = {
    React.useState(() => Answer.make());
  };

  let toggleAnswer = modality => {
    setAnswer(currentAnswer => {currentAnswer |> Answer.toggle(modality)});
  };

  let advanceState = _ => {
    setStateHistory(currentHistory =>
      if (currentHistory->List.length >= config.depth) {
        if (GameState.compareToHistory(
              answer,
              gameState,
              currentHistory,
              config,
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
    setGameState(_ => GameState.makeRandom(config));
  };

  <div>
    <div style={ReactDOMRe.Style.make(~margin="20px 10px", ())}>
      {switch (stateHistory |> List.length) {
       | 0 => React.string("First Turn!")
       | value => React.string("Turn: " ++ string_of_int(value + 1))
       }}
    </div>
    <Canvas config gameState />
    <div
      style={ReactDOMRe.Style.make(
        ~margin="25px",
        ~display="flex",
        ~justifyContent="center",
        (),
      )}>
      <button onClick=advanceState> {React.string("Next")} </button>
    </div>
    {if (List.length(stateHistory) >= config.depth) {
       <div
         style={ReactDOMRe.Style.make(
           ~margin="25px",
           ~display="flex",
           ~justifyContent="center",
           (),
         )}>
         {switch (Modality.getValue(Position, config.modalities)) {
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
         {switch (Modality.getValue(Color, config.modalities)) {
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
         {switch (Modality.getValue(Icon, config.modalities)) {
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
