'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");
var GameConfiguration$ReasonReactExamples = require("./GameCore/GameConfiguration.bs.js");

function App(Props) {
  var match = React.useState((function () {
          return GameConfiguration$ReasonReactExamples.getDefaultConfig(/* () */0);
        }));
  var gameConfiguration = match[0];
  var match$1 = React.useState((function () {
          return GameState$ReasonReactExamples.advanceState(gameConfiguration);
        }));
  var setGameState = match$1[1];
  var gameState = match$1[0];
  var match$2 = React.useState((function () {
          return /* [] */0;
        }));
  var setStateHistory = match$2[1];
  var stateHistory = match$2[0];
  var match$3 = React.useState((function () {
          return {
                  position: false,
                  color: false,
                  icon: false
                };
        }));
  var setAnswers = match$3[1];
  var answers = match$3[0];
  var toggleAnswer = function (modality) {
    return Curry._1(setAnswers, (function (currentAnswers) {
                  switch (modality) {
                    case /* Position */0 :
                        return {
                                position: !currentAnswers.position,
                                color: currentAnswers.color,
                                icon: currentAnswers.icon
                              };
                    case /* Color */1 :
                        return {
                                position: currentAnswers.position,
                                color: !currentAnswers.color,
                                icon: currentAnswers.icon
                              };
                    case /* Icon */2 :
                        return {
                                position: currentAnswers.position,
                                color: currentAnswers.color,
                                icon: !currentAnswers.icon
                              };
                    
                  }
                }));
  };
  var advanceState = function (param) {
    Curry._1(setStateHistory, (function (currentHistory) {
            if (List.length(currentHistory) >= gameConfiguration.depth) {
              var oldState = List.nth(currentHistory, gameConfiguration.depth - 1 | 0);
              var match = gameConfiguration.position;
              var match$1 = answers.position;
              var match$2 = oldState.position;
              var match$3 = gameState.position;
              var positionResult = match !== undefined && match$2 !== undefined && match$3 !== undefined ? match$2 === match$3 === match$1 : true;
              var match$4 = gameConfiguration.color;
              var match$5 = answers.color;
              var match$6 = oldState.color;
              var match$7 = gameState.color;
              var colorResult = match$4 !== undefined && match$6 !== undefined && match$7 !== undefined ? match$6 === match$7 === match$5 : true;
              var match$8 = gameConfiguration.icon;
              var match$9 = answers.icon;
              var match$10 = oldState.icon;
              var match$11 = gameState.icon;
              var iconResult = match$8 !== undefined && match$10 !== undefined && match$11 !== undefined ? match$10 === match$11 === match$9 : true;
              if (positionResult && colorResult && iconResult) {
                return /* :: */[
                        gameState,
                        currentHistory
                      ];
              } else {
                return /* [] */0;
              }
            } else {
              return /* :: */[
                      gameState,
                      currentHistory
                    ];
            }
          }));
    Curry._1(setAnswers, (function (param) {
            return {
                    position: false,
                    color: false,
                    icon: false
                  };
          }));
    return Curry._1(setGameState, (function (param) {
                  return GameState$ReasonReactExamples.advanceState(gameConfiguration);
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
                    checked: answers.position,
                    type: "checkbox",
                    onChange: (function (param) {
                        return toggleAnswer(/* Position */0);
                      })
                  }), "Same Position") : null, match$5 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answers.color,
                    type: "checkbox",
                    onChange: (function (param) {
                        return toggleAnswer(/* Color */1);
                      })
                  }), "Same Color") : null, match$6 !== undefined ? React.createElement("label", undefined, React.createElement("input", {
                    checked: answers.icon,
                    type: "checkbox",
                    onChange: (function (param) {
                        return toggleAnswer(/* Icon */2);
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
