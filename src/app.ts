import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import DrawableStorage from "./canvas/structs/drawable-storage";
import { ViewConfigInterface } from "./canvas/types";

const storage = new DrawableStorage([]);
storage.add(new Rect({
  position: [10, 20],
  size: [100, 30],
  zIndex: 1,
  fillStyle: 'green',
  strokeStyle: 'black',
  lineWidth: 3,
}));

const viewConfig: ViewConfigInterface = {
  scale: 1,
  offset: [0, 0],
};

const drawer: Drawer = new Drawer({
  domElement: document.getElementById('canvas') as HTMLCanvasElement,
  viewConfig,
  storage,
});
drawer.draw();
