import { DrawableConfigInterface, DrawableInterface, DrawerInterface, LinkedDataType, VectorArrayType } from "../types";
import { areArraysEqual } from "../helpers/base";

export default abstract class Drawable implements DrawableInterface {
  protected _config: DrawableConfigInterface;
  protected _data: LinkedDataType;
  protected _handlerMap: Record<string, (target: Drawable) => void> = {};
  protected _muteHandlers: boolean = false;

  public abstract draw(drawer: DrawerInterface): void;

  public get config(): DrawableConfigInterface {
    return this._config;
  }

  public set config(config: DrawableConfigInterface) {
    const isChanged = !areArraysEqual(Object.entries(config), Object.entries(this._config));

    this._muteHandlers = true;
    Object.entries(config).forEach(([key, value]) => {
      this._config[key as keyof DrawableConfigInterface] = value;
    });
    this._muteHandlers = false;

    if (isChanged) {
      this._processHandlers();
    }
  }

  public get data(): LinkedDataType {
    return this._data;
  }

  public onViewChange(actorName: string, handler: (target: Drawable) => void): void {
    this._handlerMap[actorName] = handler;
  }

  protected constructor(config: DrawableConfigInterface, data: LinkedDataType = {}) {
    this._config = new Proxy(config, {
      set: (target: DrawableConfigInterface, index, value): boolean => {
        target[index as keyof DrawableConfigInterface] = value;
        return this._processHandlers();
      },
    });
    this._data = new Proxy(data, {
      set: (target: LinkedDataType, index, value): boolean => {
        target[index as keyof LinkedDataType] = value;
        return this._processHandlers();
      },
    });
  }

  protected _processHandlers(): boolean {
    if (!this._muteHandlers) {
      Object.values(this._handlerMap)
        .forEach(handler => handler(this));
    }

    return true;
  }
}
