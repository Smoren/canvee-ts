/**
 * Simple 2d vector by array
 * @public
 */
export type VectorArrayType = [number, number];

/**
 * Interface of vector
 * @public
 */
export interface VectorInterface {
  /**
   * Coordinate X
   */
  x: number;
  /**
   * Coordinate Y
   */
  y: number;
  /**
   * Returns the length of vector
   */
  length: number;

  /**
   * Add another vector to this vector
   * @param v - vector to cache
   */
  add(v: VectorInterface): VectorInterface;

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  sub(v: VectorInterface): VectorInterface;

  /**
   * Multiples vector by number
   * @param mul - multiplier
   */
  mul(mul: number): VectorInterface;

  /**
   * Divides vector by number
   * @param div - divider
   */
  div(div: number): VectorInterface;

  /**
   * Inverses vector
   */
  inverse(): VectorInterface;

  /**
   * Reverses vector
   */
  reverse(): VectorInterface;

  /**
   * Returns true if this vector is equal to another vector
   * @param v - another vector
   * @param precision - round precision for comparison
   */
  isEqual(v: VectorInterface, precision: number): boolean;

  /**
   * Returns true if angle between vectors equals 90 degrees
   * @param v - another vector
   */
  isOrthogonal(v: VectorInterface): boolean;

  /**
   * Returns true if this vector is collinear with argument vector
   * @param v - another vector
   */
  isCollinear(v: VectorInterface): boolean;

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  distance(v: VectorInterface): VectorInterface;

  /**
   * Returns scalar product with another vector
   * @param v - another vector
   */
  mulScalar(v: VectorInterface): number;

  /**
   * Returns length of vector product with another vector
   * @param v - another vector
   */
  mulVector(v: VectorInterface): number;

  /**
   * Normalizes this vector
   */
  normalize(): VectorInterface;

  /**
   * Translates vector with offset and scale
   * @param offset - offset
   * @param scale - scale
   */
  translate(offset: VectorArrayType | VectorInterface, scale: VectorArrayType | VectorInterface): VectorInterface;

  /**
   * Returns new vector by rotating this
   * @param angle - angle to rotate to
   * @param precision - round precision
   */
  rotate(angle: number, precision: number): VectorInterface;

  /**
   * Get cos with another vector
   * @param v - another vector
   */
  getCos(v: VectorInterface | null): number;

  /**
   * Clones vector
   */
  clone(): VectorInterface;

  /**
   * Converts vector to array
   * @param precision - precision
   */
  toArray(precision?: number): VectorArrayType;
}

/**
 * Interface for positional objects
 */
export interface PositionalInterface {
  /**
   * Position vector
   */
  position: VectorArrayType;
  /**
   * Position vector
   */
  size: VectorArrayType;
}

/**
 * Interface for positional vector
 */
export interface PositionalVectorInterface {
  /**
   * Position
   */
  position: VectorInterface;
  /**
   * Size
   */
  size: VectorInterface;
  /**
   * Target position (position + size)
   */
  target: VectorInterface;
  /**
   * Returns the length of vector
   */
  length: number;

  /**
   * Returns a positional vector from another point to the nearest point on vector
   * @param point - another point
   */
  getDistanceVector(point: VectorArrayType | VectorInterface): PositionalVectorInterface;

  /**
   * Returns true if vector includes the point
   * @param coords - point coords
   * @param precision - round precision for comparison
   */
  includes(coords: VectorArrayType | VectorInterface, precision: number): boolean;
}
