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

  .container {
    margin: 50px 25px;
    box-shadow:  16px  16px 40px $background_more_darker,
                -16px -16px 40px $background_more_lighter;
    border-radius: 30px;
    font-family: sans-serif;
  }

  button:disabled {
    box-shadow:  1px  1px 2px $background_more_darker,
                -1px -1px 2px $background_more_lighter;
  }

  @media (max-width: 720px) {
    .container {
      margin: 0;
      box-shadow: none;
      border-radius: 0;
      width: 100vw;
    }
  }

  .containerTitle {
    margin: 2em calc(16px + 40px);
    font-weight: 500;
    font-size: 1.4em;
  }

  .containerContent {
    border-radius: 0px 0px 30px 30px;
    background-color: $background;
    padding: 16px;
  }

  .containerOverview {
    display: flex;
    justify-content: space-between;
  }

  .containerScore {
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

  .containerCanvas {
    margin: 40px;
    box-shadow: inset  12px  12px 30px $background_more_darker,
                inset -12px -12px 30px $background_more_lighter;
    border-radius: 20px;
    background: $background;
    padding: 40px;
  }

  .containerConfiguration {
    margin: 40px;
    box-shadow: inset  12px  12px 30px $background_more_darker,
                inset -12px -12px 30px $background_more_lighter;
    border-radius: 20px;
    background: $background;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
|j};
