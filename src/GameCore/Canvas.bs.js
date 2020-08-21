'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var ReactDOMStyle = require("reason-react/src/ReactDOMStyle.bs.js");
var Icon$ReasonReactExamples = require("./Modality/Icon.bs.js");
var Color$ReasonReactExamples = require("./Modality/Color.bs.js");
var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

function getSize(param) {
  switch (param) {
    case 0 :
    case 1 :
        return [
                80,
                88,
                76
              ];
    case 2 :
        return [
                60,
                66,
                58
              ];
    case 3 :
        return [
                43,
                48,
                41
              ];
    case 4 :
        return [
                40,
                44,
                38
              ];
    case 5 :
        return [
                30,
                33,
                28
              ];
    default:
      return [
              20,
              22,
              18
            ];
  }
}

function Canvas(Props) {
  var config = Props.config;
  var gameState = Props.gameState;
  var modalityIndices = $$Array.fold_left((function (acc, modality) {
          var match = Modality$ReasonReactExamples.getValue(modality, config.modalities);
          var match$1 = Modality$ReasonReactExamples.getValue(modality, gameState);
          var value = match !== undefined && match$1 !== undefined ? match$1 : 0;
          return Modality$ReasonReactExamples.setValue(modality, value, acc);
        }), Modality$ReasonReactExamples.make(0), Modality$ReasonReactExamples.allModalityTypes);
  var positionDepth = Modality$ReasonReactExamples.getValue(/* Position */0, config.modalities);
  var positionDepth$1 = positionDepth !== undefined ? positionDepth : 1;
  var wrapperStyles = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center"
  };
  var match = getSize(positionDepth$1);
  var iconSize = match[2];
  var height = match[1];
  var width = match[0];
  return React.createElement("div", {
              className: "canvasContainer",
              style: ReactDOMStyle.unsafeAddProp(wrapperStyles, "gridTemplateColumns", "repeat(" + (String(positionDepth$1) + ", 1fr)"))
            }, $$Array.mapi((function (renderIndex, param) {
                    var active = Modality$ReasonReactExamples.getValue(/* Position */0, modalityIndices) === renderIndex;
                    return React.createElement(Color$ReasonReactExamples.make, {
                                children: React.createElement(Icon$ReasonReactExamples.make, {
                                      index: Modality$ReasonReactExamples.getValue(/* Icon */2, modalityIndices),
                                      active: active && Belt_Option.isSome(Modality$ReasonReactExamples.getValue(/* Icon */2, config.modalities)),
                                      size: iconSize
                                    }),
                                active: active && Belt_Option.isSome(Modality$ReasonReactExamples.getValue(/* Color */1, config.modalities)),
                                index: Modality$ReasonReactExamples.getValue(/* Color */1, modalityIndices),
                                width: width,
                                height: height,
                                key: String(renderIndex)
                              });
                  }), Caml_array.caml_make_vect(Math.imul(positionDepth$1, positionDepth$1), 0)));
}

var getValue = Modality$ReasonReactExamples.getValue;

var make = Canvas;

exports.getValue = getValue;
exports.getSize = getSize;
exports.make = make;
/* react Not a pure module */
