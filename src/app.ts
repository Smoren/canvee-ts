import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import Vector from "./canvas/structs/vector";

const drawer: Drawer = new Drawer(document.getElementById('canvas') as HTMLCanvasElement);
const rect = new Rect({
  position: new Vector(10, 20),
  size: new Vector(100, 30),
  zIndex: 1,
})
drawer.addFigure(rect);
drawer.draw();
