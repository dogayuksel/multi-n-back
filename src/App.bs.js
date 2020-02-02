'use strict';

var React = require("react");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");

function App(Props) {
  var match = React.useState((function () {
          return {
                  position: 4,
                  color: 4,
                  icon: 4
                };
        }));
  var match$1 = React.useState((function () {
          return {
                  position: 0,
                  color: 0,
                  icon: 0
                };
        }));
  return React.createElement(Canvas$ReasonReactExamples.make, {
              gameConfiguration: match[0],
              gameState: match$1[0]
            });
}

var make = App;

exports.make = make;
/* react Not a pure module */
