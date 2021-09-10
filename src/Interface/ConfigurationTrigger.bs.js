'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var AppStyles$MultiNBack = require("../AppStyles.bs.js");

function ConfigurationTrigger(Props) {
  var toggleConfigPanelOpen = Props.toggleConfigPanelOpen;
  return React.createElement("div", {
              style: {
                bottom: "0",
                color: AppStyles$MultiNBack.blue,
                height: "40px",
                left: "calc(50% - 75px)",
                paddingTop: "1.5em",
                position: "absolute",
                textAlign: "center",
                width: "150px",
                borderRadius: "40px 40px 0 0",
                boxShadow: "inset 12px 12px 30px " + (AppStyles$MultiNBack.background_more_darker + (", inset -12px -12px 30px " + AppStyles$MultiNBack.background_more_lighter))
              },
              onClick: (function (param) {
                  return Curry._1(toggleConfigPanelOpen, undefined);
                })
            }, "Configure");
}

var make = ConfigurationTrigger;

exports.make = make;
/* react Not a pure module */
