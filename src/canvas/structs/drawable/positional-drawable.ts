import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  VectorArrayType, DrawableIdType, LinkedDataType,
} from '../../types';
import { createVector, toVector } from '../vector';
import Drawable from '../drawable/drawable';
import { BoundInterface } from '../../types/bound';
import RectangularBound from '../bounds/rectangular-bound';
import { transposeCoordsBackward } from '../vector/helpers';
import { translatePositionConfig } from '../../helpers/base';

interface ConstructorInterface {
  id: DrawableIdType;
  config: PositionalDrawableConfigInterface;
  data?: LinkedDataType;
}

/**
 * Abstract class for drawable positional objects
 * @public
 */
export default abstract class PositionalDrawable extends Drawable implements PositionalDrawableInterface {
  /**
   * Interface belonging flag
   */
  public isPositional: true = true;
  /**
   * View config
   */
  protected _config: PositionalDrawableConfigInterface;

  /**
   * {@inheritDoc DrawableInterface.setPosition}
   */
  public setPosition(coords: VectorArrayType): void {
    this._config.position = coords;
  }

  /**
   * {@inheritDoc DrawableInterface.movePosition}
   */
  public movePosition(offset: VectorArrayType): void {
    this.setPosition(
      createVector(this._config.position)
        .add(createVector(offset))
        .toArray(),
    );
  }

  /**
   * {@inheritDoc DrawableInterface.getRelativePosition}
   */
  public getRelativePosition(point: VectorArrayType): VectorArrayType {
    return createVector(point)
      .sub(createVector(this.config.position))
      .toArray();
  }

  /**
   * {@inheritDoc DrawableInterface.boundIncludes}
   */
  public boundIncludes(coords: VectorArrayType, scale: VectorArrayType): boolean {
    return this.getScaledBound(scale).includes(
      transposeCoordsBackward(coords, this._config.position),
      scale,
    );
  }

  /**
   * {@inheritDoc DrawableInterface.isNearBoundEdge}
   */
  public isNearBoundEdge(coords: VectorArrayType, scale: VectorArrayType, deviation: number): boolean {
    return this.getScaledBound(scale).isNearEdge(
      transposeCoordsBackward(coords, this._config.position),
      scale,
      deviation,
    );
  }

  /**
   * {@inheritDoc DrawableInterface.getScaledBound}
   */
  public getScaledBound(scale: VectorArrayType): BoundInterface {
    // TODO use position_offset config param
    const positionOffset = this._config.positionOffset;
    return this._config.scalable
      ? this.bound.specify([1, 1], positionOffset ?? [0, 0])
      : this.bound.specify(toVector(scale).reverse().toArray(), positionOffset ?? [0.5, 0.5]);
  }

  /**
   * {@inheritDoc DrawableInterface.translatePositionConfig}
   */
  public translatePositionConfig(scale: VectorArrayType): [VectorArrayType, VectorArrayType] {
    // TODO use with scalable and unscalable
    const positionOffset = this._config.positionOffset;
    return this._config.scalable
      ? translatePositionConfig(this._config.position, this._config.size, [1, 1], positionOffset ?? [0, 0])
      : translatePositionConfig(this._config.position, this._config.size, scale, positionOffset ?? [0.5, 0.5]);
  }

  /**
   * View config getter
   */
  public get config(): PositionalDrawableConfigInterface {
    return this._config;
  }

  /**
   * bound getter
   */
  public get bound(): BoundInterface {
    return new RectangularBound({
      position: [0, 0],
      size: this._config.size,
    });
  }

  /**
   * PositionalDrawable constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   */
  protected constructor({
    id,
    config,
    data = {},
  }: ConstructorInterface) {
    super({
      id,
      config,
      data,
    });
  }
}
