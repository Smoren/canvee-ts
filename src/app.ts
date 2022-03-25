import Drawer from './canvas/drawer';
import DrawableStorage from './canvas/structs/drawable/drawable-storage';
import { ViewConfigObservableInterface } from './canvas/types';
import ViewConfig from './canvas/structs/view-config';
import Svg from './canvas/figures/svg';
import Grid from './canvas/figures/grid';
import Rect from './canvas/figures/rect';

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
  new Grid(1, {
    zIndex: -Infinity,
    visible: true,
    mainLineColor: '#bbb',
    subLineColor: '#dedede',
    lineWidth: 1,
    linesInBlock: 5,
  }),
]);

const elementsLayer = storage.addLayer('elements', 'Elements layer', [
  new Rect(2, {
    position: [10, 20],
    size: [100, 30],
    zIndex: 1,
    visible: true,
    fillStyle: 'green',
    strokeStyle: 'black',
    lineWidth: 1,
  }),
  new Rect(3, {
    position: [10, 25],
    size: [50, 50],
    zIndex: 1,
    visible: true,
    fillStyle: 'blue',
    strokeStyle: 'black',
    lineWidth: 1,
  }),
  new Rect(4, {
    position: [15*30, 15*10],
    size: [15*10, 15*5],
    zIndex: 10,
    visible: true,
    fillStyle: 'transparent',
    strokeStyle: 'red',
    lineWidth: 1,
  }),
  new Svg(5, {
    position: [300, 550],
    size: [162, 82],
    zIndex: 1,
    visible: true,
    data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
  }),
  new Svg(5, {
    position: [100, 550],
    size: [162, 82],
    zIndex: 1,
    visible: true,
    data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
  }),
  new Rect(6, {
    position: [350, 350],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 1,
  }),
  new Rect(7, {
    position: [350, 300],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 1,
  }),
  new Rect(8, {
    position: [300, 350],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 1,
  }),
  new Rect(9, {
    position: [200, 200],
    size: [160, 160],
    zIndex: 0,
    visible: true,
    fillStyle: 'green',
    strokeStyle: 'blue',
    lineWidth: 1,
  }),
]);

const group = elementsLayer.storage.group([6, 7, 8, 9]);
console.log(group);
// elementsLayer.storage.ungroup(group.id);

const anotherLayer = storage.addLayer('another', 'Another Layer', []);
anotherLayer.storage.add(new Rect(9, {
  position: [800, 500],
  size: [100, 100],
  zIndex: -100,
  visible: true,
  fillStyle: 'lightblue',
  strokeStyle: 'blue',
  lineWidth: 1,
}));

console.log('layers', storage.getLayers());
