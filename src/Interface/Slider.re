let color = (scale: int): string => {
  switch (scale) {
  | 0 => "#006837"
  | 1 => "#1a9850"
  | 2 => "#66bd63"
  | 3 => "#a6d96a"
  | 4 => "#a6d96a"
  | 5 => "#d9ef8b"
  | 6 => "#d9ef8b"
  | 7 => "#fdae61"
  | 8 => "#f46d43"
  | 9 => "#d73027"
  | _ => raise(Not_found)
  };
};

[@react.component]
let make = (~label: string, ~value: option(int), ~onChange: int => unit) => {
  let intValue =
    switch (value) {
    | Some(number) => number
    | None => 0
    };
  <div style={ReactDOMRe.Style.make(~margin="12px", ())}>
    <div
      style={ReactDOMRe.Style.make(
        ~minWidth="70px",
        ~textAlign="right",
        ~margin="12px",
        ~display="inline-block",
        (),
      )}>
      {React.string(label)}
    </div>
    <button disabled={intValue <= 0} onClick={_ => onChange(intValue - 1)}>
      {React.string("Easier")}
    </button>
    <div
      style={ReactDOMRe.Style.make(
        ~margin="12px",
        ~display="inline-block",
        (),
      )}>
      {Belt.Array.range(0, 9)
       |> Array.map(index => {
            <div
              style={ReactDOMRe.Style.make(
                ~display="inline-block",
                ~backgroundColor=index > intValue ? "#ffffff" : color(index),
                ~height=string_of_int(index * 2) ++ "px",
                ~width="5px",
                (),
              )}
            />
          })
       |> React.array}
    </div>
    <button disabled={intValue >= 9} onClick={_ => onChange(intValue + 1)}>
      {React.string("Harder")}
    </button>
  </div>;
};
