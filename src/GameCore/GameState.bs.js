'use strict';

var List = require("rescript/lib/js/list.js");
var $$Array = require("rescript/lib/js/array.js");
var Random = require("rescript/lib/js/random.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Modality$MultiNBack = require("./Modality/Modality.bs.js");

function makeRandom(configuration) {
  var modeConfig = configuration.modalities;
  Random.self_init(undefined);
  return {
          position: Belt_Option.map(Modality$MultiNBack.getValue(/* Position */0, modeConfig), (function (value) {
                  return Random.$$int(Math.imul(value, value));
                })),
          color: Belt_Option.map(Modality$MultiNBack.getValue(/* Color */1, modeConfig), Random.$$int),
          icon: Belt_Option.map(Modality$MultiNBack.getValue(/* Icon */2, modeConfig), Random.$$int)
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
                if (Modality$MultiNBack.getValue(modality, answer)) {
                  return Modality$MultiNBack.setValue(modality, Modality$MultiNBack.getValue(modality, configuration.modalities), result);
                } else {
                  return result;
                }
              }), {
              position: undefined,
              color: undefined,
              icon: undefined
            }, Modality$MultiNBack.allModalityTypes);
}

function compareToHistory(answer, gameState, stateHistory, configuration) {
  var oldState = List.nth(stateHistory, configuration.depth - 1 | 0);
  if ($$Array.for_all((function (modality) {
            return compareValue(Modality$MultiNBack.getValue(modality, configuration.modalities), Modality$MultiNBack.getValue(modality, answer), Modality$MultiNBack.getValue(modality, oldState), Modality$MultiNBack.getValue(modality, gameState));
          }), Modality$MultiNBack.allModalityTypes)) {
    return makeResult(answer, configuration);
  }
  
}

var getValue = Modality$MultiNBack.getValue;

exports.getValue = getValue;
exports.makeRandom = makeRandom;
exports.compareValue = compareValue;
exports.makeEmptyResult = makeEmptyResult;
exports.makeResult = makeResult;
exports.compareToHistory = compareToHistory;
/* No side effect */
