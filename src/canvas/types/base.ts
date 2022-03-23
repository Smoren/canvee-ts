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
   */
  toArray(): VectorArrayType;
}
