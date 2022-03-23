import PolygonalBound from '../src/canvas/structs/bounds/polygonal-bound';

test('polygonal-bound', () => {
  const bound1 = new PolygonalBound({
    points: [[1, 1], [1, 3], [5, 3], [5, 1]],
  });
  expect(bound1.includes([3, 2])).toEqual(true);
  expect(bound1.includes([1, 1])).toEqual(true);
  expect(bound1.includes([1, 3])).toEqual(true);
  expect(bound1.includes([5, 3])).toEqual(true);
  expect(bound1.includes([5, 1])).toEqual(true);
});
