import {
  DrawableInterface,
  DrawableStorageInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType,
} from "../types";
import ObserveHelper from "../helpers/observe-helper";

/**
 * Storage for drawable objects
 */
export default class DrawableStorage implements DrawableStorageInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   * @protected
   */
  protected _subscriberName: 'DrawableStorage';
  /**
   * List of stored drawable objects
   * @protected
   */
  protected _list: DrawableInterface[];
  /**
   * Helper for observable logic
   * @protected
   */
  protected _observeHelper: ObserveHelperInterface;

  /**
   * Drawable constructor
   */
  constructor() {
    this._observeHelper = new ObserveHelper();
    this._list = [];
    this._sort();

    this._observeHelper.onChange(this._subscriberName, (target, extra) => {
      if (extra !== null && extra.hasOwnProperty('zIndexChanged') && extra.zIndexChanged) {
        this._sort();
      }
    });
  }

  /**
   * Stored drawable objects list getter
   */
  get list(): DrawableInterface[] {
    return this._list;
  }

  /**
   * @inheritDoc
   */
  public add(item: DrawableInterface): void {
    item.onViewChange(this._subscriberName, (target, extra) => {
      return this._observeHelper.processWithMuteHandlers(extra);
    });
    this._list.push(item);
    this._sort();
  }

  /**
   * @inheritDoc
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * Sorts the stored objects by z-index
   * @protected
   */
  protected _sort(): void {
    console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
