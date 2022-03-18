export function areArraysEqual(lhs: Array<unknown>, rhs: Array<unknown>): boolean {
  return lhs.length === rhs.length && lhs.every((v, i) => v === rhs[i]);
}
