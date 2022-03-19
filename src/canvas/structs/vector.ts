import { VectorArrayType, VectorInterface } from "../types";

/**
 * Vector class
 * @public
 */
export default class Vector implements VectorInterface {
  /**
   * Coordinate X
   */
  public x: number;
  /**
   * Coordinate Y
   */
  public y: number;

  /**
   * Vector constructor
   * @param x - coordinate X
   * @param y - coordinate Y
   */
  constructor([x, y]: VectorArrayType) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add another vector to this vector
   * @param v - vector to add
   */
  add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  sub(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Multiples vector by number
   * @param mul - multiplier
   */
  mul(mul: number): Vector {
    this.x *= mul;
    this.y *= mul;

    return this;
  }

  /**
   * Divides vector by number
   * @param div - divider
   */
  div(div: number): Vector {
    this.x /= div;
    this.y /= div;

    return this;
  }

  /**
   * Inverses vector
   */
  inverse(): Vector {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Returns the length of vector
   */
  len(): number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  distance(v: Vector): Vector {
    return this.clone().sub(v);
  }

  /**
   * Clones vector
   */
  clone(): Vector {
    return new Vector(this.toArray());
  }

  /**
   * Converts vector to array
   */
  toArray(): VectorArrayType {
    return [this.x, this.y];
  }
}

/**
 * Creates new vector
 * @public
 * @param coords - coordinates of new vector
 */
export function createVector(coords: VectorArrayType): Vector {
  return new Vector(coords);
}
