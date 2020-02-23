'use strict';


var blue = "#48a9dc";

var background = "#e0e2ef";

var background_less_darker = "#d0d2de";

var background_less_lighter = "#f0f2ff";

var background_more_darker = "#c1c2ce";

var background_more_lighter = "#ffffff";

var style = "\n  * {\n    box-sizing: content-box;\n  }\n\n  body {\n    margin: 0;\n    background-color: " + (String(background) + (";\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    font-size: 16px;\n  }\n\n  button {\n    box-shadow:  6px  6px 20px " + (String(background_more_darker) + (",\n                -6px -6px 20px " + (String(background_more_lighter) + (";\n    border-radius: 5px;\n    border: none;\n    background-color: " + (String(background) + (";\n    padding: 8px;\n    color: " + (String(blue) + (";\n    font-size: 16px;\n  }\n\n  button:active {\n    box-shadow:  3px  3px 12px " + (String(background_more_darker) + (",\n                -3px -3px 12px " + (String(background_more_lighter) + (";\n    background: linear-gradient(135deg,\n                                " + (String(background_less_darker) + (",\n                                " + (String(background_less_lighter) + (");\n  }\n\n  button:disabled {\n    box-shadow:  1px  1px 2px " + (String(background_more_darker) + (",\n                -1px -1px 2px " + (String(background_more_lighter) + (";\n  }\n\n  .container {\n    margin: 50px 25px;\n    box-shadow:  16px  16px 40px " + (String(background_more_darker) + (",\n                -16px -16px 40px " + (String(background_more_lighter) + (";\n    border-radius: 30px;\n    font-family: sans-serif;\n    min-width:650px;\n    position: absolute;\n    overflow-y: hidden;\n    height: calc(100vh - 100px);\n  }\n\n  @media (max-width: 720px) {\n    .container {\n      margin: 0;\n      box-shadow: none;\n      border-radius: 0;\n      width: 100vw;\n      height: 100vh;\n    }\n  }\n\n  .contentContainer {\n    border-radius: 0px 0px 30px 30px;\n    background-color: " + (String(background) + (";\n    padding: 16px;\n  }\n\n  .titleContainer {\n    margin: 1.5em 40px;\n    font-weight: 500;\n    font-size: 1.4em;\n  }\n\n  .overviewContainer {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .scoreContainer {\n    margin: 10px 40px;\n    box-shadow:  6px  6px 20px " + (String(background_more_darker) + (",\n                -6px -6px 20px " + (String(background_more_lighter) + (";\n    border-radius: 12px;\n    height: 4em;\n    min-width: 8em;\n    padding: 1.5em;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .canvasContainer {\n    margin: 40px;\n    box-shadow: inset  12px  12px 30px " + (String(background_more_darker) + (",\n                inset -12px -12px 30px " + (String(background_more_lighter) + (";\n    border-radius: 20px;\n    background: " + (String(background) + (";\n    padding: 40px;\n  }\n\n  .configurationWrapper {\n    position: absolute;\n    width: calc(100%  - 32px);\n    height: 0;\n  }\n\n  .configurationContainer {\n    margin: 40px;\n    box-shadow: inset  12px  12px 30px " + (String(background_more_darker) + (",\n                inset -12px -12px 30px " + (String(background_more_lighter) + (";\n    border-radius: 20px;\n    background: " + (String(background) + ";\n    padding: 40px 20px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transition: transform 250ms;\n    will-change: transform;\n  }\n\n  .configPanelOpen {\n    transform: translateY(-100px);\n  }\n\n  .configPanelClosed {\n    transform: translateY(70vh);\n  }\n")))))))))))))))))))))))))))))))))))))))))));

exports.blue = blue;
exports.background = background;
exports.background_less_darker = background_less_darker;
exports.background_less_lighter = background_less_lighter;
exports.background_more_darker = background_more_darker;
exports.background_more_lighter = background_more_lighter;
exports.style = style;
/* style Not a pure module */
