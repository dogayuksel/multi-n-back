type answer = {
  position: bool,
  color: bool,
  icon: bool,
};

type t = answer;

let make = (): t => {position: false, color: false, icon: false};

let toggleAnswer = (modality: Modality.t, answer: t) =>
  switch (modality) {
  | Modality.Position => {...answer, position: !answer.position}
  | Modality.Color => {...answer, color: !answer.color}
  | Modality.Icon => {...answer, icon: !answer.icon}
  };
