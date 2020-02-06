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
  var modalityIndices = $$Array.fold_left((function (acc, modality) {
          var match = Modality$ReasonReactExamples.getValue(modality, config.modalities);
          var match$1 = Modality$ReasonReactExamples.getValue(modality, gameState);
          var value = match !== undefined && match$1 !== undefined ? match$1 : 0;
          return Modality$ReasonReactExamples.setValue(modality, value, acc);
        }), Modality$ReasonReactExamples.make(0), Modality$ReasonReactExamples.allModalityTypes);
  var match = Modality$ReasonReactExamples.getValue(/* Position */0, config.modalities);
  var positionDepth = match !== undefined ? match : 1;
  var wrapperStyles = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center"
  };
  return React.createElement("div", {
              style: ReactDOMRe.Style.unsafeAddProp(wrapperStyles, "gridTemplateColumns", "repeat(" + (String(positionDepth) + ", 1fr)"))
            }, $$Array.mapi((function (renderIndex, param) {
                    var active = Modality$ReasonReactExamples.getValue(/* Position */0, modalityIndices) === renderIndex;
                    return React.createElement(Color$ReasonReactExamples.make, {
                                children: React.createElement(Icon$ReasonReactExamples.make, {
                                      index: Modality$ReasonReactExamples.getValue(/* Icon */2, modalityIndices),
                                      active: active
                                    }),
                                active: active,
                                index: Modality$ReasonReactExamples.getValue(/* Color */1, modalityIndices),
                                key: String(renderIndex)
                              });
                  }), Caml_array.caml_make_vect(Caml_int32.imul(positionDepth, positionDepth), 0)));
}

var getValue = Modality$ReasonReactExamples.getValue;

var make = Canvas;

exports.getValue = getValue;
exports.make = make;
/* react Not a pure module */
