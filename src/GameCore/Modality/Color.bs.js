'use strict';

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

function Color(Props) {
  var children = Props.children;
  var active = Props.active;
  var index = Props.index;
  return React.createElement("div", {
              style: {
                backgroundColor: active ? Caml_array.caml_array_get(colors, index) : "#EEEEEE",
                display: "flex",
                height: "65px",
                margin: "5px",
                width: "50px",
                alignItems: "center"
              }
            }, children);
}

var make = Color;

exports.colors = colors;
exports.make = make;
/* react Not a pure module */
