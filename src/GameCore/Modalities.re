type renderFunction('a) = (React.element, 'a) => React.element;

type options = {depth: int};

type modality = {
  label: string,
  renderFunction: renderFunction(options),
};

type t = modality;

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

let modalities: array(modality) = [|
  {
    label: "Color",
    renderFunction: (element, {depth}) => {
      <div
        style={ReactDOMRe.Style.make(
          ~backgroundColor=colors[depth - 1],
          ~display="inline-block",
          ~margin="5px",
          (),
        )}>
        element
      </div>;
    },
  },
  {
    label: "Position",
    renderFunction: (element, {depth}) => {
      <>
        {Array.make(depth, 0)
         |> Array.mapi((_, _) => {element})
         |> ReasonReact.array}
      </>;
    },
  },
|];
