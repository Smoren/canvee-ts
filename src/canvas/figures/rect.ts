import {
  LinkedDataType,
  VectorArrayType,
  DrawableInterface,
  DrawerInterface,
  BasicFigureDrawableConfigInterface,
} from "../types";
import Drawable from "../structs/drawable";

/**
 * Interface for config of rect figure
 * @public
 */
export interface RectConfigInterface extends BasicFigureDrawableConfigInterface {
  /**
   * Position vector
   */
  position: VectorArrayType;
  /**
   * Size vector
   */
  size: VectorArrayType;
}

/**
 * Rect figure
 * @public
 */
export default class Rect extends Drawable implements DrawableInterface {
  /**
   * View config
   * @protected
   */
  protected _config: RectConfigInterface;

  /**
   * Rect constructor
   * @param config - view config
   * @param data - linked extra data
   */
  constructor(config: RectConfigInterface, data: LinkedDataType = {}) {
    super(config, data);
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
    drawer.context.strokeRect(...this._config.position, ...this._config.size);
    drawer.context.closePath();
  }
}
