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
         {Modality.allModalityTypes
          |> Array.map(modality => {
               switch (config.modalities |> Modality.getValue(modality)) {
               | Some(_) =>
                 <label style={ReactDOMRe.Style.make(~margin="12px", ())}>
                   <input
                     type_="checkbox"
                     checked={answer |> Modality.getValue(modality)}
                     onChange={_ => toggleAnswer(modality)}
                   />
                   {React.string("Same " ++ Modality.getLabel(modality))}
                 </label>
               | None => React.null
               }
             })
          |> React.array}
       </div>;
     } else {
       React.null;
     }}
  </div>;
};
