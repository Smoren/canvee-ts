import { DrawableInterface } from "../types";

/**
 * Checks if item is instance of PositionalDrawableInterface
 * @see PositionalDrawableInterface
 * @param item - item to check
 */
export function isPositional(item: DrawableInterface): boolean {
  return 'isPositional' in item;
}
