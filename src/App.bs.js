'use strict';

var List = require("bs-platform/lib/js/list.js");
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
  var match$2 = React.useState((function () {
          return /* [] */0;
        }));
  var setStateHistory = match$2[1];
  var advanceState = function (param) {
    Curry._1(setStateHistory, (function (currentHistory) {
            return /* :: */[
                    gameState,
                    currentHistory
                  ];
          }));
    return Curry._1(setGameState, (function (param) {
                  return GameState$ReasonReactExamples.advanceState(gameConfiguration);
                }));
  };
  var value = List.length(match$2[0]);
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
                    }, "Next")));
}

var make = App;

exports.make = make;
/* react Not a pure module */
