import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  VectorArrayType,
} from '../../types';
import { createVector } from '../vector';
import Drawable from '../drawable/drawable';
import { BoundInterface } from '../../types/bound';
import RectangularBound from '../bounds/rectangular-bound';

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
   * {@inheritDoc DrawableInterface.boundIncludes}
   */
  public boundIncludes(coords: VectorArrayType): boolean {
    // TODO
    return coords instanceof Array;
  }

  /**
   * {@inheritDoc DrawableInterface.rectBoundIncludes}
   */
  public rectBoundIncludes(coords: VectorArrayType): boolean {
    // TODO
    return coords instanceof Array;
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
    return this.rectBound;
  }

  /**
   * rectBound getter
   */
  public get rectBound(): BoundInterface {
    return new RectangularBound({
      position: this._config.position,
      size: this._config.size,
    });
  }
}
