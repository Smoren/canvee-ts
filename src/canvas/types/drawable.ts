import { VectorArrayType } from '../structs/vector/types';
import {
  DrawableConfigInterface,
  DrawableIdType, DrawableLayerConfigInterface,
  LinkedDataType,
  PositionalDrawableConfigInterface,
} from './drawable-config';
import { ViewObservableHandlerType, ViewObservableInterface } from './observable';
import { DrawerInterface } from './drawer';
import { BoundInterface } from './bound';
import { DrawableStorageInterface } from './drawable-storage';
import { translatePositionConfig } from '../helpers/base';

/**
 * Interface for drawable objects
 * @public
 */
export interface DrawableInterface extends ViewObservableInterface {
  /**
   * Element ID
   */
  id: DrawableIdType;
  /**
   * Object type
   */
  type: string;
  /**
   * View config
   */
  config: DrawableConfigInterface;
  /**
   * View config
   */
  data: LinkedDataType;
  /**
   * Is interactive flag
   */
  isInteractive: boolean;

  /**
   * Draws the object view on canvas
   * @param drawer - drawer object
   */
  draw(drawer: DrawerInterface): void;

  /**
   * Registers handler for events when it needs to update view
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;

  /**
   * Unregisters handler for events
   * @param subscriberName - who is subscriber
   */
  offViewChange(subscriberName: string): void;
}

/**
 * Interface for positional drawable objects
 * @public
 */
export interface PositionalDrawableInterface extends DrawableInterface {
  // TODO add scalable flag
  /**
   * Interface belonging flag
   */
  isPositional: true;
  /**
   * View config
   */
  config: PositionalDrawableConfigInterface;
  /**
   * Figure bound
   */
  bound: BoundInterface;

  /**
   * Sets a new object position
   * @param coords - new position coords
   */
  setPosition(coords: VectorArrayType): void;

  /**
   * Moves object position
   * @param offset - vector to change position
   */
  movePosition(offset: VectorArrayType): void;

  /**
   * Returns relative position of a point
   * @param point - some point
   */
  getRelativePosition(point: VectorArrayType): VectorArrayType;

  /**
   * Returns true if the bound includes a point
   * @param coords - point coords
   * @param scale - scale vector
   */
  boundIncludes(coords: VectorArrayType, scale: VectorArrayType): boolean;

  /**
   * Returns true if a point is near bound edge
   * @param coords - point coords
   * @param scale - scale vector
   * @param deviation - deviation size
   */
  isNearBoundEdge(coords: VectorArrayType, scale: VectorArrayType, deviation: number): boolean;

  /**
   * Returns bound with applied scale
   * @param scale - scale vector
   */
  getScaledBound(scale: VectorArrayType): BoundInterface;

  /**
   * Returns position and size with applied scale
   */
  translatePositionConfig(scale: VectorArrayType): [VectorArrayType, VectorArrayType];
}

/**
 * Interface for group of drawable objects
 * @public
 */
export interface DrawableGroupInterface extends DrawableInterface {
  /**
   * List of objects in group
   */
  list: DrawableInterface[];

  /**
   * Do some work to destruct group
   */
  destruct(): DrawableInterface[];
}

/**
 * Interface for positional group of drawable objects
 * @public
 */
export interface PositionalDrawableGroupInterface extends PositionalDrawableInterface, DrawableGroupInterface {
  /**
   * View config
   */
  config: PositionalDrawableConfigInterface;
}

/**
 * Interface for layer of drawable objects
 * @public
 */
export interface DrawableLayerInterface extends DrawableGroupInterface {
  /**
   * Interface belonging flag
   */
  isLayer: true;
  /**
   * View config
   */
  config: DrawableLayerConfigInterface;
  /**
   * Storage of the layer's objects
   */
  storage: DrawableStorageInterface;
}
