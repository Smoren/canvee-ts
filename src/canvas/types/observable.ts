/**
 * Extra data type for observable actions
 * @public
 */
export type ExtraDataType = Record<string, unknown>;

/**
 * On change handler for ViewObservable objects
 * @public
 * @param target - observable object
 * @param extra - some extra data
 */
export type ViewObservableHandlerType = (target: unknown, extra: Record<string, unknown> | null) => void;

/**
 * On change handler for ViewObservable objects
 * @public
 * @param observer - observe helper object
 */
export type ViewObservableCallbackType = (observer: ObserveHelperInterface)
    => [boolean, ExtraDataType | null]

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

  /**
   * Unregisters handler for events
   * @param subscriberName - who is subscriber
   */
  offViewChange(subscriberName: string): void;
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
  processWithMutingHandlers(extra?: ExtraDataType | null): boolean;

  /**
   * Do action in callback wrapping it with muting logic
   * @param action - action to do
   */
  withMutingHandlers(action: ViewObservableCallbackType): boolean;
}
