/**
 * Simple 2d vector by array
 * @public
 */
export type VectorArrayType = [number, number];

/**
 * On change handler for ViewObservable objects
 * @public
 * @param target - observable object
 * @param extra - some extra data
 */
export type ViewObservableHandlerType = (target: unknown, extra: Record<string, unknown> | null) => void;

/**
 * Observable interface for objects affects the canvas view
 * @public
 */
export interface ViewObservableInterface {
  /**
   * Registers handlers for events when view has changed
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;
}

/**
 * Helper for managing observable logic
 * @public
 */
export interface ObserveHelperInterface {
  /**
   * Registers handlers for events when observable parts have changed
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onChange(subscriberName: string, handler: ViewObservableHandlerType): void;

  /**
   * Process all registered handlers with muting logic
   * @param extra - extra data
   */
  processWithMuteHandlers(extra?: Record<string, unknown> | null): boolean;

  /**
   * Do action in callback wrapping it with muting logic
   * @param action - action to do
   */
  withMuteHandlers(action: (mutedBefore: boolean, manager: ObserveHelperInterface) => void): boolean;

  /**
   * Process all registered handlers
   * @param isMuted - is already muted flag
   * @param extra - linked extra data
   */
  processHandlers(isMuted: boolean, extra?: Record<string, unknown> | null): boolean;
}

/**
 * Config for base drawable objects
 * @public
 */
export interface DrawableConfigInterface {
  /**
   * Z-index
   */
  zIndex: number;
}

/**
 * Config for basic drawable figures
 * @public
 */
export interface BasicFigureDrawableConfigInterface extends DrawableConfigInterface {
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
 * Extra data that is linked to drawable object
 * @public
 */
export type LinkedDataType = Record<string, unknown>;

/**
 * Interface for drawable objects
 * @public
 */
export interface DrawableInterface extends ViewObservableInterface {
  /**
   * View config
   */
  config: DrawableConfigInterface;
  /**
   * View config
   */
  data: LinkedDataType;

  /**
   * Draws the object view on canvas
   * @param drawer - drawer object
   */
  draw(drawer: DrawerInterface): void;

  /**
   * Registers handlers for events when it needs to update view
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void;
}

// TODO DrawableGroupInterface

/**
 * Interface for storage of drawable objects
 * @public
 */
export interface DrawableStorageInterface extends ViewObservableInterface {
  /**
   * List of drawable objects
   */
  list: DrawableInterface[];

  /**
   * Adds a new drawable object to the storage
   * @param item - new drawable object
   */
  add(item: DrawableInterface): void;
}

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
  transposeForward(coords: VectorArrayType): VectorArrayType;
  /**
   * Transposes coords back using scale and offset
   * @param coords - coords to transpose
   */
  transposeBackward(coords: VectorArrayType): VectorArrayType;

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
}

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
  viewConfig: ViewConfigInterface;
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
}
