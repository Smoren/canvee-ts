import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  VectorArrayType,
} from '../types';
import { createVector } from './vector';
import Drawable from './drawable';

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
   * View config getter
   */
  public get config(): PositionalDrawableConfigInterface {
    return this._config;
  }
}
