'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

function calculateScore(result, depth) {
  return Caml_int32.imul((depth << 1), $$Array.fold_left((function (acc, cur) {
                    var match = Modality$ReasonReactExamples.getValue(cur, result);
                    if (match !== undefined) {
                      return Caml_int32.imul(acc, match);
                    } else {
                      return acc;
                    }
                  }), 1, Modality$ReasonReactExamples.allModalityTypes));
}

exports.calculateScore = calculateScore;
/* No side effect */
