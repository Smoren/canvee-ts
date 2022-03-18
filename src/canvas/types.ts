export type VectorArrayType = [number, number];

export interface VectorInterface {
  x: number;
  y: number;
  update(data: VectorArrayType): void;
  toArray(): VectorArrayType;
}

export interface ObservableInterface {
  onChange(actorName: string, handler: (target: unknown) => void): void;
}

export interface BaseDrawableConfigInterface {
  zIndex: number;
}

export interface BasicFigureDrawableConfigInterface extends BaseDrawableConfigInterface {
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
}

export type LinkedDataType = Record<string, unknown>;

export interface DrawableInterface {
  config: BaseDrawableConfigInterface;
  data: LinkedDataType
  draw(drawer: DrawerInterface): void;
}

export interface DrawableStorageInterface {
  get list(): DrawableInterface[];
  add(item: DrawableInterface): void;
}

export interface ViewConfigInterface {
  scale: VectorArrayType;
  offset: VectorArrayType;
}

export interface ViewConfigObservableInterface extends ObservableInterface {
  scale: VectorArrayType;
  offset: VectorArrayType;
  onChange(actorName: string, handler: (target: ViewConfigObservableInterface) => void): void;
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
}
