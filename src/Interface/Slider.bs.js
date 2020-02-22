'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function color(scale) {
  switch (scale) {
    case 0 :
        return "#006837";
    case 1 :
        return "#1a9850";
    case 2 :
        return "#66bd63";
    case 3 :
    case 4 :
        return "#a6d96a";
    case 5 :
    case 6 :
        return "#d9ef8b";
    case 7 :
        return "#fdae61";
    case 8 :
        return "#f46d43";
    case 9 :
        return "#d73027";
    default:
      throw Caml_builtin_exceptions.not_found;
  }
}

function Slider(Props) {
  var label = Props.label;
  var value = Props.value;
  var onChange = Props.onChange;
  var intValue = value !== undefined ? value : 0;
  return React.createElement("div", {
              style: {
                margin: "12px"
              }
            }, React.createElement("div", {
                  style: {
                    display: "inline-block",
                    margin: "12px",
                    minWidth: "70px",
                    textAlign: "right"
                  }
                }, label), React.createElement("button", {
                  disabled: intValue <= 0,
                  onClick: (function (param) {
                      return Curry._1(onChange, intValue - 1 | 0);
                    })
                }, "Easier"), React.createElement("div", {
                  style: {
                    display: "inline-block",
                    margin: "12px"
                  }
                }, $$Array.map((function (index) {
                        var match = index > intValue;
                        return React.createElement("div", {
                                    style: {
                                      backgroundColor: match ? "#ffffff" : color(index),
                                      display: "inline-block",
                                      height: String((index << 1)) + "px",
                                      width: "5px"
                                    }
                                  });
                      }), Belt_Array.range(0, 9))), React.createElement("button", {
                  disabled: intValue >= 9,
                  onClick: (function (param) {
                      return Curry._1(onChange, intValue + 1 | 0);
                    })
                }, "Harder"));
}

var make = Slider;

exports.color = color;
exports.make = make;
/* react Not a pure module */
