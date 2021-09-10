'use strict';


var allModalityTypes = [
  /* Position */0,
  /* Color */1,
  /* Icon */2
];

function make(value) {
  return {
          position: value,
          color: value,
          icon: value
        };
}

function getValue(modality, modalities) {
  switch (modality) {
    case /* Position */0 :
        return modalities.position;
    case /* Color */1 :
        return modalities.color;
    case /* Icon */2 :
        return modalities.icon;
    
  }
}

function setValue(modality, value, modalities) {
  switch (modality) {
    case /* Position */0 :
        return {
                position: value,
                color: modalities.color,
                icon: modalities.icon
              };
    case /* Color */1 :
        return {
                position: modalities.position,
                color: value,
                icon: modalities.icon
              };
    case /* Icon */2 :
        return {
                position: modalities.position,
                color: modalities.color,
                icon: value
              };
    
  }
}

function getLabel(x) {
  switch (x) {
    case /* Position */0 :
        return "Position";
    case /* Color */1 :
        return "Color";
    case /* Icon */2 :
        return "Icon";
    
  }
}

exports.allModalityTypes = allModalityTypes;
exports.make = make;
exports.getValue = getValue;
exports.setValue = setValue;
exports.getLabel = getLabel;
/* No side effect */
