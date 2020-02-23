'use strict';

var React = require("react");

function Statistics(Props) {
  var label = Props.label;
  var value = Props.value;
  return React.createElement("div", {
              style: {
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }
            }, React.createElement("div", {
                  style: {
                    paddingTop: "0.8em"
                  }
                }, label), React.createElement("div", {
                  style: {
                    fontSize: "1.5em",
                    lineHeight: "1.6em"
                  }
                }, String(value)));
}

var make = Statistics;

exports.make = make;
/* react Not a pure module */
