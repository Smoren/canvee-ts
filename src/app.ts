import Drawer from "./canvas/drawer";
import Rect from "./canvas/figures/rect";
import DrawableStorage from "./canvas/structs/drawable-storage";
import { DrawableInterface, ViewConfigObservableInterface } from "./canvas/types";
import ViewConfig from "./canvas/structs/view-config";
import Grid from "./canvas/figures/grid";
import Svg from "./canvas/figures/svg";

const storage = new DrawableStorage([
  new Grid(1, {
    position: [0, 0],
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
  }),
  new Svg(5, {
    position: [300, 550],
    size: [150, 100],
    zIndex: 1,
    visible: true,
    selectable: false,
    data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>",
    fillStyle: 'blue', // TODO не нужны
    strokeStyle: 'black',
    lineWidth: 3,
  }),
  new Svg(5, {
    position: [100, 550],
    size: [150, 100],
    zIndex: 1,
    visible: true,
    selectable: false,
    data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>",
    fillStyle: 'blue', // TODO не нужны
    strokeStyle: 'black',
    lineWidth: 3,
  }),
  new Rect(6, {
    position: [350, 350],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 3,
  }),
  new Rect(7, {
    position: [350, 300],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 3,
  }),
  new Rect(8, {
    position: [300, 350],
    size: [30, 30],
    zIndex: 1,
    visible: true,
    selectable: false,
    fillStyle: 'transparent',
    strokeStyle: 'blue',
    lineWidth: 3,
  }),
]);

const group = storage.group([6, 7, 8]);
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

// setTimeout(() => {
//   const batch: DrawableInterface[] = [];
//   for (let i=0; i<1000; ++i) {
//     batch.push(new Rect(i+100, {
//       position: [Math.random()*drawer.width, Math.random()*drawer.height],
//       size: [30+Math.random()*100, 30+Math.random()*100],
//       zIndex: 0,
//       visible: true,
//       selectable: false,
//       fillStyle: 'white',
//       strokeStyle: 'green',
//       lineWidth: 1,
//     }));
//   }
//   storage.addBatch(batch);
// }, 30);

setTimeout(() => {
  const batch: DrawableInterface[] = [];
  const data1 = "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>";
  const data2 = "<svg width='160' height='100' viewBox='0 0 160 100' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse fill=\"#c5c6e2\" stroke-width=\"null\" stroke-opacity=\"null\" cx=\"79.886158\" cy=\"87.456573\" id=\"svg_26\" rx=\"79.524073\" ry=\"11.878226\" stroke=\"black\"/><rect stroke=\"black\" fill=\"#c5c6e2\" stroke-width=\"null\" stroke-opacity=\"null\" fill-opacity=\"null\" x=\"0.333864\" y=\"12.489766\" width=\"158.998938\" height=\"75.332903\" id=\"svg_27\"/><ellipse fill=\"#c5c6e2\" stroke-width=\"null\" stroke-opacity=\"null\" cx=\"79.802826\" cy=\"12.457003\" id=\"svg_9\" rx=\"79.524073\" ry=\"11.878226\" stroke=\"black\"/><rect fill=\"#c5c6e2\" stroke-width=\"null\" stroke-opacity=\"0\" fill-opacity=\"null\" x=\"1.083856\" y=\"85.239354\" width=\"157.832294\" height=\"3.666642\" id=\"svg_30\" stroke=\"#000000\"/></svg>"

  for (let i=0; i<200; ++i) {
    batch.push(new Svg(i+100, {
      position: [Math.random()*drawer.width, Math.random()*drawer.height],
      size: [30+Math.random()*100, 30+Math.random()*100],
      data: Math.random() > 0.5 ? data1 : data2,
      zIndex: 0,
      visible: true,
      selectable: false,
      fillStyle: 'white',
      strokeStyle: 'green',
      lineWidth: 1,
    }));
  }
  storage.addBatch(batch);
}, 1000);

// setTimeout(() => {
//   storage.delete({
//     typesExclude: ['Grid'],
//     extraFilter: item => item.config.zIndex === 0,
//   });
//   storage.cache(new Rect(50, {
//     position: [100, 25],
//     size: [50, 30],
//     zIndex: 1,
//     visible: true,
//     selectable: false,
//     fillStyle: 'red',
//     strokeStyle: 'black',
//     lineWidth: 3,
//   }));
// }, 1000);
