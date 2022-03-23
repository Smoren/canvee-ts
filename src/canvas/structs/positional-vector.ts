import { PositionalVectorInterface, VectorArrayType, VectorInterface } from '../types/base';
import Vector, { toVector } from './vector';

/**
 * Positional vector class
 */
export default class PositionalVector implements PositionalVectorInterface {
  /**
   * Position
   */
  public position: VectorInterface;
  /**
   * Size
   */
  public size: VectorInterface;

  /**
   * PositionalVector constructor
   * @param position - position
   * @param size - size
   */
  constructor(position: VectorArrayType | VectorInterface, size: VectorArrayType | VectorInterface) {
    this.position = toVector(position);
    this.size = toVector(size);
  }

  /**
   * {@inheritDoc PositionalVectorInterface.target}
   */
  get target() {
    return this.position.clone().add(this.size);
  }

  /**
   * Returns true if vector includes point
   * @param point - point coords to check
   * @param precision - round precision for comparison
   */
  public includes(point: VectorArrayType | VectorInterface, precision: number = 4): boolean {
    const pointVector = toVector(point);

    if (this.position.isEqual(pointVector, precision) || this.target.isEqual(pointVector, precision)) {
      return true;
    }

    const [x1, y1] = this.position.toArray(precision);
    const [x2, y2] = this.target.toArray(precision);
    const [x, y] = pointVector.toArray(precision);

    return (x-x1) * (y2-y1) - (y-y1) * (x2-x1) === 0
      && (x1 < x && x < x2) && (y1 < y && y < y2);
  }
}

/**
 * Creates a list of vectors of the polygon from a list of points
 * @param points - list of points
 */
export function createPolygonVectors(points: VectorArrayType[] | VectorInterface[]): PositionalVectorInterface[] {
  const result: PositionalVectorInterface[] = [];

  for (let i=0, j=points.length-1; i<points.length; j=i++) {
    const lhsPoint = toVector(points[j]);
    const rhsPoint = toVector(points[i]);

    result.push(new PositionalVector(lhsPoint, rhsPoint.sub(lhsPoint)));
  }

  return result;
}

