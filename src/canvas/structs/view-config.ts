import { VectorArrayType, ViewConfigInterface, ViewConfigObservableInterface } from "../types";
import { areArraysEqual } from "../helpers/base";

export default class ViewConfig implements ViewConfigObservableInterface {
  protected _scale: VectorArrayType;
  protected _offset: VectorArrayType;
  protected _handlers: Array<(viewConfig: ViewConfig) => void>;
  protected _muteHandlers: boolean = false;

  constructor({ scale, offset }: ViewConfigInterface) {
    this._scale = new Proxy(scale, {
      set: (target: VectorArrayType, index, value): boolean => {
        target[index as keyof VectorArrayType] = value;
        return this._processHandlers();
      },
    });
    this._offset = new Proxy(offset, {
      set: (target: VectorArrayType, index, value): boolean => {
        target[index as keyof VectorArrayType] = value;
        return this._processHandlers();
      },
    });
    this._handlers = [];
  }

  onChange(handler: (target: ViewConfig) => void): void {
    this._handlers.push(handler);
  }

  get scale(): VectorArrayType {
    return this._scale;
  }

  set scale(scale: VectorArrayType) {
    const isChanged = !areArraysEqual(scale, this._scale);

    this._muteHandlers = true;
    this._scale[0] = scale[0];
    this._scale[1] = scale[1];
    this._muteHandlers = false;

    if (isChanged) {
      this._processHandlers();
    }
  }

  get offset(): VectorArrayType {
    return this._offset;
  }

  set offset(offset: VectorArrayType) {
    const isChanged = !areArraysEqual(offset, this._offset);

    this._muteHandlers = true;
    this._offset[0] = offset[0];
    this._offset[1] = offset[1];
    this._muteHandlers = false;

    if (isChanged) {
      this._processHandlers();
    }
  }

  protected _processHandlers(): boolean {
    if (!this._muteHandlers) {
      this._handlers.forEach(handler => handler(this));
    }

    return true;
  }
}
