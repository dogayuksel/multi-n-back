'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

var colors = /* array */[
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab"
];

var modalities = /* array */[
  {
    label: "Color",
    renderFunction: (function (element, param) {
        return React.createElement("div", {
                    style: {
                      backgroundColor: Caml_array.caml_array_get(colors, param.depth - 1 | 0),
                      display: "inline-block",
                      margin: "5px"
                    }
                  }, element);
      })
  },
  {
    label: "Position",
    renderFunction: (function (element, param) {
        return React.createElement(React.Fragment, undefined, $$Array.mapi((function (param, param$1) {
                          return element;
                        }), Caml_array.caml_make_vect(param.depth, 0)));
      })
  }
];

exports.colors = colors;
exports.modalities = modalities;
/* react Not a pure module */
