/**
 * Simple 2d vector by array
 */
export type VectorArrayType = [number, number];

/**
 * On change handler for ViewObservable objects
 * @param {object} target observable object
 * @param {object | null} extra some extra data
 */
export type ViewObservableHandlerType = (target: unknown, extra: Record<string, unknown> | null) => void;

/**
 * Observable interface for objects affects the canvas view
 */
export interface ViewObservableInterface {
  /**
   * Registers handlers for events when view has changed
   * @param {string} subscriberName who is subscriber
   * @param {ViewObservableHandlerType} handler handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;
}

/**
 * Helper for managing observable logic
 */
export interface ObserveHelperInterface {
  /**
   * Registers handlers for events when observable parts have changed
   * @param {string} subscriberName who is subscriber
   * @param {ViewObservableHandlerType} handler handler callback
   */
  onChange(subscriberName: string, handler: ViewObservableHandlerType): void;

  /**
   * Process all registered handlers with muting logic
   * @param {object | null} extra extra data
   */
  processWithMuteHandlers(extra?: Record<string, unknown> | null): boolean;

  /**
   * Do action in callback wrapping it with muting logic
   * @param {(mutedBefore: boolean, manager: ObserveHelperInterface) => void} action action to do
   */
  withMuteHandlers(action: (mutedBefore: boolean, manager: ObserveHelperInterface) => void): boolean;

  /**
   * Process all registered handlers
   * @param {boolean} isMuted is already muted flag
   * @param {object | null} extra
   */
  processHandlers(isMuted: boolean, extra?: Record<string, unknown> | null): boolean;
}

/**
 * Config for base drawable objects
 */
export interface DrawableConfigInterface {
  /**
   * @property {number} zIndex Z-index
   */
  zIndex: number;
}

/**
 * Config for basic drawable figures
 */
export interface BasicFigureDrawableConfigInterface extends DrawableConfigInterface {
  /**
   * @property {string} strokeStyle Stroke style
   */
  strokeStyle: string;
  /**
   * @property {string} fillStyle Fill style
   */
  fillStyle: string;
  /**
   * @property {number} lineWidth Line width
   */
  lineWidth: number;
}

/**
 * Extra data that is linked to drawable object
 */
export type LinkedDataType = Record<string, unknown>;

/**
 * Interface for drawable objects
 */
export interface DrawableInterface extends ViewObservableInterface {
  /**
   * @property {DrawableConfigInterface} config View config
   */
  config: DrawableConfigInterface;
  /**
   * @property {LinkedDataType} config View config
   */
  data: LinkedDataType;

  /**
   * Draws the object view on canvas
   * @param {DrawerInterface} drawer drawer object
   */
  draw(drawer: DrawerInterface): void;

  /**
   * Registers handlers for events when it needs to update view
   * @param {string} subscriberName who is subscriber
   * @param {ViewObservableHandlerType} handler handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;
}

// TODO DrawableGroupInterface

/**
 * Interface for storage of drawable objects
 */
export interface DrawableStorageInterface extends ViewObservableInterface {
  /**
   * @property {DrawableInterface[]} list list of drawable objects
   */
  list: DrawableInterface[];

  /**
   * Adds a new drawable object to the storage
   * @param {DrawableInterface} item new drawable object
   */
  add(item: DrawableInterface): void;
}

/**
 * View config interface
 */
export interface ViewConfigInterface {
  /**
   * @property {VectorArrayType} scale scale
   */
  scale: VectorArrayType;
  /**
   * @property {VectorArrayType} offset offset
   */
  offset: VectorArrayType;
  /**
   * @property {number} gridStep gridStep
   */
  gridStep: number;
}

/**
 * Interface for observable config for showing on canvas
 */
export interface ViewConfigObservableInterface extends ViewConfigInterface, ViewObservableInterface {
  /**
   * Transposes coords with applying scale and offset
   * @param {VectorArrayType} coords
   */
  transposeForward(coords: VectorArrayType): VectorArrayType;
  /**
   * Transposes coords back using scale and offset
   * @param {VectorArrayType} coords
   */
  transposeBackward(coords: VectorArrayType): VectorArrayType;

  /**
   * Registers handlers for events when view has changed
   * @param {string} subscriberName who is subscriber
   * @param {function} handler handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;
}

/**
 * Interface for config of drawer
 */
export interface DrawerConfigInterface {
  /**
   * @property {HTMLCanvasElement} domElement DOM element of canvas
   */
  domElement: HTMLCanvasElement,
  /**
   * @property {ViewConfigObservableInterface} viewConfig view config
   */
  viewConfig: ViewConfigObservableInterface,
  /**
   * @property {DrawableStorageInterface} storage storage of drawable objects
   */
  storage: DrawableStorageInterface
}

/**
 * Drawer interface
 */
export interface DrawerInterface {
  /**
   * @property {ViewConfigInterface} viewConfig view config
   */
  viewConfig: ViewConfigInterface;
  /**
   * @property {CanvasRenderingContext2D} context drawing context
   */
  context: CanvasRenderingContext2D;
  /**
   * @property {number} width current canvas element width
   */
  width: number;
  /**
   * @property {number} height current canvas element height
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
}
