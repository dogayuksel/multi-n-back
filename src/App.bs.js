'use strict';

var List = require("bs-platform/lib/js/list.js");
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
  var tmp;
  if (List.length(stateHistory) >= config.depth) {
    var match$4 = Modality$ReasonReactExamples.getValue(/* Position */0, config.modalities);
    var match$5 = Modality$ReasonReactExamples.getValue(/* Color */1, config.modalities);
    var match$6 = Modality$ReasonReactExamples.getValue(/* Icon */2, config.modalities);
    tmp = React.createElement("div", {
          style: {
            display: "flex",
            margin: "25px",
            justifyContent: "center"
          }
        }, match$4 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answer.position,
                    type: "checkbox",
                    onChange: (function (param) {
                        return Curry._1(setAnswer, (function (currentAnswer) {
                                      return Answer$ReasonReactExamples.toggle(/* Position */0, currentAnswer);
                                    }));
                      })
                  }), "Same Position") : null, match$5 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answer.color,
                    type: "checkbox",
                    onChange: (function (param) {
                        return Curry._1(setAnswer, (function (currentAnswer) {
                                      return Answer$ReasonReactExamples.toggle(/* Color */1, currentAnswer);
                                    }));
                      })
                  }), "Same Color") : null, match$6 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answer.icon,
                    type: "checkbox",
                    onChange: (function (param) {
                        return Curry._1(setAnswer, (function (currentAnswer) {
                                      return Answer$ReasonReactExamples.toggle(/* Icon */2, currentAnswer);
                                    }));
                      })
                  }), "Same Icon") : null);
  } else {
    tmp = null;
  }
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
                    }, "Next")), tmp);
}

var make = App;

exports.make = make;
/* react Not a pure module */
