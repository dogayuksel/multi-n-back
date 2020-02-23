'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Score$ReasonReactExamples = require("./GameCore/Score.bs.js");
var Answer$ReasonReactExamples = require("./GameCore/Answer.bs.js");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var Slider$ReasonReactExamples = require("./Interface/Slider.bs.js");
var Modality$ReasonReactExamples = require("./GameCore/Modality/Modality.bs.js");
var AppStyles$ReasonReactExamples = require("./AppStyles.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");

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
  var tmp;
  if (List.length(state.stateHistory) === 0) {
    var match$2 = state.configPanelOpen;
    var match$3 = state.configPanelOpen;
    tmp = React.createElement("div", {
          className: "configurationWrapper"
        }, React.createElement("div", {
              className: "configurationContainer " + (
                match$2 ? "configPanelOpen" : "configPanelClosed"
              )
            }, $$Array.map((function (modality) {
                    return React.createElement(Slider$ReasonReactExamples.make, {
                                label: Modality$ReasonReactExamples.getLabel(modality),
                                value: Modality$ReasonReactExamples.getValue(modality, state.config.modalities),
                                onChange: (function (value) {
                                    var optionValue = value !== 0 ? value : undefined;
                                    return Curry._1(dispatch, /* UpdateModalityConfig */Block.__(1, [
                                                  modality,
                                                  optionValue
                                                ]));
                                  }),
                                key: Modality$ReasonReactExamples.getLabel(modality) + "_config"
                              });
                  }), Modality$ReasonReactExamples.allModalityTypes), React.createElement("label", {
                  style: {
                    margin: "12px"
                  }
                }, "Depth", React.createElement("select", {
                      value: String(state.config.depth),
                      onChange: (function ($$event) {
                          var $$event$1 = $$event;
                          var value = Caml_format.caml_int_of_string($$event$1.target.value);
                          return Curry._1(dispatch, /* UpdateDepthConfig */Block.__(0, [value]));
                        })
                    }, React.createElement("option", {
                          value: "1"
                        }, "1"), React.createElement("option", {
                          value: "2"
                        }, "2"), React.createElement("option", {
                          value: "3"
                        }, "3"), React.createElement("option", {
                          value: "4"
                        }, "4"), React.createElement("option", {
                          value: "5"
                        }, "5"))), match$3 ? React.createElement("button", {
                    onClick: (function (param) {
                        return Curry._1(dispatch, /* ToggleConfigPanelOpen */0);
                      })
                  }, React.createElement("div", undefined, "Done")) : null));
  } else {
    tmp = null;
  }
  var match$4 = List.length(state.stateHistory) === 0;
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "titleContainer"
                }, "Multi-N-Back"), React.createElement("div", {
                  className: "overviewContainer"
                }, React.createElement("div", {
                      className: "scoreContainer"
                    }, React.createElement("div", undefined, value !== 0 ? "Turn: " + String(value + 1 | 0) : "First Turn!"), React.createElement("div", undefined, value$1 !== 0 ? "Score: " + String(value$1) : null)), React.createElement("div", {
                      className: "scoreContainer"
                    }, match$1 !== undefined ? "High Score: " + String(match$1) : null)), tmp, React.createElement(Canvas$ReasonReactExamples.make, {
                  config: state.config,
                  gameState: state.gameState
                }), React.createElement("div", {
                  style: {
                    display: "flex",
                    justifyContent: "center"
                  }
                }, React.createElement("button", {
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* AdvanceTurn */1);
                        })
                    }, match$4 ? "Start" : "Next")), React.createElement("div", {
                  style: {
                    bottom: "0",
                    color: AppStyles$ReasonReactExamples.blue,
                    height: "40px",
                    left: "calc(50% - 75px)",
                    paddingTop: "1.5em",
                    position: "absolute",
                    textAlign: "center",
                    width: "150px",
                    borderRadius: "40px 40px 0 0",
                    boxShadow: "inset 12px 12px 30px " + (AppStyles$ReasonReactExamples.background_more_darker + (", inset -12px -12px 30px " + AppStyles$ReasonReactExamples.background_more_lighter))
                  },
                  onClick: (function (param) {
                      if (!state.configPanelOpen && List.length(state.stateHistory) === 0) {
                        return Curry._1(dispatch, /* ToggleConfigPanelOpen */0);
                      } else {
                        return 0;
                      }
                    })
                }, "Configure"), List.length(state.stateHistory) >= state.config.depth ? React.createElement("div", {
                    style: {
                      display: "flex",
                      margin: "25px",
                      justifyContent: "center"
                    }
                  }, $$Array.map((function (modality) {
                          var match = Modality$ReasonReactExamples.getValue(modality, state.config.modalities);
                          if (match !== undefined) {
                            return React.createElement("label", {
                                        key: Modality$ReasonReactExamples.getLabel(modality) + "_answer",
                                        style: {
                                          margin: "12px"
                                        }
                                      }, React.createElement("input", {
                                            checked: Modality$ReasonReactExamples.getValue(modality, state.answer),
                                            type: "checkbox",
                                            onChange: (function (param) {
                                                var modality$1 = modality;
                                                return Curry._1(dispatch, /* UpdateAnswer */Block.__(2, [Answer$ReasonReactExamples.toggle(modality$1, state.answer)]));
                                              })
                                          }), "Same " + Modality$ReasonReactExamples.getLabel(modality));
                          } else {
                            return null;
                          }
                        }), Modality$ReasonReactExamples.allModalityTypes)) : null);
}

var make = App;

exports.initialConfig = initialConfig;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* initialConfig Not a pure module */
