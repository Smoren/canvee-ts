import Drawer from './canvas/drawer';
import Rect from './canvas/figures/rect';
import DrawableStorage from './canvas/structs/drawable/drawable-storage';
import { DrawableInterface, VectorArrayType, ViewConfigObservableInterface } from './canvas/types';
import ViewConfig from './canvas/structs/view-config';
import Grid from './canvas/figures/grid';
import Svg from './canvas/figures/svg';

const storage = new DrawableStorage([
  new Grid({
    id: 1,
    config: {
      zIndex: -Infinity,
      visible: true,
      mainLineColor: '#bbb',
      subLineColor: '#dedede',
      lineWidth: 1,
      linesInBlock: 5,
    }
  }),
  new Rect({
    id: 2,
    config: {
      position: [10, 20],
      size: [100, 30],
      zIndex: 1,
      visible: true,
      fillStyle: 'green',
      strokeStyle: 'black',
      lineWidth: 1,
    }
  }),
  new Rect({
    id: 3,
    config: {
      position: [10, 25],
      size: [50, 50],
      zIndex: 1,
      visible: true,
      fillStyle: 'blue',
      strokeStyle: 'black',
      lineWidth: 1,
    }
  }),
  new Rect({
    id: 4,
    config: {
      position: [15 * 30, 15 * 10],
      size: [15 * 10, 15 * 5],
      zIndex: 10,
      visible: true,
      fillStyle: 'transparent',
      strokeStyle: 'red',
      lineWidth: 1,
    }
  }),
  new Svg({
    id: 5,
    config: {
      position: [300, 550],
      size: [162, 82],
      zIndex: 1,
      visible: true,
      data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }
  }),
  new Svg({
    id: 5,
    config: {
      position: [100, 550],
      size: [162, 82],
      zIndex: 1,
      visible: true,
      data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }
  }),
  new Rect({
    id: 6,
    config: {
      position: [350, 350],
      size: [30, 30],
      zIndex: 1,
      visible: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    }
  }),
  new Rect({
    id: 7,
    config: {
      position: [350, 300],
      size: [30, 30],
      zIndex: 1,
      visible: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    }
  }),
  new Rect({
    id: 8,
    config: {
      position: [300, 350],
      size: [30, 30],
      zIndex: 1,
      visible: true,
      fillStyle: 'transparent',
      strokeStyle: 'blue',
      lineWidth: 1,
    }
  }),
  new Rect({
    id: 9,
    config: {
      position: [200, 200],
      size: [160, 160],
      zIndex: 0,
      visible: true,
      fillStyle: 'green',
      strokeStyle: 'blue',
      lineWidth: 1,
    }
  }),
]);

const group = storage.group([6, 7, 8, 9]);
console.log(group);
// storage.ungroup(group.id);

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
  for (let i = 0; i < 1000; ++i) {
    batch.push(new Rect({
      id: i + 100,
      config: {
        position: [Math.random() * drawer.width, Math.random() * drawer.height],
        size: [30 + Math.random() * 100, 30 + Math.random() * 100],
        zIndex: 0,
        visible: true,
        fillStyle: 'white',
        strokeStyle: 'green',
        lineWidth: 1,
      }
    }));
  }
  storage.addBatch(batch);
}, 30);

setTimeout(() => {
  return;
  const batch: DrawableInterface[] = [];
  const data1 = "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>"; // eslint-disable-line
  const data2 = "<svg width='160' height='100' viewBox='0 0 160 100' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse fill='#c5c6e2' stroke-width='null' stroke-opacity='null' cx='79.886158' cy='87.456573' id='svg_26' rx='79.524073' ry='11.878226' stroke='black'/><rect stroke='black' fill='#c5c6e2' stroke-width='null' stroke-opacity='null' fill-opacity='null' x='0.333864' y='12.489766' width='158.998938' height='75.332903' id='svg_27'/><ellipse fill='#c5c6e2' stroke-width='null' stroke-opacity='null' cx='79.802826' cy='12.457003' id='svg_9' rx='79.524073' ry='11.878226' stroke='black'/><rect fill='#c5c6e2' stroke-width='null' stroke-opacity='0' fill-opacity='null' x='1.083856' y='85.239354' width='157.832294' height='3.666642' id='svg_30' stroke='#000000'/></svg>"; // eslint-disable-line
  const size1: VectorArrayType = [162, 82];
  const size2: VectorArrayType = [160, 100];

  for (let i = 0; i < 1200; ++i) {
    const randFlag = Math.random() > 0.5;

    batch.push(new Svg({
      id: i + 100, config: {
        position: [Math.random() * drawer.width, Math.random() * drawer.height],
        size: randFlag ? size1 : size2,
        data: randFlag ? data1 : data2,
        zIndex: 0,
        visible: true,
      }
    }));
  }
  storage.addBatch(batch);
}, 1000);

// setTimeout(() => {
//   storage.delete({
//     typesExclude: ['Grid'],
//     extraFilter: item => item.config.zIndex === 0,
//   });
//   storage.add(new Rect({
//     id: 50,
//     config: {
//       position: [100, 25],
//       size: [50, 30],
//       zIndex: 1,
//       visible: true,
//       fillStyle: 'red',
//       strokeStyle: 'black',
//       lineWidth: 3,
//     }
//   }));
// }, 1000);
