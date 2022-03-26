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
import { transposeCoordsBackward, transposeCoordsForward } from './vector/helpers';

/**
 * Config for objects drawable on canvas
 * @public
 */
export default class ViewConfig implements ViewConfigObservableInterface {
  /**
   * Scale
   */
  protected _scale: VectorArrayType;
  /**
   * Offset
   */
  protected _offset: VectorArrayType;
  /**
   * Grid step
   */
  protected _gridStep: number;
  /**
   * Helper for observable logic
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
        (target[index as keyof VectorArrayType] as unknown) = value;
        return isChanged ? this._observeHelper.processWithMutingHandlers() : true;
      },
    });
    this._offset = new Proxy(offset, {
      set: (target: VectorArrayType, index, value): boolean => {
        const isChanged = target[index as keyof VectorArrayType] !== value;
        (target[index as keyof VectorArrayType] as unknown) = value;
        return isChanged ? this._observeHelper.processWithMutingHandlers() : true;
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
    return transposeCoordsForward(coords, this._offset, this._scale);
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.transposeBackward}
   */
  public transposeBackward(coords: VectorArrayType): VectorArrayType {
    return transposeCoordsBackward(coords, this._offset, this._scale);
  }

  /**
   * {@inheritDoc ViewConfigObservableInterface.updateScaleInCursorContext}
   */
  public updateScaleInCursorContext(newScale: VectorArrayType, cursorCoords: VectorArrayType): void {
    const isChanged = !areArraysEqual(newScale, this._scale);

    if (!isChanged) {
      return;
    }

    this._observeHelper.withMutingHandlers(() => {
      const oldScalePosition = createVector(this.transposeForward(cursorCoords));
      this.scale = newScale;
      const newScalePosition = createVector(this.transposeForward(cursorCoords));
      const difference = newScalePosition.clone().sub(oldScalePosition);
      this.offset = this.transposeBackward(difference.toArray());

      return [isChanged, null];
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

    this._observeHelper.withMutingHandlers(() => {
      this.scale = scale;
      this.offset = offset;
      this.gridStep = gridStep;

      return [isChanged, null];
    });
  }

  /**
   * Returns the config data
   */
  public getConfig(): ViewConfigInterface {
    return {
      scale: this._scale,
      offset: this._offset,
      gridStep: this._gridStep,
    };
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

    this._observeHelper.withMutingHandlers(() => {
      this._scale[0] = scale[0];
      this._scale[1] = scale[1];
      return [isChanged, null];
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

    this._observeHelper.withMutingHandlers(() => {
      this._offset[0] = offset[0];
      this._offset[1] = offset[1];
      return [isChanged, null];
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

    this._observeHelper.withMutingHandlers(() => {
      this._gridStep = gridStep;
      return [isChanged, null];
    });
  }
}
