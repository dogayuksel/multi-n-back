'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Score$ReasonReactExamples = require("./GameCore/Score.bs.js");
var Answer$ReasonReactExamples = require("./GameCore/Answer.bs.js");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var Modality$ReasonReactExamples = require("./GameCore/Modality/Modality.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var Statistics$ReasonReactExamples = require("./Interface/Statistics.bs.js");
var AnswerToggle$ReasonReactExamples = require("./Interface/AnswerToggle.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");
var ConfigurationPanel$ReasonReactExamples = require("./Interface/ConfigurationPanel.bs.js");
var ConfigurationTrigger$ReasonReactExamples = require("./Interface/ConfigurationTrigger.bs.js");

var initialConfig = GameConfiguration$ReasonReactExamples.makeDefault(/* () */0);

var initialState_gameState = GameState$ReasonReactExamples.makeRandom(initialConfig);

var initialState_answer = Answer$ReasonReactExamples.make(/* () */0);

var initialState_highScore = Score$ReasonReactExamples.getHighScore(/* () */0);

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
    } else {
      var partiallyUpdatedState;
      if (List.length(state.stateHistory) >= state.config.depth) {
        var match = GameState$ReasonReactExamples.compareToHistory(state.answer, state.gameState, state.stateHistory, state.config);
        partiallyUpdatedState = match !== undefined ? ({
              config: state.config,
              configPanelOpen: state.configPanelOpen,
              gameState: state.gameState,
              stateHistory: /* :: */[
                state.gameState,
                state.stateHistory
              ],
              answer: state.answer,
              score: Score$ReasonReactExamples.calculateScore(match, state.config.depth) + state.score | 0,
              highScore: state.highScore
            }) : ({
              config: state.config,
              configPanelOpen: state.configPanelOpen,
              gameState: state.gameState,
              stateHistory: /* [] */0,
              answer: state.answer,
              score: 0,
              highScore: Score$ReasonReactExamples.updateHighScore(state.score)
            });
      } else {
        partiallyUpdatedState = {
          config: state.config,
          configPanelOpen: state.configPanelOpen,
          gameState: state.gameState,
          stateHistory: /* :: */[
            state.gameState,
            state.stateHistory
          ],
          answer: state.answer,
          score: state.score,
          highScore: state.highScore
        };
      }
      return {
              config: partiallyUpdatedState.config,
              configPanelOpen: partiallyUpdatedState.configPanelOpen,
              gameState: GameState$ReasonReactExamples.makeRandom(state.config),
              stateHistory: partiallyUpdatedState.stateHistory,
              answer: Answer$ReasonReactExamples.make(/* () */0),
              score: partiallyUpdatedState.score,
              highScore: partiallyUpdatedState.highScore
            };
    }
  } else {
    switch (action.tag | 0) {
      case /* UpdateDepthConfig */0 :
          return {
                  config: GameConfiguration$ReasonReactExamples.updateDepth(action[0], state.config),
                  configPanelOpen: state.configPanelOpen,
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: state.answer,
                  score: state.score,
                  highScore: state.highScore
                };
      case /* UpdateModalityConfig */1 :
          return {
                  config: GameConfiguration$ReasonReactExamples.updateModality(action[0], action[1], state.config),
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
                  answer: action[0],
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
  var match$1 = state.highScore;
  var match$2 = !state.configPanelOpen;
  var tmp;
  if (match$2) {
    var match$3 = List.length(state.stateHistory) === 0;
    tmp = React.createElement("div", {
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
            }, match$3 ? "Start" : "Next"));
  } else {
    tmp = null;
  }
  var match$4 = !state.configPanelOpen && List.length(state.stateHistory) === 0;
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "titleContainer"
                }, "Multi-N-Back"), React.createElement("div", {
                  className: "overviewContainer"
                }, React.createElement("div", {
                      className: "scoreContainer"
                    }, value !== 0 ? React.createElement(Statistics$ReasonReactExamples.make, {
                            label: "Turn",
                            value: value + 1 | 0
                          }) : "First Turn!"), React.createElement("div", {
                      className: "scoreContainer"
                    }, value$1 !== 0 ? React.createElement(Statistics$ReasonReactExamples.make, {
                            label: "Score",
                            value: value$1
                          }) : null), React.createElement("div", {
                      className: "scoreContainer"
                    }, match$1 !== undefined ? React.createElement(Statistics$ReasonReactExamples.make, {
                            label: "High Score",
                            value: match$1
                          }) : null)), React.createElement(Canvas$ReasonReactExamples.make, {
                  config: state.config,
                  gameState: state.gameState
                }), tmp, match$4 ? React.createElement(ConfigurationTrigger$ReasonReactExamples.make, {
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
                          var match = Modality$ReasonReactExamples.getValue(modality, state.config.modalities);
                          if (match !== undefined) {
                            return React.createElement(AnswerToggle$ReasonReactExamples.make, {
                                        checked: Modality$ReasonReactExamples.getValue(modality, state.answer),
                                        onChange: (function (param) {
                                            var modality$1 = modality;
                                            return Curry._1(dispatch, /* UpdateAnswer */Block.__(2, [Answer$ReasonReactExamples.toggle(modality$1, state.answer)]));
                                          }),
                                        label: "Same " + Modality$ReasonReactExamples.getLabel(modality),
                                        key: Modality$ReasonReactExamples.getLabel(modality) + "_answer"
                                      });
                          } else {
                            return null;
                          }
                        }), Modality$ReasonReactExamples.allModalityTypes)) : null, React.createElement(ConfigurationPanel$ReasonReactExamples.make, {
                  panelOpen: state.configPanelOpen,
                  config: state.config,
                  updateModalityConfig: (function (modality, value) {
                      return Curry._1(dispatch, /* UpdateModalityConfig */Block.__(1, [
                                    modality,
                                    value
                                  ]));
                    }),
                  updateDepthConfig: (function (depth) {
                      return Curry._1(dispatch, /* UpdateDepthConfig */Block.__(0, [depth]));
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
