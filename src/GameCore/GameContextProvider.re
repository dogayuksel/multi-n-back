type gameContext = {
  availableModalities: array(Modalities.t),
  selectedModalities: array(Modalities.t),
};

let gameContext =
  React.createContext({availableModalities: [||], selectedModalities: [||]});

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};

let make = React.Context.provider(gameContext);
