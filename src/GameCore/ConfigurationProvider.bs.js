'use strict';

var React = require("react");

var configurationContext = React.createContext({
      depth: /* array */[]
    });

function makeProps(value, children, param) {
  return {
          value: value,
          children: children
        };
}

var make = configurationContext.Provider;

exports.configurationContext = configurationContext;
exports.makeProps = makeProps;
exports.make = make;
/* configurationContext Not a pure module */
