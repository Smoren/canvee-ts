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
 * @param precision - percision
 */
export function round(num: number, precision: number = 0): number {
  const mult = 10**precision;
  return Math.round(num * mult) / mult;
}
