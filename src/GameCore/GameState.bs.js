'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Random = require("bs-platform/lib/js/random.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

function makeRandom(configuration) {
  var modeConfig = configuration.modalities;
  Random.self_init(/* () */0);
  return {
          position: Belt_Option.map(Modality$ReasonReactExamples.getValue(/* Position */0, modeConfig), (function (value) {
                  return Random.$$int(Caml_int32.imul(value, value));
                })),
          color: Belt_Option.map(Modality$ReasonReactExamples.getValue(/* Color */1, modeConfig), Random.$$int),
          icon: Belt_Option.map(Modality$ReasonReactExamples.getValue(/* Icon */2, modeConfig), Random.$$int)
        };
}

function compareValue(modalityConfig, modalityAnswer, modalityOldValue, modalityValue) {
  if (modalityConfig !== undefined && modalityOldValue !== undefined && modalityValue !== undefined) {
    return modalityOldValue === modalityValue === modalityAnswer;
  } else {
    return true;
  }
}

function makeEmptyResult(param) {
  return {
          position: undefined,
          color: undefined,
          icon: undefined
        };
}

function makeResult(answer, configuration) {
  return $$Array.fold_left((function (result, modality) {
                var match = Modality$ReasonReactExamples.getValue(modality, answer);
                if (match) {
                  return Modality$ReasonReactExamples.setValue(modality, Modality$ReasonReactExamples.getValue(modality, configuration.modalities), result);
                } else {
                  return result;
                }
              }), {
              position: undefined,
              color: undefined,
              icon: undefined
            }, Modality$ReasonReactExamples.allModalityTypes);
}

function compareToHistory(answer, gameState, stateHistory, configuration) {
  var oldState = List.nth(stateHistory, configuration.depth - 1 | 0);
  var match = $$Array.for_all((function (modality) {
          return compareValue(Modality$ReasonReactExamples.getValue(modality, configuration.modalities), Modality$ReasonReactExamples.getValue(modality, answer), Modality$ReasonReactExamples.getValue(modality, oldState), Modality$ReasonReactExamples.getValue(modality, gameState));
        }), Modality$ReasonReactExamples.allModalityTypes);
  if (match) {
    return makeResult(answer, configuration);
  }
  
}

var getValue = Modality$ReasonReactExamples.getValue;

exports.getValue = getValue;
exports.makeRandom = makeRandom;
exports.compareValue = compareValue;
exports.makeEmptyResult = makeEmptyResult;
exports.makeResult = makeResult;
exports.compareToHistory = compareToHistory;
/* No side effect */
