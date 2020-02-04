'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Answer$ReasonReactExamples = require("./GameCore/Answer.bs.js");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");

function App(Props) {
  var match = React.useState((function () {
          return GameConfiguration$ReasonReactExamples.getDefaultConfig(/* () */0);
        }));
  var gameConfiguration = match[0];
  var match$1 = React.useState((function () {
          return GameState$ReasonReactExamples.makeState(gameConfiguration);
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
            if (List.length(currentHistory) >= gameConfiguration.depth && !GameState$ReasonReactExamples.compareToHistory(answer, gameState, currentHistory, gameConfiguration)) {
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
                  return GameState$ReasonReactExamples.makeState(gameConfiguration);
                }));
  };
  var value = List.length(stateHistory);
  var tmp;
  if (List.length(stateHistory) >= gameConfiguration.depth) {
    var match$4 = gameConfiguration.position;
    var match$5 = gameConfiguration.color;
    var match$6 = gameConfiguration.icon;
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
                        return Curry._1(setAnswer, (function (currentAnswers) {
                                      return Answer$ReasonReactExamples.toggleAnswer(/* Position */0, currentAnswers);
                                    }));
                      })
                  }), "Same Position") : null, match$5 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answer.color,
                    type: "checkbox",
                    onChange: (function (param) {
                        return Curry._1(setAnswer, (function (currentAnswers) {
                                      return Answer$ReasonReactExamples.toggleAnswer(/* Color */1, currentAnswers);
                                    }));
                      })
                  }), "Same Color") : null, match$6 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answer.icon,
                    type: "checkbox",
                    onChange: (function (param) {
                        return Curry._1(setAnswer, (function (currentAnswers) {
                                      return Answer$ReasonReactExamples.toggleAnswer(/* Icon */2, currentAnswers);
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
                  gameConfiguration: gameConfiguration,
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
