import { VectorArrayType } from './types';

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
 * @param precision - precision
 */
export function round(num: number, precision: number = 0): number {
  const mult = 10**precision;
  return Math.round(num * mult) / mult;
}

/**
 * Transpose coords with backward applying offset and scale
 * @param coords - coords to transpose
 * @param offset - offset vector
 * @param scale - scale vector
 */
export function transposeCoordsBackward(
  coords: VectorArrayType, offset: VectorArrayType, scale: VectorArrayType = [1, 1],
): VectorArrayType {
  const [x, y] = coords;
  return [(x - offset[0])/scale[0], (y - offset[1])/scale[1]];
}

/**
 * Transpose coords with forward applying offset and scale
 * @param coords - coords to transpose
 * @param offset - offset vector
 * @param scale - scale vector
 */
export function transposeCoordsForward(
  coords: VectorArrayType, offset: VectorArrayType, scale: VectorArrayType = [1, 1],
): VectorArrayType {
  const [x, y] = coords;
  return [x*scale[0] + offset[0], y*scale[1] + offset[1]];
}
