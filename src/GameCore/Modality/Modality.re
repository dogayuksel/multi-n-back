type modality =
  | Position
  | Color
  | Icon;

type t = modality;

let allModalityTypes = [|Position, Color, Icon|];

type modalities('a) = {
  position: 'a,
  color: 'a,
  icon: 'a,
};

let getValue = (modality: modality, modalities: modalities('a)) => {
  switch (modality) {
  | Position => modalities.position
  | Color => modalities.color
  | Icon => modalities.icon
  };
};

let getLabel =
  fun
  | Position => "Position"
  | Color => "Color"
  | Icon => "Icon";
