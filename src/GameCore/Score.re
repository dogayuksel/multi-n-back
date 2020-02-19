let calculateScore = (config: GameConfiguration.t): int => {
  Modality.allModalityTypes
  |> Array.fold_left(
       (acc, cur) =>
         switch (config.modalities |> Modality.getValue(cur)) {
         | Some(value) => acc * value
         | None => acc
         },
       1,
     )
  |> ( * )(config.depth);
};
