'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

var highScoreKey = "multi_n_back_hight_score";

function setHighScore(score) {
  window.localStorage.setItem(highScoreKey, String(score));
  return score;
}

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

function getHighScore(param) {
  return Belt_Option.flatMap(Caml_option.nullable_to_opt(window.localStorage.getItem(highScoreKey)), Pervasives.int_of_string_opt);
}

function updateHighScore(score) {
  var match = getHighScore(/* () */0);
  if (match !== undefined) {
    var value = match;
    var match$1 = value > score;
    if (match$1) {
      return value;
    } else {
      return setHighScore(score);
    }
  } else {
    return setHighScore(score);
  }
}

exports.highScoreKey = highScoreKey;
exports.setHighScore = setHighScore;
exports.calculateScore = calculateScore;
exports.getHighScore = getHighScore;
exports.updateHighScore = updateHighScore;
/* No side effect */
