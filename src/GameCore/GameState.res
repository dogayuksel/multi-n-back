type gameState = Modality.modalities<option<int>>

type t = gameState

type stateHistory = list<gameState>

let getValue = Modality.getValue

let makeRandom = (configuration: GameConfiguration.t): t => {
  let modeConfig = configuration.modalities
  Random.self_init()
  {
    position: getValue(Position, modeConfig)->Belt.Option.map(value => Random.int(value * value)),
    color: getValue(Color, modeConfig)->Belt.Option.map(Random.int),
    icon: getValue(Icon, modeConfig)->Belt.Option.map(Random.int),
  }
}

let compareValue = (
  modalityConfig: option<int>,
  modalityAnswer: bool,
  modalityOldValue: option<int>,
  modalityValue: option<int>,
): bool =>
  switch (modalityConfig, modalityAnswer, modalityOldValue, modalityValue) {
  | (Some(_), isSame, Some(oldValue), Some(value)) => (oldValue == value) == isSame
  | _ => true
  }

type result = Modality.modalities<option<int>>

let makeEmptyResult = (): result => {
  position: None,
  color: None,
  icon: None,
}

let makeResult = (answer: Answer.t, configuration: GameConfiguration.t): result =>
  Modality.allModalityTypes |> Array.fold_left(
    (result, modality) =>
      answer |> getValue(modality)
        ? result |> Modality.setValue(modality, configuration.modalities |> getValue(modality))
        : result,
    makeEmptyResult(),
  )

let compareToHistory = (
  answer: Answer.t,
  gameState: t,
  stateHistory: stateHistory,
  configuration: GameConfiguration.t,
): option<result> => {
  let oldState = stateHistory->List.nth(configuration.depth - 1)
  Modality.allModalityTypes |> Array.for_all(modality =>
    compareValue(
      configuration.modalities |> getValue(modality),
      answer |> getValue(modality),
      oldState |> getValue(modality),
      gameState |> getValue(modality),
    )
  )
    ? Some(makeResult(answer, configuration))
    : None
}
