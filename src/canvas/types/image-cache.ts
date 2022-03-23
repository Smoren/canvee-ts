/**
 * On cached image loaded handler
 * @public
 */
export type OnLoadHandlerType = (image: HTMLImageElement) => void;

/**
 * On all the cached images loaded handler
 * @public
 */
export type OnTotalLoadHandlerType = () => void;

/**
 * Hash key for cached image
 * @public
 */
export type HashKeyType = string;

/**
 * Cache helper for images
 * @public
 */
export interface ImageCacheInterface {
  /**
   * Adds a handler for event when all the images in queue are loaded
   * @param subscriberName - name of the subscriber
   * @param handler - handler callback function
   */
  subscribe(subscriberName: string, handler: OnTotalLoadHandlerType): void;

  /**
   * Removes handler of subscriber
   * @param subscriberName - subscriber name
   */
  unsubscribe(subscriberName: string): void;

  /**
   * Caches the image
   * @param source - source data of image
   * @param type - mime type
   * @param callback - callback for image is loaded
   * @returns image if it's preloaded before
   */
  cache(source: string, type: string, callback: OnLoadHandlerType | null): HTMLImageElement | null;
}
