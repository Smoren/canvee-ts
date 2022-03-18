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
  config: RectConfigInterface;

  constructor(config: RectConfigInterface, data: LinkedDataType | null = null) {
    super(config, data);
  }

  draw(drawer: DrawerInterface): void {
    drawer.context.beginPath();
    drawer.context.strokeStyle = this.config.strokeStyle;
    drawer.context.fillStyle = this.config.fillStyle;
    drawer.context.lineWidth = this.config.lineWidth;
    drawer.context.fillRect(...this.config.position, ...this.config.size);
    drawer.context.strokeRect(...this.config.position, ...this.config.size);
    drawer.context.closePath();
  }
}

export default Rect;
export { RectConfigInterface };
