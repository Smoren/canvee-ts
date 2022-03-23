import { VectorArrayType, VectorInterface } from '../types';
import { PositionalVectorInterface } from "../types/base";

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
   * @param v - vector to cache
   */
  public add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  public sub(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Multiples vector by number
   * @param mul - multiplier
   */
  public mul(mul: number): Vector {
    this.x *= mul;
    this.y *= mul;

    return this;
  }

  /**
   * Divides vector by number
   * @param div - divider
   */
  public div(div: number): Vector {
    this.x /= div;
    this.y /= div;

    return this;
  }

  /**
   * Inverses vector
   */
  public inverse(): Vector {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Reverses vector
   */
  public reverse(): Vector {
    this.x = 1/this.x;
    this.y = 1/this.y;

    return this;
  }

  /**
   * Returns the length of vector
   */
  public len(): number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  /**
   * Returns true if this vector is equal to another vector
   * @param v - another vector
   * @param precision - round precision for comparison
   */
  public isEqual(v: VectorInterface, precision: number = 4): boolean {
    return round(v.x, precision) === round(this.x, precision)
      && round(v.y, precision) === round(this.y, precision);
  }

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  public distance(v: Vector): Vector {
    return this.clone().sub(v);
  }

  /**
   * Clones vector
   */
  public clone(): Vector {
    return new Vector(this.toArray());
  }

  /**
   * Converts vector to array
   * @param precision - precision
   */
  public toArray(precision?: number): VectorArrayType {
    if (precision === undefined || precision === null) {
      return [this.x, this.y];
    }

    return [round(this.x, precision), round(this.y, precision)];
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

/**
 * Converts instance to vector if it's an array
 * @param coords - coords as vector or an array
 */
export function toVector(coords: VectorArrayType | VectorInterface): Vector {
  return (coords instanceof Array) ? createVector(coords) : coords;
}

/**
 * Returns true if a number is inside interval
 * @param what - number
 * @param interval - interval
 */
export function isInInterval(what: number, interval: VectorArrayType): boolean {
  return what > interval[0] && what < interval[1];
}

/**
 * Returns true if a number is inside segment
 * @param what - number
 * @param segment - segment
 */
export function isInSegment(what: number, segment: VectorArrayType): boolean {
  return what >= segment[0] && what <= segment[1];
}

/**
 * Rounds a number with a precision
 * @param num - number
 * @param precision - percision
 */
export function round(num: number, precision: number = 0): number {
  const mult = 10**precision;
  return Math.round(num * mult) / mult;
}
