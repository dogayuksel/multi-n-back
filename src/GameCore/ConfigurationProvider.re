type configurationContext = {depth: array(int)};

let configurationContext = React.createContext({depth: [||]});

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};

let make = React.Context.provider(configurationContext);
