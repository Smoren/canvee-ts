import Drawer from './canvas/drawer';
import DrawableStorage from './canvas/structs/drawable/drawable-storage';
import { ViewConfigObservableInterface } from './canvas/types';
import ViewConfig from './canvas/structs/view-config';
import Svg from './canvas/figures/svg';
import Grid from './canvas/figures/grid';
import Rect from './canvas/figures/rect';
import Ellipse from './canvas/figures/ellipse';
import Line from './canvas/figures/line';

const storage = new DrawableStorage([]);
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

storage.addLayer('grid', 'Grid layer', [
  new Grid({
    id: 1,
    config: {
      zIndex: -Infinity,
      display: true,
      visible: true,
      interactive: false,
      mainLineColor: '#bbb',
      subLineColor: '#dedede',
      lineWidth: 1,
      linesInBlock: 5,
    },
  }),
]);

const elementsLayer = storage.addLayer('elements', 'Elements layer', [
  new Rect({
    id: 2,
    config: {
      position: [10, 20],
      size: [100, 30],
      zIndex: 1,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'green',
      strokeStyle: 'black',
      lineWidth: 1,
    },
  }),
  new Rect({
    id: 3,
    config: {
      position: [10, 25],
      size: [50, 50],
      zIndex: 1,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'blue',
      strokeStyle: 'black',
      lineWidth: 1,
    },
  }),
  new Rect({
    id: 4,
    config: {
      position: [15 * 30, 15 * 10],
      size: [15 * 10, 15 * 5],
      zIndex: 10,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'transparent',
      strokeStyle: 'red',
      lineWidth: 1,
    },
  }),
  new Svg({
    id: 5,
    config: {
      position: [300, 550],
      size: [162, 82],
      zIndex: 1,
      scalable: false,
      display: true,
      visible: true,
      interactive: true,
      positionOffset: [0.5, 1],
      data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    },
    bound: [[28, 0], [134, 0], [161, 40], [134, 81], [28, 81], [0, 40]],
  }),
  new Rect({
    id: 6,
    config: {
      position: [350, 350],
      size: [30, 30],
      zIndex: 1,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    },
  }),
  new Rect({
    id: 7,
    config: {
      position: [350, 300],
      size: [30, 30],
      zIndex: 1,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    },
  }),
  new Rect({
    id: 8,
    config: {
      position: [300, 350],
      size: [30, 30],
      zIndex: 1,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    },
  }),
  new Rect({
    id: 9,
    config: {
      position: [200, 200],
      size: [160, 160],
      zIndex: 0,
      scalable: true,
      display: true,
      visible: true,
      interactive: true,
      fillStyle: 'green',
      strokeStyle: 'blue',
      lineWidth: 1,
    },
  }),
]);

const group = elementsLayer.storage.group([6, 7, 8, 9]);
console.log(group);
// elementsLayer.storage.ungroup(group.id);

const anotherLayer = storage.addLayer('another', 'Another Layer', []);
anotherLayer.storage.add(new Rect({
  id: 10,
  config: {
    position: [120, 300],
    size: [100, 100],
    zIndex: -100,
    scalable: false,
    display: true,
    visible: true,
    interactive: true,
    fillStyle: 'lightblue',
    strokeStyle: 'blue',
    lineWidth: 1,
    positionOffset: [0.5, 1],
  },
}));
anotherLayer.storage.add(new Ellipse({
  id: 11,
  config: {
    position: [0, 0],
    size: [120, 180],
    zIndex: 100,
    scalable: false,
    display: true,
    visible: true,
    interactive: true,
    fillStyle: 'lightblue',
    strokeStyle: 'blue',
    lineWidth: 1,
    positionOffset: [0.5, 1],
  },
}));
anotherLayer.storage.add(new Line({
  id: 12,
  config: {
    position: [0, 0],
    size: [100, 100],
    zIndex: 101,
    scalable: false,
    display: true,
    visible: true,
    interactive: true,
    strokeStyle: 'blue',
    lineWidth: 2,
  },
}));

console.log('layers', storage.getLayers());
