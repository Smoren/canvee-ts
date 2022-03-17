import Drawer, { DrawableConfig, Drawable } from "../drawer";
import Vector from "../structs/vector";

interface RectConfig extends DrawableConfig {
  position: Vector;
  size: Vector;
}

class Rect extends Drawable {
  config: RectConfig;

  constructor(config: RectConfig) {
    super(config);
  }

  draw(drawer: Drawer): void {
    drawer.context.fillRect(
      this.config.position.x,
      this.config.position.y,
      this.config.size.x,
      this.config.size.y
    );
    return;
  }
}

export default Rect;
export { RectConfig };
