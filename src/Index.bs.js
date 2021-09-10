'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var App$MultiNBack = require("./App.bs.js");
var AppStyles$MultiNBack = require("./AppStyles.bs.js");

var $$Element = {};

var $$Document = {};

var Webapi = {
  $$Element: $$Element,
  $$Document: $$Document
};

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = AppStyles$MultiNBack.style;

var body = document.body;

var root = document.createElement("div");

body.appendChild(root);

function makeContainer(param) {
  var container = document.createElement("div");
  container.className = "container";
  var content = document.createElement("div");
  content.className = "contentContainer";
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(App$MultiNBack.make, {}), makeContainer(undefined));

exports.Webapi = Webapi;
exports.style = style;
exports.body = body;
exports.root = root;
exports.makeContainer = makeContainer;
/* style Not a pure module */
