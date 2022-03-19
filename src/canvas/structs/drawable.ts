import {
  DrawableConfigInterface,
  DrawableInterface,
  DrawerInterface,
  LinkedDataType,
  ObserveHelperInterface,
} from "../types";
import { areArraysEqual } from "../helpers/base";
import ObserveHelper from "../helpers/observe-helper";

export default abstract class Drawable implements DrawableInterface {
  protected _config: DrawableConfigInterface;
  protected _data: LinkedDataType;
  protected _observeHelper: ObserveHelperInterface;

  public abstract draw(drawer: DrawerInterface): void;

  public get config(): DrawableConfigInterface {
    return this._config;
  }

  public set config(config: DrawableConfigInterface) {
    const isChanged = !areArraysEqual(Object.entries(config), Object.entries(this._config));

    this._observeHelper.withMuteHandlers(((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      Object.entries(config).forEach(([key, value]) => {
        this._config[key as keyof DrawableConfigInterface] = value;
      });

      manager.processHandlers(!isChanged || mutedBefore);
    }))
  }

  public get data(): LinkedDataType {
    return this._data;
  }

  public onViewChange(actorName: string, handler: (target: Drawable) => void): void {
    this._observeHelper.onChange(actorName, handler);
  }

  protected constructor(config: DrawableConfigInterface, data: LinkedDataType = {}) {
    this._observeHelper = new ObserveHelper();
    this._config = new Proxy(config, {
      set: (target: DrawableConfigInterface, index, value): boolean => {
        target[index as keyof DrawableConfigInterface] = value;
        return this._observeHelper.processWithMuteHandlers();
      },
    });
    this._data = new Proxy(data, {
      set: (target: LinkedDataType, index, value): boolean => {
        target[index as keyof LinkedDataType] = value;
        return this._observeHelper.processWithMuteHandlers();
      },
    });
  }
}
