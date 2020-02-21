let reasonReactBlue = "#48a9dc";

// The {j|...|j} feature is just string interpolation, from
// bucklescript.github.io/docs/en/interop-cheatsheet#string-unicode-interpolation
// This allows us to conveniently write CSS, together with variables, by
// constructing a string
let style = {j|
  body {
    margin: 0;
    background-color: #e0e2ef;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }

  button {
    box-shadow:  6px  6px 20px #c1c2ce,
                -6px -6px 20px #ffffff;
    border-radius: 5px;
    border: none;
    background-color: #e0e2ef;
    padding: 8px;
    color: $reasonReactBlue;
    font-size: 16px;
  }

  button:active {
    box-shadow:  3px  3px 10px #c1c2ce,
                -3px -3px 10px #ffffff;
    background: linear-gradient(135deg, #cacbd7, #f0f2ff);
  }

  .container {
    margin: 50px 25px;
    box-shadow:  16px  16px 40px #c1c2ce,
                -16px -16px 40px #ffffff;
    min-width: 720px;
    border-radius: 30px;
    font-family: sans-serif;
  }

  .containerTitle {
    margin: 2em calc(16px + 40px);
    font-weight: 500;
    font-size: 1.4em;
  }

  .containerContent {
    border-radius: 0px 0px 30px 30px;
    background-color: #e0e2ef;
    padding: 16px;
  }

  .containerOverview {
    display: flex;
    justify-content: space-between;
  }

  .containerScore {
    margin: 10px 40px;
    box-shadow:  6px  6px 20px #c1c2ce,
                -6px -6px 20px #ffffff;
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
    box-shadow: inset  12px  12px 30px #c1c2ce,
                inset -12px -12px 30px #ffffff;
    border-radius: 20px;
    background: #e0e2ef;
    padding: 40px;
  }
|j};
