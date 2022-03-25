import { DrawableInterface } from '../types';

/**
 * Checks if item is instance of PositionalDrawableInterface
 * @see PositionalDrawableInterface
 * @param item - item to check
 */
export function isPositional(item: DrawableInterface): boolean {
  return 'isPositional' in item;
}

/**
 * Checks if item is instance of PositionalDrawableInterface
 * @see DrawableLayerInterface
 * @param item - item to check
 */
export function isLayer(item: DrawableInterface): boolean {
  return 'isLayer' in item;
}
