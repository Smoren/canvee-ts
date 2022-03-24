import { VectorArrayType, VectorInterface } from './types';
import { round } from './helpers';

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
   * Default precision
   */
  protected _defaultPrecision: number = 4;

  /**
   * Vector constructor
   * @param x - coordinate X
   * @param y - coordinate Y
   * @param defaultPrecision - default precision
   */
  constructor([x, y]: VectorArrayType, defaultPrecision?: number) {
    this.x = x;
    this.y = y;

    if (this._defaultPrecision !== undefined) {
      this._defaultPrecision = defaultPrecision;
    }
  }

  /**
   * Add another vector to this vector
   * @param v - vector to cache
   */
  public add(v: Vector): VectorInterface {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  public sub(v: VectorInterface): VectorInterface {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Multiples vector by number
   * @param mul - multiplier
   */
  public mul(mul: number): VectorInterface {
    this.x *= mul;
    this.y *= mul;

    return this;
  }

  /**
   * Divides vector by number
   * @param div - divider
   */
  public div(div: number): VectorInterface {
    this.x /= div;
    this.y /= div;

    return this;
  }

  /**
   * Inverses vector
   */
  public inverse(): VectorInterface {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Reverses vector
   */
  public reverse(): VectorInterface {
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
  public isEqual(v: VectorInterface, precision: number = this._defaultPrecision): boolean {
    return round(v.x, precision) === round(this.x, precision)
      && round(v.y, precision) === round(this.y, precision);
  }

  /**
   * Returns true if angle between vectors equals 90 degrees
   * @param v - another vector
   */
  public isOrthogonal(v: VectorInterface): boolean {
    return this.getCos(v) === 0;
  }

  /**
   * Returns true if this vector is collinear with argument vector
   * @param v - another vector
   */
  public isCollinear(v: VectorInterface): boolean {
    return this.mulVector(v) === 0;
  }

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  public distance(v: VectorInterface): VectorInterface {
    return this.clone().sub(v);
  }

  /**
   * Returns scalar product with another vector
   * @param v - another vector
   */
  public mulScalar(v: VectorInterface): number {
    return this.x*v.x + this.y*v.y;
  }

  /**
   * Returns length of vector product with another vector
   * @param v - another vector
   */
  public mulVector(v: VectorInterface): number {
    return this.x*v.y - this.y*v.x;
  }

  /**
   * Normalizes this vector
   */
  public normalize(): VectorInterface {
    const len = this.len();

    this.x /= len;
    this.y /= len;

    return this;
  }

  /**
   * Translates vector with offset and scale
   * @param offset - offset
   * @param scale - scale
   */
  public translate(
    offset: VectorArrayType | VectorInterface, scale: VectorArrayType | VectorInterface,
  ): VectorInterface {
    const offsetVector = toVector(offset);
    const scaleVector = toVector(scale);

    this.x = offsetVector.x + this.x*scaleVector.x;
    this.y = offsetVector.y + this.y*scaleVector.y;

    return this;
  }

  /**
   * Returns new vector by rotating this
   * @param angle - angle to rotate to
   * @param precision - round precision
   */
  public rotate(angle: number, precision: number = this._defaultPrecision): VectorInterface {
    const cs = Math.cos(angle);
    const sn = Math.sin(angle);

    this.x = round(this.x*cs - this.y*sn, precision);
    this.y = round(this.x*sn + this.y*cs, precision);

    return this;
  }

  /**
   * Get cos with another vector
   * @param v - another vector
   */
  public getCos(v: VectorInterface | null = null): number {
    if (v === null) {
      v = createVector([1, 0]);
    }

    return this.mulScalar(v) / (this.len() * v.len());
  }

  /**
   * Clones vector
   */
  public clone(): VectorInterface {
    return createVector(this.toArray());
  }

  /**
   * Converts vector to array
   * @param precision - precision
   */
  public toArray(precision?: number): VectorArrayType {
    if (precision === undefined) {
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
export function createVector(coords: VectorArrayType): VectorInterface {
  return new Vector(coords);
}

/**
 * Converts instance to vector if it's an array
 * @param coords - coords as vector or an array
 */
export function toVector(coords: VectorArrayType | VectorInterface): VectorInterface {
  return (coords instanceof Array) ? createVector(coords) : coords;
}
