const { calculateFare } = require("./code");

test("exact change", () => {
  expect(calculateFare("7", "7")).toBe("Use 7");
});

// [fare, coins, expectedResult]
const cases = [
  ["7", "1,6", "Use 6,1"],
  ["7", "5,2,0,0", "Use 5,2"],
  ["7", "3,3,1", "Use 3,3,1"],
  ["7", "5,1,3,3", "Use 3,3,1"],
  ["7", "1,4,6", "Use 6,1"],
  ["8", "1,4,6", "Sorry, no coin combo found"],
  ["57", "6,13,13,21,23,24", "Use 23,21,13"]
];

describe("'calculateFare' utility", () => {
  test.each(cases)(
    "given a fare of %p and %p as coins, returns %p",
    (fare, coins, expectedResult) => {
      const result = calculateFare(fare, coins);
      expect(result).toEqual(expectedResult);
    }
  );
});
