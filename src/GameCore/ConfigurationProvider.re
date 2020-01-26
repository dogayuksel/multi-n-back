type configurationContext = {depth: int};

let configurationContext = React.createContext({depth: 1});

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};

let make = React.Context.provider(configurationContext);
