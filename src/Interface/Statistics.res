@react.component
let make = (~label: string, ~value: int) =>
  <div
    style={ReactDOMRe.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~justifyContent="center",
      ~alignItems="center",
      (),
    )}>
    <div style={ReactDOMRe.Style.make(~paddingTop="0.8em", ())}> {React.string(label)} </div>
    <div style={ReactDOMRe.Style.make(~fontSize="1.5em", ~lineHeight="1.6em", ())}>
      {React.string(string_of_int(value))}
    </div>
  </div>
