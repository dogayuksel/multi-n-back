type answer = {
  position: bool,
  color: bool,
  icon: bool,
};

[@react.component]
let make = () => {
  let (gameConfiguration, _setGameConfiguration) =
    React.useState(() => GameConfiguration.getDefaultConfig());
  let (gameState, setGameState) =
    React.useState(() => GameState.advanceState(gameConfiguration));
  let (stateHistory: list(GameState.t), setStateHistory) =
    React.useState(_ => []);
  let (answers, setAnswers) = {
    React.useState(() => {position: false, color: false, icon: false});
  };

  let toggleAnswer = modality => {
    setAnswers(currentAnswers => {
      switch (modality) {
      | Modality.Position => {
          ...currentAnswers,
          position: !currentAnswers.position,
        }
      | Modality.Color => {...currentAnswers, color: !currentAnswers.color}
      | Modality.Icon => {...currentAnswers, icon: !currentAnswers.icon}
      }
    });
  };

  let advanceState = _ => {
    setStateHistory(currentHistory =>
      if (currentHistory->List.length >= gameConfiguration.depth) {
        let oldState = currentHistory->List.nth(gameConfiguration.depth - 1);
        let positionResult =
          switch (
            gameConfiguration.position,
            answers.position,
            oldState.position,
            gameState.position,
          ) {
          | (Some(_), isSame, Some(oldActual), Some(newActual)) =>
            oldActual == newActual == isSame
          | _ => true
          };
        let colorResult =
          switch (
            gameConfiguration.color,
            answers.color,
            oldState.color,
            gameState.color,
          ) {
          | (Some(_), isSame, Some(oldActual), Some(newActual)) =>
            oldActual == newActual == isSame
          | _ => true
          };
        let iconResult =
          switch (
            gameConfiguration.icon,
            answers.icon,
            oldState.icon,
            gameState.icon,
          ) {
          | (Some(_), isSame, Some(oldActual), Some(newActual)) =>
            oldActual == newActual == isSame
          | _ => true
          };
        if (positionResult && colorResult && iconResult) {
          [gameState, ...currentHistory];
        } else {
          [];
        };
      } else {
        [gameState, ...currentHistory];
      }
    );
    setAnswers(_ => {{position: false, color: false, icon: false}});
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
                checked={answers.position}
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
                checked={answers.color}
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
                checked={answers.icon}
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
