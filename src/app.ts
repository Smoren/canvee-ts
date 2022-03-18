import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import DrawableStorage from "./canvas/structs/drawable-storage";
import { ViewConfigObservableInterface } from "./canvas/types";
import ViewConfig from "./canvas/structs/view-config";

const storage = new DrawableStorage([]);
storage.add(new Rect({
  position: [10, 20],
  size: [100, 30],
  zIndex: 1,
  fillStyle: 'green',
  strokeStyle: 'black',
  lineWidth: 3,
}));

const viewConfig: ViewConfigObservableInterface = new ViewConfig({
  scale: [1, 1],
  offset: [0, 0],
});
console.log(viewConfig);

const drawer: Drawer = new Drawer({
  domElement: document.getElementById('canvas') as HTMLCanvasElement,
  viewConfig,
  storage,
});
drawer.draw();
