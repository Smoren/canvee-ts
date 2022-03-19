import {
  DrawableInterface,
  DrawableStorageInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType,
} from "../types";
import ObserveHelper from "../helpers/observe-helper";

export default class DrawableStorage implements DrawableStorageInterface {
  protected _actorName: 'DrawableStorage';
  protected _list: DrawableInterface[];
  protected _observeHelper: ObserveHelperInterface;

  constructor() {
    this._observeHelper = new ObserveHelper();
    this._list = [];
    this._sort();

    this._observeHelper.onChange(this._actorName, (target, extra) => {
      if (extra !== null && extra.hasOwnProperty('zIndexChanged') && extra.zIndexChanged) {
        this._sort();
      }
    });
  }

  get list(): DrawableInterface[] {
    return this._list;
  }

  public add(item: DrawableInterface): void {
    item.onViewChange(this._actorName, (target, extra) => {
      return this._observeHelper.processWithMuteHandlers(extra);
    });
    this._list.push(item);
    this._sort();
  }

  onViewChange(actorName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(actorName, handler);
  }

  protected _sort(): void {
    console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
