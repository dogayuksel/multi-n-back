'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var AppStyles$ReasonReactExamples = require("../AppStyles.bs.js");

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
                display: "flex",
                margin: "12px",
                alignItems: "center"
              }
            }, React.createElement("div", {
                  style: {
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
                    backgroundColor: AppStyles$ReasonReactExamples.background_less_darker,
                    display: "flex",
                    height: "20px",
                    margin: "0 30px",
                    position: "relative",
                    width: "45px",
                    borderRadius: "2px",
                    boxShadow: "inset 4px 4px 12px " + (AppStyles$ReasonReactExamples.background_more_darker + (", inset -4px -4px 12px " + AppStyles$ReasonReactExamples.background_less_lighter)),
                    alignItems: "flex-end"
                  }
                }, $$Array.map((function (index) {
                        var match = intValue >= index;
                        var match$1 = intValue >= index;
                        return React.createElement("div", {
                                    style: {
                                      backgroundColor: match ? color(index) : "",
                                      display: match$1 ? "inline-block" : "none",
                                      height: String((index << 1)) + "px",
                                      width: "5px",
                                      borderRadius: index !== 1 ? (
                                          index !== 9 ? "1px 1px 0 0" : "1px 1px 2px 0"
                                        ) : "1px 1px 0 2px"
                                    }
                                  });
                      }), Belt_Array.range(1, 9)), React.createElement("div", {
                      style: {
                        height: "20px",
                        left: "0",
                        position: "absolute",
                        top: "0",
                        width: "45px",
                        opacity: "0.7",
                        borderRadius: "2px",
                        boxShadow: "inset 1px 1px 3px " + (AppStyles$ReasonReactExamples.background_more_darker + (", inset -1px -1px 3px " + AppStyles$ReasonReactExamples.background_less_lighter))
                      }
                    })), React.createElement("button", {
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
