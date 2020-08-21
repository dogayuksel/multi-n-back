'use strict';

var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

var colors = [
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
  var width = Props.width;
  var height = Props.height;
  return React.createElement("div", {
              style: {
                backgroundColor: active ? Caml_array.caml_array_get(colors, index) : "#EEEEEE",
                display: "flex",
                height: String(height) + "px",
                margin: String(width / 5 | 0) + "px",
                width: String(width) + "px",
                alignItems: "center"
              }
            }, children);
}

var make = Color;

exports.colors = colors;
exports.make = make;
/* react Not a pure module */
