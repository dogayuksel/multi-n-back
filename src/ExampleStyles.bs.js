'use strict';


var reasonReactBlue = "#48a9dc";

var style = "\n  body {\n    margin: 0;\n    background-color: #e0e2ef;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    font-size: 16px;\n  }\n\n  button {\n    box-shadow:  6px  6px 20px #c1c2ce,\n                -6px -6px 20px #ffffff;\n    border-radius: 5px;\n    border: none;\n    background-color: #e0e2ef;\n    padding: 8px;\n    color: " + (String(reasonReactBlue) + ";\n    font-size: 16px;\n  }\n\n  button:active {\n    box-shadow:  3px  3px 10px #c1c2ce,\n                -3px -3px 10px #ffffff;\n    background: linear-gradient(135deg, #cacbd7, #f0f2ff);\n  }\n\n  .container {\n    margin: 50px 25px;\n    box-shadow:  16px  16px 40px #c1c2ce,\n                -16px -16px 40px #ffffff;\n    min-width: 720px;\n    border-radius: 30px;\n    font-family: sans-serif;\n  }\n\n  .containerTitle {\n    margin: 2em calc(16px + 40px);\n    font-weight: 500;\n    font-size: 1.4em;\n  }\n\n  .containerContent {\n    border-radius: 0px 0px 30px 30px;\n    background-color: #e0e2ef;\n    padding: 16px;\n  }\n\n  .containerOverview {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .containerScore {\n    margin: 10px 40px;\n    box-shadow:  6px  6px 20px #c1c2ce,\n                -6px -6px 20px #ffffff;\n    border-radius: 12px;\n    height: 4em;\n    min-width: 8em;\n    padding: 1.5em;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .containerCanvas {\n    margin: 40px;\n    box-shadow: inset  12px  12px 30px #c1c2ce,\n                inset -12px -12px 30px #ffffff;\n    border-radius: 20px;\n    background: #e0e2ef;\n    padding: 40px;\n  }\n");

exports.reasonReactBlue = reasonReactBlue;
exports.style = style;
/* style Not a pure module */
