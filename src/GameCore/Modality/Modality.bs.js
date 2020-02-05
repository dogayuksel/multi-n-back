'use strict';


var allModalityTypes = /* array */[
  /* Position */0,
  /* Color */1,
  /* Icon */2
];

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

function getLabel(param) {
  switch (param) {
    case /* Position */0 :
        return "Position";
    case /* Color */1 :
        return "Color";
    case /* Icon */2 :
        return "Icon";
    
  }
}

exports.allModalityTypes = allModalityTypes;
exports.getValue = getValue;
exports.getLabel = getLabel;
/* No side effect */
