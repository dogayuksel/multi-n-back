type state = {
  config: GameConfiguration.t,
  gameState: GameState.t,
  stateHistory: GameState.stateHistory,
  answer: Answer.t,
  score: int,
  highScore: option(int),
};

type action =
  | UpdateDepthConfig(int)
  | UpdateModalityConfig(Modality.t, option(int))
  | UpdateAnswer(Answer.t)
  | AdvanceTurn;

let initialConfig = GameConfiguration.makeDefault();

let initialState: state = {
  config: initialConfig,
  gameState: GameState.makeRandom(initialConfig),
  stateHistory: [],
  answer: Answer.make(),
  score: 0,
  highScore: Score.getHighScore(),
};

let reducer = (state: state, action: action): state => {
  switch (action) {
  | UpdateDepthConfig(value) => {
      ...state,
      config: state.config |> GameConfiguration.updateDepth(value),
    }
  | UpdateModalityConfig(modality, value) => {
      ...state,
      config:
        state.config |> GameConfiguration.updateModality(modality, value),
    }
  | UpdateAnswer(answer) => {...state, answer}
  | AdvanceTurn =>
    let partiallyUpdatedState =
      if (state.stateHistory->List.length >= state.config.depth) {
        switch (
          GameState.compareToHistory(
            state.answer,
            state.gameState,
            state.stateHistory,
            state.config,
          )
        ) {
        | Some(result) => {
            ...state,
            stateHistory: [state.gameState, ...state.stateHistory],
            score:
              Score.calculateScore(result, state.config.depth) + state.score,
          }
        | None => {
            ...state,
            stateHistory: [],
            score: 0,
            highScore: Some(Score.updateHighScore(state.score)),
          }
        };
      } else {
        {...state, stateHistory: [state.gameState, ...state.stateHistory]};
      };
    {
      ...partiallyUpdatedState,
      answer: Answer.make(),
      gameState: GameState.makeRandom(state.config),
    };
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  let toggleAnswer = modality => {
    dispatch(UpdateAnswer(state.answer |> Answer.toggle(modality)));
  };

  let updateModalityConfig = (modality: Modality.t, event: ReactEvent.Form.t) => {
    let value = event->ReactEvent.Form.target##value |> int_of_string_opt;
    dispatch(UpdateModalityConfig(modality, value));
  };

  let updateDepthConfig = (event: ReactEvent.Form.t) => {
    let value = event->ReactEvent.Form.target##value |> int_of_string;
    dispatch(UpdateDepthConfig(value));
  };

  <div>
    <div className="containerOverview">
      <div className="containerScore">
        <div>
          {switch (state.stateHistory |> List.length) {
           | 0 => React.string("First Turn!")
           | value => React.string("Turn: " ++ string_of_int(value + 1))
           }}
        </div>
        <div>
          {switch (state.score) {
           | 0 => React.null
           | value => React.string("Score: " ++ string_of_int(value))
           }}
        </div>
      </div>
      <div className="containerScore">
        {switch (state.highScore) {
         | None => React.null
         | Some(value) =>
           React.string("High Score: " ++ string_of_int(value))
         }}
      </div>
    </div>
    <Canvas config={state.config} gameState={state.gameState} />
    <div
      style={ReactDOMRe.Style.make(
        ~margin="25px",
        ~display="flex",
        ~justifyContent="center",
        (),
      )}>
      <button onClick={_ => dispatch(AdvanceTurn)}>
        {List.length(state.stateHistory) == 0
           ? React.string("Start") : React.string("Next")}
      </button>
    </div>
    {if (List.length(state.stateHistory) >= state.config.depth) {
       <div
         style={ReactDOMRe.Style.make(
           ~margin="25px",
           ~display="flex",
           ~justifyContent="center",
           (),
         )}>
         {Modality.allModalityTypes
          |> Array.map(modality => {
               switch (state.config.modalities |> Modality.getValue(modality)) {
               | Some(_) =>
                 <label
                   key={Modality.getLabel(modality) ++ "_answer"}
                   style={ReactDOMRe.Style.make(~margin="12px", ())}>
                   <input
                     type_="checkbox"
                     checked={state.answer |> Modality.getValue(modality)}
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
    {if (List.length(state.stateHistory) == 0) {
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
                     switch (
                       state.config.modalities |> Modality.getValue(modality)
                     ) {
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
             value={string_of_int(state.config.depth)}>
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
