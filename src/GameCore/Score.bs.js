'use strict';

var $$Array = require("rescript/lib/js/array.js");
var Pervasives = require("rescript/lib/js/pervasives.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Modality$MultiNBack = require("./Modality/Modality.bs.js");

var highScoreKey = "multi_n_back_hight_score";

function setHighScore(score) {
  window.localStorage.setItem(highScoreKey, String(score));
  return score;
}

function calculateScore(result, depth) {
  return Math.imul((depth << 1), $$Array.fold_left((function (acc, cur) {
                    var value = Modality$MultiNBack.getValue(cur, result);
                    if (value !== undefined) {
                      return Math.imul(acc, value);
                    } else {
                      return acc;
                    }
                  }), 1, Modality$MultiNBack.allModalityTypes));
}

function getHighScore(param) {
  return Belt_Option.flatMap(Caml_option.nullable_to_opt(window.localStorage.getItem(highScoreKey)), Pervasives.int_of_string_opt);
}

function updateHighScore(score) {
  var value = getHighScore(undefined);
  if (value !== undefined && value > score) {
    return value;
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
