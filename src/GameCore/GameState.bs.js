'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

function advanceState(configuration) {
  Random.self_init(/* () */0);
  return {
          position: Belt_Option.map(configuration.position, (function (value) {
                  return Random.$$int(Caml_int32.imul(value, value));
                })),
          color: Belt_Option.map(configuration.color, Random.$$int),
          icon: Belt_Option.map(configuration.icon, Random.$$int)
        };
}

exports.advanceState = advanceState;
/* No side effect */
