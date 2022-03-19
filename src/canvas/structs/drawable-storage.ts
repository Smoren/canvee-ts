import {
  DrawableInterface,
  DrawableStorageInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType,
} from "../types";
import ObserveHelper from "../helpers/observe-helper";

export default class DrawableStorage implements DrawableStorageInterface {
  protected _subscriberName: 'DrawableStorage';
  protected _list: DrawableInterface[];
  protected _observeHelper: ObserveHelperInterface;

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

  get list(): DrawableInterface[] {
    return this._list;
  }

  public add(item: DrawableInterface): void {
    item.onViewChange(this._subscriberName, (target, extra) => {
      return this._observeHelper.processWithMuteHandlers(extra);
    });
    this._list.push(item);
    this._sort();
  }

  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  protected _sort(): void {
    console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
