'use strict';

var React = require("react");
var AppStyles$ReasonReactExamples = require("../AppStyles.bs.js");

function AnswerToggle(Props) {
  var checked = Props.checked;
  var onChange = Props.onChange;
  var label = Props.label;
  return React.createElement("label", {
              style: {
                display: "flex",
                height: "2.5em",
                margin: "12px",
                position: "relative",
                width: "10em",
                borderRadius: "10px",
                boxShadow: checked ? "inset 2px 2px 6px " + (AppStyles$ReasonReactExamples.background_less_darker + (", inset -2px -2px 6px " + AppStyles$ReasonReactExamples.background_less_lighter)) : "8px 8px 20px " + (AppStyles$ReasonReactExamples.background_more_darker + (", -8px -8px 20px " + AppStyles$ReasonReactExamples.background_more_lighter)),
                alignItems: "center",
                justifyContent: "center"
              }
            }, React.createElement("input", {
                  style: {
                    bottom: "0",
                    height: "0",
                    left: "0",
                    margin: "0",
                    position: "absolute",
                    width: "0",
                    opacity: "0"
                  },
                  checked: checked,
                  type: "checkbox",
                  onChange: onChange
                }), React.createElement("div", {
                  style: {
                    backgroundColor: checked ? "#13EF32" : "#EEEEEE",
                    height: "10px",
                    marginRight: "0.5em",
                    overflow: "hidden",
                    position: "relative",
                    width: "10px",
                    borderRadius: "10px",
                    boxShadow: checked ? "2px 2px 4px " + (AppStyles$ReasonReactExamples.background_less_darker + (", -2px -2px 4px " + (AppStyles$ReasonReactExamples.background_less_lighter + ", 0 0 4px #13EF32"))) : "2px 2px 4px " + (AppStyles$ReasonReactExamples.background_more_darker + (", -2px -2px 4px " + AppStyles$ReasonReactExamples.background_more_lighter))
                  }
                }, React.createElement("div", {
                      style: {
                        background: checked ? "radial-gradient(#ABEFBC, #13EF32)" : "radial-gradient(" + (AppStyles$ReasonReactExamples.background_less_lighter + (", " + (AppStyles$ReasonReactExamples.background_more_darker + ")"))),
                        height: "15px",
                        left: "-4px",
                        position: "relative",
                        top: "-4px",
                        width: "15px"
                      }
                    })), label);
}

var make = AnswerToggle;

exports.make = make;
/* react Not a pure module */
