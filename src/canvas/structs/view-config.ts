import { VectorArrayType, ViewConfigInterface, ViewConfigObservableInterface } from "../types";
import { areArraysEqual } from "../helpers/base";

export default class ViewConfig implements ViewConfigObservableInterface {
  protected _scale: VectorArrayType;
  protected _offset: VectorArrayType;
  protected _handlerMap: Record<string, (target: ViewConfig) => void> = {};
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
  }

  public onViewChange(actorName: string, handler: (target: ViewConfig) => void): void {
    this._handlerMap[actorName] = handler;
  }

  public transposeForward(coords: VectorArrayType): VectorArrayType {
    const [x, y] = coords;
    return [(x - this._offset[0])/this._scale[0], (y - this._offset[1])/this._scale[1]];
  }

  public transposeBackward(coords: VectorArrayType): VectorArrayType {
    const [x, y] = coords;
    return [x*this._scale[0] + this._offset[0], y*this._scale[1] + this._offset[1]];
  }

  update({ scale, offset }: ViewConfigInterface): void {
    const isChanged = !areArraysEqual(scale, this._scale) || !areArraysEqual(offset, this._offset);

    this._muteHandlers = true;
    this._scale[0] = scale[0];
    this._scale[1] = scale[1];
    this._offset[0] = offset[0];
    this._offset[1] = offset[1];
    this._muteHandlers = false;

    if (isChanged) {
      this._processHandlers();
    }
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
      Object.values(this._handlerMap)
        .forEach(handler => handler(this));
    }

    return true;
  }
}
