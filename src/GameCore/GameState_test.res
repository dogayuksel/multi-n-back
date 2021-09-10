open Jest
open Expect

open GameState

describe("compareValue function", () =>
  describe("when historic value and current value are the same", () => {
    describe("when user's answer for `is same` is true", () =>
      test("should return true", () =>
        expect(compareValue(Some(4), true, Some(1), Some(1))) |> toBe(true)
      )
    )
    describe("when user's answer for `is same` is false", () =>
      test("should return false", () =>
        expect(compareValue(Some(4), true, Some(1), Some(2))) |> toBe(false)
      )
    )
  })
)
