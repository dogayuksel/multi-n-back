'use strict';

var List = require("rescript/lib/js/list.js");
var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Score$MultiNBack = require("./GameCore/Score.bs.js");
var Answer$MultiNBack = require("./GameCore/Answer.bs.js");
var Canvas$MultiNBack = require("./GameCore/Canvas.bs.js");
var Modality$MultiNBack = require("./GameCore/Modality/Modality.bs.js");
var GameState$MultiNBack = require("./GameCore/GameState.bs.js");
var Statistics$MultiNBack = require("./Interface/Statistics.bs.js");
var AnswerToggle$MultiNBack = require("./Interface/AnswerToggle.bs.js");
var GameConfiguration$MultiNBack = require("./GameCore/GameConfiguration.bs.js");
var ConfigurationPanel$MultiNBack = require("./Interface/ConfigurationPanel.bs.js");
var ConfigurationTrigger$MultiNBack = require("./Interface/ConfigurationTrigger.bs.js");

var initialConfig = GameConfiguration$MultiNBack.makeDefault(undefined);

var initialState_gameState = GameState$MultiNBack.makeRandom(initialConfig);

var initialState_answer = Answer$MultiNBack.make(undefined);

var initialState_highScore = Score$MultiNBack.getHighScore(undefined);

var initialState = {
  config: initialConfig,
  configPanelOpen: false,
  gameState: initialState_gameState,
  stateHistory: /* [] */0,
  answer: initialState_answer,
  score: 0,
  highScore: initialState_highScore
};

function reducer(state, action) {
  if (typeof action === "number") {
    if (action === /* ToggleConfigPanelOpen */0) {
      return {
              config: state.config,
              configPanelOpen: !state.configPanelOpen,
              gameState: state.gameState,
              stateHistory: state.stateHistory,
              answer: state.answer,
              score: state.score,
              highScore: state.highScore
            };
    }
    var partiallyUpdatedState;
    if (List.length(state.stateHistory) >= state.config.depth) {
      var result = GameState$MultiNBack.compareToHistory(state.answer, state.gameState, state.stateHistory, state.config);
      partiallyUpdatedState = result !== undefined ? ({
            config: state.config,
            configPanelOpen: state.configPanelOpen,
            gameState: state.gameState,
            stateHistory: {
              hd: state.gameState,
              tl: state.stateHistory
            },
            answer: state.answer,
            score: Score$MultiNBack.calculateScore(result, state.config.depth) + state.score | 0,
            highScore: state.highScore
          }) : ({
            config: state.config,
            configPanelOpen: state.configPanelOpen,
            gameState: state.gameState,
            stateHistory: /* [] */0,
            answer: state.answer,
            score: 0,
            highScore: Score$MultiNBack.updateHighScore(state.score)
          });
    } else {
      partiallyUpdatedState = {
        config: state.config,
        configPanelOpen: state.configPanelOpen,
        gameState: state.gameState,
        stateHistory: {
          hd: state.gameState,
          tl: state.stateHistory
        },
        answer: state.answer,
        score: state.score,
        highScore: state.highScore
      };
    }
    return {
            config: partiallyUpdatedState.config,
            configPanelOpen: partiallyUpdatedState.configPanelOpen,
            gameState: GameState$MultiNBack.makeRandom(state.config),
            stateHistory: partiallyUpdatedState.stateHistory,
            answer: Answer$MultiNBack.make(undefined),
            score: partiallyUpdatedState.score,
            highScore: partiallyUpdatedState.highScore
          };
  } else {
    switch (action.TAG | 0) {
      case /* UpdateDepthConfig */0 :
          return {
                  config: GameConfiguration$MultiNBack.updateDepth(action._0, state.config),
                  configPanelOpen: state.configPanelOpen,
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: state.answer,
                  score: state.score,
                  highScore: state.highScore
                };
      case /* UpdateModalityConfig */1 :
          return {
                  config: GameConfiguration$MultiNBack.updateModality(action._0, action._1, state.config),
                  configPanelOpen: state.configPanelOpen,
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: state.answer,
                  score: state.score,
                  highScore: state.highScore
                };
      case /* UpdateAnswer */2 :
          return {
                  config: state.config,
                  configPanelOpen: state.configPanelOpen,
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: action._0,
                  score: state.score,
                  highScore: state.highScore
                };
      
    }
  }
}

