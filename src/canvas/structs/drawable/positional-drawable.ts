import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  VectorArrayType, DrawableIdType, LinkedDataType,
} from '../../types';
import { createVector } from '../vector';
import Drawable from '../drawable/drawable';
import { BoundInterface } from '../../types/bound';
import RectangularBound from '../bounds/rectangular-bound';
import { transposeCoordsForward } from '../vector/helpers';

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
  public boundIncludes(coords: VectorArrayType): boolean {
    return this.bound.includes(
      transposeCoordsForward(coords, this._config.position),
    );
  }

  /**
   * {@inheritDoc DrawableInterface.isNearBoundEdge}
   */
  public isNearBoundEdge(coords: VectorArrayType, deviation: number): boolean {
    return this.bound.isNearEdge(
      transposeCoordsForward(coords, this._config.position),
      deviation,
    );
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
