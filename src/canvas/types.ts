export type VectorArrayType = [number, number];

export interface VectorInterface {
  x: number;
  y: number;
  update(data: VectorArrayType): void;
  toArray(): VectorArrayType;
}

export interface ViewObservableInterface {
  onViewChange(actorName: string, handler: (target: unknown) => void): void;
}

export interface DrawableConfigInterface {
  zIndex: number;
}

export interface BasicFigureDrawableConfigInterface extends DrawableConfigInterface {
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
}

export type LinkedDataType = Record<string, unknown>;

export interface DrawableInterface extends ViewObservableInterface {
  config: DrawableConfigInterface;
  data: LinkedDataType
  draw(drawer: DrawerInterface): void;
  onViewChange(actorName: string, handler: (target: DrawableInterface) => void): void;
}

export interface DrawableStorageInterface {
  get list(): DrawableInterface[];
  add(item: DrawableInterface): void;
}

export interface ViewConfigInterface {
  scale: VectorArrayType;
  offset: VectorArrayType;
}

export interface ViewConfigObservableInterface extends ViewObservableInterface {
  scale: VectorArrayType;
  offset: VectorArrayType;
  onViewChange(actorName: string, handler: (target: ViewConfigObservableInterface) => void): void;
}

export interface DrawerConfigInterface {
  domElement: HTMLCanvasElement,
  viewConfig: ViewConfigObservableInterface,
  storage: DrawableStorageInterface
}

export interface DrawerInterface {
  viewConfig: ViewConfigInterface;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  draw(): void;
  refresh(): void;
  clear(): void;
}
