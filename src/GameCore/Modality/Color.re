let colors = [|
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
|];

[@react.component]
let make = (~children, ~active: bool, ~index: int) =>
  <div
    style={ReactDOMRe.Style.make(
      ~backgroundColor=active ? colors[index] : "#EEEEEE",
      ~display="flex",
      ~alignItems="center",
      ~margin="5px",
      ~width="50px",
      ~height="65px",
      (),
    )}>
    children
  </div>;
