'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Score$ReasonReactExamples = require("./GameCore/Score.bs.js");
var Answer$ReasonReactExamples = require("./GameCore/Answer.bs.js");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var Modality$ReasonReactExamples = require("./GameCore/Modality/Modality.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");

var initialConfig = GameConfiguration$ReasonReactExamples.makeDefault(/* () */0);

var initialState_gameState = GameState$ReasonReactExamples.makeRandom(initialConfig);

var initialState_answer = Answer$ReasonReactExamples.make(/* () */0);

var initialState_highScore = Score$ReasonReactExamples.getHighScore(/* () */0);

var initialState = {
  config: initialConfig,
  gameState: initialState_gameState,
  stateHistory: /* [] */0,
  answer: initialState_answer,
  score: 0,
  highScore: initialState_highScore
};

function reducer(state, action) {
  if (typeof action === "number") {
    var partiallyUpdatedState;
    if (List.length(state.stateHistory) >= state.config.depth) {
      var match = GameState$ReasonReactExamples.compareToHistory(state.answer, state.gameState, state.stateHistory, state.config);
      partiallyUpdatedState = match !== undefined ? ({
            config: state.config,
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
            gameState: state.gameState,
            stateHistory: /* [] */0,
            answer: state.answer,
            score: 0,
            highScore: Score$ReasonReactExamples.updateHighScore(state.score)
          });
    } else {
      partiallyUpdatedState = {
        config: state.config,
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
            gameState: GameState$ReasonReactExamples.makeRandom(state.config),
            stateHistory: partiallyUpdatedState.stateHistory,
            answer: Answer$ReasonReactExamples.make(/* () */0),
            score: partiallyUpdatedState.score,
            highScore: partiallyUpdatedState.highScore
          };
  } else {
    switch (action.tag | 0) {
      case /* UpdateDepthConfig */0 :
          return {
                  config: GameConfiguration$ReasonReactExamples.updateDepth(action[0], state.config),
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: state.answer,
                  score: state.score,
                  highScore: state.highScore
                };
      case /* UpdateModalityConfig */1 :
          return {
                  config: GameConfiguration$ReasonReactExamples.updateModality(action[0], action[1], state.config),
                  gameState: state.gameState,
                  stateHistory: state.stateHistory,
                  answer: state.answer,
                  score: state.score,
                  highScore: state.highScore
                };
      case /* UpdateAnswer */2 :
          return {
                  config: state.config,
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
  var match$2 = List.length(state.stateHistory) === 0;
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "containerOverview"
                }, React.createElement("div", {
                      className: "containerScore"
                    }, React.createElement("div", undefined, value !== 0 ? "Turn: " + String(value + 1 | 0) : "First Turn!"), React.createElement("div", undefined, value$1 !== 0 ? "Score: " + String(value$1) : null)), React.createElement("div", {
                      className: "containerScore"
                    }, match$1 !== undefined ? "High Score: " + String(match$1) : null)), React.createElement(Canvas$ReasonReactExamples.make, {
                  config: state.config,
                  gameState: state.gameState
                }), React.createElement("div", {
                  style: {
                    display: "flex",
                    margin: "25px",
                    justifyContent: "center"
                  }
                }, React.createElement("button", {
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* AdvanceTurn */0);
                        })
                    }, match$2 ? "Start" : "Next")), List.length(state.stateHistory) >= state.config.depth ? React.createElement("div", {
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
                        }), Modality$ReasonReactExamples.allModalityTypes)) : null, List.length(state.stateHistory) === 0 ? React.createElement("div", {
                    style: {
                      display: "flex",
                      margin: "25px",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center"
                    }
                  }, React.createElement("div", undefined, "Configure"), $$Array.map((function (modality) {
                          var match = Modality$ReasonReactExamples.getValue(modality, state.config.modalities);
                          return React.createElement("label", {
                                      key: Modality$ReasonReactExamples.getLabel(modality) + "_config",
                                      style: {
                                        margin: "12px"
                                      }
                                    }, Modality$ReasonReactExamples.getLabel(modality), React.createElement("select", {
                                          value: match !== undefined ? String(match) : "Disabled",
                                          onChange: (function ($$event) {
                                              var modality$1 = modality;
                                              var $$event$1 = $$event;
                                              var value = Pervasives.int_of_string_opt($$event$1.target.value);
                                              return Curry._1(dispatch, /* UpdateModalityConfig */Block.__(1, [
                                                            modality$1,
                                                            value
                                                          ]));
                                            })
                                        }, React.createElement("option", {
                                              value: "Disabled"
                                            }, "Disabled"), React.createElement("option", {
                                              value: "2"
                                            }, "2"), React.createElement("option", {
                                              value: "3"
                                            }, "3"), React.createElement("option", {
                                              value: "4"
                                            }, "4"), React.createElement("option", {
                                              value: "5"
                                            }, "5"), React.createElement("option", {
                                              value: "7"
                                            }, "7"), React.createElement("option", {
                                              value: "10"
                                            }, "10")));
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
                              }, "5")))) : null);
}

var make = App;

exports.initialConfig = initialConfig;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* initialConfig Not a pure module */
