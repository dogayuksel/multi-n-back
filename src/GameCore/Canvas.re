let getValue = Modality.getValue;

type modalityIndices = Modality.modalities(int);

[@react.component]
let make = (~config: GameConfiguration.t, ~gameState: GameState.t) => {
  let modalityIndices =
    Modality.allModalityTypes
    |> Array.fold_left(
         (acc, modality) => {
           let value =
             switch (
               config.modalities |> getValue(modality),
               gameState |> getValue(modality),
             ) {
             | (Some(_), Some(index)) => index
             | _ => 0
             };
           acc |> Modality.setValue(modality, value);
         },
         Modality.make(0),
       );

  let positionDepth =
    switch (config.modalities |> getValue(Position)) {
    | Some(positionDepth) => positionDepth
    | _ => 1
    };

  let wrapperStyles =
    ReactDOMRe.Style.make(
      ~display="grid",
      ~alignItems="center",
      ~justifyItems="center",
      (),
    );

  <div
    className="containerCanvas"
    style={ReactDOMRe.Style.unsafeAddProp(
      wrapperStyles,
      "gridTemplateColumns",
      "repeat(" ++ string_of_int(positionDepth) ++ ", 1fr)",
    )}>
    {Array.make(positionDepth * positionDepth, 0)
     |> Array.mapi((renderIndex, _) => {
          let active =
            modalityIndices |> Modality.getValue(Position) == renderIndex;
          <Color
            key={string_of_int(renderIndex)}
            active={
              active
              && config.modalities
              |> Modality.getValue(Color)
              |> Belt.Option.isSome
            }
            index={modalityIndices |> Modality.getValue(Color)}>
            <Icon
              active={
                active
                && config.modalities
                |> Modality.getValue(Icon)
                |> Belt.Option.isSome
              }
              index={modalityIndices |> Modality.getValue(Icon)}
            />
          </Color>;
        })
     |> ReasonReact.array}
  </div>;
};
