/**
 * Simple 2d vector by array
 * @public
 */
export type VectorArrayType = [number, number];

/**
 * Interface of vector
 * @public
 */
export interface VectorInterface {
  /**
   * Coordinate X
   */
  x: number;
  /**
   * Coordinate Y
   */
  y: number;

  /**
   * Add another vector to this vector
   * @param v - vector to add
   */
  add(v: VectorInterface): VectorInterface;

  /**
   * Subtracts vector with another vector
   * @param v - vector to subtract
   */
  sub(v: VectorInterface): VectorInterface;

  /**
   * Multiples vector by number
   * @param mul - multiplier
   */
  mul(mul: number): VectorInterface;

  /**
   * Divides vector by number
   * @param div - divider
   */
  div(div: number): VectorInterface;

  /**
   * Inverses vector
   */
  inverse(): VectorInterface;

  /**
   * Reverses vector
   */
  reverse(): VectorInterface;

  /**
   * Returns the length of vector
   */
  len(): number;

  /**
   * Returns distance vector of this and another vector
   * @param v - another vector
   */
  distance(v: VectorInterface): VectorInterface;

  /**
   * Clones vector
   */
  clone(): VectorInterface;

  /**
   * Converts vector to array
   */
  toArray(): VectorArrayType;
}

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
   * Registers handler for events when observable parts have changed
   * @param subscriberName - who is subscriber
   * @param handler - handler callback
   */
  onChange(subscriberName: string, handler: ViewObservableHandlerType): void;

  /**
   * Unregisters handler for events
   * @param subscriberName - who is subscriber
   */
  offChange(subscriberName: string): void;

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
   * Position vector
   */
  position: VectorArrayType;
  /**
   * Z-index
   */
  zIndex: number;
  /**
   * Visibility flag
   */
  visible: boolean;
  /**
   * Selectable flag
   */
  selectable: boolean;
}

/**
 * Config for basic drawable figures
 * @public
 */
export interface BasicFigureDrawableConfigInterface extends DrawableConfigInterface {
  /**
   * Figure size vector
   */
  size: VectorArrayType;
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
 * Drawable object ID
 */
export type DrawableIdType = string | number;

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
}

/**
 * Interface for group of drawable objects
 */
export interface DrawableGroupInterface extends DrawableInterface {
  /**
   * List of objects in group
   */
  list: DrawableInterface[];
}

/**
 * Filter callback for finding objects in storage
 * @public
 */
export type DrawableStorageFilterCallbackType = (candidate: DrawableInterface) => boolean;

/**
 * Filter config for finding objects in storage
 * @public
 */
export interface DrawableStorageFilterConfigInterface {
  idsOnly?: DrawableIdType[];
  idsExcept?: DrawableIdType[];
  typesOnly?: string[];
  typesExcept?: string[];
  extraFilter?: DrawableStorageFilterCallbackType,
}

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

  /**
   * Adds the list of drawable objects to the storage
   */
  addBatch(items: DrawableInterface[]): void;

  /**
   * Clears the storage
   */
  clear(): void;

  /**
   * Find objects in storage by filter config
   * @param config - filter config object
   */
  find(config: DrawableStorageFilterConfigInterface): DrawableInterface[];

  /**
   * Returns one object found by ID
   * @param id - object ID
   * @throws Error if object is not found
   */
  findById(id: DrawableIdType): DrawableInterface;

  /**
   * Make a group from objects by IDs
   * @param ids - id list of objects to group
   */
  group(ids: DrawableIdType[]): DrawableGroupInterface

  /**
   * Ungroup objects
   * @param groupId - group ID
   */
  ungroup(groupId: DrawableIdType): void;

  /**
   * Deletes objects found by config from storage
   * @param config
   */
  delete(config: DrawableStorageFilterConfigInterface): DrawableInterface[];

  /**
   * Deletes object by ID from storage
   * @param id
   */
  deleteById(id: DrawableIdType): DrawableInterface;
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
  getBounds(): [VectorArrayType, VectorArrayType];
}
