'use strict';

var List = require("bs-platform/lib/js/list.js");
var Random = require("bs-platform/lib/js/random.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

function makeState(configuration) {
  Random.self_init(/* () */0);
  return {
          position: Belt_Option.map(configuration.position, (function (value) {
                  return Random.$$int(Caml_int32.imul(value, value));
                })),
          color: Belt_Option.map(configuration.color, Random.$$int),
          icon: Belt_Option.map(configuration.icon, Random.$$int)
        };
}

function compareValue(modalityConfig, modalityAnswer, modalityOldValue, modalityValue) {
  if (modalityConfig !== undefined && modalityOldValue !== undefined && modalityValue !== undefined) {
    return modalityOldValue === modalityValue === modalityAnswer;
  } else {
    return true;
  }
}

function compareToHistory(answer, gameState, stateHistory, configuration) {
  var oldState = List.nth(stateHistory, configuration.depth - 1 | 0);
  if (compareValue(configuration.position, answer.position, oldState.position, gameState.position) && compareValue(configuration.color, answer.color, oldState.color, gameState.color)) {
    return compareValue(configuration.icon, answer.icon, oldState.icon, gameState.icon);
  } else {
    return false;
  }
}

exports.makeState = makeState;
exports.compareValue = compareValue;
exports.compareToHistory = compareToHistory;
/* No side effect */
