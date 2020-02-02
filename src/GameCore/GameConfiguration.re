type gameConfiguration = {
  position: option(int),
  color: option(int),
  icon: option(int),
  depth: int,
};

type t = gameConfiguration;

let getDefaultConfig = () => {
  position: Some(3),
  color: Some(3),
  icon: Some(3),
  depth: 1,
};
