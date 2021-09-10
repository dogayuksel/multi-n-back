@react.component
let make = (~toggleConfigPanelOpen: unit => unit) =>
  <div
    onClick={_ => toggleConfigPanelOpen()}
    style={ReactDOMRe.Style.make(
      ~boxShadow="inset 12px 12px 30px " ++
      (AppStyles.background_more_darker ++
      (", inset -12px -12px 30px " ++ AppStyles.background_more_lighter)),
      ~borderRadius="40px 40px 0 0",
      ~width="150px",
      ~height="40px",
      ~position="absolute",
      ~bottom="0",
      ~left="calc(50% - 75px)",
      ~color=AppStyles.blue,
      ~textAlign="center",
      ~paddingTop="1.5em",
      (),
    )}>
    {React.string("Configure")}
  </div>
