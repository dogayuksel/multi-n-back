let getValue = Modality.getValue;

[@react.component]
let make = (~config: GameConfiguration.t, ~gameState: GameState.t) => {
  let (positionDepth, positionIndex) =
    switch (
      config.modalities |> getValue(Position),
      gameState |> getValue(Position),
    ) {
    | (Some(positionDepth), Some(positionIndex)) => (
        positionDepth,
        positionIndex,
      )
    | _ => (1, 0)
    };

  let colorIndex =
    switch (
      config.modalities |> getValue(Color),
      gameState |> getValue(Color),
    ) {
    | (Some(_), Some(colorIndex)) => colorIndex
    | _ => 0
    };

  let iconIndex =
    switch (
      config.modalities |> getValue(Icon),
      gameState |> getValue(Icon),
    ) {
    | (Some(_), Some(iconIndex)) => iconIndex
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
      "gridTemplateColumns",
      "repeat(" ++ string_of_int(positionDepth) ++ ", 1fr)",
    )}>
    {Array.make(positionDepth * positionDepth, 0)
     |> Array.mapi((renderIndex, _) => {
          let active = positionIndex == renderIndex;
          <Color key={string_of_int(renderIndex)} active index=colorIndex>
            <Icon active index=iconIndex />
          </Color>;
        })
     |> ReasonReact.array}
  </div>;
};
