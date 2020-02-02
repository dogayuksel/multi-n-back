'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var Modality$ReasonReactExamples = require("./Modality.bs.js");

function Canvas(Props) {
  var gameConfiguration = Props.gameConfiguration;
  var gameState = Props.gameState;
  var match = gameConfiguration.position;
  var match$1 = gameState.position;
  var match$2 = match !== undefined && match$1 !== undefined ? /* tuple */[
      match,
      match$1
    ] : /* tuple */[
      1,
      0
    ];
  var positionIndex = match$2[1];
  var positionDepth = match$2[0];
  var match$3 = gameConfiguration.color;
  var match$4 = gameState.color;
  var colorIndex = match$3 !== undefined && match$4 !== undefined ? match$4 : 0;
  var wrapperStyles = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center"
  };
  return React.createElement("div", {
              style: ReactDOMRe.Style.unsafeAddProp(wrapperStyles, "grid-template-columns", "repeat(" + (String(positionDepth) + ", 1fr)"))
            }, $$Array.mapi((function (renderIndex, param) {
                    var match = positionIndex === renderIndex;
                    var match$1 = gameConfiguration.icon;
                    var match$2 = gameState.icon;
                    var match$3 = positionIndex === renderIndex;
                    return React.createElement("div", {
                                style: {
                                  backgroundColor: match ? Caml_array.caml_array_get(Modality$ReasonReactExamples.colors, colorIndex) : "#EEEEEE",
                                  display: "flex",
                                  height: "65px",
                                  margin: "5px",
                                  width: "50px",
                                  alignItems: "center"
                                }
                              }, match$1 !== undefined && match$2 !== undefined && match$3 ? React.createElement("svg", {
                                      height: "48",
                                      width: "48",
                                      enableBackground: "new 0 0 24 24",
                                      viewBox: "0 0 24 24",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }, React.createElement("g", undefined, React.createElement("rect", {
                                              height: "24",
                                              width: "24",
                                              fill: "none"
                                            })), React.createElement("g", undefined, React.createElement("g", undefined, React.createElement("path", {
                                                  d: Caml_array.caml_array_get(Modality$ReasonReactExamples.icons, match$2)
                                                })))) : null);
                  }), Caml_array.caml_make_vect(Caml_int32.imul(positionDepth, positionDepth), 0)));
}

var make = Canvas;

exports.make = make;
/* react Not a pure module */
