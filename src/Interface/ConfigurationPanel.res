@react.component
let make = (
  ~panelOpen: bool,
  ~config: GameConfiguration.t,
  ~updateModalityConfig: (Modality.t, option<int>) => unit,
  ~updateDepthConfig: int => unit,
  ~togglePanelOpen: unit => unit,
) =>
  <div className="configurationWrapper">
    <div
      className={"configurationContainer " ++ (
        panelOpen ? "configPanelOpen" : "configPanelClosed"
      )}>
      {Modality.allModalityTypes
      |> Array.map(modality =>
        <Slider
          key={Modality.getLabel(modality) ++ "_config"}
          label={modality |> Modality.getLabel}
          value={config.modalities |> Modality.getValue(modality)}
          onChange={(value: int) => {
            let optionValue = switch value {
            | 0 => None
            | v => Some(v)
            }
            updateModalityConfig(modality, optionValue)
          }}
        />
      )
      |> React.array}
      <div
        style={ReactDOMRe.Style.make(
          ~margin="12px",
          ~marginBottom="48px",
          ~display="flex",
          ~alignItems="center",
          (),
        )}>
        <div
          style={ReactDOMRe.Style.make(~minWidth="60px", ~textAlign="right", ~margin="12px", ())}>
          {React.string("Depth")}
        </div>
        <div
          style={ReactDOMRe.Style.make(
            ~width="14.5em",
            ~display="flex",
            ~justifyContent="space-between",
            (),
          )}>
          {Belt.Array.range(1, 5)
          |> Array.map(index =>
            <div
              style={ReactDOMRe.Style.make(
                ~width="2em",
                ~height="2em",
                ~borderRadius="10px",
                ~marginLeft=index === 1 ? "0" : "10px",
                ~marginRight=index === 5 ? "0" : "10px",
                ~lineHeight="1em",
                ~boxShadow=index === config.depth
                  ? "inset 2px 2px 6px " ++
                    (AppStyles.background_less_darker ++
                    (", inset -2px -2px 6px " ++ AppStyles.background_less_lighter))
                  : "8px 8px 20px " ++
                    (AppStyles.background_more_darker ++
                    (", -8px -8px 20px " ++ AppStyles.background_more_lighter)),
                ~color=AppStyles.blue,
                ~display="flex",
                ~justifyContent="center",
                ~alignItems="center",
                (),
              )}
              onClick={_ => updateDepthConfig(index)}>
              {React.string(string_of_int(index))}
            </div>
          )
          |> React.array}
        </div>
      </div>
      <button style={ReactDOMRe.Style.make(~fontSize="1.4em", ())} onClick={_ => togglePanelOpen()}>
        <div> {React.string("Done")} </div>
      </button>
    </div>
  </div>
