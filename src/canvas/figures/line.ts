import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType, VectorArrayType,
} from '../types';
import PositionalDrawable from '../structs/drawable/positional-drawable';
import { toVector } from '../structs/vector';
import { BoundInterface } from '../types/bound';
import LineBound from '../structs/bounds/line-bound';

/**
 * Interface for config of rect figure
 * @public
 */
export interface LineConfigInterface extends PositionalDrawableConfigInterface {
  /**
   * Stroke style
   */
  strokeStyle: string;
  /**
   * Line width
   */
  lineWidth: number;
}

interface ConstructorInterface {
  id: DrawableIdType;
  config: LineConfigInterface;
  data?: LinkedDataType;
}

/**
 * Line figure
 * @public
 */
export default class Line extends PositionalDrawable implements PositionalDrawableInterface {
  /**
   * Object type
   */
  protected _type: string = 'Line';
  /**
   * View config
   */
  protected _config: LineConfigInterface;

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
   * From getter
   */
  public get from(): VectorArrayType {
    return this._config.position;
  }

  /**
   * To getter
   */
  public get to(): VectorArrayType {
    return toVector(this._config.position).add(this._config.size).toArray();
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    const scale = drawer.viewConfig.scale[0];

    drawer.context.beginPath();
    drawer.context.strokeStyle = this._config.strokeStyle;
    drawer.context.lineWidth = this._config.scalable ? this._config.lineWidth : this._config.lineWidth / scale;
    drawer.context.moveTo(...this.from);
    drawer.context.lineTo(...this.to);

    if (this._config.lineWidth !== 0) {
      drawer.context.stroke();
    }

    drawer.context.closePath();
  }

  /**
   * bound getter
   */
  public get bound(): BoundInterface {
    return new LineBound({
      position: this._config.position,
      size: this._config.size,
      deviation: this._config.lineWidth/2,
      scalable: this._config.scalable,
    });
  }
}
