import {
  DrawableConfigInterface,
  DrawableInterface,
  DrawerInterface,
  LinkedDataType,
  ObserveHelperInterface, VectorArrayType, ViewObservableHandlerType,
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
      const isZIndexChanged = config.zIndex !== this._config.zIndex;

      Object.entries(config).forEach(([key, value]) => {
        this._config[key as keyof DrawableConfigInterface] = value;
      });

      manager.processHandlers(!isChanged || mutedBefore, {
        zIndexChanged: isZIndexChanged,
      });
    }))
  }

  public get data(): LinkedDataType {
    return this._data;
  }

  public onViewChange(actorName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(actorName, handler);
  }

  protected constructor(config: DrawableConfigInterface, data: LinkedDataType = {}) {
    this._observeHelper = new ObserveHelper();
    this._config = new Proxy(config, {
      set: (target: DrawableConfigInterface, index, value): boolean => {
        const isChanged = target[index as keyof DrawableConfigInterface] !== value;
        target[index as keyof DrawableConfigInterface] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers({
          zIndexChanged: index === 'zIndex',
        }) : true;
      },
    });
    this._data = new Proxy(data, {
      set: (target: LinkedDataType, index, value): boolean => {
        const isChanged = target[index as keyof LinkedDataType] !== value;
        target[index as keyof LinkedDataType] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers() : true;
      },
    });
  }
}
