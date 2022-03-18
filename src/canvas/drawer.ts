import {
  DrawableStorageInterface,
  DrawerConfigInterface,
  DrawerInterface,
  ViewConfigInterface,
  ViewConfigObservableInterface
} from "./types";

class Drawer implements DrawerInterface {
  protected _actorName: string = 'Drawer';
  protected _domElement: HTMLCanvasElement;
  protected _viewConfig: ViewConfigObservableInterface;
  protected _storage: DrawableStorageInterface;
  protected _context: CanvasRenderingContext2D;
  protected _resizeObserver: ResizeObserver;

  constructor({
    domElement,
    viewConfig,
    storage
  }: DrawerConfigInterface) {
    this._domElement = domElement;
    this._viewConfig = viewConfig;
    this._storage = storage;
    this._context = domElement.getContext('2d');

    // TODO перенести в storage, сделав его тоже observable
    this._storage.list.forEach(item => item.onViewChange(this._actorName, () => this.refresh()));

    this._initResizeObserver();
    this._initViewConfigObserver();

    this.refresh();
  }

  public draw(): void {
    this._storage.list.forEach(item => item.draw(this));
  }

  public refresh(): void {
    if (this._domElement.width !== this.width) {
      this._domElement.width = this.width;
    }

    if (this._domElement.height !== this.height) {
      this._domElement.height = this.height;
    }

    console.log('refreshed');

    this.clear();
    this.draw();
  }

  clear(): void {
    this._context.clearRect(0, 0, this.width, this.height);
  }

  get viewConfig(): ViewConfigInterface {
    return this._viewConfig;
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get width(): number {
    return this._domElement.clientWidth;
  }

  get height(): number {
    return this._domElement.clientHeight;
  }

  protected _initResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => this.refresh());
    this._resizeObserver.observe(this._domElement);
  }

  protected _initViewConfigObserver(): void {
    this._viewConfig.onViewChange(this._actorName, () => this.refresh());
  }
}

export default Drawer;
