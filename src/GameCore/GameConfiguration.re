type gameConfiguration = {
  modalities: Modality.modalities(option(int)),
  depth: int,
};

type t = gameConfiguration;

let makeDefault = () => {
  modalities: {
    position: Some(2),
    color: Some(4),
    icon: Some(4),
  },
  depth: 1,
};
