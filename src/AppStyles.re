let blue = "#48a9dc";
let background = "#e0e2ef";
let background_less_darker = "#d0d2de";
let background_less_lighter = "#f0f2ff";
let background_more_darker = "#c1c2ce";
let background_more_lighter = "#ffffff";

// The {j|...|j} feature is just string interpolation, from
// bucklescript.github.io/docs/en/interop-cheatsheet#string-unicode-interpolation
// This allows us to conveniently write CSS, together with variables, by
// constructing a string
let style = {j|
  * {
    box-sizing: content-box;
  }

  body {
    margin: 0;
    background-color: $background;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }

  button {
    box-shadow:  6px  6px 20px $background_more_darker,
                -6px -6px 20px $background_more_lighter;
    border-radius: 5px;
    border: none;
    background-color: $background;
    padding: 8px;
    color: $blue;
    font-size: 16px;
  }

  button:active {
    box-shadow:  3px  3px 12px $background_more_darker,
                -3px -3px 12px $background_more_lighter;
    background: linear-gradient(135deg,
                                $background_less_darker,
                                $background_less_lighter);
  }

  button:disabled {
    box-shadow:  1px  1px 2px $background_more_darker,
                -1px -1px 2px $background_more_lighter;
  }

  .container {
    margin: 50px 25px;
    box-shadow:  16px  16px 40px $background_more_darker,
                -16px -16px 40px $background_more_lighter;
    border-radius: 30px;
    font-family: sans-serif;
    min-width:650px;
    position: absolute;
    overflow-y: hidden;
    height: calc(100vh - 100px);
  }

  @media (max-width: 720px) {
    .container {
      margin: 0;
      box-shadow: none;
      border-radius: 0;
      width: 100vw;
      height: 100vh;
    }
  }

  .contentContainer {
    border-radius: 0px 0px 30px 30px;
    background-color: $background;
    padding: 16px;
  }

  .titleContainer {
    margin: 1.5em 40px;
    font-weight: 500;
    font-size: 1.4em;
  }

  .overviewContainer {
    display: flex;
    justify-content: space-between;
  }

  .scoreContainer {
    margin: 10px 40px;
    box-shadow:  6px  6px 20px $background_more_darker,
                -6px -6px 20px $background_more_lighter;
    border-radius: 12px;
    height: 4em;
    min-width: 8em;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .canvasContainer {
    margin: 25px 40px;
    box-shadow: inset  12px  12px 30px $background_more_darker,
                inset -12px -12px 30px $background_more_lighter;
    border-radius: 20px;
    background: $background;
    padding: 40px;
  }

  .configurationWrapper {
    position: absolute;
    top: 0;
    width: calc(100%  - 32px);
    height: 0;
  }

  .configurationContainer {
    margin: 20px;
    margin-top: 40px;
    box-shadow: inset  12px  12px 30px $background_more_darker,
                inset -12px -12px 30px $background_more_lighter;
    border-radius: 20px;
    background: $background;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 250ms;
    will-change: transform;
    height: calc(100vh - 260px);
  }

  @media (max-width: 720px) {
    .configurationContainer {
      height: calc(100vh - 180px);
    }
  }

  .configPanelOpen {
    transform: translateY(0);
  }

  .configPanelClosed {
    transform: translateY(100vh);
  }
|j};
