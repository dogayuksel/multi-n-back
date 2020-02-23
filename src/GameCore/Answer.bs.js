'use strict';

var Modality$ReasonReactExamples = require("./Modality/Modality.bs.js");

function make(param) {
  return {
          position: false,
          color: false,
          icon: false
        };
}

function toggleValue(modality, answer) {
  return !Modality$ReasonReactExamples.getValue(modality, answer);
}

function toggle(modality, answer) {
  switch (modality) {
    case /* Position */0 :
        return {
                position: !Modality$ReasonReactExamples.getValue(/* Position */0, answer),
                color: answer.color,
                icon: answer.icon
              };
    case /* Color */1 :
        return {
                position: answer.position,
                color: !Modality$ReasonReactExamples.getValue(/* Color */1, answer),
                icon: answer.icon
              };
    case /* Icon */2 :
        return {
                position: answer.position,
                color: answer.color,
                icon: !Modality$ReasonReactExamples.getValue(/* Icon */2, answer)
              };
    
  }
}

exports.make = make;
exports.toggleValue = toggleValue;
exports.toggle = toggle;
/* No side effect */
