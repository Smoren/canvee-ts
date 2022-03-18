import { DrawableStorageInterface, DrawerConfigInterface, DrawerInterface, ViewConfigInterface } from "./types";

class Drawer implements DrawerInterface {
  protected _domElement: HTMLCanvasElement;
  protected _viewConfig: ViewConfigInterface;
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
    this._resizeObserver = this._initResizeObserver();
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

    this.draw();
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

  protected _initResizeObserver(): ResizeObserver {
    const observer = new ResizeObserver(() => this.refresh());
    observer.observe(this._domElement);

    return observer;
  }
}

export default Drawer;