function App(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  var value = List.length(state.stateHistory);
  var value$1 = state.score;
  var value$2 = state.highScore;
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "titleContainer"
                }, "Multi-N-Back"), React.createElement("div", {
                  className: "overviewContainer"
                }, React.createElement("div", {
                      className: "scoreContainer"
                    }, value !== 0 ? React.createElement(Statistics$MultiNBack.make, {
                            label: "Turn",
                            value: value + 1 | 0
                          }) : "First Turn!"), React.createElement("div", {
                      className: "scoreContainer"
                    }, value$1 !== 0 ? React.createElement(Statistics$MultiNBack.make, {
                            label: "Score",
                            value: value$1
                          }) : null), React.createElement("div", {
                      className: "scoreContainer"
                    }, value$2 !== undefined ? React.createElement(Statistics$MultiNBack.make, {
                            label: "High Score",
                            value: value$2
                          }) : null)), React.createElement(Canvas$MultiNBack.make, {
                  config: state.config,
                  gameState: state.gameState
                }), state.configPanelOpen ? null : React.createElement("div", {
                    style: {
                      display: "flex",
                      justifyContent: "center"
                    }
                  }, React.createElement("button", {
                        style: {
                          fontSize: "1.4em"
                        },
                        onClick: (function (param) {
                            return Curry._1(dispatch, /* AdvanceTurn */1);
                          })
                      }, List.length(state.stateHistory) === 0 ? "Start" : "Next")), !state.configPanelOpen && List.length(state.stateHistory) === 0 ? React.createElement(ConfigurationTrigger$MultiNBack.make, {
                    toggleConfigPanelOpen: (function (param) {
                        return Curry._1(dispatch, /* ToggleConfigPanelOpen */0);
                      })
                  }) : null, List.length(state.stateHistory) >= state.config.depth ? React.createElement("div", {
                    style: {
                      display: "flex",
                      margin: "25px",
                      justifyContent: "center"
                    }
                  }, $$Array.map((function (modality) {
                          var match = Modality$MultiNBack.getValue(modality, state.config.modalities);
                          if (match !== undefined) {
                            return React.createElement(AnswerToggle$MultiNBack.make, {
                                        checked: Modality$MultiNBack.getValue(modality, state.answer),
                                        onChange: (function (param) {
                                            return Curry._1(dispatch, {
                                                        TAG: /* UpdateAnswer */2,
                                                        _0: Answer$MultiNBack.toggle(modality, state.answer)
                                                      });
                                          }),
                                        label: "Same " + Modality$MultiNBack.getLabel(modality),
                                        key: Modality$MultiNBack.getLabel(modality) + "_answer"
                                      });
                          } else {
                            return null;
                          }
                        }), Modality$MultiNBack.allModalityTypes)) : null, React.createElement(ConfigurationPanel$MultiNBack.make, {
                  panelOpen: state.configPanelOpen,
                  config: state.config,
                  updateModalityConfig: (function (modality, value) {
                      return Curry._1(dispatch, {
                                  TAG: /* UpdateModalityConfig */1,
                                  _0: modality,
                                  _1: value
                                });
                    }),
                  updateDepthConfig: (function (depth) {
                      return Curry._1(dispatch, {
                                  TAG: /* UpdateDepthConfig */0,
                                  _0: depth
                                });
                    }),
                  togglePanelOpen: (function (param) {
                      return Curry._1(dispatch, /* ToggleConfigPanelOpen */0);
                    })
                }));
}

var make = App;

exports.initialConfig = initialConfig;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* initialConfig Not a pure module */
