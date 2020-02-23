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

let updateModality = (modality: Modality.t, value: option(int), config: t) => {
  {
    ...config,
    modalities:
      switch (modality) {
      | Modality.Position => {...config.modalities, position: value}
      | Modality.Color => {...config.modalities, color: value}
      | Modality.Icon => {...config.modalities, icon: value}
      },
  };
};

let updateDepth = (value: int, config: t) => {
  {...config, depth: value};
};
