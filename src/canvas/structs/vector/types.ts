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
  add(v: VectorInterface | VectorArrayType): VectorInterface;

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  sub(v: VectorInterface | VectorArrayType): VectorInterface;

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
   * Returns scalar product with another vector
   * @param v - another vector
   */
  mulScalar(v: VectorInterface | VectorArrayType): number;

  /**
   * Returns length of vector product with another vector
   * @param v - another vector
   */
  mulVector(v: VectorInterface | VectorArrayType): number;

  /**
   * Multiplies this vector with another vector coordinate-by-coordinate
   * @param v - another vector
   */
  mulCoords(v: VectorInterface | VectorArrayType): VectorInterface;

  /**
   * Returns true if this vector is equal to another vector
   * @param v - another vector
   * @param precision - round precision for comparison
   */
  isEqual(v: VectorInterface | VectorArrayType, precision?: number): boolean;

  /**
   * Returns true if angle between vectors equals 90 degrees
   * @param v - another vector
   */
  isOrthogonal(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns true if this vector is collinear with argument vector
   * @param v - another vector
   */
  isCollinear(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns true if vector is normalized
   * @param precision - round precision
   */
  isNormalized(precision?: number): boolean;

  /**
   * Returns true if another vector is on left with this one
   * @param v - another vector
   */
  hasOnLeft(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns true if another vector is on right with this one
   * @param v - another vector
   */
  hasOnRight(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns true if angle between vectors is sharp
   * @param v - another vector
   */
  hasSharpCornerWith(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns true if angle between vectors is obtuse
   * @param v - another vector
   */
  hasObtuseCornerWith(v: VectorInterface | VectorArrayType): boolean;

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  distance(v: VectorInterface | VectorArrayType): VectorInterface;

  /**
   * Normalizes this vector
   */
  normalize(): VectorInterface;

  /**
   * Transposes vector backward with offset and scale
   * @param offset - offset
   * @param scale - scale
   */
  transposeBackward(
    offset: VectorArrayType | VectorInterface, scale: VectorArrayType | VectorInterface,
  ): VectorInterface;

  /**
   * Transposes vector forward with offset and scale
   * @param offset - offset
   * @param scale - scale
   */
  transposeForward(
    offset: VectorArrayType | VectorInterface, scale: VectorArrayType | VectorInterface,
  ): VectorInterface;

  /**
   * Returns new vector by rotating this
   * @param angle - angle to rotate to
   */
  rotate(angle: number): VectorInterface;

  /**
   * Rotates vector to the left by 90 degrees
   * @param precision - round precision
   */
  rotateLeft(precision?: number): VectorInterface;

  /**
   * Rotates vector to the right by 90 degrees
   * @param precision - round precision
   */
  rotateRight(precision?: number): VectorInterface;

  /**
   * Get cos with another vector
   * @param v - another vector
   */
  getCos(v: VectorInterface | VectorArrayType | null): number;

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
  includes(coords: VectorArrayType | VectorInterface, precision?: number): boolean;
}
