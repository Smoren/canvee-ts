import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import DrawableStorage from "./canvas/structs/drawable-storage";
import { DrawableInterface, ViewConfigObservableInterface } from "./canvas/types";
import ViewConfig from "./canvas/structs/view-config";
import Grid from "./canvas/figures/grid";

const storage = new DrawableStorage([
  new Grid(1, {
    zIndex: -Infinity,
    visible: true,
    selectable: false,
    mainLineColor: '#bbb',
    subLineColor: '#dedede',
    lineWidth: 1,
    linesInBlock: 5,
  }),
  new Rect(2, {
    position: [10, 20],
    size: [100, 30],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'green',
    strokeStyle: 'black',
    lineWidth: 3,
  }),
  new Rect(3, {
    position: [10, 25],
    size: [50, 50],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'blue',
    strokeStyle: 'black',
    lineWidth: 3,
  }),
  new Rect(4, {
    position: [700, 250],
    size: [150, 100],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'blue',
    strokeStyle: 'black',
    lineWidth: 3,
  })
]);

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

setTimeout(() => {
  const batch: DrawableInterface[] = [];
  for (let i=0; i<1000; ++i) {
    batch.push(new Rect(i+100, {
      position: [Math.random()*drawer.width, Math.random()*drawer.height],
      size: [30+Math.random()*100, 30+Math.random()*100],
      zIndex: 0,
      visible: true,
      selectable: false,
      fillStyle: 'white',
      strokeStyle: 'green',
      lineWidth: 1,
    }));
  }
  storage.addBatch(batch);
}, 30);

setTimeout(() => {
  storage.delete({
    typesExcept: ['Grid'],
    extraFilter: item => item.config.zIndex === 0,
  });
  storage.add(new Rect(5, {
    position: [100, 25],
    size: [50, 30],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'red',
    strokeStyle: 'black',
    lineWidth: 3,
  }));
}, 1000);
