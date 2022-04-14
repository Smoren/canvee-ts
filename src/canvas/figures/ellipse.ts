import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  StylizedDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType, VectorArrayType,
} from '../types';
import PositionalDrawable from '../structs/drawable/positional-drawable';
import { toVector } from '../structs/vector';
import { BoundInterface } from '../types/bound';
import EllipseBound from '../structs/bounds/ellipse-bound';

/**
 * Interface for config of rect figure
 * @public
 */
export interface EllipseConfigInterface extends PositionalDrawableConfigInterface, StylizedDrawableConfigInterface {

}

interface ConstructorInterface {
  id: DrawableIdType;
  config: EllipseConfigInterface;
  data?: LinkedDataType;
}

/**
 * Ellipse figure
 * @public
 */
export default class Ellipse extends PositionalDrawable implements PositionalDrawableInterface {
  /**
   * Object type
   */
  protected _type: string = 'Ellipse';
  /**
   * View config
   */
  protected _config: EllipseConfigInterface;

  /**
   * Rect constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   */
  constructor({
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

  /**
   * Center getter
   */
  public get center(): VectorArrayType {
    return toVector(this._config.position).add(toVector(this._config.size).div(2)).toArray();
  }

  /**
   * Center getter
   */
  public get radius(): VectorArrayType {
    return toVector(this._config.size).div(2).toArray();
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    drawer.context.beginPath();
    drawer.context.strokeStyle = this._config.strokeStyle;
    drawer.context.fillStyle = this._config.fillStyle;
    drawer.context.ellipse(...this.center, ...this.radius, 0, 0, 2*Math.PI);
    drawer.context.fill();

    if (this._config.lineWidth !== 0) {
      drawer.context.stroke();
    }

    drawer.context.closePath();
  }

  /**
   * bound getter
   */
  get bound(): BoundInterface {
    return new EllipseBound({
      position: [0, 0],
      size: this._config.size,
    });
  }
}
