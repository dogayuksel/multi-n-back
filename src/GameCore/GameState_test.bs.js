'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var GameState$ReasonReactExamples = require("./GameState.bs.js");

Jest.describe("compareValue function", (function (param) {
        return Jest.describe("when historic value and current value are the same", (function (param) {
                      Jest.describe("when user's answer for `is same` is true", (function (param) {
                              return Jest.test("should return true", (function (param) {
                                            return Jest.Expect.toBe(true, Jest.Expect.expect(GameState$ReasonReactExamples.compareValue(4, true, 1, 1)));
                                          }));
                            }));
                      return Jest.describe("when user's answer for `is same` is false", (function (param) {
                                    return Jest.test("should return false", (function (param) {
                                                  return Jest.Expect.toBe(false, Jest.Expect.expect(GameState$ReasonReactExamples.compareValue(4, true, 1, 2)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
