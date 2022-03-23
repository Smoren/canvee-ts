import PositionalVector from "../src/canvas/structs/positional-vector";

test('positional-vector', () => {
  const v = new PositionalVector([0, 0], [5, 5]);
  expect(v.includes([0, 0])).toEqual(true);
  expect(v.includes([1, 1])).toEqual(true);
  expect(v.includes([2, 2])).toEqual(true);
  expect(v.includes([3, 3])).toEqual(true);
  expect(v.includes([4, 4])).toEqual(true);
  expect(v.includes([5, 5])).toEqual(true);

  expect(v.includes([1.5, 1.5])).toEqual(true);
  expect(v.includes([1.5, 3/2])).toEqual(true);

  expect(v.includes([-1, -1])).toEqual(false);
  expect(v.includes([6, 6])).toEqual(false);
  expect(v.includes([1, 2])).toEqual(false);
});
