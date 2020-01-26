'use strict';

var React = require("react");

var gameContext = React.createContext({
      availableModalities: /* array */[],
      selectedModalities: /* array */[]
    });

function makeProps(value, children, param) {
  return {
          value: value,
          children: children
        };
}

var make = gameContext.Provider;

exports.gameContext = gameContext;
exports.makeProps = makeProps;
exports.make = make;
/* gameContext Not a pure module */
