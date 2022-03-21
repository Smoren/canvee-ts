import { createBlob, createUrlFromBlob, hashString } from '../helpers/base';
import {
  HashKeyType,
  ImageCacheInterface,
  OnLoadHandlerType,
  OnTotalLoadHandlerType,
} from '../types';

/**
 * Cache helper for images
 * @public
 */
export default class ImageCache implements ImageCacheInterface {
  /**
   * Map of the preloaded images
   * @protected
   */
  protected _imageMap: Record<HashKeyType, HTMLImageElement> = {};
  /**
   * Map of the running processes
   * @protected
   */
  protected _processMap: Record<HashKeyType, boolean> = {};
  /**
   * Map of the buffered handlers
   * @protected
   */
  protected _handlers: Record<HashKeyType, Array<OnLoadHandlerType>> = {};
  /**
   * Map of the handlers for subscribed objects
   * @protected
   */
  protected _totalHandlers: Record<HashKeyType, OnTotalLoadHandlerType> = {};

  /**
   * {@inheritDoc ImageCacheInterface.subscribe}
   */
  public subscribe(subscriberName: string, handler: OnTotalLoadHandlerType): void {
    this._totalHandlers[subscriberName] = handler;
  }

  /**
   * {@inheritDoc ImageCacheInterface.unsubscribe}
   */
  public unsubscribe(subscriberName: string): void {
    delete this._totalHandlers[subscriberName];
  }

  /**
   * {@inheritDoc ImageCacheInterface.cache}
   */
  public cache(
    source: string,
    type: string,
    callback: OnLoadHandlerType | null = null,
  ): HTMLImageElement | null {
    const key = this._getKey(source, type);

    if (this._imageMap[key] !== undefined) {
      if (callback !== null) {
        callback(this._imageMap[key]);
      }
      return this._imageMap[key];
    }

    if (this._processMap[key] !== undefined) {
      if (callback !== null) {
        if (this._handlers[key] === undefined) {
          this._handlers[key] = [];
        }
        this._handlers[key].push(callback);
      }
      return null;
    }

    this._processMap[key] = true;

    const blob: Blob = createBlob(source, type);
    const url: string = createUrlFromBlob(blob);
    const img = new Image();
    img.src = url;

    img.addEventListener('load', () => {
      this._imageMap[key] = img;
      delete this._processMap[key];

      if (this._handlers[key] !== undefined) {
        const handlers = this._handlers[key];
        while (handlers.length) {
          (handlers.pop())(img);
        }
        delete this._handlers[key];
      }

      if (!Object.keys(this._processMap).length) {
        Object.values(this._totalHandlers).forEach((handler) => handler());
      }
    });

    return null;
  }

  /**
   * Creates a hash for image data and type and returns it as string
   * @param source - source data of image
   * @param type - mime type
   * @protected
   */
  protected _getKey(source: string, type: string): HashKeyType {
    return hashString(`${source}_${type}`);
  }
}
