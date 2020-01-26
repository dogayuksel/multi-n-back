'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var GameContextProvider$ReasonReactExamples = require("./GameContextProvider.bs.js");
var ConfigurationProvider$ReasonReactExamples = require("./ConfigurationProvider.bs.js");

function Canvas(Props) {
  var match = React.useContext(GameContextProvider$ReasonReactExamples.gameContext);
  var match$1 = React.useContext(ConfigurationProvider$ReasonReactExamples.configurationContext);
  var depth = match$1.depth;
  return $$Array.fold_left((function (element, modality) {
                return Curry._2(modality.renderFunction, element, {
                            depth: Caml_array.caml_array_get(depth, 0)
                          });
              }), React.createElement("div", {
                  style: {
                    height: "65px",
                    width: "50px"
                  }
                }), match.availableModalities);
}

var make = Canvas;

exports.make = make;
/* react Not a pure module */
