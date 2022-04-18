import { PositionalInterface, ScalableInterface } from '../structs/vector/types';

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
   * Display flag
   */
  display: boolean;
  /**
   * Visibility flag
   */
  visible: boolean;
  /**
   * Interactive flag
   */
  interactive: boolean;
}

/**
 * Config for positional drawable objects
 * @public
 */
export interface PositionalDrawableConfigInterface
  extends DrawableConfigInterface, PositionalInterface, ScalableInterface {

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

/**
 * Config for drawable figures with name
 * @public
 */
export interface NamedDrawableConfigInterface extends DrawableConfigInterface {
  /**
   * Name
   */
  name: string;
}

/**
 * Config for drawable layers
 * @public
 */
export interface DrawableLayerConfigInterface extends NamedDrawableConfigInterface {

}
