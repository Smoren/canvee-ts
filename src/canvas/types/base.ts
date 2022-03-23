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
   * Returns the length of vector
   */
  len(): number;

  /**
   * Returns true if this vector is equal to another vector
   * @param v - another vector
   * @param precision - round precision for comparison
   */
  isEqual(v: VectorInterface, precision: number): boolean;

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  distance(v: VectorInterface): VectorInterface;

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
   * Returns true if vector includes the point
   * @param coords - point coords
   * @param precision - round precision for comparison
   */
  includes(coords: VectorArrayType | VectorInterface, precision: number): boolean;
}
