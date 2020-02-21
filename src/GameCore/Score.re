[@bs.val]
external getFromLocalStorage: (~key: string) => Js.Nullable.t(string) =
  "window.localStorage.getItem";

[@bs.val]
external setInLocalStorage: (~key: string, ~value: string) => unit =
  "window.localStorage.setItem";

let highScoreKey = "multi_n_back_hight_score";
let getHighScore = (): option(string) =>
  getFromLocalStorage(~key=highScoreKey) |> Js.Nullable.toOption;
let setHighScore = (score: int) => {
  setInLocalStorage(~key=highScoreKey, ~value=string_of_int(score));
  score;
};

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

let getHighScore = (): option(int) => {
  getHighScore()->Belt.Option.flatMap(int_of_string_opt);
};

let updateHighScore = (score: int): int => {
  switch (getHighScore()) {
  | Some(value) => value > score ? value : setHighScore(score)
  | None => setHighScore(score)
  };
};
