[@react.component]
let make = () => {
  let {availableModalities}: GameContextProvider.gameContext =
    React.useContext(GameContextProvider.gameContext);
  let {depth}: ConfigurationProvider.configurationContext =
    React.useContext(ConfigurationProvider.configurationContext);

  availableModalities
  |> Array.fold_left(
       (element: React.element, modality: Modalities.modality) => {
         modality.renderFunction(element, {depth: depth[0]})
       },
       <div
         style={ReactDOMRe.Style.make(~width="50px", ~height="65px", ())}
       />,
     );
};
