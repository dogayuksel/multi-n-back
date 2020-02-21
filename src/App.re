[@react.component]
let make = () => {
  let (config, setConfig) =
    React.useState(() => GameConfiguration.makeDefault());
  let (gameState, setGameState) =
    React.useState(() => GameState.makeRandom(config));
  let (stateHistory: GameState.stateHistory, setStateHistory) =
    React.useState(_ => []);
  let (answer, setAnswer) = {
    React.useState(() => Answer.make());
  };
  let (score, setScore) = React.useState(() => 0);
  let (highScore, setHighScore) = React.useState(() => Score.getHighScore());

  let toggleAnswer = modality => {
    setAnswer(currentAnswer => {currentAnswer |> Answer.toggle(modality)});
  };

  let updateModalityConfig = (modality: Modality.t, event: ReactEvent.Form.t) => {
    let value = event->ReactEvent.Form.target##value |> int_of_string_opt;
    setConfig(currentConfig =>
      currentConfig |> GameConfiguration.updateModality(modality, value)
    );
  };

  let updateDepthConfig = (event: ReactEvent.Form.t) => {
    let value = event->ReactEvent.Form.target##value |> int_of_string;
    setConfig(currentConfig =>
      currentConfig |> GameConfiguration.updateDepth(value)
    );
  };

  let advanceState = _ => {
    setStateHistory(currentHistory =>
      if (currentHistory->List.length >= config.depth) {
        switch (
          GameState.compareToHistory(
            answer,
            gameState,
            currentHistory,
            config,
          )
        ) {
        | Some(result) =>
          setScore(score => {
            Score.calculateScore(result, config.depth) + score
          });
          [gameState, ...currentHistory];
        | None =>
          setScore(score => {
            setHighScore(_ => Some(Score.updateHighScore(score)));
            0;
          });
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
    <div className="containerOverview">
      <div className="containerScore">
        <div>
          {switch (stateHistory |> List.length) {
           | 0 => React.string("First Turn!")
           | value => React.string("Turn: " ++ string_of_int(value + 1))
           }}
        </div>
        <div>
          {switch (score) {
           | 0 => React.null
           | value => React.string("Score: " ++ string_of_int(value))
           }}
        </div>
      </div>
      <div className="containerScore">
        {switch (highScore) {
         | None => React.null
         | Some(value) =>
           React.string("High Score: " ++ string_of_int(value))
         }}
      </div>
    </div>
    <Canvas config gameState />
    <div
      style={ReactDOMRe.Style.make(
        ~margin="25px",
        ~display="flex",
        ~justifyContent="center",
        (),
      )}>
      <button onClick=advanceState>
        {List.length(stateHistory) == 0
           ? React.string("Start") : React.string("Next")}
      </button>
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
                 <label
                   key={Modality.getLabel(modality) ++ "_answer"}
                   style={ReactDOMRe.Style.make(~margin="12px", ())}>
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
    {if (List.length(stateHistory) == 0) {
       <div
         style={ReactDOMRe.Style.make(
           ~margin="25px",
           ~display="flex",
           ~flexDirection="column",
           ~justifyContent="center",
           ~alignItems="center",
           (),
         )}>
         <div> {React.string("Configure")} </div>
         {Modality.allModalityTypes
          |> Array.map(modality => {
               <label
                 key={Modality.getLabel(modality) ++ "_config"}
                 style={ReactDOMRe.Style.make(~margin="12px", ())}>
                 {React.string(modality |> Modality.getLabel)}
                 <select
                   onChange={event => updateModalityConfig(modality, event)}
                   value={
                     switch (config.modalities |> Modality.getValue(modality)) {
                     | Some(value) => string_of_int(value)
                     | None => "Disabled"
                     }
                   }>
                   <option value="Disabled">
                     {React.string("Disabled")}
                   </option>
                   <option value="2"> {React.string("2")} </option>
                   <option value="3"> {React.string("3")} </option>
                   <option value="4"> {React.string("4")} </option>
                   <option value="5"> {React.string("5")} </option>
                   <option value="7"> {React.string("7")} </option>
                   <option value="10"> {React.string("10")} </option>
                 </select>
               </label>
             })
          |> React.array}
         <label style={ReactDOMRe.Style.make(~margin="12px", ())}>
           {React.string("Depth")}
           <select
             onChange={event => updateDepthConfig(event)}
             value={string_of_int(config.depth)}>
             <option value="1"> {React.string("1")} </option>
             <option value="2"> {React.string("2")} </option>
             <option value="3"> {React.string("3")} </option>
             <option value="4"> {React.string("4")} </option>
             <option value="5"> {React.string("5")} </option>
           </select>
         </label>
       </div>;
     } else {
       React.null;
     }}
  </div>;
};
