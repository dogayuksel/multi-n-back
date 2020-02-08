'use strict';


function makeDefault(param) {
  return {
          modalities: {
            position: 2,
            color: 4,
            icon: 4
          },
          depth: 1
        };
}

function updateModality(modality, value, config) {
  var tmp;
  switch (modality) {
    case /* Position */0 :
        var init = config.modalities;
        tmp = {
          position: value,
          color: init.color,
          icon: init.icon
        };
        break;
    case /* Color */1 :
        var init$1 = config.modalities;
        tmp = {
          position: init$1.position,
          color: value,
          icon: init$1.icon
        };
        break;
    case /* Icon */2 :
        var init$2 = config.modalities;
        tmp = {
          position: init$2.position,
          color: init$2.color,
          icon: value
        };
        break;
    
  }
  return {
          modalities: tmp,
          depth: config.depth
        };
}

function updateDepth(value, config) {
  return {
          modalities: config.modalities,
          depth: value
        };
}

exports.makeDefault = makeDefault;
exports.updateModality = updateModality;
exports.updateDepth = updateDepth;
/* No side effect */
