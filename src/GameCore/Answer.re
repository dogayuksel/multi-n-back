type answer = Modality.modalities(bool);

type t = answer;

let make = (): t => {position: false, color: false, icon: false};

let toggleValue = (modality: Modality.t, answer: t) =>
  !Modality.getValue(modality, answer);

let toggle = (modality: Modality.t, answer: t) =>
  switch (modality) {
  | Modality.Position => {...answer, position: toggleValue(Position, answer)}
  | Modality.Color => {...answer, color: toggleValue(Color, answer)}
  | Modality.Icon => {...answer, icon: toggleValue(Icon, answer)}
  };
