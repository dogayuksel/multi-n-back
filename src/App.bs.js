'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var GameState$ReasonReactExamples = require("./GameCore/GameState.bs.js");

function App(Props) {
  var match = React.useState((function () {
          return {
                  position: 4,
                  color: 4,
                  icon: 4
                };
        }));
  var gameConfiguration = match[0];
  var match$1 = React.useState((function () {
          return {
                  position: 0,
                  color: 0,
                  icon: 0
                };
        }));
  var setGameState = match$1[1];
  var gameState = match$1[0];
  var stateHistory = React.useRef(/* [] */0);
  var advanceState = function (param) {
    var currentHistory = stateHistory.current;
    stateHistory.current = /* :: */[
      gameState,
      currentHistory
    ];
    return Curry._1(setGameState, (function (param) {
                  return GameState$ReasonReactExamples.advanceState(gameConfiguration);
                }));
  };
  return React.createElement("div", undefined, React.createElement(Canvas$ReasonReactExamples.make, {
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
                    }, "Next")));
}

var make = App;

exports.make = make;
/* react Not a pure module */
