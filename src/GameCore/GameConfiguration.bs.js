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

exports.makeDefault = makeDefault;
/* No side effect */
