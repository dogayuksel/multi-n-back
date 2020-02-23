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

  <>
    <div className="titleContainer"> {React.string("Multi-N-Back")} </div>
    <div className="overviewContainer">
      <div className="scoreContainer">
        {switch (state.stateHistory |> List.length) {
         | 0 => React.string("First Turn!")
         | value => <Statistics label="Turn" value={value + 1} />
         }}
      </div>
      <div className="scoreContainer">
        {switch (state.score) {
         | 0 => React.null
         | value => <Statistics label="Score" value />
         }}
      </div>
      <div className="scoreContainer">
        {switch (state.highScore) {
         | None => React.null
         | Some(value) => <Statistics label="High Score" value />
         }}
      </div>
    </div>
    <Canvas config={state.config} gameState={state.gameState} />
    {!state.configPanelOpen
       ? <div
           style={ReactDOMRe.Style.make(
             ~display="flex",
             ~justifyContent="center",
             (),
           )}>
           <button
             style={ReactDOMRe.Style.make(~fontSize="1.4em", ())}
             onClick={_ => dispatch(AdvanceTurn)}>
             {List.length(state.stateHistory) == 0
                ? React.string("Start") : React.string("Next")}
           </button>
         </div>
       : React.null}
    {!state.configPanelOpen && List.length(state.stateHistory) == 0
       ? <ConfigurationTrigger
           toggleConfigPanelOpen={_ => dispatch(ToggleConfigPanelOpen)}
         />
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
    <ConfigurationPanel
      panelOpen={state.configPanelOpen}
      config={state.config}
      updateModalityConfig={(modality, value) =>
        dispatch(UpdateModalityConfig(modality, value))
      }
      updateDepthConfig={depth => dispatch(UpdateDepthConfig(depth))}
      togglePanelOpen={_ => dispatch(ToggleConfigPanelOpen)}
    />
  </>;
};
