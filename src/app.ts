import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import DrawableStorage from "./canvas/structs/drawable-storage";
import { ViewConfigObservableInterface } from "./canvas/types";
import ViewConfig from "./canvas/structs/view-config";
import Grid from "./canvas/figures/grid";

const storage = new DrawableStorage();
storage.add(new Grid({
  zIndex: -Infinity,
  mainLineColor: '#bbb',
  subLineColor: '#dedede',
  lineWidth: 1,
  linesInBlock: 5,
}));
storage.add(new Rect({
  position: [10, 20],
  size: [100, 30],
  zIndex: 1,
  fillStyle: 'green',
  strokeStyle: 'black',
  lineWidth: 3,
}));
storage.add(new Rect({
  position: [10, 25],
  size: [50, 50],
  zIndex: 1,
  fillStyle: 'blue',
  strokeStyle: 'black',
  lineWidth: 3,
}));
storage.add(new Rect({
  position: [700, 250],
  size: [150, 100],
  zIndex: 1,
  fillStyle: 'blue',
  strokeStyle: 'black',
  lineWidth: 3,
}));
console.log(storage);

const viewConfig: ViewConfigObservableInterface = new ViewConfig({
  scale: [1, 1],
  offset: [0, 0],
  gridStep: 15,
});
console.log(viewConfig);

const drawer: Drawer = new Drawer({
  domElement: document.getElementById('canvas') as HTMLCanvasElement,
  viewConfig,
  storage,
});
drawer.draw();
