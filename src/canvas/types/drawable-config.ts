import { VectorArrayType } from './base';

/**
 * Extra data that is linked to drawable object
 * @public
 */
export type LinkedDataType = Record<string, unknown>;

/**
 * Drawable object ID
 */
export type DrawableIdType = string | number;

/**
 * Config for base drawable objects
 * @public
 */
export interface DrawableConfigInterface {
  /**
   * Z-index
   */
  zIndex: number;
  /**
   * Visibility flag
   */
  visible: boolean;
}

/**
 * Config for positional drawable objects
 * @public
 */
export interface PositionalDrawableConfigInterface extends DrawableConfigInterface {
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
 * Config for drawable figures with drawing styles
 * @public
 */
export interface StylizedDrawableConfigInterface extends DrawableConfigInterface {
  /**
   * Stroke style
   */
  strokeStyle: string;
  /**
   * Fill style
   */
  fillStyle: string;
  /**
   * Line width
   */
  lineWidth: number;
}
