'use strict';

var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Slider$MultiNBack = require("./Slider.bs.js");
var Modality$MultiNBack = require("../GameCore/Modality/Modality.bs.js");
var AppStyles$MultiNBack = require("../AppStyles.bs.js");

function ConfigurationPanel(Props) {
  var panelOpen = Props.panelOpen;
  var config = Props.config;
  var updateModalityConfig = Props.updateModalityConfig;
  var updateDepthConfig = Props.updateDepthConfig;
  var togglePanelOpen = Props.togglePanelOpen;
  return React.createElement("div", {
              className: "configurationWrapper"
            }, React.createElement("div", {
                  className: "configurationContainer " + (
                    panelOpen ? "configPanelOpen" : "configPanelClosed"
                  )
                }, $$Array.map((function (modality) {
                        return React.createElement(Slider$MultiNBack.make, {
                                    label: Modality$MultiNBack.getLabel(modality),
                                    value: Modality$MultiNBack.getValue(modality, config.modalities),
                                    onChange: (function (value) {
                                        var optionValue = value !== 0 ? value : undefined;
                                        return Curry._2(updateModalityConfig, modality, optionValue);
                                      }),
                                    key: Modality$MultiNBack.getLabel(modality) + "_config"
                                  });
                      }), Modality$MultiNBack.allModalityTypes), React.createElement("div", {
                      style: {
                        display: "flex",
                        margin: "12px",
                        marginBottom: "48px",
                        alignItems: "center"
                      }
                    }, React.createElement("div", {
                          style: {
                            margin: "12px",
                            minWidth: "60px",
                            textAlign: "right"
                          }
                        }, "Depth"), React.createElement("div", {
                          style: {
                            display: "flex",
                            width: "14.5em",
                            justifyContent: "space-between"
                          }
                        }, $$Array.map((function (index) {
                                return React.createElement("div", {
                                            style: {
                                              color: AppStyles$MultiNBack.blue,
                                              display: "flex",
                                              height: "2em",
                                              lineHeight: "1em",
                                              marginRight: index === 5 ? "0" : "10px",
                                              marginLeft: index === 1 ? "0" : "10px",
                                              width: "2em",
                                              borderRadius: "10px",
                                              boxShadow: index === config.depth ? "inset 2px 2px 6px " + (AppStyles$MultiNBack.background_less_darker + (", inset -2px -2px 6px " + AppStyles$MultiNBack.background_less_lighter)) : "8px 8px 20px " + (AppStyles$MultiNBack.background_more_darker + (", -8px -8px 20px " + AppStyles$MultiNBack.background_more_lighter)),
                                              alignItems: "center",
                                              justifyContent: "center"
                                            },
                                            onClick: (function (param) {
                                                return Curry._1(updateDepthConfig, index);
                                              })
                                          }, String(index));
                              }), Belt_Array.range(1, 5)))), React.createElement("button", {
                      style: {
                        fontSize: "1.4em"
                      },
                      onClick: (function (param) {
                          return Curry._1(togglePanelOpen, undefined);
                        })
                    }, React.createElement("div", undefined, "Done"))));
}

var make = ConfigurationPanel;

exports.make = make;
/* react Not a pure module */
