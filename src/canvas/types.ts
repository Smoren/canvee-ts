export type VectorArrayType = [number, number];

export interface VectorInterface {
  x: number;
  y: number;
  update(data: VectorArrayType): void;
  toArray(): VectorArrayType;
}

export type ViewObservableHandlerType = (target: unknown, extra: Record<string, unknown> | null) => void;

export interface ViewObservableInterface {
  onViewChange(actorName: string, handler: ViewObservableHandlerType): void;
}

export interface ObserveHelperInterface {
  onChange(actorName: string, handler: ViewObservableHandlerType): void;
  processWithMuteHandlers(extra?: Record<string, unknown> | null): boolean;
  withMuteHandlers(action: (mutedBefore: boolean, manager: ObserveHelperInterface) => void): boolean;
  processHandlers(isMuted: boolean, extra?: Record<string, unknown> | null): boolean;
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
  onViewChange(actorName: string, handler: ViewObservableHandlerType): void;
}

// TODO DrawableGroupInterface

export interface DrawableStorageInterface extends ViewObservableInterface {
  get list(): DrawableInterface[];
  add(item: DrawableInterface): void;
}

export interface ViewConfigInterface {
  scale: VectorArrayType;
  offset: VectorArrayType;
  gridStep: number;
}

export interface ViewConfigObservableInterface extends ViewConfigInterface, ViewObservableInterface {
  transposeForward(coords: VectorArrayType): VectorArrayType;
  transposeBackward(coords: VectorArrayType): VectorArrayType;
  onViewChange(actorName: string, handler: ViewObservableHandlerType): void;
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
