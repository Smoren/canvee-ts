import {
  LinkedDataType,
  VectorArrayType,
  DrawableInterface,
  DrawerInterface,
  BasicFigureDrawableConfigInterface,
} from "../types";
import Drawable from "../structs/drawable";

interface RectConfigInterface extends BasicFigureDrawableConfigInterface {
  position: VectorArrayType;
  size: VectorArrayType;
}

class Rect extends Drawable implements DrawableInterface {
  protected _config: RectConfigInterface;

  constructor(config: RectConfigInterface, data: LinkedDataType = {}) {
    super(config, data);
  }

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

export default Rect;
export { RectConfigInterface };
