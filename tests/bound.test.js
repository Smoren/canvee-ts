import PolygonalBound from '../src/canvas/structs/bounds/polygonal-bound';

test('polygonal-bound', () => {
  const points1 = [[1, 1], [1, 3], [5, 3], [5, 1]];
  const bound1 = new PolygonalBound({
    points: points1,
  });
  expect(bound1.includes([3, 2])).toEqual(true);

  expect(bound1.includes([1, 1])).toEqual(true);
  expect(bound1.includes([1, 3])).toEqual(true);
  expect(bound1.includes([5, 3])).toEqual(true);
  expect(bound1.includes([5, 1])).toEqual(true);

  expect(bound1.includes([0, 2])).toEqual(false);
  expect(bound1.includes([6, 2])).toEqual(false);
  expect(bound1.includes([3, 0])).toEqual(false);
  expect(bound1.includes([3, 4])).toEqual(false);

  for (const point of points1) {
    expect(bound1.includes(point)).toEqual(true);
  }

  const points2 = [[0, -2], [3, 10], [6, 0], [9, 10], [12, -2]];
  const bound2 = new PolygonalBound({
    points: points2,
  });

  for (let x=1; x<11; ++x) {
    expect(bound2.includes([x, -1])).toEqual(true);
  }

  for (let x=0; x<12; ++x) {
    expect(bound2.includes([x, -2])).toEqual(true);
  }

  expect(bound2.includes([3, 5])).toEqual(true);
  expect(bound2.includes([9, 5])).toEqual(true);

  expect(bound2.includes([0, 5])).toEqual(false);
  expect(bound2.includes([6, 5])).toEqual(false);
  expect(bound2.includes([12, 5])).toEqual(false);

  for (const point of points2) {
    expect(bound2.includes(point)).toEqual(true);
  }
});
