import { DrawableInterface, DrawableStorageInterface } from "../types";

export default class DrawableStorage implements DrawableStorageInterface {
  protected _list: DrawableInterface[];

  constructor(list: DrawableInterface[]) {
    this._list = list;
    this._sort();
  }

  get list(): DrawableInterface[] {
    return this._list;
  }

  public add(item: DrawableInterface): void {
    this._list.push(item);
    this._sort();
  }

  protected _sort(): void {
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
