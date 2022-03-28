import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  StylizedDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType,
} from '../types';
import PositionalDrawable from '../structs/drawable/positional-drawable';

/**
 * Interface for config of rect figure
 * @public
 */
export interface RectConfigInterface extends PositionalDrawableConfigInterface, StylizedDrawableConfigInterface {

}

interface ConstructorInterface {
  id: DrawableIdType;
  config: RectConfigInterface;
  data?: LinkedDataType;
}

/**
 * Rect figure
 * @public
 */
export default class Rect extends PositionalDrawable implements PositionalDrawableInterface {
  /**
   * Object type
   */
  protected _type: string = 'Rect';
  /**
   * View config
   */
  protected _config: RectConfigInterface;

  /**
   * Rect constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   */
  constructor({
    id,
    config,
    data = {}
  }: ConstructorInterface) {
    super({ id, config, data });
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  draw(drawer: DrawerInterface): void {
    drawer.context.beginPath();
    drawer.context.strokeStyle = this._config.strokeStyle;
    drawer.context.fillStyle = this._config.fillStyle;
    drawer.context.lineWidth = this._config.lineWidth;
    drawer.context.fillRect(...this._config.position, ...this._config.size);

    if (this._config.lineWidth !== 0) {
      drawer.context.strokeRect(...this._config.position, ...this._config.size);
    }

    drawer.context.closePath();
  }
}
