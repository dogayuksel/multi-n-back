[@react.component]
let make = () => {
  <GameContextProvider
    value=GameContextProvider.{
      availableModalities: Modalities.modalities,
      selectedModalities: Modalities.modalities,
    }>
    <ConfigurationProvider value=ConfigurationProvider.{depth: 4}>
      <Canvas />
    </ConfigurationProvider>
  </GameContextProvider>;
};
