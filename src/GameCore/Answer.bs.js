'use strict';


function make(param) {
  return {
          position: false,
          color: false,
          icon: false
        };
}

function toggleAnswer(modality, answer) {
  switch (modality) {
    case /* Position */0 :
        return {
                position: !answer.position,
                color: answer.color,
                icon: answer.icon
              };
    case /* Color */1 :
        return {
                position: answer.position,
                color: !answer.color,
                icon: answer.icon
              };
    case /* Icon */2 :
        return {
                position: answer.position,
                color: answer.color,
                icon: !answer.icon
              };
    
  }
}

exports.make = make;
exports.toggleAnswer = toggleAnswer;
/* No side effect */
