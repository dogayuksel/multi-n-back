'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var App$ReasonReactExamples = require("./App.bs.js");
var AppStyles$ReasonReactExamples = require("./AppStyles.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = AppStyles$ReasonReactExamples.style;

function makeContainer(param) {
  var container = document.createElement("div");
  container.className = "container";
  var content = document.createElement("div");
  content.className = "contentContainer";
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(App$ReasonReactExamples.make, {}), makeContainer(undefined));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
