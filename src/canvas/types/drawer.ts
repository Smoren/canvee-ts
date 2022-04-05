import { VectorArrayType } from '../structs/vector/types';
import { ViewConfigObservableInterface } from './view-config';
import { DrawableStorageInterface } from './drawable-storage';
import { BoundInterface } from './bound';

/**
 * Interface for config of drawer
 * @public
 */
export interface DrawerConfigInterface {
  /**
   * DOM element of canvas
   */
  domElement: HTMLCanvasElement,
  /**
   * View config
   */
  viewConfig: ViewConfigObservableInterface,
  /**
   * Storage of drawable objects
   */
  storage: DrawableStorageInterface
}

/**
 * Drawer interface
 * @public
 */
export interface DrawerInterface {
  /**
   * View config
   */
  viewConfig: ViewConfigObservableInterface;
  /**
   * Drawing context
   */
  context: CanvasRenderingContext2D;
  /**
   * Current canvas element width
   */
  width: number;
  /**
   * Current canvas element height
   */
  height: number;

  /**
   * Draws all the objects in storage
   */
  draw(): void;

  /**
   * Redraws view on canvas
   */
  refresh(): void;

  /**
   * Clears canvas
   */
  clear(): void;

  /**
   * Returns bounds of canvas frame
   */
  getBound(): BoundInterface;
}
