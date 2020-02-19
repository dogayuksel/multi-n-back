'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
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

function App(Props) {
  var match = React.useState((function () {
          return GameConfiguration$ReasonReactExamples.makeDefault(/* () */0);
        }));
  var setConfig = match[1];
  var config = match[0];
  var match$1 = React.useState((function () {
          return GameState$ReasonReactExamples.makeRandom(config);
        }));
  var setGameState = match$1[1];
  var gameState = match$1[0];
  var match$2 = React.useState((function () {
          return /* [] */0;
        }));
  var setStateHistory = match$2[1];
  var stateHistory = match$2[0];
  var match$3 = React.useState((function () {
          return Answer$ReasonReactExamples.make(/* () */0);
        }));
  var setAnswer = match$3[1];
  var answer = match$3[0];
  var match$4 = React.useState((function () {
          return 0;
        }));
  var setScore = match$4[1];
  var score = match$4[0];
  var advanceState = function (param) {
    Curry._1(setStateHistory, (function (currentHistory) {
            if (List.length(currentHistory) >= config.depth) {
              if (GameState$ReasonReactExamples.compareToHistory(answer, gameState, currentHistory, config)) {
                Curry._1(setScore, (function (score) {
                        return Score$ReasonReactExamples.calculateScore(config) + score | 0;
                      }));
                return /* :: */[
                        gameState,
                        currentHistory
                      ];
              } else {
                Curry._1(setScore, (function (param) {
                        return 0;
                      }));
                return /* [] */0;
              }
            } else {
              return /* :: */[
                      gameState,
                      currentHistory
                    ];
            }
          }));
    Curry._1(setAnswer, (function (param) {
            return Answer$ReasonReactExamples.make(/* () */0);
          }));
    return Curry._1(setGameState, (function (param) {
                  return GameState$ReasonReactExamples.makeRandom(config);
                }));
  };
  var value = List.length(stateHistory);
  var match$5 = List.length(stateHistory) === 0;
  return React.createElement("div", undefined, React.createElement("div", {
                  style: {
                    margin: "20px 10px"
                  }
                }, value !== 0 ? "Turn: " + String(value + 1 | 0) : "First Turn!"), React.createElement("div", {
                  style: {
                    margin: "20px 10px"
                  }
                }, score !== 0 ? "Score: " + String(score + 1 | 0) : null), React.createElement(Canvas$ReasonReactExamples.make, {
                  config: config,
                  gameState: gameState
                }), React.createElement("div", {
                  style: {
                    display: "flex",
                    margin: "25px",
                    justifyContent: "center"
                  }
                }, React.createElement("button", {
                      onClick: advanceState
                    }, match$5 ? "Start" : "Next")), List.length(stateHistory) >= config.depth ? React.createElement("div", {
                    style: {
                      display: "flex",
                      margin: "25px",
                      justifyContent: "center"
                    }
                  }, $$Array.map((function (modality) {
                          var match = Modality$ReasonReactExamples.getValue(modality, config.modalities);
                          if (match !== undefined) {
                            return React.createElement("label", {
                                        style: {
                                          margin: "12px"
                                        }
                                      }, React.createElement("input", {
                                            checked: Modality$ReasonReactExamples.getValue(modality, answer),
                                            type: "checkbox",
                                            onChange: (function (param) {
                                                return Curry._1(setAnswer, (function (currentAnswer) {
                                                              return Answer$ReasonReactExamples.toggle(modality, currentAnswer);
                                                            }));
                                              })
                                          }), "Same " + Modality$ReasonReactExamples.getLabel(modality));
                          } else {
                            return null;
                          }
                        }), Modality$ReasonReactExamples.allModalityTypes)) : null, List.length(stateHistory) === 0 ? React.createElement("div", {
                    style: {
                      display: "flex",
                      margin: "25px",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center"
                    }
                  }, React.createElement("div", undefined, "Configure"), $$Array.map((function (modality) {
                          var match = Modality$ReasonReactExamples.getValue(modality, config.modalities);
                          return React.createElement("label", {
                                      style: {
                                        margin: "12px"
                                      }
                                    }, Modality$ReasonReactExamples.getLabel(modality), React.createElement("select", {
                                          value: match !== undefined ? String(match) : "Disabled",
                                          onChange: (function ($$event) {
                                              var modality$1 = modality;
                                              var $$event$1 = $$event;
                                              var value = Pervasives.int_of_string_opt($$event$1.target.value);
                                              return Curry._1(setConfig, (function (currentConfig) {
                                                            return GameConfiguration$ReasonReactExamples.updateModality(modality$1, value, currentConfig);
                                                          }));
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
                            value: String(config.depth),
                            onChange: (function ($$event) {
                                var $$event$1 = $$event;
                                var value = Caml_format.caml_int_of_string($$event$1.target.value);
                                return Curry._1(setConfig, (function (currentConfig) {
                                              return GameConfiguration$ReasonReactExamples.updateDepth(value, currentConfig);
                                            }));
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

exports.make = make;
/* react Not a pure module */
