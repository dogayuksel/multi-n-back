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

let make = (value: 'a) => {position: value, color: value, icon: value};

let getValue = (modality: modality, modalities: modalities('a)) => {
  switch (modality) {
  | Position => modalities.position
  | Color => modalities.color
  | Icon => modalities.icon
  };
};

let setValue = (modality: modality, value: 'a, modalities: modalities('a)) => {
  switch (modality) {
  | Position => {...modalities, position: value}
  | Color => {...modalities, color: value}
  | Icon => {...modalities, icon: value}
  };
};

let getLabel =
  fun
  | Position => "Position"
  | Color => "Color"
  | Icon => "Icon";
