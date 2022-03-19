import { VectorArrayType, ViewConfigInterface, ViewConfigObservableInterface } from "../types";
import { areArraysEqual } from "../helpers/base";

export default class ViewConfig implements ViewConfigObservableInterface {
  protected _scale: VectorArrayType;
  protected _offset: VectorArrayType;
  protected _gridStep: number;
  protected _handlerMap: Record<string, (target: ViewConfig) => void> = {};
  protected _muteHandlers: boolean = false;

  constructor({ scale, offset, gridStep }: ViewConfigInterface) {
    this._scale = new Proxy(scale, {
      set: (target: VectorArrayType, index, value): boolean => {
        target[index as keyof VectorArrayType] = value;
        return this._withMuteHandlers((mutedBefore: boolean) => {
          return this._processHandlers(mutedBefore);
        });
      },
    });
    this._offset = new Proxy(offset, {
      set: (target: VectorArrayType, index, value): boolean => {
        target[index as keyof VectorArrayType] = value;
        return this._withMuteHandlers((mutedBefore: boolean) => {
          return this._processHandlers(mutedBefore);
        });
      },
    });
    this._gridStep = gridStep;
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

  update({ scale, offset, gridStep }: ViewConfigInterface): void {
    const isChanged = !areArraysEqual(scale, this._scale) || !areArraysEqual(offset, this._offset);

    this._withMuteHandlers((mutedBefore: boolean) => {
      this.scale = scale;
      this.offset = offset;
      this.gridStep = gridStep;

      this._processHandlers(!isChanged || mutedBefore);
    });
  }

  get scale(): VectorArrayType {
    return this._scale;
  }

  set scale(scale: VectorArrayType) {
    const isChanged = !areArraysEqual(scale, this._scale);

    this._withMuteHandlers((mutedBefore: boolean) => {
      this._scale[0] = scale[0];
      this._scale[1] = scale[1];
      this._processHandlers(!isChanged || mutedBefore);
    });
  }

  get offset(): VectorArrayType {
    return this._offset;
  }

  set offset(offset: VectorArrayType) {
    const isChanged = !areArraysEqual(offset, this._offset);

    this._withMuteHandlers((mutedBefore: boolean) => {
      this._offset[0] = offset[0];
      this._offset[1] = offset[1];
      this._processHandlers(!isChanged || mutedBefore);
    });
  }

  get gridStep(): number {
    return this._gridStep;
  }

  set gridStep(gridStep: number) {
    const isChanged = gridStep !== this._gridStep;

    this._withMuteHandlers((mutedBefore: boolean) => {
      this._gridStep = gridStep;
      this._processHandlers(!isChanged || mutedBefore);
    });
  }

  protected _withMuteHandlers(action: (mutedBefore: boolean) => void): boolean {
    if (this._muteHandlers) {
      action(true);
    } else {
      this._muteHandlers = true;
      action(false);
      this._muteHandlers = false;
    }

    return true;
  }

  protected _processHandlers(isMuted: boolean): boolean {
    if (!isMuted) {
      Object.values(this._handlerMap)
        .forEach(handler => handler(this));
    }

    return true;
  }
}
