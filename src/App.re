type state = {
  config: GameConfiguration.t,
  configPanelOpen: bool,
  gameState: GameState.t,
  stateHistory: GameState.stateHistory,
  answer: Answer.t,
  score: int,
  highScore: option(int),
};

type action =
  | UpdateDepthConfig(int)
  | UpdateModalityConfig(Modality.t, option(int))
  | ToggleConfigPanelOpen
  | UpdateAnswer(Answer.t)
  | AdvanceTurn;

let initialConfig = GameConfiguration.makeDefault();

let initialState: state = {
  config: initialConfig,
  configPanelOpen: false,
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
  | ToggleConfigPanelOpen => {
      ...state,
      configPanelOpen: !state.configPanelOpen,
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

  let updateDepthConfig = (event: ReactEvent.Form.t) => {
    let value = event->ReactEvent.Form.target##value |> int_of_string;
    dispatch(UpdateDepthConfig(value));
  };

  <>
    <div className="titleContainer"> {React.string("Multi-N-Back")} </div>
    <div className="overviewContainer">
      <div className="scoreContainer">
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
      <div className="scoreContainer">
        {switch (state.highScore) {
         | None => React.null
         | Some(value) =>
           React.string("High Score: " ++ string_of_int(value))
         }}
      </div>
    </div>
    {if (List.length(state.stateHistory) == 0) {
       <div className="configurationWrapper">
         <div
           className={
             "configurationContainer "
             ++ (
               state.configPanelOpen ? "configPanelOpen" : "configPanelClosed"
             )
           }>
           {Modality.allModalityTypes
            |> Array.map(modality => {
                 <Slider
                   key={Modality.getLabel(modality) ++ "_config"}
                   label={modality |> Modality.getLabel}
                   value={
                     state.config.modalities |> Modality.getValue(modality)
                   }
                   onChange={(value: int) => {
                     let optionValue =
                       switch (value) {
                       | 0 => None
                       | v => Some(v)
                       };
                     dispatch(UpdateModalityConfig(modality, optionValue));
                   }}
                 />
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
           {state.configPanelOpen
              ? <button onClick={_ => dispatch(ToggleConfigPanelOpen)}>
                  <div> {React.string("Done")} </div>
                </button>
              : React.null}
         </div>
       </div>;
     } else {
       React.null;
     }}
    <Canvas config={state.config} gameState={state.gameState} />
    <div
      style={ReactDOMRe.Style.make(
        ~display="flex",
        ~justifyContent="center",
        (),
      )}>
      <button onClick={_ => dispatch(AdvanceTurn)}>
        {List.length(state.stateHistory) == 0
           ? React.string("Start") : React.string("Next")}
      </button>
    </div>
    {!state.configPanelOpen && List.length(state.stateHistory) == 0
       ? <div
           onClick={_ => dispatch(ToggleConfigPanelOpen)}
           style={ReactDOMRe.Style.make(
             ~boxShadow=
               "inset 12px 12px 30px "
               ++ AppStyles.background_more_darker
               ++ ", inset -12px -12px 30px "
               ++ AppStyles.background_more_lighter,
             ~borderRadius="40px 40px 0 0",
             ~width="150px",
             ~height="40px",
             ~position="absolute",
             ~bottom="0",
             ~left="calc(50% - 75px)",
             ~color=AppStyles.blue,
             ~textAlign="center",
             ~paddingTop="1.5em",
             (),
           )}>
           {React.string("Configure")}
         </div>
       : React.null}
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
                 <AnswerToggle
                   key={Modality.getLabel(modality) ++ "_answer"}
                   checked={state.answer |> Modality.getValue(modality)}
                   onChange={_ => toggleAnswer(modality)}
                   label={"Same " ++ Modality.getLabel(modality)}
                 />
               | None => React.null
               }
             })
          |> React.array}
       </div>;
     } else {
       React.null;
     }}
  </>;
};
