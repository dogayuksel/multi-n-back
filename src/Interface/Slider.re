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
  <div
    style={ReactDOMRe.Style.make(
      ~margin="12px",
      ~display="flex",
      ~alignItems="center",
      (),
    )}>
    <div
      style={ReactDOMRe.Style.make(
        ~minWidth="70px",
        ~textAlign="right",
        ~margin="12px",
        (),
      )}>
      {React.string(label)}
    </div>
    <button disabled={intValue <= 0} onClick={_ => onChange(intValue - 1)}>
      {React.string("Easier")}
    </button>
    <div
      style={ReactDOMRe.Style.make(
        ~position="relative",
        ~margin="0 30px",
        ~width="45px",
        ~height="20px",
        ~borderRadius="2px",
        ~boxShadow=
          "inset 4px 4px 12px "
          ++ AppStyles.background_more_darker
          ++ ", inset -4px -4px 12px "
          ++ AppStyles.background_less_lighter,
        ~backgroundColor=AppStyles.background_less_darker,
        ~display="flex",
        ~alignItems="flex-end",
        (),
      )}>
      {Belt.Array.range(1, 9)
       |> Array.map(index => {
            <div
              style={ReactDOMRe.Style.make(
                ~borderRadius=
                  switch (index) {
                  | 1 => "1px 1px 0 2px"
                  | 9 => "1px 1px 2px 0"
                  | _ => "1px 1px 0 0"
                  },
                ~display=intValue >= index ? "inline-block" : "none",
                ~backgroundColor=intValue >= index ? color(index) : "",
                ~height=string_of_int(index * 2) ++ "px",
                ~width="5px",
                (),
              )}
            />
          })
       |> React.array}
      <div
        style={ReactDOMRe.Style.make(
          ~position="absolute",
          ~left="0",
          ~top="0",
          ~width="45px",
          ~height="20px",
          ~opacity="0.7",
          ~borderRadius="2px",
          ~boxShadow=
            "inset 1px 1px 3px "
            ++ AppStyles.background_more_darker
            ++ ", inset -1px -1px 3px "
            ++ AppStyles.background_less_lighter,
          (),
        )}
      />
    </div>
    <button disabled={intValue >= 9} onClick={_ => onChange(intValue + 1)}>
      {React.string("Harder")}
    </button>
  </div>;
};
