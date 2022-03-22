import {
  ObserveHelperInterface,
  ViewConfigInterface,
  ViewConfigObservableInterface,
  ViewObservableHandlerType,
  VectorArrayType,
} from '../types';
import { areArraysEqual } from '../helpers/base';
import ObserveHelper from '../helpers/observe-helper';
import { createVector } from './vector';

/**
 * Config for objects drawable on canvas
 * @public
 */
export default class ViewConfig implements ViewConfigObservableInterface {
  /**
   * Scale
   * @protected
   */
  protected _scale: VectorArrayType;
  /**
   * Offset
   * @protected
   */
  protected _offset: VectorArrayType;
  /**
   * Grid step
   * @protected
   */
  protected _gridStep: number;
  /**
   * Helper for observable logic
   * @protected
   */
  protected _observeHelper: ObserveHelperInterface;

  /**
   * ViewConfig constructor
   * @param scale - scale
   * @param offset - offset
   * @param gridStep - grid step
   */
  constructor({ scale, offset, gridStep }: ViewConfigInterface) {
    this._observeHelper = new ObserveHelper();
    this._scale = new Proxy(scale, {
      set: (target: VectorArrayType, index, value): boolean => {
        const isChanged = target[index as keyof VectorArrayType] !== value;
        target[index as keyof VectorArrayType] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers() : true;
      },
    });
    this._offset = new Proxy(offset, {
      set: (target: VectorArrayType, index, value): boolean => {
        const isChanged = target[index as keyof VectorArrayType] !== value;
        target[index as keyof VectorArrayType] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers() : true;
      },
    });
    this._gridStep = gridStep;
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.onViewChange}
   */
  public onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.offViewChange}
   */
  public offViewChange(subscriberName: string): void {
    this._observeHelper.offChange(subscriberName);
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.transposeForward}
   */
  public transposeForward(coords: VectorArrayType): VectorArrayType {
    const [x, y] = coords;
    return [(x - this._offset[0])/this._scale[0], (y - this._offset[1])/this._scale[1]];
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.transposeBackward}
   */
  public transposeBackward(coords: VectorArrayType): VectorArrayType {
    const [x, y] = coords;
    return [x*this._scale[0] + this._offset[0], y*this._scale[1] + this._offset[1]];
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.updateScaleInCursorContext}
   */
  public updateScaleInCursorContext(newScale: VectorArrayType, cursorCoords: VectorArrayType): void {
    const isChanged = !areArraysEqual(newScale, this._scale);

    if (!isChanged) {
      return;
    }

    this._observeHelper.withMuteHandlers((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      const oldScalePosition = createVector(this.transposeForward(cursorCoords));
      this.scale = newScale;
      const newScalePosition = createVector(this.transposeForward(cursorCoords));
      const difference = newScalePosition.clone().sub(oldScalePosition);
      this.offset = this.transposeBackward(difference.toArray());

      manager.processHandlers(!isChanged || mutedBefore);
    });
  }

  /**
   * Updates all the data in config
   * @param scale - scale
   * @param offset - offset
   * @param gridStep - grid step
   */
  public update({ scale, offset, gridStep }: ViewConfigInterface): void {
    const isChanged = !areArraysEqual(scale, this._scale) || !areArraysEqual(offset, this._offset);

    this._observeHelper.withMuteHandlers((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      this.scale = scale;
      this.offset = offset;
      this.gridStep = gridStep;

      manager.processHandlers(!isChanged || mutedBefore);
    });
  }

  /**
   * Scale getter
   */
  get scale(): VectorArrayType {
    return this._scale;
  }

  /**
   * Scale setter
   * @param scale - scale
   */
  set scale(scale: VectorArrayType) {
    const isChanged = !areArraysEqual(scale, this._scale);

    this._observeHelper.withMuteHandlers((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      this._scale[0] = scale[0];
      this._scale[1] = scale[1];
      manager.processHandlers(!isChanged || mutedBefore);
    });
  }

  /**
   * Offset getter
   */
  get offset(): VectorArrayType {
    return this._offset;
  }

  /**
   * Offset setter
   * @param offset - offset
   */
  set offset(offset: VectorArrayType) {
    const isChanged = !areArraysEqual(offset, this._offset);

    this._observeHelper.withMuteHandlers((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      this._offset[0] = offset[0];
      this._offset[1] = offset[1];
      manager.processHandlers(!isChanged || mutedBefore);
    });
  }

  /**
   * Grid step getter
   */
  get gridStep(): number {
    return this._gridStep;
  }

  /**
   * Grid step setter
   * @param gridStep - grid step
   */
  set gridStep(gridStep: number) {
    const isChanged = gridStep !== this._gridStep;

    this._observeHelper.withMuteHandlers((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      this._gridStep = gridStep;
      manager.processHandlers(!isChanged || mutedBefore);
    });
  }
}
