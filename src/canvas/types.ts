export type VectorArrayType = [number, number];

export interface VectorInterface {
  x: number;
  y: number;
  update(data: VectorArrayType): void;
  toArray(): VectorArrayType;
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
  scale: number;
  offset: VectorArrayType;
}

export interface DrawerConfigInterface {
  domElement: HTMLCanvasElement,
  viewConfig: ViewConfigInterface,
  storage: DrawableStorageInterface
}

export interface DrawerInterface {
  draw(): void;
  refresh(): void;
  get viewConfig(): ViewConfigInterface;
  get context(): CanvasRenderingContext2D;
  get width(): number;
  get height(): number;
}
