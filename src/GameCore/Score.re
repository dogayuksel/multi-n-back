let calculateScore = (result: GameState.result, depth: int): int => {
  Modality.allModalityTypes
  |> Array.fold_left(
       (acc, cur) =>
         switch (result |> Modality.getValue(cur)) {
         | Some(value) => acc * value
         | None => acc
         },
       1,
     )
  |> ( * )(depth * 2);
};
