'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Answer$ReasonReactExamples = require("./GameCore/Answer.bs.js");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var Modality$ReasonReactExamples = require("./GameCore/Modality/Modality.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");

function App(Props) {
  var match = React.useState((function () {
          return GameConfiguration$ReasonReactExamples.makeDefault(/* () */0);
        }));
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
  var advanceState = function (param) {
    Curry._1(setStateHistory, (function (currentHistory) {
            if (List.length(currentHistory) >= config.depth && !GameState$ReasonReactExamples.compareToHistory(answer, gameState, currentHistory, config)) {
              return /* [] */0;
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
  return React.createElement("div", undefined, React.createElement("div", {
                  style: {
                    margin: "20px 10px"
                  }
                }, value !== 0 ? "Turn: " + String(value + 1 | 0) : "First Turn!"), React.createElement(Canvas$ReasonReactExamples.make, {
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
                    }, "Next")), List.length(stateHistory) >= config.depth ? React.createElement("div", {
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
                        }), Modality$ReasonReactExamples.allModalityTypes)) : null);
}

var make = App;

exports.make = make;
/* react Not a pure module */
