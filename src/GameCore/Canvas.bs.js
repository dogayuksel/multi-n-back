'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var Icon$ReasonReactExamples = require("./Modality/Icon.bs.js");
var Color$ReasonReactExamples = require("./Modality/Color.bs.js");
var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

function Canvas(Props) {
  var config = Props.config;
  var gameState = Props.gameState;
  var match = Modality$ReasonReactExamples.getValue(/* Position */0, config.modalities);
  var match$1 = Modality$ReasonReactExamples.getValue(/* Position */0, gameState);
  var match$2 = match !== undefined && match$1 !== undefined ? /* tuple */[
      match,
      match$1
    ] : /* tuple */[
      1,
      0
    ];
  var positionIndex = match$2[1];
  var positionDepth = match$2[0];
  var match$3 = Modality$ReasonReactExamples.getValue(/* Color */1, config.modalities);
  var match$4 = Modality$ReasonReactExamples.getValue(/* Color */1, gameState);
  var colorIndex = match$3 !== undefined && match$4 !== undefined ? match$4 : 0;
  var match$5 = Modality$ReasonReactExamples.getValue(/* Icon */2, config.modalities);
  var match$6 = Modality$ReasonReactExamples.getValue(/* Icon */2, gameState);
  var iconIndex = match$5 !== undefined && match$6 !== undefined ? match$6 : 0;
  var wrapperStyles = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center"
  };
  return React.createElement("div", {
              style: ReactDOMRe.Style.unsafeAddProp(wrapperStyles, "gridTemplateColumns", "repeat(" + (String(positionDepth) + ", 1fr)"))
            }, $$Array.mapi((function (renderIndex, param) {
                    var active = positionIndex === renderIndex;
                    return React.createElement(Color$ReasonReactExamples.make, {
                                children: React.createElement(Icon$ReasonReactExamples.make, {
                                      index: iconIndex,
                                      active: active
                                    }),
                                active: active,
                                index: colorIndex,
                                key: String(renderIndex)
                              });
                  }), Caml_array.caml_make_vect(Caml_int32.imul(positionDepth, positionDepth), 0)));
}

var getValue = Modality$ReasonReactExamples.getValue;

var make = Canvas;

exports.getValue = getValue;
exports.make = make;
/* react Not a pure module */
