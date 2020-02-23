let getValue = Modality.getValue;

type modalityIndices = Modality.modalities(int);

let getSize =
  fun
  | 0
  | 1 => (80, 88, 76)
  | 2 => (60, 66, 58)
  | 3 => (43, 48, 41)
  | 4 => (40, 44, 38)
  | 5 => (30, 33, 28)
  | _ => (20, 22, 18);

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

  let (width, height, iconSize) = getSize(positionDepth);

  <div
    className="canvasContainer"
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
            width
            height
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
              size=iconSize
            />
          </Color>;
        })
     |> ReasonReact.array}
  </div>;
};
