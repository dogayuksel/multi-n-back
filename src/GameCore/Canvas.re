[@react.component]
let make = (~gameConfiguration: GameConfiguration.t, ~gameState: GameState.t) => {
  let (positionDepth, positionIndex) =
    switch (gameConfiguration.position, gameState.position) {
    | (Some(positionDepth), Some(positionIndex)) => (
        positionDepth,
        positionIndex,
      )
    | _ => (1, 0)
    };

  let colorIndex =
    switch (gameConfiguration.color, gameState.color) {
    | (Some(_), Some(colorIndex)) => colorIndex
    | _ => 0
    };

  let wrapperStyles =
    ReactDOMRe.Style.make(
      ~display="grid",
      ~alignItems="center",
      ~justifyItems="center",
      (),
    );

  <div
    style={ReactDOMRe.Style.unsafeAddProp(
      wrapperStyles,
      "grid-template-columns",
      "repeat(" ++ string_of_int(positionDepth) ++ ", 1fr)",
    )}>
    {Array.make(positionDepth * positionDepth, 0)
     |> Array.mapi((renderIndex, _) =>
          <div
            style={ReactDOMRe.Style.make(
              ~backgroundColor=
                positionIndex == renderIndex
                  ? Modality.colors[colorIndex] : "#EEEEEE",
              ~display="flex",
              ~alignItems="center",
              ~margin="5px",
              ~width="50px",
              ~height="65px",
              (),
            )}>
            {switch (
               gameConfiguration.icon,
               gameState.icon,
               positionIndex == renderIndex,
             ) {
             | (Some(_), Some(iconIndex), true) =>
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 enableBackground="new 0 0 24 24"
                 height="48"
                 viewBox="0 0 24 24"
                 width="48">
                 <g> <rect fill="none" height="24" width="24" /> </g>
                 <g>
                   <g> <path d={Array.get(Modality.icons, iconIndex)} /> </g>
                 </g>
               </svg>
             | _ => ReasonReact.null
             }}
          </div>
        )
     |> ReasonReact.array}
  </div>;
};
