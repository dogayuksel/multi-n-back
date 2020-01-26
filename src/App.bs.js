'use strict';

var React = require("react");
var Canvas$ReasonReactExamples = require("./GameCore/Canvas.bs.js");
var Modalities$ReasonReactExamples = require("./GameCore/Modalities.bs.js");
var GameContextProvider$ReasonReactExamples = require("./GameCore/GameContextProvider.bs.js");
var ConfigurationProvider$ReasonReactExamples = require("./GameCore/ConfigurationProvider.bs.js");

function App(Props) {
  return React.createElement(GameContextProvider$ReasonReactExamples.make, GameContextProvider$ReasonReactExamples.makeProps({
                  availableModalities: Modalities$ReasonReactExamples.modalities,
                  selectedModalities: Modalities$ReasonReactExamples.modalities
                }, React.createElement(ConfigurationProvider$ReasonReactExamples.make, ConfigurationProvider$ReasonReactExamples.makeProps({
                          depth: 4
                        }, React.createElement(Canvas$ReasonReactExamples.make, { }), /* () */0)), /* () */0));
}

var make = App;

exports.make = make;
/* react Not a pure module */
