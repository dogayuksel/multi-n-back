@react.component
let make = (~checked: bool, ~onChange: _ => unit, ~label: string) =>
  <label
    style={ReactDOMRe.Style.make(
      ~margin="12px",
      ~width="10em",
      ~height="2.5em",
      ~borderRadius="10px",
      ~boxShadow=checked
        ? "inset 2px 2px 6px " ++
          (AppStyles.background_less_darker ++
          (", inset -2px -2px 6px " ++ AppStyles.background_less_lighter))
        : "8px 8px 20px " ++
          (AppStyles.background_more_darker ++
          (", -8px -8px 20px " ++ AppStyles.background_more_lighter)),
      ~display="flex",
      ~justifyContent="center",
      ~alignItems="center",
      ~position="relative",
      (),
    )}>
    <input
      type_="checkbox"
      checked
      onChange
      style={ReactDOMRe.Style.make(
        ~margin="0",
        ~height="0",
        ~width="0",
        ~opacity="0",
        ~position="absolute",
        ~left="0",
        ~bottom="0",
        (),
      )}
    />
    <div
      style={ReactDOMRe.Style.make(
        ~width="10px",
        ~height="10px",
        ~borderRadius="10px",
        ~marginRight="0.5em",
        ~backgroundColor=checked ? "#13EF32" : "#EEEEEE",
        ~boxShadow=checked
          ? "2px 2px 4px " ++
            (AppStyles.background_less_darker ++
            (", -2px -2px 4px " ++ (AppStyles.background_less_lighter ++ ", 0 0 4px #13EF32")))
          : "2px 2px 4px " ++
            (AppStyles.background_more_darker ++
            (", -2px -2px 4px " ++ AppStyles.background_more_lighter)),
        ~overflow="hidden",
        ~position="relative",
        (),
      )}>
      <div
        style={ReactDOMRe.Style.make(
          ~background=checked
            ? "radial-gradient(#ABEFBC, #13EF32)"
            : "radial-gradient(" ++
              (AppStyles.background_less_lighter ++
              (", " ++ (AppStyles.background_more_darker ++ ")"))),
          ~position="relative",
          ~top="-4px",
          ~left="-4px",
          ~width="15px",
          ~height="15px",
          (),
        )}
      />
    </div>
    {React.string(label)}
  </label>
