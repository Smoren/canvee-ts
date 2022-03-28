import { VectorArrayType } from '../structs/vector/types';
import { ViewObservableHandlerType, ViewObservableInterface } from './observable';

/**
 * View config interface
 * @public
 */
export interface ViewConfigInterface {
  /**
   * Scale
   */
  scale: VectorArrayType;
  /**
   * Offset
   */
  offset: VectorArrayType;
  /**
   * Grid step
   */
  gridStep: number;
}

/**
 * Interface for observable config for showing on canvas
 * @public
 */
export interface ViewConfigObservableInterface extends ViewConfigInterface, ViewObservableInterface {
  /**
   * Transposes coords with applying scale and offset
   * @param coords - coords to transpose
   */
  transposeBackward(coords: VectorArrayType): VectorArrayType;

  /**
   * Transposes coords back using scale and offset
   * @param coords - coords to transpose
   */
  transposeForward(coords: VectorArrayType): VectorArrayType;

  /**
   * Update scale in cursor context (the place under the cursor will be fixed)
   * @param scale - scale
   * @param cursorCoords - cursor coords
   */
  updateScaleInCursorContext(scale: VectorArrayType, cursorCoords: VectorArrayType): void;

  /**
   * Registers handlers for events when view has changed
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;

  /**
   * Returns the config data
   */
  getConfig(): ViewConfigInterface;
}
