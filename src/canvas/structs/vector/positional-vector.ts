import { PositionalVectorInterface, VectorArrayType, VectorInterface } from './types';
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
  public get target(): VectorInterface {
    return this.position.clone().add(this.size);
  }

  /**
   * Returns the length of vector
   */
  public get length(): number {
    return this.size.length;
  }

  /**
   * {@inheritDoc PositionalVectorInterface.includes}
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

  /**
   * {@inheritDoc PositionalVectorInterface.getDistanceVector}
   */
  public getDistanceVector(point: VectorArrayType | VectorInterface): PositionalVectorInterface {
    const vectorPoint = toVector(point);
    const destPoint = this._getNearestLinePoint(point);

    if (
      destPoint.x < Math.min(this.position.x, this.target.x) ||
      destPoint.x > Math.max(this.position.x, this.target.x) ||
      destPoint.y < Math.min(this.position.y, this.target.y) ||
      destPoint.y > Math.max(this.position.y, this.target.y)
    ) {
      const l1 = new PositionalVector(vectorPoint, toVector(this.position).sub(vectorPoint));
      const l2 = new PositionalVector(vectorPoint, toVector(this.target).sub(vectorPoint));

      if (l1.length < l2.length) {
        return l1;
      } else {
        return l2;
      }
    }

    return new PositionalVector(vectorPoint, destPoint.sub(vectorPoint));
  }

  /**
   * Returns the coords of the nearest point on vector to another point
   * @param point - another point
   */
  protected _getNearestLinePoint(point: VectorArrayType | VectorInterface) {
    const pointVector = toVector(point);

    const k = (
      (this.target.y-this.position.y) * (pointVector.x-this.position.x)
      - (this.target.x-this.position.x) * (pointVector.y-this.position.y)
    ) / ((this.target.y-this.position.y)**2 + (this.target.x-this.position.x)**2);

    return new Vector([
      pointVector.x - k * (this.target.y-this.position.y),
      pointVector.y + k * (this.target.x-this.position.x),
    ]);
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
