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
 */
interface RectConfigInterface extends BasicFigureDrawableConfigInterface {
  position: VectorArrayType;
  size: VectorArrayType;
}

/**
 * Rect figure
 */
export default class Rect extends Drawable implements DrawableInterface {
  /**
   * @inheritDoc
   */
  protected _config: RectConfigInterface;

  /**
   * Rect constructor
   * @param {RectConfigInterface} config
   * @param {LinkedDataType} data
   */
  constructor(config: RectConfigInterface, data: LinkedDataType = {}) {
    super(config, data);
  }

  /**
   * @inheritDoc
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

export { RectConfigInterface };
