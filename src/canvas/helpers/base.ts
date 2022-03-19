/**
 * Returns true if arrays are equal and false else
 * @param {Array} lhs first array to compare
 * @param {Array} rhs second array to compare
 */
export function areArraysEqual(lhs: Array<unknown>, rhs: Array<unknown>): boolean {
  return lhs.length === rhs.length && lhs.every((v, i) => v === rhs[i]);
}
